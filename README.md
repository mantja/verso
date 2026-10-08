# Verso

**Pieni maailma, joka kasvaa omalla tavallaan.**

A small browser-based world that grows day by day. An experiment in autonomous AI development, initiated by a human and built in the open.

Intended address: **https://verso.mechidea.fi** (domain setup is separate from this repository).

## The first chapter: Saapuminen

An original, procedurally drawn isometric island with three inhabitants: Aava, Otso and Paju. They visit the garden, shore and forest, gather at the fire in the evening, and rest at home. Plant up to 24 trees and watch the saplings grow. Select residents, pause time, or speed it up. Two residents exchange news at the evening fire, with speech marks on the map and a conversation in the resident details and event log. The pair rotates each world day. Both participants keep their own perspective on the latest conversation as a persistent memory. On the following morning, that memory briefly guides each participant to a place mentioned by the other. A calm four-day weather cycle now gives the island clear skies, drifting mist, quiet rain and clearing light.

The interface is in Finnish and adapts to mobile screens. All artwork is drawn in code; no external fonts, image services, runtime AI calls or API keys are needed.

**This first version is a personal world in each browser.** It uses localStorage, not a shared server database. One world day takes four visible minutes at 1× speed. Time stops when the tab is hidden or closed. Clearing browser data removes that browser's world. If storage is unavailable the simulation still works, with a visible notice.

## Run locally

Node.js 22 or newer:

```sh
npm ci
npm run dev
```

Open http://localhost:4173. To verify and build:

```sh
npm test
npm run build
npm run check:deploy
```

`public/` contains the complete application. Wrangler publishes it directly. The optional build copies it to `dist/` for other static hosts. The runtime has no framework dependencies; Wrangler is a pinned deployment-only dependency.

## Deploy to Cloudflare Workers

Use **Workers**, with Workers Static Assets, and connect this GitHub repository. No separate Worker JavaScript entrypoint or database is needed for this version. `wrangler.jsonc` configures static assets directly from the committed `public/` directory.

| Setting | Value |
| --- | --- |
| Repository | `mantja/verso` |
| Production branch | `main` |
| Worker name | `verso` |
| Root directory | repository root |
| Build command | `npm test` (recommended; no asset build is required) |
| Deploy command | `npx wrangler deploy` |

Cloudflare installs dependencies from `package-lock.json`. After the initial deployment, check the generated workers.dev URL. In the Worker's **Settings → Domains & Routes**, add the custom domain `verso.mechidea.fi`. This assumes `mechidea.fi` is managed in the same Cloudflare account. The repository does not automatically change DNS or register a domain.

CLI alternative after authenticating with Cloudflare: `npm run deploy`.

Documentation: [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/), [Git builds](https://developers.cloudflare.com/workers/ci-cd/builds/), [Custom domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).

## The development experiment

The ChatGPT task **Verson yöllinen kehitys** is enabled, starting 2026-10-05 around 03:00 Europe/Helsinki daily. Each run chooses, implements and checks one coherent improvement, then publishes tested changes to main through the existing Cloudflare Git integration. Target: the new version visible by 06:00 Finnish time, with an honest report if development or publishing fails. Completion by the target time is not guaranteed.

Jani confirmed on 2026-10-04 that **each visitor keeps a personal island**; a shared world is outside the chosen direction. The initial deployment works. Nightly sessions have added evening encounters, personal memories, memory-guided morning visits and an atmospheric weather cycle while preserving existing browser saves.

Each development session should read `AGENTS.md`, `ROADMAP.md` and `CHANGELOG.md`, inspect the current source, choose one coherent improvement, verify it and document the reason for the choice. Repairs and refinement count as progress. The website's development diary should describe actual changes, not promises.

See [CHANGELOG.md](CHANGELOG.md) for development history. MIT license; original license retained.
