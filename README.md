# World of Trade v22 — Performance & Scenario Lab

World of Trade is a browser-based physical commodity trading simulator. The v22 release extends the v21 supply-chain and contracts engine with management accounting, board capital allocation and portfolio stress testing.

## v22 highlights

### Performance Office

The new **Performance** module explains how the trading house is performing rather than showing only total P&L. It includes:

- board performance score;
- realized P&L and profitable-settlement rate;
- operational execution, resilience, cash conversion and compliance indicators;
- cumulative P&L attribution by commercial margin, operations, financing, market/basis, FX, storage and credit.

### Capital allocation policies

The board can select one of three capital mandates:

- **Capital Preservation** — retains a 35% NAV liquidity reserve and reduces funding cost and risk;
- **Balanced Mandate** — retains a 20% reserve;
- **Growth Allocation** — retains a 10% reserve and deploys more capital, with higher funding and risk.

The selected policy changes deal equity, expected margin, financing rates, risk score and whether a new transaction can be approved without breaching the minimum cash reserve.

### Scenario Lab

Five portfolio-wide stress tests are available:

- commodity sell-off;
- freight capacity shock;
- EUR/USD dislocation;
- buyer default wave;
- global liquidity crisis.

Each test estimates projected loss, collateral needs, cash impact, post-stress NAV, remaining credit capacity and possible limit breaches. Results are stored in the career and written to the Trade Journal.

### Local globe assets

Earth textures and low-resolution country geometry are included inside the project. The globe no longer depends on external CDN requests and the service worker caches these assets for offline use after the first visit.

## Running locally

Serve the folder through a local HTTP server rather than opening `index.html` directly:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deployment

The project is static and ready for Vercel, Netlify or GitHub Pages. Upload the contents of this folder to the repository root. `vercel.json` and the PWA service worker are already included.

## Saves

Career data is stored locally under the `wot-v22` schema. v21 and earlier World of Trade or SHIPPY careers are migrated automatically. Career backup export/import remains available from the player profile.

## Main files

- `index.html` — interface and panels
- `styles.css` — visual system and responsive layout
- `app.js` — simulation, globe and game logic
- `vendor/three.module.min.js` — local Three.js module
- `assets/earth/` — local Earth textures
- `assets/data/countries-lowres.geojson` — local country geometry
- `sw.js` — offline asset cache
