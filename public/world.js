export const SIZE = 25;
export const DAY = 240;
export const STORAGE_KEY = "verso.world.v1";
export const ENCOUNTER_DURATION = 10;
const EVENING_PAIRS = [[0, 1], [1, 2], [0, 2]];
const CONVERSATIONS = [
  "Aava ja Otso vaihtoivat kuulumisia puutarhasta ja meren rannalta.",
  "Otso ja Paju vertailivat päivän löytöjä rannalta ja metsäpolulta.",
  "Aava ja Paju pohtivat, mitä kaikkea pienestä siemenestä voi kasvaa.",
];
export const PEOPLE = [
  {
    name: "Aava",
    color: "#cc815a",
    hair: "#694631",
    home: [9, 10],
    trait: "Puutarhuri",
    thought: "Jokaisessa pienessä alussa on metsän mahdollisuus.",
  },
  {
    name: "Otso",
    color: "#748da2",
    hair: "#453e33",
    home: [14, 9],
    trait: "Rannan kulkija",
    thought: "Rannalla ajatukset löytävät oman paikkansa.",
  },
  {
    name: "Paju",
    color: "#b4aa65",
    hair: "#ab7045",
    home: [12, 15],
    trait: "Utelias tutkija",
    thought: "Ehkä tutunkin polun varrelta löytyy vielä jotain uutta.",
  },
];
export const PLACES = {
  garden: [8, 14],
  fire: [12, 12],
  shore: [18, 12],
  lookout: [10, 6],
};
export function noise(x, y) {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return n - Math.floor(n);
}
export function terrain(x, y) {
  if (x < 0 || y < 0 || x >= SIZE || y >= SIZE) return 0;
  const dx = (x - 12) / 1.02,
    dy = (y - 12) / 0.94;
  const edge = 9.7 + Math.sin(x * 0.72) * 0.7 + Math.cos(y * 0.9) * 0.55;
  const d = Math.hypot(dx, dy);
  return d > edge ? 0 : d > edge - 1.3 ? 1 : 2;
}
export const land = [];
for (let y = 0; y < SIZE; y++)
  for (let x = 0; x < SIZE; x++) if (terrain(x, y)) land.push([x, y]);
export function reserved(x, y) {
  return [...PEOPLE.map((p) => p.home), ...Object.values(PLACES)].some(
    ([a, b]) => Math.abs(a - x) <= 1 && Math.abs(b - y) <= 1,
  );
}
export function forest(x, y) {
  return terrain(x, y) === 2 && !reserved(x, y) && noise(x, y) > 0.72;
}
export function pathTo(start, end) {
  const origin = start.map(Math.round),
    key = (p) => p.join(",");
  const queue = [origin],
    visited = new Map([[key(origin), null]]);
  for (let i = 0; i < queue.length; i++) {
    const p = queue[i];
    if (key(p) === key(end)) {
      const path = [];
      let at = p;
      while (visited.get(key(at))) {
        path.unshift(at);
        at = visited.get(key(at));
      }
      return path;
    }
    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const n = [p[0] + dx, p[1] + dy];
      if (terrain(...n) && !visited.has(key(n))) {
        visited.set(key(n), p);
        queue.push(n);
      }
    }
  }
  return [];
}
export function clock(elapsed) {
  const t = elapsed + DAY / 3;
  const hour = ((t % DAY) / DAY) * 24;
  return {
    day: Math.floor(t / DAY) + 1,
    hour,
    label: `${String(Math.floor(hour)).padStart(2, "0")}.${String(Math.floor((hour % 1) * 60)).padStart(2, "0")}`,
  };
}
export function phase(elapsed) {
  const h = clock(elapsed).hour;
  return h < 6 || h >= 21
    ? "night"
    : h < 11
      ? "morning"
      : h < 17
        ? "day"
        : "evening";
}
export function routine(id, elapsed) {
  const p = phase(elapsed);
  if (p === "night")
    return {
      target: PEOPLE[id].home,
      action: "Lepää kotona",
      event: "vetäytyi kotiin lepäämään.",
    };
  if (p === "evening")
    return {
      target: [PLACES.fire[0] + id - 1, PLACES.fire[1] + 1],
      action: "Viipyy nuotiolla",
      event: "asettui nuotion ääreen.",
    };
  const stops =
    p === "morning"
      ? ["garden", "shore", "lookout"]
      : ["lookout", "garden", "shore"];
  const place = stops[id];
  return {
    target: PLACES[place],
    action: {
      garden: "Hoitaa puutarhaa",
      shore: "Kuuntelee merta",
      lookout: "Tutkii metsäpolkua",
    }[place],
    event: {
      garden: "pysähtyi hoitamaan puutarhaa.",
      shore: "löysi rauhallisen paikan rannalta.",
      lookout: "lähti katselemaan saarta kukkulalta.",
    }[place],
  };
}
export function newWorld() {
  return {
    version: 2,
    elapsed: 0,
    lastEncounter: null,
    planted: [],
    people: PEOPLE.map((p) => ({
      x: p.home[0],
      y: p.home[1],
      route: [],
      goal: "",
      action: "Aloittaa päivän",
    })),
    events: [{ at: 0, text: "Aava, Otso ja Paju saapuivat saarelle." }],
  };
}
export function addEvent(world, text) {
  world.events.unshift({ at: world.elapsed, text });
  world.events.length = Math.min(world.events.length, 12);
}
export function encounterText(encounter) {
  return CONVERSATIONS[encounter.pair];
}
export function activeEncounter(world, id) {
  const meeting = world.lastEncounter;
  if (!meeting || phase(world.elapsed) !== "evening" ||
      world.elapsed - meeting.at >= ENCOUNTER_DURATION) return null;
  return EVENING_PAIRS[meeting.pair].includes(id) ? meeting : null;
}
function meetAtFire(world) {
  if (phase(world.elapsed) !== "evening") return;
  const day = clock(world.elapsed).day;
  if (world.lastEncounter && clock(world.lastEncounter.at).day === day) return;
  // Wait for everyone: which pair meets rotates predictably each world day.
  if (!world.people.every((p, id) => {
    const target = routine(id, world.elapsed).target;
    return !p.route.length && Math.hypot(p.x - target[0], p.y - target[1]) < 0.01;
  })) return;
  world.lastEncounter = { at: world.elapsed, pair: (day - 1) % EVENING_PAIRS.length };
  addEvent(world, encounterText(world.lastEncounter));
}
export function step(world, dt) {
  if (!Number.isFinite(dt) || dt <= 0) return;
  const before = clock(world.elapsed).day;
  world.elapsed += Math.min(dt, 1);
  if (clock(world.elapsed).day !== before)
    addEvent(world, "Uusi päivä heräsi saaren yllä.");
  world.people.forEach((p, id) => {
    const plan = routine(id, world.elapsed),
      goal = plan.target.join(",");
    if (p.goal !== goal) {
      // Finish the current tile before taking a new route: no shortcuts over water.
      const start = p.route.length
        ? p.route[0]
        : [Math.round(p.x), Math.round(p.y)];
      const next = pathTo(start, plan.target);
      p.route = (
        Math.hypot(p.x - start[0], p.y - start[1]) > 0.001 ? [start] : []
      ).concat(next);
      p.goal = goal;
      p.action = p.route.length ? "Kulkee polulla" : plan.action;
    }
    let budget = Math.min(dt, 1) * 0.8;
    while (p.route.length && budget > 0) {
      const [x, y] = p.route[0],
        distance = Math.hypot(x - p.x, y - p.y);
      if (distance <= budget) {
        p.x = x;
        p.y = y;
        p.route.shift();
        budget -= distance;
        if (!p.route.length) {
          p.action = plan.action;
          addEvent(world, `${PEOPLE[id].name} ${plan.event}`);
        }
      } else {
        p.x += ((x - p.x) / distance) * budget;
        p.y += ((y - p.y) / distance) * budget;
        budget = 0;
      }
    }
    if (!p.route.length) p.action = plan.action;
  });
  meetAtFire(world);
  world.people.forEach((p, id) => {
    const meeting = activeEncounter(world, id);
    if (meeting) {
      const other = EVENING_PAIRS[meeting.pair].find((member) => member !== id);
      p.action = `Juttelee: ${PEOPLE[other].name}`;
    }
  });
}
export function plantTree(world) {
  if (world.planted.length >= 24)
    return {
      ok: false,
      message: "Tämän pienen saaren istutuspaikat ovat nyt täynnä.",
    };
  const candidates = land.filter(
    ([x, y]) =>
      terrain(x, y) === 2 &&
      !reserved(x, y) &&
      !forest(x, y) &&
      !world.planted.some((t) => t.x === x && t.y === y),
  );
  const tile = candidates.sort((a, b) => noise(...a) - noise(...b))[
    world.planted.length % candidates.length
  ];
  if (!tile)
    return { ok: false, message: "Saarella ei ole vapaata istutuspaikkaa." };
  world.planted.push({ x: tile[0], y: tile[1], at: world.elapsed });
  addEvent(world, "Istutit saarelle uuden puun. Pieni alku tarvitsee aikaa.");
  return {
    ok: true,
    message: "Uusi taimi juurtui. Se kasvaa yhden päivän aikana.",
  };
}
export function serialize(world) {
  return JSON.stringify({
    version: 2,
    elapsed: world.elapsed,
    lastEncounter: world.lastEncounter,
    planted: world.planted,
    events: world.events,
    people: world.people.map(({ x, y }) => ({ x, y })),
  });
}
export function restore(raw) {
  const fresh = newWorld();
  if (!raw) return fresh;
  try {
    const w = JSON.parse(raw);
    if (
      ![1, 2].includes(w.version) ||
      !Number.isFinite(w.elapsed) ||
      w.elapsed < 0 ||
      w.elapsed > 1e10
    )
      return fresh;
    fresh.elapsed = w.elapsed;
    // v1 islands keep their time, trees, residents and events under the same key.
    const meeting = w.lastEncounter;
    if (w.version === 2 && meeting && Number.isFinite(meeting.at) &&
        meeting.at >= 0 && meeting.at <= w.elapsed &&
        phase(meeting.at) === "evening" && Number.isInteger(meeting.pair) &&
        meeting.pair === (clock(meeting.at).day - 1) % EVENING_PAIRS.length) {
      fresh.lastEncounter = { at: meeting.at, pair: meeting.pair };
    }
    if (Array.isArray(w.planted)) {
      const seen = new Set();
      fresh.planted = w.planted
        .filter((t) => {
          if (
            !t ||
            !Number.isInteger(t.x) ||
            !Number.isInteger(t.y) ||
            terrain(t.x, t.y) !== 2 ||
            reserved(t.x, t.y) ||
            forest(t.x, t.y) ||
            !Number.isFinite(t.at) ||
            t.at < 0 ||
            t.at > w.elapsed
          )
            return false;
          const key = t.x + "," + t.y;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        })
        .slice(0, 24);
    }
    if (Array.isArray(w.events))
      fresh.events = w.events
        .filter(
          (e) =>
            e &&
            typeof e.text === "string" &&
            e.text.length < 200 &&
            Number.isFinite(e.at) &&
            e.at >= 0 &&
            e.at <= w.elapsed,
        )
        .slice(0, 12);
    if (Array.isArray(w.people))
      w.people.slice(0, 3).forEach((p, i) => {
        if (
          p &&
          Number.isFinite(p.x) &&
          Number.isFinite(p.y) &&
          terrain(Math.round(p.x), Math.round(p.y))
        ) {
          fresh.people[i].x = Math.round(p.x);
          fresh.people[i].y = Math.round(p.y);
        }
      });
    return fresh;
  } catch {
    return fresh;
  }
}
