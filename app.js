import * as THREE from './vendor/three.module.min.js';

(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const lerp = (a, b, t) => a + (b - a) * t;
  const deg = Math.PI / 180;
  const storageKey = 'shippy-v11';
  const legacyStorageKeys = ['shippy-v10', 'shippy-v9', 'shippy-v8', 'shippy-v7', 'shippy-v6', 'shippy-v5', 'global-commodity-trader-v3'];

  const money = (value, compact = false) => {
    const sign = value < 0 ? '-' : '';
    const abs = Math.abs(value);
    if (compact && abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(2)}M`;
    if (compact && abs >= 1_000) return `${sign}$${Math.round(abs / 1_000)}K`;
    return `${sign}$${Math.round(abs).toLocaleString('en-US')}`;
  };

  const formatDate = (date) => new Intl.DateTimeFormat('it-IT', {
    day: '2-digit', month: 'long', year: 'numeric'
  }).format(date);

  const hubs = [
    { id: 'geneva', name: 'Ginevra', country: 'Svizzera', type: 'hq', lat: 46.2044, lon: 6.1432, subtitle: 'Northstar Commodities SA', description: 'La sede centrale coordina capitale, rischio, compliance e relazioni bancarie del desk.', commodities: ['Base metals', 'Energy', 'Risk management'], risk: 'Basso' },
    { id: 'brescia', name: 'Brescia', country: 'Italia', type: 'customer', lat: 45.5416, lon: 10.2118, subtitle: 'Lombardia Cables S.p.A.', description: 'Distretto industriale con domanda di rame raffinato e requisiti qualitativi elevati.', commodities: ['Copper cathodes', 'Aluminium', 'Scrap'], risk: 'Basso' },
    { id: 'genova', name: 'Genova', country: 'Italia', type: 'port', lat: 44.4056, lon: 8.9463, subtitle: 'Port of Genoa', description: 'Porta d’ingresso marittima per le consegne dirette al Nord Italia.', commodities: ['Containers', 'Bulk cargo', 'Warehousing'], risk: 'Medio' },
    { id: 'tallinn', name: 'Tallinn', country: 'Estonia', type: 'supplier', lat: 59.437, lon: 24.7536, subtitle: 'Baltic Metals OU', description: 'Fornitore europeo rapido e finanziariamente leggero, con documentazione qualitativa da verificare.', commodities: ['Copper cathodes', 'Recycled metals'], risk: 'Basso' },
    { id: 'santiago', name: 'Santiago', country: 'Cile', type: 'supplier', lat: -33.4489, lon: -70.6693, subtitle: 'Andean Copper Ltd.', description: 'Accesso competitivo alla produzione cilena, con transit time lungo e maggiore capitale immobilizzato.', commodities: ['Copper cathodes', 'Copper concentrate', 'Molybdenum'], risk: 'Medio' },
    { id: 'dubai', name: 'Dubai', country: 'EAU', type: 'supplier', lat: 25.2048, lon: 55.2708, subtitle: 'Meridian Resources DMCC', description: 'Premium aggressivi, ma maggiore rischio di controparte e compliance.', commodities: ['Base metals', 'Oil products', 'Trade finance'], risk: 'Alto' },
    { id: 'casablanca', name: 'Casablanca', country: 'Marocco', type: 'supplier', lat: 33.5731, lon: -7.5898, subtitle: 'Atlas Fertilizers SA', description: 'Hub nordafricano per fertilizzanti con transit time breve verso il Mediterraneo.', commodities: ['Urea', 'Phosphates', 'Fertilizers'], risk: 'Medio', locked: true },
    { id: 'rotterdam', name: 'Rotterdam', country: 'Paesi Bassi', type: 'port', lat: 51.9244, lon: 4.4777, subtitle: 'European Logistics Hub', description: 'Hub logistico sbloccabile con storage, blending e accesso a più clienti europei.', commodities: ['Metals', 'Energy', 'Storage'], risk: 'Basso', locked: true },
    { id: 'singapore', name: 'Singapore', country: 'Singapore', type: 'port', lat: 1.3521, lon: 103.8198, subtitle: 'Asia Trading Hub', description: 'Mercato avanzato che si sblocca aumentando reputazione e capitale.', commodities: ['Metals', 'Oil', 'Freight'], risk: 'Medio', locked: true },
    { id: 'houston', name: 'Houston', country: 'USA', type: 'supplier', lat: 29.7604, lon: -95.3698, subtitle: 'Gulf Coast Energy Hub', description: 'Raffinerie, terminal e trading di prodotti energetici con elevata intensità di capitale.', commodities: ['Crude oil', 'Diesel', 'Naphtha'], risk: 'Medio', locked: true },
    { id: 'santos', name: 'Santos', country: 'Brasile', type: 'supplier', lat: -23.9608, lon: -46.3336, subtitle: 'Santos Export Terminal', description: 'Principale porta d’uscita per coffee e soft commodities brasiliane.', commodities: ['Coffee', 'Sugar', 'Soybeans'], risk: 'Medio', locked: true },
    { id: 'rosario', name: 'Rosario', country: 'Argentina', type: 'supplier', lat: -32.9442, lon: -60.6505, subtitle: 'Paraná Grain Corridor', description: 'Origination agricola, elevata stagionalità e rischio di qualità e livello del fiume.', commodities: ['Wheat', 'Corn', 'Soymeal'], risk: 'Medio', locked: true },
    { id: 'port-hedland', name: 'Port Hedland', country: 'Australia', type: 'supplier', lat: -20.3107, lon: 118.6011, subtitle: 'Pilbara Bulk Export Hub', description: 'Mega-cargo dry bulk di iron ore con forte dipendenza da freight e port scheduling.', commodities: ['Iron ore', 'Manganese', 'Dry bulk'], risk: 'Basso', locked: true },
    { id: 'shanghai', name: 'Shanghai', country: 'Cina', type: 'customer', lat: 31.2304, lon: 121.4737, subtitle: 'Yangtze Industrial Market', description: 'Domanda siderurgica e industriale su larga scala, con disciplina su qualità e laycan.', commodities: ['Iron ore', 'Copper', 'Energy'], risk: 'Medio', locked: true }
  ];

  const opportunities = [
    {
      id: 'baltic-copper', origin: 'tallinn', destination: 'brescia', via: [], commodity: 'Copper', quantity: 500,
      capital: 1_650_000, equity: 240_000, basePnl: 38_000, duration: 28, risk: 'Basso', riskClass: 'low', priceKey: 'copper', recommendedHedge: 100, transportMode: 'Rail / Truck',
      title: 'Baltic Express', description: 'Rotta terrestre breve, minore impiego di capitale e rischio documentale gestibile.',
      unlock: () => true,
      event: {
        dayRatio: .43,
        title: 'Certificato qualitativo incompleto',
        text: 'Il certificato ricevuto non riporta una specifica richiesta dal cliente. La merce è già in transito.',
        choices: [
          { id: 'inspect', label: 'Ordina ispezione indipendente', hint: 'Costo $7.500 · protegge reputazione e riduce il claim', pnl: -7_500, days: 1, reputation: 1, result: 'L’ispezione conferma la conformità e il cliente accetta i documenti.' },
          { id: 'accept', label: 'Accetta il rischio documentale', hint: 'Nessun costo immediato · possibile claim a consegna', random: true, good: { pnl: 0, reputation: 0, result: 'Il cliente accetta la documentazione senza contestazioni.' }, bad: { pnl: -24_000, reputation: -4, result: 'Il cliente applica uno sconto per documentazione incompleta.' } }
        ]
      }
    },
    {
      id: 'andean-copper', origin: 'santiago', destination: 'brescia', via: ['genova'], commodity: 'Copper', quantity: 500,
      capital: 3_600_000, equity: 600_000, basePnl: 76_000, duration: 65, risk: 'Medio', riskClass: 'medium', priceKey: 'copper', recommendedHedge: 80, transportMode: 'Ocean / Truck',
      title: 'Andean Atlantic', description: 'Margine superiore, origine produttiva forte e rotta marittima lunga via Genova.',
      unlock: () => true,
      event: {
        dayRatio: .52,
        title: 'Tempesta sull’Atlantico',
        text: 'La nave perde velocità e rischia di mancare la finestra di consegna a Brescia.',
        choices: [
          { id: 'wait', label: 'Mantieni la rotta verso Genova', hint: 'Costo $15.000 · ritardo stimato 8 giorni', pnl: -15_000, days: 8, reputation: -1, result: 'La nave arriva in ritardo, ma il cliente accetta la nuova finestra.' },
          { id: 'reroute', label: 'Devia verso Rotterdam', hint: 'Costo $32.000 · riduce il ritardo a 4 giorni', pnl: -32_000, days: 4, reputation: 2, result: 'La deviazione protegge il cliente, ma comprime il margine.' }
        ]
      }
    },
    {
      id: 'meridian-copper', origin: 'dubai', destination: 'brescia', via: ['genova'], commodity: 'Copper', quantity: 500,
      capital: 3_200_000, equity: 480_000, basePnl: 104_000, duration: 48, risk: 'Alto', riskClass: 'high', priceKey: 'copper', recommendedHedge: 60, transportMode: 'Ocean / Truck',
      title: 'Meridian Premium', description: 'Premium molto interessante, ma compliance e qualità richiedono controlli più profondi.',
      unlock: () => true,
      event: {
        dayRatio: .31,
        title: 'Compliance alert sulla controparte',
        text: 'La banca segnala una struttura proprietaria poco trasparente prima di processare la lettera di credito.',
        choices: [
          { id: 'kyc', label: 'Avvia Enhanced KYC', hint: 'Costo $12.000 · 5 giorni · riduce il rischio', pnl: -12_000, days: 5, reputation: 3, result: 'Il controllo rafforzato chiarisce la struttura e la banca procede.' },
          { id: 'proceed', label: 'Procedi senza ulteriori verifiche', hint: 'Mantieni il margine · rischio di blocco e sanzioni', random: true, good: { pnl: 0, reputation: -1, result: 'La banca processa il pagamento, ma il risk desk segnala la scelta.' }, bad: { pnl: -90_000, reputation: -12, result: 'La banca blocca il pagamento e il deal viene chiuso con una perdita significativa.' } },
          { id: 'cancel', label: 'Cancella il deal', hint: 'Perdita certa di $35.000 · preserva compliance', pnl: -139_000, days: 0, reputation: 1, result: 'Il deal viene chiuso anticipatamente e il capitale residuo viene liberato.', forceComplete: true }
        ]
      }
    },
    {
      id: 'rotterdam-alloy', origin: 'rotterdam', destination: 'brescia', via: [], commodity: 'Aluminium', quantity: 350,
      capital: 2_100_000, equity: 330_000, basePnl: 59_000, duration: 24, risk: 'Basso', riskClass: 'low', priceKey: 'aluminium', recommendedHedge: 100, transportMode: 'Barge / Rail',
      title: 'Rhine–Alps Alloy', description: 'Corridoio europeo ad alta rotazione, accessibile dopo l’apertura del desk di Rotterdam.',
      unlock: (s) => officeOwned('rotterdam')
    },
    {
      id: 'maghreb-urea', origin: 'casablanca', destination: 'brescia', via: ['genova'], commodity: 'Urea', quantity: 900,
      capital: 1_800_000, equity: 280_000, basePnl: 64_000, duration: 21, risk: 'Medio', riskClass: 'medium', priceKey: 'urea', recommendedHedge: 70, transportMode: 'Coaster / Truck',
      title: 'Maghreb Nutrients', description: 'Parcel di urea dal Nord Africa al mercato agricolo italiano. Margine rapido, ma qualità e congestione portuale richiedono execution.',
      unlock: (s) => officeOwned('genova') && s.completedDeals >= 2,
      event: {
        dayRatio: .48,
        title: 'Congestione al terminal fertilizzanti',
        text: 'Il terminal di Genova comunica un ritardo nello scarico. Il carico rischia storage aggiuntivo e mancata consegna.',
        choices: [
          { id: 'priority-berth', label: 'Acquista priorità di attracco', hint: 'Costo $11.000 · preserva ETA e cliente', pnl: -11_000, days: 1, reputation: 2, result: 'Lo slot prioritario consente di scaricare quasi in linea con il programma.' },
          { id: 'wait-urea', label: 'Attendi lo slot ordinario', hint: 'Nessun costo iniziale · 4 giorni e rischio di claim', random: true, good: { pnl: -6_000, days: 4, reputation: 0, result: 'Il ritardo resta gestibile e il cliente accetta la nuova ETA.' }, bad: { pnl: -28_000, days: 6, reputation: -3, result: 'Il cliente applica un claim e il terminal addebita storage extra.' } }
        ]
      }
    },
    {
      id: 'asia-aluminium', origin: 'dubai', destination: 'singapore', via: [], commodity: 'Aluminium', quantity: 600,
      capital: 2_800_000, equity: 430_000, basePnl: 96_000, duration: 25, risk: 'Medio', riskClass: 'medium', priceKey: 'aluminium', recommendedHedge: 100, transportMode: 'Multipurpose vessel',
      title: 'Gulf–Asia Aluminium', description: 'Arbitraggio regionale verso Singapore con elevata rotazione e forte disciplina documentale.',
      unlock: (s) => officeOwned('singapore'),
      event: {
        dayRatio: .36,
        title: 'Discrepancy nella lettera di credito',
        text: 'La banca ricevente identifica una differenza tra descrizione merce e packing list.',
        choices: [
          { id: 'amend-lc', label: 'Richiedi amendment immediato', hint: 'Costo $8.500 · 2 giorni · protegge settlement', pnl: -8_500, days: 2, reputation: 2, result: 'La modifica viene accettata e i documenti tornano conformi.' },
          { id: 'waiver', label: 'Chiedi waiver al buyer', hint: 'Costo basso · dipende dalla relazione commerciale', random: true, good: { pnl: -2_000, days: 1, reputation: 1, result: 'Il buyer concede il waiver e la banca processa i documenti.' }, bad: { pnl: -35_000, days: 5, reputation: -4, result: 'Il buyer rifiuta il waiver e il pagamento viene ritardato.' } }
        ]
      }
    },
    {
      id: 'atlantic-diesel', origin: 'houston', destination: 'rotterdam', via: [], commodity: 'Diesel', quantity: 18000,
      capital: 8_600_000, equity: 1_250_000, basePnl: 210_000, duration: 27, risk: 'Medio', riskClass: 'medium', priceKey: 'crude', recommendedHedge: 90, transportMode: 'Product tanker',
      title: 'Gulf–ARA Distillates', description: 'Cargo energetico dal Gulf Coast al mercato ARA. Forte working capital, crack/basis risk e rigorosa gestione della qualità.',
      unlock: s => officeOwned('rotterdam') && s.completedDeals >= 3 && s.reputation >= 62,
      event: { dayRatio: .46, title: 'Off-spec sulfur test', text: 'Il laboratorio al discharge segnala sulfur content vicino al limite contrattuale.', choices: [
        { id: 'retest-fuel', label: 'Nomina un inspector indipendente', hint: 'Costo $18.000 · protegge la posizione documentale', pnl: -18_000, days: 2, reputation: 2, result: 'Il retest conferma la conformità e il buyer accetta il cargo.' },
        { id: 'blend-fuel', label: 'Organizza blending al terminal', hint: 'Costo $42.000 · riduce rischio claim e ritardo', pnl: -42_000, days: 3, reputation: 3, result: 'Il blending porta il prodotto pienamente in specifica.' },
        { id: 'waive-fuel', label: 'Negozia uno sconto col buyer', hint: 'Rapido · possibile forte riduzione del margine', random: true, good: { pnl: -26_000, days: 0, reputation: 0, result: 'Il buyer accetta un piccolo allowance.' }, bad: { pnl: -105_000, days: 2, reputation: -5, result: 'Il buyer applica un claim significativo per qualità.' } }
      ]}
    },
    {
      id: 'brazil-coffee', origin: 'santos', destination: 'brescia', via: ['genova'], commodity: 'Coffee', quantity: 600,
      capital: 3_150_000, equity: 470_000, basePnl: 102_000, duration: 38, risk: 'Medio', riskClass: 'medium', priceKey: 'coffee', recommendedHedge: 80, transportMode: 'Container / Truck',
      title: 'Santos Coffee Flow', description: 'Origination di arabica brasiliana verso un buyer europeo. Quality differentials, FX e documenti phytosanitary sono centrali.',
      unlock: s => officeOwned('genova') && s.completedDeals >= 3 && s.reputation >= 58,
      event: { dayRatio: .58, title: 'Moisture deviation', text: 'Il controllo rileva umidità superiore al livello atteso su parte dei bag.', choices: [
        { id: 'dry-coffee', label: 'Recondition e asciugatura', hint: 'Costo $21.000 · 3 giorni · preserva qualità', pnl: -21_000, days: 3, reputation: 2, result: 'Il lotto viene ricondizionato e consegnato in specifica.' },
        { id: 'discount-coffee', label: 'Concedi quality allowance', hint: 'Nessun ritardo · perdita commerciale incerta', random: true, good: { pnl: -16_000, days: 0, reputation: 1, result: 'Il buyer accetta un allowance limitato.' }, bad: { pnl: -54_000, days: 0, reputation: -2, result: 'Il buyer impone un forte differenziale qualitativo.' } }
      ]}
    },
    {
      id: 'argentina-wheat', origin: 'rosario', destination: 'brescia', via: ['genova'], commodity: 'Wheat', quantity: 5000,
      capital: 2_350_000, equity: 350_000, basePnl: 88_000, duration: 31, risk: 'Medio', riskClass: 'medium', priceKey: 'wheat', recommendedHedge: 75, transportMode: 'Handysize / Truck',
      title: 'Paraná Wheat Parcel', description: 'Grain origination dal Paraná verso il Nord Italia. Basis, protein content e river logistics determinano il risultato.',
      unlock: s => officeOwned('genova') && s.completedDeals >= 4 && s.reputation >= 60,
      event: { dayRatio: .28, title: 'Low river level', text: 'Il livello del Paraná riduce il pescaggio disponibile e la quantità caricabile.', choices: [
        { id: 'lighten-wheat', label: 'Riduci il parcel e acquista replacement', hint: 'Costo $24.000 · protegge delivery quantity', pnl: -24_000, days: 2, reputation: 2, result: 'La quantità mancante viene coperta con un acquisto sostitutivo.' },
        { id: 'wait-river', label: 'Attendi il miglioramento del fiume', hint: '5 giorni · possibile penale di laycan', random: true, good: { pnl: -9_000, days: 5, reputation: 0, result: 'Il livello risale e il carico parte completo.' }, bad: { pnl: -48_000, days: 8, reputation: -3, result: 'L’attesa genera deadfreight e una consegna tardiva.' } }
      ]}
    },
    {
      id: 'pilbara-iron', origin: 'port-hedland', destination: 'shanghai', via: [], commodity: 'Iron ore', quantity: 55000,
      capital: 7_400_000, equity: 1_150_000, basePnl: 245_000, duration: 34, risk: 'Alto', riskClass: 'high', priceKey: 'ironore', recommendedHedge: 70, transportMode: 'Panamax bulk carrier',
      title: 'Pilbara–Yangtze Ore', description: 'Mega-cargo dry bulk verso la Cina. Freight, Fe grade, moisture e port congestion dominano il P&L.',
      unlock: s => officeOwned('singapore') && s.completedDeals >= 6 && s.reputation >= 70,
      event: { dayRatio: .64, title: 'Shanghai anchorage congestion', text: 'La nave entra in coda e il laytime rischia di essere superato.', choices: [
        { id: 'priority-ore', label: 'Acquista discharge priority', hint: 'Costo $36.000 · limita demurrage', pnl: -36_000, days: 1, reputation: 2, result: 'Il terminal assegna una finestra prioritaria.' },
        { id: 'queue-ore', label: 'Rimani in coda', hint: 'Nessun costo iniziale · demurrage incerto', random: true, good: { pnl: -18_000, days: 3, reputation: 0, result: 'La coda si smaltisce più rapidamente del previsto.' }, bad: { pnl: -92_000, days: 7, reputation: -4, result: 'Il ritardo genera demurrage e claim del buyer.' } }
      ]}
    }
  ];;


  const opportunityParties = {
    'baltic-copper': { supplierId: 'baltic-metals', buyerId: 'lombardia-cables' },
    'andean-copper': { supplierId: 'andean-copper', buyerId: 'lombardia-cables' },
    'meridian-copper': { supplierId: 'meridian-resources', buyerId: 'lombardia-cables' },
    'rotterdam-alloy': { supplierId: 'northsea-alloys', buyerId: 'lombardia-cables' },
    'maghreb-urea': { supplierId: 'atlas-fertilizers', buyerId: 'po-valley-agri' },
    'asia-aluminium': { supplierId: 'meridian-resources', buyerId: 'straits-fabrication' },
    'atlantic-diesel': { supplierId: 'gulf-refining', buyerId: 'ara-fuels' },
    'brazil-coffee': { supplierId: 'santos-coffee', buyerId: 'italia-roasters' },
    'argentina-wheat': { supplierId: 'pampa-grains', buyerId: 'po-valley-agri' },
    'pilbara-iron': { supplierId: 'pilbara-mining', buyerId: 'yangtze-steel' }
  };

  const counterpartyCatalog = [
    { id: 'lombardia-cables', name: 'Lombardia Cables S.p.A.', type: 'Buyer', country: 'Italia', credit: 84, reliability: 89, kyc: 'Approved', description: 'Produttore industriale con domanda ricorrente di metalli e disciplina qualitativa elevata.' },
    { id: 'po-valley-agri', name: 'Po Valley Agri Coop', type: 'Buyer', country: 'Italia', credit: 72, reliability: 80, kyc: 'Approved', description: 'Consorzio agricolo sensibile a puntualità, moisture analysis e stagionalità.' },
    { id: 'straits-fabrication', name: 'Straits Fabrication Pte.', type: 'Buyer', country: 'Singapore', credit: 88, reliability: 86, kyc: 'Approved', description: 'Buyer asiatico investment-grade con forte disciplina documentale e pagamenti via LC.' },
    { id: 'baltic-metals', name: 'Baltic Metals OU', type: 'Supplier', country: 'Estonia', credit: 76, reliability: 78, kyc: 'Approved', description: 'Fornitore rapido e flessibile, con qualità documentale da monitorare.' },
    { id: 'andean-copper', name: 'Andean Copper Ltd.', type: 'Supplier', country: 'Cile', credit: 86, reliability: 91, kyc: 'Approved', description: 'Produttore solido con accesso competitivo al rame cileno e transit time lungo.' },
    { id: 'meridian-resources', name: 'Meridian Resources DMCC', type: 'Supplier', country: 'EAU', credit: 61, reliability: 67, kyc: 'Enhanced review', description: 'Trading counterparty aggressiva sul prezzo, ma con rischio compliance e struttura societaria complessa.' },
    { id: 'northsea-alloys', name: 'NorthSea Alloys BV', type: 'Supplier', country: 'Paesi Bassi', credit: 82, reliability: 88, kyc: 'Approved', description: 'Warehouse operator e merchant europeo con accesso a LME stocks e barges.' },
    { id: 'atlas-fertilizers', name: 'Atlas Fertilizers SA', type: 'Supplier', country: 'Marocco', credit: 74, reliability: 81, kyc: 'Approved', description: 'Produttore regionale di fertilizzanti con buona accessibilità mediterranea.' },
    { id: 'gulf-refining', name: 'Gulf Refining & Trading LLC', type: 'Supplier', country: 'USA', credit: 87, reliability: 89, kyc: 'Approved', description: 'Raffineria Gulf Coast con cargo program regolare e specifiche rigorose.' },
    { id: 'ara-fuels', name: 'ARA Fuels BV', type: 'Buyer', country: 'Paesi Bassi', credit: 90, reliability: 91, kyc: 'Approved', description: 'Distributore europeo investment-grade attivo nel mercato dei distillati.' },
    { id: 'santos-coffee', name: 'Santos Coffee Export SA', type: 'Supplier', country: 'Brasile', credit: 78, reliability: 83, kyc: 'Approved', description: 'Exporter brasiliano con network di cooperative e quality labs.' },
    { id: 'italia-roasters', name: 'Italia Roasters Group', type: 'Buyer', country: 'Italia', credit: 81, reliability: 86, kyc: 'Approved', description: 'Torrefattore europeo sensibile a cup profile, moisture e tracciabilità.' },
    { id: 'pampa-grains', name: 'Pampa Grains SA', type: 'Supplier', country: 'Argentina', credit: 70, reliability: 79, kyc: 'Approved', description: 'Origination house agricola sul corridoio del Paraná.' },
    { id: 'pilbara-mining', name: 'Pilbara Mining Ltd.', type: 'Supplier', country: 'Australia', credit: 92, reliability: 94, kyc: 'Approved', description: 'Produttore minerario di grandi volumi con loading discipline elevata.' },
    { id: 'yangtze-steel', name: 'Yangtze Steel Group', type: 'Buyer', country: 'Cina', credit: 85, reliability: 84, kyc: 'Approved', description: 'Gruppo siderurgico con domanda di iron ore su scala Panamax.' }
  ];

  const negotiationProfiles = {
    commercial: {
      competitive: { label: 'Competitive quote', pnl: -14_000, acceptance: 18 },
      market: { label: 'Market quote', pnl: 0, acceptance: 0 },
      premium: { label: 'Premium quote', pnl: 22_000, acceptance: -24 }
    },
    payment: {
      thirty: { label: '30 days after delivery', equityFactor: 1.12, acceptance: 9 },
      delivery: { label: 'Payment at delivery', equityFactor: 1, acceptance: 0 },
      prepay: { label: '20% advance', equityFactor: .8, acceptance: -16 }
    },
    delivery: {
      priority: { label: 'Priority window', duration: -3, pnl: -9_000, acceptance: 10 },
      standard: { label: 'Standard window', duration: 0, pnl: 0, acceptance: 0 },
      flexible: { label: 'Flexible window', duration: 4, pnl: 7_000, acceptance: -9 }
    }
  };

  const financingProfiles = {
    revolver: { label: 'Revolving credit facility', equityFactor: 1, pnl: 0, rate: .075, acceptance: 0, description: 'Flessibile, ma assorbe credit line e genera interessi giornalieri.' },
    lc: { label: 'LC-backed trade finance', equityFactor: .82, pnl: -6_000, rate: .064, acceptance: 4, description: 'Riduce equity e rischio di pagamento attraverso documenti conformi.' },
    inventory: { label: 'Borrowing-base / inventory finance', equityFactor: .66, pnl: -13_000, rate: .082, acceptance: 1, requiresStaff: 'trade-finance-manager', description: 'Funding efficiente garantito dal cargo e dai receivables.' },
    balance: { label: 'Own balance sheet', equityFactor: 1.85, pnl: 8_000, rate: .025, acceptance: 0, description: 'Più equity, meno dipendenza bancaria e maggiore flessibilità.' }
  };

  const insuranceProfiles = {
    basic: { label: 'Basic cargo cover', pnl: -2_500, lossFactor: 1, description: 'Copertura minima su perdita fisica e general average.' },
    allrisk: { label: 'All-risk + delay cover', pnl: -9_000, lossFactor: .55, description: 'Protezione più ampia su danni, ritardi e deviazioni.' },
    self: { label: 'Self-insured retention', pnl: 3_000, lossFactor: 1.35, description: 'Margine maggiore, ma il desk trattiene più rischio.' }
  };

  const inspectionProfiles = {
    none: { label: 'Supplier certificates only', pnl: 3_500, readiness: -8, lossFactor: 1.25, description: 'Costo minimo, forte dipendenza dai documenti del supplier.' },
    standard: { label: 'Standard load-port inspection', pnl: -4_000, readiness: 2, lossFactor: .9, description: 'Controllo quantità e qualità al porto di carico.' },
    independent: { label: 'Independent load & discharge survey', pnl: -12_000, readiness: 9, lossFactor: .62, description: 'Doppio controllo indipendente e migliore posizione nei claims.' }
  };

  const bankCatalog = [
    { id: 'alpine-bank', name: 'Alpine Trade Bank', type: 'Revolver', limitShare: .55, rate: .075, relationship: 68, description: 'Banca principale per working capital e hedge liquidity.' },
    { id: 'mercantile', name: 'Mercantile Commodity Finance', type: 'LC / borrowing base', limitShare: .30, rate: .066, relationship: 58, description: 'Specialista in documentary trade e inventory finance.' },
    { id: 'oceanic', name: 'Oceanic Bank Asia', type: 'Regional LC', limitShare: .15, rate: .071, relationship: 50, description: 'Capacità regionale disponibile dopo l’apertura di Singapore.' }
  ];

  const academyCatalog = [
    { id: 'deal-anatomy', title: 'Anatomia di un physical deal', concept: 'Un deal collega acquisto, vendita, funding, hedge, logistica e settlement. Il margine commerciale non è il P&L finale.', question: 'Quale costo può trasformare un buon gross margin in una perdita?', options: ['Solo il prezzo spot', 'Freight, finance, claims e demurrage', 'Nessuno se il buyer ha accettato'], correct: 1 },
    { id: 'hedge-margin', title: 'Hedging e margin calls', concept: 'L’hedge riduce il flat-price risk, ma un future short può richiedere liquidità quando il prezzo sale.', question: 'Un cargo perfettamente hedged può comunque creare una crisi di liquidità?', options: ['Sì, per variation margin', 'No, l’hedge elimina ogni rischio', 'Solo con Incoterm DDP'], correct: 0 },
    { id: 'trade-finance', title: 'Trade finance', concept: 'LC, revolving facilities e borrowing base modificano equity, costo e rischio di pagamento.', question: 'Cosa paga una banca sotto una LC documentaria?', options: ['La qualità economica del deal', 'Documenti conformi ai termini della LC', 'La reputazione del trader'], correct: 1 },
    { id: 'incoterms', title: 'Incoterms e transfer of risk', concept: 'Gli Incoterms allocano costi, responsabilità e passaggio del rischio logistico; non determinano automaticamente il titolo di proprietà.', question: 'Con FOB, chi normalmente organizza il main ocean freight?', options: ['Il buyer', 'Il seller fino alla destinazione finale', 'La banca'], correct: 0 },
    { id: 'shipping', title: 'Laytime e demurrage', concept: 'Laytime è il tempo contrattualmente concesso per operazioni portuali; il demurrage è il costo per il tempo eccedente.', question: 'Quando nasce tipicamente il demurrage?', options: ['Quando il prezzo scende', 'Quando il laytime utilizzato supera quello consentito', 'Quando manca un futures hedge'], correct: 1 },
    { id: 'quality-docs', title: 'Qualità, documenti e claims', concept: 'Certificates, survey e corretta descrizione documentale proteggono settlement e capacità di contestare claims.', question: 'Quale scelta rafforza maggiormente la posizione in un claim qualitativo?', options: ['Nessuna ispezione', 'Survey indipendente a load e discharge port', 'Aumentare il credit limit'], correct: 1 }
  ];

  const glossaryCatalog = [
    ['Basis risk','Rischio che prezzo fisico e strumento di hedge non si muovano perfettamente insieme.'],
    ['Bill of Lading','Documento di trasporto marittimo, ricevuta del cargo e spesso documento rappresentativo della merce.'],
    ['Borrowing base','Linea calcolata sul valore eleggibile di inventory e receivables.'],
    ['Demurrage','Importo dovuto quando le operazioni superano il laytime contrattuale.'],
    ['Flat-price risk','Esposizione alla variazione assoluta del prezzo della commodity.'],
    ['Laycan','Finestra entro cui la nave deve presentarsi pronta al carico.'],
    ['Letter of Credit','Impegno bancario a pagare contro presentazione di documenti conformi.'],
    ['Premium','Differenziale del prezzo fisico rispetto a benchmark/future.'],
    ['Quality allowance','Sconto negoziato per merce fuori specifica o con qualità inferiore.'],
    ['Variation margin','Flusso giornaliero di liquidità dovuto alla variazione del valore dei futures.']
  ];

  const globalEventCatalog = [
    { id: 'suez-disruption', title: 'Suez transit disruption', region: 'Middle East / Mediterranean', severity: 'high', duration: 8, description: 'Transit restrictions increase voyage time and freight for Gulf-origin ocean cargoes.', freightShock: 9, affects: opp => opp.origin === 'dubai' && transportClassForOpportunity(opp) === 'ocean', dealDays: 4, dealPnl: -14_000 },
    { id: 'genoa-strike', title: 'Genoa terminal strike', region: 'Northern Italy', severity: 'medium', duration: 6, description: 'Reduced shifts create congestion, storage pressure and uncertain discharge windows.', freightShock: 3, affects: opp => (opp.via || []).includes('genova'), dealDays: 3, dealPnl: -9_000 },
    { id: 'copper-rally', title: 'Copper supply squeeze', region: 'Global metals', severity: 'high', duration: 7, description: 'A supply shock pushes copper higher and increases variation-margin pressure.', commodity: 'copper', dailyDrift: 42, affects: opp => opp.priceKey === 'copper', dealDays: 0, dealPnl: 0 },
    { id: 'bank-tightening', title: 'Trade-finance tightening', region: 'Global banking', severity: 'medium', duration: 9, description: 'Banks temporarily reduce unsecured capacity and demand more equity on new transactions.', creditPenalty: 750_000, equityFactor: 1.12, affects: () => true, dealDays: 0, dealPnl: 0 },
    { id: 'med-weather', title: 'Severe Mediterranean weather', region: 'Mediterranean', severity: 'medium', duration: 5, description: 'Port rotations slow and short-sea freight becomes more expensive.', freightShock: 6, affects: opp => transportClassForOpportunity(opp) === 'ocean' && ((opp.via || []).includes('genova') || opp.origin === 'casablanca'), dealDays: 2, dealPnl: -6_000 },
    { id: 'atlantic-hurricane', title: 'Atlantic hurricane risk', region: 'Atlantic basin', severity: 'high', duration: 7, description: 'Weather reroutes tankers and container vessels, lifting freight and insurance.', freightShock: 11, affects: opp => ['houston','santos'].includes(opp.origin), dealDays: 4, dealPnl: -18_000 },
    { id: 'grain-drought', title: 'South American grain drought', region: 'South America', severity: 'high', duration: 8, description: 'Crop expectations deteriorate, increasing wheat and coffee volatility.', commodity: 'wheat', dailyDrift: 3.2, affects: opp => ['wheat','coffee'].includes(opp.priceKey), dealDays: 1, dealPnl: -5_000 },
    { id: 'china-steel-surge', title: 'Chinese steel restocking', region: 'North Asia', severity: 'medium', duration: 7, description: 'Steel mills accelerate purchases, lifting iron ore and dry-bulk demand.', commodity: 'ironore', dailyDrift: 1.7, freightShock: 5, affects: opp => opp.priceKey === 'ironore', dealDays: 2, dealPnl: 8_000 }
  ];


  const logisticsAssets = {
    'baltic-copper': {
      carrier: 'Baltic Rail 7', mode: 'Intermodal rail / truck', booking: 'Confirmed',
      warehouse: 'Brescia Cross-Dock', warehouseHub: 'brescia', storageDays: 2,
      purchaseTerms: 'DAP Brescia · LME M+1 + premium', salesTerms: 'DDP Brescia · 30 days',
      documentSet: ['Commercial invoice', 'Packing list', 'Quality certificate', 'Certificate of origin', 'CMR / rail note', 'Insurance certificate', 'Customs release']
    },
    'andean-copper': {
      carrier: 'MV Aurora Star', mode: 'Supramax / truck', booking: 'Firm charter',
      warehouse: 'Genoa Metal Terminal', warehouseHub: 'genova', storageDays: 5,
      purchaseTerms: 'FOB San Antonio · LME 3M + premium', salesTerms: 'DDP Brescia · 30 days',
      documentSet: ['Commercial invoice', 'Packing list', 'Quality certificate', 'Certificate of origin', 'Bill of lading', 'Insurance certificate', 'Customs release']
    },
    'meridian-copper': {
      carrier: 'MV Meridian Ace', mode: 'Handysize / truck', booking: 'Subject to LC',
      warehouse: 'Genoa Bonded Warehouse', warehouseHub: 'genova', storageDays: 7,
      purchaseTerms: 'CIF Genoa · LC at sight', salesTerms: 'DDP Brescia · 30 days',
      documentSet: ['Commercial invoice', 'Packing list', 'Quality certificate', 'Certificate of origin', 'Bill of lading', 'Insurance certificate', 'Customs release', 'LC compliance']
    },
    'rotterdam-alloy': {
      carrier: 'Rhine Barge 22', mode: 'Barge / rail', booking: 'Confirmed',
      warehouse: 'Rotterdam LME Warehouse', warehouseHub: 'rotterdam', storageDays: 4,
      purchaseTerms: 'FCA Rotterdam · LME cash + premium', salesTerms: 'DAP Brescia · 15 days',
      documentSet: ['Commercial invoice', 'Packing list', 'Quality certificate', 'Warehouse release', 'CMR / rail note', 'Insurance certificate', 'Customs release']
    },
    'maghreb-urea': {
      carrier: 'MV Atlas Coast', mode: 'Coaster / truck', booking: 'Firm booking',
      warehouse: 'Genoa Fertilizer Terminal', warehouseHub: 'genova', storageDays: 4,
      purchaseTerms: 'FOB Jorf Lasfar · Fertilizer index + premium', salesTerms: 'DAP Brescia · payment at delivery',
      documentSet: ['Commercial invoice', 'Packing list', 'Quality certificate', 'Certificate of origin', 'Bill of lading', 'Insurance certificate', 'Customs release', 'Moisture analysis']
    },
    'asia-aluminium': {
      carrier: 'MV Eastern Bridge', mode: 'Multipurpose vessel', booking: 'Subject to clean LC',
      warehouse: 'Singapore Metal Terminal', warehouseHub: 'singapore', storageDays: 3,
      purchaseTerms: 'FCA Jebel Ali · LME 3M + premium', salesTerms: 'CIF Singapore · LC at sight',
      documentSet: ['Commercial invoice', 'Packing list', 'Quality certificate', 'Certificate of origin', 'Bill of lading', 'Insurance certificate', 'LC compliance', 'Terminal release']
    },
    'atlantic-diesel': { carrier: 'MT Gulf Horizon', mode: 'MR product tanker', booking: 'Subjects lifted', warehouse: 'Rotterdam Independent Tank Terminal', warehouseHub: 'rotterdam', storageDays: 5, purchaseTerms: 'FOB Houston · Platts-linked', salesTerms: 'CIF Rotterdam · 10 days', documentSet: ['Commercial invoice','Certificate of quality','Certificate of quantity','Certificate of origin','Bill of lading','Cargo manifest','Insurance certificate','Customs release'] },
    'brazil-coffee': { carrier: 'Atlantic Container Line', mode: 'Container / truck', booking: 'Confirmed', warehouse: 'Genoa Food Grade Warehouse', warehouseHub: 'genova', storageDays: 6, purchaseTerms: 'FOB Santos · ICE differential', salesTerms: 'DAP Brescia · 20 days', documentSet: ['Commercial invoice','Packing list','Quality certificate','Phytosanitary certificate','Certificate of origin','Bill of lading','Insurance certificate','Customs release'] },
    'argentina-wheat': { carrier: 'MV Paraná Trader', mode: 'Handysize bulk carrier', booking: 'Firm booking', warehouse: 'Genoa Grain Terminal', warehouseHub: 'genova', storageDays: 4, purchaseTerms: 'FOB Upriver · MATIF basis', salesTerms: 'DAP Brescia · payment at delivery', documentSet: ['Commercial invoice','Weight certificate','Protein certificate','Phytosanitary certificate','Certificate of origin','Bill of lading','Insurance certificate','Customs release'] },
    'pilbara-iron': { carrier: 'MV Southern Cape', mode: 'Panamax bulk carrier', booking: 'Firm charter', warehouse: 'Shanghai Bulk Terminal', warehouseHub: 'shanghai', storageDays: 2, purchaseTerms: 'FOB Port Hedland · index-linked', salesTerms: 'CFR Shanghai · LC at sight', documentSet: ['Commercial invoice','Draft survey','Fe assay certificate','Moisture certificate','Certificate of origin','Bill of lading','Insurance certificate','LC compliance'] }
  };


  const vesselCatalog = [
    {
      id: 'ocean-pioneer', name: 'MV Ocean Pioneer', vesselClass: 'Handysize', capacity: 32_000,
      transportClass: 'ocean', homeHub: 'santiago', charterDays: 75, charterCost: 95_000,
      bonusPnl: 22_000, durationBonus: 4, minReputation: 50, minDeals: 0,
      description: 'Handysize versatile per rotte transatlantiche. Riduce dipendenza dal mercato spot e accelera l’execution.'
    },
    {
      id: 'gulf-navigator', name: 'MV Gulf Navigator', vesselClass: 'Multipurpose', capacity: 18_000,
      transportClass: 'ocean', homeHub: 'dubai', charterDays: 60, charterCost: 75_000,
      bonusPnl: 18_000, durationBonus: 3, minReputation: 52, minDeals: 1,
      description: 'Multipurpose vessel posizionata nel Golfo, adatta a parcel cargo e rotte verso il Mediterraneo.'
    },
    {
      id: 'rhine-link', name: 'Rhine Link 22', vesselClass: 'River barge', capacity: 2_200,
      transportClass: 'barge', homeHub: 'rotterdam', charterDays: 45, charterCost: 38_000,
      bonusPnl: 12_000, durationBonus: 2, minReputation: 58, minDeals: 2, requiresOffice: 'rotterdam',
      description: 'Chiatta fluviale per corridoi Reno–Alpi. Ideale per metalli e warehouse release da Rotterdam.'
    },
    {
      id: 'atlas-coaster', name: 'MV Atlas Coaster', vesselClass: 'Coaster', capacity: 8_500,
      transportClass: 'ocean', homeHub: 'casablanca', charterDays: 40, charterCost: 46_000,
      bonusPnl: 13_000, durationBonus: 2, minReputation: 56, minDeals: 2, requiresOffice: 'genova',
      description: 'Coaster mediterranea per parcel di fertilizzanti e metalli tra Nord Africa e Sud Europa.'
    },
    {
      id: 'eastern-merchant', name: 'MV Eastern Merchant', vesselClass: 'Multipurpose', capacity: 22_000,
      transportClass: 'ocean', homeHub: 'dubai', charterDays: 55, charterCost: 86_000,
      bonusPnl: 20_000, durationBonus: 3, minReputation: 68, minDeals: 5, requiresOffice: 'singapore',
      description: 'Asset regionale per il corridoio Golfo–Asia, con flessibilità su parcel cargo e port rotations.'
    },
    { id: 'gulf-product-tanker', name: 'MT Shippy Horizon', vesselClass: 'MR product tanker', capacity: 47000, transportClass: 'ocean', homeHub: 'houston', charterDays: 55, charterCost: 165000, bonusPnl: 46000, durationBonus: 3, minReputation: 64, minDeals: 3, requiresOffice: 'rotterdam', description: 'Tanker dedicata ai distillati Gulf Coast–ARA, con tank segregation e vetting completo.' },
    { id: 'parana-handy', name: 'MV River Plata', vesselClass: 'Handysize bulker', capacity: 33000, transportClass: 'ocean', homeHub: 'rosario', charterDays: 48, charterCost: 92000, bonusPnl: 26000, durationBonus: 2, minReputation: 61, minDeals: 4, requiresOffice: 'genova', description: 'Handysize per grain parcels e porti con limiti di pescaggio.' },
    { id: 'pilbara-panamax', name: 'MV Iron Meridian', vesselClass: 'Panamax bulker', capacity: 76000, transportClass: 'ocean', homeHub: 'port-hedland', charterDays: 52, charterCost: 210000, bonusPnl: 62000, durationBonus: 3, minReputation: 72, minDeals: 6, requiresOffice: 'singapore', description: 'Panamax dedicata a dry-bulk trades Australia–North Asia.' }
  ];


  const officeCatalog = [
    { id: 'geneva', name: 'Geneva HQ', hub: 'geneva', cost: 0, dailyCost: 900, minReputation: 0, minDeals: 0, description: 'Capitale, risk management, compliance e relazioni bancarie del gruppo.', benefit: 'Centro decisionale della trading house.' },
    { id: 'genova', name: 'Genoa Operations Desk', hub: 'genova', cost: 120_000, dailyCost: 650, minReputation: 54, minDeals: 1, description: 'Team locale per port calls, customs, storage e last-mile verso il Nord Italia.', benefit: 'Sblocca fertilizer trading e riduce di 2 giorni le rotte marittime via Genova.' },
    { id: 'rotterdam', name: 'Rotterdam Metals Desk', hub: 'rotterdam', cost: 240_000, dailyCost: 1_000, minReputation: 58, minDeals: 2, description: 'Accesso diretto a warehouse, barges e clienti industriali del Nord Europa.', benefit: 'Sblocca Rhine–Alps Alloy e riduce i costi charter del 5%.' },
    { id: 'singapore', name: 'Singapore Asia Desk', hub: 'singapore', cost: 480_000, dailyCost: 1_800, minReputation: 68, minDeals: 5, description: 'Piattaforma asiatica per metalli, freight, trade finance e client coverage regionale.', benefit: 'Sblocca il mercato asiatico e Gulf–Asia Aluminium.' }
  ];

  const staffCatalog = [
    { id: 'operations-coordinator', role: 'Operations Coordinator', hireCost: 45_000, dailySalary: 250, minReputation: 50, description: 'Coordina documenti, terminal, customs e delivery windows.', benefit: 'Expedite documents costa il 40% in meno e +5 punti di readiness.' },
    { id: 'risk-analyst', role: 'Risk Analyst', hireCost: 60_000, dailySalary: 320, minReputation: 54, description: 'Controlla hedge, concentrazione, liquidity buffer e limiti del desk.', benefit: 'Riduce il risk score e i costi di re-hedging del 35%.' },
    { id: 'freight-charterer', role: 'Freight Charterer', hireCost: 55_000, dailySalary: 300, minReputation: 56, description: 'Negozia time charter, laycan, demurrage e alternative di rotta.', benefit: 'Riduce del 15% l’upfront hire delle navi.' },
    { id: 'trade-finance-manager', role: 'Trade Finance Manager', hireCost: 75_000, dailySalary: 420, minReputation: 60, description: 'Struttura LC, borrowing base e working-capital facilities.', benefit: 'Aumenta la linea di credito di $1M e riduce del 10% l’equity richiesta.' }
  ];

  const investmentCatalog = [
    { id:'atacama-copper', chain:'upstream', name:'Atacama Copper Mine', hub:'santiago', icon:'⛏', commodity:'Copper', maxLevel:3, baseCost:260000, buildDays:7, dailyIncome:1800, pnlBonus:9500, equityReduction:.025, minReputation:50, minDeals:0, description:'Offtake minerario e quota di produzione. Riduce il costo di sourcing del rame e garantisce flussi fisici prioritari.' },
    { id:'atlas-urea-plant', chain:'upstream', name:'Atlas Urea Production', hub:'casablanca', icon:'◆', commodity:'Urea', maxLevel:3, baseCost:340000, buildDays:9, dailyIncome:2300, pnlBonus:12000, equityReduction:.02, minReputation:55, minDeals:1, description:'Partecipazione industriale nella produzione di urea, con accesso preferenziale a volumi mediterranei.' },
    { id:'santos-estate', chain:'upstream', name:'Santos Coffee Estate', hub:'santos', icon:'♨', commodity:'Coffee', maxLevel:3, baseCost:390000, buildDays:10, dailyIncome:2800, pnlBonus:14500, equityReduction:.02, minReputation:61, minDeals:3, description:'Origination captive, quality control e tracciabilità sulla filiera del caffè brasiliano.' },
    { id:'permian-production', chain:'upstream', name:'Permian Production Interest', hub:'houston', icon:'◉', commodity:'Diesel', priceKey:'crude', maxLevel:3, baseCost:620000, buildDays:14, dailyIncome:4500, pnlBonus:22000, equityReduction:.018, minReputation:66, minDeals:4, description:'Working interest energetico che migliora feedstock access e margine sui prodotti raffinati.' },
    { id:'genoa-terminal', chain:'midstream', name:'Genoa Multipurpose Terminal', hub:'genova', icon:'▤', routeHub:'genova', maxLevel:3, baseCost:220000, buildDays:6, dailyIncome:1600, pnlBonus:6000, durationBonus:1, minReputation:52, minDeals:1, description:'Berth priority, customs handling e storage dedicato per i cargo diretti al Nord Italia.' },
    { id:'rotterdam-tanks', chain:'midstream', name:'Rotterdam Storage & Blending', hub:'rotterdam', icon:'▥', routeHub:'rotterdam', maxLevel:3, baseCost:470000, buildDays:11, dailyIncome:3400, pnlBonus:11000, durationBonus:1, minReputation:60, minDeals:2, description:'Tankage, warehouse receipts e blending optionality nel principale hub europeo.' },
    { id:'ocean-logistics-pool', chain:'midstream', name:'Ocean Logistics Pool', hub:'geneva', icon:'◈', ocean:true, maxLevel:3, baseCost:360000, buildDays:8, dailyIncome:2100, pnlBonus:7500, durationBonus:1, minReputation:57, minDeals:2, description:'Pool di capacità marittima e contratti COA che riduce freight volatility e transit time.' },
    { id:'brescia-cable-mill', chain:'downstream', name:'Brescia Cable Mill', hub:'brescia', icon:'⌁', commodities:['Copper','Aluminium'], destination:'brescia', maxLevel:3, baseCost:310000, buildDays:8, dailyIncome:2600, pnlBonus:13500, acceptanceBonus:3, minReputation:54, minDeals:1, description:'Domanda captive e conversion margin su rame e alluminio. Stabilizza le vendite e aumenta il valore per tonnellata.' },
    { id:'po-valley-distribution', chain:'downstream', name:'Po Valley Fertilizer Network', hub:'brescia', icon:'✦', commodity:'Urea', destination:'brescia', maxLevel:3, baseCost:280000, buildDays:7, dailyIncome:2200, pnlBonus:10500, acceptanceBonus:4, minReputation:58, minDeals:2, description:'Rete distributiva agricola con magazzini locali e domanda stagionale proprietaria.' },
    { id:'ara-fuel-blending', chain:'downstream', name:'ARA Fuel Blending Plant', hub:'rotterdam', icon:'◫', commodity:'Diesel', priceKey:'crude', destination:'rotterdam', maxLevel:3, baseCost:540000, buildDays:12, dailyIncome:4100, pnlBonus:20500, acceptanceBonus:3, minReputation:65, minDeals:4, description:'Blending e specification management trasformano feedstock in prodotti vendibili ad alto margine.' },
    { id:'italian-roastery', chain:'downstream', name:'Italian Roastery Group', hub:'brescia', icon:'☕', commodity:'Coffee', destination:'brescia', maxLevel:3, baseCost:430000, buildDays:10, dailyIncome:3300, pnlBonus:17000, acceptanceBonus:3, minReputation:64, minDeals:4, description:'Capacità di torrefazione e branded distribution per catturare margine downstream sulla filiera coffee.' },
    { id:'yangtze-steel-interest', chain:'downstream', name:'Yangtze Steel Mill Interest', hub:'shanghai', icon:'▰', commodity:'Iron ore', destination:'shanghai', maxLevel:3, baseCost:780000, buildDays:16, dailyIncome:5900, pnlBonus:30000, acceptanceBonus:2, minReputation:72, minDeals:6, description:'Quota industriale siderurgica che crea domanda captive per grandi cargo di iron ore.' }
  ];

  const missionCatalog = [
    { id: 'first-cargo', title: 'First Cargo', description: 'Completa il primo physical deal.', target: 1, progress: s => s.completedDeals, achieved: s => s.completedDeals >= 1, cash: 40_000, reputation: 2 },
    { id: 'risk-discipline', title: 'Risk Discipline', description: 'Chiudi un deal profittevole con hedge almeno all’80%.', target: 1, progress: s => s.history.filter(h => h.pnl > 0 && (h.hedgeRatio || 0) >= 80).length, achieved: s => s.history.some(h => h.pnl > 0 && (h.hedgeRatio || 0) >= 80), cash: 55_000, reputation: 2 },
    { id: 'fleet-operator', title: 'Fleet Operator', description: 'Completa un deal utilizzando una nave in time charter.', target: 1, progress: s => s.history.filter(h => h.shippingStrategy === 'internal-fleet').length, achieved: s => s.history.some(h => h.shippingStrategy === 'internal-fleet'), cash: 75_000, reputation: 3 },
    { id: 'european-network', title: 'European Network', description: 'Apri i desk di Genova e Rotterdam.', target: 2, progress: s => ['genova','rotterdam'].filter(id => officeOwned(id)).length, achieved: s => officeOwned('genova') && officeOwned('rotterdam'), cash: 100_000, credit: 500_000, reputation: 3 },
    { id: 'relationship-builder', title: 'Relationship Builder', description: 'Completa almeno tre deal e porta una relazione commerciale sopra 60.', target: 4, progress: s => Math.min(3,s.completedDeals) + (Object.values(s.counterparties||{}).some(p => p.relationship >= 60) ? 1 : 0), achieved: s => s.completedDeals >= 3 && Object.values(s.counterparties||{}).some(p => p.relationship >= 60), cash: 85_000, reputation: 3 },
    { id: 'crisis-tested', title: 'Crisis Tested', description: 'Completa un deal colpito da una dislocazione globale.', target: 1, progress: s => s.history.filter(h => (h.globalEventImpacts||[]).length).length, achieved: s => s.history.some(h => (h.globalEventImpacts||[]).length), cash: 90_000, reputation: 3 },
    { id: 'academy-graduate', title: 'Academy Graduate', description: 'Completa tutte le lezioni della SHIPPY Academy.', target: academyCatalog.length, progress: s => Object.values(s.academyProgress||{}).filter(item=>item.completed).length, achieved: s => Object.values(s.academyProgress||{}).filter(item=>item.completed).length >= academyCatalog.length, cash: 120_000, reputation: 4 },
    { id: 'multi-commodity', title: 'Multi-Commodity Merchant', description: 'Chiudi deal in almeno tre commodity differenti.', target: 3, progress: s => new Set((s.history||[]).map(item=>item.commodity)).size, achieved: s => new Set((s.history||[]).map(item=>item.commodity)).size >= 3, cash: 140_000, reputation: 4 },
    { id: 'liquidity-professional', title: 'Liquidity Professional', description: 'Chiudi in profitto un deal che ha richiesto almeno una margin call.', target: 1, progress: s => (s.history||[]).filter(item=>item.pnl>0&&(item.marginCalls||0)>0).length, achieved: s => (s.history||[]).some(item=>item.pnl>0&&(item.marginCalls||0)>0), cash: 110_000, credit: 350_000, reputation: 3 },
    { id: 'top-ten-merchant', title: 'Top 10 Merchant', description: 'Entra nella top 10 della Career League dopo almeno tre deal chiusi.', target: 10, progress: s => s.completedDeals < 3 ? 0 : Math.max(0, 11 - leaderboardPosition('overall')), achieved: s => s.completedDeals >= 3 && leaderboardPosition('overall') <= 10, cash: 150_000, reputation: 4 },
    { id: 'vertical-pioneer', title: 'Vertical Pioneer', description: 'Costruisci almeno un asset upstream, uno midstream e uno downstream.', target: 3, progress: s => ['upstream','midstream','downstream'].filter(chain => investmentCatalog.some(asset => asset.chain === chain && investmentLevel(asset.id) > 0)).length, achieved: s => ['upstream','midstream','downstream'].every(chain => investmentCatalog.some(asset => asset.chain === chain && investmentLevel(asset.id) > 0)), cash: 180_000, reputation: 5 },
    { id: 'industrial-empire', title: 'Industrial Empire', description: 'Raggiungi complessivamente 10 livelli di asset industriali.', target: 10, progress: s => totalInvestmentLevels(), achieved: s => totalInvestmentLevels() >= 10, cash: 300_000, credit: 500_000, reputation: 6 },
    { id: 'global-desk', title: 'Global Desk', description: 'Apri Singapore e completa almeno cinque deal.', target: 6, progress: s => Math.min(5, s.completedDeals) + (officeOwned('singapore') ? 1 : 0), achieved: s => officeOwned('singapore') && s.completedDeals >= 5, cash: 200_000, reputation: 5 }
  ];

  const continentPolygons = [
    [[-168,72],[-140,70],[-125,55],[-123,40],[-112,30],[-97,18],[-83,10],[-76,18],[-81,27],[-72,42],[-60,49],[-54,57],[-72,65],[-100,72],[-130,72]],
    [[-82,12],[-72,8],[-62,-4],[-52,-12],[-47,-25],[-55,-40],[-68,-55],[-76,-46],[-76,-30],[-81,-12]],
    [[-18,36],[-7,36],[5,32],[16,32],[31,31],[42,13],[51,11],[48,-8],[39,-22],[29,-35],[17,-35],[8,-27],[-2,-5],[-17,14]],
    [[-11,36],[2,44],[15,49],[28,48],[42,54],[62,55],[80,60],[100,56],[118,49],[136,54],[153,48],[170,58],[178,50],[160,35],[142,24],[122,16],[105,5],[92,9],[80,22],[64,28],[52,35],[39,38],[28,35],[18,42],[5,43]],
    [[110,-10],[126,-11],[141,-18],[151,-30],[145,-41],[129,-43],[115,-35],[111,-23]],
    [[-52,83],[-28,81],[-18,70],[-30,59],[-48,60],[-63,70]],
    [[-180,-70],[-140,-73],[-100,-72],[-60,-75],[-20,-71],[20,-74],[60,-72],[100,-75],[140,-72],[180,-70],[180,-90],[-180,-90]]
  ];

  const denseContinents = continentPolygons.map(poly => densifyPolygon(poly));
  const routeCache = new Map();

  function defaultState() {
    return {
      version: 11,
      profileName: 'Giorgio Bonetta',
      companyName: 'SHIPPY Trading',
      leaderboardSnapshots: [],
      investments: {},
      constructionQueue: [],
      assetIncome: 0,
      date: '2026-09-01T00:00:00.000Z',
      cash: 1_000_000,
      creditLimit: 6_000_000,
      reputation: 50,
      realizedPnl: 0,
      completedDeals: 0,
      activeDeals: [],
      fleetAssets: [],
      offices: ['geneva'],
      staff: [],
      completedMissions: [],
      overheadPaid: 0,
      history: [],
      navHistory: [1_000_000, 1_000_000, 1_000_000],
      copperPrice: 9500,
      copperPrev: 9500,
      aluminiumPrice: 2450,
      aluminiumPrev: 2450,
      ureaPrice: 360,
      ureaPrev: 360,
      eurusd: 1.1000,
      eurusdPrev: 1.1000,
      freightIndex: 100,
      freightPrev: 100,
      crudePrice: 78.5,
      crudePrev: 78.5,
      wheatPrice: 245,
      wheatPrev: 245,
      ironorePrice: 108,
      ironorePrev: 108,
      coffeePrice: 4200,
      coffeePrev: 4200,
      sequence: 1,
      dayIndex: 0,
      marketCycle: 1,
      marketCycleDay: 0,
      negotiations: {},
      counterparties: {},
      activeGlobalEvents: [],
      worldEventFeed: [],
      nextGlobalEventDay: 6,
      difficulty: 'standard',
      onboardingComplete: false,
      academyProgress: {},
      academyScore: 0,
      marginCalls: 0,
      emergencyFundingCost: 0,
      totalInterestPaid: 0
    };
  }

  function loadState() {
    try {
      let raw = localStorage.getItem(storageKey);
      if (!raw) {
        for (const legacyKey of legacyStorageKeys) {
          raw = localStorage.getItem(legacyKey);
          if (raw) break;
        }
      }
      if (!raw) return defaultState();
      const loaded = JSON.parse(raw);
      if (![3, 4, 5, 6, 7, 8, 9, 10, 11].includes(loaded.version)) return defaultState();
      const migrated = { ...defaultState(), ...loaded, version: 11 };
      migrated.offices = [...new Set(['geneva', ...(migrated.offices || [])])];
      migrated.staff = migrated.staff || [];
      migrated.completedMissions = migrated.completedMissions || [];
      migrated.negotiations = migrated.negotiations || {};
      migrated.counterparties = migrated.counterparties || {};
      migrated.activeGlobalEvents = migrated.activeGlobalEvents || [];
      migrated.worldEventFeed = migrated.worldEventFeed || [];
      migrated.dayIndex = migrated.dayIndex || 0;
      migrated.marketCycle = migrated.marketCycle || 1;
      migrated.marketCycleDay = migrated.marketCycleDay || 0;
      migrated.nextGlobalEventDay = migrated.nextGlobalEventDay || 6;
      migrated.academyProgress = migrated.academyProgress || {};
      migrated.academyScore = migrated.academyScore || 0;
      migrated.marginCalls = migrated.marginCalls || 0;
      migrated.emergencyFundingCost = migrated.emergencyFundingCost || 0;
      migrated.totalInterestPaid = migrated.totalInterestPaid || 0;
      migrated.profileName = migrated.profileName || 'Giorgio Bonetta';
      migrated.companyName = migrated.companyName || 'SHIPPY Trading';
      migrated.leaderboardSnapshots = migrated.leaderboardSnapshots || [];
      migrated.investments = migrated.investments || {};
      migrated.constructionQueue = migrated.constructionQueue || [];
      migrated.assetIncome = migrated.assetIncome || 0;
      migrated.difficulty = migrated.difficulty || 'standard';
      if (loaded.version < 8) migrated.onboardingComplete = true;
      migrated.activeDeals = (migrated.activeDeals || []).map(deal => hydrateDealOperations(deal));
      migrated.fleetAssets = (migrated.fleetAssets || []).filter(asset => vesselCatalog.some(v => v.id === asset.catalogId));
      return migrated;
    } catch {
      return defaultState();
    }
  }

  let state = loadState();
  initializeCounterparties();
  state.activeDeals = state.activeDeals.map(hydrateDealOperations);
  let selected = { type: 'hub', id: 'geneva' };
  let activeLeftTab = 'portfolio';
  let selectedLeaderboardMode = 'overall';
  const selectedHedgeRatios = Object.fromEntries(opportunities.map(o => [o.id, o.recommendedHedge || 100]));
  const selectedCarrierStrategies = Object.fromEntries(opportunities.map(o => [o.id, 'spot']));
  const selectedFinancingStrategies = Object.fromEntries(opportunities.map(o => [o.id, 'revolver']));
  const selectedInsuranceStrategies = Object.fromEntries(opportunities.map(o => [o.id, 'basic']));
  const selectedInspectionStrategies = Object.fromEntries(opportunities.map(o => [o.id, 'standard']));
  const selectedFxHedgeRatios = Object.fromEntries(opportunities.map(o => [o.id, ['geneva','brescia','genova','rotterdam'].includes(o.destination) ? 80 : 100]));
  const selectedNegotiationDrafts = Object.fromEntries(opportunities.map(o => [o.id, null]));
  let layers = { opportunities: true, portfolio: true, risk: false, logistics: true };
  let runningSpeed = 0;
  let clockTimer = null;
  let toastTimer = null;

  const canvas = $('#globeCanvas');
  const earthCanvas = $('#earthCanvas');
  const ctx = canvas.getContext('2d');
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let view = { lon: 6, lat: 18, zoom: 1, targetLon: null, targetLat: null };

  let earthRenderer = null;
  let earthScene = null;
  let earthCamera = null;
  let earthMesh = null;
  let cloudMesh = null;
  let atmosphereMesh = null;
  let starField = null;
  let sunLight = null;
  let earthWebGLReady = false;
  const earthProjectionVector = new THREE.Vector3();
  const earthCameraVector = new THREE.Vector3();

  function geoVector3(lon, lat, radius = 1) {
    const phi = lat * deg;
    const lambda = lon * deg;
    return new THREE.Vector3(
      radius * Math.cos(phi) * Math.cos(lambda),
      radius * Math.sin(phi),
      -radius * Math.cos(phi) * Math.sin(lambda)
    );
  }

  function createStarField() {
    const count = 1800;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const radius = 5 + Math.random() * 11;
      const theta = Math.random() * Math.PI * 2;
      const u = Math.random() * 2 - 1;
      const spread = Math.sqrt(1 - u * u);
      positions[i * 3] = radius * spread * Math.cos(theta);
      positions[i * 3 + 1] = radius * u;
      positions[i * 3 + 2] = radius * spread * Math.sin(theta);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0xc8ddf4,
      size: 0.018,
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
      sizeAttenuation: true
    });
    return new THREE.Points(geometry, material);
  }

  function initEarthRenderer() {
    try {
      earthRenderer = new THREE.WebGLRenderer({ canvas: earthCanvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
      earthRenderer.setPixelRatio(dpr);
      earthRenderer.outputColorSpace = THREE.SRGBColorSpace;
      earthRenderer.toneMapping = THREE.ACESFilmicToneMapping;
      earthRenderer.toneMappingExposure = 1.02;
      earthRenderer.setClearColor(0x02050a, 0);

      earthScene = new THREE.Scene();
      earthScene.fog = new THREE.FogExp2(0x02050a, 0.018);
      earthCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 50);

      const manager = new THREE.LoadingManager();
      manager.onLoad = () => {
        earthWebGLReady = true;
        $('#earthLoading')?.classList.add('loaded');
      };
      manager.onError = () => {
        $('#earthLoading strong').textContent = 'Earth texture fallback';
      };
      const loader = new THREE.TextureLoader(manager);
      const dayMap = loader.load('assets/earth_atmos_2048.jpg');
      const normalMap = loader.load('assets/earth_normal_2048.jpg');
      const specularMap = loader.load('assets/earth_specular_2048.jpg');
      const cloudMap = loader.load('assets/earth_clouds_1024.png');
      const lightsMap = loader.load('assets/earth_lights_2048.png');
      dayMap.colorSpace = THREE.SRGBColorSpace;
      lightsMap.colorSpace = THREE.SRGBColorSpace;
      [dayMap, normalMap, specularMap, cloudMap, lightsMap].forEach(texture => {
        texture.anisotropy = Math.min(8, earthRenderer.capabilities.getMaxAnisotropy());
      });

      const earthGeometry = new THREE.SphereGeometry(1, 128, 96);
      const earthMaterial = new THREE.MeshPhongMaterial({
        map: dayMap,
        normalMap,
        normalScale: new THREE.Vector2(0.58, 0.58),
        specularMap,
        specular: new THREE.Color(0x335a72),
        shininess: 18,
        emissive: new THREE.Color(0xffffff),
        emissiveMap: lightsMap,
        emissiveIntensity: 0.16
      });
      earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
      earthScene.add(earthMesh);

      const cloudMaterial = new THREE.MeshPhongMaterial({
        map: cloudMap,
        alphaMap: cloudMap,
        color: 0xffffff,
        transparent: true,
        opacity: 0.28,
        depthWrite: false,
        side: THREE.DoubleSide
      });
      cloudMesh = new THREE.Mesh(new THREE.SphereGeometry(1.009, 128, 96), cloudMaterial);
      earthScene.add(cloudMesh);

      const atmosphereMaterial = new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        uniforms: { glowColor: { value: new THREE.Color(0x4bb8ff) } },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vWorldPosition;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 glowColor;
          varying vec3 vNormal;
          varying vec3 vWorldPosition;
          void main() {
            vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
            float fresnel = pow(max(0.0, 0.64 - dot(vNormal, viewDirection)), 3.4);
            gl_FragColor = vec4(glowColor, fresnel * 0.34);
          }
        `
      });
      atmosphereMesh = new THREE.Mesh(new THREE.SphereGeometry(1.038, 128, 96), atmosphereMaterial);
      earthScene.add(atmosphereMesh);

      earthScene.add(new THREE.HemisphereLight(0x9ecbf0, 0x07111d, 0.78));
      sunLight = new THREE.DirectionalLight(0xffffff, 2.35);
      sunLight.position.set(4.5, 2.4, 5.2);
      earthScene.add(sunLight);
      const rimLight = new THREE.DirectionalLight(0x3e8cff, 0.65);
      rimLight.position.set(-4, 1.2, -3);
      earthScene.add(rimLight);

      starField = createStarField();
      earthScene.add(starField);
    } catch (error) {
      console.warn('WebGL Earth fallback', error);
      document.body.classList.add('webgl-fallback');
      $('#earthLoading')?.classList.add('loaded');
    }
  }

  function syncEarthProjection() {
    if (!earthCamera || !canvasRect) return;
    const width = Math.max(1, canvasRect.width);
    const height = Math.max(1, canvasRect.height);
    const minDim = Math.min(width, height);
    const radiusPx = minDim * 0.365 * view.zoom;
    const halfHeight = height / (2 * radiusPx);
    const halfWidth = width / (2 * radiusPx);
    earthCamera.left = -halfWidth;
    earthCamera.right = halfWidth;
    earthCamera.top = halfHeight;
    earthCamera.bottom = -halfHeight;
    earthCamera.updateProjectionMatrix();

    earthCameraVector.copy(geoVector3(view.lon, view.lat, 3.25));
    earthCamera.position.copy(earthCameraVector);
    earthCamera.up.set(0, 1, 0);
    earthCamera.lookAt(0, 0, 0);
    earthCamera.updateMatrixWorld();
  }

  function renderEarth(timestamp = 0) {
    if (!earthRenderer || !earthScene || !earthCamera || !canvasRect) return;
    syncEarthProjection();
    if (cloudMesh) cloudMesh.rotation.y = timestamp * 0.000006;
    if (starField) starField.rotation.y = timestamp * 0.0000015;
    if (sunLight) {
      const season = (state.dayIndex || 0) * 0.0025;
      sunLight.position.set(4.5 * Math.cos(season), 2.2, 4.5 * Math.sin(season));
    }
    earthRenderer.render(earthScene, earthCamera);
  }
  let dragging = false;
  let dragMoved = false;
  let dragStart = null;
  let markerHitboxes = [];
  let shipHitboxes = [];
  let fleetHitboxes = [];
  let investmentHitboxes = [];
  let simulationDayAnchor = performance.now();
  let selectedEmpireChain = 'all';
  let canvasRect = null;
  let animationTime = 0;
  let lastDrawTime = 0;

  function officeOwned(id) { return (state?.offices || []).includes(id); }
  function hasStaff(id) { return (state?.staff || []).includes(id); }
  function getOffice(id) { return officeCatalog.find(o => o.id === id); }
  function getStaff(id) { return staffCatalog.find(member => member.id === id); }
  function officeUnlocked(office) { return state.reputation >= office.minReputation && state.completedDeals >= office.minDeals; }
  function staffUnlocked(member) { return state.reputation >= member.minReputation; }
  function dailyOverhead() {
    const officeCost = officeCatalog.filter(o => officeOwned(o.id)).reduce((sum,o)=>sum+o.dailyCost,0);
    const salaryCost = staffCatalog.filter(member => hasStaff(member.id)).reduce((sum,member)=>sum+member.dailySalary,0);
    return officeCost + salaryCost;
  }
  function investmentDefinition(id) { return investmentCatalog.find(asset => asset.id === id); }
  function investmentRecord(id) {
    state.investments = state.investments || {};
    return state.investments[id] || { level:0, buildingTo:null, daysRemaining:0, totalSpent:0 };
  }
  function investmentLevel(id) { return investmentRecord(id).level || 0; }
  function totalInvestmentLevels() { return investmentCatalog.reduce((sum,asset)=>sum+investmentLevel(asset.id),0); }
  function activeConstructionCount() { return Object.values(state.investments || {}).filter(record => record.buildingTo && record.daysRemaining > 0).length; }
  function builderSlots() { return 1 + (officeOwned('rotterdam') ? 1 : 0) + (officeOwned('singapore') ? 1 : 0); }
  function investmentCost(asset, targetLevel = investmentLevel(asset.id)+1) { return Math.round(asset.baseCost * Math.pow(1.72, targetLevel-1)); }
  function investmentBuildDays(asset, targetLevel = investmentLevel(asset.id)+1) { return Math.round(asset.buildDays * Math.pow(1.38, targetLevel-1)); }
  function investmentUnlocked(asset) { return state.reputation >= asset.minReputation && state.completedDeals >= asset.minDeals; }
  function investmentMatches(asset, opp) {
    const commodityMatch = asset.commodity ? asset.commodity === opp.commodity : asset.commodities ? asset.commodities.includes(opp.commodity) : asset.priceKey ? asset.priceKey === opp.priceKey : true;
    const routeMatch = asset.routeHub ? [opp.origin,opp.destination,...(opp.via||[])].includes(asset.routeHub) : asset.destination ? opp.destination === asset.destination : asset.ocean ? transportClassForOpportunity(opp) === 'ocean' : true;
    return commodityMatch && routeMatch;
  }
  function investmentAdjustments(opp) {
    return investmentCatalog.reduce((acc,asset)=>{
      const level=investmentLevel(asset.id);
      if (!level || !investmentMatches(asset,opp)) return acc;
      acc.pnlBonus += (asset.pnlBonus||0)*level;
      acc.durationBonus += (asset.durationBonus||0)*level;
      acc.acceptanceBonus += (asset.acceptanceBonus||0)*level;
      acc.equityFactor *= Math.max(.72,1-(asset.equityReduction||0)*level);
      acc.sources.push(`${asset.name} L${level}`);
      return acc;
    },{pnlBonus:0,durationBonus:0,acceptanceBonus:0,equityFactor:1,sources:[]});
  }
  function dailyInvestmentIncome() {
    return investmentCatalog.reduce((sum,asset)=>sum+(asset.dailyIncome||0)*investmentLevel(asset.id),0);
  }
  function investmentBookValue() {
    return Object.values(state.investments || {}).reduce((sum,record)=>sum+(record.totalSpent||0)*.88,0);
  }
  function startInvestment(id) {
    const asset=investmentDefinition(id); if (!asset) return;
    const record=investmentRecord(id);
    if (record.buildingTo) return showToast('Questo asset è già in costruzione.');
    if (record.level >= asset.maxLevel) return showToast('Asset già al livello massimo.');
    if (!investmentUnlocked(asset)) return showToast(`Servono reputazione ${asset.minReputation} e ${asset.minDeals} deal completati.`);
    if (activeConstructionCount() >= builderSlots()) return showToast('Tutti i project team sono occupati. Attendi il completamento di un upgrade.');
    const target=record.level+1, cost=investmentCost(asset,target), days=investmentBuildDays(asset,target);
    if (state.cash < cost) return showToast('Liquidità insufficiente per questo investimento.');
    state.cash -= cost;
    state.investments[id]={...record,buildingTo:target,daysRemaining:days,totalSpent:(record.totalSpent||0)+cost};
    state.constructionQueue=state.constructionQueue||[];
    if (!state.constructionQueue.includes(id)) state.constructionQueue.push(id);
    activeLeftTab='empire'; selected={type:'investment',id}; focusOnHub(asset.hub); saveState(); renderAll();
    showToast(`${asset.name}: costruzione livello ${target} avviata (${days} giorni).`);
  }
  function processInvestmentDay() {
    let income=dailyInvestmentIncome();
    if (income>0) { state.cash += income; state.assetIncome=(state.assetIncome||0)+income; }
    Object.entries(state.investments||{}).forEach(([id,record])=>{
      if (!record.buildingTo || record.daysRemaining<=0) return;
      record.daysRemaining-=1;
      if (record.daysRemaining<=0) {
        record.level=record.buildingTo; record.buildingTo=null; record.daysRemaining=0;
        state.constructionQueue=(state.constructionQueue||[]).filter(item=>item!==id);
        const asset=investmentDefinition(id);
        state.reputation=clamp(state.reputation+1,0,100);
        state.worldEventFeed.unshift({type:'investment',title:`${asset.name} upgraded`,date:state.date,description:`Asset operativo al livello ${record.level}. Nuovi vantaggi industriali attivi.`});
      }
    });
  }
  function initializeCounterparties() {
    state.counterparties = state.counterparties || {};
    counterpartyCatalog.forEach(party => {
      state.counterparties[party.id] = {
        relationship: 50,
        deals: 0,
        disputes: 0,
        ...state.counterparties[party.id]
      };
    });
  }
  function getCounterparty(id) { return counterpartyCatalog.find(p => p.id === id); }
  function getCounterpartyState(id) { return state.counterparties[id] || { relationship: 50, deals: 0, disputes: 0 }; }
  function partiesForOpportunity(opp) { return opportunityParties[opp.id] || {}; }
  function activeEventDefinition(active) { return globalEventCatalog.find(event => event.id === active.id); }
  function activeCrisisDefinitions() { return (state.activeGlobalEvents || []).map(active => ({ ...activeEventDefinition(active), ...active })).filter(Boolean); }
  function effectiveCreditLimit() {
    const penalty = activeCrisisDefinitions().reduce((sum, event) => sum + (event.creditPenalty || 0), 0);
    return Math.max(1_000_000, state.creditLimit - penalty);
  }
  function difficultySettings() {
    if (state.difficulty === 'guided') return { acceptance: 7, marginRate: .04, eventLoss: .82, emergencyRate: .009, riskPenalty: -6 };
    if (state.difficulty === 'expert') return { acceptance: -6, marginRate: .075, eventLoss: 1.22, emergencyRate: .025, riskPenalty: 8 };
    return { acceptance: 0, marginRate: .055, eventLoss: 1, emergencyRate: .016, riskPenalty: 0 };
  }
  function unitMultiplierForOpportunity(opp) { return opp?.priceKey === 'crude' ? 7.45 : 1; }
  function physicalNotional(opp, quantity = null, capital = null) {
    const q = quantity ?? liveOffer(opp).quantity ?? opp.quantity;
    const market = marketPriceForOpportunity(opp) * q * unitMultiplierForOpportunity(opp);
    return Math.max(market, (capital || 0) * .92);
  }
  function fxExposureShare(opp) {
    if (['brescia','genova','rotterdam'].includes(opp.destination) && !['tallinn','rotterdam'].includes(opp.origin)) return .16;
    if (opp.destination === 'singapore' || opp.destination === 'shanghai') return .04;
    return .08;
  }
  function financingSelection(opp) { return selectedFinancingStrategies[opp.id] || 'revolver'; }
  function insuranceSelection(opp) { return selectedInsuranceStrategies[opp.id] || 'basic'; }
  function inspectionSelection(opp) { return selectedInspectionStrategies[opp.id] || 'standard'; }
  function financingAvailable(id) {
    const profile = financingProfiles[id];
    return Boolean(profile && (!profile.requiresStaff || hasStaff(profile.requiresStaff)));
  }
  function initialMarginFor(opp, hedgeRatio, quantity, capital = null) {
    return Math.round(physicalNotional(opp, quantity, capital) * clamp(hedgeRatio / 100, 0, 1.1) * difficultySettings().marginRate);
  }
  function structureForOpportunity(opp) {
    const financingId = financingSelection(opp);
    const financing = financingProfiles[financingId] || financingProfiles.revolver;
    const insuranceId = insuranceSelection(opp);
    const insurance = insuranceProfiles[insuranceId] || insuranceProfiles.basic;
    const inspectionId = inspectionSelection(opp);
    const inspection = inspectionProfiles[inspectionId] || inspectionProfiles.standard;
    const fxHedgeRatio = Number(selectedFxHedgeRatios[opp.id] ?? 80);
    return { financingId, financing, insuranceId, insurance, inspectionId, inspection, fxHedgeRatio };
  }

  function liveOffer(opp) {
    const cycle = state.marketCycle || 1;
    const qRand = deterministicRandom(`${opp.id}-${cycle}-quantity`);
    const pnlRand = deterministicRandom(`${opp.id}-${cycle}-pnl`);
    const capitalRand = deterministicRandom(`${opp.id}-${cycle}-capital`);
    const durationRand = deterministicRandom(`${opp.id}-${cycle}-duration`);
    const quantity = Math.max(100, Math.round((opp.quantity * (.88 + qRand * .26)) / 25) * 25);
    const quantityFactor = quantity / opp.quantity;
    return {
      quantity,
      basePnl: Math.round(opp.basePnl * (.82 + pnlRand * .38) * quantityFactor),
      capital: Math.round(opp.capital * quantityFactor * (.96 + capitalRand * .08)),
      equity: Math.round(opp.equity * quantityFactor * (.96 + capitalRand * .08)),
      duration: Math.max(12, opp.duration + Math.round((durationRand - .5) * 8)),
      expiresIn: Math.max(0, 7 - (state.marketCycleDay || 0)),
      cycle
    };
  }
  function negotiationFor(oppId) {
    const stored = state.negotiations?.[oppId];
    if (stored && stored.cycle === state.marketCycle) return stored;
    const transient = selectedNegotiationDrafts[oppId];
    if (transient && transient.cycle === state.marketCycle) return transient;
    const draft = { cycle: state.marketCycle, status: 'draft', commercial: 'market', payment: 'delivery', delivery: 'standard', attempts: 0 };
    selectedNegotiationDrafts[oppId] = draft;
    return draft;
  }
  function setNegotiationDraft(oppId, field, value) {
    const current = { ...negotiationFor(oppId), status: 'draft', [field]: value };
    selectedNegotiationDrafts[oppId] = current;
    state.negotiations[oppId] = current;
    saveState();
  }
  function negotiationAcceptance(opp, negotiation = negotiationFor(opp.id)) {
    const parties = partiesForOpportunity(opp);
    const buyer = getCounterparty(parties.buyerId);
    const relationship = getCounterpartyState(parties.buyerId).relationship;
    const commercial = negotiationProfiles.commercial[negotiation.commercial];
    const payment = negotiationProfiles.payment[negotiation.payment];
    const delivery = negotiationProfiles.delivery[negotiation.delivery];
    const financing = financingProfiles[financingSelection(opp)] || financingProfiles.revolver;
    const vertical = investmentAdjustments(opp);
    return clamp(54 + state.reputation * .18 + (relationship - 50) * .45 + (buyer?.credit || 70) * .08 + commercial.acceptance + payment.acceptance + delivery.acceptance + (financing.acceptance || 0) + vertical.acceptanceBonus + difficultySettings().acceptance, 5, 97);
  }
  function crisisAdjustments(opp) {
    return activeCrisisDefinitions().filter(event => event.affects?.(opp)).reduce((acc, event) => {
      acc.duration += event.dealDays || 0;
      acc.pnl += event.dealPnl || 0;
      acc.equityFactor *= event.equityFactor || 1;
      acc.labels.push(event.title);
      return acc;
    }, { duration: 0, pnl: 0, equityFactor: 1, labels: [] });
  }
  function opportunityEconomics(opp, negotiation = negotiationFor(opp.id)) {
    const offer = liveOffer(opp);
    const commercial = negotiationProfiles.commercial[negotiation.commercial] || negotiationProfiles.commercial.market;
    const payment = negotiationProfiles.payment[negotiation.payment] || negotiationProfiles.payment.delivery;
    const delivery = negotiationProfiles.delivery[negotiation.delivery] || negotiationProfiles.delivery.standard;
    const office = opportunityOfficeAdjustments(opp);
    const crisis = crisisAdjustments(opp);
    const vertical = investmentAdjustments(opp);
    const structure = structureForOpportunity(opp);
    const financeStaffFactor = hasStaff('trade-finance-manager') ? .9 : 1;
    const equity = Math.min(offer.capital, Math.round(offer.equity * payment.equityFactor * financeStaffFactor * crisis.equityFactor * structure.financing.equityFactor * vertical.equityFactor));
    const borrowed = Math.max(0, offer.capital - equity);
    const basePnl = offer.basePnl + commercial.pnl + delivery.pnl + office.pnlBonus + crisis.pnl + structure.financing.pnl + structure.insurance.pnl + structure.inspection.pnl + vertical.pnlBonus;
    const estimatedInterest = borrowed * structure.financing.rate * Math.max(10, offer.duration + delivery.duration - office.durationBonus - vertical.durationBonus + crisis.duration) / 360;
    const expectedPnl = basePnl - estimatedInterest;
    return {
      ...offer,
      quantity: offer.quantity,
      capital: offer.capital,
      equity,
      borrowed,
      basePnl,
      estimatedInterest,
      expectedPnl,
      duration: Math.max(10, offer.duration + delivery.duration - office.durationBonus - vertical.durationBonus + crisis.duration),
      acceptance: negotiationAcceptance(opp, negotiation),
      crisisLabels: crisis.labels,
      verticalSources: vertical.sources,
      structure,
      initialMargin: initialMarginFor(opp, Number(selectedHedgeRatios[opp.id] ?? opp.recommendedHedge ?? 100), offer.quantity, offer.capital),
      terms: { commercial: negotiation.commercial, payment: negotiation.payment, delivery: negotiation.delivery }
    };
  }
  function effectiveEquity(opp) { return opportunityEconomics(opp).equity; }
  function effectiveBorrowed(opp) { return opportunityEconomics(opp).borrowed; }
  function charterHireCost(vessel) {
    let factor = hasStaff('freight-charterer') ? .85 : 1;
    if (officeOwned('rotterdam')) factor *= .95;
    return Math.round(vessel.charterCost * factor);
  }
  function opportunityOfficeAdjustments(opp) {
    let durationBonus = 0;
    let pnlBonus = 0;
    if (officeOwned('genova') && (opp.via || []).includes('genova')) { durationBonus += 2; pnlBonus += 4_000; }
    if (officeOwned('singapore') && (opp.origin === 'singapore' || opp.destination === 'singapore')) { durationBonus += 2; pnlBonus += 8_000; }
    return { durationBonus, pnlBonus };
  }
  function openOffice(id) {
    const office = getOffice(id);
    if (!office || officeOwned(id)) return;
    if (!officeUnlocked(office)) return showToast(`Servono reputazione ${office.minReputation} e ${office.minDeals} deal completati.`);
    if (state.cash < office.cost) return showToast('Liquidità insufficiente per aprire questo desk.');
    state.cash -= office.cost;
    state.offices.push(id);
    state.reputation = clamp(state.reputation + 1, 0, 100);
    evaluateMissions();
    saveState(); renderAll(); focusOnHub(office.hub);
    showToast(`${office.name} aperto. Nuove opportunità disponibili.`);
  }
  function hireStaff(id) {
    const member = getStaff(id);
    if (!member || hasStaff(id)) return;
    if (!staffUnlocked(member)) return showToast(`Serve reputazione ${member.minReputation} per assumere questo profilo.`);
    if (state.cash < member.hireCost) return showToast('Liquidità insufficiente per l’assunzione.');
    state.cash -= member.hireCost;
    state.staff.push(id);
    if (id === 'trade-finance-manager') state.creditLimit += 1_000_000;
    state.reputation = clamp(state.reputation + 1, 0, 100);
    evaluateMissions();
    saveState(); renderAll();
    showToast(`${member.role} assunto nel team SHIPPY.`);
  }
  function evaluateMissions() {
    const unlocked = [];
    missionCatalog.forEach(mission => {
      if (state.completedMissions.includes(mission.id) || !mission.achieved(state)) return;
      state.completedMissions.push(mission.id);
      state.cash += mission.cash || 0;
      state.creditLimit += mission.credit || 0;
      state.reputation = clamp(state.reputation + (mission.reputation || 0), 0, 100);
      unlocked.push(mission.title);
    });
    if (unlocked.length) setTimeout(() => showToast(`Missione completata: ${unlocked.join(', ')}.`), 80);
  }

  function saveState() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      // Il gioco resta utilizzabile anche quando il browser blocca lo storage locale.
    }
  }

  function getOpportunity(id) { return opportunities.find(o => o.id === id); }
  function getHub(id) { return hubs.find(h => h.id === id); }
  function getActiveDeal(id) { return state.activeDeals.find(d => d.id === id); }
  function getHistoryDeal(id) { return state.history.find(d => d.id === id); }
  function getSelectedDeal() { return selected.type === 'deal' ? getActiveDeal(selected.id) : null; }
  function getVesselCatalog(id) { return vesselCatalog.find(v => v.id === id); }
  function getFleetAsset(id) { return state.fleetAssets.find(v => v.id === id); }
  function transportClassForOpportunity(opp) {
    const mode = String(opp.transportMode || '').toLowerCase();
    if (mode.includes('ocean') || mode.includes('coaster') || mode.includes('vessel') || mode.includes('ship') || mode.includes('tanker') || mode.includes('carrier') || mode.includes('container') || mode.includes('bulk')) return 'ocean';
    if (mode.includes('barge')) return 'barge';
    return 'land';
  }
  function fleetAssetAvailableFor(asset, opp) {
    const catalog = getVesselCatalog(asset.catalogId);
    return Boolean(catalog && asset.status === 'available' && asset.positionHub === opp.origin && catalog.transportClass === transportClassForOpportunity(opp));
  }
  function availableFleetForOpportunity(opp) { return state.fleetAssets.filter(asset => fleetAssetAvailableFor(asset, opp)); }
  function vesselUnlocked(vessel) { return state.reputation >= vessel.minReputation && state.completedDeals >= vessel.minDeals && (!vessel.requiresOffice || officeOwned(vessel.requiresOffice)); }


  function makeDealOperations(opp, dealId, fleetAsset = null) {
    const asset = logisticsAssets[opp.id] || {
      carrier: 'Northstar Contract Carrier', mode: opp.transportMode, booking: 'Confirmed',
      warehouse: `${getHub(opp.destination).name} Transit Depot`, warehouseHub: opp.destination, storageDays: 2,
      purchaseTerms: 'Indexed purchase contract', salesTerms: 'Indexed sales contract',
      documentSet: ['Commercial invoice', 'Packing list', 'Quality certificate', 'Transport document', 'Insurance certificate', 'Customs release']
    };
    const fleetVessel = fleetAsset ? getVesselCatalog(fleetAsset.catalogId) : null;
    const demurrageRate = transportClassForOpportunity(opp) === 'ocean' ? 9_500 : transportClassForOpportunity(opp) === 'barge' ? 3_800 : 1_800;
    return {
      contractId: `SHP-${String(dealId).slice(-6).toUpperCase()}`,
      purchaseContract: { status: 'Signed', terms: asset.purchaseTerms },
      salesContract: { status: 'Signed', terms: asset.salesTerms },
      transport: {
        carrier: fleetVessel?.name || asset.carrier,
        mode: fleetVessel ? `${fleetVessel.vesselClass} · internal charter` : asset.mode,
        booking: fleetVessel ? 'Fleet allocated' : asset.booking,
        status: 'Booked', upgraded: false,
        charterType: fleetVessel ? 'Time-charter allocation' : 'Spot / voyage booking',
        fleetAssetId: fleetAsset?.id || null,
        laycan: `D+3 / D+7`, laytimeAllowed: transportClassForOpportunity(opp) === 'land' ? 1 : 2,
        laytimeUsed: 0, demurrageRate: fleetVessel ? Math.round(demurrageRate * .8) : demurrageRate,
        demurrageAccrued: 0, freightIndexAtBooking: state.freightIndex
      },
      storage: { name: asset.warehouse, hubId: asset.warehouseHub, reserved: true, active: false, days: asset.storageDays, emergency: false },
      documents: asset.documentSet.map((name, index) => ({ name, status: index === 5 ? 'ready' : 'pending' })),
      expedited: false
    };
  }

  function hydrateDealOperations(deal) {
    const opp = getOpportunity(deal.opportunityId);
    if (!opp) return deal;
    const parties = partiesForOpportunity(opp);
    deal.quantity = deal.quantity || opp.quantity;
    deal.capital = deal.capital || opp.capital;
    deal.supplierId = deal.supplierId || parties.supplierId;
    deal.buyerId = deal.buyerId || parties.buyerId;
    deal.globalEventImpacts = deal.globalEventImpacts || [];
    if (!deal.operations) return { ...deal, operations: makeDealOperations(opp, deal.id || `legacy-${Date.now()}`) };
    const transport = deal.operations.transport || {};
    deal.operations.transport = {
      charterType: 'Spot / voyage booking', fleetAssetId: deal.fleetAssetId || null,
      laycan: 'D+3 / D+7', laytimeAllowed: transportClassForOpportunity(opp) === 'land' ? 1 : 2,
      laytimeUsed: 0, demurrageRate: transportClassForOpportunity(opp) === 'ocean' ? 9_500 : 2_500,
      demurrageAccrued: 0, freightIndexAtBooking: 100,
      ...transport
    };
    return deal;
  }

  function updateDealOperations(deal) {
    deal = hydrateDealOperations(deal);
    const p = computeDealProgress(deal);
    const ops = deal.operations;
    ops.transport.status = p < .12 ? 'Booked' : p < .2 ? 'Loading' : p < .78 ? 'In transit' : p < .93 ? 'At terminal' : 'Final delivery';
    ops.storage.active = p >= .78 && p < .93;
    const readyThresholds = [.08, .1, .2, .24, .28, .04, .79, .22];
    ops.documents.forEach((doc, i) => {
      if (doc.status === 'blocked') return;
      if (p >= (readyThresholds[i] ?? .25)) doc.status = 'ready';
      else if (doc.status !== 'ready') doc.status = 'pending';
    });
    const opp = getOpportunity(deal.opportunityId);
    if (opp.id === 'baltic-copper' && deal.pendingDecision) {
      const quality = ops.documents.find(d => d.name === 'Quality certificate');
      if (quality) quality.status = 'blocked';
    }
    if ((opp.id === 'meridian-copper' || opp.id === 'asia-aluminium') && deal.pendingDecision) {
      const lc = ops.documents.find(d => d.name === 'LC compliance');
      if (lc) lc.status = 'blocked';
    }
    return deal;
  }

  function operationsReadiness(deal) {
    updateDealOperations(deal);
    const docs = deal.operations.documents;
    const ready = docs.filter(d => d.status === 'ready').length;
    const docScore = docs.length ? ready / docs.length : 1;
    const contractScore = deal.operations.purchaseContract.status === 'Signed' && deal.operations.salesContract.status === 'Signed' ? 1 : .5;
    const transportScore = deal.operations.transport.status === 'Booked' ? .7 : 1;
    const inspectionBonus = inspectionProfiles[deal.inspectionStrategy || 'standard']?.readiness || 0;
    return clamp((docScore * .58 + contractScore * .22 + transportScore * .2) * 100 + (hasStaff('operations-coordinator') ? 5 : 0) + inspectionBonus, 0, 100);
  }

  function expediteDocuments(dealId) {
    const deal = getActiveDeal(dealId);
    if (!deal || deal.operations?.expedited) return;
    const cost = hasStaff('operations-coordinator') ? 2_700 : 4_500;
    deal.pnlAdjustments -= cost;
    deal.operations.expedited = true;
    deal.operations.documents.forEach(doc => { if (doc.status !== 'blocked') doc.status = 'ready'; });
    saveState();
    renderAll();
    showToast(`Documenti accelerati. Costo operativo ${money(cost)}.`);
  }

  function upgradeTransport(dealId) {
    const deal = getActiveDeal(dealId);
    if (!deal || deal.operations?.transport?.upgraded || computeDealProgress(deal) > .7) return;
    const cost = 14_000;
    deal.pnlAdjustments -= cost;
    deal.duration = Math.max(deal.elapsed + 2, deal.duration - 4);
    deal.operations.transport.upgraded = true;
    deal.operations.transport.booking = 'Priority confirmed';
    saveState();
    renderAll();
    showToast(`Trasporto prioritario confermato. ETA ridotta di 4 giorni.`);
  }

  function bookEmergencyStorage(dealId) {
    const deal = getActiveDeal(dealId);
    if (!deal || deal.operations?.storage?.emergency) return;
    const cost = 8_000;
    deal.pnlAdjustments -= cost;
    deal.operations.storage.emergency = true;
    deal.operations.storage.reserved = true;
    deal.operations.storage.days += 5;
    saveState();
    renderAll();
    showToast(`Storage di emergenza prenotato per ${money(cost)}.`);
  }


  function charterVessel(catalogId) {
    const vessel = getVesselCatalog(catalogId);
    if (!vessel || !vesselUnlocked(vessel)) return showToast('Questo asset non è ancora disponibile per il tuo desk.');
    if (state.fleetAssets.some(asset => asset.catalogId === catalogId)) return showToast('Hai già questo asset in charter.');
    const hireCost = charterHireCost(vessel);
    if (state.cash < hireCost) return showToast('Liquidità insufficiente per il charter.');
    const asset = {
      id: `vessel-${catalogId}-${state.sequence++}`, catalogId, name: vessel.name,
      status: 'available', assignedDealId: null, positionHub: vessel.homeHub,
      daysRemaining: vessel.charterDays, charterDays: vessel.charterDays, charterCost: hireCost,
      acquired: state.date
    };
    state.cash -= hireCost;
    state.fleetAssets.push(asset);
    saveState();
    activeLeftTab = 'fleet';
    selectVessel(asset.id);
    renderAll();
    showToast(`${vessel.name} noleggiata per ${vessel.charterDays} giorni.`);
  }

  function releaseVessel(assetId) {
    const asset = getFleetAsset(assetId);
    if (!asset || asset.status === 'assigned') return showToast('Non puoi chiudere un charter mentre la nave è assegnata a un deal.');
    const refund = Math.round(asset.charterCost * (asset.daysRemaining / asset.charterDays) * .2);
    state.cash += refund;
    state.fleetAssets = state.fleetAssets.filter(v => v.id !== assetId);
    selected = { type: 'hub', id: 'geneva' };
    saveState();
    renderAll();
    showToast(`Charter chiuso. Recuperati ${money(refund)}.`);
  }

  function advanceFleetDay() {
    const expired = [];
    state.fleetAssets.forEach(asset => {
      asset.daysRemaining = Math.max(0, asset.daysRemaining - 1);
      if (asset.daysRemaining === 0 && asset.status === 'assigned') {
        const vessel = getVesselCatalog(asset.catalogId);
        const deal = getActiveDeal(asset.assignedDealId);
        const extensionCost = Math.round((vessel.charterCost / vessel.charterDays) * 1.35);
        if (deal) deal.pnlAdjustments -= extensionCost;
        asset.extensionCost = (asset.extensionCost || 0) + extensionCost;
      }
      if (asset.daysRemaining === 0 && asset.status !== 'assigned') expired.push(asset.id);
    });
    if (expired.length) state.fleetAssets = state.fleetAssets.filter(asset => !expired.includes(asset.id));
  }

  function accrueDailyShippingCosts(deal) {
    updateDealOperations(deal);
    const shipping = deal.operations.transport;
    if (!deal.operations.storage.active) return;
    shipping.laytimeUsed += 1;
    if (shipping.laytimeUsed > shipping.laytimeAllowed) {
      shipping.demurrageAccrued += shipping.demurrageRate;
      deal.pnlAdjustments -= shipping.demurrageRate;
    }
  }

  function currentDate() { return new Date(state.date); }

  function deterministicRandom(seedText) {
    let hash = 2166136261;
    for (let i = 0; i < seedText.length; i++) {
      hash ^= seedText.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return ((hash >>> 0) % 10000) / 10000;
  }

  function refreshOpportunityMarket() {
    state.marketCycle = (state.marketCycle || 1) + 1;
    state.marketCycleDay = 0;
    state.negotiations = {};
    opportunities.forEach(opp => { selectedNegotiationDrafts[opp.id] = null; });
    state.worldEventFeed.unshift({
      type: 'market', title: 'Opportunity book refreshed', date: state.date,
      description: 'Nuove quantità, margini e finestre di consegna sono ora disponibili sul mercato.'
    });
    state.worldEventFeed = state.worldEventFeed.slice(0, 14);
    showToast('Il mercato delle opportunità è stato aggiornato.');
  }

  function triggerGlobalEvent() {
    const activeIds = new Set((state.activeGlobalEvents || []).map(event => event.id));
    const available = globalEventCatalog.filter(event => !activeIds.has(event.id));
    if (!available.length) return;
    const pick = Math.floor(deterministicRandom(`${state.date}-world-${state.marketCycle}`) * available.length);
    const definition = available[pick];
    const active = { id: definition.id, started: state.date, remaining: definition.duration };
    state.activeGlobalEvents.push(active);
    state.worldEventFeed.unshift({
      type: 'crisis', id: definition.id, title: definition.title, date: state.date,
      severity: definition.severity, description: definition.description
    });
    state.worldEventFeed = state.worldEventFeed.slice(0, 14);
    if (definition.freightShock) state.freightIndex = clamp(state.freightIndex + definition.freightShock, 76, 155);
    state.activeDeals.forEach(deal => {
      const opp = getOpportunity(deal.opportunityId);
      if (!definition.affects?.(opp)) return;
      deal.globalEventImpacts = deal.globalEventImpacts || [];
      if (deal.globalEventImpacts.includes(definition.id)) return;
      deal.globalEventImpacts.push(definition.id);
      deal.duration += definition.dealDays || 0;
      deal.pnlAdjustments += definition.dealPnl || 0;
      deal.eventResult = `${definition.title}: impatto incorporato nella rotta e nel P&L.`;
    });
    showToast(`Global event: ${definition.title}`);
  }

  function advanceWorldState() {
    state.dayIndex = (state.dayIndex || 0) + 1;
    state.marketCycleDay = (state.marketCycleDay || 0) + 1;
    const expired = [];
    state.activeGlobalEvents.forEach(event => {
      event.remaining = Math.max(0, event.remaining - 1);
      if (event.remaining === 0) expired.push(event.id);
    });
    if (expired.length) {
      expired.forEach(id => {
        const definition = globalEventCatalog.find(event => event.id === id);
        state.worldEventFeed.unshift({ type: 'resolved', id, title: `${definition?.title || id} resolved`, date: state.date, description: 'Le condizioni operative tornano gradualmente alla normalità.' });
      });
      state.activeGlobalEvents = state.activeGlobalEvents.filter(event => !expired.includes(event.id));
    }
    if (state.marketCycleDay >= 7) refreshOpportunityMarket();
    if (state.dayIndex >= (state.nextGlobalEventDay || 6)) {
      triggerGlobalEvent();
      state.nextGlobalEventDay = state.dayIndex + 8 + Math.floor(deterministicRandom(`${state.date}-next-world`) * 6);
    }
  }

  function computeDealProgress(deal) {
    return clamp(deal.elapsed / deal.duration, 0, 1);
  }

  function marketPriceForOpportunity(opp) {
    if (opp.priceKey === 'aluminium') return state.aluminiumPrice;
    if (opp.priceKey === 'urea') return state.ureaPrice;
    if (opp.priceKey === 'crude') return state.crudePrice;
    if (opp.priceKey === 'wheat') return state.wheatPrice;
    if (opp.priceKey === 'ironore') return state.ironorePrice;
    if (opp.priceKey === 'coffee') return state.coffeePrice;
    return state.copperPrice;
  }

  function computeMarketImpact(deal) {
    const opp = getOpportunity(deal.opportunityId);
    const current = marketPriceForOpportunity(opp);
    const entry = deal.entryMarketPrice || current;
    const unhedgedShare = clamp(1 - (deal.hedgeRatio || 0) / 100, -0.1, 1);
    // Il desk ha fissato il prezzo di vendita: un aumento della commodity danneggia la quota non coperta.
    return -(current - entry) * (deal.quantity || opp.quantity) * unitMultiplierForOpportunity(opp) * unhedgedShare;
  }

  function computeFxImpact(deal) {
    const opp = getOpportunity(deal.opportunityId);
    const entry = deal.entryFx || state.eurusd;
    const unhedged = Math.max(0, 1 - (deal.fxHedgeRatio || 0) / 100);
    const exposure = physicalNotional(opp, deal.quantity || opp.quantity, deal.capital) * fxExposureShare(opp) * unhedged;
    return entry ? ((state.eurusd - entry) / entry) * exposure : 0;
  }

  function currentMarginRequirement(deal) {
    const opp = getOpportunity(deal.opportunityId);
    const initial = initialMarginFor(opp, deal.hedgeRatio || 0, deal.quantity || opp.quantity, deal.capital);
    const adverseMove = Math.max(0, marketPriceForOpportunity(opp) - (deal.entryMarketPrice || marketPriceForOpportunity(opp)));
    const variation = adverseMove * (deal.quantity || opp.quantity) * unitMultiplierForOpportunity(opp) * clamp((deal.hedgeRatio || 0) / 100, 0, 1.1);
    return Math.round(initial + variation);
  }

  function updateMarginLiquidity(deal) {
    const required = currentMarginRequirement(deal);
    const current = deal.marginCollateral || 0;
    const delta = required - current;
    if (Math.abs(delta) < 1) return;
    if (delta < 0) {
      const release = Math.min(current, -delta);
      deal.marginCollateral -= release;
      state.cash += release;
      return;
    }
    const fromCash = Math.min(Math.max(0, state.cash), delta);
    state.cash -= fromCash;
    deal.marginCollateral += fromCash;
    const shortfall = delta - fromCash;
    if (shortfall <= 0) return;
    const availableCredit = Math.max(0, effectiveCreditLimit() - portfolioStats().creditUsed);
    const bridge = Math.min(shortfall, availableCredit);
    if (bridge > 0) {
      const fee = Math.max(2_500, Math.round(bridge * difficultySettings().emergencyRate));
      deal.borrowed += bridge;
      deal.marginCollateral += bridge;
      deal.pnlAdjustments -= fee;
      deal.marginCalls = (deal.marginCalls || 0) + 1;
      state.marginCalls = (state.marginCalls || 0) + 1;
      state.emergencyFundingCost = (state.emergencyFundingCost || 0) + fee;
      state.worldEventFeed.unshift({ type: 'margin', title: 'Emergency margin funding', date: state.date, description: `${getOpportunity(deal.opportunityId).title}: ${money(bridge)} bridge liquidity, fee ${money(fee)}.` });
      state.worldEventFeed = state.worldEventFeed.slice(0,14);
    }
    const uncovered = shortfall - bridge;
    if (uncovered > 0) {
      const opp = getOpportunity(deal.opportunityId);
      const notional = physicalNotional(opp, deal.quantity || opp.quantity, deal.capital);
      const hedgeReduction = Math.ceil((uncovered / Math.max(1, notional * difficultySettings().marginRate)) * 100);
      deal.hedgeRatio = clamp((deal.hedgeRatio || 0) - hedgeReduction, 0, 100);
      deal.reputationAdjustments -= 2;
      deal.eventResult = `Margin shortfall: hedge ridotto al ${deal.hedgeRatio}% per liberare collateral.`;
    }
  }

  function accrueDailyFinancing(deal) {
    const rate = deal.financingRate ?? financingProfiles[deal.financingStrategy || 'revolver']?.rate ?? .075;
    const interest = (deal.borrowed || 0) * rate / 360;
    deal.financingAccrued = (deal.financingAccrued || 0) + interest;
    state.totalInterestPaid = (state.totalInterestPaid || 0) + interest;
  }

  function dealPhase(deal) {
    const p = computeDealProgress(deal);
    if (p < .15) return { key: 'booked', label: 'Booked', location: getHub(getOpportunity(deal.opportunityId).origin).name };
    if (p < .78) return { key: 'transit', label: 'In transit', location: 'In transito' };
    if (p < .93) {
      const opp = getOpportunity(deal.opportunityId);
      const port = opp.via?.length ? getHub(opp.via.at(-1)).name : getHub(opp.destination).name;
      return { key: 'port', label: 'Port / Warehouse', location: port };
    }
    return { key: 'delivery', label: 'Final delivery', location: getHub(getOpportunity(deal.opportunityId).destination).name };
  }

  function computeUnrealizedPnl(deal) {
    const progress = computeDealProgress(deal);
    const operatingPnl = (deal.basePnl + deal.pnlAdjustments - (deal.financingAccrued || 0)) * Math.min(1, progress * .86);
    return operatingPnl + computeMarketImpact(deal) + computeFxImpact(deal);
  }

  function riskStats() {
    const stats = portfolioStats();
    const grossByCommodity = {};
    let netFlatExposure = 0;
    let netFxExposure = 0;
    let totalCapital = 0;
    let largestCapital = 0;
    state.activeDeals.forEach(deal => {
      const opp = getOpportunity(deal.opportunityId);
      const value = physicalNotional(opp, deal.quantity || opp.quantity, deal.capital);
      grossByCommodity[opp.commodity] = (grossByCommodity[opp.commodity] || 0) + value;
      netFlatExposure += value * Math.max(0, 1 - (deal.hedgeRatio || 0) / 100);
      netFxExposure += value * fxExposureShare(opp) * Math.max(0, 1 - (deal.fxHedgeRatio || 0) / 100);
      totalCapital += deal.capital || opp.capital;
      largestCapital = Math.max(largestCapital, deal.capital || opp.capital);
    });
    const creditUtilization = effectiveCreditLimit() ? stats.creditUsed / effectiveCreditLimit() : 0;
    const concentration = totalCapital ? largestCapital / totalCapital : 0;
    const marginRequirement = state.activeDeals.reduce((sum,deal)=>sum+currentMarginRequirement(deal),0);
    const liquidityReserve = Math.max(150_000, netFlatExposure * .08 + netFxExposure * .06 + stats.creditUsed * .035 + marginRequirement * .12);
    const liquidityCoverage = liquidityReserve ? state.cash / liquidityReserve : 10;
    const riskScore = clamp(
      creditUtilization * 30 + concentration * 20 + Math.min(1, netFlatExposure / 1_500_000) * 26 + Math.min(1, netFxExposure / 800_000) * 12 + (liquidityCoverage < 1 ? 18 : liquidityCoverage < 1.5 ? 8 : 0),
      0, 100
    ) - (hasStaff('risk-analyst') ? 8 : 0) + difficultySettings().riskPenalty;
    const stressLoss = netFlatExposure * .08 + netFxExposure * .05 + stats.creditUsed * .012;
    return { ...stats, grossByCommodity, netFlatExposure, netFxExposure, marginRequirement, stressLoss, creditUtilization, concentration, liquidityReserve, liquidityCoverage, riskScore: clamp(riskScore, 0, 100) };
  }

  function portfolioStats() {
    const invested = state.activeDeals.reduce((sum, d) => sum + d.equity, 0);
    const marginCollateral = state.activeDeals.reduce((sum, d) => sum + (d.marginCollateral || 0), 0);
    const activePnl = state.activeDeals.reduce((sum, d) => sum + computeUnrealizedPnl(d), 0);
    const creditUsed = state.activeDeals.reduce((sum, d) => sum + d.borrowed, 0);
    const assetValue = investmentBookValue();
    const nav = state.cash + invested + marginCollateral + activePnl + assetValue;
    return { invested, marginCollateral, activePnl, creditUsed, creditAvailable: effectiveCreditLimit() - creditUsed, assetValue, nav };
  }

  function isOpportunityUnlocked(opp) {
    return opp.unlock(state);
  }

  function rankFromState() {
    if (officeOwned('singapore') && state.reputation >= 82 && state.completedDeals >= 8) return 'Global Desk Head';
    if (state.reputation >= 80 && state.completedDeals >= 8) return 'Desk Head';
    if (state.reputation >= 68 && state.completedDeals >= 4) return 'Senior Trader';
    if (state.reputation >= 58 && state.completedDeals >= 2) return 'Trader';
    return 'Junior Trader';
  }


  const leaderboardRivals = [
    ['helios','Helios Commodities','Zurich','CH',5750,980000,95,93],
    ['atlas','Atlas Merchant Group','London','GB',5240,860000,92,90],
    ['meridian-desk','Meridian Global Desk','Dubai','AE',4810,740000,87,82],
    ['northsea','NorthSea Trading','Rotterdam','NL',4460,690000,94,91],
    ['pacific','Pacific Bulk Partners','Singapore','SG',4120,610000,88,89],
    ['andean','Andean Resources','Santiago','CL',3860,540000,91,84],
    ['rhine','Rhine Metals Desk','Geneva','CH',3520,470000,89,94],
    ['stratus','Stratus Energy','Houston','US',3240,430000,83,78],
    ['baltic','Baltic Merchant','Tallinn','EE',3010,365000,93,92],
    ['orion','Orion Agri Trade','Geneva','CH',2760,320000,86,88],
    ['cobalt','Cobalt Bridge','Lugano','CH',2520,275000,90,86],
    ['saffron','Saffron Commodities','Dubai','AE',2310,230000,78,81],
    ['harbor','Harborline Trading','Genoa','IT',2120,205000,91,89],
    ['delta','Delta Physical Markets','Amsterdam','NL',1940,170000,84,87],
    ['forge','Forge Materials','Milan','IT',1780,145000,88,90],
    ['vertex','Vertex Commodity Desk','Paris','FR',1630,118000,82,85],
    ['mariner','Mariner Trade House','Hamburg','DE',1490,97000,87,83],
    ['alpine','Alpine Flow Trading','Geneva','CH',1360,78000,90,91],
    ['redwood','Redwood Merchant','Chicago','US',1240,61000,80,79],
    ['bluewater','Bluewater Commodities','Athens','GR',1120,43000,85,82],
    ['nova','Nova Materials Desk','Vienna','AT',1010,27000,86,88],
    ['frontier','Frontier Trade Co.','Madrid','ES',910,12000,79,84],
    ['oak','Oakline Physical','Dublin','IE',820,-4000,83,86],
    ['ember','Ember Trading Desk','Prague','CZ',730,-18000,76,80]
  ].map(([id,name,city,country,overall,pnl,operations,risk])=>({id,name,city,country,overall,pnl,operations,risk}));

  function averageOperationalScore() {
    if (!state.history.length) return 76;
    return state.history.reduce((sum,item)=>sum+(item.operationalReadiness ?? 75),0)/state.history.length;
  }

  function riskDisciplineScore() {
    const history = state.history || [];
    const avgHedge = history.length ? history.reduce((sum,item)=>sum+(item.hedgeRatio||0),0)/history.length : 72;
    const profitable = history.length ? history.filter(item=>item.pnl>=0).length/history.length : .5;
    const risk = riskStats();
    return clamp(42 + avgHedge*.34 + profitable*18 - (state.marginCalls||0)*4 - Math.max(0,risk.riskScore-55)*.35, 0, 100);
  }

  function leaderboardScore() {
    const stats = portfolioStats();
    const wealthGain = stats.nav - 1_000_000;
    const score = 500
      + wealthGain / 3000
      + state.reputation * 7
      + state.completedDeals * 55
      + averageOperationalScore() * 2
      + riskDisciplineScore() * 1.5
      + (state.academyScore||0) * .15
      + (state.completedMissions?.length||0) * 20
      + Math.max(0,(state.offices?.length||1)-1) * 35
      - (state.marginCalls||0) * 45
      - (state.emergencyFundingCost||0) / 5000;
    return Math.max(0,Math.round(score));
  }

  function leaderboardLeague(score=leaderboardScore()) {
    if (score >= 6000) return {name:'Master Merchant',className:'master',next:null};
    if (score >= 4500) return {name:'Elite',className:'elite',next:6000};
    if (score >= 3400) return {name:'Platinum',className:'platinum',next:4500};
    if (score >= 2500) return {name:'Gold',className:'gold',next:3400};
    if (score >= 1800) return {name:'Silver',className:'silver',next:2500};
    if (score >= 1200) return {name:'Bronze',className:'bronze',next:1800};
    return {name:'Rookie',className:'rookie',next:1200};
  }

  function seasonNumber(dayIndex=state.dayIndex||0) { return Math.floor(dayIndex/90)+1; }
  function seasonDay(dayIndex=state.dayIndex||0) { return dayIndex%90+1; }

  function rivalRows(mode='overall') {
    const season = seasonNumber();
    return leaderboardRivals.map((rival,index)=>{
      const noise = deterministicRandom(`${rival.id}-${season}-${state.marketCycle}`)-.5;
      const progression = Math.min(1.35,1+(state.dayIndex||0)*.0014);
      return {
        ...rival,
        isPlayer:false,
        overall:Math.round((rival.overall*progression)+(noise*240)+(season-1)*90),
        pnl:Math.round((rival.pnl*progression)+(noise*90000)+(season-1)*35000),
        operations:clamp(rival.operations+noise*5,55,99.5),
        risk:clamp(rival.risk+noise*6,50,99.5)
      };
    });
  }

  function playerLeaderboardRow() {
    return {
      id:'player',
      name:state.companyName || 'SHIPPY Trading',
      trader:state.profileName || 'Giorgio Bonetta',
      city:'Geneva',country:'YOU',isPlayer:true,
      overall:leaderboardScore(),
      pnl:Math.round(state.realizedPnl||0),
      operations:averageOperationalScore(),
      risk:riskDisciplineScore()
    };
  }

  function leaderboardRows(mode='overall') {
    return [...rivalRows(mode),playerLeaderboardRow()].sort((a,b)=>b[mode]-a[mode]).map((row,index)=>({...row,position:index+1}));
  }

  function leaderboardPosition(mode='overall') {
    return leaderboardRows(mode).find(row=>row.isPlayer)?.position || leaderboardRivals.length+1;
  }

  function formatLeaderboardMetric(row,mode) {
    if (mode==='pnl') return money(row.pnl,true);
    if (mode==='operations'||mode==='risk') return `${row[mode].toFixed(1)}%`;
    return Math.round(row.overall).toLocaleString('en-US');
  }

  function archiveSeasonIfNeeded(previousDayIndex) {
    const previousSeason=seasonNumber(previousDayIndex);
    const newSeason=seasonNumber(state.dayIndex||0);
    if (newSeason===previousSeason) return;
    state.leaderboardSnapshots=state.leaderboardSnapshots||[];
    state.leaderboardSnapshots.unshift({
      season:previousSeason,
      score:leaderboardScore(),
      position:leaderboardPosition('overall'),
      league:leaderboardLeague().name,
      pnl:state.realizedPnl||0,
      completedDeals:state.completedDeals||0,
      closedAt:state.date
    });
    state.leaderboardSnapshots=state.leaderboardSnapshots.slice(0,8);
  }

  function resizeCanvas() {
    canvasRect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(canvasRect.width * dpr));
    canvas.height = Math.max(1, Math.round(canvasRect.height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (earthRenderer) {
      earthRenderer.setPixelRatio(dpr);
      earthRenderer.setSize(Math.max(1, canvasRect.width), Math.max(1, canvasRect.height), false);
      syncEarthProjection();
    }
  }

  const toVector = (lon, lat) => {
    const phi = lat * deg;
    const lambda = lon * deg;
    return [Math.cos(phi) * Math.cos(lambda), Math.cos(phi) * Math.sin(lambda), Math.sin(phi)];
  };

  function vectorToLonLat(v) {
    const [x, y, z] = v;
    return { lon: Math.atan2(y, x) / deg, lat: Math.asin(clamp(z, -1, 1)) / deg };
  }

  function slerp(a, b, t) {
    const dot = clamp(a[0]*b[0] + a[1]*b[1] + a[2]*b[2], -1, 1);
    const omega = Math.acos(dot);
    if (omega < 1e-5) return a;
    const so = Math.sin(omega);
    const s1 = Math.sin((1-t)*omega) / so;
    const s2 = Math.sin(t*omega) / so;
    return [a[0]*s1+b[0]*s2, a[1]*s1+b[1]*s2, a[2]*s1+b[2]*s2];
  }

  function project(lon, lat, lift = 0) {
    if (!canvasRect) return null;
    const width = canvasRect.width;
    const height = canvasRect.height;
    const radius = Math.min(width, height) * .365 * view.zoom;
    const cx = width * .5;
    const cy = height * .5;
    if (earthCamera) {
      const point = geoVector3(lon, lat, 1 + lift);
      const visible = point.clone().normalize().dot(earthCamera.position.clone().normalize());
      earthProjectionVector.copy(point).project(earthCamera);
      return {
        x: (earthProjectionVector.x * .5 + .5) * width,
        y: (-earthProjectionVector.y * .5 + .5) * height,
        z: visible,
        radius, cx, cy
      };
    }
    const phi = lat * deg;
    const lambda = lon * deg;
    const phi0 = view.lat * deg;
    const lambda0 = view.lon * deg;
    const dl = lambda - lambda0;
    const x = Math.cos(phi) * Math.sin(dl);
    const y = Math.cos(phi0) * Math.sin(phi) - Math.sin(phi0) * Math.cos(phi) * Math.cos(dl);
    const z = Math.sin(phi0) * Math.sin(phi) + Math.cos(phi0) * Math.cos(phi) * Math.cos(dl);
    return { x: cx + radius * x * (1 + lift), y: cy - radius * y * (1 + lift), z, radius, cx, cy };
  }

  function drawGlobe() {
    if (!canvasRect) return;
    const width = canvasRect.width;
    const height = canvasRect.height;
    ctx.clearRect(0, 0, width, height);
    markerHitboxes = [];
    shipHitboxes = [];
    fleetHitboxes = [];
    investmentHitboxes = [];

    const radius = Math.min(width, height) * .365 * view.zoom;
    const cx = width * .5;
    const cy = height * .5;

    if (!earthRenderer) {
      const ocean = ctx.createRadialGradient(cx - radius * .28, cy - radius * .34, radius * .05, cx, cy, radius);
      ocean.addColorStop(0, '#1d5068');
      ocean.addColorStop(.55, '#0b2637');
      ocean.addColorStop(1, '#04111c');
      ctx.fillStyle = ocean;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();
      drawGraticule();
      drawContinents();
      ctx.restore();
    }

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.045, 0, Math.PI * 2);
    ctx.clip();
    drawRoutes();
    drawHubs();
    drawInvestmentMarkers();
    drawShipments();
    drawFleetAssets();
    ctx.restore();

    ctx.save();
    const edge = ctx.createRadialGradient(cx, cy, radius * .91, cx, cy, radius * 1.13);
    edge.addColorStop(0, 'rgba(71,177,255,0)');
    edge.addColorStop(.76, 'rgba(71,177,255,.06)');
    edge.addColorStop(1, 'rgba(71,177,255,0)');
    ctx.fillStyle = edge;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.14, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(111, 191, 255, .15)';
    ctx.lineWidth = .8;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.02, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  function drawGraticule() {
    ctx.save();
    ctx.strokeStyle = 'rgba(145, 221, 240, .075)';
    ctx.lineWidth = .65;
    for (let lat = -60; lat <= 60; lat += 30) drawGeoLine(Array.from({length: 121}, (_,i) => [-180 + i*3, lat]));
    for (let lon = -180; lon < 180; lon += 30) drawGeoLine(Array.from({length: 61}, (_,i) => [lon, -90 + i*3]));
    ctx.restore();
  }

  function drawGeoLine(points) {
    let open = false;
    ctx.beginPath();
    for (const [lon, lat] of points) {
      const p = project(lon, lat);
      if (p.z > 0) {
        if (!open) { ctx.moveTo(p.x, p.y); open = true; }
        else ctx.lineTo(p.x, p.y);
      } else open = false;
    }
    ctx.stroke();
  }

  function densifyPolygon(poly, step = 2.5) {
    const points = [];
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i];
      const b = poly[(i+1) % poly.length];
      let dLon = b[0] - a[0];
      if (dLon > 180) dLon -= 360;
      if (dLon < -180) dLon += 360;
      const dLat = b[1] - a[1];
      const n = Math.max(2, Math.ceil(Math.max(Math.abs(dLon), Math.abs(dLat)) / step));
      for (let j = 0; j < n; j++) points.push([a[0] + dLon * j/n, a[1] + dLat * j/n]);
    }
    return points;
  }

  function drawContinents() {
    ctx.save();
    ctx.fillStyle = 'rgba(57, 110, 104, .48)';
    ctx.strokeStyle = 'rgba(116, 218, 190, .23)';
    ctx.lineWidth = .8;
    for (const dense of denseContinents) {
      const visible = dense.map(([lon, lat]) => ({...project(lon, lat), lon, lat})).filter(p => p.z > -.02);
      if (visible.length < 3) continue;
      ctx.beginPath();
      ctx.moveTo(visible[0].x, visible[0].y);
      for (let i = 1; i < visible.length; i++) ctx.lineTo(visible[i].x, visible[i].y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }

  function routePoints(opp, segmentsPerLeg = 48) {
    const cacheKey = `${opp.id}-${segmentsPerLeg}`;
    if (routeCache.has(cacheKey)) return routeCache.get(cacheKey);
    const ids = [opp.origin, ...(opp.via || []), opp.destination];
    const output = [];
    for (let leg = 0; leg < ids.length - 1; leg++) {
      const aHub = getHub(ids[leg]);
      const bHub = getHub(ids[leg + 1]);
      const a = toVector(aHub.lon, aHub.lat);
      const b = toVector(bHub.lon, bHub.lat);
      for (let i = 0; i <= segmentsPerLeg; i++) {
        const t = i / segmentsPerLeg;
        const ll = vectorToLonLat(slerp(a, b, t));
        output.push({ ...ll, globalT: (leg + t) / (ids.length - 1) });
      }
    }
    routeCache.set(cacheKey, output);
    return output;
  }

  function drawProjectedRoute(points, style) {
    ctx.save();
    ctx.strokeStyle = style.color;
    ctx.lineWidth = style.width;
    ctx.globalAlpha = style.alpha ?? 1;
    if (style.dash) ctx.setLineDash(style.dash);
    ctx.beginPath();
    let open = false;
    for (const point of points) {
      const lift = style.lift ? Math.sin(point.globalT * Math.PI) * style.lift : 0;
      const p = project(point.lon, point.lat, lift);
      if (p.z > -.01) {
        if (!open) { ctx.moveTo(p.x, p.y); open = true; }
        else ctx.lineTo(p.x, p.y);
      } else open = false;
    }
    ctx.stroke();
    ctx.restore();
  }

  function drawRoutes() {
    if (layers.opportunities) {
      opportunities.forEach(opp => {
        if (!isOpportunityUnlocked(opp)) return;
        const isSelected = selected.type === 'opportunity' && selected.id === opp.id;
        const points = routePoints(opp, 36);
        drawProjectedRoute(points, {
          color: isSelected ? 'rgba(87,230,255,.82)' : 'rgba(87,230,255,.20)',
          width: isSelected ? 1.8 : .9,
          dash: isSelected ? [] : [3, 5], lift: .045, alpha: 1
        });
      });
    }
    if (layers.portfolio) {
      state.activeDeals.forEach(deal => {
        const opp = getOpportunity(deal.opportunityId);
        const isSelected = selected.type === 'deal' && selected.id === deal.id;
        const hedge = deal.hedgeRatio || 0;
        const riskColor = hedge >= 90 ? 'rgba(97,242,166,.9)' : hedge >= 60 ? 'rgba(255,180,94,.9)' : 'rgba(255,100,121,.95)';
        drawProjectedRoute(routePoints(opp, 46), {
          color: layers.risk ? riskColor : (isSelected ? 'rgba(97,242,166,1)' : 'rgba(97,242,166,.58)'),
          width: isSelected ? 2.4 : (layers.risk ? 2 : 1.45), lift: .055
        });
      });
    }
  }

  function hubVisible(hub) {
    if (hub.locked && !opportunities.some(o => (o.origin === hub.id || o.destination === hub.id || o.via?.includes(hub.id)) && isOpportunityUnlocked(o))) return false;
    if (layers.portfolio && state.activeDeals.some(d => {
      const o = getOpportunity(d.opportunityId);
      return [o.origin, o.destination, ...(o.via || [])].includes(hub.id);
    })) return true;
    if (layers.opportunities && opportunities.some(o => isOpportunityUnlocked(o) && [o.origin,o.destination,...(o.via||[])].includes(hub.id))) return true;
    return hub.type === 'hq';
  }

  function hubColor(hub) {
    return { hq: '#ffffff', supplier: '#ffb45e', customer: '#57e6ff', port: '#6d91ff' }[hub.type] || '#ad8cff';
  }

  function drawHubs() {
    hubs.forEach(hub => {
      if (!hubVisible(hub)) return;
      const p = project(hub.lon, hub.lat, .012);
      if (p.z <= 0) return;
      const selectedHub = selected.type === 'hub' && selected.id === hub.id;
      const color = hubColor(hub);
      const pulse = 1 + Math.sin(animationTime * .003 + hub.lon) * .12;
      ctx.save();
      ctx.globalAlpha = clamp(p.z * 1.7, .25, 1);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = selectedHub ? 18 : 9;
      ctx.beginPath();
      ctx.arc(p.x, p.y, (selectedHub ? 5 : 3.4) * pulse, 0, Math.PI*2);
      ctx.fill();
      ctx.shadowBlur = 0;
      if (selectedHub) {
        ctx.strokeStyle = color;
        ctx.globalAlpha = .45;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 10 + Math.sin(animationTime*.004)*2, 0, Math.PI*2);
        ctx.stroke();
      }
      if (view.zoom > .87 || selectedHub) {
        ctx.globalAlpha = clamp(p.z * 1.5, .2, 1);
        ctx.font = `${selectedHub ? 700 : 600} ${selectedHub ? 10 : 8}px Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillStyle = selectedHub ? '#f4fbff' : 'rgba(218,233,241,.78)';
        ctx.fillText(hub.name.toUpperCase(), p.x, p.y - (selectedHub ? 14 : 10));
      }
      ctx.restore();
      markerHitboxes.push({ id: hub.id, x: p.x, y: p.y, r: selectedHub ? 15 : 11, z: p.z });
    });
  }

  function drawInvestmentMarkers() {
    investmentHitboxes=[];
    investmentCatalog.forEach(asset=>{
      const record=investmentRecord(asset.id);
      if (!record.level && !record.buildingTo) return;
      const hub=getHub(asset.hub); if(!hub) return;
      const p=project(hub.lon,hub.lat,.025); if(p.z<=0) return;
      const chainColor={upstream:'#ffb45e',midstream:'#57e6ff',downstream:'#ad8cff'}[asset.chain];
      const selectedAsset=selected.type==='investment'&&selected.id===asset.id;
      const pulse=1+Math.sin(animationTime*.004+hub.lon)*.08;
      ctx.save();ctx.globalAlpha=clamp(p.z*1.5,.3,1);ctx.translate(p.x+13,p.y-9);
      ctx.fillStyle='rgba(4,15,25,.9)';ctx.strokeStyle=chainColor;ctx.lineWidth=selectedAsset?2:1;
      ctx.beginPath();ctx.arc(0,0,(selectedAsset?8:6)*pulse,0,Math.PI*2);ctx.fill();ctx.stroke();
      ctx.fillStyle=chainColor;ctx.font='700 8px Inter,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(record.buildingTo?'⌛':String(record.level),0,.5);
      ctx.restore();investmentHitboxes.push({id:asset.id,x:p.x+13,y:p.y-9,r:12,z:p.z});
    });
  }

  function pointOnRoute(opp, t) {
    const points = routePoints(opp, 70);
    const targetIndex = clamp(Math.floor(t * (points.length - 1)), 0, points.length - 1);
    return points[targetIndex];
  }

  function visualDealProgress(deal) {
    const interval = runningSpeed === 5 ? 430 : 1800;
    const fraction = runningSpeed > 0 ? clamp((animationTime - simulationDayAnchor) / interval, 0, .98) : 0;
    return clamp((deal.elapsed + fraction) / deal.duration, 0, 1);
  }

  function vehicleTypeForDeal(deal, progress) {
    const opp=getOpportunity(deal.opportunityId);
    const mode=(opp.transportMode||'').toLowerCase();
    if ((opp.via||[]).length && progress>.84) return mode.includes('rail') ? 'train' : 'truck';
    if (mode.includes('tanker')) return 'tanker';
    if (mode.includes('bulk') || mode.includes('panamax')) return 'bulk';
    if (mode.includes('ocean') || mode.includes('container')) return 'ship';
    if (mode.includes('barge')) return 'barge';
    if (mode.includes('rail')) return 'train';
    return 'truck';
  }

  function drawVehicleIcon(type,color,selected=false) {
    ctx.shadowColor=color; ctx.shadowBlur=selected?20:12; ctx.fillStyle=color; ctx.strokeStyle='rgba(225,247,255,.9)'; ctx.lineWidth=.8;
    if (['ship','tanker','bulk','barge'].includes(type)) {
      const length=type==='bulk'?18:type==='tanker'?17:type==='barge'?14:16;
      ctx.beginPath(); ctx.moveTo(length*.62,0); ctx.lineTo(length*.35,-4); ctx.lineTo(-length*.48,-4); ctx.lineTo(-length*.62,0); ctx.lineTo(-length*.45,4); ctx.lineTo(length*.35,4); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle='rgba(5,18,29,.88)'; ctx.fillRect(-4,-6,7,4);
      if(type==='tanker'){ctx.fillStyle='rgba(225,247,255,.45)';[-5,1,7].forEach(x=>{ctx.beginPath();ctx.arc(x,0,1.8,0,Math.PI*2);ctx.fill();});}
      if(type==='bulk'){ctx.fillStyle='rgba(225,247,255,.35)';[-6,0,6].forEach(x=>ctx.fillRect(x-2,-2,4,4));}
    } else if(type==='train') {
      ctx.fillRect(-9,-4,14,8); ctx.beginPath();ctx.moveTo(5,-4);ctx.lineTo(10,0);ctx.lineTo(5,4);ctx.closePath();ctx.fill();ctx.stroke();
      ctx.fillStyle='rgba(5,18,29,.9)';ctx.fillRect(-6,-2,4,3);ctx.fillRect(0,-2,3,3);
    } else {
      ctx.fillRect(-8,-4,10,8);ctx.beginPath();ctx.moveTo(2,-4);ctx.lineTo(8,-2);ctx.lineTo(8,4);ctx.lineTo(2,4);ctx.closePath();ctx.fill();ctx.stroke();
      ctx.fillStyle='rgba(5,18,29,.9)';ctx.fillRect(3,-2,3,3);
    }
  }

  function drawShipments() {
    if (!layers.logistics || !layers.portfolio) return;
    state.activeDeals.forEach(deal => {
      const opp = getOpportunity(deal.opportunityId);
      const progress = visualDealProgress(deal);
      const point = pointOnRoute(opp, progress);
      const nextPoint=pointOnRoute(opp,Math.min(.999,progress+.008));
      const p = project(point.lon, point.lat, .061 * Math.sin(progress * Math.PI));
      const pn=project(nextPoint.lon,nextPoint.lat,.061*Math.sin(Math.min(.999,progress+.008)*Math.PI));
      if (p.z <= -.02) return;
      const selectedShip = selected.type === 'deal' && selected.id === deal.id;
      const color = deal.pendingDecision ? '#ff6479' : '#61f2a6';
      const angle=Math.atan2(pn.y-p.y,pn.x-p.x);
      const type=vehicleTypeForDeal(deal,progress);
      ctx.save();
      ctx.globalAlpha = clamp((p.z + .15) * 1.3, .25, 1);
      ctx.translate(p.x,p.y);ctx.rotate(angle);
      if(['ship','tanker','bulk','barge'].includes(type)){
        ctx.strokeStyle='rgba(102,225,255,.34)';ctx.lineWidth=1.2;ctx.setLineDash([2,3]);
        ctx.beginPath();ctx.moveTo(-12,-3);ctx.lineTo(-25,-6);ctx.moveTo(-12,3);ctx.lineTo(-25,6);ctx.stroke();ctx.setLineDash([]);
      } else {
        ctx.strokeStyle='rgba(97,242,166,.28)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(-10,0);ctx.lineTo(-24,0);ctx.stroke();
      }
      drawVehicleIcon(type,color,selectedShip);
      ctx.restore();
      if(selectedShip || view.zoom>1.12){ctx.save();ctx.font='700 8px Inter,sans-serif';ctx.textAlign='center';ctx.fillStyle='rgba(235,249,255,.9)';ctx.fillText(`${type.toUpperCase()} · ${Math.round(progress*100)}%`,p.x,p.y-14);ctx.restore();}
      shipHitboxes.push({ id: deal.id, x: p.x, y: p.y, r: 16, z: p.z });
    });
  }


  function drawFleetAssets() {
    if (!layers.logistics) return;
    state.fleetAssets.filter(asset => asset.status === 'available').forEach(asset => {
      const hub = getHub(asset.positionHub);
      if (!hub) return;
      const p = project(hub.lon, hub.lat, .045);
      if (p.z <= 0) return;
      const isSelected = selected.type === 'vessel' && selected.id === asset.id;
      ctx.save();
      ctx.globalAlpha = clamp(p.z * 1.6, .3, 1);
      ctx.translate(p.x + 10, p.y + 8);
      ctx.fillStyle = '#ad8cff';
      ctx.shadowColor = '#ad8cff';
      ctx.shadowBlur = isSelected ? 18 : 9;
      ctx.beginPath();
      ctx.moveTo(0, -6); ctx.lineTo(6, 0); ctx.lineTo(0, 6); ctx.lineTo(-6, 0); ctx.closePath();
      ctx.fill();
      ctx.restore();
      fleetHitboxes.push({ id: asset.id, x: p.x + 10, y: p.y + 8, r: 13, z: p.z });
    });
  }

  function animate(timestamp) {
    animationTime = timestamp;
    if (timestamp - lastDrawTime >= 32) {
      lastDrawTime = timestamp;
      if (view.targetLon !== null) {
        let diffLon = ((view.targetLon - view.lon + 540) % 360) - 180;
        const diffLat = view.targetLat - view.lat;
        view.lon += diffLon * .12;
        view.lat += diffLat * .12;
        if (Math.abs(diffLon) < .08 && Math.abs(diffLat) < .08) {
          view.lon = view.targetLon;
          view.lat = view.targetLat;
          view.targetLon = null;
          view.targetLat = null;
        }
      }
      renderEarth(timestamp);
      drawGlobe();
    }
    requestAnimationFrame(animate);
  }

  function focusOnHub(hubId) {
    const hub = getHub(hubId);
    if (!hub) return;
    view.targetLon = hub.lon;
    view.targetLat = clamp(hub.lat * .72, -52, 58);
  }

  function focusOnOpportunity(oppId) {
    const opp = getOpportunity(oppId);
    const a = getHub(opp.origin);
    const b = getHub(opp.destination);
    let lonA = a.lon;
    let lonB = b.lon;
    if (Math.abs(lonA-lonB) > 180) { if (lonA < lonB) lonA += 360; else lonB += 360; }
    let centerLon = (lonA + lonB) / 2;
    if (centerLon > 180) centerLon -= 360;
    view.targetLon = centerLon;
    view.targetLat = clamp((a.lat+b.lat)/2*.65, -42, 50);
    view.zoom = .88;
  }

  function focusOnDeal(dealId) {
    const deal = getActiveDeal(dealId);
    if (!deal) return;
    const opp = getOpportunity(deal.opportunityId);
    const point = pointOnRoute(opp, computeDealProgress(deal));
    view.targetLon = point.lon;
    view.targetLat = clamp(point.lat*.75, -50, 55);
    view.zoom = 1.05;
  }

  function showToast(message) {
    const toast = $('#toast');
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.remove('hidden');
    requestAnimationFrame(() => toast.classList.add('visible'));
    toastTimer = setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.classList.add('hidden'), 260);
    }, 2600);
  }

  function selectHub(id, focus = true) {
    selected = { type: 'hub', id };
    if (focus) focusOnHub(id);
    renderInspector();
    renderAllLists();
  }

  function selectOpportunity(id, focus = true) {
    const opp = getOpportunity(id);
    if (!isOpportunityUnlocked(opp)) return showToast('Questa opportunità non è ancora sbloccata.');
    if (!opportunityAvailable(opp)) return showToast('Questa opportunità è già stata allocata nel ciclo corrente.');
    selected = { type: 'opportunity', id };
    if (focus) focusOnOpportunity(id);
    renderInspector();
    renderOpportunityList();
  }

  function selectDeal(id, focus = true) {
    selected = { type: 'deal', id };
    if (focus) focusOnDeal(id);
    renderInspector();
    renderActiveDeals();
  }

  function selectHistory(id) {
    const item = getHistoryDeal(id);
    if (!item) return;
    selected = { type: 'history', id };
    activeLeftTab = 'portfolio';
    renderTabs();
    renderInspector();
    renderHistory();
  }

  function selectVessel(id, focus = true) {
    const asset = getFleetAsset(id);
    if (!asset) return;
    selected = { type: 'vessel', id };
    activeLeftTab = 'fleet';
    if (focus) focusOnHub(asset.positionHub);
    renderTabs();
    renderInspector();
    renderFleet();
  }

  function opportunityAvailable(opp) {
    const negotiation = state.negotiations?.[opp.id];
    return !(negotiation && negotiation.cycle === state.marketCycle && negotiation.status === 'consumed');
  }

  function submitNegotiation(oppId) {
    const opp = getOpportunity(oppId);
    if (!opp || !isOpportunityUnlocked(opp) || !opportunityAvailable(opp)) return;
    const draft = { ...negotiationFor(oppId) };
    const attempts = (draft.attempts || 0) + 1;
    const probability = negotiationAcceptance(opp, draft);
    const roll = deterministicRandom(`${opp.id}-${state.marketCycle}-${attempts}-${draft.commercial}-${draft.payment}-${draft.delivery}`) * 100;
    const accepted = roll <= probability;
    const parties = partiesForOpportunity(opp);
    const buyerState = getCounterpartyState(parties.buyerId);
    const result = { ...draft, attempts, probability, status: accepted ? 'accepted' : 'rejected', submittedAt: state.date };
    state.negotiations[oppId] = result;
    selectedNegotiationDrafts[oppId] = result;
    if (accepted) {
      buyerState.relationship = clamp(buyerState.relationship + 1, 0, 100);
      showToast(`Offerta accettata. Il deal può essere aperto entro ${liveOffer(opp).expiresIn} giorni.`);
    } else {
      buyerState.relationship = clamp(buyerState.relationship - 1, 0, 100);
      showToast('Offerta rifiutata. Modifica prezzo, pagamento o delivery window e riprova.');
    }
    saveState();
    renderAll();
  }

  function canStartOpportunity(opp) {
    const stats = portfolioStats();
    const economics = opportunityEconomics(opp, negotiationFor(opp.id));
    const negotiation = state.negotiations?.[opp.id];
    const structure = economics.structure;
    return opportunityAvailable(opp) && negotiation?.cycle === state.marketCycle && negotiation.status === 'accepted' && financingAvailable(structure.financingId) && state.cash >= economics.equity + economics.initialMargin && stats.creditAvailable >= economics.borrowed;
  }

  function startOpportunity(oppId) {
    const opp = getOpportunity(oppId);
    if (!opp || !isOpportunityUnlocked(opp) || !opportunityAvailable(opp)) return;
    const negotiation = state.negotiations?.[opp.id];
    if (!negotiation || negotiation.cycle !== state.marketCycle || negotiation.status !== 'accepted') {
      showToast('Negozia e fai accettare l’offerta prima di aprire il deal.');
      return;
    }
    if (!canStartOpportunity(opp)) {
      showToast('Capitale o linea di credito insufficienti per questo deal.');
      return;
    }
    const strategy = selectedCarrierStrategies[opp.id] || 'spot';
    const fleetAsset = strategy.startsWith('fleet:') ? getFleetAsset(strategy.slice(6)) : null;
    if (fleetAsset && !fleetAssetAvailableFor(fleetAsset, opp)) {
      selectedCarrierStrategies[opp.id] = 'spot';
      return showToast('La nave selezionata non è più disponibile o non si trova nel porto di origine.');
    }
    const fleetVessel = fleetAsset ? getVesselCatalog(fleetAsset.catalogId) : null;
    const economics = opportunityEconomics(opp, negotiation);
    const dealEquity = economics.equity;
    const dealBorrowed = economics.borrowed;
    const parties = partiesForOpportunity(opp);
    const deal = {
      id: `deal-${Date.now()}-${state.sequence++}`,
      opportunityId: opp.id,
      started: state.date,
      elapsed: 0,
      duration: Math.max(10, economics.duration - (fleetVessel?.durationBonus || 0)),
      equity: dealEquity,
      borrowed: dealBorrowed,
      capital: economics.capital,
      quantity: economics.quantity,
      supplierId: parties.supplierId,
      buyerId: parties.buyerId,
      commercialTerms: { ...economics.terms },
      financingStrategy: economics.structure.financingId,
      financingRate: economics.structure.financing.rate,
      insuranceStrategy: economics.structure.insuranceId,
      inspectionStrategy: economics.structure.inspectionId,
      fxHedgeRatio: economics.structure.fxHedgeRatio,
      entryFx: state.eurusd,
      initialMargin: economics.initialMargin,
      marginCollateral: economics.initialMargin,
      marginCalls: 0,
      financingAccrued: 0,
      marketCycle: state.marketCycle,
      globalEventsAtBooking: economics.crisisLabels,
      verticalSources: economics.verticalSources || [],
      basePnl: economics.basePnl + (fleetVessel?.bonusPnl || 0) + (fleetAsset && hasStaff('freight-charterer') ? 5_000 : 0),
      fleetAssetId: fleetAsset?.id || null,
      shippingStrategy: fleetAsset ? 'internal-fleet' : 'spot-carrier',
      pnlAdjustments: 0,
      hedgeRatio: Number(selectedHedgeRatios[opp.id] ?? opp.recommendedHedge ?? 100),
      entryMarketPrice: marketPriceForOpportunity(opp),
      hedgeTransactions: 1,
      reputationAdjustments: 0,
      eventTriggered: false,
      eventResolved: false,
      pendingDecision: false,
      forcedCompletion: false,
      eventResult: null
    };
    deal.operations = makeDealOperations(opp, deal.id, fleetAsset);
    const commercialLabel = negotiationProfiles.commercial[negotiation.commercial]?.label || 'Market quote';
    const paymentLabel = negotiationProfiles.payment[negotiation.payment]?.label || 'Payment at delivery';
    const deliveryLabel = negotiationProfiles.delivery[negotiation.delivery]?.label || 'Standard window';
    deal.operations.salesContract.terms = `${deal.operations.salesContract.terms} · ${commercialLabel} · ${paymentLabel} · ${deliveryLabel}`;
    deal.operations.purchaseContract.terms = `${deal.operations.purchaseContract.terms} · ${economics.structure.inspection.label}`;
    deal.operations.finance = { facility: economics.structure.financing.label, rate: economics.structure.financing.rate, insurance: economics.structure.insurance.label, fxHedgeRatio: economics.structure.fxHedgeRatio };
    if (economics.structure.inspectionId === 'independent') {
      const qualityDoc = deal.operations.documents.find(doc => /quality|assay|protein|moisture/i.test(doc.name));
      if (qualityDoc) qualityDoc.status = 'ready';
    }
    if (fleetAsset) { fleetAsset.status = 'assigned'; fleetAsset.assignedDealId = deal.id; }
    selectedCarrierStrategies[opp.id] = 'spot';
    state.cash -= deal.equity + deal.marginCollateral;
    state.activeDeals.push(deal);
    state.negotiations[opp.id] = { ...negotiation, status: 'consumed' };
    saveState();
    selectDeal(deal.id);
    activeLeftTab = 'portfolio';
    renderTabs();
    renderAll();
    showToast(`${opp.title} avviato: capitale allocato e spedizione aperta.`);
  }

  function triggerDealEvent(deal) {
    const opp = getOpportunity(deal.opportunityId);
    if (!opp.event || deal.eventTriggered) return false;
    if (computeDealProgress(deal) >= opp.event.dayRatio) {
      deal.eventTriggered = true;
      deal.pendingDecision = true;
      updateDealOperations(deal);
      runningSpeed = 0;
      updateClock();
      selected = { type: 'deal', id: deal.id };
      focusOnDeal(deal.id);
      showToast(`Decisione richiesta: ${opp.event.title}`);
      return true;
    }
    return false;
  }

  function resolveEvent(dealId, choiceId) {
    const deal = getActiveDeal(dealId);
    if (!deal) return;
    const opp = getOpportunity(deal.opportunityId);
    const choice = opp.event.choices.find(c => c.id === choiceId);
    if (!choice) return;
    let outcome = choice;
    if (choice.random) {
      const roll = deterministicRandom(`${deal.id}-${choice.id}-${state.date}`);
      outcome = roll < .55 ? choice.good : choice.bad;
    }
    const insuranceFactor = insuranceProfiles[deal.insuranceStrategy || 'basic']?.lossFactor || 1;
    const inspectionFactor = inspectionProfiles[deal.inspectionStrategy || 'standard']?.lossFactor || 1;
    const rawPnl = outcome.pnl || 0;
    const mitigatedPnl = rawPnl < 0 ? Math.round(rawPnl * insuranceFactor * inspectionFactor * difficultySettings().eventLoss) : rawPnl;
    deal.pnlAdjustments += mitigatedPnl;
    deal.duration += outcome.days || 0;
    deal.reputationAdjustments += outcome.reputation || 0;
    deal.eventResult = outcome.result;
    deal.eventResolved = true;
    deal.pendingDecision = false;
    updateDealOperations(deal);
    if (choiceId === 'inspect') {
      const quality = deal.operations.documents.find(d => d.name === 'Quality certificate');
      if (quality) quality.status = 'ready';
    }
    if (['kyc', 'amend-lc', 'waiver'].includes(choiceId)) {
      const lc = deal.operations.documents.find(d => d.name === 'LC compliance');
      if (lc) lc.status = 'ready';
    }
    if (choice.forceComplete) {
      deal.forcedCompletion = true;
      deal.elapsed = deal.duration;
      completeDeal(deal);
    }
    saveState();
    renderAll();
    showToast(outcome.result);
  }

  function increaseHedge(dealId) {
    const deal = getActiveDeal(dealId);
    if (!deal || deal.hedgeRatio >= 100) return;
    const opp = getOpportunity(deal.opportunityId);
    const realizedMarketImpact = computeMarketImpact(deal);
    const transactionCost = Math.round((2_000 + (deal.quantity || opp.quantity) * 2) * (hasStaff('risk-analyst') ? .65 : 1));
    deal.pnlAdjustments += realizedMarketImpact - transactionCost;
    deal.entryMarketPrice = marketPriceForOpportunity(opp);
    deal.hedgeRatio = 100;
    deal.hedgeTransactions = (deal.hedgeTransactions || 1) + 1;
    updateMarginLiquidity(deal);
    saveState();
    renderAll();
    showToast(`Hedge portato al 100%. Costo operativo ${money(transactionCost)}.`);
  }

  function completeDeal(deal) {
    const opp = getOpportunity(deal.opportunityId);
    const marketPnl = computeMarketImpact(deal);
    const fxPnl = computeFxImpact(deal);
    const financingCost = deal.financingAccrued || 0;
    const pnl = deal.basePnl + deal.pnlAdjustments - financingCost + marketPnl + fxPnl;
    state.cash += deal.equity + (deal.marginCollateral || 0) + pnl;
    state.realizedPnl += pnl;
    state.completedDeals += 1;
    const readiness = operationsReadiness(deal);
    const opsRep = readiness >= 92 ? 2 : readiness < 70 ? -2 : 0;
    const baseRep = pnl >= 0 ? 2 : -3;
    state.reputation = clamp(state.reputation + baseRep + opsRep + deal.reputationAdjustments, 0, 100);
    [deal.supplierId, deal.buyerId].filter(Boolean).forEach(counterpartyId => {
      const relationship = getCounterpartyState(counterpartyId);
      relationship.deals = (relationship.deals || 0) + 1;
      const relationshipMove = readiness >= 90 && pnl >= 0 ? 3 : readiness < 70 || pnl < 0 ? -2 : 1;
      relationship.relationship = clamp(relationship.relationship + relationshipMove, 0, 100);
      if (readiness < 70 || (deal.eventResult || '').toLowerCase().includes('claim')) relationship.disputes = (relationship.disputes || 0) + 1;
    });
    if (deal.fleetAssetId) {
      const fleetAsset = getFleetAsset(deal.fleetAssetId);
      if (fleetAsset) {
        fleetAsset.status = 'available';
        fleetAsset.assignedDealId = null;
        fleetAsset.positionHub = opp.destination;
      }
    }
    state.history.unshift({
      id: deal.id,
      opportunityId: opp.id,
      completed: state.date,
      pnl,
      days: deal.elapsed,
      eventResult: deal.eventResult,
      operationalReadiness: readiness,
      carrier: deal.operations?.transport?.carrier || 'N/A',
      charterType: deal.operations?.transport?.charterType || 'N/A',
      demurrage: deal.operations?.transport?.demurrageAccrued || 0,
      hedgeRatio: deal.hedgeRatio || 0,
      shippingStrategy: deal.shippingStrategy || 'spot-carrier',
      commodity: opp.commodity,
      quantity: deal.quantity || opp.quantity,
      supplierId: deal.supplierId,
      buyerId: deal.buyerId,
      commercialTerms: deal.commercialTerms,
      financingStrategy: deal.financingStrategy,
      insuranceStrategy: deal.insuranceStrategy,
      inspectionStrategy: deal.inspectionStrategy,
      fxHedgeRatio: deal.fxHedgeRatio || 0,
      marginCalls: deal.marginCalls || 0,
      pnlBreakdown: { commercial: deal.basePnl, operations: deal.pnlAdjustments, financing: -financingCost, market: marketPnl, fx: fxPnl, demurrage: -(deal.operations?.transport?.demurrageAccrued || 0) },
      globalEventImpacts: deal.globalEventImpacts || [],
      verticalSources: deal.verticalSources || []
    });
    state.history = state.history.slice(0, 8);
    state.activeDeals = state.activeDeals.filter(d => d.id !== deal.id);
    evaluateMissions();
    selected = { type: 'hub', id: 'geneva' };
    focusOnHub('geneva');
    showToast(`${opp.title} chiuso con ${money(pnl)} di P&L.`);
  }

  function advanceDay({ silent = false, deferRender = false } = {}) {
    if (state.activeDeals.some(d => d.pendingDecision)) {
      const pending = state.activeDeals.find(d => d.pendingDecision);
      selectDeal(pending.id);
      if (!silent) showToast('Risolvi prima la decisione operativa aperta.');
      return false;
    }
    simulationDayAnchor = performance.now();
    const previousDayIndex=state.dayIndex||0;
    const date = currentDate();
    date.setUTCDate(date.getUTCDate() + 1);
    state.date = date.toISOString();
    advanceWorldState();
    archiveSeasonIfNeeded(previousDayIndex);

    state.copperPrev = state.copperPrice;
    state.aluminiumPrev = state.aluminiumPrice;
    state.ureaPrev = state.ureaPrice;
    state.eurusdPrev = state.eurusd;
    state.freightPrev = state.freightIndex;
    state.crudePrev = state.crudePrice;
    state.wheatPrev = state.wheatPrice;
    state.ironorePrev = state.ironorePrice;
    state.coffeePrev = state.coffeePrice;
    const seed = deterministicRandom(state.date);
    const crisisDrift = key => activeCrisisDefinitions().filter(event => event.commodity === key).reduce((sum,event)=>sum+(event.dailyDrift||0),0);
    const copperNoise = Math.sin(date.getUTCDate() * .71 + date.getUTCMonth()) * 18 + (seed - .5) * 34 + crisisDrift('copper');
    const aluminiumNoise = Math.cos(date.getUTCDate() * .53 + date.getUTCMonth() * .7) * 7 + (deterministicRandom(state.date + '-al') - .5) * 15 + crisisDrift('aluminium');
    const ureaNoise = Math.sin(date.getUTCDate() * .27 + date.getUTCMonth() * .9) * 1.6 + (deterministicRandom(state.date + '-ur') - .5) * 4.5 + crisisDrift('urea');
    const crudeNoise = Math.sin(date.getUTCDate() * .43) * .45 + (deterministicRandom(state.date + '-cr') - .5) * 1.45 + crisisDrift('crude');
    const wheatNoise = Math.cos(date.getUTCDate() * .37) * 1.3 + (deterministicRandom(state.date + '-wh') - .5) * 4.2 + crisisDrift('wheat');
    const ironNoise = Math.sin(date.getUTCDate() * .32) * .55 + (deterministicRandom(state.date + '-io') - .5) * 1.8 + crisisDrift('ironore');
    const coffeeNoise = Math.cos(date.getUTCDate() * .25) * 18 + (deterministicRandom(state.date + '-co') - .5) * 46 + crisisDrift('coffee');
    const fxNoise = Math.sin(date.getUTCDate() * .39) * .0011 + (deterministicRandom(state.date + '-fx') - .5) * .0025;
    const freightNoise = Math.cos(date.getUTCDate() * .31) * .65 + (deterministicRandom(state.date + '-fr') - .5) * 1.4 + activeCrisisDefinitions().length * .08;
    state.copperPrice = clamp(state.copperPrice + copperNoise, 8200, 11600);
    state.aluminiumPrice = clamp(state.aluminiumPrice + aluminiumNoise, 1950, 3100);
    state.ureaPrice = clamp(state.ureaPrice + ureaNoise, 250, 580);
    state.crudePrice = clamp(state.crudePrice + crudeNoise, 52, 116);
    state.wheatPrice = clamp(state.wheatPrice + wheatNoise, 175, 365);
    state.ironorePrice = clamp(state.ironorePrice + ironNoise, 72, 168);
    state.coffeePrice = clamp(state.coffeePrice + coffeeNoise, 2900, 6100);
    state.eurusd = clamp(state.eurusd + fxNoise, .94, 1.24);
    state.freightIndex = clamp(state.freightIndex + freightNoise, 68, 165);
    advanceFleetDay();
    const overhead = dailyOverhead();
    state.cash -= overhead;
    state.overheadPaid = (state.overheadPaid || 0) + overhead;
    processInvestmentDay();

    let eventTriggered = false;
    for (const deal of [...state.activeDeals]) {
      deal.elapsed += 1;
      updateDealOperations(deal);
      accrueDailyFinancing(deal);
      updateMarginLiquidity(deal);
      accrueDailyShippingCosts(deal);
      if (!deal.eventTriggered && triggerDealEvent(deal)) {
        eventTriggered = true;
        break;
      }
      if (deal.elapsed >= deal.duration) completeDeal(deal);
    }

    const stats = portfolioStats();
    state.navHistory.push(stats.nav);
    if (state.navHistory.length > 50) state.navHistory.shift();
    saveState();
    if (!deferRender) renderAll();
    return !eventTriggered;
  }

  function advanceToNextEvent() {
    if (state.activeDeals.some(d => d.pendingDecision)) return selectDeal(state.activeDeals.find(d => d.pendingDecision).id);
    let safe = 0;
    const feedBefore = state.worldEventFeed.length;
    const cycleBefore = state.marketCycle;
    while (safe < 120) {
      safe++;
      const before = state.activeDeals.length;
      const continued = advanceDay({ silent: true, deferRender: true });
      if (!continued || state.activeDeals.length < before || state.worldEventFeed.length > feedBefore || state.marketCycle !== cycleBefore) break;
    }
    renderAll();
  }

  function updateClock() {
    $$('.time-button').forEach(b => b.classList.remove('active'));
    const dot = $('#clockDot');
    if (runningSpeed === 0) {
      $('#pauseButton').classList.add('active');
      $('#clockStatus').textContent = 'In pausa';
      dot.classList.remove('running');
    } else {
      const speedButton = $(`.time-button[data-speed="${runningSpeed}"]`);
      speedButton?.classList.add('active');
      $('#clockStatus').textContent = `${runningSpeed}× attivo`;
      dot.classList.add('running');
    }
    clearInterval(clockTimer);
    simulationDayAnchor = performance.now();
    if (runningSpeed > 0) {
      clockTimer = setInterval(() => advanceDay(), runningSpeed === 1 ? 1800 : 430);
    }
  }

  function renderMetrics() {
    const stats = portfolioStats();
    const start = 1_000_000;
    const ret = (stats.nav / start - 1) * 100;
    $('#navMetric').textContent = money(stats.nav, true);
    $('#navDelta').textContent = `${ret >= 0 ? '+' : ''}${ret.toFixed(1)}% all time`;
    $('#cashMetric').textContent = money(state.cash, true);
    $('#cashDelta').textContent = dailyInvestmentIncome() ? `${money(dailyInvestmentIncome())}/day assets` : (state.cash < 250_000 ? 'Liquidità bassa' : 'Disponibile');
    $('#creditMetric').textContent = money(stats.creditUsed, true);
    $('#creditSub').textContent = `di ${money(effectiveCreditLimit(), true)}`;
    $('#repMetric').textContent = Math.round(state.reputation);
    $('#rankMetric').textContent = rankFromState();
    $('#portfolioValue').textContent = money(stats.nav);
    $('#portfolioReturn').textContent = `${ret >= 0 ? '+' : ''}${ret.toFixed(1)}% dalla partenza`;
    $('#portfolioReturn').style.color = ret >= 0 ? 'var(--green)' : 'var(--red)';
    $('#investedMetric').textContent = money(stats.invested, true);
    $('#activePnlMetric').textContent = money(stats.activePnl, true);
    $('#activePnlMetric').style.color = stats.activePnl >= 0 ? 'var(--green)' : 'var(--red)';
    $('#completedMetric').textContent = state.completedDeals;
    $('#creditAvailableMetric').textContent = money(stats.creditAvailable, true);
    $('#activeCount').textContent = state.activeDeals.length;
    $('#gameDate').textContent = formatDate(currentDate());
    const profileInitials=(state.profileName||'GB').split(/\s+/).map(value=>value[0]).slice(0,2).join('').toUpperCase();
    if ($('.profile-button')) $('.profile-button').textContent=profileInitials;

    const marketDisplays = [
      ['copper', state.copperPrice, state.copperPrev, `${money(state.copperPrice)}/t`, 2],
      ['aluminium', state.aluminiumPrice, state.aluminiumPrev, `${money(state.aluminiumPrice)}/t`, 2],
      ['urea', state.ureaPrice, state.ureaPrev, `${money(state.ureaPrice)}/t`, 2],
      ['crude', state.crudePrice, state.crudePrev, `$${state.crudePrice.toFixed(2)}/bbl`, 2],
      ['wheat', state.wheatPrice, state.wheatPrev, `${money(state.wheatPrice)}/t`, 2],
      ['ironore', state.ironorePrice, state.ironorePrev, `${money(state.ironorePrice)}/t`, 2],
      ['eurusd', state.eurusd, state.eurusdPrev, state.eurusd.toFixed(4), 2],
      ['freight', state.freightIndex, state.freightPrev, state.freightIndex.toFixed(1), 2]
    ];
    marketDisplays.forEach(([id, value, previous, label, decimals]) => {
      const move = previous ? (value / previous - 1) * 100 : 0;
      $(`#${id}Price`).textContent = label;
      const moveEl = $(`#${id}Move`);
      moveEl.textContent = `${move >= 0 ? '+' : ''}${move.toFixed(decimals)}%`;
      moveEl.style.color = move >= 0 ? 'var(--green)' : 'var(--red)';
    });
  }

  function renderEquityChart() {
    const values = state.navHistory.length >= 2 ? state.navHistory : [1_000_000, 1_000_000];
    const min = Math.min(...values) * .995;
    const max = Math.max(...values) * 1.005;
    const range = max - min || 1;
    const points = values.map((v,i) => {
      const x = (i / (values.length - 1)) * 260;
      const y = 67 - ((v-min)/range)*58;
      return [x,y];
    });
    $('#equityLine').setAttribute('points', points.map(p => p.join(',')).join(' '));
    const area = `M ${points[0][0]} 72 L ${points.map(p => p.join(' ')).join(' L ')} L ${points.at(-1)[0]} 72 Z`;
    $('#equityArea').setAttribute('d', area);
    $('#equityArea').setAttribute('fill', 'rgba(87,230,255,.18)');
  }

  function renderTabs() {
    $$('.panel-tab').forEach(b => b.classList.toggle('active', b.dataset.leftTab === activeLeftTab));
    $$('.left-section').forEach(s => s.classList.toggle('active', s.id === `left-${activeLeftTab}`));
  }

  function renderActiveDeals() {
    const container = $('#activeDealsList');
    if (!state.activeDeals.length) {
      container.innerHTML = '<div class="empty-card">Nessuna operazione aperta.<br>Apri la scheda Opportunità e scegli una rotta sul globo.</div>';
      return;
    }
    container.innerHTML = state.activeDeals.map(deal => {
      const opp = getOpportunity(deal.opportunityId);
      const progress = computeDealProgress(deal);
      const pnl = computeUnrealizedPnl(deal);
      return `<button class="deal-card ${selected.type === 'deal' && selected.id === deal.id ? 'selected' : ''}" data-deal-id="${deal.id}">
        <div class="deal-card-head"><span class="route-name">${getHub(opp.origin).name} <span class="route-arrow">→</span> ${getHub(opp.destination).name}</span><span class="status-pill ${deal.pendingDecision ? 'high' : ''}">${deal.pendingDecision ? 'Decisione' : Math.round(progress*100)+'%'}</span></div>
        <div class="deal-card-meta"><div><span>Unrealized P&amp;L</span><strong style="color:${pnl >= 0 ? 'var(--green)' : 'var(--red)'}">${money(pnl)}</strong></div><div><span>ETA</span><strong>${Math.max(0, deal.duration-deal.elapsed)} giorni</strong></div><div><span>Hedge</span><strong>${deal.hedgeRatio || 0}%</strong></div><div><span>Ops ready</span><strong>${Math.round(operationsReadiness(deal))}%</strong></div></div>
        <div class="progress-track"><span style="width:${progress*100}%"></span></div>
      </button>`;
    }).join('');
    $$('[data-deal-id]', container).forEach(button => button.addEventListener('click', () => selectDeal(button.dataset.dealId)));
  }

  function renderHistory() {
    const container = $('#historyList');
    if (!state.history.length) {
      container.innerHTML = '<div class="empty-card">Il track record comparirà dopo il primo deal chiuso.</div>';
      return;
    }
    container.innerHTML = state.history.map(item => {
      const opp = getOpportunity(item.opportunityId);
      return `<button class="history-card ${selected.type==='history'&&selected.id===item.id?'selected':''}" data-history-id="${item.id}"><div class="history-card-head"><span class="route-name">${opp.title}</span><strong class="history-pnl ${item.pnl >= 0 ? 'positive' : 'negative'}">${money(item.pnl)}</strong></div><div class="deal-card-meta"><div><span>Durata</span><strong>${item.days} giorni</strong></div><div><span>Ops score</span><strong>${Math.round(item.operationalReadiness ?? 100)}%</strong></div><div><span>Margin calls</span><strong>${item.marginCalls||0}</strong></div><div><span>FX hedge</span><strong>${item.fxHedgeRatio||0}%</strong></div></div></button>`;
    }).join('');
    $$('[data-history-id]',container).forEach(button=>button.addEventListener('click',()=>selectHistory(button.dataset.historyId)));
  }

  function renderInventory() {
    const summary = $('#inventorySummary');
    const container = $('#inventoryList');
    const tonnes = state.activeDeals.reduce((sum, deal) => sum + (deal.quantity || getOpportunity(deal.opportunityId).quantity), 0);
    const value = state.activeDeals.reduce((sum, deal) => {
      const opp = getOpportunity(deal.opportunityId);
      return sum + physicalNotional(opp, deal.quantity || opp.quantity, deal.capital);
    }, 0);
    const inTransit = state.activeDeals.filter(d => dealPhase(d).key === 'transit').length;
    const atPort = state.activeDeals.filter(d => dealPhase(d).key === 'port').length;
    summary.innerHTML = `
      <div><span>Physical tonnes</span><strong>${tonnes.toLocaleString('en-US')} t</strong></div>
      <div><span>Marked value</span><strong>${money(value, true)}</strong></div>
      <div><span>In transit</span><strong>${inTransit} cargo</strong></div>
      <div><span>At port</span><strong>${atPort} cargo</strong></div>`;
    if (!state.activeDeals.length) {
      container.innerHTML = '<div class="empty-card">Nessun inventario fisico. Avvia un deal dal Market per aprire il primo cargo.</div>';
      return;
    }
    container.innerHTML = state.activeDeals.map(deal => {
      const opp = getOpportunity(deal.opportunityId);
      const phase = dealPhase(deal);
      const quantity = deal.quantity || opp.quantity;
      const value = physicalNotional(opp, quantity, deal.capital);
      const progress = computeDealProgress(deal);
      return `<button class="inventory-card" data-inventory-deal="${deal.id}">
        <div class="inventory-head"><strong>${quantity} t ${opp.commodity}</strong><span class="phase-chip ${phase.key}">${phase.label}</span></div>
        <div class="inventory-grid">
          <div><span>Location</span><strong>${phase.location}</strong></div>
          <div><span>Market value</span><strong>${money(value, true)}</strong></div>
          <div><span>Transport</span><strong>${opp.transportMode}</strong></div>
          <div><span>Insured</span><strong>110% cargo value</strong></div>
        </div>
        <div class="progress-track"><span style="width:${progress*100}%"></span></div>
      </button>`;
    }).join('');
    $$('[data-inventory-deal]', container).forEach(button => button.addEventListener('click', () => selectDeal(button.dataset.inventoryDeal)));
  }


  function renderOperations() {
    const summary = $('#operationsSummary');
    const container = $('#operationsList');
    if (!summary || !container) return;
    const allDeals = state.activeDeals.map(updateDealOperations);
    const docs = allDeals.flatMap(d => d.operations.documents);
    const readyDocs = docs.filter(d => d.status === 'ready').length;
    const blockedDocs = docs.filter(d => d.status === 'blocked').length;
    const activeStorage = allDeals.filter(d => d.operations.storage.active).length;
    const avgReadiness = allDeals.length ? allDeals.reduce((s,d)=>s+operationsReadiness(d),0)/allDeals.length : 0;
    summary.innerHTML = `
      <div><span>Open contracts</span><strong>${allDeals.length * 2}</strong></div>
      <div><span>Document readiness</span><strong>${docs.length ? Math.round(readyDocs/docs.length*100) : 0}%</strong></div>
      <div><span>Blocked documents</span><strong style="color:${blockedDocs?'var(--red)':'var(--green)'}">${blockedDocs}</strong></div>
      <div><span>Active storage</span><strong>${activeStorage}</strong></div>`;
    if (!allDeals.length) {
      container.innerHTML = '<div class="empty-card">Nessuna catena operativa aperta. Avvia un deal per generare contratti, booking e documenti.</div>';
      return;
    }
    container.innerHTML = allDeals.map(deal => {
      const opp = getOpportunity(deal.opportunityId);
      const ops = deal.operations;
      const readiness = operationsReadiness(deal);
      const blocked = ops.documents.filter(d => d.status === 'blocked').length;
      return `<button class="operations-card" data-operations-deal="${deal.id}">
        <div class="operations-head"><div><span>${ops.contractId}</span><strong>${opp.title}</strong></div><div class="readiness-ring" style="--value:${readiness}"><strong>${Math.round(readiness)}%</strong></div></div>
        <div class="operations-grid">
          <div><span>Carrier</span><strong>${ops.transport.carrier}</strong></div>
          <div><span>Transport status</span><strong>${ops.transport.status}</strong></div>
          <div><span>Storage</span><strong>${ops.storage.active ? 'Active' : ops.storage.reserved ? 'Reserved' : 'Not booked'}</strong></div>
          <div><span>Exceptions</span><strong style="color:${blocked?'var(--red)':'var(--green)'}">${blocked ? blocked+' blocked' : 'None'}</strong></div>
        </div>
        <div class="document-strip">${ops.documents.map(d=>`<i class="document-dot ${d.status}"></i>`).join('')}</div>
      </button>`;
    }).join('');
    $$('[data-operations-deal]', container).forEach(button => button.addEventListener('click', () => selectDeal(button.dataset.operationsDeal)));
  }


  function renderFleet() {
    const summary = $('#fleetSummary');
    const container = $('#fleetList');
    const market = $('#charterMarketList');
    if (!summary || !container || !market) return;
    const assigned = state.fleetAssets.filter(v => v.status === 'assigned').length;
    const available = state.fleetAssets.filter(v => v.status === 'available').length;
    const capacity = state.fleetAssets.reduce((sum, asset) => sum + (getVesselCatalog(asset.catalogId)?.capacity || 0), 0);
    summary.innerHTML = `
      <div><span>Chartered assets</span><strong>${state.fleetAssets.length}</strong></div>
      <div><span>Available</span><strong>${available}</strong></div>
      <div><span>Assigned</span><strong>${assigned}</strong></div>
      <div><span>Total capacity</span><strong>${capacity.toLocaleString('en-US')} t</strong></div>`;
    if (!state.fleetAssets.length) {
      container.innerHTML = '<div class="empty-card">Nessuna nave sotto controllo. Noleggia il primo asset dal charter market.</div>';
    } else {
      container.innerHTML = state.fleetAssets.map(asset => {
        const vessel = getVesselCatalog(asset.catalogId);
        const deal = asset.assignedDealId ? getActiveDeal(asset.assignedDealId) : null;
        return `<button class="fleet-card ${selected.type === 'vessel' && selected.id === asset.id ? 'selected' : ''}" data-fleet-asset="${asset.id}">
          <div class="fleet-card-head"><div><span>${vessel.vesselClass}</span><strong>${vessel.name}</strong></div><span class="status-pill ${asset.status === 'assigned' ? 'medium' : 'low'}">${asset.status}</span></div>
          <div class="fleet-grid">
            <div><span>Position</span><strong>${getHub(asset.positionHub)?.name || 'At sea'}</strong></div>
            <div><span>Capacity</span><strong>${vessel.capacity.toLocaleString('en-US')} t</strong></div>
            <div><span>Charter remaining</span><strong>${asset.daysRemaining} days</strong></div>
            <div><span>Allocation</span><strong>${deal ? getOpportunity(deal.opportunityId).title : 'Open'}</strong></div>
          </div>
          <div class="charter-life"><span style="width:${asset.daysRemaining/asset.charterDays*100}%"></span></div>
        </button>`;
      }).join('');
      $$('[data-fleet-asset]', container).forEach(button => button.addEventListener('click', () => selectVessel(button.dataset.fleetAsset)));
    }
    market.innerHTML = vesselCatalog.map(vessel => {
      const unlocked = vesselUnlocked(vessel);
      const owned = state.fleetAssets.some(asset => asset.catalogId === vessel.id);
      const displayedHire = charterHireCost(vessel);
      const canAfford = state.cash >= displayedHire;
      return `<div class="charter-card ${unlocked ? '' : 'locked'}">
        <div class="fleet-card-head"><div><span>${vessel.vesselClass}</span><strong>${vessel.name}</strong></div><span class="status-pill ${unlocked ? 'low' : 'high'}">${unlocked ? 'Available' : 'Locked'}</span></div>
        <p>${vessel.description}</p>
        <div class="fleet-grid">
          <div><span>Capacity</span><strong>${vessel.capacity.toLocaleString('en-US')} t</strong></div>
          <div><span>Position</span><strong>${getHub(vessel.homeHub).name}</strong></div>
          <div><span>Charter block</span><strong>${vessel.charterDays} days</strong></div>
          <div><span>Upfront hire</span><strong>${money(displayedHire)}</strong></div>
        </div>
        <button class="button secondary charter-button" data-charter-vessel="${vessel.id}" ${!unlocked || owned || !canAfford ? 'disabled' : ''}>${owned ? 'Already chartered' : unlocked ? 'Start time charter' : vessel.requiresOffice && !officeOwned(vessel.requiresOffice) ? `Requires ${getOffice(vessel.requiresOffice).name}` : `Requires rep ${vessel.minReputation}`}</button>
      </div>`;
    }).join('');
    $$('[data-charter-vessel]', market).forEach(button => button.addEventListener('click', () => charterVessel(button.dataset.charterVessel)));
  }

  function renderRiskDashboard() {
    const container = $('#riskDashboard');
    const risk = riskStats();
    const riskClass = risk.riskScore < 35 ? 'low' : risk.riskScore < 68 ? 'medium' : 'high';
    const largestCommodity = Object.entries(risk.grossByCommodity).sort((a,b) => b[1]-a[1])[0];
    const warnings = [];
    if (risk.creditUtilization > .75) warnings.push('La linea di credito è utilizzata oltre il 75%.');
    if (risk.concentration > .65 && state.activeDeals.length > 1) warnings.push('Il portafoglio è concentrato su un singolo deal.');
    if (risk.liquidityCoverage < 1.25) warnings.push('La liquidità potrebbe non coprire margin call e costi imprevisti.');
    if (risk.netFlatExposure > 1_000_000) warnings.push('L’esposizione flat-price non coperta supera $1 milione.');
    if (risk.netFxExposure > 500_000) warnings.push('L’esposizione valutaria residua è significativa.');
    if (risk.marginRequirement > state.cash * 1.5) warnings.push('Il collateral futures è elevato rispetto alla liquidità disponibile.');
    container.innerHTML = `
      <div class="risk-card">
        <div class="risk-headline"><span>Desk risk score</span><strong>${riskClass.toUpperCase()}</strong></div>
        <div class="risk-score">${Math.round(risk.riskScore)}<small style="font-size:11px;color:var(--muted)"> / 100</small></div>
        <div class="risk-meter"><span style="width:${risk.riskScore}%"></span></div>
      </div>
      <div class="risk-card">
        <div class="risk-headline"><strong>Core metrics</strong><span>Live</span></div>
        <div class="risk-row"><span>Net flat-price exposure</span><strong>${money(risk.netFlatExposure, true)}</strong></div>
        <div class="risk-row"><span>Net FX exposure</span><strong>${money(risk.netFxExposure, true)}</strong></div>
        <div class="risk-row"><span>Futures margin requirement</span><strong>${money(risk.marginRequirement, true)}</strong></div>
        <div class="risk-row"><span>Stress loss estimate</span><strong>${money(risk.stressLoss, true)}</strong></div>
        <div class="risk-row"><span>Credit utilization</span><strong>${(risk.creditUtilization*100).toFixed(1)}%</strong></div>
        <div class="risk-row"><span>Largest deal concentration</span><strong>${(risk.concentration*100).toFixed(1)}%</strong></div>
        <div class="risk-row"><span>Liquidity coverage</span><strong>${risk.liquidityCoverage.toFixed(1)}×</strong></div>
        <div class="risk-row"><span>Margin reserve estimate</span><strong>${money(risk.liquidityReserve, true)}</strong></div>
      </div>
      <div class="risk-card">
        <div class="risk-headline"><strong>Risk allocation</strong><span>${largestCommodity ? largestCommodity[0] : 'No positions'}</span></div>
        <div class="risk-bars">
          <div class="risk-bar-row"><div><span>Credit</span><strong>${(risk.creditUtilization*100).toFixed(0)}%</strong></div><div class="capital-bar"><span class="${risk.creditUtilization<.5?'low':risk.creditUtilization<.8?'medium':'high'}" style="width:${clamp(risk.creditUtilization*100,0,100)}%"></span></div></div>
          <div class="risk-bar-row"><div><span>Concentration</span><strong>${(risk.concentration*100).toFixed(0)}%</strong></div><div class="capital-bar"><span class="${risk.concentration<.5?'low':risk.concentration<.75?'medium':'high'}" style="width:${clamp(risk.concentration*100,0,100)}%"></span></div></div>
          <div class="risk-bar-row"><div><span>Liquidity stress</span><strong>${risk.liquidityCoverage.toFixed(1)}×</strong></div><div class="capital-bar"><span class="${risk.liquidityCoverage>2?'low':risk.liquidityCoverage>1?'medium':'high'}" style="width:${clamp(100/risk.liquidityCoverage,8,100)}%"></span></div></div>
        </div>
      </div>
      ${warnings.length ? warnings.map(w => `<div class="risk-alert">${w}</div>`).join('') : '<div class="success-box">Il portafoglio è entro i limiti operativi del desk.</div>'}`;
  }

  function renderOpportunityList() {
    const container = $('#opportunityList');
    const summary = $('#marketCycleSummary');
    if (summary) {
      const accepted = Object.values(state.negotiations || {}).filter(n => n.cycle === state.marketCycle && n.status === 'accepted').length;
      summary.innerHTML = `
        <div><span>Market cycle</span><strong>#${state.marketCycle}</strong></div>
        <div><span>Refresh in</span><strong>${Math.max(0, 7-state.marketCycleDay)} days</strong></div>
        <div><span>Accepted bids</span><strong>${accepted}</strong></div>
        <div><span>Active crises</span><strong>${state.activeGlobalEvents.length}</strong></div>`;
    }
    container.innerHTML = opportunities.map(opp => {
      const unlocked = isOpportunityUnlocked(opp);
      const available = opportunityAvailable(opp);
      const origin = getHub(opp.origin);
      const destination = getHub(opp.destination);
      const selectedClass = selected.type === 'opportunity' && selected.id === opp.id ? 'selected' : '';
      const economics = opportunityEconomics(opp);
      const negotiation = state.negotiations?.[opp.id];
      const status = !unlocked ? 'Locked' : !available ? 'Taken' : negotiation?.status === 'accepted' ? 'Bid accepted' : negotiation?.status === 'rejected' ? 'Revise bid' : `${economics.expiresIn}d left`;
      const statusClass = !unlocked || !available ? 'high' : negotiation?.status === 'accepted' ? 'low' : negotiation?.status === 'rejected' ? 'medium' : opp.riskClass;
      return `<button class="opportunity-card ${selectedClass} ${unlocked && available ? '' : 'locked'}" data-opportunity-id="${opp.id}" ${unlocked && available ? '' : 'disabled'}>
        <div class="opportunity-card-head"><span class="route-name">${origin.name} <span class="route-arrow">→</span> ${destination.name}</span><span class="status-pill ${statusClass}">${status}</span></div>
        <div class="offer-line"><strong>${economics.quantity.toLocaleString('en-US')} t ${opp.commodity}</strong><span>Cycle ${state.marketCycle}</span></div>
        <div class="deal-card-meta"><div><span>Expected P&amp;L</span><strong>${money(economics.expectedPnl)}</strong></div><div><span>Equity richiesta</span><strong>${money(economics.equity, true)}</strong></div></div>
        <div class="opportunity-card-meta"><div><span>Durata</span><strong>${economics.duration} giorni</strong></div><div><span>Acceptance</span><strong>${Math.round(economics.acceptance)}%</strong></div></div>
        ${economics.crisisLabels.length ? `<div class="crisis-tag">Impacted · ${economics.crisisLabels.join(', ')}</div>` : ''}
      </button>`;
    }).join('');
    $$('[data-opportunity-id]', container).forEach(button => button.addEventListener('click', () => selectOpportunity(button.dataset.opportunityId)));
  }

  function renderCounterparties() {
    const summary = $('#counterpartySummary');
    const container = $('#counterpartyList');
    if (!summary || !container) return;
    const exposures = {};
    state.activeDeals.forEach(deal => {
      [deal.supplierId, deal.buyerId].filter(Boolean).forEach(id => { exposures[id] = (exposures[id] || 0) + (deal.capital || 0); });
    });
    const avgRelationship = counterpartyCatalog.reduce((sum, p) => sum + getCounterpartyState(p.id).relationship, 0) / counterpartyCatalog.length;
    summary.innerHTML = `
      <div><span>Approved KYC</span><strong>${counterpartyCatalog.filter(p=>p.kyc==='Approved').length}/${counterpartyCatalog.length}</strong></div>
      <div><span>Avg relationship</span><strong>${Math.round(avgRelationship)}/100</strong></div>
      <div><span>Active exposure</span><strong>${money(Object.values(exposures).reduce((a,b)=>a+b,0), true)}</strong></div>
      <div><span>Disputes</span><strong>${counterpartyCatalog.reduce((sum,p)=>sum+(getCounterpartyState(p.id).disputes||0),0)}</strong></div>`;
    container.innerHTML = counterpartyCatalog.map(party => {
      const record = getCounterpartyState(party.id);
      const exposure = exposures[party.id] || 0;
      const relClass = record.relationship >= 65 ? 'low' : record.relationship >= 45 ? 'medium' : 'high';
      return `<div class="counterparty-card">
        <div class="counterparty-head"><div><span>${party.type} · ${party.country}</span><strong>${party.name}</strong></div><span class="status-pill ${party.kyc === 'Approved' ? 'low' : 'medium'}">${party.kyc}</span></div>
        <p>${party.description}</p>
        <div class="counterparty-grid"><div><span>Credit score</span><strong>${party.credit}/100</strong></div><div><span>Reliability</span><strong>${party.reliability}/100</strong></div><div><span>Relationship</span><strong>${record.relationship}/100</strong></div><div><span>Exposure</span><strong>${money(exposure,true)}</strong></div></div>
        <div class="relationship-bar"><span class="${relClass}" style="width:${record.relationship}%"></span></div>
        <div class="counterparty-foot"><span>${record.deals || 0} completed deals</span><span>${record.disputes || 0} disputes</span></div>
      </div>`;
    }).join('');
  }

  function renderWorldEvents() {
    const summary = $('#worldSummary');
    const container = $('#worldEventList');
    if (!summary || !container) return;
    const active = activeCrisisDefinitions();
    summary.innerHTML = `
      <div><span>Active disruptions</span><strong>${active.length}</strong></div>
      <div><span>Freight index</span><strong>${state.freightIndex.toFixed(1)}</strong></div>
      <div><span>Effective credit</span><strong>${money(effectiveCreditLimit(),true)}</strong></div>
      <div><span>Next risk window</span><strong>${Math.max(0,(state.nextGlobalEventDay||0)-state.dayIndex)}d</strong></div>`;
    const activeHtml = active.length ? active.map(event => `<div class="world-event-card active ${event.severity}">
      <div class="world-event-head"><div><span>${event.region}</span><strong>${event.title}</strong></div><span class="status-pill ${event.severity}">${event.remaining}d</span></div>
      <p>${event.description}</p>
      <div class="world-impact">${event.creditPenalty ? `${money(event.creditPenalty,true)} temporary credit reduction` : event.freightShock ? `Freight shock +${event.freightShock} points` : event.commodity ? `${event.commodity} price pressure` : 'Operational disruption'}</div>
    </div>`).join('') : '<div class="success-box">Nessuna crisi globale attiva. Le rotte operano in condizioni normali.</div>';
    const feedHtml = (state.worldEventFeed || []).map(item => `<div class="intelligence-item ${item.type}"><span>${formatDate(new Date(item.date))}</span><strong>${item.title}</strong><p>${item.description}</p></div>`).join('');
    container.innerHTML = `${activeHtml}<div class="section-head history-head"><div><span class="eyebrow">Intelligence feed</span><h2>Ultimi sviluppi</h2></div></div>${feedHtml || '<div class="empty-card">La global intelligence feed si aggiornerà con il tempo.</div>'}`;
  }

  function renderFinance() {
    const summary = $('#financeSummary');
    const dealList = $('#financeDealList');
    const banking = $('#bankingList');
    if (!summary || !dealList || !banking) return;
    const stats = portfolioStats();
    const collateral = stats.marginCollateral || 0;
    const interest = state.activeDeals.reduce((sum,deal)=>sum+(deal.financingAccrued||0),0);
    summary.innerHTML = `
      <div><span>Credit used</span><strong>${money(stats.creditUsed,true)}</strong></div>
      <div><span>Credit available</span><strong>${money(stats.creditAvailable,true)}</strong></div>
      <div><span>Futures collateral</span><strong>${money(collateral,true)}</strong></div>
      <div><span>Interest accrued</span><strong>${money(interest)}</strong></div>
      <div><span>Margin calls</span><strong>${state.marginCalls||0}</strong></div>
      <div><span>Emergency fees</span><strong>${money(state.emergencyFundingCost||0)}</strong></div>`;
    dealList.innerHTML = state.activeDeals.length ? state.activeDeals.map(deal => {
      const opp = getOpportunity(deal.opportunityId);
      const required = currentMarginRequirement(deal);
      const coverage = required ? (deal.marginCollateral||0)/required : 1;
      return `<button class="finance-card" data-finance-deal="${deal.id}">
        <div class="finance-card-head"><div><span>${opp.commodity} · ${opp.title}</span><strong>${financingProfiles[deal.financingStrategy||'revolver']?.label}</strong></div><span class="status-pill ${coverage>=1?'low':'high'}">${Math.round(coverage*100)}% margin</span></div>
        <div class="finance-grid"><div><span>Debt</span><strong>${money(deal.borrowed,true)}</strong></div><div><span>Rate</span><strong>${((deal.financingRate||0)*100).toFixed(1)}%</strong></div><div><span>Collateral</span><strong>${money(deal.marginCollateral||0,true)}</strong></div><div><span>Interest</span><strong>${money(deal.financingAccrued||0)}</strong></div></div>
        <div class="capital-bar margin"><span style="width:${clamp(coverage*100,0,100)}%"></span></div>
      </button>`;
    }).join('') : '<div class="empty-card">Nessun funding attivo. Apri un deal per utilizzare linee, LC e futures collateral.</div>';
    banking.innerHTML = bankCatalog.map(bank => {
      const unlocked = bank.id !== 'oceanic' || officeOwned('singapore');
      const capacity = effectiveCreditLimit()*bank.limitShare;
      const used = stats.creditUsed*bank.limitShare;
      return `<div class="bank-card ${unlocked?'':'locked'}"><div class="finance-card-head"><div><span>${bank.type}</span><strong>${bank.name}</strong></div><span class="status-pill ${unlocked?'low':'high'}">${unlocked?'Active':'Locked'}</span></div><p>${bank.description}</p><div class="finance-grid"><div><span>Capacity</span><strong>${money(capacity,true)}</strong></div><div><span>Indicative rate</span><strong>${(bank.rate*100).toFixed(1)}%</strong></div><div><span>Relationship</span><strong>${bank.relationship}/100</strong></div><div><span>Allocated</span><strong>${money(used,true)}</strong></div></div></div>`;
    }).join('');
    $$('[data-finance-deal]',dealList).forEach(button=>button.addEventListener('click',()=>selectDeal(button.dataset.financeDeal)));
  }

  function completeAcademyLesson(id, answer) {
    const lesson = academyCatalog.find(item=>item.id===id);
    if (!lesson) return;
    state.academyProgress = state.academyProgress || {};
    const current = state.academyProgress[id] || { attempts: 0, completed: false };
    current.attempts += 1;
    if (Number(answer) === lesson.correct) {
      if (!current.completed) {
        current.completed = true;
        current.completedAt = state.date;
        state.academyScore = (state.academyScore||0)+100;
        state.cash += 12_000;
        state.reputation = clamp(state.reputation+1,0,100);
        showToast(`Lezione completata: ${lesson.title}. Reward ${money(12_000)}.`);
      }
    } else {
      current.lastWrong = Number(answer);
      showToast('Risposta non corretta. Rileggi il concetto e riprova.');
    }
    state.academyProgress[id]=current;
    evaluateMissions();
    saveState();
    renderAll();
  }

  function renderAcademy() {
    const summary = $('#academySummary');
    const lessons = $('#academyLessonList');
    const glossary = $('#glossaryList');
    if (!summary || !lessons || !glossary) return;
    const completed = academyCatalog.filter(item=>state.academyProgress?.[item.id]?.completed).length;
    const dealExperience = state.completedDeals + state.activeDeals.length;
    summary.innerHTML = `<div><span>Lessons complete</span><strong>${completed}/${academyCatalog.length}</strong></div><div><span>Academy score</span><strong>${state.academyScore||0}</strong></div><div><span>Field experience</span><strong>${dealExperience} cargo</strong></div><div><span>Difficulty</span><strong>${state.difficulty}</strong></div>`;
    lessons.innerHTML = academyCatalog.map((lesson,index)=>{
      const progress=state.academyProgress?.[lesson.id]||{};
      const unlocked=index===0 || academyCatalog.slice(0,index).every(previous=>state.academyProgress?.[previous.id]?.completed) || state.difficulty==='guided';
      return `<div class="academy-card ${progress.completed?'completed':unlocked?'':'locked'}"><div class="academy-head"><div><span>Module ${index+1}</span><strong>${lesson.title}</strong></div><span class="status-pill ${progress.completed?'low':unlocked?'medium':'high'}">${progress.completed?'Complete':unlocked?'Open':'Locked'}</span></div><p>${lesson.concept}</p>${unlocked&&!progress.completed?`<div class="academy-question"><strong>${lesson.question}</strong>${lesson.options.map((option,i)=>`<button data-academy-answer="${lesson.id}" data-answer-index="${i}">${option}</button>`).join('')}</div>`:progress.completed?'<div class="success-box">Conoscenza verificata e applicabile nei deal.</div>':'<div class="warning-box">Completa il modulo precedente per sbloccare questa lezione.</div>'}</div>`;
    }).join('');
    glossary.innerHTML = glossaryCatalog.map(([term,definition])=>`<details class="glossary-item"><summary>${term}</summary><p>${definition}</p></details>`).join('');
    $$('[data-academy-answer]',lessons).forEach(button=>button.addEventListener('click',()=>completeAcademyLesson(button.dataset.academyAnswer,button.dataset.answerIndex)));
  }

  function renderEmpire() {
    const summary=$('#investmentSummary'), queue=$('#builderQueue'), container=$('#investmentList');
    if(!summary||!queue||!container) return;
    const levels=totalInvestmentLevels(), income=dailyInvestmentIncome(), book=investmentBookValue(), active=activeConstructionCount();
    summary.innerHTML=`<div><span>Industrial levels</span><strong>${levels}</strong></div><div><span>Asset book value</span><strong>${money(book,true)}</strong></div><div><span>Daily asset income</span><strong>${money(income)}</strong></div><div><span>Project teams</span><strong>${active}/${builderSlots()}</strong></div>`;
    const builds=investmentCatalog.filter(asset=>investmentRecord(asset.id).buildingTo);
    queue.innerHTML=builds.length?builds.map(asset=>{const r=investmentRecord(asset.id);const total=investmentBuildDays(asset,r.buildingTo);const pct=(1-r.daysRemaining/total)*100;return `<div class="builder-card"><div><span>${asset.chain} construction</span><strong>${asset.name} · L${r.buildingTo}</strong><small>${r.daysRemaining} giorni rimanenti</small></div><div class="progress-track"><span style="width:${pct}%"></span></div></div>`}).join(''):`<div class="empty-card compact">Nessun progetto in costruzione. Hai ${builderSlots()} project team disponibili.</div>`;
    const visible=investmentCatalog.filter(asset=>selectedEmpireChain==='all'||asset.chain===selectedEmpireChain);
    container.innerHTML=visible.map(asset=>{
      const r=investmentRecord(asset.id), level=r.level||0, target=level+1, max=level>=asset.maxLevel, unlocked=investmentUnlocked(asset), building=Boolean(r.buildingTo), cost=max?0:investmentCost(asset,target), days=max?0:investmentBuildDays(asset,target);
      const benefits=[asset.dailyIncome?`${money(asset.dailyIncome*level)}/day`:null,asset.pnlBonus?`+${money(asset.pnlBonus*level)} deal edge`:null,asset.durationBonus&&level?`-${asset.durationBonus*level} days`:null].filter(Boolean).join(' · ');
      return `<article class="investment-card chain-${asset.chain} ${building?'building':''} ${!unlocked?'locked':''}" data-investment-card="${asset.id}"><div class="investment-card-top"><div class="asset-icon">${asset.icon}</div><div><span>${asset.chain}</span><strong>${asset.name}</strong><small>${getHub(asset.hub)?.name||''}</small></div><b>L${level}/${asset.maxLevel}</b></div><p>${asset.description}</p><div class="asset-level-track">${Array.from({length:asset.maxLevel},(_,i)=>`<i class="${i<level?'filled':''} ${r.buildingTo===i+1?'building':''}"></i>`).join('')}</div><div class="investment-benefit">${level?benefits:'Nessun beneficio attivo — costruisci il livello 1'}</div><div class="investment-economics"><div><span>Upgrade cost</span><strong>${max?'MAX':money(cost)}</strong></div><div><span>Build time</span><strong>${max?'—':`${days} days`}</strong></div></div><button class="button ${building?'secondary':'primary'} investment-action" data-build-investment="${asset.id}" ${max||building||!unlocked||state.cash<cost||activeConstructionCount()>=builderSlots()?'disabled':''}>${building?`Building L${r.buildingTo} · ${r.daysRemaining}d`:max?'Maximum level':unlocked?`Build level ${target}`:`Requires rep ${asset.minReputation} · ${asset.minDeals} deals`}</button></article>`;
    }).join('');
    $$('[data-empire-chain]').forEach(button=>button.classList.toggle('active',button.dataset.empireChain===selectedEmpireChain));
    $$('[data-empire-chain]').forEach(button=>button.onclick=()=>{selectedEmpireChain=button.dataset.empireChain;renderEmpire();});
    $$('[data-build-investment]',container).forEach(button=>button.onclick=()=>startInvestment(button.dataset.buildInvestment));
    $$('[data-investment-card]',container).forEach(card=>card.addEventListener('click',event=>{if(event.target.closest('button'))return;selectInvestment(card.dataset.investmentCard);}));
  }

  function renderHQ() {
    const summary = $('#hqSummary');
    const officesContainer = $('#officeList');
    const staffContainer = $('#staffList');
    if (!summary || !officesContainer || !staffContainer) return;
    summary.innerHTML = `
      <div><span>Regional desks</span><strong>${state.offices.length}/${officeCatalog.length}</strong></div>
      <div><span>Team members</span><strong>${state.staff.length}/${staffCatalog.length}</strong></div>
      <div><span>Daily overhead</span><strong>${money(dailyOverhead())}</strong></div>
      <div><span>Total overhead paid</span><strong>${money(state.overheadPaid || 0, true)}</strong></div>`;
    officesContainer.innerHTML = officeCatalog.map(office => {
      const owned = officeOwned(office.id);
      const unlocked = officeUnlocked(office);
      return `<div class="management-card ${owned ? 'owned' : unlocked ? '' : 'locked'}">
        <div class="management-head"><div><span>Regional office</span><strong>${office.name}</strong></div><span class="status-pill ${owned ? 'low' : unlocked ? 'medium' : 'high'}">${owned ? 'Active' : unlocked ? 'Available' : 'Locked'}</span></div>
        <p>${office.description}</p><div class="management-benefit">${office.benefit}</div>
        <div class="management-grid"><div><span>Opening cost</span><strong>${office.cost ? money(office.cost) : 'Included'}</strong></div><div><span>Daily cost</span><strong>${money(office.dailyCost)}</strong></div></div>
        ${office.id === 'geneva' ? '' : `<button class="button secondary management-action" data-open-office="${office.id}" ${owned || !unlocked || state.cash < office.cost ? 'disabled' : ''}>${owned ? 'Desk active' : unlocked ? 'Open regional desk' : `Requires rep ${office.minReputation}`}</button>`}
      </div>`;
    }).join('');
    staffContainer.innerHTML = staffCatalog.map(member => {
      const hired = hasStaff(member.id);
      const unlocked = staffUnlocked(member);
      return `<div class="management-card ${hired ? 'owned' : unlocked ? '' : 'locked'}">
        <div class="management-head"><div><span>Specialist</span><strong>${member.role}</strong></div><span class="status-pill ${hired ? 'low' : unlocked ? 'medium' : 'high'}">${hired ? 'Hired' : unlocked ? 'Available' : 'Locked'}</span></div>
        <p>${member.description}</p><div class="management-benefit">${member.benefit}</div>
        <div class="management-grid"><div><span>Hiring cost</span><strong>${money(member.hireCost)}</strong></div><div><span>Daily salary</span><strong>${money(member.dailySalary)}</strong></div></div>
        <button class="button secondary management-action" data-hire-staff="${member.id}" ${hired || !unlocked || state.cash < member.hireCost ? 'disabled' : ''}>${hired ? 'In team' : unlocked ? 'Hire specialist' : `Requires rep ${member.minReputation}`}</button>
      </div>`;
    }).join('');
    $$('[data-open-office]', officesContainer).forEach(button => button.addEventListener('click', () => openOffice(button.dataset.openOffice)));
    $$('[data-hire-staff]', staffContainer).forEach(button => button.addEventListener('click', () => hireStaff(button.dataset.hireStaff)));
  }

  function renderCareer() {
    const summary = $('#careerSummary');
    const container = $('#missionList');
    if (!summary || !container) return;
    const completed = state.completedMissions.length;
    summary.innerHTML = `
      <div><span>Rank</span><strong>${rankFromState()}</strong></div>
      <div><span>Missions</span><strong>${completed}/${missionCatalog.length}</strong></div>
      <div><span>Completed deals</span><strong>${state.completedDeals}</strong></div>
      <div><span>Reputation</span><strong>${Math.round(state.reputation)}/100</strong></div>`;
    container.innerHTML = missionCatalog.map(mission => {
      const done = state.completedMissions.includes(mission.id);
      const progress = Math.min(mission.target, mission.progress(state));
      const pct = mission.target ? progress / mission.target * 100 : 100;
      const rewards = [mission.cash ? money(mission.cash) : null, mission.credit ? `${money(mission.credit)} credit` : null, mission.reputation ? `+${mission.reputation} rep` : null].filter(Boolean).join(' · ');
      return `<div class="mission-card ${done ? 'completed' : ''}">
        <div class="mission-head"><div><span>Career mission</span><strong>${mission.title}</strong></div><span class="status-pill ${done ? 'low' : 'medium'}">${done ? 'Complete' : `${progress}/${mission.target}`}</span></div>
        <p>${mission.description}</p><div class="mission-reward">Reward · ${rewards}</div>
        <div class="progress-track"><span style="width:${pct}%"></span></div>
      </div>`;
    }).join('');
  }

  function renderLeaderboard() {
    const summary=$('#leaderboardSummary');
    const table=$('#leaderboardTable');
    const profile=$('#leaderboardProfile');
    const history=$('#seasonHistory');
    if (!summary||!table||!profile||!history) return;
    const rows=leaderboardRows(selectedLeaderboardMode);
    const player=rows.find(row=>row.isPlayer);
    const league=leaderboardLeague();
    const nextProgress=league.next ? clamp(leaderboardScore()/league.next*100,0,100) : 100;
    summary.innerHTML=`
      <div><span>Career League</span><strong>#${player.position} / ${rows.length}</strong></div>
      <div><span>League</span><strong class="league-name ${league.className}">${league.name}</strong></div>
      <div><span>Rating</span><strong>${leaderboardScore().toLocaleString('en-US')}</strong></div>
      <div><span>Season</span><strong>S${seasonNumber()} · day ${seasonDay()}/90</strong></div>`;
    profile.innerHTML=`
      <div class="leaderboard-profile-card">
        <div class="leaderboard-avatar">${(state.profileName||'GB').split(/\s+/).map(v=>v[0]).slice(0,2).join('').toUpperCase()}</div>
        <div class="leaderboard-profile-copy"><span>Player identity</span><strong>${state.profileName}</strong><small>${state.companyName} · ${rankFromState()}</small></div>
      </div>
      <div class="leaderboard-edit-grid"><label>Trader name<input id="leaderboardTraderName" maxlength="40" value="${String(state.profileName||'').replace(/"/g,'&quot;')}"></label><label>Trading house<input id="leaderboardCompanyName" maxlength="40" value="${String(state.companyName||'').replace(/"/g,'&quot;')}"></label></div>
      <button class="button secondary leaderboard-save" id="saveLeaderboardProfile">Save identity</button>
      <div class="league-progress"><div><span>${league.name}</span><strong>${league.next?`${Math.max(0,league.next-leaderboardScore()).toLocaleString('en-US')} points to next league`:'Highest league reached'}</strong></div><div class="progress-track"><span style="width:${nextProgress}%"></span></div></div>`;
    table.innerHTML=`
      <div class="leaderboard-mode-tabs">${[['overall','Overall'],['pnl','P&L'],['operations','Operations'],['risk','Risk discipline']].map(([id,label])=>`<button data-leaderboard-mode="${id}" class="${selectedLeaderboardMode===id?'active':''}">${label}</button>`).join('')}</div>
      <div class="leaderboard-head"><span>Rank</span><span>Trading house</span><span>${selectedLeaderboardMode==='overall'?'Rating':selectedLeaderboardMode==='pnl'?'Realized P&L':selectedLeaderboardMode==='operations'?'Ops score':'Risk score'}</span></div>
      <div class="leaderboard-rows">${rows.slice(0,10).map(row=>`<div class="leaderboard-row ${row.isPlayer?'player':''}"><span class="leaderboard-position ${row.position<=3?'podium':''}">${row.position<=3?['Ⅰ','Ⅱ','Ⅲ'][row.position-1]:`#${row.position}`}</span><div><strong>${row.name}</strong><small>${row.isPlayer?row.trader:`${row.city} · ${row.country}`}</small></div><b>${formatLeaderboardMetric(row,selectedLeaderboardMode)}</b></div>`).join('')}${player.position>10?`<div class="leaderboard-divider">Your position</div><div class="leaderboard-row player"><span class="leaderboard-position">#${player.position}</span><div><strong>${player.name}</strong><small>${player.trader}</small></div><b>${formatLeaderboardMetric(player,selectedLeaderboardMode)}</b></div>`:''}</div>
      <div class="leaderboard-disclosure">Career League uses transparent simulated rivals in this offline prototype. Your score is based only on your real SHIPPY career results.</div>
      <button class="button secondary leaderboard-share" id="copyLeaderboardResult">Copy ranking result</button>`;
    history.innerHTML=(state.leaderboardSnapshots||[]).length ? state.leaderboardSnapshots.map(item=>`<div class="season-card"><div><span>Season ${item.season}</span><strong>#${item.position} · ${item.league}</strong></div><div><span>Rating</span><strong>${item.score.toLocaleString('en-US')}</strong></div><div><span>P&L</span><strong>${money(item.pnl,true)}</strong></div></div>`).join('') : '<div class="empty-card">La prima stagione verrà archiviata dopo 90 giorni di gioco.</div>';
    $$('[data-leaderboard-mode]',table).forEach(button=>button.addEventListener('click',()=>{selectedLeaderboardMode=button.dataset.leaderboardMode;renderLeaderboard();}));
    $('#saveLeaderboardProfile')?.addEventListener('click',()=>{
      const trader=$('#leaderboardTraderName')?.value.trim();
      const company=$('#leaderboardCompanyName')?.value.trim();
      if (trader) state.profileName=trader;
      if (company) state.companyName=company;
      saveState();renderAll();showToast('Identità della Career League aggiornata.');
    });
    $('#copyLeaderboardResult')?.addEventListener('click',async()=>{
      const text=`SHIPPY Career League · ${state.companyName} · #${player.position}/${rows.length} · ${league.name} · rating ${leaderboardScore()} · P&L ${money(state.realizedPnl||0)}`;
      try { await navigator.clipboard.writeText(text); showToast('Risultato copiato.'); }
      catch { showToast(text); }
    });
  }

  function renderAllLists() {
    renderActiveDeals();
    renderHistory();
    renderInventory();
    renderOperations();
    renderFleet();
    renderRiskDashboard();
    renderOpportunityList();
    renderCounterparties();
    renderWorldEvents();
    renderFinance();
    renderAcademy();
    renderEmpire();
    renderHQ();
    renderCareer();
    renderLeaderboard();
  }

  function hubInspector(hub) {
    const related = opportunities.filter(o => isOpportunityUnlocked(o) && opportunityAvailable(o) && [o.origin,o.destination,...(o.via||[])].includes(hub.id));
    return `
      <div class="location-badge">${hub.type === 'hq' ? '● Headquarters' : hub.type}</div>
      <h2>${hub.name}</h2>
      <div class="inspector-subtitle">${hub.country} · ${hub.subtitle}</div>
      <p class="inspector-subtitle" style="margin-top:12px">${hub.description}</p>
      <div class="inspector-grid">
        <div class="inspector-stat"><span>Risk level</span><strong>${hub.risk}</strong></div>
        <div class="inspector-stat"><span>Rotte disponibili</span><strong>${related.length}</strong></div>
        <div class="inspector-stat"><span>SHIPPY presence</span><strong>${officeOwned(hub.id) ? 'Regional desk' : hub.id === 'geneva' ? 'Headquarters' : 'No office'}</strong></div>
        <div class="inspector-stat"><span>Commodity access</span><strong>${hub.commodities.length}</strong></div>
      </div>
      <div class="inspector-section"><h3>Mercato locale</h3><div class="tag-row">${hub.commodities.map(c => `<span class="tag">${c}</span>`).join('')}</div></div>
      ${related.length ? `<div class="inspector-section"><h3>Opportunità collegate</h3>${related.map(o => `<button class="event-choice" data-open-opportunity="${o.id}"><strong>${o.title}</strong><small>${getHub(o.origin).name} → ${getHub(o.destination).name} · ${money(opportunityEconomics(o).basePnl)} attesi</small></button>`).join('')}</div>` : ''}
      ${hub.locked && related.length === 0 ? '<div class="warning-box">Hub non ancora accessibile. Completa più deal e aumenta la reputazione.</div>' : ''}
    `;
  }

  function opportunityInspector(opp) {
    const stats = portfolioStats();
    const origin = getHub(opp.origin);
    const destination = getHub(opp.destination);
    const negotiation = negotiationFor(opp.id);
    const economics = opportunityEconomics(opp, negotiation);
    const requiredEquity = economics.equity;
    const borrowed = economics.borrowed;
    const totalCashRequirement = requiredEquity + economics.initialMargin;
    const cashCoverage = totalCashRequirement ? state.cash / totalCashRequirement : 10;
    const creditCoverage = borrowed ? stats.creditAvailable / borrowed : 10;
    const canStart = canStartOpportunity(opp);
    const selectedHedge = Number(selectedHedgeRatios[opp.id] ?? opp.recommendedHedge ?? 100);
    const dealNotional = physicalNotional(opp, economics.quantity, economics.capital);
    const residualExposure = dealNotional * Math.max(0, 1 - selectedHedge / 100);
    const compatibleFleet = availableFleetForOpportunity(opp);
    const carrierStrategy = selectedCarrierStrategies[opp.id] || 'spot';
    const selectedFleet = carrierStrategy.startsWith('fleet:') ? getFleetAsset(carrierStrategy.slice(6)) : null;
    const selectedVessel = selectedFleet ? getVesselCatalog(selectedFleet.catalogId) : null;
    const adjustedPnl = economics.expectedPnl + (selectedVessel?.bonusPnl || 0) + (selectedFleet && hasStaff('freight-charterer') ? 5_000 : 0);
    const adjustedDuration = Math.max(10, economics.duration - (selectedVessel?.durationBonus || 0));
    const parties = partiesForOpportunity(opp);
    const supplier = getCounterparty(parties.supplierId);
    const buyer = getCounterparty(parties.buyerId);
    const supplierState = getCounterpartyState(parties.supplierId);
    const buyerState = getCounterpartyState(parties.buyerId);
    const accepted = negotiation.status === 'accepted';
    const rejected = negotiation.status === 'rejected';
    const consumed = negotiation.status === 'consumed';
    const structure = economics.structure;
    const fundsReady = state.cash >= totalCashRequirement && stats.creditAvailable >= borrowed && financingAvailable(structure.financingId);
    return `
      <div class="location-badge">◎ Live market offer · ${economics.expiresIn}d</div>
      <h2>${opp.title}</h2>
      <div class="inspector-subtitle">${origin.name} → ${destination.name}${opp.via?.length ? ` via ${opp.via.map(id=>getHub(id).name).join(', ')}` : ''}</div>
      <p class="inspector-subtitle" style="margin-top:12px">${opp.description}</p>
      ${economics.crisisLabels.length ? `<div class="global-impact-box"><strong>Global disruption impact</strong><span>${economics.crisisLabels.join(' · ')}</span></div>` : ''}
      ${economics.verticalSources?.length ? `<div class="vertical-impact-box"><strong>Vertical integration advantage</strong><span>${economics.verticalSources.join(' · ')}</span></div>` : ''}
      <div class="inspector-grid">
        <div class="inspector-stat"><span>Expected P&amp;L</span><strong style="color:var(--green)">${money(adjustedPnl)}</strong></div>
        <div class="inspector-stat"><span>Duration</span><strong>${adjustedDuration} giorni</strong></div>
        <div class="inspector-stat"><span>Total capital</span><strong>${money(economics.capital, true)}</strong></div>
        <div class="inspector-stat"><span>Offer quantity</span><strong>${economics.quantity} t</strong></div>
      </div>
      <div class="inspector-section"><h3>Commercial counterparties</h3>
        <div class="party-pair">
          <div class="party-mini"><span>Supplier · ${supplier?.country || ''}</span><strong>${supplier?.name || 'Supplier'}</strong><small>Credit ${supplier?.credit || 0} · relationship ${supplierState.relationship}</small></div>
          <div class="party-mini"><span>Buyer · ${buyer?.country || ''}</span><strong>${buyer?.name || 'Buyer'}</strong><small>Credit ${buyer?.credit || 0} · relationship ${buyerState.relationship}</small></div>
        </div>
      </div>
      <div class="negotiation-box">
        <div class="negotiation-heading"><div><span class="eyebrow">Contract negotiation</span><h3>Costruisci la tua offerta</h3></div><strong>${Math.round(economics.acceptance)}%</strong></div>
        <div class="acceptance-meter"><span style="width:${economics.acceptance}%"></span></div>
        <label>Commercial quote<select id="commercialTermSelect">
          ${Object.entries(negotiationProfiles.commercial).map(([id,item])=>`<option value="${id}" ${negotiation.commercial===id?'selected':''}>${item.label}</option>`).join('')}
        </select></label>
        <label>Payment terms<select id="paymentTermSelect">
          ${Object.entries(negotiationProfiles.payment).map(([id,item])=>`<option value="${id}" ${negotiation.payment===id?'selected':''}>${item.label}</option>`).join('')}
        </select></label>
        <label>Delivery window<select id="deliveryTermSelect">
          ${Object.entries(negotiationProfiles.delivery).map(([id,item])=>`<option value="${id}" ${negotiation.delivery===id?'selected':''}>${item.label}</option>`).join('')}
        </select></label>
        <div class="negotiation-result ${accepted?'accepted':rejected?'rejected':''}">
          ${accepted ? 'Offerta accettata: condizioni bloccate fino al refresh del mercato.' : rejected ? 'Offerta rifiutata: modifica almeno una condizione e inviala nuovamente.' : 'La probabilità combina prezzo, pagamento, reputazione e relazione con il buyer.'}
        </div>
        <button class="button secondary" id="submitNegotiationButton" ${consumed ? 'disabled' : ''}>${accepted ? 'Rinegozia le condizioni' : rejected ? 'Invia nuova offerta' : 'Invia offerta al buyer'}</button>
      </div>
      <div class="inspector-section"><h3>Capital structure</h3>
        <div class="timeline-mini-row"><i></i><span>Equity richiesta</span><strong>${money(requiredEquity)}</strong></div>
        <div class="capital-bar"><span style="width:${clamp(cashCoverage*100,0,100)}%"></span></div>
        <div class="timeline-mini-row" style="margin-top:12px"><i></i><span>Credit facility</span><strong>${money(borrowed)}</strong></div>
        <div class="capital-bar"><span style="width:${clamp(creditCoverage*100,0,100)}%"></span></div>
        <div class="timeline-mini-row" style="margin-top:12px"><i></i><span>Initial futures margin</span><strong>${money(economics.initialMargin)}</strong></div>
        <div class="capital-bar margin"><span style="width:${clamp(state.cash/Math.max(1,economics.initialMargin)*100,0,100)}%"></span></div>
      </div>
      <div class="deal-structure-box">
        <span class="eyebrow">Deal structuring</span><h3>Funding, insurance e controls</h3>
        <label>Trade finance<select id="financingStrategySelect">
          ${Object.entries(financingProfiles).map(([id,item])=>`<option value="${id}" ${structure.financingId===id?'selected':''} ${financingAvailable(id)?'':'disabled'}>${item.label}${financingAvailable(id)?'':' · requires Trade Finance Manager'}</option>`).join('')}
        </select><small>${structure.financing.description}</small></label>
        <label>Cargo insurance<select id="insuranceStrategySelect">
          ${Object.entries(insuranceProfiles).map(([id,item])=>`<option value="${id}" ${structure.insuranceId===id?'selected':''}>${item.label}</option>`).join('')}
        </select><small>${structure.insurance.description}</small></label>
        <label>Quality control<select id="inspectionStrategySelect">
          ${Object.entries(inspectionProfiles).map(([id,item])=>`<option value="${id}" ${structure.inspectionId===id?'selected':''}>${item.label}</option>`).join('')}
        </select><small>${structure.inspection.description}</small></label>
        <div class="hedge-control compact">
          <label for="fxHedgeRatioInput"><span>FX hedge ratio</span><strong id="fxHedgeRatioValue">${structure.fxHedgeRatio}%</strong></label>
          <input id="fxHedgeRatioInput" type="range" min="0" max="100" step="10" value="${structure.fxHedgeRatio}">
          <div class="hedge-scale"><span>Open FX</span><span>${money(dealNotional*fxExposureShare(opp),true)} gross exposure</span><span>Fully hedged</span></div>
        </div>
      </div>
      ${transportClassForOpportunity(opp) !== 'land' ? `<div class="shipping-control">
        <label for="carrierStrategySelect"><span>Shipping strategy</span><strong>${selectedVessel ? selectedVessel.name : 'Spot carrier'}</strong></label>
        <select id="carrierStrategySelect">
          <option value="spot" ${carrierStrategy === 'spot' ? 'selected' : ''}>Spot / voyage booking</option>
          ${compatibleFleet.map(asset => { const vessel = getVesselCatalog(asset.catalogId); return `<option value="fleet:${asset.id}" ${carrierStrategy === `fleet:${asset.id}` ? 'selected' : ''}>Internal fleet · ${vessel.name}</option>`; }).join('')}
        </select>
        <div class="shipping-benefit">${selectedVessel ? `Freight advantage +${money(selectedVessel.bonusPnl)} · ETA -${selectedVessel.durationBonus} days` : `Freight index ${state.freightIndex.toFixed(1)} · third-party carrier`}</div>
        ${compatibleFleet.length ? '' : '<small>Nessuna nave compatibile nel porto di origine. Apri il Fleet Desk per chartering.</small>'}
      </div>` : ''}
      <div class="hedge-control">
        <label for="hedgeRatioInput"><span>Futures hedge ratio</span><strong id="hedgeRatioValue">${selectedHedge}%</strong></label>
        <input id="hedgeRatioInput" type="range" min="0" max="100" step="10" value="${selectedHedge}">
        <div class="hedge-scale"><span>0% speculative</span><span>${opp.recommendedHedge}% recommended</span><span>100% protected</span></div>
        <div class="timeline-mini-row" style="margin-top:12px;margin-bottom:0"><i></i><span>Residual flat-price exposure</span><strong id="residualExposureValue">${money(residualExposure, true)}</strong></div>
      </div>
      ${accepted && fundsReady ? '<div class="success-box">Contratto accettato e funding disponibile. Puoi aprire il deal.</div>' : accepted ? '<div class="warning-box">Offerta accettata, ma cash, margin collateral, facility o struttura finanziaria non sono sufficienti.</div>' : '<div class="warning-box">Il deal non può partire finché il buyer non accetta le condizioni.</div>'}
      <button class="button primary" id="startDealButton" ${canStart ? '' : 'disabled'}>Apri il physical deal</button>
      <button class="button secondary" id="focusOriginButton">Vai al fornitore</button>
    `;
  }

  function dealInspector(deal) {
    deal = updateDealOperations(deal);
    const opp = getOpportunity(deal.opportunityId);
    const progress = computeDealProgress(deal);
    const pnl = computeUnrealizedPnl(deal);
    const phase = dealPhase(deal);
    const marketImpact = computeMarketImpact(deal);
    const grossNotional = physicalNotional(opp, deal.quantity || opp.quantity, deal.capital);
    const residualExposure = grossNotional * Math.max(0, 1 - (deal.hedgeRatio || 0) / 100);
    const fxImpact = computeFxImpact(deal);
    const marginRequirement = currentMarginRequirement(deal);
    const financeProfile = financingProfiles[deal.financingStrategy || 'revolver'] || financingProfiles.revolver;
    const insuranceProfile = insuranceProfiles[deal.insuranceStrategy || 'basic'] || insuranceProfiles.basic;
    const inspectionProfile = inspectionProfiles[deal.inspectionStrategy || 'standard'] || inspectionProfiles.standard;
    const currentPoint = pointOnRoute(opp, progress);
    const nearestHub = [opp.origin, ...(opp.via||[]), opp.destination].map(getHub).sort((a,b) => Math.hypot(a.lat-currentPoint.lat,a.lon-currentPoint.lon)-Math.hypot(b.lat-currentPoint.lat,b.lon-currentPoint.lon))[0];
    const eventHtml = deal.pendingDecision ? `
      <div class="event-box"><span class="eyebrow">Operational event</span><h3>${opp.event.title}</h3><p>${opp.event.text}</p>
      ${opp.event.choices.map(choice => `<button class="event-choice" data-event-choice="${choice.id}"><strong>${choice.label}</strong><small>${choice.hint}</small></button>`).join('')}</div>` : '';
    return `
      <div class="location-badge">↗ Active shipment</div>
      <h2>${opp.title}</h2>
      <div class="inspector-subtitle">${getHub(opp.origin).name} → ${getHub(opp.destination).name} · ${Math.round(progress*100)}% completato</div>
      <div class="inspector-grid">
        <div class="inspector-stat"><span>Unrealized P&amp;L</span><strong style="color:${pnl>=0?'var(--green)':'var(--red)'}">${money(pnl)}</strong></div>
        <div class="inspector-stat"><span>ETA</span><strong>${Math.max(0,deal.duration-deal.elapsed)} giorni</strong></div>
        <div class="inspector-stat"><span>Hedge ratio</span><strong>${deal.hedgeRatio || 0}%</strong></div>
        <div class="inspector-stat"><span>Physical phase</span><strong>${phase.label}</strong></div>
      </div>
      <div class="inspector-section"><h3>Commercial execution</h3>
        <div class="timeline-mini-row"><i></i><span>Supplier</span><strong>${getCounterparty(deal.supplierId)?.name || 'N/A'}</strong></div>
        <div class="timeline-mini-row"><i></i><span>Buyer</span><strong>${getCounterparty(deal.buyerId)?.name || 'N/A'}</strong></div>
        <div class="timeline-mini-row"><i></i><span>Quantity</span><strong>${deal.quantity || opp.quantity} t</strong></div>
        <div class="timeline-mini-row"><i></i><span>Payment</span><strong>${negotiationProfiles.payment[deal.commercialTerms?.payment]?.label || 'Contract terms'}</strong></div>
        ${(deal.globalEventImpacts||[]).length ? `<div class="global-impact-box"><strong>Global events affecting this cargo</strong><span>${deal.globalEventImpacts.map(id=>globalEventCatalog.find(e=>e.id===id)?.title||id).join(' · ')}</span></div>` : ''}
      </div>
      <div class="inspector-section"><h3>Risk, treasury &amp; hedge liquidity</h3>
        <div class="timeline-mini-row"><i></i><span>Residual flat-price exposure</span><strong>${money(residualExposure, true)}</strong></div>
        <div class="timeline-mini-row"><i></i><span>Commodity impact to date</span><strong style="color:${marketImpact>=0?'var(--green)':'var(--red)'}">${money(marketImpact)}</strong></div>
        <div class="timeline-mini-row"><i></i><span>FX impact · hedge ${deal.fxHedgeRatio || 0}%</span><strong style="color:${fxImpact>=0?'var(--green)':'var(--red)'}">${money(fxImpact)}</strong></div>
        <div class="timeline-mini-row"><i></i><span>Equity locked</span><strong>${money(deal.equity, true)}</strong></div>
        <div class="timeline-mini-row"><i></i><span>Debt funded · ${(deal.financingRate*100).toFixed(1)}%</span><strong>${money(deal.borrowed, true)}</strong></div>
        <div class="timeline-mini-row"><i></i><span>Interest accrued</span><strong style="color:var(--orange)">${money(deal.financingAccrued || 0)}</strong></div>
        <div class="timeline-mini-row"><i></i><span>Futures collateral</span><strong>${money(deal.marginCollateral || 0)} / ${money(marginRequirement)}</strong></div>
        <div class="timeline-mini-row"><i></i><span>Margin calls funded</span><strong>${deal.marginCalls || 0}</strong></div>
        ${deal.hedgeRatio < 100 ? '<button class="button secondary" id="increaseHedgeButton">Porta hedge al 100%</button>' : '<div class="success-box">Flat-price exposure completamente coperta. Monitora comunque variation margin e basis risk.</div>'}
      </div>
      <div class="inspector-section"><h3>Deal protection</h3>
        <div class="contract-card"><div class="contract-card-head"><strong>${financeProfile.label}</strong><span>Funding</span></div><p>${financeProfile.description}</p></div>
        <div class="contract-card"><div class="contract-card-head"><strong>${insuranceProfile.label}</strong><span>Insurance</span></div><p>${insuranceProfile.description}</p></div>
        <div class="contract-card"><div class="contract-card-head"><strong>${inspectionProfile.label}</strong><span>Quality</span></div><p>${inspectionProfile.description}</p></div>
      </div>

      <div class="inspector-section"><h3>Contracts &amp; execution</h3>
        <div class="contract-card"><div class="contract-card-head"><strong>Purchase contract</strong><span>${deal.operations.purchaseContract.status}</span></div><p>${deal.operations.purchaseContract.terms}</p></div>
        <div class="contract-card"><div class="contract-card-head"><strong>Sales contract</strong><span>${deal.operations.salesContract.status}</span></div><p>${deal.operations.salesContract.terms}</p></div>
        <div class="asset-banner"><span>Carrier / vessel</span><strong>${deal.operations.transport.carrier}</strong><small>${deal.operations.transport.mode} · ${deal.operations.transport.booking} · ${deal.operations.transport.status}</small></div>
        <div class="shipping-ledger">
          <div><span>Charter type</span><strong>${deal.operations.transport.charterType}</strong></div>
          <div><span>Laycan</span><strong>${deal.operations.transport.laycan}</strong></div>
          <div><span>Laytime</span><strong>${deal.operations.transport.laytimeUsed}/${deal.operations.transport.laytimeAllowed} days</strong></div>
          <div><span>Demurrage</span><strong style="color:${deal.operations.transport.demurrageAccrued ? 'var(--red)' : 'var(--green)'}">${money(deal.operations.transport.demurrageAccrued)}</strong></div>
        </div>
        <div class="asset-banner"><span>Storage plan</span><strong>${deal.operations.storage.name}</strong><small>${deal.operations.storage.reserved ? 'Reserved' : 'Not reserved'} · ${deal.operations.storage.days} buffer days${deal.operations.storage.active ? ' · currently active' : ''}</small></div>
      </div>
      <div class="inspector-section"><h3>Document readiness · ${Math.round(operationsReadiness(deal))}%</h3>
        <div class="document-list">${deal.operations.documents.map(doc=>`<div class="document-row ${doc.status}"><i></i><span>${doc.name}</span><strong>${doc.status}</strong></div>`).join('')}</div>
        <div class="ops-actions">
          <button class="button secondary" id="expediteDocsButton" ${deal.operations.expedited?'disabled':''}>Expedite docs</button>
          <button class="button secondary" id="upgradeTransportButton" ${deal.operations.transport.upgraded || progress>.7?'disabled':''}>Priority transport</button>
        </div>
        <button class="button secondary" id="emergencyStorageButton" ${deal.operations.storage.emergency?'disabled':''}>Book emergency storage</button>
      </div>
      <div class="inspector-section"><h3>Shipment timeline</h3>
        <div class="timeline-mini">
          <div class="timeline-mini-row done"><i></i><span>Contratti firmati</span><strong>Day 0</strong></div>
          <div class="timeline-mini-row ${progress>.18?'done':'current'}"><i></i><span>Materiale caricato</span><strong>${progress>.18?'Done':'Pending'}</strong></div>
          <div class="timeline-mini-row ${progress>.18&&progress<.9?'current':progress>=.9?'done':''}"><i></i><span>In transito · vicino ${nearestHub.name}</span><strong>${Math.round(progress*100)}%</strong></div>
          <div class="timeline-mini-row ${progress>=1?'done':''}"><i></i><span>Delivery &amp; settlement</span><strong>${progress>=1?'Done':'Pending'}</strong></div>
        </div>
      </div>
      ${deal.eventResult ? `<div class="inspector-section"><h3>Ultimo evento</h3><p>${deal.eventResult}</p></div>` : ''}
      ${eventHtml}
      <button class="button secondary" id="focusShipmentButton">Centra la spedizione</button>
    `;
  }


  function historyInspector(item) {
    const opp = getOpportunity(item.opportunityId);
    const breakdown = item.pnlBreakdown || { commercial: item.pnl, operations: 0, financing: 0, market: 0, fx: 0 };
    const rows = [
      ['Commercial / route margin', breakdown.commercial || 0],
      ['Operations, claims & shipping', breakdown.operations || 0],
      ['Financing cost', breakdown.financing || 0],
      ['Commodity hedge / residual', breakdown.market || 0],
      ['FX result', breakdown.fx || 0]
    ];
    const maxAbs = Math.max(1,...rows.map(([,value])=>Math.abs(value)));
    return `<div class="location-badge">✓ Settled cargo</div><h2>${opp.title}</h2><div class="inspector-subtitle">${getHub(opp.origin).name} → ${getHub(opp.destination).name} · closed ${formatDate(new Date(item.completed))}</div>
      <div class="settlement-hero ${item.pnl>=0?'positive':'negative'}"><span>Realized P&amp;L</span><strong>${money(item.pnl)}</strong><small>${item.quantity||opp.quantity} t · ${item.days} days · ops ${Math.round(item.operationalReadiness||0)}%</small></div>
      <div class="inspector-section"><h3>P&amp;L attribution</h3><div class="pnl-waterfall">${rows.map(([label,value])=>`<div class="pnl-row"><div><span>${label}</span><strong style="color:${value>=0?'var(--green)':'var(--red)'}">${money(value)}</strong></div><div class="pnl-bar"><span class="${value>=0?'positive':'negative'}" style="width:${Math.max(3,Math.abs(value)/maxAbs*100)}%"></span></div></div>`).join('')}</div></div>
      <div class="inspector-section"><h3>Execution scorecard</h3><div class="inspector-grid"><div class="inspector-stat"><span>Hedge</span><strong>${item.hedgeRatio||0}%</strong></div><div class="inspector-stat"><span>FX hedge</span><strong>${item.fxHedgeRatio||0}%</strong></div><div class="inspector-stat"><span>Margin calls</span><strong>${item.marginCalls||0}</strong></div><div class="inspector-stat"><span>Demurrage</span><strong>${money(item.demurrage||0)}</strong></div></div></div>
      <div class="inspector-section"><h3>Structure used</h3><div class="timeline-mini-row"><i></i><span>Funding</span><strong>${financingProfiles[item.financingStrategy||'revolver']?.label||'N/A'}</strong></div><div class="timeline-mini-row"><i></i><span>Insurance</span><strong>${insuranceProfiles[item.insuranceStrategy||'basic']?.label||'N/A'}</strong></div><div class="timeline-mini-row"><i></i><span>Inspection</span><strong>${inspectionProfiles[item.inspectionStrategy||'standard']?.label||'N/A'}</strong></div></div>
      ${item.eventResult?`<div class="inspector-section"><h3>Operational outcome</h3><p>${item.eventResult}</p></div>`:''}`;
  }

  function vesselInspector(asset) {
    const vessel = getVesselCatalog(asset.catalogId);
    const deal = asset.assignedDealId ? getActiveDeal(asset.assignedDealId) : null;
    return `
      <div class="location-badge">◆ Chartered asset</div>
      <h2>${vessel.name}</h2>
      <div class="inspector-subtitle">${vessel.vesselClass} · ${vessel.capacity.toLocaleString('en-US')} t DWT</div>
      <p class="inspector-subtitle" style="margin-top:12px">${vessel.description}</p>
      <div class="inspector-grid">
        <div class="inspector-stat"><span>Status</span><strong>${asset.status}</strong></div>
        <div class="inspector-stat"><span>Position</span><strong>${getHub(asset.positionHub)?.name || 'At sea'}</strong></div>
        <div class="inspector-stat"><span>Days remaining</span><strong>${asset.daysRemaining}</strong></div>
        <div class="inspector-stat"><span>Charter cost</span><strong>${money(asset.charterCost + (asset.extensionCost || 0))}</strong></div>
      </div>
      <div class="inspector-section"><h3>Commercial employment</h3>
        ${deal ? `<div class="success-box">Assigned to ${getOpportunity(deal.opportunityId).title}. The vessel will be released at settlement.</div><button class="button secondary" id="openAssignedDealButton">Open assigned deal</button>` : '<div class="success-box">Available for a compatible opportunity departing from this location.</div>'}
      </div>
      <div class="inspector-section"><h3>Charter profile</h3>
        <div class="timeline-mini-row"><i></i><span>Transport class</span><strong>${vessel.transportClass}</strong></div>
        <div class="timeline-mini-row"><i></i><span>Expected freight advantage</span><strong>${money(vessel.bonusPnl)}</strong></div>
        <div class="timeline-mini-row"><i></i><span>Execution advantage</span><strong>-${vessel.durationBonus} days</strong></div>
      </div>
      <button class="button secondary" id="focusVesselButton">Centra la nave</button>
      <button class="button danger" id="releaseVesselButton" ${asset.status === 'assigned' ? 'disabled' : ''}>Terminate charter</button>`;
  }

  function selectInvestment(id,focus=true){const asset=investmentDefinition(id);if(!asset)return;selected={type:'investment',id};activeLeftTab='empire';if(focus)focusOnHub(asset.hub);renderTabs();renderInspector();renderEmpire();}
  function investmentInspector(asset){const r=investmentRecord(asset.id),level=r.level||0,target=level+1,max=level>=asset.maxLevel,cost=max?0:investmentCost(asset,target),days=max?0:investmentBuildDays(asset,target);return `<div class="location-badge chain-${asset.chain}">${asset.chain} asset</div><h2>${asset.name}</h2><div class="inspector-subtitle">${getHub(asset.hub)?.name} · Level ${level}/${asset.maxLevel}</div><p class="inspector-subtitle" style="margin-top:12px">${asset.description}</p><div class="economics-grid"><div><span>Daily income</span><strong>${money((asset.dailyIncome||0)*level)}</strong></div><div><span>Deal P&L edge</span><strong>${money((asset.pnlBonus||0)*level)}</strong></div><div><span>Book value</span><strong>${money((r.totalSpent||0)*.88,true)}</strong></div><div><span>Status</span><strong>${r.buildingTo?`Building L${r.buildingTo}`:level?'Operational':'Greenfield'}</strong></div></div>${r.buildingTo?`<div class="success-box">Project team al lavoro · ${r.daysRemaining} giorni rimanenti.</div>`:`<button class="button primary" id="inspectorBuildInvestment" ${max||!investmentUnlocked(asset)||state.cash<cost||activeConstructionCount()>=builderSlots()?'disabled':''}>${max?'Maximum level':`Invest ${money(cost)} · ${days} days`}</button>`}<button class="button secondary" id="focusInvestmentHub">Focus location</button>`;}

  function renderInspector() {
    const eyebrow = $('#inspectorEyebrow');
    const container = $('#inspectorContent');
    if (selected.type === 'hub') {
      const hub = getHub(selected.id) || getHub('geneva');
      eyebrow.textContent = hub.type === 'hq' ? 'Headquarters' : 'Market location';
      container.innerHTML = hubInspector(hub);
      $$('[data-open-opportunity]', container).forEach(b => b.addEventListener('click', () => selectOpportunity(b.dataset.openOpportunity)));
    } else if (selected.type === 'investment') {
      const asset=investmentDefinition(selected.id); if(!asset)return selectHub('geneva'); eyebrow.textContent='Industrial asset'; container.innerHTML=investmentInspector(asset); $('#inspectorBuildInvestment')?.addEventListener('click',()=>startInvestment(asset.id)); $('#focusInvestmentHub')?.addEventListener('click',()=>focusOnHub(asset.hub));
    } else if (selected.type === 'opportunity') {
      const opp = getOpportunity(selected.id);
      eyebrow.textContent = 'Opportunity analysis';
      container.innerHTML = opportunityInspector(opp);
      const hedgeInput = $('#hedgeRatioInput');
      hedgeInput?.addEventListener('input', () => {
        selectedHedgeRatios[opp.id] = Number(hedgeInput.value);
        $('#hedgeRatioValue').textContent = `${hedgeInput.value}%`;
        const econ = opportunityEconomics(opp);
        const exposure = physicalNotional(opp, econ.quantity, econ.capital) * Math.max(0, 1 - Number(hedgeInput.value) / 100);
        $('#residualExposureValue').textContent = money(exposure, true);
      });
      ['commercial','payment','delivery'].forEach(field => {
        const id = field === 'commercial' ? '#commercialTermSelect' : field === 'payment' ? '#paymentTermSelect' : '#deliveryTermSelect';
        $(id)?.addEventListener('change', event => {
          setNegotiationDraft(opp.id, field, event.target.value);
          renderInspector();
          renderOpportunityList();
        });
      });
      $('#submitNegotiationButton')?.addEventListener('click', () => submitNegotiation(opp.id));
      $('#carrierStrategySelect')?.addEventListener('change', (event) => {
        selectedCarrierStrategies[opp.id] = event.target.value;
        renderInspector();
      });
      $('#financingStrategySelect')?.addEventListener('change', event => { selectedFinancingStrategies[opp.id] = event.target.value; renderInspector(); renderOpportunityList(); });
      $('#insuranceStrategySelect')?.addEventListener('change', event => { selectedInsuranceStrategies[opp.id] = event.target.value; renderInspector(); renderOpportunityList(); });
      $('#inspectionStrategySelect')?.addEventListener('change', event => { selectedInspectionStrategies[opp.id] = event.target.value; renderInspector(); renderOpportunityList(); });
      $('#fxHedgeRatioInput')?.addEventListener('input', event => { selectedFxHedgeRatios[opp.id] = Number(event.target.value); $('#fxHedgeRatioValue').textContent = `${event.target.value}%`; });
      $('#startDealButton')?.addEventListener('click', () => startOpportunity(opp.id));
      $('#focusOriginButton')?.addEventListener('click', () => selectHub(opp.origin));
    } else if (selected.type === 'history') {
      const item = getHistoryDeal(selected.id);
      if (!item) return selectHub('geneva');
      eyebrow.textContent = 'Deal review';
      container.innerHTML = historyInspector(item);
    } else if (selected.type === 'vessel') {
      const asset = getFleetAsset(selected.id);
      if (!asset) return selectHub('geneva');
      eyebrow.textContent = 'Fleet asset';
      container.innerHTML = vesselInspector(asset);
      $('#focusVesselButton')?.addEventListener('click', () => focusOnHub(asset.positionHub));
      $('#releaseVesselButton')?.addEventListener('click', () => releaseVessel(asset.id));
      $('#openAssignedDealButton')?.addEventListener('click', () => selectDeal(asset.assignedDealId));
    } else if (selected.type === 'deal') {
      const deal = getActiveDeal(selected.id);
      if (!deal) return selectHub('geneva');
      eyebrow.textContent = deal.pendingDecision ? 'Decision required' : 'Live operation';
      container.innerHTML = dealInspector(deal);
      $$('[data-event-choice]', container).forEach(b => b.addEventListener('click', () => resolveEvent(deal.id, b.dataset.eventChoice)));
      $('#increaseHedgeButton')?.addEventListener('click', () => increaseHedge(deal.id));
      $('#expediteDocsButton')?.addEventListener('click', () => expediteDocuments(deal.id));
      $('#upgradeTransportButton')?.addEventListener('click', () => upgradeTransport(deal.id));
      $('#emergencyStorageButton')?.addEventListener('click', () => bookEmergencyStorage(deal.id));
      $('#focusShipmentButton')?.addEventListener('click', () => focusOnDeal(deal.id));
    }
  }

  function renderEventBanner() {
    const pending = state.activeDeals.find(d => d.pendingDecision);
    const banner = $('#eventBanner');
    if (!pending) {
      banner.classList.add('hidden');
      return;
    }
    const opp = getOpportunity(pending.opportunityId);
    $('#eventBannerText').textContent = opp.event?.title || pending.eventResult || 'Treasury decision required';
    banner.classList.remove('hidden');
    $('#openEventButton').onclick = () => selectDeal(pending.id);
  }

  function renderWorldTicker() {
    const ticker = $('#worldEventTicker');
    const active = activeCrisisDefinitions();
    if (!ticker || !active.length) {
      ticker?.classList.add('hidden');
      return;
    }
    $('#worldEventTickerText').textContent = active.map(event => `${event.title} (${event.remaining}d)`).join(' · ');
    ticker.classList.remove('hidden');
    $('#openWorldEventsButton').onclick = () => { activeLeftTab = 'events'; renderTabs(); };
  }

  function renderLayers() {
    $$('.layer-button').forEach(button => button.classList.toggle('active', layers[button.dataset.layer]));
  }

  function renderAll() {
    renderMetrics();
    renderEquityChart();
    renderTabs();
    renderAllLists();
    renderInspector();
    renderEventBanner();
    renderWorldTicker();
    renderLayers();
  }

  function configureDifficulty(level) {
    state.difficulty = level;
    if (level === 'guided') { state.cash = 1_300_000; state.creditLimit = 7_500_000; state.nextGlobalEventDay = 10; }
    else if (level === 'expert') { state.cash = 800_000; state.creditLimit = 5_000_000; state.nextGlobalEventDay = 4; }
    else { state.cash = 1_000_000; state.creditLimit = 6_000_000; state.nextGlobalEventDay = 6; }
    state.navHistory = [state.cash,state.cash,state.cash];
    state.onboardingComplete = true;
    saveState();
  }

  function openOnboarding() {
    const dialog = $('#onboardingDialog');
    if (!dialog || state.onboardingComplete || dialog.open) return;
    dialog.showModal();
  }

  function resetCareer() {
    state = defaultState();
    initializeCounterparties();
    selected = { type: 'hub', id: 'geneva' };
    activeLeftTab = 'portfolio';
    selectedLeaderboardMode = 'overall';
    runningSpeed = 0;
    updateClock();
    saveState();
    view = { lon: 6, lat: 18, zoom: 1, targetLon: 6, targetLat: 18 };
    renderAll();
    showToast('Nuova carriera SHIPPY pronta. Scegli la difficoltà.');
    setTimeout(openOnboarding,80);
  }

  function bindEvents() {
    window.addEventListener('resize', resizeCanvas);
    new ResizeObserver(resizeCanvas).observe($('#globeStage'));

    canvas.addEventListener('pointerdown', (event) => {
      dragging = true;
      dragMoved = false;
      dragStart = { x: event.clientX, y: event.clientY, lon: view.lon, lat: view.lat };
      view.targetLon = null;
      canvas.setPointerCapture(event.pointerId);
      canvas.classList.add('dragging');
      $('#globeHint').style.opacity = '.25';
    });
    canvas.addEventListener('pointermove', (event) => {
      if (!dragging) return;
      const dx = event.clientX - dragStart.x;
      const dy = event.clientY - dragStart.y;
      if (Math.abs(dx)+Math.abs(dy) > 3) dragMoved = true;
      view.lon = ((dragStart.lon - dx * .28 / view.zoom + 540) % 360) - 180;
      view.lat = clamp(dragStart.lat + dy * .20 / view.zoom, -70, 70);
    });
    canvas.addEventListener('pointerup', (event) => {
      dragging = false;
      canvas.releasePointerCapture(event.pointerId);
      canvas.classList.remove('dragging');
      if (!dragMoved) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const investment = [...investmentHitboxes].sort((a,b)=>b.z-a.z).find(m => Math.hypot(x-m.x,y-m.y) <= m.r);
        if (investment) return selectInvestment(investment.id, false);
        const fleet = [...fleetHitboxes].sort((a,b)=>b.z-a.z).find(m => Math.hypot(x-m.x,y-m.y) <= m.r);
        if (fleet) return selectVessel(fleet.id, false);
        const ship = [...shipHitboxes].sort((a,b)=>b.z-a.z).find(m => Math.hypot(x-m.x,y-m.y) <= m.r);
        if (ship) return selectDeal(ship.id, false);
        const marker = [...markerHitboxes].sort((a,b)=>b.z-a.z).find(m => Math.hypot(x-m.x,y-m.y) <= m.r);
        if (marker) return selectHub(marker.id, false);
      }
    });
    canvas.addEventListener('wheel', (event) => {
      event.preventDefault();
      view.zoom = clamp(view.zoom * (event.deltaY > 0 ? .93 : 1.07), .72, 1.45);
      $('#globeHint').style.opacity = '.25';
    }, { passive: false });

    $$('.panel-tab').forEach(button => button.addEventListener('click', () => {
      activeLeftTab = button.dataset.leftTab;
      renderTabs();
    }));

    $$('.layer-button').forEach(button => button.addEventListener('click', () => {
      layers[button.dataset.layer] = !layers[button.dataset.layer];
      renderLayers();
    }));

    $('#pauseButton').addEventListener('click', () => { runningSpeed = 0; updateClock(); });
    $$('.time-button[data-speed]').forEach(button => button.addEventListener('click', () => {
      runningSpeed = Number(button.dataset.speed);
      updateClock();
    }));
    $('#nextDayButton').addEventListener('click', () => advanceDay());
    $('#nextEventButton').addEventListener('click', advanceToNextEvent);
    $('#closeInspector').addEventListener('click', () => selectHub('geneva'));
    $('.profile-button')?.addEventListener('click', () => { activeLeftTab = 'career'; renderTabs(); });

    const dialog = $('#confirmDialog');
    $('#resetButton').addEventListener('click', () => dialog.showModal());
    dialog.addEventListener('close', () => { if (dialog.returnValue === 'confirm') resetCareer(); });
    const onboarding = $('#onboardingDialog');
    onboarding?.addEventListener('close', () => {
      if (onboarding.returnValue === 'start') {
        configureDifficulty($('#difficultySelect')?.value || 'standard');
        renderAll();
        showToast(`Carriera ${state.difficulty} iniziata. Apri Market e negozia il primo deal.`);
      } else if (!state.onboardingComplete) setTimeout(openOnboarding,80);
    });
  }

  initEarthRenderer();
  resizeCanvas();
  bindEvents();
  renderAll();
  updateClock();
  requestAnimationFrame(animate);
  setTimeout(openOnboarding,120);
})();
