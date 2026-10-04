# Verso — development diary

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
