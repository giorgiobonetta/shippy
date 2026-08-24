# World of Trade — what it models, and what it doesn't

A browser-based simulation of the physical commodity trading cycle. I built it to
force myself to understand how a merchant desk actually makes and loses money —
not the flat-price story, but everything between buying a cargo and being paid for
it.

>  **Play it:** `<<< INCOLLA QUI L'URL — è l'unica cosa che devo mettere io >>>`
>
>  No install, no account, runs in any browser, works offline.

---

## The cycle it models

**Origination.** A rolling market of physical opportunities, each with an origin, a
destination, a commodity, a tonnage and a stated capital requirement. Offers expire
on a weekly cycle, so waiting has a cost. Each corridor carries its own congestion
score that adds transit days and freight cost at the point of booking.

**Negotiation.** Four dimensions that a buyer actually cares about, each moving both
acceptance probability and economics in opposite directions:

- **price level** — competitive, market, premium;
- **payment terms** — 20% advance, payment at delivery, 30 days. Selling on credit
  is a loan to your buyer: it raises acceptance and ties up your working capital;
- **pricing formula** — fixed, monthly-average QP, or buyer's QP option. The last
  one earns a premium because you are short optionality you cannot hedge cleanly;
- **delivery window** — priority, standard, flexible.

**Structuring.** Before capital is committed: hedge ratio, FX cover, financing
route, insurance level, inspection level, carrier choice, and incoterm from EXW
through FOB, CFR, CIF to DDP — each shifting price, capital intensity, risk transfer
and days.

Financing is four real structures with different economics: revolving facility,
LC-backed trade finance, borrowing-base against cargo and receivables, or own
balance sheet. They change required equity, cost of funds and payment risk.

**Execution.** Documentary readiness, carrier booking, terminal slots, storage.
Purchase and sales terms are explicit per route (*FOB Port Hedland · index-linked*
selling *CFR Shanghai · LC at sight*), with the document set that trade actually
needs — draft survey and Fe assay for iron ore, phytosanitary for soybeans,
moisture certificates, certificate of origin, bill of lading, LC compliance.

Global disruptions — transit closures, strikes, weather, sanctions, supply shocks —
hit cargoes that match their profile, not everything at once.

**Settlement.** The final P&L is decomposed into commercial margin, market
exposure, FX, operations and claims, financing cost, storage optionality and
credit result. The point the whole thing is built around: **commercial margin is
not P&L.**

## The risk side

- **Flat price** — hedge ratio against a futures curve with contango and
  backwardation driven by inventory tightness. Variation margin is posted daily and
  releases only when the position closes.
- **Basis** — a fully hedged cargo is not a riskless cargo. Local hub differentials
  move, and a monthly-average QP hedged on a single date leaves a mismatch.
- **Liquidity** — the trap the simulation is most insistent about: a correctly
  hedged position can still bankrupt you through margin calls when prices move
  against the paper leg. Emergency funding exists and costs.
- **Counterparty credit** — per-buyer limits that cap deal size, receivables that
  can go overdue and buyers that can default. Credit insurance and factoring are
  available at a price.
- **Concentration** — the risk score weights concentration and liquidity coverage,
  not just volatility.

## What I deliberately left out

Being clear about the edges matters more than pretending there aren't any.

- **No order book and no market impact.** Prices follow a mean-reverting process
  with seasonal volatility; you are a price taker.
- **Hedging is a ratio, not a strategy.** No specific lots, no roll management, no
  options book. Basis risk is parameterised rather than derived from two real curves.
- **One benchmark per commodity.** No grade or brand differentials beyond a single
  hub basis.
- **Freight is a cost and an index, not a market.** No voyage calculation, no
  bunker exposure, no COAs.
- **Simplified credit.** Counterparty limits and default probabilities are
  assumptions, not a rating model.
- **No physical optionality on storage beyond a flag** — no real storage arbitrage
  against the curve.

## What building it taught me

Three things I did not properly understand before, and now do.

**A hedge protects margin, not solvency.** The most instructive part to build was
variation margin. A cargo hedged at 100% has almost no flat-price exposure and can
still take the desk under, because the paper leg demands cash daily while the
physical leg pays once, at the end. Liquidity and price risk are different risks and
they are managed with different tools.

**Working capital is the business.** Once I modelled payment terms, transit days and
QP windows honestly, the days between paying the supplier and being paid by the
buyer turned out to matter more to returns than the negotiated margin. A shorter
voyage with a thinner margin often beats the reverse.

**Fixed costs decide who survives.** While balancing the simulation I measured the
opening position and found the desk was structurally loss-making: roughly $38k of
gross margin per cargo against $56k of overhead per cycle. No amount of good
trading fixed it. The lesson is not about the game — it is that a desk's cost base
sets the minimum flow it needs, and that is a decision made before any trade.

---

Built in vanilla JavaScript, no framework, runs entirely client-side and offline.
The design decisions and the balancing measurements are documented in `CHANGELOG.md`.
