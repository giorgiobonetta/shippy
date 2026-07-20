# SHIPPY v11 — Trading Empire Edition

SHIPPY is a browser-based physical commodity trading simulator built around a realistic interactive globe. The player sources commodities, negotiates physical contracts, manages finance and hedging, controls cargoes in motion, charters transport and expands a vertically integrated trading group.

## New in v11

- Cargoes now move continuously along their routes while game time is running.
- Vehicle type changes with the logistics chain: ocean vessel, tanker, bulk carrier, barge, train or truck.
- Vehicles show direction, wake/trail and live route progress on the globe.
- New **Empire** section inspired by base-building progression games.
- Investments across **upstream, midstream and downstream**.
- Twelve industrial assets across mining, production, terminals, storage, logistics, manufacturing and distribution.
- Three upgrade levels per asset, escalating costs and construction times.
- Project-team construction slots and persistent build timers.
- Owned assets appear as interactive markers on the globe.
- Investments generate daily income and permanent deal advantages.
- Upstream assets improve sourcing margin and reduce equity needs.
- Midstream assets improve freight, storage, demurrage and transit times.
- Downstream assets create captive demand, improve acceptance and add conversion margin.
- Asset book value is included in portfolio NAV.
- New career missions for vertical integration and industrial expansion.
- Automatic migration from SHIPPY v10 and earlier saves.

All previous systems remain available: realistic Earth, opportunity market, negotiation, multi-commodity portfolio, inventory, operations, fleet, risk, counterparties, global events, Treasury, Academy, HQ, career progression and Career League.

## Run the game

Upload the entire `SHIPPY` folder to Netlify. No build command or environment variable is required.

For local use:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Files

- `index.html` — application structure;
- `styles.css` — command-center interface;
- `app.bundle.js` — browser-ready game bundle;
- `app.js` — readable development source;
- `assets/` — Earth textures;
- `vendor/` — pinned Three.js source.

This remains a front-end prototype. A commercial online release will require authentication, a database, server-authoritative simulation, anti-cheat controls and online leaderboard infrastructure.
