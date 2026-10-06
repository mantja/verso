import {
  PEOPLE,
  STORAGE_KEY,
  clock,
  phase,
  newWorld,
  step,
  plantTree,
  serialize,
  restore,
  activeEncounter,
  encounterText,
  memoryText,
} from "./world.js";
import { createRenderer, portrait, project } from "./render.js";
const $ = (id) => document.getElementById(id);
let world,
  canSave = true;
try {
  world = restore(localStorage.getItem(STORAGE_KEY));
} catch {
  world = newWorld();
  canSave = false;
}
let paused = false,
  speed = 1,
  selected = null,
  last = 0,
  lastUI = -1,
  lastSave = 0,
  renderedEvents = "";
const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const canvas = $("island"),
  draw = createRenderer(canvas);
const cards = PEOPLE.map((p, id) => {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "resident";
  b.setAttribute("aria-pressed", "false");
  b.innerHTML = `<span class="avatar">${portrait(p)}</span><span><strong>${p.name}</strong><small>${p.trait}</small><span class="memory-mark">MUISTO</span></span><span class="arrow" aria-hidden="true">↗</span>`;
  b.addEventListener("click", () => select(id));
  $("residents").append(b);
  return b;
});
function select(id) {
  selected = selected === id ? null : id;
  updateUI();
  draw(world, selected, reducedMotion);
}
function save() {
  if (!canSave) return;
  try {
    localStorage.setItem(STORAGE_KEY, serialize(world));
  } catch {
    canSave = false;
  }
  $("save-status").textContent = canSave
    ? "Tallentuu tähän selaimeen."
    : "Tallennus ei ole käytettävissä. Maailma säilyy vain tämän käynnin ajan.";
}
function updateUI() {
  const time = clock(world.elapsed);
  $("clock").textContent = `Päivä ${time.day} · ${time.label}`;
  $("phase").textContent = {
    night: "Saaren yö",
    morning: "Aamun valo",
    day: "Päivän pienet puuhat",
    evening: "Ilta saapuu",
  }[phase(world.elapsed)];
  cards.forEach((b, id) => {
    b.querySelector("small").textContent = world.people[id].action;
    b.classList.toggle("has-memory", Boolean(world.memories[id]));
    b.setAttribute("aria-pressed", String(selected === id));
  });
  const meeting = selected === null ? null : activeEncounter(world, selected),
    memory = selected === null ? null : world.memories[selected];
  $("detail-label").textContent =
    selected === null
      ? "TUTUSTU ASUKKAISIIN"
      : meeting
        ? `${PEOPLE[selected].name} · KESKUSTELU`
        : memory
          ? `${PEOPLE[selected].name} · MUISTO PÄIVÄLTÄ ${clock(memory.at).day}`
          : `${PEOPLE[selected].name} · ${PEOPLE[selected].trait}`;
  $("detail").textContent =
    selected === null
      ? "Jokaisella on oma rytminsä. Valitse asukas ja seuraa hänen päiväänsä."
      : meeting
        ? encounterText(world.lastEncounter)
        : memoryText(selected, memory) || PEOPLE[selected].thought;
  const key = JSON.stringify(world.events.slice(0, 4));
  if (key !== renderedEvents) {
    renderedEvents = key;
    $("events").replaceChildren(
      ...world.events.slice(0, 4).map((e) => {
        const li = document.createElement("li"),
          time = document.createElement("time");
        const c = clock(e.at);
        time.textContent = `Päivä ${c.day} · ${c.label}`;
        li.append(time, document.createTextNode(e.text));
        return li;
      }),
    );
  }
  $("plant").disabled = world.planted.length >= 24;
  if (world.planted.length >= 24) $("plant").textContent = "Saari on istutettu";
}
$("pause").addEventListener("click", () => {
  paused = !paused;
  $("pause").textContent = paused ? "▶" : "Ⅱ";
  $("pause").setAttribute(
    "aria-label",
    paused ? "Jatka maailmaa" : "Pysäytä maailma",
  );
  $("world-status").textContent = paused
    ? "Maailma odottaa sinua."
    : "Pieni maailma hengittää.";
  save();
});
$("speed").addEventListener("click", () => {
  speed = speed === 1 ? 3 : 1;
  $("speed").textContent = speed + "×";
  $("speed").setAttribute(
    "aria-label",
    `Vaihda nopeutta, nykyinen nopeus ${speed}-kertainen`,
  );
});
$("plant").addEventListener("click", () => {
  const result = plantTree(world);
  $("world-status").textContent = result.message;
  updateUI();
  draw(world, selected, reducedMotion);
  save();
});
canvas.addEventListener("click", (e) => {
  const r = canvas.getBoundingClientRect(),
    x = ((e.clientX - r.left) / r.width) * 1100,
    y = ((e.clientY - r.top) / r.height) * 760;
  let best = null,
    distance = 34;
  world.people.forEach((p, id) => {
    const [px, py] = project(p.x, p.y),
      d = Math.hypot(x - px, y - (py - 28));
    if (d < distance) {
      best = id;
      distance = d;
    }
  });
  if (best !== null) select(best);
});
document.addEventListener("visibilitychange", () => {
  last = 0;
  if (document.hidden) save();
});
window.addEventListener("pagehide", save);
function frame(now) {
  if (!last) last = now;
  const dt = Math.min((now - last) / 1000, 0.1);
  last = now;
  if (!document.hidden) {
    if (!paused) step(world, dt * speed);
    draw(world, selected, reducedMotion);
    if (now - lastUI > 500) {
      updateUI();
      lastUI = now;
    }
    if (now - lastSave > 5000) {
      save();
      lastSave = now;
    }
  }
  requestAnimationFrame(frame);
}
if (!canSave)
  $("save-status").textContent =
    "Tallennus ei ole käytettävissä. Maailma säilyy vain tämän käynnin ajan.";
updateUI();
requestAnimationFrame(frame);
