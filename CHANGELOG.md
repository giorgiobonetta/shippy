# World of Trade v37.1 — Pre-launch QA pass

- Full automated QA sweep before Google Play: no syntax errors, no undefined function references (1,547 defined symbols checked), and no dead UI wires (every wired element exists in the markup).
- Headless boot verified: the game starts, renders all 22 command panels, and handles opportunity selection, Incoterm changes, contract negotiation and 70+ simulated days with zero runtime errors.
- Fix: the negotiation accept/reject seed now includes the Incoterm, so re-submitting an offer after changing only the Incoterm re-evaluates correctly.
- Android bundle (assets/www) kept byte-identical to the web build.

---

# World of Trade v37 — Incoterms & Physical-Trade Realism

## Added

- **Incoterms as a first-class contract term** (EXW · FOB · CFR · CIF · DDP) in the deal negotiation, with realistic, monotonic effects:
  - Higher seller responsibility (CFR → CIF → DDP) raises the achievable price and the buyer's acceptance, but also increases the working capital tied up and the execution duration.
  - Lower responsibility (FOB, EXW) frees capital and risk but reduces price and acceptance.
- Each Incoterm shows an accurate plain-language explanation of who bears freight, insurance, cost and risk.
- The chosen Incoterm is stored on the deal and shown in the deal review.

## Notes

- Fully backward compatible: existing `wot-v35` careers keep working; deals without an Incoterm default to FOB.
- Change mirrored into the Android app bundle (`assets/www`).

---

# World of Trade v36 — Android App Edition

- Added a native Android Studio application project.
- Bundled the complete game inside the APK for offline startup.
- Added secure HTTPS-style local asset loading with WebViewAssetLoader.
- Added native career import/export, haptics and background autosave.
- Added fullscreen landscape handling and Android safe-area/touch optimizations.
- Added Android launcher icons and Android 12+ splash styling.
- Added a GitHub Actions workflow that produces a downloadable debug APK.
- Kept the Vercel/PWA web version in the repository root.

# World of Trade v35.3 — Real Earth Edition

## Added

- Progressive 2K/4K natural Earth surface textures.
- Real-time solar direction based on UTC, seasonal declination and the equation of time.
- Physically inspired day/night terminator, ocean highlights and twilight.
- Warm night-side city lights.
- Solar-lit cloud shader with subtle cloud shadows on the surface.
- More realistic atmosphere and less intrusive borders.

## Performance and compatibility

- The 2K Earth appears first; the 4K surface is loaded only on capable devices.
- High-resolution textures are cached on demand rather than blocking first launch.
- Existing `wot-v35` careers remain fully compatible.
- Service-worker cache updated to `world-of-trade-v35-3-real-earth`.

---

# World of Trade v35.2 — Global Expansion Roadmap

## International office progression

- Added a dedicated **Offices** command to the permanent left rail.
- Added keyboard shortcut `O` to open the global office network.
- Added an office availability badge for locations ready to open and projects under construction.
- Added a level-based office roadmap showing the next eight expansion targets.
- Level-up rewards now name newly unlocked offices alongside commodities and countries.
- Added prospective office rings to the globe: grey for future locations, green for locations ready to fund, blue for construction and gold for active offices.
- Opening an office still requires the relevant company level, Geneva HQ tier, reputation, completed deals, cash and a free project team.
- Existing `wot-v35` saves remain compatible.

# World of Trade v35.1 — Premium Logo Integration

- Integrated the new illustrated World of Trade logo into the startup screen.
- Added a matching branded emblem to the permanent top bar.
- Added new 192 px and 512 px PWA icons and an Apple touch icon.
- Updated the splash background, loader and shadows to match the blue-and-gold identity.
- Optimized the main logo to WebP to preserve fast startup performance.
- Updated cache versioning so Vercel and installed PWAs replace the previous branding automatically.
- Gameplay and existing `wot-v35` career saves remain fully compatible.

# World of Trade v35 — Global Office Network

## International expansion

- Added a permanent multinational office network with 17 locations including Geneva HQ.
- Offices unlock progressively with company level, completed deals, reputation and Geneva HQ tier.
- New locations include Genoa, Santiago, Dubai, Casablanca, Rotterdam, Antwerp, Santos, Rosario, Singapore, Port Klang, Abidjan, Shanghai, Durban, Doha, Houston and Port Hedland.
- Resource-rich and strategically important countries require higher company levels, larger investments and stronger headquarters infrastructure.

## Office construction

- International offices are no longer opened instantly.
- Every office requires cash, an available project team and a multi-day construction period.
- Projects appear in a dedicated construction pipeline.
- Completed projects are recorded in the World Event Feed and Trade Journal.
- Existing saves keep their previously owned offices and migrate to the new construction system.

## Real gameplay benefits

Each office can improve the economics of relevant routes through:

- additional commercial margin;
- higher negotiation acceptance;
- lower equity requirements;
- faster physical execution;
- lower operational risk;
- additional credit capacity;
- local commodity expertise.

Route benefits depend on the office country, regional coverage and commodity specialisation.

## Globe and progression

- Active offices receive a permanent gold ring on the globe.
- Offices under construction display an animated cyan construction ring.
- Hub inspection now shows active offices and projects under construction.
- Updated strategic opportunities to recognise the most relevant local office, while preserving alternative regional-office paths.
- Added Multinational Network and Global Office Platform career missions.
- Added Multinational House and Global Footprint achievements.

## New visual identity

- Added an original gold-and-blue strategy-game shield logo.
- Added a full World of Trade wordmark and standalone app icon in SVG and PNG formats.
- Updated splash screen, top-bar emblem, PWA manifest and cache.

## Technical

- Save schema updated to `wot-v35` with migration from v34 and older saves.
- Added office project state, office book value and office network risk adjustments.
- Office assets now contribute to NAV and enterprise value.
- Corrected missing strategic-growth variables in deal economics.
- Updated PWA cache to `world-of-trade-v35-global-offices`.
