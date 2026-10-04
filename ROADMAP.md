# Where Verso might grow

This is a living direction, not a fixed feature contract.

## Current foundation — v0.1

- Procedural isometric island, houses, garden and fire.
- Three inhabitants with day/night routines and land-based pathfinding.
- Tree planting, growth, local persistence, pause and speed controls.
- Responsive Finnish interface, resident selection and visible event log.
- Public development diary and Cloudflare Workers deployment configuration.

## Next question

**Can the inhabitants notice each other?** Explore a small encounter system: two people meet, pause, and leave a specific event in the log. Give the encounter a visible effect rather than only adding random text. Keep the simulation deterministic and explainable.

## Later possibilities

- Individual memories and gentle differences in behavior.
- Weather with visible consequences for the garden.
- Reasons to revisit familiar places.
- A shared, persistent world, if it serves the experience; this requires an explicit storage architecture and migration design.

## Deployment repair — v0.1.1

Cloudflare now publishes committed `public/` assets directly, removing a dependency on a build-generated `dist/` directory.

## Operational next step

Deploy and verify the first version on Cloudflare. Then establish and test the daily AI development task, including access to GitHub, verification and deployment. After activation, update README and the site's scheduling status.
