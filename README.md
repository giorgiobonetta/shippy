# SHIPPY v12 — Earth First Edition

SHIPPY è un simulatore web di physical commodity trading con globo interattivo, deal book, shipping, risk, trade finance, classifica e investimenti upstream/midstream/downstream.

## Novità v12

- Interfaccia **Earth-first**: il globo occupa quasi tutto lo schermo.
- Tutti i moduli sono nascosti di default e si aprono solo su richiesta.
- Command Center laterale a comparsa con Desk, Inventory, Operations, Fleet, Risk, Market, Network, World, Treasury, Academy, Empire, HQ, Career e Ranking.
- Inspector delle città, rotte, navi e deal aperto soltanto quando viene selezionato un elemento.
- Overview, mercati, livelli e legenda trasformati in pannelli temporanei.
- Vista `Full globe` per chiudere immediatamente tutte le sovrapposizioni.
- Nuova camera prospettica per il pianeta.
- Texture satellitari reali, nuvole, atmosfera e riflessi oceanici.
- Transizione giorno/notte con luci urbane sul lato notturno.
- Illuminazione solare coerente con la data di gioco e declinazione stagionale.
- Globo ingrandito e proiezione di marker, rotte e mezzi sincronizzata con la camera 3D.
- Migrazione automatica dei salvataggi dalla v11 e precedenti.

## Avvio

Il progetto è statico. Può essere pubblicato direttamente su Vercel o Netlify.

Per lo sviluppo locale è consigliato un server HTTP:

```bash
python -m http.server 8000
```

Poi apri `http://localhost:8000`.

## Deploy su Vercel

- Framework preset: `Other`
- Build command: vuoto
- Output directory: `.`
- Root directory: la cartella che contiene `index.html`

## File principali

- `index.html` — struttura dell'interfaccia
- `styles.css` — UI e pannelli a comparsa
- `app.js` — sorgente leggibile
- `app.bundle.js` — bundle browser senza dipendenze esterne
- `assets/` — texture del pianeta
- `vendor/` — Three.js incluso localmente

I salvataggi restano nel browser tramite `localStorage`.
