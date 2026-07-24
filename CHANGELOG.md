# World of Trade v22 — Performance & Scenario Lab

## Added

- New hidden-on-demand **Performance Office** module.
- Board performance score combining profitability, risk resilience, operational execution, cash conversion and compliance.
- Cumulative P&L attribution for commercial margin, operations, financing, market/basis, FX, storage, credit and demurrage.
- Three board capital-allocation mandates with different NAV reserve requirements.
- Capital policy effects on equity usage, expected deal margin, financing rates and risk score.
- Minimum liquidity-reserve approval check before opening a deal.
- Five portfolio stress scenarios covering commodities, freight, FX, buyer defaults and liquidity.
- Stress output with loss, collateral call, cash impact, post-stress NAV, credit headroom and limit-breach warnings.
- Persistent stress-test history and Trade Journal entries.
- Mission **Scenario Ready** and achievement **Scenario Planner**.
- Academy lesson on stress testing and liquidity, plus two glossary definitions.
- Keyboard shortcut `P` for the Performance Office.
- Local Earth textures and local low-resolution country geometry.
- Full PWA caching of globe assets.

## Improved

- Trade history now retains 60 settlements for meaningful management reporting while the Desk still shows the latest eight.
- Deal approval messages distinguish liquidity-reserve breaches from ordinary cash or bank-credit shortages.
- Export/import and migration updated to the `wot-v22` schema.
- Removed duplicate external TopoJSON script references and all runtime CDN dependencies.

## Compatibility

- Automatically migrates v21 and earlier careers.
- Remains a static deployment with no build step.
