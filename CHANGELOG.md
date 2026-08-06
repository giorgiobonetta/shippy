# World of Trade v55 — Anche il globo entra nella tavolozza

La v54 ha ridipinto l'interfaccia, ma il globo era rimasto fuori: i suoi colori
sono nel JavaScript che disegna sul canvas, non nel CSS. Era la parte più visibile
del gioco e l'unica ancora in ciano fluo.

## Cosa cambia sul globo

- **Rotte di mercato in oro** (`rgba(255,209,102,…)`) al posto del ciano: nel logo
  l'oro è il colore di ciò che vale, ed è il segnale giusto per un'opportunità.
  L'impulso che percorre la rotta selezionata passa a crema.
- **Marcatori dei porti nella tavolozza del logo**: quartier generale crema
  `#fffaf0`, fornitori oro `#ffd166`, clienti blu chiaro `#8fc0ff`, porti blu reale
  `#5a86d8`. Il ciano fluo dei clienti stonava contro i pannelli blu.
- Anello degli uffici posseduti allineato all'oro esatto del logo; cantieri in
  corso in blu chiaro invece che ciano.
- Schiuma della scia della nave più calda, meno neon.
- Catene di integrazione verticale: midstream e downstream riportati nella
  tavolozza.

## La legenda non mente più

I pallini della legenda del globo erano definiti nel CSS con i colori *vecchi*:
dopo il cambio avrebbero indicato tonalità che il gioco non disegna più. Ora sono
allineati, e la corrispondenza è verificata a macchina confrontando quanto
restituisce `hubColor()` con quanto dichiara il foglio di stile.

Allineate anche le icone dei livelli del globo: oro per le opportunità, verde per
il portafoglio, arancio per il rischio, blu per la logistica.

## Verifica

Intercettando `fillStyle` e `strokeStyle` durante un frame reale del globo, con un
cargo a metà viaggio: **27 colori distinti, zero residui di ciano fluo**, oro e
crema presenti. Nessun errore, e i 34 test delle versioni precedenti passano.

---

# World of Trade v54 — L'interfaccia parla la lingua del logo

Il logo è blu reale con cornici dorate in rilievo, lettering crema→oro e contorni
spessi. L'interfaccia era navy quasi nero con accenti ciano: stessa famiglia, ma
non la stessa lingua. Ora le due cose combaciano.

## Cosa cambia

- **Superfici in blu reale.** Pannelli, testata e dialoghi passano da un navy quasi
  nero (`#0b1119`) a un gradiente blu reale (`#1a4288 → #0b214a`), lo stesso blu
  dello scudo.
- **Cornici oro smussate.** Bordo dorato di 2px con luce interna in alto e ombra in
  basso: l'effetto in rilievo delle cornici del logo, non un bordo piatto.
- **Titoli crema→oro.** Intestazioni di sezione, valore di portafoglio e titoli dei
  dialoghi usano lo stesso gradiente del lettering del logo, con ombra scura sotto.
- **Pulsanti principali in oro lucido** con smusso e testo blu scuro; pulsanti
  secondari in blu con bordo oro. Si abbassano di 2px alla pressione.
- **Card in rilievo** con bordo dorato tenue e ombra inferiore solida, invece di
  rettangoli piatti.
- Barre di progresso, comandi sul globo, ticker di mercato, livelli e schede
  seguono la stessa lingua.

## Contrasti verificati, non supposti

Non potendo vedere il risultato ho misurato ogni coppia testo/fondo. Tutte
superano 4,5:1 (WCAG AA), e due colori sono stati corretti perché sul blu più
chiaro non ci arrivavano:

| | prima | ora |
|---|---|---|
| Rosso delle perdite | `#ff6479` — 3,37:1 | `#ff96a4` — **4,66:1** |
| Grigio secondario | `#7189b5` — 2,73:1 | `#a0b4d8` — **5,14:1** |

Le altre undici coppie erano già a norma: testo su pannello 10,12:1, titoli oro
7,47:1, inchiostro su oro 10,56:1.

## Metodo

Il livello è **appeso in fondo al foglio di stile** e sovrascrive per ordine di
cascata: non riscrive nessuna delle 4.400 righe esistenti, quindi le 63 media
query per il mobile restano intatte. È lo stesso schema usato dalle versioni v29,
v31, v35.1 e v45. Verificato che tutte e 59 le classi ridipinte esistano davvero
nel markup — due nomi erano sbagliati (`shop-catalog-card`, `glossary-card`) e
sono stati corretti in `shop-item-card` e `glossary-item`.

## Avvertenza onesta

Non ho potuto vedere il risultato: nel mio ambiente non c'è un browser per fare
screenshot. Ho verificato che l'app si avvii senza errori, che tutti e 22 i moduli
renderizzino, e i contrasti in modo numerico — ma il giudizio estetico finale è
tuo. Se qualcosa risulta troppo carico o troppo chiaro, sono valori in un unico
blocco in fondo a `styles.css`, facili da ritoccare.

---

# World of Trade v53 — Il gioco si apre

Traguardo che in tutte le versioni precedenti non era mai stato raggiunto:
**nella simulazione il ciclo di espansione parte.** Ufficio di Genova aperto al
giorno 42, reputazione da 14 a 37, e compare la seconda commodity.

Fino alla v52 un giocatore competente restava su tre rotte di rame per sempre.

## Cosa bloccava, e cosa ho cambiato

**Il muro della reputazione.** Il primo ufficio richiedeva reputazione 18. Misurato:
un cargo chiuso bene ne dava +4 (da 12 a 16), uno in perdita ne toglieva 3, un
evento globale altri 2. La reputazione non arrivava mai a 18, quindi i quindici
corridoi che dipendono dagli uffici restavano chiusi per sempre.

- Genova scende da 18 a **15**, Santiago da 24 a 21.
- Un cargo in utile dà **+3** invece di +2; uno in perdita costa **−2** invece di −3.
  Il premio era più piccolo della penalità, e la reputazione non poteva crescere.

**Gli eventi globali erano troppo frequenti.** Uno ogni 8-14 giorni contro un
voyage di 35 giorni significava incontrarne due o tre, sempre — ed era la ragione
per cui tre cargo su quattro chiudevano in perdita nonostante copertura al 100% ed
esecuzione perfetta. Ora **uno ogni 14-24 giorni**: se ne incontra uno o due.

**Expert era ingiocabile.** Il fido iniziale (1,25 M) era più piccolo del prestito
richiesto dall'unico cargo disponibile (1,42 M): nessun deal apribile, mai, a
nessun livello di copertura. Le tre difficoltà sono state riviste:

| | cassa | fido | reputazione | primo evento |
|---|---|---|---|---|
| Guided | 680.000 | 2,20 M | 16 | giorno 18 |
| Standard | 560.000 | 2,00 M | 14 | giorno 14 |
| Expert | 520.000 | 1,80 M | 12 | giorno 10 |

Restano distinte su margine richiesto, entità delle perdite, tasso d'emergenza e
frequenza degli eventi — ma nessuna delle tre parte più in una posizione impossibile.

## Risultato misurato

Stesso giocatore automatico, 200 giorni, su Standard:

| | v52 | v53 |
|---|---|---|
| Uffici aperti | **0** | 1 (giorno 42) |
| Rotte accessibili | 3/18 | **4/18** |
| Commodity | solo rame | rame + urea |
| Reputazione finale | 13 | **37** |
| NAV | 577.000 | **722.000** |

Con reputazione 37 anche Santiago (21) e Dubai (30) sono ora a portata, quindi la
progressione continua da sola.

## Cosa resta da sistemare, onestamente

Il P&L realizzato per cargo è ancora leggermente negativo in media (−36.871 su
5 cargo). Il desk cresce comunque — reputazione, uffici, valore degli asset — ma
i singoli trade non sono ancora redditizi in modo affidabile. È il prossimo punto
da misurare, e va fatto su una partita giocata da una persona: il giocatore
automatico prende sempre la prima opzione in ogni evento e non negozia i termini,
quindi sottostima quanto può fare un umano.

---

# World of Trade v52 — Hélène Marchand

Ogni modulo che si sblocca viene ora presentato da **Hélène Marchand**, head trader
del desk di Ginevra. La v51 rivelava l'interfaccia a poco a poco; questa spiega
cos'è ciò che è appena comparso.

## Come funziona

Alla **prima apertura** di un modulo appena sbloccato Hélène interviene con tre
cose, e solo tre:

- **una frase su cos'è**, in termini da trader, non da manuale;
- **come funziona** nel gioco, concretamente;
- **cosa guardare** — la cosa che fa più danni se la ignori.

Non si ripete alla seconda visita. Si può richiamare in qualsiasi momento col
pulsante **?** accanto al titolo del pannello. Se un livello apre due moduli
insieme, le schede si presentano una dopo l'altra invece di sovrapporsi.

Tutti e 22 i moduli hanno la loro scheda, scritte per essere lette in dieci secondi.

Qualche esempio del tono:

> *Opportunity market* — «Il mercato. Compratori che hanno bisogno di un carico,
> venditori che ne hanno uno, e un margine nel mezzo se sai eseguire.»
> **Cosa guardare:** un margine di facciata alto non significa niente finché non
> controlli cosa serve in anticipo: capitale proprio, margine sui futures, e la
> riserva che la tua politica di capitale tiene intoccata.

> *Physical inventory* — «La tua posizione fisica: tonnellate che possiedi, dove
> sono, in che fase sono.»
> **Cosa guardare:** una commodity fisica non è una riga di foglio di calcolo. Sta
> in qualche posto, costa soldi stare lì, e le contestazioni sulla qualità
> arrivano allo sbarco, non alla firma.

> *Expansion* — «Questo è il modulo che apre il gioco. Quasi tutte le rotte del
> mondo hanno bisogno di un ufficio vicino, non di un livello più alto.»

## Tre regressioni della v51, corrette

Rivelare i moduli progressivamente aveva creato pulsanti che puntavano al vuoto:

- lo stato vuoto della flotta (livello 6) offriva "Apri il negozio impero", che è
  livello 13; ora i pulsanti verso moduli bloccati semplicemente non compaiono;
- l'azione rapida del briefing "Open risk desk" era presente dal livello 1, ma
  Risk arriva al 4;
- la ricerca globale elencava tutti e 22 i moduli, anche quelli inesistenti.

## E una perdita della v50, recuperata

Riscrivendo i messaggi di sblocco avevo orfanato `countryAccessTier`: le
descrizioni dei corridoi erano scomparse. Sono tornate nella checklist —
"Chile — developing origin — at level 2" invece del solo livello.

---

# World of Trade v51 — L'interfaccia si scopre giocando

Al primo avvio il gioco mostrava **22 schede**: tutto lo strumentario di una casa
di trading matura — compliance, stress test, valutazione d'impresa, classifica
mondiale — a chi non ha ancora un cargo. Ora si parte con **due** e le altre
compaiono quando il livello di esperienza le rende utili.

Questo dà anche un senso concreto al salire di livello, che era il problema
diagnosticato nella v50: i livelli XP quasi non aprivano nulla, perché le rotte
dipendono dagli uffici. Adesso aprono l'interfaccia.

## La scala

| Livello | Si aggiunge |
|---|---|
| 1 | Trading desk · Opportunity market |
| 2 | Physical inventory · Operations center |
| 3 | Global intelligence |
| 4 | Risk dashboard · Contracts & credit |
| 5 | Commercial network · Treasury desk |
| 6 | Fleet desk · WoT Academy |
| 7 | Competitive intelligence · Supply chain control |
| 8 | Compliance desk · Career progression |
| 9 | Strategic growth office · Headquarters |
| 11 | Board strategy · Performance office |
| 13 | Empire shop · Trading empire |
| 15 | Career League |

Le **aree** della navigazione seguono: al livello 1 esiste solo *Desk*, *Operations*
compare al 2, *Risk* al 3, *Growth* al 9. Anche i pulsanti *Shop* e *Offices* sul
globo restano nascosti finché il modulo non esiste, e la relativa notifica non si
accende su qualcosa che non si può ancora aprire.

## Dettagli

- Un **puntino luminoso** segnala l'area e il modulo appena guadagnati, e sparisce
  alla prima visita.
- L'annuncio di level-up mette i moduli al primo posto: sono la ricompensa più
  tangibile del livello.
- Nessuna scorciatoia — dock, ricerca globale, briefing, stati vuoti — può portare
  a un modulo bloccato: al tentativo il gioco dice a che livello si apre.
- Se il modulo attivo non è disponibile, si torna alla scrivania invece di mostrare
  una sezione vuota.
- Le **carriere esistenti non vedono nulla marcato come nuovo**: tutto ciò che il
  livello raggiunto rende disponibile è considerato già visto. Verificato con una
  carriera v50 di livello 9: 17 moduli disponibili, zero puntini.

## Un bug trovato dai test

La tabella dei livelli era dichiarata **dopo** la funzione che carica il
salvataggio, ma usata da quella: al primo avvio della v51 ogni carriera esistente
sarebbe risultata illeggibile e il gioco avrebbe tentato il backup. Un errore di
zona morta temporale, invisibile alla lettura del codice e catturato dal test di
compatibilità. La dichiarazione è stata spostata prima dell'uso.

---

# World of Trade v50.1 — Guscio Android riparato

Nessuna modifica al gioco. Correzioni al progetto Android, che conteneva cinque
problemi che si sarebbero visti solo a APK installato.

- **Il tasto Indietro non funzionava.** Cercava due elementi che non esistono
  nella pagina (`rightDrawer`, `closeRightPanel`): il pannello dei dettagli non si
  chiudeva mai e l'app usciva subito dal gioco. Ora usa gli id reali
  (`rightInspector`, `closeInspector`) e chiude in ordine dialoghi, scorciatoie,
  briefing, dettagli e centro comandi. Verificato: tutti gli otto id cercati dal
  guscio nativo esistono nell'HTML.
- **L'app forzava l'orientamento orizzontale**, in due punti (manifest e
  `MainActivity`), in contrasto con il layout verticale curato dalla v44 e con il
  manifest web già corretto nella v46. Ora l'orientamento è libero.
- `network_security_config.xml` esisteva ma **non era collegato** al manifest.
- Versione nativa e User-Agent erano **fermi a 36.0.0**.
- Il progetto **non include `gradle-wrapper.jar`**, quindi `./gradlew` non
  funzionava per chi clonava il repository. Il workflow ora lo genera.

## Workflow di build

Il workflow GitHub Actions ora, oltre all'artefatto di build:

- nomina l'APK con la versione (`WorldOfTrade-v50.0.0.apk`);
- pubblica una **Release GitHub** con l'APK allegato, così il link di download è
  permanente e non scade come gli artefatti;
- genera il Gradle wrapper mancante.

`README-APP.md` è stato riscritto con le tre strade per ottenere l'app.

---

# World of Trade v50 — Requisiti onesti e penalità in scala

Continuazione del lavoro sui dati iniziato con la v49. Ho seguito una catena
causale fino in fondo: **perché un giocatore competente resta bloccato su tre
rotte di rame per sempre.**

## La catena

Un giocatore automatico che gioca bene, su Standard, dopo 180 giorni aveva ancora
**3 rotte su 18** e solo rame. Il perché, un anello alla volta:

1. le rotte non si aprono con il livello XP ma con gli **uffici**;
2. il primo ufficio (Genova) richiede **reputazione 18**, si parte da 12;
3. la reputazione sale di +4 solo con un cargo chiuso in utile;
4. i cargo chiudevano **in perdita** — tre su quattro, pur essendo coperti al 100%
   e con esecuzione operativa perfetta;
5. gli unici in utile erano quelli **non colpiti da eventi globali**.

## Requisiti di sblocco espliciti

Il gioco aveva due sistemi sovrapposti: i livelli XP, visibili, con tabelle di 14
commodity e 19 paesi; e le funzioni `unlock`, invisibili, che chiedono uffici
specifici, cargo chiusi e reputazione. Il secondo decide, il primo si vede. A una
rotta bloccata il gioco rispondeva *"Requires a larger balance sheet, reputation
or regional office"*.

Ora i predicati vengono letti e tradotti in requisiti espliciti — tutti e 18
interpretati correttamente:

- sulla card, l'ostacolo più vicino: *"Urea trading licence at level 6 · level 1/6
  · +3 more"*;
- nell'inspector, la lista completa con il progresso: licenza, corridoio, **quale**
  ufficio serve (per nome), quanti cargo, quanta reputazione — e un pulsante per
  andare all'ufficio crescita;
- il messaggio di level-up non promette più *"Unlocked: Urea market"* quando la
  rotta resta chiusa: distingue le rotte che si aprono davvero dalle licenze che
  richiedono ancora un ufficio.

## Due penalità che ignoravano la dimensione del cargo

Stesso difetto trovato nella v45 (quantità) e nella v49 (costi fissi), applicato
ai costi variabili.

**Costo della competizione.** Era 240 $ per punto di pressione, identico per un
cargo da 38.000 di margine e per uno da 520.000: sul cargo iniziale valeva il 24%
del margine, su quelli grandi l'1%. Ora è una quota del margine, con il
coefficiente tarato perché un cargo di dimensione tipica (~150.000) paghi
esattamente quanto prima. Cambia solo la distorsione agli estremi.

**Impatto degli eventi globali.** Importi fissi da −5.000 a −45.000 applicati a
qualunque cargo: un solo evento poteva valere il 37% del margine iniziale. Con
un evento ogni ~6 giorni e voyage da 35, il cargo del tutorial ne incontrava due
o tre. Ora l'importo del catalogo è riferito a un cargo tipo e scalato fra 0,35× e
1,6×: i cargo piccoli restano colpiti, non annientati.

Effetto misurato sul cargo iniziale: P&L atteso da **3.536 a 10.399**; il caso
peggiore osservato al settlement da **−20.666 a −10.266**.

## Rifiniture

- Corretti due refusi da sostituzione automatica ("the Italyn agricultural market").
- Il caffè era l'unico ticker senza indicatore di struttura a termine.

## Cosa resta aperto, con onestà

Il cargo iniziale **non è ancora stabilmente in utile**. La direzione è giusta ma
il conto non chiude, e la leva rimasta è la **frequenza degli eventi**: uno ogni
~6 giorni contro un voyage di 35 giorni significa incontrarne due o tre sempre.
Ridurla è però una scelta su quanto debba essere caotico il mondo di gioco, non
una correzione: preferisco proportela invece di deciderla da solo.

---

# World of Trade v49 — L'inizio partita era matematicamente in perdita

Questa volta l'equilibrio **è** cambiato, ma non a sensazione: ho fatto girare
partite simulate con un giocatore automatico competente e ho corretto ciò che i
numeri mostravano rotto.

## Cosa dicevano i dati

Un giocatore che negozia le migliori opportunità disponibili, apre i cargo appena
può permetterseli e risolve subito gli eventi, su **difficoltà Standard**:

| | prima |
|---|---|
| NAV dopo 300 giorni | 500.000 → **232.000** |
| Cargo chiusi | **4** |
| P&L realizzato | **−219.764** |
| Commodity sbloccate | **1** |
| Reputazione | 12 → **7** |

Non era una questione di abilità. I conti del primo ciclo:

- margine lordo del cargo iniziale: **38.000 $** (14.578 effettivi dopo pressione
  competitiva e termini commerciali);
- costi fissi per tenere aperto il desk durante quel ciclo: **55.800 $**.

Il desk perdeva circa 41.000 $ per cargo comunque lo si giocasse.

## Le tre cause, corrette

**1. Il costo fisso dell'HQ era contato due volte.** L'ufficio di Ginevra
addebitava 900 $/giorno fissi *in aggiunta* al costo del tier HQ — che al tier 1
("Geneva Micro Office") è però 0. Un micro merchant con un cargo pagava 328.000 $
l'anno di struttura. Ora Ginevra costa 150 $/giorno e il resto arriva dal tier,
che già scala correttamente (0 → 450 → 1.250 → 3.200 → 7.500). La pressione sui
costi nel late game è invariata.

**2. Il cargo del tutorial non era copribile.** `baltic-copper` dichiarava un
capitale di 1,65 M ma trasportava 500 t di rame, cioè **4,75 M di nozionale**: un
rapporto di 2,88 contro una mediana di 0,60 su tutte le rotte, di gran lunga il
peggior valore anomalo del catalogo. Il margine iniziale richiesto al 100% di
copertura era quindi 274.313 $, che sommati a 246.343 $ di capitale proprio e
100.000 $ di riserva di policy facevano 620.656 $ contro i 500.000 $ di partenza.

Il giocatore era costretto a scendere al 50% di copertura, restando con **2,4 M di
esposizione al prezzo** a fronte di 15.000 $ di margine atteso: un lancio di
monete che spiega da solo il P&L negativo. Quantità riallineata a **175 t**, come
già fatto nella v45 per zinco e nichel. Ora il primo cargo si apre completamente
coperto: 234.612 $ di capitale proprio + 91.438 $ di margine, con 173.950 $ di
liquidità residua.

**3. Il gioco non diceva perché.** A un cargo non apribile rispondeva
"Insufficient capital or bank credit capacity". Ora elenca l'ostacolo preciso con
gli importi — quanto manca di cassa, di fido bancario, di limite sul compratore —
e, quando il problema è la liquidità, offre un pulsante **"Fit to liquidity"** che
imposta la copertura più alta sostenibile. Il riquadro di avviso nell'inspector
mostra la stessa diagnosi, e il margine da versare è ora visibile accanto allo
slider mentre lo si muove.

## Risultato

Stesso giocatore automatico, stessa difficoltà: NAV **500.000 → 577.000 in 150
giorni** invece del crollo a 232.000. Il primo cargo si apre completamente coperto
e il desk non parte più in perdita strutturale.

## Cosa non ho toccato

Il margine lordo passa comunque da 38.000 $ di catalogo a ~14.600 $ effettivi per
via dei fattori che si moltiplicano su `basePnl` (pressione competitiva, termini
commerciali, regime di mercato). È un divario che vale la pena rivedere, ma il
giocatore automatico gestisce male gli eventi operativi e non posso attribuirne la
responsabilità con la precisione necessaria: preferisco non ritoccare a caso.

---

# World of Trade v48 — I rivali diventano avversari

Come nelle due release precedenti, **nessuna modifica all'equilibrio di gioco**:
probabilità di vittoria, pressione competitiva, margini e prezzi sono quelli della
v45. Cambia cosa riesci a sapere degli otto desk contro cui stai gareggiando.

## Scouting dei desk rivali

Gli otto desk avversari esistevano solo come nome sul tender tape: comparivano
quando ti battevano e sparivano subito dopo. Non c'era modo di sapere chi fossero,
su cosa puntassero o come fosse andata finora.

La scheda **Rivals** ha ora un profilo per ciascuno:

- **Come operano**: stile (balance-sheet led, freight arbitrage, producer aligned,
  volume hunter, seasonal specialist…) e una descrizione di dove sono forti e dove
  sono attaccabili. Stratus Energy è il migliore offerente sulla piazza e il meno
  disciplinato; NorthSea vince sull'esecuzione più che sul prezzo; Atlas taglia il
  margine per tenersi un corridoio e si sovraespone quando arrivano più gare insieme.
- **Aggressività e disciplina** come barre leggibili — sono valori che il gioco già
  usava internamente senza mai mostrarli.
- **Corridoi presidiati**: quante gare aperte quel desk sta guidando in questo ciclo
  e con quale pressione media. Le card dei desk impegnati contro di te si accendono.
- **Testa a testa**: il bilancio delle gare contro di te, con l'esito dell'ultimo
  confronto. Conta **solo le gare che hai davvero contestato** — negoziate o su cui
  hai presentato un'offerta. Un tender ignorato non è una sconfitta.
- Le specializzazioni per commodity, che determinano quali desk incontri su quali
  merci, sono ora visibili invece di essere implicite.

Il registro è persistente e viaggia con il salvataggio.

---

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
