import test from "node:test";
import assert from "node:assert/strict";
import {
  newWorld,
  step,
  plantTree,
  serialize,
  restore,
  PEOPLE,
  PLACES,
  terrain,
  pathTo,
  clock,
  DAY,
  STORAGE_KEY,
  encounterText,
  memoryText,
} from "../public/world.js";

test("every home and activity location is connected by land", () => {
  const points = [...PEOPLE.map((p) => p.home), ...Object.values(PLACES)];
  for (const a of points)
    for (const b of points) {
      assert.ok(terrain(...a));
      if (a.join() === b.join()) continue;
      const path = pathTo(a, b);
      assert.deepEqual(path.at(-1), b);
      for (const p of path) assert.ok(terrain(...p));
    }
});
test("residents complete routines across several day/night cycles without leaving the island", () => {
  const w = newWorld(),
    actions = new Set();
  for (let i = 0; i < DAY * 4; i++) {
    step(w, 1);
    for (const p of w.people) {
      assert.ok(Number.isFinite(p.x) && Number.isFinite(p.y));
      assert.ok(terrain(Math.round(p.x), Math.round(p.y)));
      actions.add(p.action);
    }
  }
  assert.ok(actions.has("Lepää kotona"));
  assert.ok(actions.has("Viipyy nuotiolla"));
  assert.ok(actions.has("Hoitaa puutarhaa"));
  assert.equal(clock(w.elapsed).day, 5);
  assert.ok(w.events.length <= 12);
});
test("planting is bounded, unique and survives serialization", () => {
  const w = newWorld();
  for (let i = 0; i < 24; i++) assert.equal(plantTree(w).ok, true);
  assert.equal(plantTree(w).ok, false);
  assert.equal(new Set(w.planted.map((p) => p.x + "," + p.y)).size, 24);
  step(w, 1);
  const loaded = restore(serialize(w));
  assert.deepEqual(loaded.planted, w.planted);
  assert.equal(loaded.elapsed, w.elapsed);
  assert.deepEqual(loaded.events, w.events);
});
test("corrupt or incompatible saved data recovers safely", () => {
  for (const s of [
    "broken",
    "null",
    "{}",
    '{"version":2}',
    '{"version":1,"elapsed":-5}',
  ])
    assert.deepEqual(restore(s), newWorld());
  const w = restore(
    JSON.stringify({
      version: 1,
      elapsed: 5,
      people: [null, { x: 100, y: 100 }],
      planted: [null, { x: 0, y: 0, at: 0 }],
      events: [null, { at: 0, text: 4 }],
    }),
  );
  assert.equal(w.planted.length, 0);
  assert.equal(w.events.length, 0);
  assert.equal(w.people.length, 3);
  for (const p of w.people) assert.ok(terrain(p.x, p.y));
});

function firstMeeting(world, dt = 1) {
  const previous = world.lastEncounter?.at;
  for (let i = 0; i < DAY * 2 / dt; i++) {
    step(world, dt);
    if (world.lastEncounter && world.lastEncounter.at !== previous) return;
  }
  assert.fail('The evening passed without a meeting');
}

test('evening encounters are visible, stationary, bounded and rotate between all pairs', () => {
  const w = newWorld();
  for (const expectedPair of [0, 1, 2, 0]) {
    firstMeeting(w);
    assert.equal(w.lastEncounter.pair, expectedPair);
    assert.equal(w.people.filter(p => p.action.startsWith('Juttelee:')).length, 2);
    assert.ok(w.people.every(p => p.route.length === 0));
    const positions = w.people.map(({x, y}) => [x, y]);
    for (let i = 0; i < 9; i++) step(w, 1);
    assert.deepEqual(w.people.map(({x, y}) => [x, y]), positions);
    assert.equal(w.people.filter(p => p.action.startsWith('Juttelee:')).length, 2);
    step(w, 1);
    assert.ok(w.people.every(p => p.action === 'Viipyy nuotiolla'));
    assert.equal(w.events.filter(e => e.text === encounterText(w.lastEncounter)).length, 1);
  }
});

test('reloading an encounter preserves its remaining duration and does not replay it', () => {
  const original = newWorld();
  firstMeeting(original);
  for (let i = 0; i < 4; i++) step(original, 1);
  const loaded = restore(serialize(original));
  assert.deepEqual(loaded.lastEncounter, original.lastEncounter);
  assert.deepEqual(loaded.events, original.events);
  const at = loaded.lastEncounter.at;
  step(loaded, 1);
  assert.equal(loaded.people.filter(p => p.action.startsWith('Juttelee:')).length, 2);
  for (let i = 0; i < 5; i++) step(loaded, 1);
  assert.ok(loaded.people.every(p => p.action === 'Viipyy nuotiolla'));
  for (let i = 0; i < 70; i++) step(loaded, 1);
  assert.equal(loaded.lastEncounter.at, at);
  assert.equal(loaded.events.filter(e => e.at === at && e.text === encounterText(loaded.lastEncounter)).length, 1);
});

test('v1 saves migrate without losing the personal island or replacing the storage key', () => {
  const w = newWorld();
  plantTree(w);
  for (let i = 0; i < 20; i++) step(w, 1);
  const legacy = JSON.parse(serialize(w));
  legacy.version = 1;
  delete legacy.lastEncounter;
  const loaded = restore(JSON.stringify(legacy));
  assert.equal(loaded.version, 3);
  assert.equal(loaded.elapsed, legacy.elapsed);
  assert.deepEqual(loaded.planted, legacy.planted);
  assert.deepEqual(loaded.events, legacy.events);
  assert.deepEqual(loaded.people.map(({x, y}) => ({x, y})), legacy.people);
  assert.equal(loaded.lastEncounter, null);
  assert.equal(STORAGE_KEY, 'verso.world.v1');
  firstMeeting(loaded);
  assert.ok(loaded.lastEncounter);
});

test("a conversation leaves a different persistent memory for both participants", () => {
  const w = newWorld();
  firstMeeting(w);
  assert.deepEqual(w.memories, [
    { at: w.lastEncounter.at, pair: 0 },
    { at: w.lastEncounter.at, pair: 0 },
    null,
  ]);
  assert.match(memoryText(0, w.memories[0]), /Otso/);
  assert.match(memoryText(1, w.memories[1]), /Aavan/);
  assert.notEqual(memoryText(0, w.memories[0]), memoryText(1, w.memories[1]));
  assert.equal(memoryText(2, w.memories[0]), "");
  const loaded = restore(serialize(w));
  assert.deepEqual(loaded.memories, w.memories);
  assert.equal(memoryText(0, loaded.memories[0]), memoryText(0, w.memories[0]));
});

test("later meetings refresh only the participants' latest memories", () => {
  const w = newWorld();
  firstMeeting(w);
  const aava = { ...w.memories[0] };
  firstMeeting(w);
  assert.deepEqual(w.memories[0], aava);
  assert.equal(w.memories[1].pair, 1);
  assert.equal(w.memories[2].pair, 1);
  assert.match(memoryText(1, w.memories[1]), /Pajun/);
  assert.match(memoryText(2, w.memories[2]), /Otso/);
});

test("v2 saves gain memories from their latest valid conversation", () => {
  const w = newWorld();
  firstMeeting(w);
  const legacy = JSON.parse(serialize(w));
  legacy.version = 2;
  delete legacy.memories;
  const loaded = restore(JSON.stringify(legacy));
  assert.equal(loaded.version, 3);
  assert.deepEqual(loaded.memories, [
    { ...loaded.lastEncounter },
    { ...loaded.lastEncounter },
    null,
  ]);
});

test("invalid memories are ignored without losing other saved state", () => {
  const w = newWorld();
  plantTree(w);
  firstMeeting(w);
  const saved = JSON.parse(serialize(w));
  saved.memories = [
    { at: -1, pair: 0 },
    { at: w.elapsed, pair: 2 },
    { at: w.elapsed + 1, pair: 0 },
  ];
  const loaded = restore(JSON.stringify(saved));
  assert.deepEqual(loaded.memories, [null, null, null]);
  assert.deepEqual(loaded.planted, w.planted);
  assert.deepEqual(loaded.lastEncounter, w.lastEncounter);
});

test('invalid encounter data is ignored without discarding a valid saved island', () => {
  const w = newWorld();
  plantTree(w);
  firstMeeting(w);
  for (const lastEncounter of [null, {}, {at: -1, pair: 0}, {at: 0, pair: 0},
    {at: w.elapsed + 1, pair: 0}, {at: w.elapsed, pair: 9}, {at: w.elapsed, pair: -1}]) {
    const saved = {...JSON.parse(serialize(w)), lastEncounter};
    const loaded = restore(JSON.stringify(saved));
    assert.equal(loaded.lastEncounter, null);
    assert.deepEqual(loaded.planted, w.planted);
    assert.equal(loaded.elapsed, w.elapsed);
  }
});

test('frame-sized time steps produce one meeting per evening and pause does not advance it', () => {
  const w = newWorld();
  firstMeeting(w, 1 / 60);
  const saved = serialize(w);
  step(w, 0);
  assert.equal(serialize(w), saved);
  const meeting = {...w.lastEncounter};
  for (let i = 0; i < 35 * 60; i++) step(w, 1 / 60);
  assert.deepEqual(w.lastEncounter, meeting);
  assert.equal(w.events.filter(e => e.at === meeting.at && e.text === encounterText(meeting)).length, 1);
});
