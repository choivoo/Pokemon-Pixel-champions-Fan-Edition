# Pixel Champions — Fan Edition

Unofficial noncommercial Pokémon-inspired fan project. This is **not** an official Pokémon product.

## GitHub Pages playable preview
https://choivoo.github.io/Pokemon-Pixel-champions-Fan-Edition/

The single-file hosted preview includes 18 Pokémon, a team of 3, a 14×12 interactive pixel map, five story battles, local save, simplified PP, AI combat, potions, and a simplified Terastallization mechanic.

**Limitations:** This is not full Pokémon Showdown simulation; there is no live PvP, full items, abilities, Mega Evolution, or complete rules. Do not interpret this as official Pokémon Champions. A more advanced **v1.1 ZIP** with separate HTML/CSS/JS, added status conditions and UI is available in the ChatGPT conversation; it is **not** the same code as this deployed HTML preview.

## Deployment
GitHub Actions workflow: `.github/workflows/pages.yml`. Set Settings → Pages → Source to GitHub Actions. Pushing to `main` requests a new build/deployment.

## Roadmap
A real Showdown-powered competitive mode needs a separately hosted Node.js service, authoritative battle simulator and WebSocket request protocol. GitHub Pages serves static files only. See https://github.com/smogon/pokemon-showdown , https://github.com/smogon/pokemon-showdown/blob/master/PROTOCOL.md and https://pokeapi.co/.

Pokémon images, logos and gameplay IP remain subject to their respective owners' rights; Pokémon sprites are sourced from https://github.com/PokeAPI/sprites. Review these rights before publishing or distributing further.


## Showdown PvP proof of concept (server deployment required)

- Static browser client: [online.html](./online.html)
- Node server: [server/index.cjs](./server/index.cjs)
- From server/: run `npm install`, then `npm start` with Node.js. Set environment variables `PORT` and `ALLOWED_ORIGIN=https://choivoo.github.io` when deploying. Use a TLS-enabled host with WebSocket support; its secure wss:// endpoint must be supplied in online.html.
- Two connected players queue for the same format. Choices are sent to the official Showdown simulator through per-player streams. Gen 7 random battle supports Mega Evolution and Z-Moves where the generated team enables them, and Gen 9 random battle supports Terastallization.
- This is an experimental protocol UI, not a tested, production PvP system. The backend is not hosted on GitHub Pages. There is no ranking, authentication, reconnection, moderation or validated competitive team builder.
- The downloadable v1.1 archive remains separate from the hosted simplified single-file preview and has **not** been uploaded as full expanded source.


## New features: Custom OU teams (2026-10-27)
The online experimental client now accepts the Pokémon Showdown team export format (including **species, moves, held items, abilities, natures, IVs, EVs, and Tera type**). Select **Gen 7 OU** or **Gen 9 OU**, paste a legal six-Pokémon team, and the server validates it with Showdown's TeamValidator before entering the queue. Random formats continue to auto-generate teams. Mechanics are executed on the authoritative Showdown simulator, not reproduced client-side. Mega Evolution and Z-Moves are generation-specific and require eligible team sets; Terastallization is Gen 9-specific.

**Operations still required:** deploy the Node.js WebSocket server to a publicly reachable TLS-backed host, supply the wss:// endpoint to each player, and validate an end-to-end match. Static Pages deployment alone cannot make multiplayer live. This repo is not certified as a release-ready 1.0 build.
