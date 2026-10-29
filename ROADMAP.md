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

## A brief garden visitor — v0.9.0

Three small butterflies visit the garden during the first hours of a clear morning. Aava pauses to follow their flight, changing her action and adding one arrival event. Reduced-motion visitors see the same butterflies at rest. The moment is derived from existing time and weather, and memory-guided visits still take priority, so save schema remains v3.

## Sparks in the clearing — v0.10.0

On clear evenings, Paju tends the fire and listens to its crackle while a handful of warm sparks rise above the clearing. The sparks remain visible without movement in reduced-motion mode, and the canvas description names the moment. Existing conversations continue normally. The evening is derived from existing time and weather, so save schema remains v3.

## A different daytime path — v0.11.0

The residents now alternate between two later-day routes. Their familiar morning places, memory-guided visits and evening gathering remain intact, but on every other day Aava heads to the shore, Otso explores the forest path and Paju tends the garden. Route choice is derived from the existing world day, so it adds variety without a new control, random result or save migration.

## A trace for someone else — v0.12.0

On misty days when his later route reaches the garden, Paju weaves a small grass ring and leaves it on a garden stone. The trace remains through the night, and Aava pauses to notice it on the following rainy morning. A fresh conversation memory still takes priority. The moment is derived from the existing route, weather and time, so it adds continuity between residents without shared state or a save migration.

## Small lights after dark — v0.13.0

After dusk on clear nights, eight small lights drift near the forest path and their appearance enters the event log once. Reduced-motion visitors see the same lights held still, while the canvas description names the moment without relying only on the drawing. The lights are derived from existing time and weather, so save schema remains v3.

## Homes with a quiet signature — v0.14.0

Each doorstep now carries one small, permanent detail: seedling pots for Aava, a row of shore stones for Otso and a twig mobile for Paju. The details distinguish the homes visually without adding dialogue, chores or collectibles. The canvas description exposes the same information to visitors who do not see the drawing. This is a rendering-only addition, so save schema remains v3.

## A pause beneath a planted tree — v0.15.0

Once a visitor-planted tree reaches maturity, one resident at a time visits it during the daytime round. The resident rotates with the world day, and mature trees rotate too when there is more than one. Rain changes the pause into shelter beneath the canopy. The visit is derived from existing tree and world times, so it adds no task, reward, shared state or save migration.

## The day's echo at the fire — v0.16.0

During the evening, four soft motes above the fire and a short Finnish caption recall one special observation that actually happened during that island's current day. The echo is chosen from the persisted event history, so a missed moment is never invented and a reload does not erase a real one. Old days are ignored. This adds no new task, shared state or save migration.

## Three ways of noticing — v0.17.0

Selecting a resident now reveals one small visual trace beside them wherever they are: Aava notices a pair of leaves, Otso sees ripple-like rings and Paju follows a winding line of steps. The three stable visual languages let the same evening clearing look subtly different through each resident's attention without generating fresh text on every visit. The canvas description exposes the selected trace without relying on sight. This is a rendering-only addition, so save schema remains v3.

## Weather in the trace — v0.18.0

The four-day weather cycle now changes the selected resident's attention trace without changing its identity. Mist softens every trace; rain bends Aava's leaves and adds a droplet, expands Otso's ripples and darkens Paju's steps; clearing light leaves a small glint. The canvas description names the weather's effect. The variation is derived from existing weather and selection, so it adds no event, shared state or save migration.

## Two traces meet — v0.19.0

After the existing evening encounter, its two participants now leave one combined visual trace beside the fire for the rest of that evening. Aava's sprout can rise from Otso's rings, Paju's steps can cross Otso's rings, or Paju's steps can end at Aava's sprout. The canvas description names the pair-specific mark. It is derived from the current day's already saved encounter and disappears at night, so it adds no dialogue, event, shared state or save migration.

## One trace, two viewpoints — v0.20.0

Selecting either participant now gently brightens their familiar part of the shared evening trace. The other resident's part remains visible and the pair-specific composition stays in place, so selection changes emphasis rather than rewriting the meeting. The canvas description names the same shift. It is derived from the current selection and already saved encounter, so it adds no event, shared state or save migration.

## Weather reaches the shared trace — v0.21.0

The evening's current weather now reshapes both familiar parts of the shared mark. Mist softens the whole composition, rain bows the sprout, widens the rings and darkens the steps, while clearing light adds a small glint. Participant selection still brightens one part without hiding the other, and the canvas description names the weather's effect. Everything is derived from existing time, weather, selection and encounter state, so save schema remains v3.

## Fading into night — v0.22.0

The shared trace now begins to fade during the evening's last half-hour and lingers faintly for the first quarter-hour of night. Its pair, weather treatment and selected viewpoint remain intact throughout the transition, while the canvas description names the fading state. The opacity is derived from the existing world clock, so pause and speed controls affect it naturally and save schema remains v3.

## A breathing shoreline — v0.23.0

The island now completes one slow tide cycle during every world day. At high tide a translucent wet edge and pale foam reach inward across the front shore; as the water retreats, more dry sand and three shallow pools are revealed. Four Finnish descriptions make the high, falling, low and rising states available beyond the drawing. Tide level is derived from the existing clock, so pause and speed controls affect it naturally and save schema remains v3.

## Otso notices the high-water line — v0.24.0

On clear mornings, Otso now pauses during his already familiar shore visit to follow the high-water line. His resident card and one arrival event name the moment, and the existing evening echo can recall it if it truly happened. A fresh conversation memory and a mature planted-tree visit still take priority. The observation is derived from the existing route, weather and tide, so it adds no new route, task, shared state or save migration.

## Low tide redraws a familiar trace — v0.25.0

During clearing weather, low tide now reveals a different wash pattern around each existing rain-borne shore trace: curved lines around the pale stone, a fan beneath the shell and two water-drawn streaks beside the driftwood. The pattern strengthens and fades with the tide and is named in the canvas description. It is derived from existing weather, trace rotation and tide level, so it adds no resident routine, event, collectible, shared state or save migration.

## Moss keeps slow time — v0.26.0

A grey stone beside the forest path now gathers moss in three quiet stages across the first seven world days. Its readable canvas description follows the same change. The stage is derived from existing elapsed time and then remains fully mossed, so old personal islands need no new state or migration and the sign never resets into a younger form.

## Next question

**How could one doorstep detail quietly show that its resident is home without adding an action, event or saved state?** Keep it personal, legible and compatible with existing routines.

## Later possibilities

- More small traces of time in familiar places.
- Richer personal worlds while preserving each visitor's local save. Shared world state was declined by Jani on 2026-10-04.

## Deployment repair — v0.1.1

Cloudflare now publishes committed `public/` assets directly, removing a dependency on a build-generated `dist/` directory.

## Operational next step

The daily development task is enabled. Continue verifying the actual public version after each main update. On 2026-10-05 the canonical domain responded HTTP 200 from this environment; the earlier setup-time 403 is no longer a verification blocker. No paid services or shared state were introduced.
