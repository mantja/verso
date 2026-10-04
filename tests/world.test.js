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
