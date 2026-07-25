# World of Trade v28 — Italian Localization

World of Trade v28 introduces Italian language support on top of the v27 charts & save-slots release.

## What's new in v28

- **Language selector (English / Italiano)** in Settings, saved with your profile.
- **Localised interface** — the top bar, metric labels, command dock, time controls, all module names, the settings dialog and the glossary/notifications/save-slots/shortcuts/victory dialogs are translated to Italian and switch instantly.
- The deep simulation text (deal descriptions, event narratives, glossary definitions) stays in English in this first pass.

---

# World of Trade v27 — Charts & Save Slots

World of Trade v27 adds historical price charts and multiple save slots on top of the v26 quality-of-life release.

## What's new in v27

- **Historical price charts** — click any commodity in the market strip to see a price trend line (up to 60 days) with its period % change, shown above the forward curve.
- **Multiple save slots** — keep up to 3 independent careers. Open Profile → Manage save slots to load, start or delete them; each card shows company, cash, deals, prestige and date. Your existing career is migrated into slot 1.

---

# World of Trade v26 — Quality of Life Update

World of Trade v26 focuses on clarity and convenience on top of the v25 audio & endgame release.

## What's new in v26

- **Glossary & tooltips** — a searchable in-game glossary (press `G`) and hover tooltips explain the trading jargon (contango, basis, hedge ratio, KYC, demurrage, and more).
- **Notifications log** — a bell in the header keeps a colour-coded history of your actions and market alerts, with an unread badge.
- **Install as an app** — when supported, an install button lets you run World of Trade as a standalone offline app (PWA).

---

# World of Trade v25 — Audio & Endgame Update

World of Trade v25 adds a full procedural sound engine and a real endgame with a prestige loop, on top of the v24 UX release.

## What's new in v25

- **Audio** — a Web Audio engine (no external files) plays matched sounds for closed deals, alerts, day advance, purchases, achievements and a victory fanfare. Toggle it in Settings; it auto-mutes during fast-forward.
- **Endgame & prestige** — reach a $50M enterprise valuation to trigger a victory screen, then claim prestige to restart with permanent bonuses (+12% capital, +8% credit and higher reputation per level). Your prestige level persists across careers and shows as a gold badge in the header.

---

# World of Trade v24 — UX & Presentation Update

World of Trade v24 is a presentation-focused release that makes the game clearer, more responsive and more satisfying to play, on top of the full v23 trading-empire feature set.

## What's new in v24

- **Rich notifications** — actions now produce colour-coded, icon-based toasts (success, warning, error, info) that stack and can be dismissed.
- **Animated metrics** — NAV, cash and reputation flash and show a floating +/- delta whenever they change, so the impact of every decision is visible instantly.
- **Keyboard shortcuts overlay** — press `?` to open a clean reference of every shortcut; `N` now advances a day.
- **New-day feedback** — the date pulses and a light sweep passes over the globe each time you advance time.
- **Micro-interactions & mobile polish** — button press feedback, card hover lift, animated badges, and a responsive command dock and metrics bar for small screens.
- All animations respect `prefers-reduced-motion`.

---

# World of Trade v23 — Trading Empire Shop

World of Trade v23 adds a permanent-asset shop inspired by the progression loop of base-building strategy games, redesigned specifically for physical commodity trading.

## Main addition

The new **Empire Shop** lets the player order and construct:

- permanently owned vessels;
- bonded warehouses and tank farms;
- port-handling systems;
- intermodal truck capacity;
- project offices that unlock additional simultaneous construction teams;
- a digital trade control tower.

Each purchase uses cash, occupies a project team, requires construction time and creates permanent operational benefits. Owned ships do not expire like time-chartered vessels, but generate daily maintenance costs and can be sold when idle.

## Integrated gameplay effects

Shop assets affect deal economics through route P&L bonuses, shorter execution times, lower equity requirements, improved acceptance probabilities and cheaper storage. Their depreciated book value is included in NAV and enterprise value.

The existing Empire section remains focused on vertical integration, while the Shop focuses on tangible operational capacity.

## Deployment

Upload the contents of this directory to the repository root. The game is static and deploys directly on Vercel.
