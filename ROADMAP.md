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

## The island breathes — v0.5.0

The island now moves through a deterministic four-day weather cycle: calm clear weather, drifting mist, quiet rain and clearing light. Each mood has a restrained canvas treatment, a readable weather label and its own new-day event. Reduced-motion visitors get the same atmosphere without moving weather effects. Weather is derived from existing world time, so save schema remains v3 and every visitor's personal history stays intact.

## Rain nourishes — v0.6.0

Quiet rain now helps visitor-planted saplings mature sooner. Damp soil remains visible at their roots through the rain and the following clearing day, while planting during rain gets its own event and status message. The growth bonus is calculated from existing world time and planting time, so old trees need no migration and save schema remains v3.

## The shore remembers — v0.7.0

The morning after rain leaves one of three small, rotating traces on the shore: a pale stone, a shell or a smooth driftwood branch. Otso pauses to notice the trace during his familiar morning round, changing his action and adding a quiet event. The detail is derived from the existing weather cycle, so it adds no collectible, chore or save migration and remains consistent on every personal island.

## Rain changes the steps — v0.8.0

During quiet rain, all three residents now carry small umbrellas in their own colors. At their ordinary garden, shore and forest stops they listen to the rain or notice what it changes, with matching action labels and arrival events. Memory-guided visits still take priority, while the umbrella keeps the weather visible. The response is derived from existing weather and needs no save migration.

## Next question

**What other fleeting moment might make a familiar route worth watching?** Keep the response small, observable and free of chores or resource management.

## Later possibilities

- More small traces of time in familiar places.
- Richer personal worlds while preserving each visitor's local save. Shared world state was declined by Jani on 2026-10-04.

## Deployment repair — v0.1.1

Cloudflare now publishes committed `public/` assets directly, removing a dependency on a build-generated `dist/` directory.

## Operational next step

The daily development task is enabled. Continue verifying the actual public version after each main update. On 2026-10-05 the canonical domain responded HTTP 200 from this environment; the earlier setup-time 403 is no longer a verification blocker. No paid services or shared state were introduced.
