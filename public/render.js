import {
  SIZE,
  PEOPLE,
  PLACES,
  terrain,
  noise,
  forest,
  clock,
  DAY,
  activeEncounter,
  weather,
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
function house(c, x, y, color) {
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
}
export function portrait(p) {
  return `<svg viewBox="0 0 24 30" aria-hidden="true"><path fill="${p.hair}" d="M7 3h10v4h2v9H5V7h2z"/><path fill="#ecc59b" d="M8 7h8v11H8z"/><path fill="${p.hair}" d="M7 5h10v4H7z"/><path fill="${p.color}" d="M6 17h12v9H6z"/><path fill="#424c40" d="M7 26h4v4H7zm6 0h4v4h-4z"/><path fill="#434138" d="M9 11h1v2H9zm5 0h1v2h-1z"/></svg>`;
}
function person(c, x, y, id, moving, t, selected) {
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
  if (selected) {
    oval(c, x, y - 48, 3, 3, "#f7eac1");
  }
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
    fixed.push({ x: p.home[0], y: p.home[1], kind: "house", id }),
  );
  fixed.push(
    { x: PLACES.garden[0], y: PLACES.garden[1], kind: "garden" },
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
      currentWeather = weather(world.elapsed);
    weatherLight(ctx, currentWeather.key);
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
    const objects = [
      ...fixed,
      ...world.planted.map((p) => ({ ...p, kind: "planted" })),
      ...world.people.map((p, id) => ({ ...p, kind: "person", id })),
    ].sort((a, b) => a.x + a.y - (b.x + b.y) || a.x - b.x);
    for (const o of objects) {
      let [x, y] = project(o.x, o.y);
      y -= height(o.x, o.y);
      if (o.kind === "tree") tree(ctx, x, y, o.seed);
      if (o.kind === "planted") {
        const growth = 0.23 + Math.min(1, (world.elapsed - o.at) / DAY) * 0.77;
        tree(ctx, x, y, 0.3, growth);
        if (growth < 0.5) {
          oval(ctx, x, y + 1, 7, 3, "#856e45");
          ctx.fillStyle = "#60834c";
          ctx.fillRect(x - 1, y - 12, 2, 13);
        }
      }
      if (o.kind === "house")
        house(ctx, x, y, ["#9e7153", "#8e8362", "#ad855e"][o.id]);
      if (o.kind === "person")
        person(ctx, x, y, o.id, o.route.length > 0, t, selected === o.id);
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
      }
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
