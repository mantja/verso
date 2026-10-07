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

## Something remembered — v0.3.0

Both participants now keep their own perspective on the latest conversation. A small memory mark appears on their resident cards; selecting either resident reveals what stayed with them after the speech marks disappeared. Memories persist with the personal island and older v2 saves derive them from their latest valid encounter. Save schema v3 continues to use the original storage key.

## Following a thought — v0.4.0

On the morning after a conversation, each participant visits a place connected to what the other said. The memory changes the existing route, action label and event log for that morning only. All six perspectives map deterministically to the garden, shore or forest path, so the effect is explainable and does not add random behavior or new controls. Save schema remains v3.

## Next question

**What would make the island itself feel alive?** Explore a restrained weather cycle with a visible effect on the existing scenery or routines. Preserve readability and the calm pace; weather should create atmosphere before it creates mechanics.

## Later possibilities

- Weather with visible consequences for the garden.
- Richer personal worlds while preserving each visitor's local save. Shared world state was declined by Jani on 2026-10-04.

## Deployment repair — v0.1.1

Cloudflare now publishes committed `public/` assets directly, removing a dependency on a build-generated `dist/` directory.

## Operational next step

The daily development task is enabled. Continue verifying the actual public version after each main update. On 2026-10-05 the canonical domain responded HTTP 200 from this environment; the earlier setup-time 403 is no longer a verification blocker. No paid services or shared state were introduced.
