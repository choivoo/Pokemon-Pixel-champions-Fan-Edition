# Pixel Champions — release status (2026-10-27)

**Status: Public release not yet verified.**

## Implemented in GitHub
- Offline single-page pixel story and AI battle prototype
- Gen 7 / Gen 9 Showdown-backed PvP service source
- Gen 7 OU / Gen 9 OU teams imported as Showdown text and checked by TeamValidator
- Random battle queue and custom team queue, secure player-separated simulator streams
- Technology-specific move actions for Mega Evolution / Z-Moves / Terastallization when legal
- Root-level `render.yaml` for Node backend and GitHub Actions for static Pages
- Basic health endpoint, connection cap, configurable browser origin

## Release blockers
1. GitHub Pages workflow success and public URL response have not been verified.
2. Render web service has been CREATED (srv-dbfu1ut9el5s73ba2g50; https://pixel-champions-pvp.onrender.com). Initial build was in progress at last inspection. The HTTPS/WSS endpoint is now configured in online.html but deployment success has not yet been established.
3. No end-to-end two-player or mobile acceptance test has been run; user intends to do gameplay QA personally.
4. Visual battle UI remains a basic protocol/command console; complex multi-active Showdown requests, team previews, multi-action choices and error recovery are incomplete.
5. Offline game remains simplified rules rather than a full Showdown-powered single player mode.
6. Public service requires abuse controls and rights/licensing review of Pokémon media.

These gaps mean 1.0 complete or fully playable public online PvP must not be claimed.
