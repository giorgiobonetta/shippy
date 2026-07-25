# World of Trade v32 — Gold Bars, Daily Rewards & Builders

## Added

- **Gold Bars** — a premium currency (gold is a commodity!). Earn them from level-ups and achievements, shown in a header counter.
- **Daily reward with streak** — each new day a claim popup grants cash + XP + gold bars, scaling with a consecutive-day streak (up to 7 days).
- **Buy extra project teams (builders)** with gold bars in the Trading Empire panel — an escalating cost, classic Clash-of-Clans builder purchase, permanently increasing your simultaneous construction capacity.

## Changed

- Save schema upgraded to `wot-v32` with automatic migration from earlier careers.

---

# World of Trade v31 — Experience Levels (Clash-of-Clans style)

## Added

- **XP & experience levels**: earn XP from closing deals (scaled by profit), winning tenders, completing missions and achievements, ordering shop/empire assets and advancing time.
- **Escalating level curve** with a cash bonus every level-up (grows with level).
- **XP HUD** in the top bar: a level star badge and animated XP progress bar.
- **Level-up celebration**: a juicy full-screen burst with the new level, reward and a victory sound.
- Builds on the existing Clash-style loop already in the game (buildings, builders, construction timers, upgrade levels, unlock gates).

## Changed

- Save schema upgraded to `wot-v31` with automatic migration from earlier careers.

---

# World of Trade v30 — Custom Icons & Splash

## Added

- **Custom SVG icon set** replacing all emoji/glyphs in the command dock and top bar — crisp, consistent, on-brand line icons (desk, shop, overview, markets, layers, search, briefing, keys, glossary, notifications, install, new career).
- **Resource-coin metrics**: NAV, cash, credit and reputation now show glossy circular coin icons like a mobile strategy game.
- **Branded splash screen** on launch: animated logo crest with a shine sweep, title and loading bar, fading into the game.
- All new animations respect the reduce-motion setting.

## Changed

- Save schema upgraded to `wot-v30` with automatic migration from earlier careers.

---

# World of Trade v29 — Premium "Supercell" Visual Theme

## Added

- A complete high-energy visual overhaul inspired by premium mobile strategy games:
  - Chunky rounded display font (Fredoka / Baloo 2).
  - Vibrant deep-blue "arena" palette with atmospheric glows, bokeh and vignette.
  - Big glossy 3D buttons with bevels, bottom "lip" and press-down feedback.
  - Command dock and icon buttons restyled as tactile glossy chips.
  - Top-bar metrics restyled as resource counters with glossy icon coins and gold numbers.
  - Panels, cards and dialogs with thick rounded borders, layered shadows and inner highlights.
  - Juicy bouncy toasts, badges and tooltips.
- All new juicy animations respect the reduce-motion setting.

## Changed

- Save schema upgraded to `wot-v29` with automatic migration from earlier careers.

---

# World of Trade v28 — Italian Localization

## Added

- **Language selector (English / Italiano)** in the profile dialog, saved with your settings.
- **Italian interface**: the main chrome is now fully localised — top bar and metric labels, command dock, time controls, all module/tab names, the settings dialog, and the glossary, notifications, save-slots, shortcuts and victory dialogs.
- A lightweight `data-i18n` framework that swaps the interface instantly and restores English cleanly.

## Notes

- This first localization pass covers the interface chrome (menus, buttons, labels, dialogs). The deep simulation text — individual deal descriptions, event narratives and glossary definitions — remains in English for now and can be translated in a later pass.

## Changed

- Save schema upgraded to `wot-v28` with automatic migration from `wot-v27` and earlier careers.

---

# World of Trade v27 — Charts & Save Slots

## Added

- **Historical price charts**: clicking a commodity in the market strip now shows a colour-coded price trend line (up to 60 days) with the period % change, above the existing forward curve.
- **Rolling price history**: the game records up to 90 days of prices per commodity.
- **Multiple save slots**: keep up to 3 separate careers. A new slot manager (Profile → Manage save slots) lets you load, start and delete careers, showing each slot's company, cash, deals, prestige and date.
- Existing single-save careers are migrated automatically into slot 1.

## Changed

- Save schema upgraded to `wot-v27` with automatic migration from `wot-v26` and earlier careers.

## Compatibility

- All existing systems remain unchanged. Each slot stores an independent career; prestige remains shared across careers as a lifetime legacy.

---

# World of Trade v26 — Quality of Life Update

## Added

- **Trading glossary**: an in-game reference (button in the dock, or press `G`) explaining 21 key terms — contango, backwardation, basis, hedge ratio, margin call, VaR, KYC, demurrage, laycan, L/C, enterprise valuation and more.
- **Contextual tooltips**: hover or focus the term-structure labels and key metrics to get a plain-language explanation on the spot.
- **Notifications log**: a bell in the header with an unread badge opens a history of recent actions and alerts, colour-coded by type with relative timestamps.
- **Install as an app (PWA)**: an install button appears when the browser supports it, so World of Trade can run in its own window offline.

## Changed

- Save schema upgraded to `wot-v26` with automatic migration from `wot-v25` and earlier careers.

## Compatibility

- All existing systems remain unchanged.

---

# World of Trade v25 — Audio & Endgame Update

## Added

- **Procedural audio engine** (Web Audio API, no external files): distinct sounds for closed deals, errors, warnings, day advance, purchases, achievements/missions and a victory fanfare.
- Sounds are wired to the notification system, so every action gives audible feedback matched to its type.
- **Sound effects** on/off setting in the profile dialog, saved with the career; audio unlocks on first interaction per browser autoplay rules and is auto-muted during fast-forward.
- **Endgame victory**: reaching a $50M enterprise valuation ("Integrated Major") triggers a celebration screen.
- **Prestige loop**: claim prestige to start a fresh career while keeping permanent bonuses — +12% starting capital, +8% credit line and higher starting reputation per prestige level. Prestige persists across resets and shows as a gold badge in the header.

## Changed

- Save schema upgraded to `wot-v25` with automatic migration from `wot-v24` and earlier careers.

## Compatibility

- All existing systems (shop, empire, fleet, credit, compliance, risk, rivals, scenarios) are unchanged.

---

# World of Trade v24 — UX & Presentation Update

## Added

- Rich notification system: colour-coded, icon-based toasts (success / warning / error / info) that stack, auto-dismiss and can be dismissed manually.
- Animated key-metric feedback: NAV, cash and reputation now flash green/red and show a floating +/- delta chip whenever they change.
- Keyboard shortcuts overlay: press `?` (or the new Keys button) to see all shortcuts in a clean modal.
- New shortcut `N` advances one day.
- New-day feedback: the game date pulses and a subtle light sweep passes over the globe each time a day advances.
- Micro-interactions across the interface: button press feedback, card hover lift, animated command badges.
- Improved mobile layout: horizontally scrollable command dock, condensed metrics and adaptive labels on small screens.
- Full `prefers-reduced-motion` support — all new animations disable automatically when the user requests reduced motion.

## Added (v24 polish pass)

- Smooth count-up animation on the NAV, cash and credit metrics — values now tween to their new figure instead of snapping.
- In-game **Motion & animations** setting (profile dialog) to switch between full animations and reduced motion, saved with the career.
- Accessibility: clear keyboard `:focus-visible` outlines across buttons, tabs, cards, inputs and dialogs.
- Friendlier empty states with a subtle icon and gradient across all list panels.
- All v24 animations now honour both the OS `prefers-reduced-motion` setting and the new in-game toggle.

## Changed

- Save schema upgraded to `wot-v24` with automatic migration from `wot-v23` and all earlier careers.

## Compatibility

- Existing shop, empire, credit, supply-chain, fleet and scenario systems are unchanged.

---

# World of Trade v23 — Trading Empire Shop

## Added

- New Empire Shop command and command-center module.
- Original strategy-game-style storefront with Ships, Warehouses and Infrastructure categories.
- Eleven permanent assets with unlock requirements, prices, build times, upkeep and permanent benefits.
- Shared project-team capacity between Empire upgrades and Shop construction.
- Capital Projects Office that adds additional builder capacity.
- Permanent vessel ownership with daily maintenance and 45% resale recovery.
- Construction queue, progress bars, order badges and delivery notifications.
- Shop asset book value included in NAV and enterprise valuation.
- Shop facilities affect P&L, duration, acceptance, equity and storage costs.
- New missions: Asset Owner and Logistics Magnate.
- Keyboard shortcut `S` opens the Shop.

## Compatibility

- Save schema upgraded to `wot-v23`.
- Automatic migration from v22 and earlier supported careers.
- Existing time-charter, Empire, credit, supply-chain and scenario systems remain available.
