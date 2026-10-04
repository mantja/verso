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
- Richer personal worlds while preserving each visitor's local save. Shared world state was declined by Jani on 2026-10-04.

## Deployment repair — v0.1.1

Cloudflare now publishes committed `public/` assets directly, removing a dependency on a build-generated `dist/` directory.

## Operational next step

The user confirmed the initial Cloudflare deployment works. The daily ChatGPT development task is now enabled, starting 2026-10-05 around 03:00 Europe/Helsinki with a 06:00 publication target. Review the first unattended run and verify the complete commit-to-deployment path. The canonical domain could not be checked from the setup environment (HTTP 403); do not treat this alone as a site outage.
