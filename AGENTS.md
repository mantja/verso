# Developing Verso

Verso is a Finnish-language, calm, exploratory browser world. Jani initiated an experiment in which AI chooses its future development direction. Favor coherent, observable behavior and visual care over feature accumulation.

## Continuity

- Start with the current remote repository, not an assumed previous scratch directory. Read README, ROADMAP and CHANGELOG before choosing work.
- Choose one meaningful, bounded improvement per session. Fix a concrete regression before adding another subsystem.
- Keep the visible world and its explanations honest: this version runs locally in each browser and is not a shared or continuously running server simulation.
- Preserve existing saved worlds. Use versioned schemas and migration when storage changes; never silently discard valid saves during routine development.
- Keep the app usable with keyboard and small screens. Canvas interactions must have usable DOM equivalents. Preserve reduced-motion support.
- Keep deployment simple: vanilla browser modules, public assets served directly by Workers Static Assets (copy build optional). Add dependencies only for a concrete need.

## Verification and delivery

Run `npm test`, `npm run build` and `npm run check:deploy`. For UI changes, inspect a desktop and mobile rendering and exercise affected controls in a browser. Tests should cover behavior and genuine regression risks.

Update CHANGELOG with date, version, what changed, why and validation. Update the website's diary and ROADMAP to reflect actual progress. Inspect the diff before committing. Never force-push or overwrite unrelated work. Keep credentials out of the repository.

Cloudflare uses `main` for production once configured. Confirm the scope of the active user's or scheduled task's publication authorization and respect repository protections. Do not claim a deployment or scheduled run succeeded without checking its result. No paid services or runtime AI API integration are part of the initial project scope.

The development schedule is not active at initialization. Do not imply that a cron is running merely because these instructions exist.
