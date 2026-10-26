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
