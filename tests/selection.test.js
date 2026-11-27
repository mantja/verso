import test from "node:test";
import assert from "node:assert/strict";
import { pickResident, project } from "../public/render.js";
import { terrain } from "../public/world.js";

function center(p, width) {
  const [x, y] = project(p.x, p.y);
  const elevation = terrain(Math.round(p.x), Math.round(p.y)) === 2 ? 13 : 5;
  return [x * width / 1100, (y - elevation - 28) * width / 1100];
}
test("resident selection keeps a touch-sized target at mobile and desktop sizes", () => {
  const people = [{ x: 8, y: 8 }, { x: 17, y: 16 }];
  for (const width of [320, 354, 800, 1100]) {
    const h = width * 760 / 1100;
    people.forEach((p, id) => {
      const [x, y] = center(p, width);
      assert.equal(pickResident(people, x + 21, y, width, h), id);
      assert.equal(pickResident(people, x, y - 21, width, h), id);
      assert.equal(pickResident(people, x, y, width, h), id);
    });
    assert.equal(pickResident(people, 0, 0, width, h), null);
  }
});
test("overlapping targets select the closest resident and ignore empty or hidden canvases", () => {
  const people = [{ x: 8, y: 8 }, { x: 9, y: 8 }];
  const width = 354, h = width * 760 / 1100;
  people.forEach((p, id) => {
    const [x, y] = center(p, width);
    assert.equal(pickResident(people, x, y, width, h), id);
  });
  assert.equal(pickResident([], 10, 10, width, h), null);
  assert.equal(pickResident(people, 0, 0, 0, 0), null);
});
