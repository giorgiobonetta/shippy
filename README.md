# World of Trade v35.3 — Real Earth Edition

## Realistic globe upgrade

The trading globe now uses a progressive photorealistic rendering pipeline:

- natural satellite-style day surface in 2K, upgraded to 4K on capable devices;
- physically inspired sunlight, with the day/night terminator following real UTC time and seasonal solar declination;
- warm city lights visible only on the night side;
- ocean glint controlled by the sea specular map;
- terrain normals for subtle relief rather than exaggerated mountains;
- semi-transparent cloud layer with solar lighting and surface shadows;
- blue daytime atmosphere and a restrained orange twilight rim;
- much subtler political borders so the planet remains visually natural;
- progressive loading, preserving the fast and failure-safe startup introduced in v32.1.

High-resolution textures load only after the playable 2K globe is visible. Performance mode remains available for lower-powered devices.

World of Trade is a browser-based physical commodity trading and merchant-house strategy simulator.


## v35.2 highlight: Level-based international expansion

- A permanent **Offices** command now opens the global office network directly (`O`).
- Offices become available progressively as the company level rises.
- A visual roadmap shows the next cities, required level, commercial prerequisites and construction status.
- Level-up celebrations now announce newly unlocked office locations.
- Future office cities remain visible on the globe with locked/available rings.
- Opening a location requires cash, project-team capacity and construction time; once active it changes P&L, capital, risk, execution and credit capacity.

## v35.1 highlight: Premium visual identity

The new illustrated World of Trade emblem is now integrated into the boot screen, top bar, browser favicon and installable PWA icons. The image is optimized as WebP for the splash screen so the visual upgrade does not recreate the previous loading bottleneck.

## v35 highlight: Global Office Network

The player begins with a small Geneva headquarters and can build a multinational trading firm as company levels increase.

The international office network includes:

- Geneva, Switzerland — group headquarters;
- Genoa, Italy — port operations;
- Santiago, Chile — copper origination;
- Dubai, UAE — Gulf commercial desk;
- Casablanca, Morocco — fertilizers;
- Rotterdam, Netherlands — ARA trading and storage;
- Antwerp, Belgium — industrial metals;
- Santos, Brazil — coffee and soft commodities;
- Rosario, Argentina — grains;
- Singapore — Asia-Pacific trading;
- Port Klang, Malaysia — palm oil and Southeast Asia;
- Abidjan, Ivory Coast — cocoa;
- Shanghai, China — industrial demand;
- Durban, South Africa — African metals;
- Doha, Qatar — LNG;
- Houston, USA — energy and agricultural exports;
- Port Hedland, Australia — iron ore.

Offices require level, reputation, completed deals, cash, headquarters capacity and construction time. Once completed, they modify actual deal economics and company valuation.

## Deployment

This is a static project. Upload all files directly to the root of the existing GitHub repository. Vercel requires no build command.

After deployment, refresh with `Ctrl + Shift + R` so the browser replaces the previous service-worker cache.

## Main files

- `index.html`
- `styles.css`
- `app.js`
- `three.module.min.js`
- `sw.js`
- `manifest.webmanifest`
- `world-of-trade-logo.svg` / `.png`
- `world-of-trade-icon.svg` / `.png`
- Earth textures and country geometry

## Save compatibility

The browser save key is `wot-v35`. Saves from v34 and earlier are migrated automatically.
