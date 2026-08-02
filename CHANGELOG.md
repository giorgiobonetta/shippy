# World of Trade v47 — Insegnare, orientare, essere usabile da tastiera

Come la v46: **nessuna modifica all'equilibrio di gioco**. Formule, costi,
probabilità e progressione restano identici.

## Tutorial con il riflettore

Il tour guidato era una card in un angolo che descriveva a parole cosa fare
("Open Market", "Inspect a trade route") lasciando al giocatore il compito di
trovare l'elemento in un'interfaccia con 22 sezioni.

- Ora ogni passo **punta a un elemento reale**: lo sfondo si scurisce e il
  bersaglio resta ritagliato, con un bordo dorato che respira.
- Un **fumetto** accanto all'elemento spiega a cosa serve — "Il livello di
  copertura decide quanto rischio prezzo ti tieni", "Il tempo si muove solo
  quando glielo permetti".
- Tutti e otto i passi hanno un bersaglio: pulsante del centro comandi, card
  dell'opportunità, riquadro della negoziazione, controlli di struttura del deal,
  avanzamento del tempo, banner della decisione, e infine il P&L realizzato.
- Il riflettore non blocca i click: si può usare l'interfaccia mentre è acceso, e
  si sposta da solo se l'elemento cambia posizione.
- Rispetta "Movimento ridotto" e `prefers-reduced-motion`.

## Stati vuoti che dicono cosa fare

Otto sezioni si limitavano a comunicare di essere vuote. Ora spiegano il passo
successivo e ci portano con un click: inventario, contratti, operazioni,
tesoreria, attribuzione del P&L, track record, flotta e coda dei cantieri
rimandano al mercato delle opportunità o al negozio, a seconda di cosa serve.

## Tastiera e accessibilità

- **Frecce, Home e End** dentro la barra delle aree e quella delle schede. Con
  Tab si entra nella barra, con le frecce ci si muove: è il comportamento
  standard di una tablist, prima assente.
- **Roving tabindex**: Tab non attraversa più 27 pulsanti di navigazione uno a uno.
- **ARIA corretta** sulla navigazione a due livelli introdotta nella v46:
  `role="tab"`, `aria-selected`, `aria-controls`, sezioni come `role="tabpanel"`
  con `aria-hidden` coerente.
- I **badge di attenzione** hanno un'etichetta leggibile dagli screen reader
  ("3 items need attention") invece del solo numero.
- **Anello di focus** anche su aree, ticker di mercato e pulsanti degli stati vuoti.
- Il fuoco viene riportato sul pulsante giusto quando la barra si ridisegna:
  senza questo, dopo il primo spostamento le frecce smettevano di rispondere.

---

# World of Trade v46 — Leggibilità, globo vivo e feedback

Release di presentazione. **Nessuna modifica all'equilibrio di gioco**: formule,
costi, probabilità e progressione sono identici alla v45. Cambia come il gioco si
legge e come risponde.

## Navigazione — dalle 22 schede a 5 aree

- Le 22 schede erano tutte sulla stessa barra: su desktop una fila di pulsantini,
  su telefono una striscia da scorrere alla cieca. Ora si sceglie prima l'**area**
  (Desk · Operations · Risk · Growth · Career), poi la scheda: al massimo 5 voci
  visibili alla volta, con spazio per essere lette.
- **Badge di attenzione**: ogni area e ogni scheda mostra quante voci richiedono
  un'azione — decisioni in sospeso sui cargo, offerte accettate pronte da aprire,
  fatture scadute, richieste di fido, pratiche di compliance, margin call, crisi
  attive, cantieri in corso, uffici pronti ad aprire. Aprendo un'area si finisce
  direttamente sulla scheda che chiede qualcosa.
- Il layout del pannello non dipende più da altezze fisse in pixel ripetute in
  nove media query: testata, aree e schede prendono lo spazio che serve, il resto
  va al contenuto.

## Globo

- **Rotte con avanzamento**: il tratto già percorso da un cargo è pieno e
  luminoso, quello che resta è tratteggiato e spento. Si legge a colpo d'occhio
  quanto manca all'arrivo, senza aprire la scheda.
- **Scia a cometa** dietro ogni mezzo in movimento, che sfuma all'indietro lungo
  il percorso reale.
- **Impulso di flusso** sulla rotta selezionata: una luce la percorre da origine a
  destinazione, così la direzione del commercio è immediata.
- **Alone d'allerta** sui porti toccati da una crisi in corso, quando il livello
  Rischio è attivo. I porti colpiti sono ricavati dagli eventi globali attivi.
- **Alone pulsante** sui cargo che richiedono una decisione: non serve più cercarli.
- **Anelli di arrivo**: il porto di destinazione lampeggia quando un carico viene
  consegnato.

## Grafici

- **Sparkline** sugli ultimi 30 giorni dentro ogni ticker di mercato. `priceHistory`
  conservava 90 giorni per 10 commodity senza che venissero quasi mai mostrati.
- **Curva del patrimonio** rifatta: colore che segue il segno del rendimento,
  riempimento sfumato, linea del capitale iniziale come riferimento, marcatori su
  massimo e minimo, punto luminoso sul valore corrente. Prima era una spezzata
  piatta con un riempimento fisso.

## Feedback

- **Riepilogo di chiusura operazione**: alla settlement di un cargo compare il
  conto economico voce per voce — margine commerciale, esposizione di mercato,
  cambio, operazioni e claim, costo del finanziamento, storage, risultato del
  credito — con le barre che crescono e il risultato netto che scorre fino al
  totale. Prima il momento più importante della partita era un semplice toast.
- **Numeri che scorrono** anche su P&L realizzato, P&L live, valore di portafoglio,
  capitale investito.
- **Lampeggio verde/rosso** su cassa e P&L quando cambiano: si capisce cos'è appena
  successo senza confrontare i numeri a memoria.
- **Entrata scaglionata** delle card quando si apre una scheda — solo all'apertura,
  non a ogni giorno di gioco.

## Note

- Tutte le animazioni rispettano "Movimento ridotto" nel profilo e la preferenza
  di sistema `prefers-reduced-motion`.
- Le sparkline sono nascoste sotto i 900px: su schermo stretto lo spazio serve al
  prezzo.
- Le carriere v45 si caricano senza perdite (verificato con un salvataggio
  prodotto dalla v45 e ripreso dalla v46).
- Nessuna dipendenza esterna aggiunta: tutto in JS e CSS nativi.

---

# World of Trade v45 — Stabilità, integrità dei dati ed equilibrio economico

Release di correzione. Nessuna funzionalità rimossa: sono stati riparati bug che
causavano perdita di salvataggi, blocchi dell'interfaccia, guadagni illimitati e
rallentamenti su telefono.

## Salvataggi — non si perdono più

- **Salvataggio danneggiato**: prima qualunque errore durante la migrazione faceva
  ripartire da zero *in silenzio*, e la prima azione sovrascriveva definitivamente
  la carriera. Ora si tenta il backup, l'originale viene messo in quarantena
  (`…-corrupt-<data>`) e, se non c'è nulla da recuperare, il salvataggio automatico
  resta sospeso invece di distruggere il file.
- **Il backup ora serve davvero**: veniva scritto a ogni salvataggio ma non era mai
  riletto da nessuna parte. Adesso viene ripristinato al caricamento ed è scritto a
  rotazione (massimo una volta ogni 5 minuti) invece che a ogni tick.
- **Slot illeggibile**: veniva mostrato come "Empty" con il pulsante "Start career",
  e l'utente cancellava una carriera recuperabile. Ora appare come *Damaged* con
  l'opzione di ripristino dal backup.
- **Migrazione dalle versioni vecchie**: veniva riapplicata a ogni slot vuoto,
  clonando la stessa carriera in tutti e tre gli slot. Ora avviene una sola volta,
  solo sullo slot 1, e le 32 vecchie chiavi vengono rimosse (libera spazio).
- **Spazio esaurito**: `QuotaExceededError` era ignorato e l'unico segnale era la
  scritta "Save failed". Ora il gioco libera il backup e le chiavi legacy, pota lo
  storico e riprova; se fallisce lo dice esplicitamente.
- **Salvataggio alla chiusura**: aggiunto su `pagehide` e `visibilitychange`, prima
  esisteva solo nell'app Android.
- **"Autosave off" viene rispettato** anche quando l'app Android va in background.
- **Import di una carriera**: il file veniva scritto su disco *prima* di provare a
  disegnarlo; un file malformato distruggeva la carriera esistente e rendeva il gioco
  non più avviabile. Ora si valida, si disegna e solo dopo si salva, con rollback in
  memoria in caso di errore. L'import condivide inoltre la stessa normalizzazione del
  caricamento normale: prima ne saltava 65 campi.
- Nuova carriera in uno slot vuoto: onboarding e scelta della difficoltà ora
  compaiono davvero (il controllo era sempre falso).
- Cancellare lo slot attivo ora ferma l'orologio e azzera la selezione, invece di
  lasciare la "carriera cancellata" che avanzava da sola.
- Il livello di prestigio non è più condiviso tra i tre slot.

## Sicurezza

- **Iniezione HTML** dal nome del trader e della società: un file di carriera
  condiviso da terzi poteva eseguire codice arbitrario e leggere tutti gli slot.
  Ora ogni valore controllato dall'utente è filtrato in ingresso e in uscita.

## Blocchi dell'interfaccia

- Il **carico distressed** era irraggiungibile: il suo id non esisteva nel catalogo,
  quindi aprirlo mandava in errore l'inspector e ogni `renderAll()` successivo —
  bloccando anche la simulazione fino al ricaricamento della pagina. Ora è risolvibile,
  ha il capitale proprio dichiarato (mancava, e generava `$NaN`) e la sua destinazione
  punta a un porto esistente (era "cairo", che non è mai stato nella mappa).
- I deal il cui catalogo non esiste più vengono scartati al caricamento invece di
  impedire l'avvio; ogni deal salva ora una copia dell'opportunità.
- **Three.js non raggiungibile** non è più un errore fatale: dalla v43 esiste un
  disegno 2D completo della Terra, ma il boot lo rendeva irraggiungibile. Ora la
  partita parte comunque con il globo su canvas.
- Aggiunto l'elemento del titolo nella schermata di avvio: era cercato dal codice
  di recupero ma non esisteva nell'HTML, quindi il messaggio di errore non appariva.

## Economia — guadagni illimitati chiusi

- **Rehedge retroattivo**: alzare la copertura a metà viaggio *cancellava* le perdite
  già maturate (e abbassarla regalava profitti), per 28.000 $ di costo. Ora il
  risultato maturato viene cristallizzato e la copertura riparte dal prezzo corrente.
  Il costo dell'operazione, inoltre, era addebitato due volte.
- **Ponte di liquidità sul margine**: il capitale preso a prestito per coprire una
  margin call veniva restituito in cassa alla consegna ma il debito spariva insieme
  al deal — denaro creato dal nulla a ogni margin call, con il NAV gonfiato. Ora il
  prestito viene tracciato, rimborsato dal collaterale liberato e conteggiato come
  passività.
- **Gare d'appalto**: ogni click era un tiro indipendente e perdere non costava nulla,
  quindi si rilanciava finché non si vinceva. Ora una sola offerta per ciclo di
  mercato, e la pressione dei rivali incide davvero sulla probabilità di vittoria
  (prima era calcolata e mostrata, ma ignorata).
- **Negoziazione**: massimo tre tentativi per ciclo. Prima bastava premere "Submit"
  una ventina di volte per ottenere sempre l'accettazione.
- **Bonus giornaliero**: chiudere il dialog e ricaricare faceva salire lo streak di 1
  ogni volta; sei ricaricamenti valevano 140.000 $ invece di 20.000.
- **Cassa negativa**: non aveva alcuna conseguenza. Ora scatta uno scoperto a tasso
  d'emergenza e, se anche il credito è esaurito, un avviso di insolvenza al board con
  perdita progressiva di reputazione.
- **Zinco Zambia e nichel Indonesia** avevano quantità pari a ~9 volte il valore di
  mercato coerente con il capitale: il nichel richiedeva 6,3 M di solo margine contro
  2,1 M di capitale proprio e superava sempre il limite di credito dell'acquirente,
  risultando di fatto inapribile. Quantità riallineate.
- Il **giorno di gioco** non si ferma più sui cargo successivi quando uno di essi
  genera un evento: prima quelli in fondo alla lista non maturavano transito né
  interessi, ed era sfruttabile per non pagare gli interessi.
- I bonus di livello (cassa e lingotti) ottenuti acquistando nel negozio o avviando
  un investimento vengono ora salvati: prima l'XP era assegnata *dopo* il salvataggio.
- Il **basis locale** dei porti usava `Math.random()`: divergeva tra una sessione e
  l'altra a parità di salvataggio. Ora è deterministico come il resto della simulazione.
- Quattro porti del calcolo del basis non esistevano nella mappa (`london`, `lagos`,
  `port-klang`, `buenos-aires`): corretti con gli id reali.

## Prestazioni su telefono

- **Ridisegno selettivo**: ogni avanzamento di giorno ricostruiva l'HTML di tutte e 22
  le sezioni del pannello, comprese le 21 nascoste — fino a 2,3 volte al secondo a
  velocità 5×. Ora si disegna solo la sezione visibile. Nei test il costo per giorno
  di gioco è passato da ~800 ms a ~40 ms.
- **Salvataggio con debounce**: due scritture sincrone da oltre 20 KB ogni 430 ms
  erano la causa principale degli scatti a velocità massima.
- Il loop di animazione del globo si ferma quando la scheda non è visibile.
- Il popup della forward curve registrava un listener nuovo a ogni apertura senza mai
  consumarli: ora ne esiste uno solo.

## Interfaccia

- Il **ticker del caffè** era l'unico presente nell'HTML ma assente dalla lista di
  aggiornamento: restava fermo su "$4,200/t · +0.0%" per tutta la partita.
- La struttura a termine di **zinco, nichel e LNG** veniva calcolata ogni giorno ma
  mai mostrata.
- Il market strip non va più in errore se un ticker manca dalla pagina.
- **Italiano rimasto in un'interfaccia inglese**: il dialog del bonus giornaliero, il
  chip dei lingotti d'oro e la card della squadra di progetto extra sono ora tradotti
  correttamente tramite il sistema di lingua invece di essere fissi in italiano.
- Sedici chiavi di traduzione italiane erano definite ma non collegate a nulla
  (opzioni delle select, etichette dei livelli del globo, footer delle scorciatoie,
  titolo del profilo): ora funzionano.

## Confezionamento

- Il **service worker** precaricava file con la versione `36.0.0` mentre la pagina ne
  chiedeva `44.0.0`: le voci in cache non venivano mai riutilizzate. Versioni
  allineate e aggiunte le quattro texture della Terra che mancavano dalla lista, così
  il globo è completo anche offline.
- La copia dentro `android-app/.../assets/www` era disallineata rispetto alla radice:
  ora è rigenerata dalla radice a ogni build del pacchetto.
- `orientation` del manifest passata da `landscape` ad `any`: contraddiceva il lavoro
  sul layout verticale della v44.
- `vercel.json` puntava a cartelle `/assets` e `/vendor` inesistenti e non copriva
  `styles.css`, `native-shell.css` e `native-bridge.js`.
- Versione dell'app Android allineata (`45.0.0`).

---

# World of Trade v44 — Interfaccia mobile ripulita

## Problema risolto

Su telefono l'interfaccia risultava confusa. La causa principale: le **23 schede dei moduli** venivano disposte in una griglia fino a 8 colonne, creando un muro di pulsantini minuscoli, e l'intestazione del pannello arrivava a occupare **152px di altezza** sottraendo spazio ai contenuti.

## Cosa cambia sotto i 900px

- **Barra dei moduli a riga singola scorrevole**: le schede diventano pillole affiancate che si scorrono lateralmente con aggancio (snap), invece di una griglia a più righe.
- **Bersagli comodi al dito**: schede alte almeno 42px, pulsanti della barra comandi 46px, icone 40px.
- **Scheda attiva evidente**: pillola dorata in rilievo, le altre in blu scuro.
- **Intestazione da 152px a 60px**: quasi 100px di spazio restituiti ai contenuti.
- **Meno rumore visivo**: ombre delle card alleggerite e sfocatura dei pannelli ridotta (giova anche alla fluidità).
- **Più respiro**: spaziatura maggiore tra le card e liste a colonna singola.

## Sotto i 620px

- Metriche in alto su due colonne compatte ma leggibili.
- Il globo viene leggermente sfocato quando un pannello è aperto, così il contenuto in primo piano si stacca.
- Titoli di sezione ridimensionati.

---

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
