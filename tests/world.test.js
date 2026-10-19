import test from "node:test";
import assert from "node:assert/strict";
import {
  newWorld,
  step,
  plantTree,
  serialize,
  restore,
  PEOPLE,
  HOME_DETAILS,
  PLACES,
  terrain,
  pathTo,
  clock,
  DAY,
  STORAGE_KEY,
  encounterText,
  memoryText,
  memoryVisit,
  phase,
  weather,
  shoreTrace,
  gardenButterflies,
  fireSparks,
  nightLights,
  gardenKeepsake,
  dayReflection,
  daytimeRoute,
  routine,
  treeGrowth,
  plantedTreeVisit,
} from "../public/world.js";

test("each home has a distinct detail that reflects its resident", () => {
  assert.equal(HOME_DETAILS.length, PEOPLE.length);
  assert.deepEqual(
    HOME_DETAILS.map(({ key }) => key),
    ["seedling-pots", "shore-stones", "twig-mobile"],
  );
  HOME_DETAILS.forEach((detail, id) => {
    assert.match(detail.label, new RegExp(`^${PEOPLE[id].name}`));
    assert.ok(detail.label.length < 100);
  });
});

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
test("weather follows a calm four-day cycle and announces each new day", () => {
  assert.deepEqual(
    [0, 1, 2, 3, 4].map((day) => weather(day * DAY).key),
    ["clear", "mist", "rain", "clearing", "clear"],
  );
  assert.deepEqual(
    [0, 1, 2, 3].map((day) => weather(day * DAY).label),
    ["Tyyni pouta", "Leijuva utu", "Hiljainen sade", "Kirkastuva sää"],
  );
  const w = newWorld();
  while (clock(w.elapsed).day === 1) step(w, 1);
  assert.equal(weather(w.elapsed).key, "mist");
  assert.equal(
    w.events[0].text,
    "Uuden päivän mukana saaren ylle nousi hento utu.",
  );
});
test("quiet rain nourishes planted trees without changing the saved tree shape", () => {
  const clearGrowth = treeGrowth({ at: 0 }, 40),
    rainGrowth = treeGrowth({ at: 480 }, 520),
    afterRain = treeGrowth({ at: 560 }, 650);
  assert.ok(rainGrowth > clearGrowth);
  assert.ok(afterRain > treeGrowth({ at: 0 }, 90));
  assert.equal(treeGrowth({ at: 0 }, DAY), 1);

  const w = newWorld();
  while (weather(w.elapsed).key !== "rain") step(w, 1);
  const result = plantTree(w);
  assert.equal(result.ok, true);
  assert.match(result.message, /Sade auttaa/);
  assert.match(w.events[0].text, /sade ravitsi taimea/);
  const loaded = restore(serialize(w));
  assert.deepEqual(loaded.planted, w.planted);
  assert.equal(treeGrowth(loaded.planted[0], loaded.elapsed), treeGrowth(w.planted[0], w.elapsed));
});
test("residents take turns noticing mature visitor-planted trees", () => {
  const world = newWorld();
  assert.equal(plantTree(world).ok, true);
  const tree = world.planted[0];
  assert.equal(plantedTreeVisit(0, 30, world.planted), null);
  assert.equal(plantedTreeVisit(0, DAY + 30, world.planted), null);
  assert.deepEqual(plantedTreeVisit(1, DAY + 30, world.planted), {
    target: [tree.x, tree.y],
    action: "Katselee kasvavaa latvusta",
    event: "pysähtyi kävijän istuttaman puun luo katselemaan sen latvusta.",
  });
  assert.deepEqual(plantedTreeVisit(2, 2 * DAY + 30, world.planted), {
    target: [tree.x, tree.y],
    action: "Kuuntelee sadetta puun suojassa",
    event: "pysähtyi kävijän istuttaman puun suojaan kuuntelemaan sadetta.",
  });
  assert.equal(routine(1, DAY + 30, null, []).action, "Tutkii metsäpolkua");
  assert.equal(
    routine(1, DAY + 30, null, world.planted).action,
    "Katselee kasvavaa latvusta",
  );

  const grove = newWorld();
  assert.equal(plantTree(grove).ok, true);
  assert.equal(plantTree(grove).ok, true);
  const mature = [...grove.planted].sort(
    (a, b) => a.at - b.at || a.x - b.x || a.y - b.y,
  );
  assert.deepEqual(plantedTreeVisit(1, DAY + 30, grove.planted).target, [
    mature[1].x,
    mature[1].y,
  ]);
  assert.deepEqual(plantedTreeVisit(2, 2 * DAY + 30, grove.planted).target, [
    mature[0].x,
    mature[0].y,
  ]);

  while (
    !world.events.some((event) => event.text.includes("katselemaan sen latvusta")) &&
    world.elapsed < DAY + 100
  )
    step(world, 1);
  assert.match(world.events[0].text, /Otso pysähtyi.*istuttaman puun/);
  assert.equal(
    world.events.filter((event) => event.text.includes("katselemaan sen latvusta"))
      .length,
    1,
  );
});
test("clearing mornings leave a changing trace on the shore for Otso", () => {
  assert.equal(shoreTrace(0), null);
  assert.equal(shoreTrace(2 * DAY), null);
  assert.deepEqual(
    [3, 7, 11, 15].map((day) => shoreTrace(day * DAY).key),
    ["stone", "shell", "driftwood", "stone"],
  );
  assert.deepEqual(routine(1, 3 * DAY), {
    target: PLACES.shore,
    action: "Tutkii vaaleaa kiveä",
    event: "löysi sateen jäljiltä rannalta sileän, vaalean kiven.",
  });
  assert.equal(routine(1, 4 * DAY).action, "Kuuntelee merta");

  const world = newWorld();
  while (
    !world.events.some((event) => event.text.includes("vaalean kiven")) &&
    world.elapsed < 3 * DAY + 90
  )
    step(world, 1);
  assert.match(world.events[0].text, /Otso löysi.*vaalean kiven/);
  for (let i = 0; i < 20; i++) step(world, 1);
  assert.equal(
    world.events.filter((event) => event.text.includes("vaalean kiven")).length,
    1,
  );
});
test("residents notice quiet rain while memories and keepsakes guide their morning", () => {
  assert.deepEqual(
    [0, 1, 2].map((id) => routine(id, 2 * DAY).action),
    [
      "Tutkii Pajun ruohorengasta",
      "Katselee sateen renkaita",
      "Tutkii sateistä metsäpolkua",
    ],
  );
  assert.deepEqual(routine(1, 2 * DAY).target, PLACES.shore);
  assert.match(routine(1, 2 * DAY).event, /sadepisaroiden renkaita/);

  const world = newWorld();
  while (world.elapsed < 2 * DAY) step(world, 1);
  assert.equal(world.people[0].action, "Tutkii Pajun ruohorengasta");
  assert.equal(
    world.events.filter((event) =>
      event.text.includes("Aava löysi puutarhan kiveltä"),
    ).length,
    1,
  );

  const memory = { at: 340, pair: 1 };
  assert.deepEqual(routine(1, 2 * DAY, memory), {
    target: PLACES.lookout,
    action: "Muisto vie metsäpolulle",
    event: "seurasi muistoaan metsäpolulle Pajun kertomuksen innoittamana.",
  });
});
test("clear-morning butterflies briefly change Aava's garden visit", () => {
  assert.equal(gardenButterflies(0), true);
  assert.equal(gardenButterflies(24.9), true);
  assert.equal(gardenButterflies(25), false);
  assert.equal(gardenButterflies(DAY), false);
  assert.equal(gardenButterflies(4 * DAY), true);
  assert.deepEqual(routine(0, 0), {
    target: PLACES.garden,
    action: "Seuraa perhosten lentoa",
    event: "jäi seuraamaan puutarhassa lepattelevia perhosia.",
  });

  const world = newWorld();
  while (world.elapsed < 15) step(world, 1);
  assert.equal(world.people[0].action, "Seuraa perhosten lentoa");
  assert.equal(
    world.events.filter((event) => event.text.includes("lepattelevia perhosia"))
      .length,
    1,
  );
  while (world.elapsed < 25) step(world, 1);
  assert.equal(world.people[0].action, "Hoitaa puutarhaa");

  const memory = { at: 820, pair: 0 };
  assert.equal(routine(0, 4 * DAY, memory).action, "Muisto vie rannalle");
});
test("clear evenings lift sparks from the fire and give Paju a quiet task", () => {
  assert.equal(fireSparks(89.9), false);
  assert.equal(fireSparks(90), true);
  assert.equal(fireSparks(129.9), true);
  assert.equal(fireSparks(130), false);
  assert.equal(fireSparks(DAY + 90), false);
  assert.equal(fireSparks(4 * DAY + 90), true);
  assert.equal(routine(0, 90).action, "Viipyy nuotiolla");
  assert.deepEqual(routine(2, 90), {
    target: [PLACES.fire[0] + 1, PLACES.fire[1] + 1],
    action: "Kuuntelee nuotion rätinää",
    event: "kohensi nuotiota ja jäi kuuntelemaan kipinöiden rätinää.",
  });

  const world = newWorld();
  while (
    !world.events.some((event) => event.text.includes("kipinöiden rätinää")) &&
    world.elapsed < 130
  )
    step(world, 1);
  assert.match(world.events[0].text, /Paju kohensi nuotiota/);
  for (let i = 0; i < 15; i++) step(world, 1);
  assert.equal(
    world.events.filter((event) => event.text.includes("kipinöiden rätinää"))
      .length,
    1,
  );
});
test("the evening fire echoes only an observation that actually happened that day", () => {
  const clearDay = newWorld();
  while (phase(clearDay.elapsed) !== "evening") step(clearDay, 1);
  assert.deepEqual(dayReflection(clearDay), {
    key: "butterflies",
    label: "puutarhan perhoset",
    text: "Aava kertoo puutarhassa näkemistään perhosista.",
  });
  assert.deepEqual(
    dayReflection(restore(serialize(clearDay))),
    dayReflection(clearDay),
  );

  const quietEvening = newWorld();
  quietEvening.elapsed = 90;
  quietEvening.events = [];
  assert.equal(dayReflection(quietEvening), null);

  const plantedDay = newWorld();
  assert.equal(plantTree(plantedDay).ok, true);
  while (
    !(clock(plantedDay.elapsed).day === 2 &&
      phase(plantedDay.elapsed) === "evening")
  )
    step(plantedDay, 1);
  assert.deepEqual(dayReflection(plantedDay), {
    key: "tree",
    label: "istutettu puu",
    text: "Otso kertoo pysähdyksestään kävijän istuttaman puun luona.",
  });

  while (
    !(clock(clearDay.elapsed).day === 2 &&
      phase(clearDay.elapsed) === "evening")
  )
    step(clearDay, 1);
  assert.equal(dayReflection(clearDay), null);
});
test("small forest lights make clear nights briefly visible", () => {
  assert.equal(nightLights(129.9), false);
  assert.equal(nightLights(130), true);
  assert.equal(nightLights(159.9), true);
  assert.equal(nightLights(160), false);
  assert.equal(nightLights(DAY + 130), false);
  assert.equal(nightLights(4 * DAY + 130), true);

  const world = newWorld();
  while (world.elapsed < 150) step(world, 1);
  assert.equal(
    world.events.filter((event) =>
      event.text.includes("Metsän hämärään syttyi pieniä valoja"),
    ).length,
    1,
  );
  for (let i = 0; i < 9; i++) step(world, 1);
  assert.equal(
    world.events.filter((event) =>
      event.text.includes("Metsän hämärään syttyi pieniä valoja"),
    ).length,
    1,
  );
});
test("residents alternate between two familiar daytime routes", () => {
  assert.deepEqual(daytimeRoute(30), ["lookout", "garden", "shore"]);
  assert.deepEqual(daytimeRoute(DAY + 30), ["shore", "lookout", "garden"]);
  assert.deepEqual(daytimeRoute(2 * DAY + 30), ["lookout", "garden", "shore"]);
  assert.deepEqual(
    [0, 1, 2].map((id) => routine(id, DAY + 30).target),
    [PLACES.shore, PLACES.lookout, PLACES.garden],
  );
  assert.deepEqual(
    [0, 1, 2].map((id) => routine(id, DAY + 30).action),
    ["Kuuntelee merta", "Tutkii metsäpolkua", "Punoo ruohorengasta"],
  );
  assert.deepEqual(
    [0, 1, 2].map((id) => routine(id, 2 * DAY + 30).action),
    [
      "Tutkii sateistä metsäpolkua",
      "Kuuntelee sadetta puutarhassa",
      "Katselee sateen renkaita",
    ],
  );

  const world = newWorld();
  while (world.elapsed < DAY + 70) step(world, 1);
  assert.deepEqual(
    world.people.map(({ x, y }) => [x, y]),
    [PLACES.shore, PLACES.lookout, PLACES.garden],
  );
  assert.deepEqual(
    world.people.map(({ action }) => action),
    ["Kuuntelee merta", "Tutkii metsäpolkua", "Punoo ruohorengasta"],
  );
});
test("Paju leaves a grass ring for Aava to notice the next morning", () => {
  assert.equal(gardenKeepsake(DAY + 39.9), null);
  assert.equal(gardenKeepsake(DAY + 40).label, "Pajun punoma ruohorengas");
  assert.equal(gardenKeepsake(2 * DAY + 29.9).action, "Tutkii Pajun ruohorengasta");
  assert.equal(gardenKeepsake(2 * DAY + 30), null);
  assert.equal(gardenKeepsake(3 * DAY), null);
  assert.deepEqual(routine(2, DAY + 40), {
    target: PLACES.garden,
    action: "Punoo ruohorengasta",
    event: "punoi ruohosta pienen renkaan ja jätti sen puutarhan kivelle.",
  });
  assert.deepEqual(routine(0, 2 * DAY), {
    target: PLACES.garden,
    action: "Tutkii Pajun ruohorengasta",
    event: "löysi puutarhan kiveltä Pajun punoman pienen ruohorenkaan.",
  });

  const memory = { at: DAY + 95, pair: 0 };
  assert.equal(routine(0, 2 * DAY, memory).action, "Muisto vie rannalle");

  const world = newWorld();
  while (
    !world.events.some((event) => event.text.includes("jätti sen puutarhan kivelle")) &&
    world.elapsed < DAY + 90
  )
    step(world, 1);
  assert.match(world.events[0].text, /Paju punoi ruohosta/);
  while (
    !world.events.some((event) => event.text.includes("Pajun punoman")) &&
    world.elapsed < 2 * DAY + 30
  )
    step(world, 1);
  assert.match(world.events[0].text, /Aava löysi.*Pajun punoman/);
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
    assert.deepEqual(
      w.people.map((p) => p.action),
      PEOPLE.map((_, id) => routine(id, w.elapsed, w.memories[id]).action),
    );
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
  assert.deepEqual(
    loaded.people.map((p) => p.action),
    PEOPLE.map((_, id) => routine(id, loaded.elapsed, loaded.memories[id]).action),
  );
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

test("a memory changes both participants' route on the following morning", () => {
  const w = newWorld();
  firstMeeting(w);
  while (!(clock(w.elapsed).day === 2 && phase(w.elapsed) === "morning"))
    step(w, 1);
  assert.deepEqual(memoryVisit(0, w.elapsed, w.memories[0]), {
    target: PLACES.shore,
    action: "Muisto vie rannalle",
    event: "seurasi muistoaan rannalle Otson kertomuksen innoittamana.",
  });
  assert.deepEqual(memoryVisit(1, w.elapsed, w.memories[1]), {
    target: PLACES.garden,
    action: "Muisto vie puutarhaan",
    event: "seurasi muistoaan puutarhaan Aavan kertomuksen innoittamana.",
  });
  assert.equal(memoryVisit(2, w.elapsed, w.memories[2]), null);
  for (let i = 0; i < 45; i++) step(w, 1);
  assert.deepEqual([w.people[0].x, w.people[0].y], PLACES.shore);
  assert.deepEqual([w.people[1].x, w.people[1].y], PLACES.garden);
  assert.deepEqual([w.people[2].x, w.people[2].y], PLACES.lookout);
  assert.equal(w.people[0].action, "Muisto vie rannalle");
  assert.equal(w.people[1].action, "Muisto vie puutarhaan");
  assert.equal(w.events.filter((event) => event.text.includes("seurasi muistoaan")).length, 2);
});

test("a remembered visit happens only on the morning immediately after a meeting", () => {
  const w = newWorld();
  firstMeeting(w);
  const aavaMemory = { ...w.memories[0] };
  while (clock(w.elapsed).day < 3) step(w, 1);
  assert.equal(memoryVisit(0, w.elapsed, aavaMemory), null);
  while (phase(w.elapsed) !== "morning") step(w, 1);
  assert.equal(memoryVisit(0, w.elapsed, aavaMemory), null);
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
