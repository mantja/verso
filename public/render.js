import {
  SIZE,
  PEOPLE,
  HOME_DETAILS,
  ATTENTION_DETAILS,
  PLACES,
  terrain,
  noise,
  forest,
  clock,
  tide,
  activeEncounter,
  weather,
  shoreTrace,
  lowTideTrace,
  forestPathMoss,
  gardenButterflies,
  fireSparks,
  nightLights,
  gardenKeepsake,
  dayReflection,
  sharedEveningDetail,
  sharedEveningFade,
  treeGrowth,
  residentAtHome,
} from "./world.js";
const W = 1100,
  H = 760,
  TW = 25,
  TH = 13;
export function project(x, y) {
  return [550 + (x - y) * TW, 45 + (x + y) * TH];
}
function height(x, y) {
  return terrain(Math.round(x), Math.round(y)) === 2 ? 13 : 5;
}
function polygon(c, points, color) {
  c.fillStyle = color;
  c.beginPath();
  points.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y)));
  c.closePath();
  c.fill();
}
function oval(c, x, y, rx, ry, color) {
  c.fillStyle = color;
  c.beginPath();
  c.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  c.fill();
}
function tree(c, x, y, seed, growth = 1) {
  c.save();
  c.translate(x, y);
  c.scale(growth, growth);
  oval(c, 8, 2, 19, 8, "#3b66402b");
  c.fillStyle = "#76563e";
  c.fillRect(-3, -24, 6, 27);
  const tall = 48 + seed * 22;
  polygon(
    c,
    [
      [0, -tall - 18],
      [-22, -20],
      [-3, -12],
      [22, -22],
    ],
    "#456b45",
  );
  polygon(
    c,
    [
      [0, -tall - 18],
      [-22, -20],
      [-3, -12],
      [-4, -tall * 0.6],
    ],
    "#6e8f51",
  );
  polygon(
    c,
    [
      [0, -tall - 18],
      [-4, -tall * 0.6],
      [22, -22],
    ],
    "#345c42",
  );
  polygon(
    c,
    [
      [0, -tall - 23],
      [-16, -tall * 0.45],
      [-1, -tall * 0.36],
      [16, -tall * 0.47],
    ],
    "#5d8150",
  );
  polygon(
    c,
    [
      [0, -tall - 23],
      [-16, -tall * 0.45],
      [-1, -tall * 0.36],
    ],
    "#8da968",
  );
  c.restore();
}
function homeWeatherAccent(c, x, y, detail, weatherKey) {
  const [markerX, markerY] = {
    "seedling-pots": [x + 27, y - 10],
    "shore-stones": [x + 29, y - 7],
    "twig-mobile": [x + 32, y - 20],
  }[detail];
  if (weatherKey === "mist") {
    c.strokeStyle = "#f2f0d9b8";
    c.lineWidth = 2;
    c.beginPath();
    c.ellipse(markerX, markerY, 8, 7, 0, 0, Math.PI * 2);
    c.stroke();
  }
  if (weatherKey === "rain") {
    polygon(
      c,
      [
        [markerX + 7, markerY - 5],
        [markerX + 4, markerY + 1],
        [markerX + 10, markerY + 1],
      ],
      "#9dc9d1",
    );
    oval(c, markerX + 7, markerY + 1, 3, 3.5, "#7faebb");
  }
  if (weatherKey === "clearing") {
    c.strokeStyle = "#fff0ae";
    c.lineWidth = 1.5;
    c.beginPath();
    c.moveTo(markerX + 7, markerY - 10);
    c.lineTo(markerX + 7, markerY - 3);
    c.moveTo(markerX + 3, markerY - 6.5);
    c.lineTo(markerX + 11, markerY - 6.5);
    c.stroke();
  }
}
function homeDetail(c, x, y, detail, isHome, weatherKey) {
  if (detail === "seedling-pots") {
    for (const offset of [19, 29]) {
      polygon(
        c,
        [
          [x + offset - 5, y - 5],
          [x + offset + 5, y - 5],
          [x + offset + 3, y + 3],
          [x + offset - 3, y + 3],
        ],
        "#a66f4c",
      );
      c.fillStyle = "#58784d";
      c.fillRect(x + offset - 1, y - 14, 2, 10);
      oval(c, x + offset - 4, y - 12, 4, 2, "#75955d");
      oval(c, x + offset + 3, y - 15, 4, 2, "#89a76a");
    }
    if (isHome) {
      c.fillStyle = "#806342";
      c.fillRect(x + 23, y - 12, 1.5, 10);
      polygon(
        c,
        [
          [x + 24, y - 13],
          [x + 31, y - 10],
          [x + 24, y - 7],
        ],
        "#f1dfa9",
      );
    }
  }
  if (detail === "shore-stones") {
    oval(c, x + 18, y + 1, 6, 3, "#d9d4bd");
    oval(c, x + 29, y - 1, 5, 3, "#a8b6aa");
    oval(c, x + 38, y - 3, 4, 2.5, "#e7cfad");
    c.strokeStyle = "#b48268";
    c.lineWidth = 1;
    c.beginPath();
    c.arc(x + 38, y - 4, 3, Math.PI, Math.PI * 2);
    c.stroke();
    if (isHome) oval(c, x + 29, y - 7, 3.5, 6, "#f0d8a4");
  }
  if (detail === "twig-mobile") {
    c.strokeStyle = "#765c43";
    c.lineWidth = 1.5;
    c.beginPath();
    c.moveTo(x + 22, y - 47);
    c.lineTo(x + 32, y - 37);
    c.lineTo(x + 32, y - 22);
    c.moveTo(x + 24, y - 31);
    c.lineTo(x + 40, y - 31);
    for (const offset of [-6, 0, 6]) {
      c.moveTo(x + 32 + offset, y - 31);
      c.lineTo(x + 32 + offset, y - 22 + Math.abs(offset) * 0.25);
    }
    c.stroke();
    for (const offset of [-6, 0, 6])
      oval(
        c,
        x + 32 + offset,
        y - 20 + Math.abs(offset) * 0.25,
        2.5,
        4,
        "#d6c58a",
      );
    if (isHome) oval(c, x + 32, y - 20, 3.5, 5, "#f2d79a");
  }
  if (isHome) homeWeatherAccent(c, x, y, detail, weatherKey);
}
function house(c, x, y, color, detail, isHome, weatherKey) {
  oval(c, x + 7, y + 4, 32, 12, "#355e3e30");
  polygon(
    c,
    [
      [x - 24, y - 5],
      [x, y + 8],
      [x, y - 26],
      [x - 24, y - 39],
    ],
    "#e8d8ac",
  );
  polygon(
    c,
    [
      [x, y + 8],
      [x + 24, y - 5],
      [x + 24, y - 39],
      [x, y - 26],
    ],
    "#c6bf95",
  );
  polygon(
    c,
    [
      [x - 30, y - 38],
      [x - 5, y - 55],
      [x + 30, y - 39],
      [x, y - 22],
    ],
    color,
  );
  polygon(
    c,
    [
      [x - 30, y - 38],
      [x - 5, y - 65],
      [x + 22, y - 49],
      [x, y - 22],
    ],
    "#596a57",
  );
  polygon(
    c,
    [
      [x - 5, y - 65],
      [x + 30, y - 39],
      [x + 22, y - 49],
    ],
    "#3f5449",
  );
  polygon(
    c,
    [
      [x - 15, y - 1],
      [x - 7, y + 3],
      [x - 7, y - 16],
      [x - 15, y - 20],
    ],
    "#7b684c",
  );
  polygon(
    c,
    [
      [x + 8, y - 12],
      [x + 17, y - 17],
      [x + 17, y - 27],
      [x + 8, y - 22],
    ],
    "#f7d994",
  );
  c.fillStyle = "#7d7a64";
  c.fillRect(x + 10, y - 64, 7, 18);
  homeDetail(c, x, y, detail, isHome, weatherKey);
}
export function portrait(p) {
  return `<svg viewBox="0 0 24 30" aria-hidden="true"><path fill="${p.hair}" d="M7 3h10v4h2v9H5V7h2z"/><path fill="#ecc59b" d="M8 7h8v11H8z"/><path fill="${p.hair}" d="M7 5h10v4H7z"/><path fill="${p.color}" d="M6 17h12v9H6z"/><path fill="#424c40" d="M7 26h4v4H7zm6 0h4v4h-4z"/><path fill="#434138" d="M9 11h1v2H9zm5 0h1v2h-1z"/></svg>`;
}
function person(c, x, y, id, moving, t, selected, raining) {
  const p = PEOPLE[id];
  oval(c, x, y + 2, 10, 4, "#294a354a");
  if (selected) {
    c.strokeStyle = "#fff3bc";
    c.lineWidth = 2;
    c.beginPath();
    c.ellipse(x, y + 2, 15, 7, 0, 0, Math.PI * 2);
    c.stroke();
  }
  const bob = moving ? Math.sin(t * 10 + id) * 1.5 : 0;
  y += bob;
  if (raining) {
    c.strokeStyle = "#3f5149";
    c.lineWidth = 1.5;
    c.beginPath();
    c.moveTo(x + 7, y - 42);
    c.lineTo(x + 7, y - 9);
    c.quadraticCurveTo(x + 7, y - 5, x + 11, y - 7);
    c.stroke();
  }
  c.fillStyle = "#394b3f";
  c.fillRect(x - 5, y - 8, 4, 8);
  c.fillRect(x + 1, y - 8, 4, 8);
  c.fillStyle = p.color;
  c.fillRect(x - 7, y - 22, 14, 16);
  c.fillStyle = "#e7bc8f";
  c.fillRect(x - 5, y - 34, 10, 13);
  c.fillStyle = p.hair;
  c.fillRect(x - 6, y - 36, 12, 6);
  c.fillRect(x - 6, y - 31, 3, 6);
  if (raining) {
    c.fillStyle = p.color;
    c.beginPath();
    c.arc(x, y - 41, 17, Math.PI, Math.PI * 2);
    c.lineTo(x + 17, y - 39);
    c.quadraticCurveTo(x + 9, y - 43, x, y - 39);
    c.quadraticCurveTo(x - 9, y - 43, x - 17, y - 39);
    c.closePath();
    c.fill();
    c.strokeStyle = "#52645a";
    c.lineWidth = 1;
    c.stroke();
  }
  if (selected) {
    oval(c, x, y - (raining ? 63 : 48), 3, 3, "#f7eac1");
  }
}
function drawAttention(c, x, y, detail, mood) {
  c.save();
  c.lineCap = "round";
  if (mood === "mist") c.globalAlpha = 0.62;
  if (mood === "mist") oval(c, x + 24, y - 5, 21, 8, "#f4f5ed52");
  if (detail === "sprout") {
    const bowed = mood === "rain";
    c.strokeStyle = bowed ? "#466454" : "#58784d";
    c.lineWidth = 2;
    c.beginPath();
    c.moveTo(x + 21, y + 2);
    c.quadraticCurveTo(
      x + 20,
      y - 6,
      x + (bowed ? 27 : 23),
      y - (bowed ? 10 : 13),
    );
    c.stroke();
    oval(c, x + 18, y - 8, 5, 2.5, bowed ? "#6f9067" : "#86a867");
    oval(
      c,
      x + (bowed ? 31 : 27),
      y - (bowed ? 9 : 13),
      5,
      2.5,
      bowed ? "#839f73" : "#a4bd75",
    );
    if (bowed) oval(c, x + 33, y - 4, 1.8, 3, "#c8e2df");
  }
  if (detail === "ripples") {
    c.strokeStyle = mood === "rain" ? "#b8d5d1" : "#d7e7df";
    c.lineWidth = mood === "rain" ? 2.1 : 1.8;
    const rings = [[7, 3], [12, 5]];
    if (mood === "rain") rings.push([17, 7]);
    for (const [rx, ry] of rings) {
      c.beginPath();
      c.ellipse(x + 23, y - 1, rx, ry, -0.08, Math.PI, Math.PI * 2);
      c.stroke();
    }
  }
  if (detail === "trail") {
    c.fillStyle = mood === "rain" ? "#756d55" : "#efe0a9";
    const markWidth = mood === "rain" ? 6 : 5,
      markHeight = mood === "rain" ? 3.6 : 3;
    for (const [dx, dy] of [[15, 1], [22, -4], [29, -1], [35, -7]]) {
      c.save();
      c.translate(x + dx, y + dy);
      c.rotate(-0.35);
      c.fillRect(-markWidth / 2, -markHeight / 2, markWidth, markHeight);
      c.restore();
    }
  }
  if (mood === "clearing") {
    c.strokeStyle = "#fff0b7";
    c.lineWidth = 1.4;
    c.beginPath();
    c.moveTo(x + 38, y - 18);
    c.lineTo(x + 38, y - 10);
    c.moveTo(x + 34, y - 14);
    c.lineTo(x + 42, y - 14);
    c.stroke();
    oval(c, x + 38, y - 14, 1.7, 1.7, "#fff8d6");
  }
  c.restore();
}
function weatherLight(c, kind) {
  const color = {
    mist: "rgba(232,239,230,0.18)",
    rain: "rgba(63,83,85,0.13)",
    clearing: "rgba(246,224,159,0.09)",
  }[kind];
  if (!color) return;
  c.fillStyle = color;
  c.fillRect(0, 0, W, H);
}
function weatherDetails(c, kind, t) {
  if (kind === "mist") {
    for (let i = 0; i < 7; i++) {
      const drift = Math.sin(t * 0.08 + i * 1.7) * 18,
        x = noise(i, 31) * W + drift,
        y = 150 + noise(i, 32) * 450;
      oval(c, x, y, 120 + noise(i, 33) * 130, 18, "#f3f5ed35");
    }
  }
  if (kind === "rain") {
    c.strokeStyle = "#edf3ef9e";
    c.lineWidth = 1.2;
    for (let i = 0; i < 72; i++) {
      const x = noise(i, 41) * (W + 80) - 40,
        start = noise(i, 42) * H,
        y = (start + t * 34 + i * 17) % (H + 40) - 20;
      c.beginPath();
      c.moveTo(x, y);
      c.lineTo(x - 6, y + 14);
      c.stroke();
    }
  }
  if (kind === "clearing") {
    const glow = c.createRadialGradient(820, 90, 10, 820, 90, 410);
    glow.addColorStop(0, "rgba(255,239,181,0.24)");
    glow.addColorStop(0.55, "rgba(255,239,181,0.08)");
    glow.addColorStop(1, "rgba(255,239,181,0)");
    c.fillStyle = glow;
    c.fillRect(410, 0, 690, 500);
  }
}
function drawLowTideTrace(c, x, y, trace, strength) {
  c.save();
  c.globalAlpha = strength * 0.85;
  c.strokeStyle = "#779988";
  c.lineWidth = 1.2;
  c.lineCap = "round";
  if (trace.key === "stone") {
    for (const [rx, ry, offset] of [
      [14, 6, 0],
      [19, 8, 4],
    ]) {
      c.beginPath();
      c.ellipse(x, y + offset, rx, ry, 0, 0.12 * Math.PI, 0.88 * Math.PI);
      c.stroke();
    }
  }
  if (trace.key === "shell") {
    for (const offset of [-14, -7, 0, 7, 14]) {
      c.beginPath();
      c.moveTo(x, y + 2);
      c.quadraticCurveTo(x + offset * 0.45, y + 7, x + offset, y + 11);
      c.stroke();
    }
  }
  if (trace.key === "driftwood") {
    for (const offset of [6, 11]) {
      c.beginPath();
      c.moveTo(x - 16, y + offset);
      c.quadraticCurveTo(x - 2, y + offset + 4, x + 17, y + offset - 1);
      c.stroke();
    }
  }
  c.restore();
}
function drawShoreTrace(c, x, y, trace, lowTideDetail) {
  if (lowTideDetail)
    drawLowTideTrace(c, x, y, trace, lowTideDetail.strength);
  oval(c, x, y + 2, 17, 6, "#5d776653");
  if (trace.key === "stone") {
    oval(c, x, y - 1, 9, 5, "#e5ddc5");
    oval(c, x - 3, y - 3, 3, 1.5, "#fff9e5");
  }
  if (trace.key === "shell") {
    c.fillStyle = "#efd6b7";
    c.beginPath();
    c.arc(x, y, 8, Math.PI, Math.PI * 2);
    c.lineTo(x, y + 3);
    c.closePath();
    c.fill();
    c.strokeStyle = "#c9997c";
    c.lineWidth = 1;
    for (const offset of [-4, 0, 4]) {
      c.beginPath();
      c.moveTo(x, y + 2);
      c.lineTo(x + offset, y - 6);
      c.stroke();
    }
  }
  if (trace.key === "driftwood") {
    c.strokeStyle = "#96765a";
    c.lineWidth = 4;
    c.lineCap = "round";
    c.beginPath();
    c.moveTo(x - 11, y + 2);
    c.lineTo(x + 11, y - 4);
    c.moveTo(x + 2, y - 1);
    c.lineTo(x + 7, y - 10);
    c.stroke();
    c.lineCap = "butt";
  }
}
function drawMossStone(c, x, y, moss) {
  oval(c, x + 2, y + 3, 18, 6, "#3e5b4a42");
  oval(c, x, y, 15, 7, "#717b72");
  oval(c, x - 2, y - 3, 13, 6, "#a5aa98");
  if (moss.stage >= 1)
    oval(c, x - 7, y - 5, 6, 2.8, "#809663");
  if (moss.stage >= 2) {
    oval(c, x + 1, y - 4, 7, 3.2, "#708957");
    oval(c, x - 10, y - 1, 4, 2.4, "#91a56d");
  }
  if (moss.stage >= 3) {
    oval(c, x + 8, y - 2, 6, 3, "#66804f");
    oval(c, x - 1, y, 9, 2.5, "#7f985f");
  }
}
function drawButterflies(c, x, y, t) {
  const colors = ["#efd58a", "#d7e6c0", "#d9b58f"];
  for (let i = 0; i < colors.length; i++) {
    const angle = t * 0.65 + i * 2.2,
      bx = x + Math.cos(angle) * (19 + i * 4),
      by = y - 28 + Math.sin(angle * 1.35) * 8 - i * 3,
      wing = 1.4 + Math.abs(Math.sin(t * 5 + i * 1.7)) * 2.2;
    c.fillStyle = colors[i];
    c.beginPath();
    c.ellipse(bx - 2.5, by, 3.2, wing, -0.35, 0, Math.PI * 2);
    c.ellipse(bx + 2.5, by, 3.2, wing, 0.35, 0, Math.PI * 2);
    c.fill();
    oval(c, bx, by + 0.5, 0.8, 2.3, "#635b43");
  }
}
function drawFireSparks(c, x, y, t) {
  c.save();
  c.shadowColor = "#f7c96a";
  c.shadowBlur = 7;
  for (let i = 0; i < 6; i++) {
    const rise = (t * 0.22 + i / 6) % 1,
      drift = Math.sin(t * 1.3 + i * 2.1) * (4 + rise * 8),
      size = 2.4 - rise * 1.2;
    oval(
      c,
      x + drift,
      y - 18 - rise * 48,
      size,
      size,
      `rgba(248,211,126,${0.9 - rise * 0.55})`,
    );
  }
  c.restore();
}
function drawFireReflection(c, x, y, t, reflection) {
  const colors = {
    tree: "#b9d68b",
    keepsake: "#e4d78d",
    shore: "#d8e2d7",
    butterflies: "#efd58a",
    rain: "#a9cddd",
  };
  c.save();
  c.globalCompositeOperation = "lighter";
  c.shadowColor = colors[reflection.key];
  c.shadowBlur = 9;
  for (let i = 0; i < 4; i++) {
    const angle = t * 0.24 + i * Math.PI / 2;
    oval(
      c,
      x + Math.cos(angle) * 18,
      y - 43 + Math.sin(angle) * 5,
      2.4,
      2.4,
      colors[reflection.key],
    );
  }
  c.restore();
}
function drawSharedEveningDetail(c, x, y, detail, selected, mood, fade) {
  const focusKey = detail.members.includes(selected)
      ? ATTENTION_DETAILS[selected].key
      : null,
    raining = mood === "rain";
  c.save();
  c.lineCap = "round";
  c.globalAlpha = fade * (mood === "mist" ? 0.66 : 1);
  if (mood === "mist") oval(c, x, y - 3, 31, 11, "#f4f5ed52");
  oval(c, x, y + 3, 25, 8, "#37544536");
  if (detail.key.includes("ripples")) {
    c.save();
    c.strokeStyle =
      focusKey === "ripples"
        ? raining
          ? "#e2f4ef"
          : "#f1faf5"
        : raining
          ? "#b8d5d1"
          : "#d7e7df";
    c.lineWidth = focusKey === "ripples" ? 2.4 : raining ? 2.1 : 1.8;
    if (focusKey === "ripples") {
      c.shadowColor = "#cce9dd";
      c.shadowBlur = 7;
    }
    const rings = [[9, 3], [16, 5]];
    if (raining) rings.push([22, 7]);
    for (const [rx, ry] of rings) {
      c.beginPath();
      c.ellipse(x, y, rx, ry, -0.08, 0, Math.PI * 2);
      c.stroke();
    }
    c.restore();
  }
  if (detail.key.includes("trail")) {
    c.save();
    c.fillStyle =
      focusKey === "trail"
        ? raining
          ? "#a99d75"
          : "#fff0b7"
        : raining
          ? "#756d55"
          : "#efe0a9";
    if (focusKey === "trail") {
      c.shadowColor = raining ? "#d4c48d" : "#f6d887";
      c.shadowBlur = 7;
    }
    for (const [dx, dy] of [[-21, 6], [-13, 2], [-5, 5], [3, 1]]) {
      c.save();
      c.translate(x + dx, y + dy);
      c.rotate(-0.35);
      const focusScale = focusKey === "trail" ? 1.15 : 1,
        markWidth = raining ? 6 : 5,
        markHeight = raining ? 3.6 : 3;
      c.fillRect(
        (-markWidth * focusScale) / 2,
        (-markHeight * focusScale) / 2,
        markWidth * focusScale,
        markHeight * focusScale,
      );
      c.restore();
    }
    c.restore();
  }
  if (detail.key.includes("sprout")) {
    c.save();
    const stemX = detail.key === "sprout-ripples" ? x : x + 11;
    c.strokeStyle =
      focusKey === "sprout"
        ? raining
          ? "#648a70"
          : "#6f965d"
        : raining
          ? "#466454"
          : "#58784d";
    c.lineWidth = focusKey === "sprout" ? 2.5 : 2;
    if (focusKey === "sprout") {
      c.shadowColor = "#b8d68c";
      c.shadowBlur = 7;
    }
    c.beginPath();
    c.moveTo(stemX, y + 2);
    c.quadraticCurveTo(
      stemX - 1,
      y - 7,
      stemX + (raining ? 6 : 2),
      y - (raining ? 10 : 14),
    );
    c.stroke();
    const leafScale = focusKey === "sprout" ? 1.15 : 1;
    oval(
      c,
      stemX - 4,
      y - 8,
      5 * leafScale,
      2.5 * leafScale,
      raining ? "#6f9067" : "#86a867",
    );
    oval(
      c,
      stemX + (raining ? 10 : 6),
      y - (raining ? 9 : 14),
      5 * leafScale,
      2.5 * leafScale,
      raining ? "#839f73" : "#a4bd75",
    );
    if (raining) oval(c, stemX + 12, y - 4, 1.8, 3, "#c8e2df");
    c.restore();
  }
  if (mood === "clearing") {
    c.strokeStyle = "#fff0b7";
    c.lineWidth = 1.4;
    c.beginPath();
    c.moveTo(x + 23, y - 18);
    c.lineTo(x + 23, y - 10);
    c.moveTo(x + 19, y - 14);
    c.lineTo(x + 27, y - 14);
    c.stroke();
    oval(c, x + 23, y - 14, 1.7, 1.7, "#fff8d6");
  }
  c.restore();
}
function drawGardenKeepsake(c, x, y) {
  oval(c, x + 2, y + 3, 18, 6, "#526c5940");
  oval(c, x, y, 15, 6, "#b8ad86");
  c.strokeStyle = "#d7ca82";
  c.lineWidth = 3;
  c.beginPath();
  c.ellipse(x, y - 2, 10, 4, -0.08, 0, Math.PI * 2);
  c.stroke();
  c.strokeStyle = "#8e8452";
  c.lineWidth = 1;
  c.beginPath();
  c.ellipse(x, y - 2, 10, 4, -0.08, 0, Math.PI * 2);
  c.stroke();
  oval(c, x + 9, y + 1, 2.5, 1.5, "#766d43");
}
function drawNightLights(c, x, y, t) {
  c.save();
  c.globalCompositeOperation = "lighter";
  c.shadowColor = "#e9ef9c";
  c.shadowBlur = 10;
  for (let i = 0; i < 8; i++) {
    const bx = x - 54 + noise(i, 71) * 108 + Math.sin(t * 0.22 + i) * 5,
      by = y - 12 - noise(i, 72) * 45 + Math.cos(t * 0.18 + i * 1.7) * 3,
      glow = 0.62 + Math.sin(t * 0.7 + i * 2.3) * 0.2;
    oval(c, bx, by, 2.2, 2.2, `rgba(239,241,157,${glow})`);
  }
  c.restore();
}
function drawTide(c, elapsed) {
  const current = tide(elapsed),
    inset = 0.08 + current.level * 0.24,
    wetSand = `rgba(87,137,127,${0.25 + current.level * 0.25})`,
    foam = `rgba(224,239,229,${0.46 + current.level * 0.42})`,
    toward = ([x, y], center) => [
      x + (center[0] - x) * inset,
      y + (center[1] - y) * inset,
    ];
  c.save();
  c.lineCap = "round";
  c.lineWidth = 1.6;
  for (let y = 0; y < SIZE; y++)
    for (let x = 0; x < SIZE; x++) {
      if (terrain(x, y) !== 1) continue;
      const [sx, sy] = project(x, y),
        center = [sx, sy - height(x, y)],
        right = [center[0] + TW, center[1]],
        bottom = [center[0], center[1] + TH],
        left = [center[0] - TW, center[1]];
      for (const [edge, exposed] of [
        [[right, bottom], !terrain(x + 1, y)],
        [[bottom, left], !terrain(x, y + 1)],
      ]) {
        if (!exposed) continue;
        const inner = edge.map((point) => toward(point, center));
        polygon(c, [edge[0], edge[1], inner[1], inner[0]], wetSand);
        c.strokeStyle = foam;
        c.beginPath();
        c.moveTo(...inner[0]);
        c.lineTo(...inner[1]);
        c.stroke();
      }
    }
  if (current.level < 0.35) {
    const reveal = (0.35 - current.level) / 0.35;
    for (const [x, y, dx] of [[10, 21, -2], [13, 21, 3], [17, 20, 0]]) {
      const [sx, sy] = project(x, y),
        ground = sy - height(x, y);
      oval(c, sx + dx, ground + 1, 8, 3, `rgba(94,151,147,${reveal * 0.62})`);
      c.strokeStyle = `rgba(222,237,222,${reveal * 0.72})`;
      c.lineWidth = 1;
      c.beginPath();
      c.arc(sx + dx, ground, 5, Math.PI * 1.08, Math.PI * 1.86);
      c.stroke();
    }
  }
  c.restore();
}
export function createRenderer(canvas) {
  const ctx = canvas.getContext("2d"),
    base = document.createElement("canvas");
  base.width = W;
  base.height = H;
  const c = base.getContext("2d");
  const bg = c.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#d9e9df");
  bg.addColorStop(1, "#aecfc8");
  c.fillStyle = bg;
  c.fillRect(0, 0, W, H);
  // Shoals follow the coastline, with a deeper offset below the island.
  for (let sum = 0; sum < SIZE * 2; sum++)
    for (let x = 0; x < SIZE; x++) {
      const y = sum - x;
      if (y < 0 || y >= SIZE || !terrain(x, y)) continue;
      const [sx, sy] = project(x, y);
      polygon(
        c,
        [
          [sx, sy - TH + 17],
          [sx + TW + 11, sy + 17],
          [sx, sy + TH + 25],
          [sx - TW - 11, sy + 17],
        ],
        "#8dbfb0",
      );
    }
  for (let sum = 0; sum < SIZE * 2; sum++)
    for (let x = 0; x < SIZE; x++) {
      const y = sum - x,
        type = terrain(x, y);
      if (y < 0 || y >= SIZE || !type) continue;
      const [sx, sy] = project(x, y),
        h = height(x, y),
        n = noise(x, y);
      polygon(
        c,
        [
          [sx - TW, sy - h],
          [sx, sy + TH - h],
          [sx, sy + TH + 7],
          [sx - TW, sy + 7],
        ],
        type === 1 ? "#b7b58d" : "#899b64",
      );
      polygon(
        c,
        [
          [sx, sy + TH - h],
          [sx + TW, sy - h],
          [sx + TW, sy + 7],
          [sx, sy + TH + 7],
        ],
        type === 1 ? "#a9ae89" : "#738a56",
      );
      const palette =
        type === 1
          ? ["#d8d1a4", "#dfd7b0", "#d4cca0"]
          : ["#9bb477", "#a4ba7e", "#91ad70", "#a6bb80"];
      polygon(
        c,
        [
          [sx, sy - TH - h],
          [sx + TW + 0.3, sy - h],
          [sx, sy + TH - h],
          [sx - TW - 0.3, sy - h],
        ],
        palette[Math.floor(n * palette.length)],
      );
      if (type === 2 && n < 0.18) {
        c.fillStyle = "#ccd6a1";
        c.fillRect(sx - 5, sy - h - 2, 2, 3);
        c.fillRect(sx + 4, sy - h + 1, 2, 2);
      }
    }
  // Sandy paths link homes and the shared clearing.
  for (const [x, y] of [
    [10, 10],
    [11, 10],
    [12, 10],
    [13, 10],
    [12, 11],
    [12, 12],
    [12, 13],
    [12, 14],
    [11, 13],
    [10, 13],
    [9, 13],
    [8, 13],
    [14, 11],
    [15, 11],
    [16, 11],
    [17, 11],
  ]) {
    const [sx, sy] = project(x, y);
    polygon(
      c,
      [
        [sx, sy - 17],
        [sx + 18, sy - 8],
        [sx, sy + 1],
        [sx - 18, sy - 8],
      ],
      "#c4bf8d",
    );
  }
  const fixed = [];
  for (let y = 0; y < SIZE; y++)
    for (let x = 0; x < SIZE; x++)
      if (forest(x, y)) fixed.push({ x, y, kind: "tree", seed: noise(x, y) });
  PEOPLE.forEach((p, id) =>
    fixed.push({
      x: p.home[0],
      y: p.home[1],
      kind: "house",
      id,
      detail: HOME_DETAILS[id].key,
    }),
  );
  fixed.push(
    { x: PLACES.garden[0], y: PLACES.garden[1], kind: "garden" },
    { x: 9.35, y: 6.65, kind: "moss-stone" },
    { x: 12, y: 12, kind: "fire" },
  );
  let pixelRatio = 0;
  return function draw(world, selected, reducedMotion) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2),
      width = Math.round(canvas.clientWidth * dpr),
      heightPx = Math.round((width * H) / W);
    if (canvas.width !== width || pixelRatio !== dpr) {
      canvas.width = width;
      canvas.height = heightPx;
      pixelRatio = dpr;
    }
    ctx.setTransform(canvas.width / W, 0, 0, canvas.height / H, 0, 0);
    ctx.drawImage(base, 0, 0);
    const t = reducedMotion ? 0 : world.elapsed,
      currentWeather = weather(world.elapsed),
      reflection = dayReflection(world),
      sharedDetail = sharedEveningDetail(world),
      sharedFade = sharedEveningFade(world);
    weatherLight(ctx, currentWeather.key);
    drawTide(ctx, world.elapsed);
    ctx.strokeStyle = "#e8f1e28c";
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 34; i++) {
      const x = noise(i, 9) * W,
        y = 110 + noise(i, 4) * 570;
      if (
        terrain(
          Math.round(((x - 550) / TW + (y - 45) / TH) / 2),
          Math.round(((y - 45) / TH - (x - 550) / TW) / 2),
        )
      )
        continue;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(x + 10, y + Math.sin(t * 0.8 + i) * 2, x + 22, y);
      ctx.stroke();
    }
    const trace = shoreTrace(world.elapsed),
      lowTideDetail = lowTideTrace(world.elapsed),
      moss = forestPathMoss(world.elapsed),
      objects = [
      ...fixed,
      ...(trace
        ? [{ x: 20.4, y: 12.4, kind: "shore-trace", trace }]
        : []),
      ...world.planted.map((p) => ({ ...p, kind: "planted" })),
      ...world.people.map((p, id) => ({ ...p, kind: "person", id })),
    ].sort((a, b) => a.x + a.y - (b.x + b.y) || a.x - b.x);
    for (const o of objects) {
      let [x, y] = project(o.x, o.y);
      y -= height(o.x, o.y);
      if (o.kind === "tree") tree(ctx, x, y, o.seed);
      if (o.kind === "planted") {
        const growth = treeGrowth(o, world.elapsed);
        if (["rain", "clearing"].includes(currentWeather.key))
          oval(ctx, x + 2, y + 1, 10, 4, "#5a7b6a55");
        tree(ctx, x, y, 0.3, growth);
        if (growth < 0.5) {
          oval(ctx, x, y + 1, 7, 3, "#856e45");
          ctx.fillStyle = "#60834c";
          ctx.fillRect(x - 1, y - 12, 2, 13);
        }
      }
      if (o.kind === "house")
        house(
          ctx,
          x,
          y,
          ["#9e7153", "#8e8362", "#ad855e"][o.id],
          o.detail,
          residentAtHome(world, o.id),
          currentWeather.key,
        );
      if (o.kind === "person") {
        person(
          ctx,
          x,
          y,
          o.id,
          o.route.length > 0,
          t,
          selected === o.id,
          currentWeather.key === "rain",
        );
        if (selected === o.id)
          drawAttention(
            ctx,
            x,
            y,
            ATTENTION_DETAILS[o.id].key,
            currentWeather.key,
          );
      }
      if (o.kind === "shore-trace")
        drawShoreTrace(ctx, x, y, o.trace, lowTideDetail);
      if (o.kind === "moss-stone") drawMossStone(ctx, x, y, moss);
      if (o.kind === "garden") {
        polygon(
          ctx,
          [
            [x, y - 17],
            [x + 30, y],
            [x, y + 16],
            [x - 30, y],
          ],
          "#8c7c51",
        );
        for (let j = 0; j < 3; j++)
          for (let k = 0; k < 3; k++) {
            const a = x + (j - k) * 8,
              b = y + (j + k) * 4 - 9;
            ctx.fillStyle = "#c1d391";
            ctx.fillRect(a, b - 7, 3, 8);
            polygon(
              ctx,
              [
                [a, b - 3],
                [a - 6, b - 8],
                [a, b - 7],
                [a + 6, b - 10],
                [a + 3, b - 3],
              ],
              "#719152",
            );
          }
      }
      if (o.kind === "fire") {
        oval(ctx, x, y, 17, 8, "#898d70");
        for (let j = 0; j < 7; j++) {
          const a = (j / 7) * Math.PI * 2;
          oval(ctx, x + Math.cos(a) * 13, y + Math.sin(a) * 6, 4, 3, "#b9b89a");
        }
        polygon(
          ctx,
          [
            [x - 6, y],
            [x + 7, y],
            [x + 4, y - 12],
            [x + 1, y - 8],
            [x - 2, y - 19 - Math.sin(t * 4) * 3],
          ],
          "#d89555",
        );
        polygon(
          ctx,
          [
            [x - 3, y],
            [x + 4, y],
            [x, y - 11],
          ],
          "#f3d596",
        );
        if (fireSparks(world.elapsed)) drawFireSparks(ctx, x, y, t);
        if (reflection) drawFireReflection(ctx, x, y, t, reflection);
      }
    }
    if (sharedDetail) {
      const [x, ground] = project(...PLACES.fire);
      drawSharedEveningDetail(
        ctx,
        x + 45,
        ground - height(...PLACES.fire) + 10,
        sharedDetail,
        selected,
        currentWeather.key,
        sharedFade,
      );
    }
    if (gardenButterflies(world.elapsed)) {
      const [x, ground] = project(...PLACES.garden);
      drawButterflies(ctx, x, ground - height(...PLACES.garden), t);
    }
    if (gardenKeepsake(world.elapsed)) {
      const [x, ground] = project(...PLACES.garden);
      drawGardenKeepsake(ctx, x + 41, ground - height(...PLACES.garden) + 5);
    }
    // Draw quiet speech marks above the scenery so the meeting stays visible.
    // The same information is available in the resident buttons and event log.
    world.people.forEach((p, id) => {
      if (!activeEncounter(world, id)) return;
      const [x, ground] = project(p.x, p.y);
      const y = ground - height(p.x, p.y) - 57;
      oval(ctx, x, y, 15, 10, "#fff6d9");
      polygon(ctx, [[x - 4, y + 7], [x - 5, y + 15], [x + 4, y + 7]], "#fff6d9");
      for (const offset of [-6, 0, 6]) oval(ctx, x + offset, y, 1.5, 1.5, "#47634a");
    });
    // Subtle day/night light keeps the island readable at every hour.
    const h = clock(world.elapsed).hour;
    const darkness =
      h < 5
        ? 0.3
        : h < 8
          ? (0.3 * (8 - h)) / 3
          : h > 20
            ? Math.min(0.3, (h - 20) * 0.075)
            : 0;
    if (darkness) {
      ctx.fillStyle = `rgba(29,49,75,${darkness})`;
      ctx.fillRect(0, 0, W, H);
    }
    if (h >= 17 && h < 21) {
      ctx.fillStyle = "rgba(219,167,103,0.09)";
      ctx.fillRect(0, 0, W, H);
    }
    if (nightLights(world.elapsed)) {
      const [x, ground] = project(...PLACES.lookout);
      drawNightLights(ctx, x, ground - height(...PLACES.lookout), t);
    }
    weatherDetails(ctx, currentWeather.key, t);
    // A quiet compass, drawn as part of the map.
    ctx.save();
    ctx.translate(1000, 110);
    ctx.strokeStyle = "#648c7b";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, -16);
    ctx.lineTo(0, 16);
    ctx.moveTo(-12, 0);
    ctx.lineTo(12, 0);
    ctx.stroke();
    polygon(
      ctx,
      [
        [0, -17],
        [-4, -5],
        [4, -5],
      ],
      "#648c7b",
    );
    ctx.fillStyle = "#648c7b";
    ctx.font = "10px Arial";
    ctx.textAlign = "center";
    ctx.fillText("P", 0, -25);
    ctx.restore();
  };
}
