# Verso — development diary

## 0.15.0 · 2026-10-18 · Istutetun puun varjossa

**Choice:** let the residents acknowledge the visitor's existing contribution instead of adding another object or control. A mature planted tree now becomes a quiet stop on their daytime round.

- One resident per world day pauses beside a mature visitor-planted tree, rotating among Aava, Otso and Paju. When several trees are mature, the visited tree rotates as well.
- During quiet rain the same visit becomes a pause beneath the canopy to listen to the rain. The resident action and one arrival event make the moment readable beyond the drawing.
- The visit is derived from existing planting and world times. Save schema remains v3, so earlier personal islands, trees and memories stay compatible.
- Updated the visible development diary and next direction. No dependency, shared state, paid service or hosting change was added.

Validation: all twenty-six tests cover tree maturity, resident rotation, rainy shelter, unchanged routines without mature trees and the single arrival event in addition to the existing world behavior. `npm ci`, `npm test`, `npm run check:deploy`, `npm run build`, JavaScript syntax checks and `git diff --check` passed. The actual canvas renderer produced and passed visual inspection at desktop and mobile widths. Production verification follows the main update and is reported in the delivery message.

Limitations: only one resident visits one mature tree per day. The visit is observational and does not alter the tree or create a new memory.

## 0.14.0 · 2026-10-17 · Kolme omanlaista ovenpielusta

**Choice:** answer the roadmap's home question with a permanent visual detail rather than a new interaction. The houses now reveal a little about their residents even while everyone is away.

- Two seedling pots sit beside Aava's door, a row of wave-smoothed stones marks Otso's doorstep and a small twig mobile hangs from Paju's eaves.
- The canvas description names the details so the change is not conveyed only through the drawing.
- The details are part of the procedural artwork. Save schema remains v3, so earlier personal islands stay compatible.
- Updated the visible development diary and next direction. No dependency, shared state, paid service or hosting change was added.

Validation: all twenty-five tests cover the one-to-one resident detail definitions in addition to the existing world behavior. `npm ci`, `npm test`, `npm run check:deploy`, `npm run build`, JavaScript syntax checks and `git diff --check` passed. The actual canvas renderer produced and passed visual inspection at desktop and mobile widths. Production verification follows the main update and is reported in the delivery message.

Limitations: the details are permanent parts of the houses rather than objects residents interact with, and they do not change with weather or time.

## 0.13.0 · 2026-10-16 · Metsän pienet yövalot

**Choice:** answer the roadmap's night question with one restrained visual moment rather than a new activity. A clear night now gives the visitor something quiet to notice after the residents have gone home.

- Eight small lights drift near the forest path after 21.00 on clear-weather nights. Reduced-motion mode keeps the same lights visible without movement.
- The weather tooltip and canvas description name the lights, and their arrival adds one event without repeating during the same night.
- The moment is derived from the existing time and weather. Save schema remains v3, so earlier personal islands stay compatible.
- Updated the visible development diary and next direction. No dependency, shared state, paid service or hosting change was added.

Validation: all twenty-four simulation tests cover the clear-night boundaries, four-day recurrence and single event in addition to the existing world behavior. `npm ci`, `npm test`, `npm run check:deploy`, `npm run build`, JavaScript syntax checks and `git diff --check` passed. The actual canvas renderer produced and passed visual inspection at desktop and mobile widths, including reduced motion. Production verification follows the main update and is reported in the delivery message.

Limitations: the lights appear only during the clear portion of the four-day weather cycle and fade when the weather changes at midnight.

## 0.12.0 · 2026-10-15 · Ruohorengas puutarhakivellä

**Choice:** answer the roadmap's question with a small act that connects two residents across time. Paju now leaves a trace during an existing garden visit, and Aava notices it the next morning.

- During misty daytime visits Paju weaves a small grass ring and leaves it on a garden stone. His action and one arrival event describe making the trace.
- The ring remains visible through the night and the following rainy morning. Aava pauses at the garden to notice what Paju left, with a matching action and event.
- A fresh conversation memory retains priority over the discovery. The trace is derived from the existing weather, route and clock, so save schema remains v3 and earlier personal islands stay compatible.
- Updated the visible development diary and next direction. No dependency, shared state, paid service or hosting change was added.

Validation: all twenty-three simulation tests cover the trace's appearance and disappearance boundaries, both residents' actions and events, the following-morning handoff and memory priority in addition to the existing world behavior. `npm ci`, `npm test`, `npm run check:deploy`, `npm run build`, JavaScript syntax checks and `git diff --check` passed. The actual canvas renderer produced and passed visual inspection at desktop and mobile widths. Production verification follows the main update and is reported in the delivery message.

Limitations: the ring appears once per four-day weather cycle rather than becoming a persistent possession. A fresh conversation memory can guide Aava elsewhere that morning, leaving the trace visible but unnoticed.

## 0.11.0 · 2026-10-14 · Päivän toinen polku

**Choice:** answer the roadmap's question by varying an existing routine rather than adding another subsystem. A familiar day can feel different simply because the residents do not always take the same later route.

- Morning places remain familiar: Aava begins at the garden, Otso at the shore and Paju on the forest path. Their later route now alternates by world day between two existing rounds.
- On every other day Aava heads to the shore, Otso explores the forest path and Paju tends the garden. Their resident actions, walking paths and arrival events all follow the chosen route.
- Memory-guided mornings, rain reactions, evening conversations and all existing transient moments retain their priority. The route is derived from the existing world day, so save schema remains v3 and earlier personal islands stay compatible.
- Updated the visible development diary and next direction. No dependency, shared state, paid service or hosting change was added.

Validation: all twenty-two simulation tests cover both route variants, their day-to-day recurrence, place-specific actions, rainy-day actions and actual arrival positions in addition to the existing world behavior. `npm ci`, `npm test`, `npm run check:deploy`, `npm run build`, JavaScript syntax checks and `git diff --check` passed. The actual canvas renderer produced and passed visual inspection at 1100 px and 390 px widths. Production verification follows the main update and is reported in the delivery message.

Limitations: the choice alternates deterministically between two routes rather than being random. Morning specialties and memories can still lead a resident elsewhere before the later route begins.

## 0.10.0 · 2026-10-13 · Kipinöitä nuotioaukealla

**Choice:** answer the roadmap's evening question by deepening the existing fire routine instead of adding another place or system. A passing fire detail makes clear evenings distinct while keeping the visitor free to simply watch.

- On clear evenings, Paju tends the fire and listens to its crackle. His resident action and one arrival event describe the moment before and after any active conversation.
- Six warm sparks rise gently above the fire. Reduced-motion mode keeps the same sparks visible without movement, and the weather tooltip and canvas description expose the detail without relying only on the drawing.
- Existing evening conversations, memories and following-morning visits continue normally. The moment is derived from existing world time and weather, so save schema remains v3 and all earlier personal islands stay compatible.
- Updated the visible development diary and next direction. No dependency, shared state, paid service or hosting change was added.

Validation: all twenty-one simulation tests cover the clear-evening boundaries, four-day weather recurrence, Paju's action, single arrival event and return from a conversation to the correct evening routine in addition to the existing world behavior. `npm ci`, `npm test`, `npm run check:deploy`, `npm run build`, JavaScript syntax checks and `git diff --check` passed. The actual canvas renderer produced and passed visual inspection at 1100 px and 390 px widths, including reduced-motion rendering. Production verification follows the main update and is reported in the delivery message.

Limitations: sparks appear only on clear evenings. During Paju's active conversation, the conversation action temporarily takes priority, although the sparks remain visible.

## 0.9.0 · 2026-10-12 · Pouta-aamun vieraat

**Choice:** answer the roadmap's question with a genuinely passing detail on an existing route. The garden changes briefly in the morning, rewarding a timely glance without creating a collectible, task or permanent resource.

- Three pale butterflies visit the garden between 08.00 and 10.30 on clear-weather mornings. Their flight is gently animated, while reduced-motion mode keeps the same detail visible without movement.
- Aava pauses to follow the butterflies on her ordinary garden visit. Her resident action and one arrival event describe the moment without relying on the drawing alone.
- Memory-guided morning visits still take priority. The butterflies are derived from existing world time and weather, so save schema remains v3 and all earlier personal islands stay compatible.
- Updated the visible development diary and next direction. No dependency, shared state, paid service or hosting change was added.

Validation: all twenty simulation tests cover the moment's weather and time boundaries, Aava's action, single arrival event, return to her ordinary routine and memory priority in addition to the existing world behavior. `npm ci`, `npm test`, `npm run check:deploy`, `npm run build`, JavaScript syntax checks and `git diff --check` passed. The actual canvas renderer produced and passed visual inspection at 1100 px and 390 px widths, including reduced-motion rendering. Production verification follows the main update and is reported in the delivery message.

Limitations: the butterflies visit only during the first hours of clear-weather mornings. If a fresh conversation memory guides Aava elsewhere, the butterflies remain visible but she does not visit them.

## 0.8.0 · 2026-10-11 · Sade muuttaa askelia

**Choice:** finish the first weather arc by letting the residents respond to rain themselves. The reaction changes familiar routines just enough to reward watching, without adding a task or another system for the visitor to manage.

- During quiet rain, Aava, Otso and Paju carry small umbrellas in their own colors. The umbrellas remain visible while they walk and pause around the island.
- Their ordinary garden, shore and forest actions now become rain observations, reflected in resident cards and arrival events. A memory-guided morning visit still takes priority over the weather-specific action.
- The behavior is derived from the existing weather cycle. Save schema remains v3, and all earlier personal islands, trees, memories and events remain compatible.
- Updated the visible development diary and next direction. No dependency, shared state, paid service or hosting change was added.

Validation: all nineteen simulation tests cover the rain-specific actions, arrival event, destinations and memory priority in addition to the existing world behavior. `npm ci`, `npm test`, `npm run check:deploy`, `npm run build`, JavaScript syntax checks and `git diff --check` passed. The actual canvas renderer produced and passed visual inspection at 1100 px and 390 px widths, including all three umbrellas and the selected-resident marker. Production browser checks covered the v0.8.0 diary, resident selection by keyboard, pause and speed controls, planting, v3 persistence after reload and absence of page errors. The local headless Chromium binary exited before opening a page, and throttling made a two-day fast-forward in the cloud browser impractical; rain behavior is therefore covered by the simulation test and direct renderer inspection rather than a rainy DOM session.

Limitations: the new reactions belong only to quiet rain. A memory-guided morning visit keeps its own action and event, although the resident still carries an umbrella.

## 0.7.0 · 2026-10-10 · Ranta muistaa sateen

**Choice:** answer the roadmap's question with one rare detail in a familiar place. The clearing day after rain now leaves something small to notice on the shore, without turning exploration into collecting or another task.

- The clearing-day shore shows a pale stone, a shell or a smooth driftwood branch. The trace rotates deterministically after each rainy day, so returning later can reveal a different detail.
- Otso notices the trace on his familiar morning round. His resident action names what he is looking at, arrival adds one quiet event, and the canvas description exposes the same detail without relying only on the drawing.
- The trace is derived from existing world time and weather. Save schema remains v3, and all earlier personal islands, trees, memories and events remain compatible.
- Updated the visible development diary and next direction. No dependency, shared state, paid service or hosting change was added.

Validation: all eighteen simulation tests cover the rotating trace, Otso's route, action, single arrival event and save compatibility in addition to the existing world behavior. `npm ci`, `npm test`, `npm run check:deploy`, `npm run build`, JavaScript syntax checks and `git diff --check` passed. The actual canvas renderer produced and passed visual inspection at 1100 px and 390 px widths, including the clearing-day trace. A full local DOM browser run was unavailable because Chromium exited before opening a page in this runner; the unchanged responsive layout and production controls are checked after the main update and reported in the delivery message.

Limitations: the traces appear only during clearing weather and are observations rather than persistent possessions. If an immediate conversation memory guides Otso elsewhere that morning, the trace remains visible but he does not visit it.

## 0.6.0 · 2026-10-09 · Sade auttaa taimea

**Choice:** give yesterday's weather cycle one gentle, observable consequence before moving to another system. Rain now matters to the visitor's existing trees without creating chores or resource management.

- Quiet rain accelerates the growth of visitor-planted saplings by fifty percent for the time they spend in the rain. The bonus remains part of their growth after the weather clears and mature trees never regress.
- Damp soil appears beneath planted trees during rain and the following clearing day. Planting while it rains creates a specific status message and event.
- Growth is derived from the existing planting and world times, so personal islands and all v1–v3 saves remain compatible without a schema migration.
- Updated the visible development diary and next direction. No dependency, shared state, paid service or hosting change was added.

Validation: all seventeen simulation tests cover rain-assisted growth, its persistence after rain, mature-tree bounds, rain-specific planting feedback and save restoration in addition to the existing world, weather, encounter, memory, route and migration behavior. `npm ci`, `npm test`, `npm run check:deploy` and `npm run build` passed. Chromium checks passed for rainy planting feedback, v3 persistence, damp soil on the clearing day, keyboard selection, reload, reduced motion, unavailable storage and absence of page errors. Desktop (1440 px) and mobile (390 px) screenshots were visually inspected with no horizontal overflow. Actual production verification follows the main update and is reported in the delivery message.

Limitations: rain affects only trees planted by the visitor while they are still growing. Residents do not yet react to weather, and trees need no ongoing care.

## 0.5.0 · 2026-10-08 · Saari saa oman sään

**Choice:** make the island itself feel alive before adding more resident behavior. A restrained weather cycle changes the atmosphere without introducing tasks, resource management or new controls.

- The island now follows a deterministic four-day cycle through calm clear weather, drifting mist, quiet rain and clearing light. Weather is visible on the canvas and named beside the world clock.
- Mist drifts slowly, rain crosses the scenery and clearing weather adds a soft glow. Reduced-motion mode keeps every mood visible while making its weather marks static.
- Each new world day records its weather in the event log. Weather is derived from existing elapsed time, so the personal save schema remains v3 and all existing trees, memories and resident history remain compatible.
- Updated the visible development diary and next direction. No dependency, shared state, paid service or hosting change was added.

Validation: all sixteen simulation tests cover the four-day weather sequence and new-day weather event in addition to the existing world, encounter, memory, route and migration behavior. `npm ci`, `npm test`, `npm run check:deploy` and `npm run build` passed. Chromium checks passed for all four weather labels and renderings, new-day events, existing trees and memories, keyboard selection, reload, reduced motion, unavailable storage and absence of page errors. Desktop (1440 px) and mobile (390 px) screenshots were visually inspected with no horizontal overflow. Actual production verification follows the main update and is reported in the delivery message.

Limitations: weather currently changes atmosphere and the event log, but does not yet affect the garden, planted trees or resident routines.

## 0.4.0 · 2026-10-07 · Muisto näyttää tietä

**Choice:** complete the first small memory arc before opening another system. A resident's recollection now has one observable consequence on the following day instead of remaining only descriptive text.

- On the morning immediately after a conversation, both participants deviate from their ordinary routine to visit a place connected to what the other said. All six perspectives have a deterministic destination among the garden, shore and forest path.
- The changed route is visible on the map, the resident card explains where the memory leads, and arrival creates a specific event naming the earlier conversation partner.
- The visit occurs only on the next morning and does not repeat on later days. Residents who did not join the conversation keep their normal routine.
- Existing v1–v3 saves and personal islands remain compatible; no save-schema change, dependency, shared state, paid service or hosting change was needed.

Validation: all fifteen simulation tests cover the following-morning route, destination, action, event and one-morning boundary in addition to the existing world, encounter, memory and migration behavior. `npm ci`, `npm test`, `npm run check:deploy` and `npm run build` passed. Chromium checks passed for memory-guided routes, action labels and events, saved trees and memories, keyboard selection, reload, reduced-motion use, unavailable storage and absence of page errors. Desktop (1440 px) and mobile (390 px) screenshots were visually inspected with no horizontal overflow. Actual production verification follows the main update and is reported in the delivery message.

Limitations: a remembered visit currently changes one morning destination but does not create another memory or alter later conversations.

## 0.3.0 · 2026-10-06 · Jokin jää mieleen

**Choice:** give yesterday's encounters a quiet consequence before adding another visible system. A conversation now becomes part of each participant's personal history instead of disappearing when the speech marks fade.

- Both participants receive a distinct, pair-specific perspective on their latest evening conversation. Their resident cards show a small memory mark; selecting them reveals the memory and its world day.
- A later meeting refreshes memories only for its participants. Someone who was not part of that conversation keeps their earlier memory.
- Save schema v3 persists the three personal memories under the existing localStorage key. Valid v2 islands derive memories from their latest saved encounter; v1 islands, trees, time, events and residents remain compatible.
- Updated the visible development diary and next direction. No new dependencies, paid services, shared state or hosting changes.

Validation: all thirteen simulation tests cover memory creation, distinct perspectives, selective refresh, serialization, v1/v2 migration and malformed memory recovery in addition to the existing world behavior. `npm ci`, `npm test`, `npm run check:deploy` and `npm run build` passed. Chromium checks passed for v2 migration, distinct memories and labels, keyboard selection, planting, v3 reload, reduced-motion use, unavailable storage and absence of page errors. Desktop (1440 px) and mobile (390 px) screenshots were visually inspected with no horizontal overflow. Actual production verification follows the main update and is reported in the delivery message.

Limitations: memories can be read, but they do not yet influence a later routine. Each resident keeps only the latest conversation in which they participated.

## 0.2.0 · 2026-10-05 · Nuotiolla on seuraa

**Choice:** let the inhabitants notice each other before expanding the island. A quiet evening exchange gives their existing daily routines a shared moment without introducing demands on the visitor.

- Once all three residents reach the evening fire, two exchange news for ten simulation seconds. The pair rotates each world day, with a specific topic for each pair.
- Speech marks on the map, resident button labels, selected-resident details and one event make the meeting observable. Reduced-motion mode retains static speech marks; resident buttons provide keyboard access to the same content.
- Saved schema v2 preserves v1 islands under the existing localStorage key. The latest encounter is saved, so reloading resumes its remaining duration instead of repeating the evening's conversation. Islands remain personal; time still stops when the page is hidden or closed.
- Updated the visible diary and future direction. No new dependencies, paid services or hosting changes.

Validation: `npm ci`, all nine simulation tests, `npm run check:deploy` (direct `public/` assets) and `npm run build` passed. Tests cover rotating pairs, duration and stationary participants, reloading without duplicate encounters, v1 migration, malformed encounter data and frame-sized simulation steps. Chromium checks passed for natural evening encounters, resident details/event log, pause/speed, planting, migration and reload, keyboard/reduced-motion use, unavailable storage and absence of page errors. Desktop (1440 px) and mobile (390 px) screenshots were visually inspected; no horizontal overflow. Diff reviewed before publication. Actual production verification follows the main update and is reported in the delivery message.

Limitations: conversations currently use three fixed topics and do not yet create individual memories or change later behavior.

## 0.1.2 · 2026-10-04 · Nightly development enabled

Created the ChatGPT nightly development task, beginning 2026-10-05 around 03:00 Europe/Helsinki. The goal is a tested improvement published before 06:00. Recorded standing authorization to publish tested changes to main, the requirement to verify deployment, and Jani's decision to keep the islands personal. Updated the visible schedule status. The first unattended run is still pending.

Validation: automation creation confirmed enabled, GitHub read access verified, repository tests/build/deployment dry-run. Public-domain verification from the setup environment returned HTTP 403; initial site operation is user-confirmed.

## 0.1.1 · 2026-10-04 · Deployment repair

The first Cloudflare deployment failed because `dist/` did not exist at deploy time. Publish the already committed `public/` assets directly instead: this vanilla application does not require compilation. Existing Cloudflare build commands can remain, but `npm test` is sufficient.

Validation: deployment dry-run with `dist/` absent, existing simulation tests and optional build.

## 0.1.0 · 2026-10-04 · Saapuminen

**Choice:** start with a world that feels like a place worth visiting. Prefer a small, observable daily rhythm over many disconnected features.

- Created an original isometric island renderer, with forest, three homes, garden, fire and sea.
- Added Aava, Otso and Paju, each with routines across a four-minute day. Paths remain on land.
- Added personal tree planting and growth, local save restoration, pause, speed and resident selection.
- Created a responsive Finnish interface, event log, public development diary and repository continuity documents.
- Prepared static assets deployment to Cloudflare Workers, a pinned deployment tool and GitHub checks.

Validation: automated tests cover connected destinations, several complete day/night cycles, bounded planting, save round-trips and corrupt save recovery. Desktop (1440 px) and mobile (390 px) layouts were visually inspected in Chromium. Browser checks passed for pause, speed, selection, planting, save/reload, corrupt and unavailable storage, and absence of JavaScript errors. Wrangler deployment dry-run passed; production deployment remains a separate setup step.

Limitations: each browser has its own world; time passes only with the tab visible. Autonomous daily development is not yet scheduled. Inhabitants follow rules, without runtime language-model calls.
