# World of Trade v50 — come ottenere l'app installabile

Il gioco è già completo dentro questo pacchetto. Per averlo come **app vera e
propria** ci sono tre strade, dalla più semplice alla più completa.

---

## Strada 1 · Installare direttamente dal browser (nessuno strumento, 30 secondi)

Il gioco è una PWA completa: manifest, service worker, funzionamento offline.

**Su Android (Chrome):** apri il gioco → menu ⋮ → *Installa app* / *Aggiungi a
schermata Home*. Ottieni un'icona nel launcher, apertura a schermo pieno senza
barra del browser e funzionamento offline. È un'app a tutti gli effetti, solo non
distribuita come file `.apk`.

**Su Windows / macOS (Chrome o Edge):** icona di installazione nella barra degli
indirizzi, oppure il pulsante ⬇ dentro il gioco.

Serve che il gioco sia servito da un URL (vedi *Pubblicare su Vercel* nel
README.md principale) oppure in locale con `python -m http.server 8000`.

> Limite: da `file://` non funziona. Il service worker richiede http o https.

---

## Strada 2 · APK tramite GitHub Actions (nessuno strumento installato)

È la via consigliata per avere un **file `.apk` scaricabile**.

1. Carica il contenuto di questa cartella in un repository GitHub, mantenendo la
   struttura (`android-app/` e `.github/workflows/` incluse).
2. Vai nella scheda **Actions** → *Build Android App* → **Run workflow**.
3. Al termine (~5 minuti) trovi l'APK in due posti:
   - fra gli **Artifacts** della build;
   - come **Release** del repository, con un link di download permanente.

L'APK si chiama `WorldOfTrade-v50.0.0.apk`, pesa circa 10 MB e contiene il gioco
completo: **funziona senza connessione**.

### Installarlo sul telefono
1. Scarica l'`.apk` sul dispositivo.
2. Aprilo. Android chiede di consentire l'installazione da quella sorgente:
   è normale per le app fuori dal Play Store.
3. Richiede Android 7.0 (API 24) o successivo.

> La build è firmata con la chiave di debug: si installa e funziona su qualunque
> dispositivo, ma per pubblicarla sul Play Store serve una chiave di rilascio
> propria (`keytool -genkey`) e la configurazione `signingConfigs` in
> `android-app/app/build.gradle`.

---

## Strada 3 · Compilare in locale con Android Studio

1. Apri Android Studio → *Open* → seleziona la cartella **`android-app`**.
2. Android Studio segnala che manca il Gradle wrapper e offre di generarlo:
   accetta. In alternativa, da terminale con Gradle 8.13 installato:
   `gradle wrapper --gradle-version 8.13`
3. Attendi la sincronizzazione (scarica AGP 8.13.2 e l'SDK 36 al primo avvio).
4. **Build → Build Bundle(s) / APK(s) → Build APK(s)**.
5. L'APK finisce in `android-app/app/build/outputs/apk/debug/app-debug.apk`.

Requisiti: **JDK 17** (non 11), Android SDK **36**, Gradle **8.13**.

---

## Cosa fa il guscio nativo in più rispetto al browser

- Il gioco è **dentro l'APK**, servito da `WebViewAssetLoader`: nessuna richiesta
  di rete, nessun permesso di rete necessario per giocare.
- **Vibrazione** sui comandi e sugli eventi importanti.
- **Esporta e importa carriera** tramite il selettore file di sistema.
- **Condivisione** del risultato in classifica.
- **Salvataggio automatico** quando l'app va in background.
- **Tasto Indietro** che chiude in ordine dialoghi, scorciatoie, briefing,
  pannello dettagli e centro comandi, invece di uscire dal gioco.
- Modalità immersiva a schermo pieno e schermo sempre acceso durante la partita.

## Correzioni al guscio nativo nella v50

- Il tasto Indietro cercava due elementi che non esistono nella pagina
  (`rightDrawer`, `closeRightPanel`): il pannello dei dettagli non si chiudeva e
  l'app usciva subito. Ora usa gli id reali e gestisce anche briefing e
  scorciatoie.
- L'app **forzava l'orientamento orizzontale**, in contrasto con il layout
  verticale curato dalla v44 e con il manifest web già corretto nella v46.
  Ora l'orientamento è libero.
- `network_security_config.xml` era presente ma non collegato al manifest.
- Versione nativa dichiarata e User-Agent erano fermi a `36.0.0`.
- Il workflow GitHub genera il Gradle wrapper mancante e pubblica una Release
  con link di download permanente.
