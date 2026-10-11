# Verso — development diary

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
