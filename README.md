# Exodus Wars

[Visit Site](https://the-davis.github.io/exodus-wars/)

Centuries after humanity launched the Great Exodus from Earth, civilization spans across colonized star systems, divided among rival factions, military coalitions, and ancient alien frontiers. From the hard-fought campaigns of the Federated Districts of the Prefecture to the enduring power of the Onyx Empire, the United Earth Alliance, and the devastating conflicts of the Second Exodus War and the Tempest War, peace in the galaxy is hard-won and perpetually contested.

Welcome to **Exodus Wars**.

This repository hosts a TypeScript-based interactive **Galactic Codex and Starmap** designed for sci-fi military storytelling, alongside the complete extracted MediaWiki canon archive, asset libraries, and Python migration tools for the Exodus Wars universe.

---

## Repository Overview

- **`src/`**: TypeScript application powering the interactive Starmap and Galactic Codex.
- **`wiki/`**: Extracted MediaWiki canon archive containing **3,860 pages** (2,368 main lore articles, 259 categories, 38 templates, and full JSON manifests).
- **`images/`**: Collection of 980+ lore illustrations, starships, combat rigs, uniforms, insignia, and planet maps.
- **`css/`**: Web theme and styling assets, including custom Exodus Wars fonts (`Iceland`) and UI frames.
- **`scripts/`**: Automation scripts for parsing database dumps, building manifests, and data conversion.
- **`TEMPLATES_AND_INFOBOXES.md`**: Complete technical specification of all 24 infoboxes and 9 navboxes used across the lore articles.
- **`STATIC_SITE_MIGRATION_GUIDE.md`**: Architectural roadmap for transitioning the wiki archive into a modern static site.

---

## Setup Instructions

### Prerequisites
- [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager)
- [Yarn](https://yarnpkg.com/) (`npm install -g yarn` once Node is available)

### Install & Run
```bash
nvm install        # install the Node version pinned in .nvmrc
nvm use            # activate it
yarn install       # install dependencies
yarn dev           # start the dev server + run tests and linting in watch mode
```

### Testing
```bash
yarn test:run      # single test pass (fast, great for CI)
yarn test          # watch mode (same as what runs alongside yarn dev)
```

Unit tests live alongside the source files as `*.test.ts`. `yarn dev` automatically runs **Vitest in watch mode** and an **ESLint watcher** in parallel with the Vite dev server (via `concurrently`), so test failures and style issues are surfaced immediately as you work.

### Build for Production
```bash
yarn build         # compile to dist/
yarn preview       # preview the production build locally
```

---

## Starmap & Codex Architecture

The primary visualization goal is to recreate the immersive tactical aesthetic of a sci-fi command starmap: navigating seamlessly from a galactic overview down to planetary codex entries.

### Galactic View
Renders the grand strategic galaxy map. The interface displays interstellar regions, major territories, and key points of interest with interactive reticles and coordinate tracking.

### Cluster View
Focuses in on a specific stellar cluster (such as the Exodus Cluster or Local Cluster), showing localized nebulae and navigational corridors.

### Star View
Displays an individual stellar system, its central star, orbital trajectories, planets, moons, asteroid belts, and military outposts, with toggleable orbital lines.

### Planet / Point of Interest View (Codex)
Centers on a selected world or space station, displaying tactical telemetry and populating the Galactic Codex infobox with essential worldbuilding data: mass, orbital period, rotational cycle, surface temperature, allegiance, and historical background.
