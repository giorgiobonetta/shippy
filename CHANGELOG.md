# World of Trade v43 — Terra fisica anche senza WebGL

## Problema risolto

Quando la scheda grafica 3D (WebGL) non è disponibile — cosa che può capitare su alcuni telefoni, WebView Android o browser con accelerazione disattivata — il gioco ripiegava su un disegno che tracciava **soltanto i contorni degli stati**, lasciando il globo vuoto.

## Cosa cambia

- **Continenti pieni**: le terre emerse vengono ora riempite con un gradiente di terreno (verde vegetazione al centro, tinte più aride verso i bordi) usando i 288 profili costieri reali dei 177 paesi.
- **Oceano vero**: gradiente oceanico più profondo e realistico (azzurro illuminato → blu profondo), al posto del vecchio grigio-verde spento.
- **Illuminazione**: ombreggiatura del terminatore giorno/notte e alone atmosferico azzurro attorno al pianeta.
- **Coste e confini rivisti**: con le terre piene, le coste diventano un bordo scuro sobrio e i confini un tratteggio tenue, invece delle vecchie linee verdi fluorescenti.
- **Doppia rete di sicurezza**: se manca anche il file geografico, il disegno procedurale di riserva ora usa terre verdi piene invece di macchie slavate.
- La funzione ricava da sola le misure del globo se non le riceve, così non resta mai inerte.

## Nota

La Terra in alta definizione con texture fotografiche resta quella predefinita quando WebGL funziona: questa modifica riguarda il ripiego, che ora mostra comunque un pianeta fisico completo.

---

# World of Trade v42 — Flotta ridisegnata

## Quarta schermata portata a qualità gioco

- **Illustrazioni delle navi** disegnate in SVG e scelte automaticamente dalla classe del vascello:
  - portarinfuse con stive e boccaporti (Handysize, Panamax, bulker),
  - petroliera con manifold e tubazioni (MR product tanker),
  - chiatta fluviale con carico coperto (river barge),
  - multipurpose con gru di bordo e container (Coaster, Multipurpose).
- Ogni nave galleggia su un'onda azzurra; le navi di proprietà hanno la **stella dorata** nell'angolo.
- **Dati in celle leggibili**: capacità, posizione, blocco di noleggio, nolo anticipato — con etichette in maiuscoletto e valori a 14,5px.
- **Barra di vita del noleggio** con incavo e riflesso; striscia dorata per le navi possedute con il costo di mantenimento.
- **Pulsante di noleggio** azzurro in stile gioco, con stato disabilitato parlante (requisiti, già controllata, liquidità).
- Card selezionata con contorno oro; card bloccate desaturate.

## Verifiche

- 8 card del mercato noleggi renderizzate, tutte con illustrazione; 4 tipi di nave rappresentati.
- Dati reali corretti (es. Handysize · MV Ocean Pioneer · 32.000 t · Santiago · 75 giorni · $95.000).
- Avvio e simulazione senza errori; bundle Android allineato.

---

# World of Trade v41 — Negozio ridisegnato

## Terza schermata portata a qualità gioco

- **Illustrazioni per categoria** disegnate in SVG: nave portacontainer con onde (flotta), magazzino con tetto e portoni (stoccaggio), gru portuale con container (infrastrutture).
- **Contatore dei posseduti** come badge dorato "×N" sull'illustrazione.
- **Nastro di categoria** colorato per tipo (cantiere arancio, stoccaggio oro, logistica azzurro).
- **Riquadro beneficio permanente** verde, ben separato dalla descrizione.
- **Quattro celle dati**: prezzo, tempo di costruzione, posseduti, mantenimento giornaliero. Il prezzo diventa rosso se manca la liquidità.
- **Pulsante d'acquisto a due righe**: azione grande (`BUY & BUILD`, `ORDER MORE`, `MAX`, `LOCKED`) più la riga di dettaglio con costo e giorni, o il motivo del blocco.
- Card bloccate desaturate, bordo oro a capacità piena, bordo azzurro durante la costruzione.

## Correzione di coerenza

- Riportate in inglese le etichette che avevo introdotto in italiano nelle schermate Impero e Negozio: la lingua base del gioco è l'inglese e la traduzione italiana è gestita dall'apposito interruttore, quindi non devono convivere.

## Verifiche

- 11 card negozio renderizzate, tutte con illustrazione; tutte e 3 le categorie presenti.
- Dati reali corretti (es. Handysize Workhorse · $1.150.000 · 8 giorni · mantenimento $1.450).
- Avvio e simulazione senza errori; bundle Android allineato.

---

# World of Trade v40 — Schermata Impero ridisegnata

## Seconda schermata portata a qualità gioco

- **Illustrazioni per filiera industriale** disegnate in SVG: castelletto di miniera con roccia e carrello (upstream), serbatoi e tubazioni di terminale (midstream), stabilimento con ciminiere e fumo (downstream).
- **Stemma del livello** in stile gioco: badge dorato con il numero, agganciato all'angolo dell'illustrazione.
- **Barra dei livelli a segmenti**: segmenti dorati per i livelli costruiti, segmento azzurro pulsante per quello in costruzione, contatore L{x}/{max}.
- **Riquadro beneficio** verde con i vantaggi attivi dell'asset.
- **Costo e tempo** in celle dedicate; il costo diventa rosso se non hai abbastanza liquidità.
- **Barra di avanzamento cantiere** con giorni rimanenti quando l'asset è in costruzione.
- **Pulsante di potenziamento parlante**: `UPGRADE · $260.000`, oppure `Costruzione L2 · 5gg`, `MAX LEVEL`, `Tutte le squadre occupate`, `Servono $X`, o requisiti di sblocco.
- Card bloccate desaturate, bordo oro al massimo livello, bordo azzurro durante i lavori.

## Verifiche

- 12 card renderizzate, tutte con illustrazione e stemma; tutte e 3 le filiere rappresentate.
- Dati reali corretti (es. Atacama Copper Mine · Santiago · costo $260.000 · 7 giorni).
- Avvio e simulazione senza errori; bundle Android allineato.

---

# World of Trade v39 — Schermata Mercato ridisegnata

## Grafica da gioco vero (prima schermata rifatta)

- **Icone commodity illustrate a mano in SVG**: lingotti di rame con riflessi metallici, barile di greggio con goccia, covone di grano, minerale di ferro, bombola LNG, chicchi di caffè/cacao, sacco di fertilizzante, billette d'acciaio, lingotti chiari per alluminio/zinco/nichel. Ogni card mostra l'icona giusta con ombreggiatura e luce, al posto dei blocchi di testo.
- **Card tattili**: bordo spesso, gradiente, riflesso superiore, "labbro" d'ombra che si schiaccia al tocco, sollevamento al passaggio del mouse.
- **Nastro HOT** diagonale sulle occasioni migliori (buona accettazione o forte concorrenza).
- **Statistiche in riquadri leggibili**: profitto atteso, capitale proprio, durata e accettazione — valori a 16,5px con cifre allineate, etichette in maiuscoletto.
- **Misuratori di gioco**: barra "interesse rivali" arancio→rosso e barra stagionalità verde, con incavo e riflesso.
- **Pulsante d'azione** in fondo alla card che cambia in base allo stato: negozia, apri l'affare, oppure bloccato con il livello richiesto.
- Card bloccate desaturate, card selezionata con contorno oro.

## Verifiche

- 18 card renderizzate, tutte con icona corretta; 9 tipi di illustrazione in uso.
- Nessun valore che sfora il riquadro; barre con percentuali arrotondate.
- Avvio del gioco e simulazione senza errori; bundle Android allineato.

---

# World of Trade v38 — Leggibilità e grafica da gioco

## Testo leggibile (problema risolto)

- **Ingranditi 397 stili di testo**: prima 221 regole usavano font sotto i 10px (fino a 6px), illeggibili su telefono. Ora la dimensione minima è 11,5px e la gerarchia visiva è preservata.
- Numeri e valori (NAV, liquidità, prezzi, XP, oro) resi più grandi, spessi e con cifre tabellari.
- Etichette, pulsanti e tab ingranditi; su telefono i testi di servizio crescono ulteriormente.

## Niente più testo fuori schermo (problema risolto)

- Aggiunto un livello anti-overflow completo: il testo va a capo invece di uscire dai riquadri.
- Gli elementi in flex/grid possono restringersi correttamente (causa principale degli sconfinamenti).
- Le griglie dense passano a 2 colonne sotto 1024px e a 1 colonna sotto 620px.
- Card, select, immagini e dock comandi non superano mai la larghezza dello schermo; il dock scorre invece di traboccare.
- Eliminato lo scroll orizzontale della pagina.

## Stile grafico

- Adottato il font arrotondato **Fredoka / Baloo 2** (stile giochi mobile premium) su tutta l'interfaccia.
- Titoli con peso pieno e ombra netta; etichette in maiuscoletto; pulsanti con testo più grande e marcato.

---

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
