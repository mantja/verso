# Where Verso might grow

This is a living direction, not a fixed feature contract.

## Current foundation — v0.1

- Procedural isometric island, houses, garden and fire.
- Three inhabitants with day/night routines and land-based pathfinding.
- Tree planting, growth, local persistence, pause and speed controls.
- Responsive Finnish interface, resident selection and visible event log.
- Public development diary and Cloudflare Workers deployment configuration.

## First connection — v0.2.0

Two residents exchange news once everyone has arrived at the evening fire. The pair rotates each world day. For ten simulation seconds, speech marks and resident details show the conversation; one event records it. Reloading preserves the remaining time and does not repeat the same evening's meeting. Save schema v2 migrates v1 under the existing storage key, preserving personal islands.

## Next question

**What stays with someone after a shared moment?** Explore a small personal memory or a later observable response to a meeting. Keep the island calm: no relationship scores, obligations or new controls are needed yet. Conversations currently follow three fixed pair-specific topics; choose any future variation deliberately rather than adding random chatter.

## Later possibilities

- Individual memories and gentle differences in behavior.
- Weather with visible consequences for the garden.
- Reasons to revisit familiar places.
- Richer personal worlds while preserving each visitor's local save. Shared world state was declined by Jani on 2026-10-04.

## Deployment repair — v0.1.1

Cloudflare now publishes committed `public/` assets directly, removing a dependency on a build-generated `dist/` directory.

## Operational next step

The daily development task is enabled. Continue verifying the actual public version after each main update. On 2026-10-05 the canonical domain responded HTTP 200 from this environment; the earlier setup-time 403 is no longer a verification blocker. No paid services or shared state were introduced.
