import * as THREE from './vendor/three.module.min.js';

(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const lerp = (a, b, t) => a + (b - a) * t;
  const deg = Math.PI / 180;
  const storageKey = 'wot-v32';
  const legacyStorageKeys = ['wot-v31', 'wot-v30', 'wot-v29', 'wot-v28', 'wot-v27', 'wot-v26', 'wot-v25', 'wot-v24', 'wot-v23', 'wot-v22', 'wot-v21', 'wot-v20', 'wot-v19', 'wot-v18', 'shippy-v17', 'shippy-v16', 'shippy-v15', 'shippy-v14', 'shippy-v13', 'shippy-v12', 'shippy-v11', 'shippy-v10', 'shippy-v9', 'shippy-v8', 'shippy-v7', 'shippy-v6', 'shippy-v5', 'global-commodity-trader-v3'];

  // ── v25 prestige (persists across career resets) ────────────────────────────
  const prestigeKey = 'wot-prestige';
  const VICTORY_VALUATION = 50_000_000;
  function loadPrestige() {
    try { return Math.max(0, parseInt(localStorage.getItem(prestigeKey) || '0', 10) || 0); } catch (e) { return 0; }
  }
  function savePrestige(level) {
    try { localStorage.setItem(prestigeKey, String(Math.max(0, level|0))); } catch (e) {}
  }
  // Each prestige level: +12% starting cash, +8% credit line, +2 starting reputation
  function prestigeStartCash(base) { return Math.round(base * (1 + 0.12 * loadPrestige())); }
  function prestigeStartCredit(base) { return Math.round(base * (1 + 0.08 * loadPrestige())); }
  function prestigeStartReputation(base) { return Math.min(70, base + 2 * loadPrestige()); }

  // ── v27 multiple save slots ────────────────────────────────────────────────
  const SLOT_COUNT = 3;
  const activeSlotKey = 'wot-active-slot';
  let activeSlot = 1;
  function loadActiveSlot() {
    try { const n = parseInt(localStorage.getItem(activeSlotKey) || '1', 10); return (n >= 1 && n <= SLOT_COUNT) ? n : 1; } catch (e) { return 1; }
  }
  function setActiveSlot(n) {
    activeSlot = (n >= 1 && n <= SLOT_COUNT) ? n : 1;
    try { localStorage.setItem(activeSlotKey, String(activeSlot)); } catch (e) {}
  }
  function slotKey(n) { return `${storageKey}-slot-${n}`; }
  function currentStorageKey() { return slotKey(activeSlot); }
  function readSlotMeta(n) {
    try {
      const raw = localStorage.getItem(slotKey(n));
      if (!raw) return null;
      const s = JSON.parse(raw);
      return {
        empty: false,
        companyName: s.companyName || 'World of Trade Co.',
        profileName: s.profileName || 'Trader',
        completedDeals: s.completedDeals || 0,
        cash: s.cash || 0,
        prestigeLevel: s.prestigeLevel || 0,
        date: s.date || null,
        lastSavedAt: s.lastSavedAt || null,
      };
    } catch (e) { return null; }
  }

  const money = (value, compact = false) => {
    const sign = value < 0 ? '-' : '';
    const abs = Math.abs(value);
    if (compact && abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(2)}M`;
    if (compact && abs >= 1_000) return `${sign}$${Math.round(abs / 1_000)}K`;
    return `${sign}$${Math.round(abs).toLocaleString('en-US')}`;
  };

  // ── v25 procedural audio (Web Audio API, no external assets) ────────────────
  const Sound = (() => {
    let ctx = null;
    let master = null;
    let unlocked = false;
    function ensure() {
      if (ctx) return ctx;
      try {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        ctx = new AC();
        master = ctx.createGain();
        master.gain.value = 0.5;
        master.connect(ctx.destination);
      } catch (e) { ctx = null; }
      return ctx;
    }
    function unlock() {
      const c = ensure();
      if (c && c.state === 'suspended') c.resume().catch(() => {});
      unlocked = true;
    }
    function enabled() {
      return typeof state !== 'undefined' && state && state.soundEnabled !== false;
    }
    // A single tone with an ADSR-ish envelope
    function tone({ freq = 440, type = 'sine', start = 0, dur = 0.15, gain = 0.2, attack = 0.005, release = 0.08, glideTo = null }) {
      const c = ensure();
      if (!c) return;
      const t0 = c.currentTime + start;
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, t0);
      if (glideTo) osc.frequency.exponentialRampToValueAtTime(Math.max(1, glideTo), t0 + dur);
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(gain, t0 + attack);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur + release);
      osc.connect(g); g.connect(master);
      osc.start(t0);
      osc.stop(t0 + dur + release + 0.02);
    }
    function chord(freqs, opts = {}) { freqs.forEach((f, i) => tone({ ...opts, freq: f, start: (opts.stagger || 0) * i })); }
    function play(name) {
      if (!enabled()) return;
      if (typeof _soundSuppressed !== 'undefined' && _soundSuppressed) return;
      const c = ensure();
      if (!c) return;
      if (c.state === 'suspended') c.resume().catch(() => {});
      switch (name) {
        case 'success': // rising major triad
          chord([523.25, 659.25, 783.99], { type: 'triangle', dur: 0.16, gain: 0.16, stagger: 0.05, release: 0.12 }); break;
        case 'deal': // richer success — deal closed
          chord([392, 523.25, 659.25, 783.99], { type: 'triangle', dur: 0.2, gain: 0.15, stagger: 0.06, release: 0.16 }); break;
        case 'error': // low descending buzz
          tone({ freq: 220, type: 'sawtooth', dur: 0.16, gain: 0.14, glideTo: 130, release: 0.1 }); break;
        case 'warning': // two-tone alert
          tone({ freq: 480, type: 'square', dur: 0.1, gain: 0.1 });
          tone({ freq: 360, type: 'square', dur: 0.12, gain: 0.1, start: 0.12 }); break;
        case 'info': // soft blip
          tone({ freq: 660, type: 'sine', dur: 0.08, gain: 0.09, release: 0.06 }); break;
        case 'click': // subtle tick
          tone({ freq: 900, type: 'sine', dur: 0.03, gain: 0.05, release: 0.03 }); break;
        case 'day': // soft whoosh tick for day advance
          tone({ freq: 300, type: 'sine', dur: 0.09, gain: 0.07, glideTo: 520, release: 0.08 }); break;
        case 'purchase': // cash-register-ish two-note
          tone({ freq: 784, type: 'triangle', dur: 0.07, gain: 0.13 });
          tone({ freq: 1046.5, type: 'triangle', dur: 0.12, gain: 0.12, start: 0.07, release: 0.12 }); break;
        case 'achievement': // fanfare
          chord([523.25, 659.25, 783.99, 1046.5], { type: 'triangle', dur: 0.26, gain: 0.16, stagger: 0.08, release: 0.22 }); break;
        case 'victory': // triumphant arpeggio
          chord([523.25, 659.25, 783.99, 1046.5, 1318.5], { type: 'triangle', dur: 0.32, gain: 0.17, stagger: 0.1, release: 0.3 }); break;
        default: break;
      }
    }
    return { unlock, play, enabled, ensure };
  })();

  let _soundSuppressed = false;
  const notificationHistory = [];
  let notificationsUnread = 0;

  // ── v26 glossary of trading terms + contextual tooltips ─────────────────────
  const glossaryTerms = [
    { key:'contango', term:'Contango', category:'Market structure', def:'When forward prices are higher than the spot price. The market pays you to hold inventory over time — a sign of ample near-term supply.' },
    { key:'backwardation', term:'Backwardation', category:'Market structure', def:'When forward prices are lower than the spot price. It signals tight near-term supply; holding physical now is more valuable than a future delivery.' },
    { key:'termstructure', term:'Term structure', category:'Market structure', def:'The shape of prices across delivery months. Contango slopes up, backwardation slopes down. It drives the economics of storage and hedging.' },
    { key:'forwardcurve', term:'Forward curve', category:'Market structure', def:'The set of prices for delivery at future dates (M1–M6 here). Its slope is the term structure.' },
    { key:'spot', term:'Spot price', category:'Market structure', def:'The price for immediate (prompt) delivery, as opposed to a future/forward date.' },
    { key:'basis', term:'Basis', category:'Market structure', def:'The difference between the local physical price at a hub and the benchmark/reference price. Trading basis is a core physical-merchant skill.' },
    { key:'hedge', term:'Hedge ratio', category:'Risk', def:'The share of a position protected with an offsetting paper trade. A 100% hedge locks the margin and removes flat-price risk; 0% leaves you fully exposed to price moves.' },
    { key:'margincall', term:'Margin call', category:'Risk', def:'A demand for additional cash collateral when a hedge moves against you. Enough liquidity to meet margin calls is essential to survive volatility.' },
    { key:'var', term:'Value at Risk (VaR)', category:'Risk', def:'An estimate of the maximum loss expected over a period at a given confidence level. A headline risk metric for the desk.' },
    { key:'kyc', term:'KYC', category:'Compliance', def:'Know Your Customer — the due-diligence process to verify a counterparty\'s identity, ownership and legitimacy before trading.' },
    { key:'compliance', term:'Compliance review', category:'Compliance', def:'A check that a route, counterparty or structure meets sanctions, AML and internal-policy requirements before a deal can proceed.' },
    { key:'demurrage', term:'Demurrage', category:'Logistics', def:'A penalty paid to a vessel owner when loading or discharge takes longer than the agreed laytime. A common cost when ports are congested.' },
    { key:'laycan', term:'Laycan', category:'Logistics', def:'The window (laydays/cancelling) during which a vessel must arrive to load. Missing it can void the charter.' },
    { key:'charter', term:'Time charter', category:'Logistics', def:'Hiring a vessel for a period at a daily rate. You control the voyages; the owner runs the ship. Owned vessels avoid the rate but carry maintenance.' },
    { key:'lc', term:'Letter of credit (L/C)', category:'Finance', def:'A bank guarantee that the buyer will pay once compliant shipping documents are presented. It reduces payment risk in cross-border trade.' },
    { key:'nav', term:'Net asset value (NAV)', category:'Finance', def:'The total value of the trading house: cash, open-position value and asset book value, net of what you owe.' },
    { key:'creditline', term:'Credit line', category:'Finance', def:'The revolving financing the bank extends to fund inventory and receivables. Using it costs interest; exceeding it blocks new deals.' },
    { key:'enterprisevalue', term:'Enterprise valuation', category:'Finance', def:'A forward-looking value of the whole business — NAV plus capitalised earnings, assets, relationships and execution track record. Reaching $50M wins the game.' },
    { key:'regime', term:'Market regime', category:'Market', def:'The prevailing market mood (balanced, risk-on, soft, freight-driven, squeeze) that shifts volatility, margins and acceptance across all commodities.' },
    { key:'tender', term:'Tender', category:'Commercial', def:'A competitive bid process where you and AI rivals compete to win a cargo. Conceding margin raises your win probability.' },
    { key:'prestige', term:'Prestige', category:'Progression', def:'A legacy reset: once you reach the top valuation tier you can restart with permanent bonuses (+12% capital, +8% credit, higher reputation per level).' },
  ];
  const glossaryMap = Object.fromEntries(glossaryTerms.map(t => [t.key, t]));

  let _tooltipEl = null;
  function ensureTooltipEl() {
    if (_tooltipEl) return _tooltipEl;
    _tooltipEl = document.createElement('div');
    _tooltipEl.className = 'term-tooltip';
    _tooltipEl.setAttribute('role', 'tooltip');
    document.body.appendChild(_tooltipEl);
    return _tooltipEl;
  }
  function showTermTooltip(target) {
    const key = target.getAttribute('data-term');
    const entry = glossaryMap[key];
    if (!entry) return;
    const tip = ensureTooltipEl();
    tip.innerHTML = `<strong>${entry.term}</strong><span>${entry.def}</span>`;
    tip.classList.add('visible');
    const r = target.getBoundingClientRect();
    const tw = Math.min(260, window.innerWidth - 20);
    tip.style.width = tw + 'px';
    let left = r.left + r.width/2 - tw/2;
    left = Math.max(10, Math.min(left, window.innerWidth - tw - 10));
    tip.style.left = left + 'px';
    // Place above if room, else below
    const th = tip.offsetHeight || 90;
    let top = r.top - th - 8;
    if (top < 10) top = r.bottom + 8;
    tip.style.top = top + 'px';
  }
  function hideTermTooltip() { if (_tooltipEl) _tooltipEl.classList.remove('visible'); }
  function bindTermTooltips() {
    document.addEventListener('mouseover', e => {
      const t = e.target.closest?.('[data-term]');
      if (t) showTermTooltip(t);
    });
    document.addEventListener('mouseout', e => {
      if (e.target.closest?.('[data-term]')) hideTermTooltip();
    });
    document.addEventListener('focusin', e => {
      const t = e.target.closest?.('[data-term]');
      if (t) showTermTooltip(t);
    });
    document.addEventListener('focusout', hideTermTooltip);
    window.addEventListener('scroll', hideTermTooltip, true);
  }
  function updateNotificationsBadge() {
    const badge = $('#notificationsBadge');
    if (!badge) return;
    if (notificationsUnread > 0) { badge.textContent = String(notificationsUnread); badge.classList.remove('hidden'); }
    else badge.classList.add('hidden');
  }
  function timeAgo(ts) {
    const s = Math.floor((Date.now() - ts) / 1000);
    if (s < 45) return 'just now';
    if (s < 90) return '1 min ago';
    if (s < 3600) return `${Math.floor(s/60)} min ago`;
    if (s < 7200) return '1 hr ago';
    return `${Math.floor(s/3600)} hr ago`;
  }
  function openNotificationsDialog() {
    const dialog = $('#notificationsDialog');
    if (!dialog) return;
    const list = $('#notificationsList');
    if (list) {
      if (!notificationHistory.length) {
        list.innerHTML = '<div class="empty-card">No notifications yet. Your actions and market alerts will be logged here.</div>';
      } else {
        const icons = { success:'✓', error:'✕', warning:'!', info:'ℹ' };
        list.innerHTML = notificationHistory.map(n => `
          <div class="notif-entry notif-${n.kind}">
            <span class="notif-icon">${icons[n.kind] || 'ℹ'}</span>
            <div class="notif-body"><span class="notif-msg">${n.message.replace(/</g,'&lt;')}</span><span class="notif-time">${timeAgo(n.at)}</span></div>
          </div>`).join('');
      }
    }
    notificationsUnread = 0;
    updateNotificationsBadge();
    if (!dialog.open) dialog.showModal();
  }

  function openGlossaryDialog() {
    const dialog = $('#glossaryDialog');
    if (!dialog) return;
    const list = $('#glossaryList');
    if (list) {
      const cats = [...new Set(glossaryTerms.map(t => t.category))];
      list.innerHTML = cats.map(cat => `
        <div class="glossary-cat">${cat}</div>
        ${glossaryTerms.filter(t => t.category === cat).map(t => `
          <div class="glossary-entry"><strong>${t.term}</strong><p>${t.def}</p></div>`).join('')}
      `).join('');
    }
    if (!dialog.open) dialog.showModal();
  }

  // ── v28 lightweight i18n (interface chrome) ─────────────────────────────────
  const translationsIT = {
    // Topbar & metrics
    'brand.subtitle': 'Comando Trading Fisico · HQ Ginevra',
    'metric.nav': 'NAV Portafoglio', 'metric.cash': 'Liquidità', 'metric.credit': 'Credito', 'metric.reputation': 'Reputazione',
    // Command dock
    'dock.desk': 'Scrivania', 'dock.shop': 'Negozio', 'dock.overview': 'Panoramica', 'dock.markets': 'Mercati',
    'dock.layers': 'Livelli', 'dock.search': 'Cerca', 'dock.briefing': 'Briefing', 'dock.keys': 'Tasti', 'dock.glossary': 'Glossario',
    // Buttons / titles
    'btn.newCareer': 'Nuova carriera', 'btn.notifications': 'Notifiche', 'btn.install': 'Installa World of Trade', 'btn.profile': 'Profilo giocatore',
    // Profile dialog
    'profile.eyebrow': 'Profilo giocatore', 'profile.title': 'Carriera e impostazioni',
    'profile.traderName': 'Nome trader', 'profile.house': 'Società di trading', 'profile.graphics': 'Qualità grafica',
    'profile.autosave': 'Salvataggio automatico', 'profile.motion': 'Movimento e animazioni', 'profile.sound': 'Effetti sonori',
    'profile.language': 'Lingua',
    'opt.enabled': 'Attivo', 'opt.disabled': 'Disattivato', 'opt.on': 'Attivo', 'opt.muted': 'Muto',
    'opt.auto': 'Auto', 'opt.high': 'Alta', 'opt.balanced': 'Bilanciata', 'opt.performance': 'Prestazioni',
    'opt.fullAnim': 'Animazioni complete', 'opt.reducedMotion': 'Movimento ridotto',
    'profile.export': 'Esporta carriera', 'profile.import': 'Importa carriera', 'profile.manageSlots': 'Gestisci slot',
    'profile.restartTour': 'Riavvia tour guidato',
    'profile.storageTitle': 'Salvataggio locale', 'profile.storageNote': 'La tua carriera è salvata in questo browser. Esporta un backup prima di cambiare dispositivo o cancellare i dati del browser.',
    'btn.cancel': 'Annulla', 'btn.save': 'Salva modifiche',
    // Dialog headers
    'dlg.glossary.eyebrow': 'Riferimento', 'dlg.glossary.title': 'Glossario del trading',
    'dlg.notif.eyebrow': 'Attività', 'dlg.notif.title': 'Notifiche',
    'dlg.slots.eyebrow': 'Carriere', 'dlg.slots.title': 'Slot di salvataggio',
    'dlg.shortcuts.title': 'Scorciatoie da tastiera',
    'shortcuts.nav': 'Navigazione', 'shortcuts.actions': 'Azioni e vista',
    'sc.command': 'Centro comandi', 'sc.search': 'Ricerca globale', 'sc.market': 'Mercato opportunità',
    'sc.risk': 'Dashboard rischio', 'sc.perf': 'Ufficio performance', 'sc.shop': 'Negozio impero',
    'sc.briefing': 'Briefing giornaliero', 'sc.day': 'Avanza di un giorno', 'sc.cinematic': 'Globo cinematografico',
    'sc.glossary': 'Glossario del trading', 'sc.help': 'Questo pannello',
    'sc.footer': 'Premi ? in qualsiasi momento per aprire questo pannello',
    // Time controls
    'time.pause': 'Pausa', 'time.day': '+1 giorno', 'time.event': 'Prossimo evento',
    'globe.date': 'Data di gioco',
    // Layers
    'layer.opportunities': 'Opportunità', 'layer.portfolio': 'Portafoglio', 'layer.risk': 'Rischio', 'layer.logistics': 'Logistica',
  };
  const drawerLabelsIT = {
    portfolio:'Scrivania trading', inventory:'Inventario fisico', operations:'Centro operazioni', supply:'Controllo supply chain', contracts:'Contratti e credito',
    fleet:'Ufficio flotta', risk:'Dashboard rischio', opportunities:'Mercato opportunità', rivals:'Intelligence competitiva', strategy:'Strategia del board',
    counterparties:'Rete commerciale', compliance:'Ufficio compliance', events:'Intelligence globale', finance:'Tesoreria', performance:'Ufficio performance',
    academy:'WoT Academy', empire:'Impero di trading', shop:'Negozio impero', hq:'Quartier generale',
    career:'Progressione carriera', leaderboard:'Career League'
  };
  function t(key) {
    if (state && state.language === 'it' && translationsIT[key] != null) return translationsIT[key];
    return null; // null → keep original
  }
  function applyLanguage(lang) {
    const useIT = lang === 'it';
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (el._i18nEn == null) el._i18nEn = el.textContent;
      el.textContent = (useIT && translationsIT[key] != null) ? translationsIT[key] : el._i18nEn;
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (el._i18nTitleEn == null) el._i18nTitleEn = el.getAttribute('title') || '';
      const v = (useIT && translationsIT[key] != null) ? translationsIT[key] : el._i18nTitleEn;
      if (v) el.setAttribute('title', v);
    });
    document.documentElement.setAttribute('lang', useIT ? 'it' : 'en');
  }

  const formatDate = (date) => new Intl.DateTimeFormat('en-GB', {
    day: '2-digit', month: 'long', year: 'numeric'
  }).format(date);

  const hubs = [
    { id: 'geneva', name: 'Geneva', country: 'Switzerland', type: 'hq', lat: 46.2044, lon: 6.1432, subtitle: 'Northstar Commodities SA', description: 'The headquarters coordinates capital, risk, compliance and the desk’s banking relationships.', commodities: ['Base metals', 'Energy', 'Risk management'], risk: 'Low' },
    { id: 'brescia', name: 'Brescia', country: 'Italy', type: 'customer', lat: 45.5416, lon: 10.2118, subtitle: 'Lombardia Cables S.p.A.', description: 'Industrial district with demand for refined copper and strict quality requirements.', commodities: ['Copper cathodes', 'Aluminium', 'Scrap'], risk: 'Low' },
    { id: 'genova', name: 'Genoa', country: 'Italy', type: 'port', lat: 44.4056, lon: 8.9463, subtitle: 'Port of Genoa', description: 'Maritime gateway for deliveries to Northern Italy.', commodities: ['Containers', 'Bulk cargo', 'Warehousing'], risk: 'Medium' },
    { id: 'tallinn', name: 'Tallinn', country: 'Estonia', type: 'supplier', lat: 59.437, lon: 24.7536, subtitle: 'Baltic Metals OU', description: 'Fast, capital-light European supplier whose quality documentation requires verification.', commodities: ['Copper cathodes', 'Recycled metals'], risk: 'Low' },
    { id: 'santiago', name: 'Santiago', country: 'Chile', type: 'supplier', lat: -33.4489, lon: -70.6693, subtitle: 'Andean Copper Ltd.', description: 'Competitive access to Chilean production, with a long transit time and more capital tied up.', commodities: ['Copper cathodes', 'Copper concentrate', 'Molybdenum'], risk: 'Medium' },
    { id: 'dubai', name: 'Dubai', country: 'UAE', type: 'supplier', lat: 25.2048, lon: 55.2708, subtitle: 'Meridian Resources DMCC', description: 'Aggressive premiums, but higher counterparty and compliance risk.', commodities: ['Base metals', 'Oil products', 'Trade finance'], risk: 'High' },
    { id: 'casablanca', name: 'Casablanca', country: 'Morocco', type: 'supplier', lat: 33.5731, lon: -7.5898, subtitle: 'Atlas Fertilizers SA', description: 'North African fertilizer hub with short transit times into the Mediterranean.', commodities: ['Urea', 'Phosphates', 'Fertilizers'], risk: 'Medium', locked: true },
    { id: 'rotterdam', name: 'Rotterdam', country: 'Netherlands', type: 'port', lat: 51.9244, lon: 4.4777, subtitle: 'European Logistics Hub', description: 'Unlockable logistics hub with storage, blending and access to more European customers.', commodities: ['Metals', 'Energy', 'Storage'], risk: 'Low', locked: true },
    { id: 'singapore', name: 'Singapore', country: 'Singapore', type: 'port', lat: 1.3521, lon: 103.8198, subtitle: 'Asia Trading Hub', description: 'Advanced market unlocked by increasing reputation and capital.', commodities: ['Metals', 'Oil', 'Freight'], risk: 'Medium', locked: true },
    { id: 'santos', name: 'Santos', country: 'Brazil', type: 'supplier', lat: -23.9608, lon: -46.3336, subtitle: 'Santos Export Terminal', description: 'Main export gateway for Brazilian coffee and soft commodities.', commodities: ['Coffee', 'Sugar', 'Soybeans'], risk: 'Medium', locked: true },
    { id: 'rosario', name: 'Rosario', country: 'Argentina', type: 'supplier', lat: -32.9442, lon: -60.6505, subtitle: 'Paraná Grain Corridor', description: 'Agricultural origination with high seasonality, quality risk and river-level risk.', commodities: ['Wheat', 'Corn', 'Soymeal'], risk: 'Medium', locked: true },
    { id: 'port-hedland', name: 'Port Hedland', country: 'Australia', type: 'supplier', lat: -20.3107, lon: 118.6011, subtitle: 'Pilbara Bulk Export Hub', description: 'Large dry-bulk iron ore cargoes with heavy exposure to freight and port scheduling.', commodities: ['Iron ore', 'Manganese', 'Dry bulk'], risk: 'Low', locked: true },
    { id: 'shanghai', name: 'Shanghai', country: 'China', type: 'customer', lat: 31.2304, lon: 121.4737, subtitle: 'Yangtze Industrial Market', description: 'Large-scale steel and industrial demand with strict quality and laycan discipline.', commodities: ['Iron ore', 'Copper', 'Energy'], risk: 'Medium', locked: true },
    { id: 'doha', name: 'Doha', country: 'Qatar', type: 'supplier', lat: 25.2854, lon: 51.5310, subtitle: 'Qatar Energy Trading', description: 'World-class LNG infrastructure with competitive FOB loading programs and strict vessel vetting.', commodities: ['LNG', 'Condensates', 'Crude oil'], risk: 'Low', locked: true },
    { id: 'klang', name: 'Port Klang', country: 'Malaysia', type: 'supplier', lat: 3.0333, lon: 101.3833, subtitle: 'Malaysian Agri-Hub', description: 'Leading palm oil export terminal with grading, storage and RSPO sustainability documentation.', commodities: ['Palm oil', 'Tropical agris', 'Rubber'], risk: 'Low', locked: true },
    { id: 'abidjan', name: 'Abidjan', country: 'Ivory Coast', type: 'supplier', lat: 5.3600, lon: -4.0083, subtitle: "Côte d'Ivoire Cocoa Terminal", description: "World’s largest cocoa exporting port. Quality grading, humidity control and export certification are critical. High-margin origin for premium European buyers.", commodities: ['Cocoa', 'Cashew', 'Rubber'], risk: 'Medium', locked: true },
    { id: 'new-orleans', name: 'New Orleans', country: 'USA', type: 'supplier', lat: 29.9511, lon: -90.0715, subtitle: 'Gulf Coast Grain Export Hub', description: 'Dominant US grain and oilseed export corridor with access to Midwest origination, deep-water loading and competitive Gulf Coast basis.', commodities: ['Soybeans', 'Corn', 'Soy meal'], risk: 'Low', locked: true },
    { id: 'antwerp', name: 'Antwerp', country: 'Belgium', type: 'port', lat: 51.2194, lon: 4.4025, subtitle: 'ARA Chemical & Metals Hub', description: "Europe's largest chemical port and leading steel import terminal. Deep connections to Rhine hinterland and direct access to Northern European buyers.", commodities: ['Steel', 'Chemicals', 'Non-ferrous metals'], risk: 'Low', locked: true },
    { id: 'durban', name: 'Durban', country: 'South Africa', type: 'supplier', lat: -29.8587, lon: 31.0218, subtitle: 'Southern Africa Metals Gateway', description: 'Africa\'s busiest port and key conduit for Zambian copper, South African manganese and chrome ore. Deep-water quays handle Capesize bulk vessels.', commodities: ['Copper', 'Chrome ore', 'Zinc', 'Coal'], risk: 'Medium', locked: true },
    { id: 'houston', name: 'Houston', country: 'USA', type: 'supplier', lat: 29.7604, lon: -95.3698, subtitle: 'US Gulf Energy Hub', description: 'America\'s premier energy export gateway. Home to LNG liquefaction terminals, petrochemical complexes and grain elevator networks.', commodities: ['LNG', 'Crude', 'Petrochemicals', 'Grain'], risk: 'Low', locked: true }
  ];

  const opportunities = [
    {
      id: 'baltic-copper', origin: 'tallinn', destination: 'brescia', via: [], commodity: 'Copper', quantity: 500,
      capital: 1_650_000, equity: 240_000, basePnl: 38_000, duration: 28, risk: 'Low', riskClass: 'low', priceKey: 'copper', recommendedHedge: 100, transportMode: 'Rail / Truck',
      title: 'Baltic Express', description: 'Short overland route, lower capital usage and manageable documentary risk.',
      unlock: () => true,
      event: {
        dayRatio: .43,
        title: 'Incomplete quality certificate',
        text: 'The certificate received is missing a specification required by the customer. The cargo is already in transit.',
        choices: [
          { id: 'inspect', label: 'Order an independent inspection', hint: 'Cost $7,500 · protects reputation and reduces the claim', pnl: -7_500, days: 1, reputation: 1, result: 'The inspection confirms compliance and the customer accepts the documents.' },
          { id: 'accept', label: 'Accept the documentary risk', hint: 'No immediate cost · possible claim at delivery', random: true, good: { pnl: 0, reputation: 0, result: 'The customer accepts the documentation without objection.' }, bad: { pnl: -24_000, reputation: -4, result: 'The customer applies a discount for incomplete documentation.' } }
        ]
      }
    },
    {
      id: 'andean-copper', origin: 'santiago', destination: 'brescia', via: ['genova'], commodity: 'Copper', quantity: 500,
      capital: 3_600_000, equity: 600_000, basePnl: 76_000, duration: 65, risk: 'Medium', riskClass: 'medium', priceKey: 'copper', recommendedHedge: 80, transportMode: 'Ocean / Truck',
      title: 'Andean Atlantic', description: 'Higher margin, strong production origin and a long ocean route via Genoa.',
      unlock: () => true,
      event: {
        dayRatio: .52,
        title: 'Atlantic storm',
        text: 'The vessel loses speed and may miss the delivery window in Brescia.',
        choices: [
          { id: 'wait', label: 'Maintain the route to Genoa', hint: 'Cost $15,000 · estimated delay 8 days', pnl: -15_000, days: 8, reputation: -1, result: 'The vessel arrives late, but the customer accepts the revised window.' },
          { id: 'reroute', label: 'Reroute to Rotterdam', hint: 'Cost $32,000 · reduces the delay to 4 days', pnl: -32_000, days: 4, reputation: 2, result: 'The rerouting protects the customer but compresses the margin.' }
        ]
      }
    },
    {
      id: 'meridian-copper', origin: 'dubai', destination: 'brescia', via: ['genova'], commodity: 'Copper', quantity: 500,
      capital: 3_200_000, equity: 480_000, basePnl: 104_000, duration: 48, risk: 'High', riskClass: 'high', priceKey: 'copper', recommendedHedge: 60, transportMode: 'Ocean / Truck',
      title: 'Meridian Premium', description: 'Attractive premium, but compliance and quality require deeper checks.',
      unlock: () => true,
      event: {
        dayRatio: .31,
        title: 'Counterparty compliance alert',
        text: 'The bank flags an opaque ownership structure before processing the letter of credit.',
        choices: [
          { id: 'kyc', label: 'Launch enhanced KYC', hint: 'Cost $12,000 · 5 days · reduces risk', pnl: -12_000, days: 5, reputation: 3, result: 'Enhanced due diligence clarifies the structure and the bank proceeds.' },
          { id: 'proceed', label: 'Proceed without further checks', hint: 'Preserve the margin · risk of blockage and sanctions', random: true, good: { pnl: 0, reputation: -1, result: 'The bank processes the payment, but the risk desk flags the decision.' }, bad: { pnl: -90_000, reputation: -12, result: 'The bank blocks the payment and the deal closes with a significant loss.' } },
          { id: 'cancel', label: 'Cancel the deal', hint: 'Certain $35,000 loss · preserves compliance', pnl: -139_000, days: 0, reputation: 1, result: 'The deal is terminated early and the remaining capital is released.', forceComplete: true }
        ]
      }
    },
    {
      id: 'rotterdam-alloy', origin: 'rotterdam', destination: 'brescia', via: [], commodity: 'Aluminium', quantity: 350,
      capital: 2_100_000, equity: 330_000, basePnl: 59_000, duration: 24, risk: 'Low', riskClass: 'low', priceKey: 'aluminium', recommendedHedge: 100, transportMode: 'Barge / Rail',
      title: 'Rhine–Alps Alloy', description: 'High-turnover European corridor available after opening the Rotterdam desk.',
      unlock: (s) => officeOwned('rotterdam')
    },
    {
      id: 'maghreb-urea', origin: 'casablanca', destination: 'brescia', via: ['genova'], commodity: 'Urea', quantity: 900,
      capital: 1_800_000, equity: 280_000, basePnl: 64_000, duration: 21, risk: 'Medium', riskClass: 'medium', priceKey: 'urea', recommendedHedge: 70, transportMode: 'Coaster / Truck',
      title: 'Maghreb Nutrients', description: 'Urea parcel from North Africa to the Italyn agricultural market. Fast margin, but quality and port congestion require strong execution.',
      unlock: (s) => officeOwned('genova') && s.completedDeals >= 2,
      event: {
        dayRatio: .48,
        title: 'Congestion at the fertilizer terminal',
        text: 'The Genoa terminal reports a discharge delay. The cargo faces extra storage and a potential missed delivery.',
        choices: [
          { id: 'priority-berth', label: 'Buy berth priority', hint: 'Cost $11,000 · protects ETA and customer relationship', pnl: -11_000, days: 1, reputation: 2, result: 'The priority slot allows discharge close to schedule.' },
          { id: 'wait-urea', label: 'Wait for the standard slot', hint: 'No upfront cost · 4 days and claim risk', random: true, good: { pnl: -6_000, days: 4, reputation: 0, result: 'The delay remains manageable and the customer accepts the revised ETA.' }, bad: { pnl: -28_000, days: 6, reputation: -3, result: 'The customer files a claim and the terminal charges extra storage.' } }
        ]
      }
    },
    {
      id: 'asia-aluminium', origin: 'dubai', destination: 'singapore', via: [], commodity: 'Aluminium', quantity: 600,
      capital: 2_800_000, equity: 430_000, basePnl: 96_000, duration: 25, risk: 'Medium', riskClass: 'medium', priceKey: 'aluminium', recommendedHedge: 100, transportMode: 'Multipurpose vessel',
      title: 'Gulf–Asia Aluminium', description: 'Regional arbitrage into Singapore with high turnover and strict documentary discipline.',
      unlock: (s) => officeOwned('singapore'),
      event: {
        dayRatio: .36,
        title: 'Letter-of-credit discrepancy',
        text: 'The receiving bank identifies a mismatch between the cargo description and packing list.',
        choices: [
          { id: 'amend-lc', label: 'Request an immediate amendment', hint: 'Cost $8,500 · 2 days · protects settlement', pnl: -8_500, days: 2, reputation: 2, result: 'The amendment is accepted and the documents become compliant.' },
          { id: 'waiver', label: 'Request a waiver from the buyer', hint: 'Low cost · depends on the commercial relationship', random: true, good: { pnl: -2_000, days: 1, reputation: 1, result: 'The buyer grants the waiver and the bank processes the documents.' }, bad: { pnl: -35_000, days: 5, reputation: -4, result: 'The buyer rejects the waiver and payment is delayed.' } }
        ]
      }
    },
    {
      id: 'atlantic-diesel', origin: 'houston', destination: 'rotterdam', via: [], commodity: 'Diesel', quantity: 18000,
      capital: 8_600_000, equity: 1_250_000, basePnl: 210_000, duration: 27, risk: 'Medium', riskClass: 'medium', priceKey: 'crude', recommendedHedge: 90, transportMode: 'Product tanker',
      title: 'Gulf–ARA Distillates', description: 'Energy cargo from the Gulf Coast to the ARA market. Heavy working-capital use, crack/basis risk and strict quality management.',
      unlock: s => officeOwned('rotterdam') && s.completedDeals >= 3 && s.reputation >= 62,
      event: { dayRatio: .46, title: 'Off-spec sulfur test', text: 'The discharge laboratory reports sulphur content close to the contractual limit.', choices: [
        { id: 'retest-fuel', label: 'Appoint an independent inspector', hint: 'Cost $18,000 · protects the documentary position', pnl: -18_000, days: 2, reputation: 2, result: 'The retest confirms compliance and the buyer accepts the cargo.' },
        { id: 'blend-fuel', label: 'Arrange terminal blending', hint: 'Cost $42,000 · reduces claim and delay risk', pnl: -42_000, days: 3, reputation: 3, result: 'Blending brings the product fully on specification.' },
        { id: 'waive-fuel', label: 'Negotiate a discount with the buyer', hint: 'Fast · possible major margin reduction', random: true, good: { pnl: -26_000, days: 0, reputation: 0, result: 'The buyer accepts a small allowance.' }, bad: { pnl: -105_000, days: 2, reputation: -5, result: 'The buyer applies a significant quality claim.' } }
      ]}
    },
    {
      id: 'brazil-coffee', origin: 'santos', destination: 'brescia', via: ['genova'], commodity: 'Coffee', quantity: 600,
      capital: 3_150_000, equity: 470_000, basePnl: 102_000, duration: 38, risk: 'Medium', riskClass: 'medium', priceKey: 'coffee', recommendedHedge: 80, transportMode: 'Container / Truck',
      title: 'Santos Coffee Flow', description: 'Brazilian arabica origination for a European buyer. Quality differentials, FX and phytosanitary documents are central.',
      unlock: s => officeOwned('genova') && s.completedDeals >= 3 && s.reputation >= 58,
      event: { dayRatio: .58, title: 'Moisture deviation', text: 'The inspection detects moisture above the expected level in part of the bags.', choices: [
        { id: 'dry-coffee', label: 'Recondition and dry the cargo', hint: 'Cost $21,000 · 3 days · preserves quality', pnl: -21_000, days: 3, reputation: 2, result: 'The lot is reconditioned and delivered on specification.' },
        { id: 'discount-coffee', label: 'Grant a quality allowance', hint: 'No delay · uncertain commercial loss', random: true, good: { pnl: -16_000, days: 0, reputation: 1, result: 'The buyer accepts a limited allowance.' }, bad: { pnl: -54_000, days: 0, reputation: -2, result: 'The buyer imposes a large quality differential.' } }
      ]}
    },
    {
      id: 'argentina-wheat', origin: 'rosario', destination: 'brescia', via: ['genova'], commodity: 'Wheat', quantity: 5000,
      capital: 2_350_000, equity: 350_000, basePnl: 88_000, duration: 31, risk: 'Medium', riskClass: 'medium', priceKey: 'wheat', recommendedHedge: 75, transportMode: 'Handysize / Truck',
      title: 'Paraná Wheat Parcel', description: 'Grain origination from the Paraná to Northern Italy. Basis, protein content and river logistics determine the outcome.',
      unlock: s => officeOwned('genova') && s.completedDeals >= 4 && s.reputation >= 60,
      event: { dayRatio: .28, title: 'Low river level', text: 'The Paraná river level reduces available draft and loadable quantity.', choices: [
        { id: 'lighten-wheat', label: 'Reduce the parcel and buy replacement cargo', hint: 'Cost $24,000 · protects delivery quantity', pnl: -24_000, days: 2, reputation: 2, result: 'The missing quantity is covered with a replacement purchase.' },
        { id: 'wait-river', label: 'Wait for the river level to improve', hint: '5 days · possible laycan penalty', random: true, good: { pnl: -9_000, days: 5, reputation: 0, result: 'The river level rises and the full cargo departs.' }, bad: { pnl: -48_000, days: 8, reputation: -3, result: 'The wait generates deadfreight and a late delivery.' } }
      ]}
    },
    {
      id: 'pilbara-iron', origin: 'port-hedland', destination: 'shanghai', via: [], commodity: 'Iron ore', quantity: 55000,
      capital: 7_400_000, equity: 1_150_000, basePnl: 245_000, duration: 34, risk: 'High', riskClass: 'high', priceKey: 'ironore', recommendedHedge: 70, transportMode: 'Panamax bulk carrier',
      title: 'Pilbara–Yangtze Ore', description: 'Large dry-bulk cargo to China. Freight, Fe grade, moisture and port congestion dominate P&L.',
      unlock: s => officeOwned('singapore') && s.completedDeals >= 6 && s.reputation >= 70,
      event: { dayRatio: .64, title: 'Shanghai anchorage congestion', text: 'The vessel joins the queue and may exceed allowed laytime.', choices: [
        { id: 'priority-ore', label: 'Buy discharge priority', hint: 'Cost $36,000 · limits demurrage', pnl: -36_000, days: 1, reputation: 2, result: 'The terminal assigns a priority window.' },
        { id: 'queue-ore', label: 'Remain in the queue', hint: 'No upfront cost · uncertain demurrage', random: true, good: { pnl: -18_000, days: 3, reputation: 0, result: 'The queue clears faster than expected.' }, bad: { pnl: -92_000, days: 7, reputation: -4, result: 'The delay generates demurrage and a buyer claim.' } }
      ]}
    },
    {
      id: 'qatar-lng', origin: 'doha', destination: 'rotterdam', via: [], commodity: 'LNG', quantity: 65000,
      capital: 12_800_000, equity: 1_900_000, basePnl: 360_000, duration: 22, risk: 'Medium', riskClass: 'medium', priceKey: 'crude', recommendedHedge: 85, transportMode: 'LNG carrier',
      title: 'Qatar LNG Express', description: 'High-value LNG cargo from the Persian Gulf to the ARA market. Strict vetting, cargo quality control and a precision laycan make execution the decisive edge.',
      unlock: s => officeOwned('rotterdam') && s.completedDeals >= 5 && s.reputation >= 68,
      event: {
        dayRatio: .38,
        title: 'Cargo boil-off deviation',
        text: 'Voyage boil-off exceeds contractual tolerance, reducing deliverable volume and raising a quality query at Rotterdam.',
        choices: [
          { id: 'compensate-lng', label: 'Offer volume compensation', hint: 'Cost $28,000 · protects the buyer relationship', pnl: -28_000, days: 1, reputation: 2, result: 'The buyer accepts the compensation and the LC is settled on time.' },
          { id: 'dispute-lng', label: 'Dispute the measurement at discharge', hint: 'No upfront cost · 4 days · could resolve in your favour', random: true, good: { pnl: 0, days: 4, reputation: 1, result: 'An independent surveyor confirms the boil-off was within tolerance.' }, bad: { pnl: -68_000, days: 4, reputation: -4, result: 'The survey confirms the deviation and the buyer applies a material quantity claim.' } }
        ]
      }
    },
    {
      id: 'ivory-cocoa', origin: 'abidjan', destination: 'brescia', via: ['genova'], commodity: 'Cocoa', quantity: 800,
      capital: 5_600_000, equity: 820_000, basePnl: 168_000, duration: 42, risk: 'Medium', riskClass: 'medium', priceKey: 'coffee', recommendedHedge: 75, transportMode: 'Container / reefer',
      title: "Côte d'Ivoire Cocoa Flow", description: 'Premium West African cocoa for Italian fine-chocolate manufacturers. Grading certification, humidity control and traceability documentation are the execution-critical variables.',
      tender: true,
      unlock: s => officeOwned('genova') && s.completedDeals >= 5 && s.reputation >= 66,
      event: {
        dayRatio: .42,
        title: 'Off-grade bean discovery',
        text: 'Discharge sampling in Genoa finds a proportion of beans below contracted minimum grade, triggering a buyer quality dispute.',
        choices: [
          { id: 'regrade-cocoa', label: 'Commission independent regrading', hint: 'Cost $14,000 · 2 days · produces binding result', pnl: -14_000, days: 2, reputation: 2, result: 'Independent graders confirm the bulk of the parcel meets specification.' },
          { id: 'allowance-cocoa', label: 'Negotiate a quality allowance', hint: 'Fast · uncertain margin reduction', random: true, good: { pnl: -22_000, days: 0, reputation: 1, result: 'The buyer accepts a moderate allowance for the off-grade fraction.' }, bad: { pnl: -80_000, days: 2, reputation: -4, result: 'The buyer rejects the cargo and demands a full quality re-run, causing major margin erosion.' } }
        ]
      }
    },
    {
      id: 'gulf-soybeans', origin: 'new-orleans', destination: 'rotterdam', via: [], commodity: 'Soybeans', quantity: 25000,
      capital: 9_200_000, equity: 1_350_000, basePnl: 290_000, duration: 28, risk: 'Medium', riskClass: 'medium', priceKey: 'wheat', recommendedHedge: 85, transportMode: 'Panamax bulk carrier',
      title: 'Gulf–ARA Soybean Express', description: 'Large Panamax soybean cargo from the US Gulf to the ARA crushing complex. Basis risk (CBOT vs physical), moisture and protein differentials determine final P&L.',
      unlock: s => officeOwned('rotterdam') && s.completedDeals >= 6 && s.reputation >= 70,
      event: {
        dayRatio: .35,
        title: 'Moisture content above specification',
        text: 'Load-port analysis detects moisture levels at the upper limit of the contractual range, raising concerns at the European crushing plant.',
        choices: [
          { id: 'retest-soy', label: 'Request a reefer pre-treatment and retest', hint: 'Cost $26,000 · 3 days · brings cargo within spec', pnl: -26_000, days: 3, reputation: 2, result: 'Post-treatment moisture is within contract range and the buyer accepts the documentation.' },
          { id: 'accept-soy', label: 'Accept on current certificates', hint: 'No cost · buyer may apply arrival claim', random: true, good: { pnl: 0, days: 0, reputation: 0, result: 'Discharge analysis confirms moisture within tolerance; no claim is raised.' }, bad: { pnl: -88_000, days: 2, reputation: -4, result: 'Arrival analysis confirms an excess, and the crushing plant applies a significant quality differential.' } }
        ]
      }
    },
    {
      id: 'shanghai-steel', origin: 'shanghai', destination: 'antwerp', via: [], commodity: 'Steel', quantity: 8000,
      capital: 6_800_000, equity: 980_000, basePnl: 198_000, duration: 36, risk: 'High', riskClass: 'high', priceKey: 'ironore', recommendedHedge: 65, transportMode: 'General cargo vessel',
      title: 'Yangtze Steel Export', description: 'Chinese hot-rolled coil destined for European distribution. Anti-dumping duty risk, mill certificate compliance and strict EU import documentation make this the most legally complex corridor.',
      unlock: s => officeOwned('singapore') && s.completedDeals >= 7 && s.reputation >= 74,
      event: {
        dayRatio: .52,
        title: 'EU anti-dumping duty investigation',
        text: 'Customs authorities at Antwerp flag the cargo for enhanced documentary review under an active anti-dumping investigation.',
        choices: [
          { id: 'legal-steel', label: 'Engage trade counsel and expedite customs', hint: 'Cost $38,000 · 4 days · clears documentary position', pnl: -38_000, days: 4, reputation: 2, result: 'Trade counsel demonstrates conformity with EU rules of origin and the cargo clears.' },
          { id: 'wait-steel', label: 'Wait for standard customs clearance', hint: 'No upfront cost · major delay risk', random: true, good: { pnl: -12_000, days: 5, reputation: 0, result: 'Standard review concludes with no additional duty applied, but the delay generates storage costs.' }, bad: { pnl: -180_000, days: 12, reputation: -6, result: 'Anti-dumping duty is provisionally applied and the cargo is detained pending legal challenge.' } }
        ]
      }
    },
    {
      id: 'malaysia-palm', origin: 'klang', destination: 'brescia', via: ['singapore', 'genova'], commodity: 'Palm oil', quantity: 6000,
      capital: 4_200_000, equity: 650_000, basePnl: 128_000, duration: 39, risk: 'Medium', riskClass: 'medium', priceKey: 'crude', recommendedHedge: 70, transportMode: 'Vegetable oil tanker',
      title: 'Sunflower Corridor', description: 'Malaysian CPO for the Italian food industry via Singapore and Genoa. Sustainability certification, FFA assay and moisture control are the execution-critical variables.',
      unlock: s => officeOwned('singapore') && officeOwned('genova') && s.completedDeals >= 4 && s.reputation >= 64,
      event: {
        dayRatio: .55,
        title: 'FFA assay above specification',
        text: 'A discharge sample at Genoa shows free fatty acid levels above the contracted maximum, triggering a buyer quality query.',
        choices: [
          { id: 'blend-palm', label: 'Arrange shore-tank blending at Genoa', hint: 'Cost $22,000 · 2 days · brings the cargo on spec', pnl: -22_000, days: 2, reputation: 2, result: 'Blending restores the cargo to specification and the customer accepts delivery.' },
          { id: 'negotiate-palm', label: 'Negotiate a quality allowance with the buyer', hint: 'Fast · uncertain discount', random: true, good: { pnl: -18_000, days: 0, reputation: 1, result: 'The buyer accepts a modest allowance for the off-spec lot.' }, bad: { pnl: -72_000, days: 3, reputation: -3, result: 'The buyer rejects the cargo and demands a full quality re-analysis and price differential.' } }
        ]
      }
    },
    {
      id: 'zambia-zinc', origin: 'durban', destination: 'antwerp', via: [], commodity: 'Zinc',
      quantity: 15000, capital: 4_500_000, equity: 700_000, basePnl: 195_000, duration: 32,
      risk: 'Medium', riskClass: 'medium', priceKey: 'zinc', recommendedHedge: 75,
      transportMode: 'Supramax bulk', title: 'Zambia Zinc Concentrate', locked: true, unlock: s => officeOwned('rotterdam') && s.completedDeals >= 5 && s.reputation >= 68,
      description: 'High-grade zinc concentrate from Zambia\'s Copperbelt. FOB Durban for delivery to ARA smelters. Quality specs: min 52% Zn, max 1.5% Pb.',
      counterparties: { supplierId: 'zambia-zinc-co', buyerId: 'ara-zinc-smelter' },
      events: []
    },
    {
      id: 'indonesia-nickel', origin: 'singapore', destination: 'rotterdam', via: [], commodity: 'Nickel',
      quantity: 8000, capital: 13_500_000, equity: 2_100_000, basePnl: 420_000, duration: 38,
      risk: 'High', riskClass: 'high', priceKey: 'nickel', recommendedHedge: 90, tender: true,
      transportMode: 'Supramax bulk', title: 'Indonesia Nickel Matte', locked: true, unlock: s => officeOwned('singapore') && officeOwned('rotterdam') && s.completedDeals >= 8 && s.reputation >= 75,
      description: 'Class I nickel matte from Indonesian HPAL operations. Competitive tender against two Asian trading houses. DES Rotterdam.',
      counterparties: { supplierId: 'indo-nickel-corp', buyerId: 'europe-battery-materials' },
      events: []
    },
    {
      id: 'us-lng-export', origin: 'houston', destination: 'rotterdam', via: [], commodity: 'LNG',
      quantity: 70000, capital: 8_800_000, equity: 1_400_000, basePnl: 380_000, duration: 22,
      risk: 'Medium', riskClass: 'medium', priceKey: 'lng', recommendedHedge: 80,
      transportMode: 'LNG carrier', title: 'US Gulf LNG Cargo', locked: true, unlock: s => officeOwned('rotterdam') && s.completedDeals >= 6 && s.reputation >= 72,
      description: 'FOB LNG from Sabine Pass liquefaction terminal. DES Rotterdam delivery for European utility off-take. Basis: JKM/TTF differential.',
      counterparties: { supplierId: 'gulf-lng-terminal', buyerId: 'dutch-utility-gas' },
      events: []
    }
  ];


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
    'pilbara-iron': { supplierId: 'pilbara-mining', buyerId: 'yangtze-steel' },
    'qatar-lng': { supplierId: 'qatar-energy', buyerId: 'ara-lng' },
    'malaysia-palm': { supplierId: 'klang-agri', buyerId: 'italia-food-group' },
    'ivory-cocoa':    { supplierId: 'cdi-cocoa', buyerId: 'chocoitalia' },
    'gulf-soybeans':  { supplierId: 'gulf-grain-co', buyerId: 'ara-crushing' },
    'shanghai-steel': { supplierId: 'yangtze-trading', buyerId: 'ara-steel-dist' }
  };

  const counterpartyCatalog = [
    { id: 'lombardia-cables', name: 'Lombardia Cables S.p.A.', type: 'Buyer', country: 'Italy', credit: 84, creditRating: 'A', reliability: 89, kyc: 'Approved', description: 'Industrial manufacturer with recurring metals demand and strict quality discipline.' },
    { id: 'po-valley-agri', name: 'Po Valley Agri Coop', type: 'Buyer', country: 'Italy', credit: 72, creditRating: 'BBB', reliability: 80, kyc: 'Approved', description: 'Agricultural consortium sensitive to punctuality, moisture analysis and seasonality.' },
    { id: 'straits-fabrication', name: 'Straits Fabrication Pte.', type: 'Buyer', country: 'Singapore', credit: 88, creditRating: 'A', reliability: 86, kyc: 'Approved', description: 'Investment-grade Asian buyer with strict documentary discipline and LC payments.' },
    { id: 'baltic-metals', name: 'Baltic Metals OU', type: 'Supplier', country: 'Estonia', credit: 76, creditRating: 'BBB', reliability: 78, kyc: 'Approved', description: 'Fast and flexible supplier whose documentary quality must be monitored.' },
    { id: 'andean-copper', name: 'Andean Copper Ltd.', type: 'Supplier', country: 'Chile', credit: 86, creditRating: 'A', reliability: 91, kyc: 'Approved', description: 'Solid producer with competitive access to Chilean copper and a long transit time.' },
    { id: 'meridian-resources', name: 'Meridian Resources DMCC', type: 'Supplier', country: 'UAE', credit: 61, creditRating: 'BB', reliability: 67, kyc: 'Enhanced review', description: 'Price-aggressive trading counterparty with compliance risk and a complex corporate structure.' },
    { id: 'northsea-alloys', name: 'NorthSea Alloys BV', type: 'Supplier', country: 'Netherlands', credit: 82, creditRating: 'A', reliability: 88, kyc: 'Approved', description: 'European warehouse operator and merchant with access to LME stocks and barges.' },
    { id: 'atlas-fertilizers', name: 'Atlas Fertilizers SA', type: 'Supplier', country: 'Morocco', credit: 74, creditRating: 'BBB', reliability: 81, kyc: 'Approved', description: 'Regional fertilizer producer with good Mediterranean access.' },
    { id: 'gulf-refining', name: 'Gulf Refining & Trading LLC', type: 'Supplier', country: 'USA', credit: 87, creditRating: 'A', reliability: 89, kyc: 'Approved', description: 'Gulf Coast refinery with a regular cargo program and strict specifications.' },
    { id: 'ara-fuels', name: 'ARA Fuels BV', type: 'Buyer', country: 'Netherlands', credit: 90, creditRating: 'A', reliability: 91, kyc: 'Approved', description: 'Investment-grade European distributor active in the distillates market.' },
    { id: 'santos-coffee', name: 'Santos Coffee Export SA', type: 'Supplier', country: 'Brazil', credit: 78, creditRating: 'BBB', reliability: 83, kyc: 'Approved', description: 'Brazilian exporter with a network of cooperatives and quality laboratories.' },
    { id: 'italia-roasters', name: 'Italyn Roasters Group', type: 'Buyer', country: 'Italy', credit: 81, creditRating: 'A', reliability: 86, kyc: 'Approved', description: 'European roaster sensitive to cup profile, moisture and traceability.' },
    { id: 'pampa-grains', name: 'Pampa Grains SA', type: 'Supplier', country: 'Argentina', credit: 70, creditRating: 'BBB', reliability: 79, kyc: 'Approved', description: 'Agricultural origination house on the Paraná corridor.' },
    { id: 'pilbara-mining', name: 'Pilbara Mining Ltd.', type: 'Supplier', country: 'Australia', credit: 92, creditRating: 'A', reliability: 94, kyc: 'Approved', description: 'High-volume mining producer with strong loading discipline.' },
    { id: 'yangtze-steel', name: 'Yangtze Steel Group', type: 'Buyer', country: 'China', credit: 85, creditRating: 'A', reliability: 84, kyc: 'Approved', description: 'Steel group with Panamax-scale iron ore demand.' },
    { id: 'qatar-energy', name: 'Qatar Energy Trading', type: 'Supplier', country: 'Qatar', credit: 96, creditRating: 'A', reliability: 95, kyc: 'Approved', description: 'State-affiliated energy company with world-class operational discipline and strict cargo programming.' },
    { id: 'ara-lng', name: 'ARA LNG Terminal BV', type: 'Buyer', country: 'Netherlands', credit: 91, creditRating: 'A', reliability: 93, kyc: 'Approved', description: 'Investment-grade European LNG terminal with regasification, pipeline and storage access.' },
    { id: 'klang-agri', name: 'Klang Agri Exports', type: 'Supplier', country: 'Malaysia', credit: 79, creditRating: 'BBB', reliability: 82, kyc: 'Approved', description: 'Integrated palm oil producer with RSPO certification and full traceability documentation.' },
    { id: 'italia-food-group', name: 'Italia Food Group SpA', type: 'Buyer', country: 'Italy', credit: 83, creditRating: 'A', reliability: 87, kyc: 'Approved', description: 'Diversified Italian food manufacturer with demand for tropical oils, grains and specialty ingredients.' },
    { id: 'cdi-cocoa', name: "Côte d'Ivoire Cocoa Export", type: 'Supplier', country: 'Ivory Coast', credit: 72, creditRating: 'BBB', reliability: 76, kyc: 'Approved', description: 'State-affiliated cocoa exporter with broad origination network and quality grading infrastructure in Abidjan.' },
    { id: 'chocoitalia', name: 'ChocoItalia Group S.p.A.', type: 'Buyer', country: 'Italy', credit: 85, creditRating: 'A', reliability: 88, kyc: 'Approved', description: 'Premium Italian fine-chocolate manufacturer requiring traceable, certified cocoa with strict humidity and grade specs.' },
    { id: 'gulf-grain-co', name: 'Gulf Grain & Oilseed Co.', type: 'Supplier', country: 'USA', credit: 86, creditRating: 'A', reliability: 90, kyc: 'Approved', description: 'US Gulf Coast origination house with direct elevator access, CBOT basis trading capability and reliable moisture management.' },
    { id: 'ara-crushing', name: 'ARA Crushing Complex BV', type: 'Buyer', country: 'Netherlands', credit: 88, creditRating: 'A', reliability: 87, kyc: 'Approved', description: 'Large-scale oilseed crushing facility in Rotterdam with continuous discharge capacity and strict protein/moisture specs.' },
    { id: 'yangtze-trading', name: 'Yangtze Steel Trading Co.', type: 'Supplier', country: 'China', credit: 78, creditRating: 'BBB', reliability: 80, kyc: 'Enhanced review', description: 'Shanghai-based steel trading arm of an integrated mill. Competitive pricing on HRC, but anti-dumping exposure requires careful documentation.' },
    { id: 'ara-steel-dist', name: 'ARA Steel Distribution NV', type: 'Buyer', country: 'Belgium', credit: 84, creditRating: 'A', reliability: 86, kyc: 'Approved', description: 'Antwerp-based service centre and steel distributor with demand for HRC and plate into construction and manufacturing.' },
  { id: 'zambia-zinc-co', name: 'Zambia Consolidated Zinc', type: 'Supplier', country: 'Zambia', credit: 68, reliability: 74, relationship: 40, tier: 'B', creditRating: 'BB', kyc: 'In progress', description: 'Copperbelt zinc concentrate producer. Exports primarily through Durban with long-term offtake obligations to European smelters.' },
  { id: 'ara-zinc-smelter', name: 'ARA Zinc Refinery NV', type: 'Buyer', country: 'Netherlands', credit: 83, reliability: 86, relationship: 50, tier: 'A', creditRating: 'BBB', kyc: 'Approved',    description: 'Rotterdam-based zinc smelter with 120,000 t/year refined zinc capacity. Buys concentrate on CIF ARA basis.' },
  { id: 'indo-nickel-corp', name: 'Indo Nickel Corporation', type: 'Supplier', country: 'Indonesia', credit: 72, reliability: 76, relationship: 35, tier: 'B', creditRating: 'BB', kyc: 'Approved',    description: 'HPAL nickel operator in Sulawesi. Produces Class I nickel matte for export into European battery supply chains.' },
  { id: 'europe-battery-materials', name: 'EuroBatt Materials GmbH', type: 'Buyer', country: 'Germany', credit: 89, reliability: 90, relationship: 55, tier: 'A', creditRating: 'A', kyc: 'Approved',    description: 'Düsseldorf-based battery precursor manufacturer. Buys nickel matte for cathode active material production.' },
  { id: 'gulf-lng-terminal', name: 'Gulf LNG Terminal LLC', type: 'Supplier', country: 'USA', credit: 88, reliability: 91, relationship: 60, tier: 'A', creditRating: 'BBB', kyc: 'Approved',    description: 'Operator of Sabine Pass LNG liquefaction trains. Provides FOB LNG cargo slots to third-party traders.' },
  { id: 'dutch-utility-gas', name: 'Dutch Utility Gas B.V.', type: 'Buyer', country: 'Netherlands', credit: 92, reliability: 93, relationship: 50, tier: 'A', creditRating: 'A', kyc: 'Approved',    description: 'Dutch gas utility and LNG importer. Buys LNG DES Rotterdam for regas and domestic distribution.' }
  ,
    { id: 'glencore-metals', name: 'Glencore Metal Trading SA', type: 'Both', country: 'Switzerland', credit: 92, creditRating: 'A', reliability: 94, kyc: 'Approved', description: 'Geneva-based arm of the world’s largest commodity trading house. Appetite for large-volume metals deals and highly competitive on pricing.' },
    { id: 'rio-tinto-commercial', name: 'Rio Tinto Commercial', type: 'Supplier', country: 'Australia', credit: 95, creditRating: 'A', reliability: 96, kyc: 'Approved', description: 'Anglo-Australian mining major. Reliable long-term supplier of iron ore, copper concentrate and aluminium smelter-grade material.' },
    { id: 'korean-steelworks', name: 'POSCO International Corp.', type: 'Buyer', country: 'South Korea', credit: 88, creditRating: 'A', reliability: 91, kyc: 'Approved', description: 'Procurement arm of Korea’s largest steelmaker. High-volume iron ore and coal buyer with rigorous quality and delivery specs.' },
    { id: 'sahel-fertilizer', name: 'Sahel Fertilizer Imports SARL', type: 'Buyer', country: 'Senegal', credit: 58, creditRating: 'BB', reliability: 65, kyc: 'In progress', description: 'West African agricultural input importer serving smallholder cooperative networks. Seasonal demand spikes around planting windows; payment terms require careful structuring.' }];

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
    pricing: {
      fixed: { label: 'Fixed price', pnl: 0, acceptance: 0, basisRisk: 0, description: 'Both physical legs are fixed around execution. Lowest residual basis risk.' },
      average: { label: 'Monthly average', pnl: 7_000, acceptance: 5, basisRisk: .12, description: 'Pricing follows a monthly average. Better client fit, but hedge timing creates basis risk.' },
      buyer: { label: 'Buyer pricing option', pnl: 16_000, acceptance: 10, basisRisk: .28, description: 'The buyer chooses the pricing date inside a window. Higher premium, materially higher optionality risk.' }
    },
    delivery: {
      priority: { label: 'Priority window', duration: -3, pnl: -9_000, acceptance: 10 },
      standard: { label: 'Standard window', duration: 0, pnl: 0, acceptance: 0 },
      flexible: { label: 'Flexible window', duration: 4, pnl: 7_000, acceptance: -9 }
    }
  };

  const strategyDoctrineCatalog = {
    merchant: { id:'merchant', label:'Flow Merchant', icon:'↗', description:'Prioritise turnover, relationships and repeat business.', pnlFactor:.98, acceptance:5, equityFactor:.97, riskAdjustment:-1, overheadFactor:1, creditFactor:1.02 },
    arbitrage: { id:'arbitrage', label:'Margin Arbitrageur', icon:'⇄', description:'Target dislocations and optionality. Higher expected margin, higher volatility.', pnlFactor:1.10, acceptance:-5, equityFactor:1.03, riskAdjustment:8, overheadFactor:1.03, creditFactor:.98 },
    assetbacked: { id:'assetbacked', label:'Asset-backed Trader', icon:'▲', description:'Use terminals, production and downstream demand to compound structural advantages.', pnlFactor:1.03, acceptance:2, equityFactor:.94, riskAdjustment:-3, overheadFactor:1.12, creditFactor:1.05, assetMultiplier:1.25 },
    defensive: { id:'defensive', label:'Capital Preserver', icon:'◇', description:'Protect liquidity and credit quality through conservative deal selection.', pnlFactor:.92, acceptance:3, equityFactor:1.10, riskAdjustment:-12, overheadFactor:.96, creditFactor:1.08 }
  };

  const marketRegimeCatalog = {
    balanced: { id:'balanced', label:'Balanced market', tone:'balanced', volatility:1, pnlFactor:1, equityFactor:1, duration:0, acceptance:0, freightBias:0, description:'Normal liquidity, balanced physical premiums and orderly freight.' },
    riskon: { id:'riskon', label:'Risk-on expansion', tone:'positive', volatility:1.18, pnlFactor:1.12, equityFactor:1.04, duration:-1, acceptance:2, freightBias:0.25, description:'Strong industrial demand creates more flow, but prices move faster.' },
    soft: { id:'soft', label:'Soft demand', tone:'soft', volatility:.82, pnlFactor:.86, equityFactor:.95, duration:1, acceptance:-4, freightBias:-.35, description:'Weaker end-user demand compresses premiums and slows tender conversion.' },
    freight: { id:'freight', label:'Tight freight', tone:'warning', volatility:1.08, pnlFactor:.90, equityFactor:1.03, duration:4, acceptance:0, freightBias:1.5, description:'Scarce vessel capacity increases freight, delays and working-capital usage.' },
    squeeze: { id:'squeeze', label:'Supply squeeze', tone:'danger', volatility:1.35, pnlFactor:1.18, equityFactor:1.12, duration:2, acceptance:5, freightBias:.45, description:'Physical scarcity creates attractive margins but requires more capital and tighter execution.' }
  };


  const capitalPolicyCatalog = {
    preservation: {
      id:'preservation', label:'Capital Preservation', icon:'◇', reserveRatio:.35,
      pnlFactor:.94, equityFactor:1.08, financingRateFactor:.88, riskAdjustment:-11,
      description:'Protect liquidity, reduce leverage and retain a larger NAV reserve for margin calls and disruptions.'
    },
    balanced: {
      id:'balanced', label:'Balanced Mandate', icon:'◈', reserveRatio:.20,
      pnlFactor:1, equityFactor:1, financingRateFactor:1, riskAdjustment:0,
      description:'Balance growth, liquidity and risk capacity across the trading portfolio.'
    },
    growth: {
      id:'growth', label:'Growth Allocation', icon:'↗', reserveRatio:.10,
      pnlFactor:1.08, equityFactor:.92, financingRateFactor:1.12, riskAdjustment:10,
      description:'Deploy more capital into opportunities, accepting higher funding costs and liquidity risk.'
    }
  };

  const stressScenarioCatalog = {
    commodity: { id:'commodity', icon:'↓', label:'Commodity sell-off', subtitle:'Benchmarks fall 12% and basis widens', description:'Tests residual flat-price exposure and hedge effectiveness.' },
    freight: { id:'freight', icon:'⚓', label:'Freight capacity shock', subtitle:'Freight +35% and severe delays', description:'Tests ocean cargoes, congestion and working-capital duration.' },
    fx: { id:'fx', icon:'FX', label:'EUR/USD dislocation', subtitle:'EUR/USD moves 10% against the book', description:'Tests unhedged currency exposure and cross-border receivables.' },
    credit: { id:'credit', icon:'AR', label:'Buyer default wave', subtitle:'20% loss on unsecured receivables', description:'Tests buyer concentration, payment protection and cash conversion.' },
    liquidity: { id:'liquidity', icon:'!', label:'Global liquidity crisis', subtitle:'Margins rise and bank capacity falls', description:'Tests cash reserves, collateral and credit-line resilience.' }
  };

  const aiRivalDesks = [
    { id:'helios', name:'Helios Commodities', city:'Zurich', specialties:['Copper','Aluminium','Diesel'], aggression:86, discipline:91 },
    { id:'northsea', name:'NorthSea Trading', city:'Rotterdam', specialties:['Diesel','Aluminium','Iron ore'], aggression:78, discipline:94 },
    { id:'pacific', name:'Pacific Bulk Partners', city:'Singapore', specialties:['Iron ore','Wheat','Coffee'], aggression:82, discipline:87 },
    { id:'andean', name:'Andean Resources', city:'Santiago', specialties:['Copper','Coffee'], aggression:74, discipline:90 },
    { id:'atlas', name:'Atlas Merchant Group', city:'London', specialties:['Urea','Copper','Wheat'], aggression:88, discipline:84 },
    { id:'stratus', name:'Stratus Energy', city:'Houston', specialties:['Diesel','Urea'], aggression:92, discipline:76 },
    { id:'orion', name:'Orion Agri Trade', city:'Geneva', specialties:['Coffee','Wheat','Urea'], aggression:72, discipline:89 },
    { id:'rhine', name:'Rhine Metals Desk', city:'Geneva', specialties:['Copper','Aluminium'], aggression:80, discipline:95 }
  ];

  const achievementCatalog = [
    { id:'first-cargo', icon:'01', title:'First Cargo', description:'Close your first physical commodity deal.', achieved:s=>s.completedDeals>=1 },
    { id:'five-cargoes', icon:'05', title:'Repeat Merchant', description:'Close five physical deals.', achieved:s=>s.completedDeals>=5 },
    { id:'clean-execution', icon:'✓', title:'Clean Execution', description:'Close a deal with at least 95% operational readiness.', achieved:s=>(s.history||[]).some(d=>(d.operationalReadiness||0)>=95) },
    { id:'hedge-discipline', icon:'H', title:'Hedge Discipline', description:'Close three deals with an average hedge ratio of at least 90%.', achieved:s=>(s.history||[]).length>=3 && (s.history||[]).slice(0,3).reduce((a,d)=>a+(d.hedgeRatio||0),0)/3>=90 },
    { id:'crisis-manager', icon:'!', title:'Crisis Manager', description:'Close a profitable deal affected by a global crisis.', achieved:s=>(s.history||[]).some(d=>d.pnl>0 && (d.globalEventImpacts||[]).length) },
    { id:'vertical-builder', icon:'V', title:'Vertical Builder', description:'Own at least one upstream, midstream and downstream asset.', achieved:s=>['upstream','midstream','downstream'].every(chain=>investmentCatalog.some(a=>a.chain===chain && (s.investments?.[a.id]?.level||0)>0)) },
    { id:'global-network', icon:'G', title:'Global Network', description:'Complete deals from four different origins.', achieved:s=>new Set((s.history||[]).map(d=>getOpportunity(d.opportunityId)?.origin).filter(Boolean)).size>=4 },
    { id:'liquidity-guardian', icon:'L', title:'Liquidity Guardian', description:'Close five deals without an emergency margin call.', achieved:s=>s.completedDeals>=5 && (s.marginCalls||0)===0 },
    { id:'tender-specialist', icon:'T', title:'Tender Specialist', description:'Win five competitive tenders against AI rival desks.', achieved:s=>(s.tenderWins||0)>=5 },
    { id:'credit-master', icon:'C', title:'Credit Master', description:'Close five deals with deferred payment and no material credit loss.', achieved:s=>(s.history||[]).filter(d=>d.commercialTerms?.payment==='thirty').length>=5 && (s.creditLosses||0)===0 },
    { id:'cash-conversion', icon:'AR', title:'Cash Conversion', description:'Collect three deferred-payment invoices.', achieved:s=>(s.history||[]).filter(d=>d.commercialTerms?.payment==='thirty' && d.invoiceStatus==='Paid').length>=3 },
    { id:'credit-committee', icon:'CC', title:'Credit Committee', description:'Secure an approved buyer credit-limit increase.', achieved:s=>Object.values(s.creditLimitRequests||{}).some(r=>r.status==='approved') },
    { id:'integrated-major', icon:'I', title:'Integrated Major', description:'Reach an enterprise value of $50 million.', achieved:s=>tradingHouseValuation().value>=50_000_000 },
    { id:'million-dollar-desk', icon:'$1M', title:'Million-Dollar Desk', description:'Reach $1 million of cumulative realized P&L.', achieved:s=>(s.realizedPnl||0)>=1_000_000 },
    { id:'energy-baron', icon:'⚡', title:'Energy Baron', description:'Close two profitable deals in energy commodities (Diesel or LNG).', achieved:s=>(s.history||[]).filter(d=>d.pnl>0&&['Diesel','LNG'].includes(d.commodity)).length>=2 },
    { id:'soft-commodity-house', icon:'☆', title:'Soft Commodity House', description:'Close deals in both Cocoa and Soybeans.', achieved:s=>(s.history||[]).some(d=>d.commodity==='Cocoa') && (s.history||[]).some(d=>d.commodity==='Soybeans') },
    { id:'steel-trader', icon:'▰', title:'Steel Corridor', description:'Close the Yangtze Steel Export deal.', achieved:s=>(s.history||[]).some(d=>d.opportunityId==='shanghai-steel') },
    { id:'silk-road', icon:'SR', title:'Silk Road Trader', description:'Complete deals from three different continents in the same career.', achieved:s=>{ const m={tallinn:'EU',rotterdam:'EU',genova:'EU',brescia:'EU',antwerp:'EU',casablanca:'AF',abidjan:'AF',dubai:'AS',singapore:'AS',klang:'AS',doha:'AS',shanghai:'AS','port-hedland':'OC',houston:'AM',santos:'AM',rosario:'AM',santiago:'AM','new-orleans':'AM'}; return new Set((s.history||[]).map(d=>{const o=getOpportunity(d.opportunityId);return o?m[o.origin]:null;}).filter(Boolean)).size>=3; } },
  { id:'metals-specialist', icon:'Zn', title:'Metals Specialist', description:'Close profitable deals in both zinc and nickel in the same career.', achieved: s => { const k=s.history||[]; return k.some(d=>d.priceKey==='zinc'&&(d.pnl||0)>0) && k.some(d=>d.priceKey==='nickel'&&(d.pnl||0)>0); } },
  { id:'lng-pioneer',       icon:'♨',  title:'LNG Pioneer',       description:'Complete your first LNG cargo deal.',                              achieved: s => (s.history||[]).some(d=>d.priceKey==='lng') },
  { id:'quarter-bonus',     icon:'★',  title:'Bonus Quarter',     description:'Hit a quarterly P&L target and earn a performance bonus.',         achieved: s => (s.quarterBonusPaid||0) > 0 },
  { id:'scenario-planner',  icon:'Σ',  title:'Scenario Planner',  description:'Run five board-level stress tests.', achieved: s => (s.stressTestsRun||0) >= 5 }
  ];

  const financingProfiles = {
    revolver: { label: 'Revolving credit facility', equityFactor: 1, pnl: 0, rate: .075, acceptance: 0, description: 'Flexible, but consumes credit capacity and accrues daily interest.' },
    lc: { label: 'LC-backed trade finance', equityFactor: .82, pnl: -6_000, rate: .064, acceptance: 4, description: 'Reduces equity needs and payment risk through compliant documents.' },
    inventory: { label: 'Borrowing-base / inventory finance', equityFactor: .66, pnl: -13_000, rate: .082, acceptance: 1, requiresStaff: 'trade-finance-manager', description: 'Efficient funding secured by cargo and receivables.' },
    balance: { label: 'Own balance sheet', equityFactor: 1.85, pnl: 8_000, rate: .025, acceptance: 0, description: 'More equity, less bank dependence and greater flexibility.' }
  };

  const insuranceProfiles = {
    basic: { label: 'Basic cargo cover', pnl: -2_500, lossFactor: 1, description: 'Minimum cover for physical loss and general average.' },
    allrisk: { label: 'All-risk + delay cover', pnl: -9_000, lossFactor: .55, description: 'Broader protection against damage, delays and deviations.' },
    self: { label: 'Self-insured retention', pnl: 3_000, lossFactor: 1.35, description: 'Higher margin, but the desk retains more risk.' }
  };

  const inspectionProfiles = {
    none: { label: 'Supplier certificates only', pnl: 3_500, readiness: -8, lossFactor: 1.25, description: 'Minimum cost, with heavy reliance on supplier documents.' },
    standard: { label: 'Standard load-port inspection', pnl: -4_000, readiness: 2, lossFactor: .9, description: 'Quantity and quality control at the load port.' },
    independent: { label: 'Independent load & discharge survey', pnl: -12_000, readiness: 9, lossFactor: .62, description: 'Dual independent inspection and a stronger position in claims.' }
  };

  const bankCatalog = [
    { id: 'alpine-bank', name: 'Alpine Trade Bank', type: 'Revolver', limitShare: .55, rate: .075, relationship: 68, description: 'Primary bank for working capital and hedge liquidity.' },
    { id: 'mercantile', name: 'Mercantile Commodity Finance', type: 'LC / borrowing base', limitShare: .30, rate: .066, relationship: 58, description: 'Specialist in documentary trade and inventory finance.' },
    { id: 'oceanic', name: 'Oceanic Bank Asia', type: 'Regional LC', limitShare: .15, rate: .071, relationship: 50, description: 'Regional capacity available after opening Singapore.' }
  ];

  const academyCatalog = [
    { id: 'deal-anatomy', title: 'Anatomy of a physical deal', concept: 'A deal links purchase, sale, funding, hedging, logistics and settlement. Commercial margin is not final P&L.', question: 'Which cost can turn a good gross margin into a loss?', options: ['Spot price only', 'Freight, finance, claims and demurrage', 'None once the buyer has accepted'], correct: 1 },
    { id: 'hedge-margin', title: 'Hedging and margin calls', concept: 'The hedge reduces flat-price risk, but a short futures position can require liquidity when prices rise.', question: 'Can a perfectly hedged cargo still create a liquidity crisis?', options: ['Yes, because of variation margin', 'No, the hedge eliminates every risk', 'Only with Incoterm DDP'], correct: 0 },
    { id: 'trade-finance', title: 'Trade finance', concept: 'LCs, revolving facilities and borrowing-base structures change equity needs, cost and payment risk.', question: 'What does a bank pay under a documentary LC?', options: ['The economic quality of the deal', 'Documents compliant with the LC terms', 'The trader’s reputation'], correct: 1 },
    { id: 'incoterms', title: 'Incoterms and transfer of risk', concept: 'Incoterms allocate costs, responsibilities and transfer of logistics risk; they do not automatically determine legal title.', question: 'Under FOB, who normally arranges the main ocean freight?', options: ['The buyer', 'The seller until final destination', 'The bank'], correct: 0 },
    { id: 'shipping', title: 'Laytime and demurrage', concept: 'Laytime is the contractually allowed time for port operations; demurrage is the cost of exceeding it.', question: 'When does demurrage typically arise?', options: ['When the price falls', 'When used laytime exceeds allowed laytime', 'When there is no futures hedge'], correct: 1 },
    { id: 'quality-docs', title: 'Quality, documents and claims', concept: 'Certificates, surveys and accurate documentary descriptions protect settlement and the ability to dispute claims.', question: 'Which choice most strengthens your position in a quality claim?', options: ['No inspection', 'Independent survey at load and discharge ports', 'Increase the credit limit'], correct: 1 },
    { id: 'pricing-basis', title: 'Pricing windows and basis risk', concept: 'A futures hedge may not perfectly offset a physical contract when the buyer can price on a different date or average.', question: 'Why can a 100% futures hedge still leave risk?', options: ['Because pricing dates and indices can differ', 'Because futures have no price', 'Only because of customs'], correct: 0 },
    { id: 'receivables', title: 'Trade credit and receivables', concept: 'Open-account sales create buyer credit exposure after delivery. Insurance, factoring and LCs transfer different parts of that risk.', question: 'Which tool converts a receivable into immediate cash at a discount?', options: ['Factoring', 'Demurrage', 'A voyage charter'], correct: 0 },
    { id: 'storage-optionality', title: 'Storage optionality', concept: 'Storage can create value by separating the timing of purchase, transport and sale, but carrying costs and financing continue to accrue.', question: 'When is storage economically valuable?', options: ['When expected optionality exceeds storage and financing costs', 'Whenever the warehouse is empty', 'Only when the cargo is fully hedged'], correct: 0 },
    { id: 'supply-resilience', title: 'Supply-chain resilience', concept: 'Priority capacity, diversified suppliers and framework agreements can protect execution, but commitments create reservation fees and take-or-pay risk.', question: 'What is the main risk of a minimum-lifting procurement agreement?', options: ['Paying a shortfall when committed cargoes are not lifted', 'Eliminating every freight cost', 'Removing the need for KYC'], correct: 0 },
    { id: 'stress-liquidity', title: 'Stress testing and liquidity', concept: 'A profitable desk can still fail when margin calls, delayed receivables and reduced bank capacity arrive together. Stress tests estimate survival before the shock happens.', question: 'What is the purpose of a liquidity stress test?', options: ['Predict the exact future price', 'Estimate whether cash and facilities can absorb a severe but plausible shock', 'Replace all hedging decisions'], correct: 1 }
  ];

  const glossaryCatalog = [
    ['Basis risk','Risk that the physical price and hedging instrument do not move perfectly together.'],
    ['Bill of Lading','Ocean transport document, cargo receipt and often a document of title.'],
    ['Borrowing base','Facility calculated on the eligible value of inventory and receivables.'],
    ['Demurrage','Amount payable when operations exceed contractual laytime.'],
    ['Flat-price risk','Exposure to the absolute movement in the commodity price.'],
    ['Laycan','Window in which the vessel must present ready to load.'],
    ['Letter of Credit','Bank undertaking to pay against presentation of compliant documents.'],
    ['Premium','Difference between the physical price and the benchmark or futures price.'],
    ['Quality allowance','Negotiated discount for off-specification or lower-quality cargo.'],
    ['Variation margin','Daily liquidity flow caused by changes in futures value.'],
    ['Take-or-pay','Contractual obligation to lift or pay for a minimum committed volume.'],
    ['Congestion premium','Incremental freight or handling cost caused by scarce logistics capacity.'],
    ['Liquidity reserve','Cash deliberately retained to absorb variation margin, delays, claims and funding shocks.'],
    ['Stress test','A severe but plausible scenario used to estimate losses, liquidity needs and limit breaches.']
  ];

  const globalEventCatalog = [
    { id: 'suez-disruption', title: 'Suez transit disruption', region: 'Middle East / Mediterranean', severity: 'high', duration: 8, description: 'Transit restrictions increase voyage time and freight for Gulf-origin ocean cargoes.', freightShock: 9, affects: opp => opp.origin === 'dubai' && transportClassForOpportunity(opp) === 'ocean', dealDays: 4, dealPnl: -14_000 },
    { id: 'genoa-strike', title: 'Genoa terminal strike', region: 'Northern Italy', severity: 'medium', duration: 6, description: 'Reduced shifts create congestion, storage pressure and uncertain discharge windows.', freightShock: 3, affects: opp => (opp.via || []).includes('genova'), dealDays: 3, dealPnl: -9_000 },
    { id: 'copper-rally', title: 'Copper supply squeeze', region: 'Global metals', severity: 'high', duration: 7, description: 'A supply shock pushes copper higher and increases variation-margin pressure.', commodity: 'copper', dailyDrift: 42, affects: opp => opp.priceKey === 'copper', dealDays: 0, dealPnl: 0 },
    { id: 'bank-tightening', title: 'Trade-finance tightening', region: 'Global banking', severity: 'medium', duration: 9, description: 'Banks temporarily reduce unsecured capacity and demand more equity on new transactions.', creditPenalty: 750_000, equityFactor: 1.12, affects: () => true, dealDays: 0, dealPnl: 0 },
    { id: 'med-weather', title: 'Severe Mediterranean weather', region: 'Mediterranean', severity: 'medium', duration: 5, description: 'Port rotations slow and short-sea freight becomes more expensive.', freightShock: 6, affects: opp => transportClassForOpportunity(opp) === 'ocean' && ((opp.via || []).includes('genova') || opp.origin === 'casablanca'), dealDays: 2, dealPnl: -6_000 },
    { id: 'atlantic-hurricane', title: 'Atlantic hurricane risk', region: 'Atlantic basin', severity: 'high', duration: 7, description: 'Weather reroutes tankers and container vessels, lifting freight and insurance.', freightShock: 11, affects: opp => ['houston','santos'].includes(opp.origin), dealDays: 4, dealPnl: -18_000 },
    { id: 'grain-drought', title: 'South American grain drought', region: 'South America', severity: 'high', duration: 8, description: 'Crop expectations deteriorate, increasing wheat and coffee volatility.', commodity: 'wheat', dailyDrift: 3.2, affects: opp => ['wheat','coffee'].includes(opp.priceKey), dealDays: 1, dealPnl: -5_000 },
    { id: 'china-steel-surge', title: 'Chinese steel restocking', region: 'North Asia', severity: 'medium', duration: 7, description: 'Steel mills accelerate purchases, lifting iron ore and dry-bulk demand.', commodity: 'ironore', dailyDrift: 1.7, freightShock: 5, affects: opp => opp.priceKey === 'ironore', dealDays: 2, dealPnl: 8_000 },
    { id: 'panama-drought', title: 'Panama Canal draft restrictions', region: 'Central America', severity: 'high', duration: 9, description: 'Low water levels force vessels to reduce cargo loads, adding voyage legs and pushing up freight on trans-oceanic routes.', freightShock: 14, affects: opp => ['houston', 'santos', 'rosario', 'doha', 'klang'].includes(opp.origin), dealDays: 5, dealPnl: -22_000 },
    { id: 'blacksea-disruption', title: 'Black Sea shipping corridor disruption', region: 'Black Sea / Eastern Europe', severity: 'high', duration: 8, description: 'Insurance suspensions and vessel rerouting raise costs and extend transit times on grain and fertilizer flows.', freightShock: 8, affects: opp => ['wheat', 'urea'].includes(opp.priceKey), dealDays: 3, dealPnl: -14_000 },
    { id: 'harmattan-disruption', title: 'West Africa Harmattan loading delays', region: 'West Africa', severity: 'medium', duration: 7, description: 'Dry season dust storms reduce visibility and delay vessel operations at Abidjan and Dakar, adding demurrage and shifting laycans.', freightShock: 5, affects: opp => ['abidjan'].includes(opp.origin), dealDays: 3, dealPnl: -12_000 },
    { id: 'us-gulf-flooding', title: 'US Midwest river flood restricts grain exports', region: 'North America', severity: 'high', duration: 8, description: 'Flooding on the Mississippi and Illinois rivers closes elevator access, reducing Gulf Coast loading schedules for grain and oilseeds.', freightShock: 4, affects: opp => ['new-orleans'].includes(opp.origin), dealDays: 5, dealPnl: -28_000 },
    { id: 'eu-steel-tariff', title: 'EU provisional steel safeguard measures', region: 'European Union', severity: 'high', duration: 10, description: 'EU trade authorities impose provisional anti-dumping measures on Asian steel imports, causing documentary delays and cost uncertainty at ARA ports.', affects: opp => opp.commodity === 'Steel', dealDays: 6, dealPnl: -45_000 },
    { id: 'lme-warehouse-crisis', title: 'LME warehouse queue build-up', region: 'Global metals', severity: 'medium', duration: 7, description: 'Queue times at key delivery points spike, creating backwardation, lifting physical premiums and increasing variation-margin pressure.', commodity: 'copper', dailyDrift: 28, affects: opp => ['copper', 'aluminium'].includes(opp.priceKey), dealDays: 2, dealPnl: 6_000 },
  { id: 'indonesia-nickel-ban', title: 'Indonesia Nickel Ore Export Ban', description: 'Jakarta reinstates ore export restrictions, cutting raw material supply to Chinese NPI producers and tightening Class I nickel availability.', duration: 14, freightBias: 0.4, equityFactor: 1, pnlFactor: 0.96, priceKey: 'nickel', dailyDrift: 62, affects: opp => opp.priceKey === 'nickel', dealDays: 1, dealPnl: 18_000 },
  { id: 'european-gas-crisis',  title: 'European Gas Supply Crunch',   description: 'Pipeline gas shortfalls trigger emergency LNG procurement by European utilities. Spot LNG prices spike sharply on short-term buying.', duration: 12, freightBias: 0.6, equityFactor: 1, pnlFactor: 0.97, priceKey: 'lng', dailyDrift: 0.3, affects: opp => opp.priceKey === 'lng', dealDays: 2, dealPnl: 22_000 },
  { id: 'zambia-power-outage',  title: 'Zambia Power Crisis Hits Mining', description: 'Load-shedding at Copperbelt mines forces zinc and copper production cuts. Concentrate exports fall sharply on curtailed output.', duration: 10, freightBias: 0.2, equityFactor: 1, pnlFactor: 0.95, priceKey: 'zinc', dailyDrift: 14, affects: opp => ['zinc','copper'].includes(opp.priceKey), dealDays: 1, dealPnl: 9_000 },
    { id:'el-nino-soft-commodities', title: 'El Niño Disrupts Tropical Crop Yields', region: 'Global', severity: 'high', duration: 18, description: 'El Niño weather pattern reduces rainfall across Southeast Asia and West Africa. Cocoa, coffee and palm oil production outlooks cut sharply, lifting prices and tightening basis.', freightShock: 3, equityFactor: 1.04, pnlFactor: 1.12, priceKey: 'coffee', dailyDrift: 22, affects: opp => ['coffee','cocoa','wheat'].includes(opp.priceKey), dealDays: 5, dealPnl: 28_000 },
    { id:'chinese-steel-stimulus', title: 'China Steel Stimulus Boosts Iron Ore Demand', region: 'Asia Pacific', severity: 'medium', duration: 12, description: 'Beijing announces infrastructure stimulus worth ¥800bn. Iron ore and coking coal futures jump on higher crude steel output expectations. Vale and Rio Tinto raise quarterly guidance.', freightShock: 7, equityFactor: 1.02, pnlFactor: 1.09, priceKey: 'ironore', dailyDrift: 18, affects: opp => ['ironore','steel'].includes(opp.priceKey), dealDays: 4, dealPnl: 22_000 },
    { id:'lng-supply-crunch', title: 'LNG Supply Crunch — Australian Strike Action', region: 'Asia Pacific', severity: 'high', duration: 10, description: 'Workers at North West Shelf LNG facilities vote for industrial action, threatening 8% of global LNG supply. Spot prices in Asia surge as buyers scramble for alternatives.', freightShock: 9, equityFactor: 1.03, pnlFactor: 1.14, priceKey: 'lng', dailyDrift: 30, affects: opp => ['lng','crude'].includes(opp.priceKey), dealDays: 3, dealPnl: 35_000 },
    { id:'eu-grain-import-ban', title: 'EU Imposes Temporary Grain Import Restrictions', region: 'Europe', severity: 'medium', duration: 8, description: 'Brussels announces emergency import quotas on Black Sea wheat and corn to protect domestic farmers. Spot basis in Rotterdam tightens sharply as import volumes are redirected.', freightShock: -4, equityFactor: 0.97, pnlFactor: 0.88, priceKey: 'wheat', dailyDrift: -15, affects: opp => ['wheat','urea'].includes(opp.priceKey), dealDays: 2, dealPnl: -18_000 }
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
    'pilbara-iron': { carrier: 'MV Southern Cape', mode: 'Panamax bulk carrier', booking: 'Firm charter', warehouse: 'Shanghai Bulk Terminal', warehouseHub: 'shanghai', storageDays: 2, purchaseTerms: 'FOB Port Hedland · index-linked', salesTerms: 'CFR Shanghai · LC at sight', documentSet: ['Commercial invoice','Draft survey','Fe assay certificate','Moisture certificate','Certificate of origin','Bill of lading','Insurance certificate','LC compliance'] },
    'qatar-lng': { carrier: 'MT Mercs Excellence', mode: 'LNG carrier', booking: 'Subject to vetting approval', warehouse: 'Rotterdam Gate Terminal', warehouseHub: 'rotterdam', storageDays: 2, purchaseTerms: 'FOB Ras Laffan · JKM-linked', salesTerms: 'DES Rotterdam · LC at sight', documentSet: ['Commercial invoice','Certificate of quality','Certificate of quantity','Certificate of origin','Bill of lading','Cargo manifest','Insurance certificate','LC compliance','IMO 9 document'] },
    'malaysia-palm': { carrier: 'MT Palmera Star', mode: 'Vegetable oil tanker', booking: 'Subject to sustainability docs', warehouse: 'Genoa Food Grade Terminal', warehouseHub: 'genova', storageDays: 5, purchaseTerms: 'FOB Port Klang · MPOB index + premium', salesTerms: 'DDP Brescia · 20 days', documentSet: ['Commercial invoice','Packing list','FFA assay certificate','Moisture certificate','RSPO certificate','Certificate of origin','Bill of lading','Insurance certificate','Customs release','Phytosanitary certificate'] },
    'ivory-cocoa':    { carrier: 'Maersk West Africa Line', mode: 'Container / reefer', booking: 'Confirmed FCL booking', warehouse: 'Genoa Food Grade Warehouse', warehouseHub: 'genova', storageDays: 5, purchaseTerms: 'FOB Abidjan · ICCO index + quality premium', salesTerms: 'DAP Brescia · 20 days', documentSet: ['Commercial invoice','Packing list','Quality grading certificate','Humidity certificate','Phytosanitary certificate','Certificate of origin','Bill of lading','Insurance certificate','Customs release','Traceability certificate'] },
    'gulf-soybeans':  { carrier: 'MV Gulf Horizon Trader', mode: 'Panamax bulk carrier', booking: 'Firm charter', warehouse: 'Rotterdam Grain Terminal', warehouseHub: 'rotterdam', storageDays: 3, purchaseTerms: 'FOB New Orleans · CBOT basis', salesTerms: 'CFR Rotterdam · LC at sight', documentSet: ['Commercial invoice','Weight certificate','Protein certificate','Moisture certificate','Phytosanitary certificate','Certificate of origin','Bill of lading','Insurance certificate','LC compliance'] },
    'shanghai-steel': { carrier: 'MV Pacific Iron', mode: 'General cargo vessel', booking: 'Subject to mill certificate', warehouse: 'Antwerp Steel Terminal', warehouseHub: 'antwerp', storageDays: 7, purchaseTerms: 'FOB Shanghai · mill price + premium', salesTerms: 'DAP Antwerp · 30 days', documentSet: ['Commercial invoice','Packing list','Mill certificate','Quality certificate','Certificate of origin','Bill of lading','Insurance certificate','Customs release','EU import declaration','Anti-dumping compliance'] }
  };


  const vesselCatalog = [
    {
      id: 'ocean-pioneer', name: 'MV Ocean Pioneer', vesselClass: 'Handysize', capacity: 32_000,
      transportClass: 'ocean', homeHub: 'santiago', charterDays: 75, charterCost: 95_000,
      bonusPnl: 22_000, durationBonus: 4, minReputation: 50, minDeals: 0,
      description: 'Versatile Handysize vessel for transatlantic routes. Reduces spot-market dependence and accelerates execution.'
    },
    {
      id: 'gulf-navigator', name: 'MV Gulf Navigator', vesselClass: 'Multipurpose', capacity: 18_000,
      transportClass: 'ocean', homeHub: 'dubai', charterDays: 60, charterCost: 75_000,
      bonusPnl: 18_000, durationBonus: 3, minReputation: 52, minDeals: 1,
      description: 'Multipurpose vessel positioned in the Gulf, suitable for parcel cargoes and routes into the Mediterranean.'
    },
    {
      id: 'rhine-link', name: 'Rhine Link 22', vesselClass: 'River barge', capacity: 2_200,
      transportClass: 'barge', homeHub: 'rotterdam', charterDays: 45, charterCost: 38_000,
      bonusPnl: 12_000, durationBonus: 2, minReputation: 58, minDeals: 2, requiresOffice: 'rotterdam',
      description: 'River barge for Rhine–Alps corridors. Ideal for metals and warehouse releases from Rotterdam.'
    },
    {
      id: 'atlas-coaster', name: 'MV Atlas Coaster', vesselClass: 'Coaster', capacity: 8_500,
      transportClass: 'ocean', homeHub: 'casablanca', charterDays: 40, charterCost: 46_000,
      bonusPnl: 13_000, durationBonus: 2, minReputation: 56, minDeals: 2, requiresOffice: 'genova',
      description: 'Mediterranean coaster for fertilizer and metals parcels between North Africa and Southern Europe.'
    },
    {
      id: 'eastern-merchant', name: 'MV Eastern Merchant', vesselClass: 'Multipurpose', capacity: 22_000,
      transportClass: 'ocean', homeHub: 'dubai', charterDays: 55, charterCost: 86_000,
      bonusPnl: 20_000, durationBonus: 3, minReputation: 68, minDeals: 5, requiresOffice: 'singapore',
      description: 'Regional asset for the Gulf–Asia corridor, with flexibility for parcel cargoes and port rotations.'
    },
    { id: 'gulf-product-tanker', name: 'MT Shippy Horizon', vesselClass: 'MR product tanker', capacity: 47000, transportClass: 'ocean', homeHub: 'houston', charterDays: 55, charterCost: 165000, bonusPnl: 46000, durationBonus: 3, minReputation: 64, minDeals: 3, requiresOffice: 'rotterdam', description: 'Tanker dedicated to Gulf Coast–ARA distillates, with tank segregation and full vetting.' },
    { id: 'parana-handy', name: 'MV River Plata', vesselClass: 'Handysize bulker', capacity: 33000, transportClass: 'ocean', homeHub: 'rosario', charterDays: 48, charterCost: 92000, bonusPnl: 26000, durationBonus: 2, minReputation: 61, minDeals: 4, requiresOffice: 'genova', description: 'Handysize vessel for grain parcels and draft-restricted ports.' },
    { id: 'pilbara-panamax', name: 'MV Iron Meridian', vesselClass: 'Panamax bulker', capacity: 76000, transportClass: 'ocean', homeHub: 'port-hedland', charterDays: 52, charterCost: 210000, bonusPnl: 62000, durationBonus: 3, minReputation: 72, minDeals: 6, requiresOffice: 'singapore', description: 'Panamax vessel dedicated to Australia–North Asia dry-bulk trades.' }
  ];


  const officeCatalog = [
    { id: 'geneva', name: 'Geneva HQ', hub: 'geneva', cost: 0, dailyCost: 900, minReputation: 0, minDeals: 0, description: 'Group capital, risk management, compliance and banking relationships.', benefit: 'The trading house decision centre.' },
    { id: 'genova', name: 'Genoa Operations Desk', hub: 'genova', cost: 120_000, dailyCost: 650, minReputation: 54, minDeals: 1, description: 'Local team for port calls, customs, storage and last-mile delivery into Northern Italy.', benefit: 'Unlocks fertilizer trading and cuts ocean routes via Genoa by 2 days.' },
    { id: 'rotterdam', name: 'Rotterdam Metals Desk', hub: 'rotterdam', cost: 240_000, dailyCost: 1_000, minReputation: 58, minDeals: 2, description: 'Direct access to warehouses, barges and industrial customers in Northern Europe.', benefit: 'Unlocks Rhine–Alps Alloy and reduces charter costs by 5%.' },
    { id: 'singapore', name: 'Singapore Asia Desk', hub: 'singapore', cost: 480_000, dailyCost: 1_800, minReputation: 68, minDeals: 5, description: 'Asian platform for metals, freight, trade finance and regional client coverage.', benefit: 'Unlocks the Asian market and Gulf–Asia Aluminium.' }
  ];

  const staffCatalog = [
    { id: 'operations-coordinator', role: 'Operations Coordinator', hireCost: 45_000, dailySalary: 250, minReputation: 50, description: 'Coordinates documents, terminals, customs and delivery windows.', benefit: 'Document expediting costs 40% less and adds 5 readiness points.' },
    { id: 'risk-analyst', role: 'Risk Analyst', hireCost: 60_000, dailySalary: 320, minReputation: 54, description: 'Monitors hedges, concentration, liquidity buffers and desk limits.', benefit: 'Reduces the risk score and re-hedging costs by 35%.' },
    { id: 'freight-charterer', role: 'Freight Charterer', hireCost: 55_000, dailySalary: 300, minReputation: 56, description: 'Negotiates time charters, laycan, demurrage and route alternatives.', benefit: 'Reduces vessel upfront hire by 15%.' },
    { id: 'trade-finance-manager', role: 'Trade Finance Manager', hireCost: 75_000, dailySalary: 420, minReputation: 60, description: 'LC, borrowing-base and working-capital facility structure.', benefit: 'Increases the credit line by $1M and reduces required equity by 10%.' }
  ];

  const investmentCatalog = [
    { id:'atacama-copper', chain:'upstream', name:'Atacama Copper Mine', hub:'santiago', icon:'⛏', commodity:'Copper', maxLevel:3, baseCost:260000, buildDays:7, dailyIncome:1800, pnlBonus:9500, equityReduction:.025, minReputation:50, minDeals:0, description:'Mining offtake and production interest. Reduces copper sourcing cost and secures priority physical flows.' },
    { id:'atlas-urea-plant', chain:'upstream', name:'Atlas Urea Production', hub:'casablanca', icon:'◆', commodity:'Urea', maxLevel:3, baseCost:340000, buildDays:9, dailyIncome:2300, pnlBonus:12000, equityReduction:.02, minReputation:55, minDeals:1, description:'Industrial participation in urea production, with preferential access to Mediterranean volumes.' },
    { id:'santos-estate', chain:'upstream', name:'Santos Coffee Estate', hub:'santos', icon:'♨', commodity:'Coffee', maxLevel:3, baseCost:390000, buildDays:10, dailyIncome:2800, pnlBonus:14500, equityReduction:.02, minReputation:61, minDeals:3, description:'Captive origination, quality control and traceability across the Brazilian coffee chain.' },
    { id:'permian-production', chain:'upstream', name:'Permian Production Interest', hub:'houston', icon:'◉', commodity:'Diesel', priceKey:'crude', maxLevel:3, baseCost:620000, buildDays:14, dailyIncome:4500, pnlBonus:22000, equityReduction:.018, minReputation:66, minDeals:4, description:'Energy working interest that improves feedstock access and margins on refined products.' },
    { id:'genoa-terminal', chain:'midstream', name:'Genoa Multipurpose Terminal', hub:'genova', icon:'▤', routeHub:'genova', maxLevel:3, baseCost:220000, buildDays:6, dailyIncome:1600, pnlBonus:6000, durationBonus:1, minReputation:52, minDeals:1, description:'Berth priority, customs handling and dedicated storage for cargoes bound for Northern Italy.' },
    { id:'rotterdam-tanks', chain:'midstream', name:'Rotterdam Storage & Blending', hub:'rotterdam', icon:'▥', routeHub:'rotterdam', maxLevel:3, baseCost:470000, buildDays:11, dailyIncome:3400, pnlBonus:11000, durationBonus:1, minReputation:60, minDeals:2, description:'Tankage, warehouse receipts and blending optionality in Europe’s leading hub.' },
    { id:'ocean-logistics-pool', chain:'midstream', name:'Ocean Logistics Pool', hub:'geneva', icon:'◈', ocean:true, maxLevel:3, baseCost:360000, buildDays:8, dailyIncome:2100, pnlBonus:7500, durationBonus:1, minReputation:57, minDeals:2, description:'Pool of ocean capacity and COA contracts that reduce freight volatility and transit time.' },
    { id:'brescia-cable-mill', chain:'downstream', name:'Brescia Cable Mill', hub:'brescia', icon:'⌁', commodities:['Copper','Aluminium'], destination:'brescia', maxLevel:3, baseCost:310000, buildDays:8, dailyIncome:2600, pnlBonus:13500, acceptanceBonus:3, minReputation:54, minDeals:1, description:'Captive demand and conversion margin in copper and aluminium. Stabilizes sales and increases value per tonne.' },
    { id:'po-valley-distribution', chain:'downstream', name:'Po Valley Fertilizer Network', hub:'brescia', icon:'✦', commodity:'Urea', destination:'brescia', maxLevel:3, baseCost:280000, buildDays:7, dailyIncome:2200, pnlBonus:10500, acceptanceBonus:4, minReputation:58, minDeals:2, description:'Agricultural distribution network with local warehouses and captive seasonal demand.' },
    { id:'ara-fuel-blending', chain:'downstream', name:'ARA Fuel Blending Plant', hub:'rotterdam', icon:'◫', commodity:'Diesel', priceKey:'crude', destination:'rotterdam', maxLevel:3, baseCost:540000, buildDays:12, dailyIncome:4100, pnlBonus:20500, acceptanceBonus:3, minReputation:65, minDeals:4, description:'Blending and specification management turn feedstock into higher-margin saleable products.' },
    { id:'italian-roastery', chain:'downstream', name:'Italian Roastery Group', hub:'brescia', icon:'☕', commodity:'Coffee', destination:'brescia', maxLevel:3, baseCost:430000, buildDays:10, dailyIncome:3300, pnlBonus:17000, acceptanceBonus:3, minReputation:64, minDeals:4, description:'Roasting capacity and branded distribution to capture downstream margin in the coffee chain.' },
    { id:'yangtze-steel-interest', chain:'downstream', name:'Yangtze Steel Mill Interest', hub:'shanghai', icon:'▰', commodity:'Iron ore', destination:'shanghai', maxLevel:3, baseCost:780000, buildDays:16, dailyIncome:5900, pnlBonus:30000, acceptanceBonus:2, minReputation:72, minDeals:6, description:'Steel-industry interest that creates captive demand for large iron ore cargoes.' }
  ];

  const shopCatalog = [
    {
      id:'owned-handysize', category:'fleet', name:'Handysize Workhorse', icon:'🚢', vesselCatalogId:'ocean-pioneer',
      cost:1_150_000, buildDays:8, maxOwned:2, minReputation:54, minDeals:1, maintenance:1_450,
      description:'Purchase a versatile Handysize vessel instead of relying exclusively on short time-charters.',
      benefit:'Permanent vessel · 32,000 t capacity · no charter expiry'
    },
    {
      id:'owned-rhine-barge', category:'fleet', name:'Rhine Logistics Barge', icon:'⛴', vesselCatalogId:'rhine-link',
      cost:640_000, buildDays:6, maxOwned:2, minReputation:58, minDeals:2, requiresOffice:'rotterdam', maintenance:720,
      description:'Own a shallow-draft barge for metals and warehouse releases across the Rhine corridor.',
      benefit:'Permanent river capacity · strong European execution edge'
    },
    {
      id:'owned-product-tanker', category:'fleet', name:'MR Product Tanker', icon:'◉', vesselCatalogId:'gulf-product-tanker',
      cost:2_850_000, buildDays:12, maxOwned:1, minReputation:64, minDeals:3, requiresOffice:'rotterdam', maintenance:3_200,
      description:'A permanently controlled product tanker for Gulf Coast and ARA distillate flows.',
      benefit:'47,000 t tanker · +$46K freight edge · no charter expiry'
    },
    {
      id:'owned-panamax', category:'fleet', name:'Panamax Bulk Carrier', icon:'▰', vesselCatalogId:'pilbara-panamax',
      cost:3_650_000, buildDays:14, maxOwned:1, minReputation:72, minDeals:6, requiresOffice:'singapore', maintenance:4_100,
      description:'Acquire large dry-bulk capacity for ore, grains and long-haul industrial cargoes.',
      benefit:'76,000 t capacity · +$62K freight edge · strategic endgame asset'
    },
    {
      id:'genoa-bonded-warehouse', category:'storage', name:'Genoa Bonded Warehouse', icon:'▥', hub:'genova',
      cost:420_000, buildDays:6, maxOwned:3, minReputation:52, minDeals:1, requiresOffice:'genova', dailyCost:320, dailyIncome:900,
      matchHubs:['genova','brescia'], storageDiscount:.12, pnlBonus:4_500, equityReduction:.008,
      description:'Dedicated bonded capacity for metals, fertilizer and food-grade parcels entering Northern Italy.',
      benefit:'Lower storage cost · +$4.5K route edge per unit · working-capital relief'
    },
    {
      id:'rotterdam-tank-farm', category:'storage', name:'Rotterdam Tank Farm', icon:'▤', hub:'rotterdam',
      cost:880_000, buildDays:9, maxOwned:2, minReputation:60, minDeals:2, requiresOffice:'rotterdam', dailyCost:650, dailyIncome:2_100,
      matchHubs:['rotterdam','antwerp'], storageDiscount:.16, pnlBonus:9_000, equityReduction:.012,
      description:'Independent tankage and blending capacity in the ARA hub for energy and liquid commodities.',
      benefit:'Storage optionality · +$9K route edge · stronger financing base'
    },
    {
      id:'singapore-bonded-hub', category:'storage', name:'Singapore Bonded Logistics Hub', icon:'▦', hub:'singapore',
      cost:1_180_000, buildDays:11, maxOwned:2, minReputation:68, minDeals:5, requiresOffice:'singapore', dailyCost:820, dailyIncome:2_700,
      matchHubs:['singapore','klang'], storageDiscount:.18, pnlBonus:12_000, equityReduction:.014, acceptanceBonus:1,
      description:'A bonded regional warehouse for metals, energy parcels and high-value Asian cargoes.',
      benefit:'Asian storage capacity · +$12K route edge · improved buyer service'
    },
    {
      id:'project-office', category:'infrastructure', name:'Capital Projects Office', icon:'⌂', hub:'geneva',
      cost:520_000, buildDays:7, maxOwned:2, minReputation:56, minDeals:2, dailyCost:480, builderBonus:1,
      description:'Hire engineers, project managers and procurement specialists dedicated to expansion projects.',
      benefit:'+1 simultaneous project team per office'
    },
    {
      id:'genoa-handling-system', category:'infrastructure', name:'Genoa Priority Handling System', icon:'⚓', hub:'genova',
      cost:690_000, buildDays:8, maxOwned:2, minReputation:58, minDeals:2, requiresOffice:'genova', dailyCost:520, dailyIncome:1_100,
      matchHubs:['genova','brescia'], durationBonus:1, pnlBonus:7_000, acceptanceBonus:1,
      description:'Dedicated cranes, customs lanes and truck slots protect delivery windows in Northern Italy.',
      benefit:'-1 transit day · +$7K route edge · stronger execution promise'
    },
    {
      id:'intermodal-truck-fleet', category:'infrastructure', name:'Intermodal Truck Fleet', icon:'▣', hub:'brescia',
      cost:480_000, buildDays:6, maxOwned:2, minReputation:54, minDeals:1, dailyCost:390, dailyIncome:750,
      transportClass:'land', durationBonus:1, pnlBonus:5_000, acceptanceBonus:1,
      description:'Owned last-mile capacity for overland and port-to-customer movements.',
      benefit:'Faster land execution · +$5K deal edge · lower delivery risk'
    },
    {
      id:'digital-control-tower', category:'infrastructure', name:'Digital Trade Control Tower', icon:'⌁', hub:'geneva',
      cost:760_000, buildDays:9, maxOwned:1, minReputation:62, minDeals:3, dailyCost:620, dailyIncome:1_500,
      pnlBonus:4_000, equityReduction:.015, acceptanceBonus:2,
      description:'Integrates documentation, vessel tracking, inventory and counterparty alerts across the group.',
      benefit:'Global +$4K execution edge · lower equity · +2 acceptance'
    }
  ];

  const missionCatalog = [
    { id: 'first-cargo', title: 'First Cargo', description: 'Complete your first physical deal.', target: 1, progress: s => s.completedDeals, achieved: s => s.completedDeals >= 1, cash: 40_000, reputation: 2 },
    { id: 'risk-discipline', title: 'Risk Discipline', description: 'Close a profitable deal with at least an 80% hedge.', target: 1, progress: s => s.history.filter(h => h.pnl > 0 && (h.hedgeRatio || 0) >= 80).length, achieved: s => s.history.some(h => h.pnl > 0 && (h.hedgeRatio || 0) >= 80), cash: 55_000, reputation: 2 },
    { id: 'fleet-operator', title: 'Fleet Operator', description: 'Complete a deal using a time-chartered vessel.', target: 1, progress: s => s.history.filter(h => h.shippingStrategy === 'internal-fleet').length, achieved: s => s.history.some(h => h.shippingStrategy === 'internal-fleet'), cash: 75_000, reputation: 3 },
    { id: 'european-network', title: 'European Network', description: 'Open the Genoa and Rotterdam desks.', target: 2, progress: s => ['genova','rotterdam'].filter(id => officeOwned(id)).length, achieved: s => officeOwned('genova') && officeOwned('rotterdam'), cash: 100_000, credit: 500_000, reputation: 3 },
    { id: 'relationship-builder', title: 'Relationship Builder', description: 'Complete at least three deals and raise one commercial relationship above 60.', target: 4, progress: s => Math.min(3,s.completedDeals) + (Object.values(s.counterparties||{}).some(p => p.relationship >= 60) ? 1 : 0), achieved: s => s.completedDeals >= 3 && Object.values(s.counterparties||{}).some(p => p.relationship >= 60), cash: 85_000, reputation: 3 },
    { id: 'crisis-tested', title: 'Crisis Tested', description: 'Complete a deal affected by a global dislocation.', target: 1, progress: s => s.history.filter(h => (h.globalEventImpacts||[]).length).length, achieved: s => s.history.some(h => (h.globalEventImpacts||[]).length), cash: 90_000, reputation: 3 },
    { id: 'academy-graduate', title: 'Academy Graduate', description: 'Complete every Academy lesson.', target: academyCatalog.length, progress: s => Object.values(s.academyProgress||{}).filter(item=>item.completed).length, achieved: s => Object.values(s.academyProgress||{}).filter(item=>item.completed).length >= academyCatalog.length, cash: 120_000, reputation: 4 },
    { id: 'multi-commodity', title: 'Multi-Commodity Merchant', description: 'Close deals in at least three different commodities.', target: 3, progress: s => new Set((s.history||[]).map(item=>item.commodity)).size, achieved: s => new Set((s.history||[]).map(item=>item.commodity)).size >= 3, cash: 140_000, reputation: 4 },
    { id: 'liquidity-professional', title: 'Liquidity Professional', description: 'Close profitably a deal that required at least one margin call.', target: 1, progress: s => (s.history||[]).filter(item=>item.pnl>0&&(item.marginCalls||0)>0).length, achieved: s => (s.history||[]).some(item=>item.pnl>0&&(item.marginCalls||0)>0), cash: 110_000, credit: 350_000, reputation: 3 },
    { id: 'top-ten-merchant', title: 'Top 10 Merchant', description: 'Reach the Career League top 10 after closing at least three deals.', target: 10, progress: s => s.completedDeals < 3 ? 0 : Math.max(0, 11 - leaderboardPosition('overall')), achieved: s => s.completedDeals >= 3 && leaderboardPosition('overall') <= 10, cash: 150_000, reputation: 4 },
    { id: 'vertical-pioneer', title: 'Vertical Pioneer', description: 'Build at least one upstream, one midstream and one downstream asset.', target: 3, progress: s => ['upstream','midstream','downstream'].filter(chain => investmentCatalog.some(asset => asset.chain === chain && investmentLevel(asset.id) > 0)).length, achieved: s => ['upstream','midstream','downstream'].every(chain => investmentCatalog.some(asset => asset.chain === chain && investmentLevel(asset.id) > 0)), cash: 180_000, reputation: 5 },
    { id: 'industrial-empire', title: 'Industrial Empire', description: 'Reach a combined total of 10 industrial asset levels.', target: 10, progress: s => totalInvestmentLevels(), achieved: s => totalInvestmentLevels() >= 10, cash: 300_000, credit: 500_000, reputation: 6 },
    { id: 'first-owned-asset', title: 'Asset Owner', description: 'Commission your first permanent asset from the Empire Shop.', target: 1, progress: s => s.shopDeliveries||0, achieved: s => (s.shopDeliveries||0)>=1, cash: 100_000, reputation: 3 },
    { id: 'logistics-magnate', title: 'Logistics Magnate', description: 'Own a vessel, a warehouse and an infrastructure asset.', target: 3, progress: s => ['fleet','storage','infrastructure'].filter(category=>shopCatalog.some(item=>item.category===category&&shopOwnedQuantity(item.id)>0)).length, achieved: s => ['fleet','storage','infrastructure'].every(category=>shopCatalog.some(item=>item.category===category&&shopOwnedQuantity(item.id)>0)), cash: 350_000, credit: 500_000, reputation: 6 },
    { id: 'global-desk', title: 'Global Desk', description: 'Open Singapore and complete at least five deals.', target: 6, progress: s => Math.min(5, s.completedDeals) + (officeOwned('singapore') ? 1 : 0), achieved: s => officeOwned('singapore') && s.completedDeals >= 5, cash: 200_000, reputation: 5 },
    { id: 'energy-diversification', title: 'Energy & Agri Trader', description: 'Close at least one energy deal (Diesel or LNG) and one agricultural deal (Coffee, Wheat, or Palm oil).', target: 2, progress: s => (((s.history||[]).some(d=>['Diesel','LNG'].includes(d.commodity)))?1:0)+(((s.history||[]).some(d=>['Coffee','Wheat','Palm oil'].includes(d.commodity)))?1:0), achieved: s => (s.history||[]).some(d=>['Diesel','LNG'].includes(d.commodity)) && (s.history||[]).some(d=>['Coffee','Wheat','Palm oil'].includes(d.commodity)), cash: 130_000, reputation: 4 },
    { id: 'atlantic-originator', title: 'Atlantic Originator', description: 'Close deals from both the Americas (New Orleans or Santos) and West Africa (Abidjan) in the same career.', target: 2, progress: s => { const origins = new Set((s.history||[]).map(d=>{const o=getOpportunity(d.opportunityId); return o?.origin;})); return (['new-orleans','santos','rosario'].some(h=>origins.has(h))?1:0)+(['abidjan'].some(h=>origins.has(h))?1:0); }, achieved: s => { const origins = new Set((s.history||[]).map(d=>getOpportunity(d.opportunityId)?.origin)); return ['new-orleans','santos','rosario'].some(h=>origins.has(h)) && origins.has('abidjan'); }, cash: 175_000, reputation: 5 },
    { id: 'steel-specialist', title: 'Steel Specialist', description: 'Close the Yangtze Steel Export deal.', target: 1, progress: s => (s.history||[]).filter(d=>d.opportunityId==='shanghai-steel').length, achieved: s => (s.history||[]).some(d=>d.opportunityId==='shanghai-steel'), cash: 180_000, reputation: 5 },
    { id: 'lng-specialist', title: 'LNG Specialist', description: 'Close the Qatar LNG Express deal.', target: 1, progress: s => (s.history||[]).filter(d=>d.opportunityId==='qatar-lng').length, achieved: s => (s.history||[]).some(d=>d.opportunityId==='qatar-lng'), cash: 160_000, reputation: 5 },
    { id: 'strategic-sourcer', title: 'Strategic Sourcer', description: 'Fulfil a three-cargo procurement commitment without a shortfall.', target: 1, progress: s => s.commitmentsFulfilled || 0, achieved: s => (s.commitmentsFulfilled || 0) >= 1, cash: 135_000, reputation: 4 },
    { id: 'control-tower', title: 'Control Tower', description: 'Mitigate congestion on three live cargoes.', target: 3, progress: s => s.congestionMitigations || 0, achieved: s => (s.congestionMitigations || 0) >= 3, cash: 120_000, reputation: 3 },
    { id: 'scenario-ready', title: 'Scenario Ready', description: 'Run three board-level stress scenarios.', target: 3, progress: s => s.stressTestsRun || 0, achieved: s => (s.stressTestsRun || 0) >= 3, cash: 90_000, reputation: 3 }
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
      version: 32,
      profileName: 'Giorgio Bonetta',
      companyName: 'World of Trade Co.',
      leaderboardSnapshots: [],
      investments: {},
      constructionQueue: [],
      assetIncome: 0,
      date: '2026-09-01T00:00:00.000Z',
      cash: prestigeStartCash(1_000_000),
      creditLimit: prestigeStartCredit(6_000_000),
      reputation: prestigeStartReputation(50),
      prestigeLevel: loadPrestige(),
      victoryClaimed: false,
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
      zincPrice: 2800,
      zincPrev: 2800,
      nickelPrice: 16000,
      nickelPrev: 16000,
      lngPrice: 12.5,
      lngPrev: 12.5,
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
      totalInterestPaid: 0,
      tutorialEnabled: true,
      tutorialStep: 0,
      tutorialDismissed: false,
      graphicsQuality: 'auto',
      autosave: true,
      reduceMotion: false,
      xp: 0,
      xpLevel: 1,
      goldBars: 0,
      bonusBuilders: 0,
      loginStreak: 0,
      lastRewardDay: null,
      soundEnabled: true,
      language: 'en',
      lastSavedAt: null,
      briefingViewedDay: -1,
      marketRegime: 'balanced',
      rivalMarket: {},
      rivalFeed: [],
      tenderWins: 0,
      tenderLosses: 0,
      achievements: [],
      strategyDoctrine: 'merchant',
      strategyChangedDay: -30,
      creditLosses: 0,
      receivableProtectionCost: 0,
      storageOptionIncome: 0,
      valuationHigh: 1_000_000,
      intelCooldownDay: -99,
      intelReport: null,
      cpOutreachDays: {},
      termStructure: {},
      hubBasis: {},
      quarterNumber: 1,
      quarterTarget: 500000,
      quarterStartPnl: 0,
      quarterBonusPaid: 0,
      quarterMissed: 0,
      forwardCurve: {},
      priceHistory: {},
      pnlByCommodity: {},
      tradeCountByCommodity: {},
      complianceReviews: {},
      complianceIncidents: [],
      complianceSpend: 0,
      tradeJournal: [],
      counterpartyLimitOverrides: {},
      creditLimitRequests: {},
      receivablesCollected: 0,
      overdueReceivables: 0,
      contractIncidents: [],
      procurementAgreements: {},
      routeConditions: {},
      supplyChainSpend: 0,
      supplyChainSavings: 0,
      commitmentsFulfilled: 0,
      congestionMitigations: 0,
      supplyIncidents: [],
      capitalPolicy: 'balanced',
      capitalPolicyChangedDay: -30,
      stressTestsRun: 0,
      stressTestHistory: [],
      lastStressTest: null,
      shopAssets: {},
      shopOrders: [],
      shopSpent: 0,
      shopDeliveries: 0
    };
  }

  function loadState() {
    try {
      let raw = localStorage.getItem(currentStorageKey());
      if (!raw) {
        // One-time migration: adopt a pre-slot save (base key or legacy) into the active slot
        raw = localStorage.getItem(storageKey);
        if (!raw) {
          for (const legacyKey of legacyStorageKeys) {
            raw = localStorage.getItem(legacyKey);
            if (raw) break;
          }
        }
      }
      if (!raw) return defaultState();
      const loaded = JSON.parse(raw);
      if (![3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32].includes(loaded.version)) return defaultState();
      const migrated = { ...defaultState(), ...loaded, version: 32 };
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
      migrated.companyName = migrated.companyName || 'World of Trade Co.';
      migrated.leaderboardSnapshots = migrated.leaderboardSnapshots || [];
      migrated.investments = migrated.investments || {};
      migrated.constructionQueue = migrated.constructionQueue || [];
      migrated.assetIncome = migrated.assetIncome || 0;
      migrated.difficulty = migrated.difficulty || 'standard';
      if (loaded.version < 8) migrated.onboardingComplete = true;
      migrated.tutorialEnabled = migrated.tutorialEnabled ?? true;
      migrated.tutorialStep = Number.isFinite(migrated.tutorialStep) ? migrated.tutorialStep : 0;
      migrated.tutorialDismissed = migrated.tutorialDismissed ?? false;
      migrated.graphicsQuality = ['auto','high','balanced','performance'].includes(migrated.graphicsQuality) ? migrated.graphicsQuality : 'auto';
      migrated.autosave = migrated.autosave !== false;
      migrated.reduceMotion = migrated.reduceMotion === true;
      migrated.xp = Number.isFinite(migrated.xp) ? migrated.xp : 0;
      migrated.xpLevel = Number.isFinite(migrated.xpLevel) && migrated.xpLevel >= 1 ? migrated.xpLevel : 1;
      migrated.goldBars = Number.isFinite(migrated.goldBars) ? migrated.goldBars : 0;
      migrated.bonusBuilders = Number.isFinite(migrated.bonusBuilders) ? migrated.bonusBuilders : 0;
      migrated.loginStreak = Number.isFinite(migrated.loginStreak) ? migrated.loginStreak : 0;
      migrated.lastRewardDay = migrated.lastRewardDay || null;
      migrated.soundEnabled = migrated.soundEnabled !== false;
      migrated.language = (migrated.language === 'it') ? 'it' : 'en';
      migrated.prestigeLevel = Number.isFinite(migrated.prestigeLevel) ? migrated.prestigeLevel : loadPrestige();
      migrated.victoryClaimed = migrated.victoryClaimed === true;
      migrated.marketRegime = marketRegimeCatalog[migrated.marketRegime] ? migrated.marketRegime : 'balanced';
      migrated.rivalMarket = migrated.rivalMarket || {};
      migrated.rivalFeed = migrated.rivalFeed || [];
      migrated.tenderWins = migrated.tenderWins || 0;
      migrated.tenderLosses = migrated.tenderLosses || 0;
      migrated.achievements = migrated.achievements || [];
      migrated.strategyDoctrine = strategyDoctrineCatalog[migrated.strategyDoctrine] ? migrated.strategyDoctrine : 'merchant';
      migrated.strategyChangedDay = Number.isFinite(migrated.strategyChangedDay) ? migrated.strategyChangedDay : -30;
      migrated.creditLosses = migrated.creditLosses || 0;
      migrated.receivableProtectionCost = migrated.receivableProtectionCost || 0;
      migrated.storageOptionIncome = migrated.storageOptionIncome || 0;
      migrated.valuationHigh = migrated.valuationHigh || 1_000_000;
      migrated.intelCooldownDay = Number.isFinite(migrated.intelCooldownDay) ? migrated.intelCooldownDay : -99;
      migrated.intelReport = migrated.intelReport || null;
      migrated.cpOutreachDays = migrated.cpOutreachDays || {};
      migrated.termStructure = migrated.termStructure || {};
      migrated.forwardCurve = migrated.forwardCurve || {};
      migrated.priceHistory = migrated.priceHistory || {};
      migrated.pnlByCommodity = migrated.pnlByCommodity || {};
      migrated.tradeCountByCommodity = migrated.tradeCountByCommodity || {};
      migrated.complianceReviews = migrated.complianceReviews || {};
      migrated.complianceIncidents = migrated.complianceIncidents || [];
      migrated.complianceSpend = migrated.complianceSpend || 0;
      migrated.tradeJournal = migrated.tradeJournal || [];
      migrated.counterpartyLimitOverrides = migrated.counterpartyLimitOverrides || {};
      migrated.creditLimitRequests = migrated.creditLimitRequests || {};
      migrated.receivablesCollected = migrated.receivablesCollected || 0;
      migrated.overdueReceivables = migrated.overdueReceivables || 0;
      migrated.contractIncidents = migrated.contractIncidents || [];
      migrated.procurementAgreements = migrated.procurementAgreements || {};
      migrated.routeConditions = migrated.routeConditions || {};
      migrated.supplyChainSpend = migrated.supplyChainSpend || 0;
      migrated.supplyChainSavings = migrated.supplyChainSavings || 0;
      migrated.commitmentsFulfilled = migrated.commitmentsFulfilled || 0;
      migrated.congestionMitigations = migrated.congestionMitigations || 0;
      migrated.supplyIncidents = migrated.supplyIncidents || [];
      migrated.capitalPolicy = capitalPolicyCatalog[migrated.capitalPolicy] ? migrated.capitalPolicy : 'balanced';
      migrated.capitalPolicyChangedDay = Number.isFinite(migrated.capitalPolicyChangedDay) ? migrated.capitalPolicyChangedDay : -30;
      migrated.stressTestsRun = migrated.stressTestsRun || 0;
      migrated.stressTestHistory = migrated.stressTestHistory || [];
      migrated.lastStressTest = migrated.lastStressTest || null;
      migrated.shopAssets = migrated.shopAssets || {};
      migrated.shopOrders = migrated.shopOrders || [];
      migrated.shopSpent = migrated.shopSpent || 0;
      migrated.shopDeliveries = migrated.shopDeliveries || 0;
      migrated.hubBasis = migrated.hubBasis || {};
      migrated.quarterNumber   = migrated.quarterNumber  || 1;
      migrated.quarterTarget   = migrated.quarterTarget  || 500000;
      migrated.quarterStartPnl = migrated.quarterStartPnl || 0;
      migrated.quarterBonusPaid = migrated.quarterBonusPaid || 0;
      migrated.quarterMissed   = migrated.quarterMissed  || 0;
      migrated.lastSavedAt = migrated.lastSavedAt || null;
      migrated.briefingViewedDay = Number.isFinite(migrated.briefingViewedDay) ? migrated.briefingViewedDay : -1;
      migrated.activeDeals = (migrated.activeDeals || []).map(deal => hydrateDealOperations(deal));
      migrated.fleetAssets = (migrated.fleetAssets || []).filter(asset => vesselCatalog.some(v => v.id === asset.catalogId));
      return migrated;
    } catch {
      return defaultState();
    }
  }

  activeSlot = loadActiveSlot();
  let state = loadState();

  const complianceCountryRisk = {
    Switzerland: 4, Italy: 7, Netherlands: 6, Belgium: 6, Estonia: 8, Chile: 13,
    UAE: 24, Morocco: 16, Singapore: 7, USA: 8, Brazil: 18, Argentina: 24,
    Australia: 5, China: 22, Qatar: 12, Malaysia: 13, 'Ivory Coast': 28,
    'South Africa': 20, Zambia: 27, Indonesia: 23, Germany: 5
  };

  function recordJournal(category, title, detail, impact = 0, relatedId = null) {
    state.tradeJournal = state.tradeJournal || [];
    state.tradeJournal.unshift({
      id: `journal-${Date.now()}-${Math.round(Math.random()*1e6)}`,
      date: state.date,
      dayIndex: state.dayIndex,
      category,
      title,
      detail,
      impact,
      relatedId
    });
    state.tradeJournal = state.tradeJournal.slice(0, 80);
  }

  function complianceProfileForOpportunity(opp) {
    if (!opp) return { status:'Blocked', canTrade:false, score:100, flags:['Opportunity unavailable'], reviewed:false, cost:0 };
    const parties = partiesForOpportunity(opp);
    const supplier = getCounterparty(parties.supplierId);
    const buyer = getCounterparty(parties.buyerId);
    const counterparties = [supplier,buyer].filter(Boolean);
    const flags = [];
    let score = opp.riskClass === 'high' ? 24 : opp.riskClass === 'medium' ? 13 : 6;
    counterparties.forEach(cp => {
      score += Math.round((complianceCountryRisk[cp.country] || 15) * .55);
      if (cp.kyc === 'Enhanced review') flags.push(`${cp.name}: enhanced KYC review`);
      if (cp.kyc === 'In progress') flags.push(`${cp.name}: KYC file incomplete`);
      if (cp.kyc === 'Blocked') flags.push(`${cp.name}: blocked counterparty`);
      const credit = Number(cp.credit ?? 70);
      if (credit < 65) flags.push(`${cp.name}: weak credit profile`);
    });
    if ((opp.via || []).includes('genova') && state.activeGlobalEvents.some(event => /sanction|customs/i.test(event.title || ''))) {
      flags.push('Active customs or sanctions disruption on the route');
      score += 18;
    }
    score = clamp(score, 0, 100);
    const review = state.complianceReviews?.[opp.id];
    const reviewed = !!(review && review.cycle === state.marketCycle && review.status === 'approved');
    const blocked = counterparties.some(cp => cp.kyc === 'Blocked') || (review && review.cycle === state.marketCycle && review.status === 'rejected');
    const requiresReview = flags.length > 0 || score >= 34;
    const status = blocked ? 'Blocked' : reviewed ? 'Approved' : requiresReview ? 'Review required' : 'Clear';
    const cost = Math.max(9_000, Math.round(6_000 + score * 420));
    return { status, canTrade: !blocked && (!requiresReview || reviewed), score, flags, reviewed, requiresReview, cost, supplier, buyer };
  }

  function runComplianceReview(oppId) {
    const opp = getOpportunity(oppId);
    if (!opp) return;
    const profile = complianceProfileForOpportunity(opp);
    if (profile.status === 'Blocked') return showToast('Compliance has blocked this route for the current market cycle.');
    if (profile.reviewed || !profile.requiresReview) return showToast('This opportunity is already cleared for trading.');
    if (state.cash < profile.cost) return showToast(`Enhanced due diligence requires ${money(profile.cost)} cash.`);
    state.cash -= profile.cost;
    state.complianceSpend = (state.complianceSpend || 0) + profile.cost;
    state.complianceReviews[oppId] = {
      status: 'approved',
      cycle: state.marketCycle,
      reviewedAt: state.date,
      score: profile.score,
      flags: profile.flags,
      cost: profile.cost
    };
    recordJournal('Compliance', `${opp.title} cleared`, `Enhanced due diligence completed. ${profile.flags.length ? profile.flags.join(' · ') : 'No material red flags.'}`, -profile.cost, opp.id);
    saveState();
    renderAll();
    showToast(`Compliance review approved for ${opp.title}. Cost ${money(profile.cost)}.`);
  }

  initializeCounterparties();
  state.activeDeals = state.activeDeals.map(hydrateDealOperations);
  initializeCompetitiveMarket();
  evaluateAchievements(false);
  let selected = { type: 'hub', id: 'geneva' };
  let activeLeftTab = 'portfolio';
  let selectedLeaderboardMode = 'overall';
  const selectedHedgeRatios = Object.fromEntries(opportunities.map(o => [o.id, o.recommendedHedge || 100]));
  const selectedCarrierStrategies = Object.fromEntries(opportunities.map(o => [o.id, 'spot']));
  const selectedVesselClasses    = Object.fromEntries(opportunities.map(o => [o.id, 'supramax']));

  const vesselClasses = {
    handysize: { id:'handysize', label:'Handysize (28K DWT)', pnlMod:-0.06, durationMod:-2,
      eligible: null, desc: 'Flexible, port-agnostic. Higher freight cost per tonne.' },
    supramax:  { id:'supramax',  label:'Supramax (55K DWT)',  pnlMod: 0,    durationMod: 0,
      eligible: null, desc: 'Industry standard bulk carrier. Balanced cost and speed.' },
    panamax:   { id:'panamax',   label:'Panamax (75K DWT)',   pnlMod: 0.07, durationMod: 2,
      eligible: ['ironore','wheat','urea','aluminium','soybeans','steel','zinc'],
      desc: 'Efficient for large dry bulk. Requires 2 extra loading days.' },
    capesize:  { id:'capesize',  label:'Capesize (180K DWT)', pnlMod: 0.15, durationMod: 5,
      eligible: ['ironore','wheat','soybeans'],
      desc: 'Lowest freight cost per tonne. Slow, bulk ports only.' },
  };

  function vesselClassFor(oppId) { return vesselClasses[selectedVesselClasses[oppId]] || vesselClasses.supramax; }
  function availableVesselClasses(opp) {
    return Object.values(vesselClasses).filter(vc => !vc.eligible || vc.eligible.includes(opp.commodity));
  }
  const selectedFinancingStrategies = Object.fromEntries(opportunities.map(o => [o.id, 'revolver']));
  const selectedInsuranceStrategies = Object.fromEntries(opportunities.map(o => [o.id, 'basic']));
  const selectedInspectionStrategies = Object.fromEntries(opportunities.map(o => [o.id, 'standard']));
  const selectedFxHedgeRatios = Object.fromEntries(opportunities.map(o => [o.id, ['geneva','brescia','genova','rotterdam'].includes(o.destination) ? 80 : 100]));
  const selectedNegotiationDrafts = Object.fromEntries(opportunities.map(o => [o.id, null]));
  let layers = { opportunities: true, portfolio: true, risk: false, logistics: true };
  let runningSpeed = 0;
  let clockTimer = null;
  let toastTimer = null;
  let leftDrawerOpen = false;
  let inspectorOpen = false;
  let overviewOpen = false;
  let marketsOpen = false;
  let layersOpen = false;
  const globeOptions = { labels: true, clouds: true, night: true, autoRotate: false, cinematic: false };
  let geoBorderLines = null;
  let geoCoastlines = null;
  let hoveredTarget = null;
  let trackingDealId = null;
  let followCargo = false;
  let lastPointerPosition = { x: 0, y: 0 };
  let lastInteractionTime = performance.now();
  let searchItems = [];
  let searchActiveIndex = 0;
  let briefingOpen = false;
  let saveStatusTimer = null;


  function targetPixelRatio() {
    const base = window.devicePixelRatio || 1;
    const quality = state?.graphicsQuality || 'auto';
    if (quality === 'high') return Math.min(base, 2);
    if (quality === 'balanced') return Math.min(base, 1.5);
    if (quality === 'performance') return Math.min(base, 1);
    const constrained = (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) || window.matchMedia('(max-width: 900px)').matches;
    return Math.min(base, constrained ? 1.2 : 1.75);
  }

  function markSaveStatus(label = 'Saved', working = false) {
    const status = $('#saveStatus');
    if (!status) return;
    status.classList.toggle('saving', working);
    status.classList.toggle('error', label === 'Save failed');
    const text = $('b', status);
    if (text) text.textContent = label;
    clearTimeout(saveStatusTimer);
    if (label === 'Saved') {
      saveStatusTimer = setTimeout(() => {
        const date = state.lastSavedAt ? new Date(state.lastSavedAt) : null;
        if (text && date) text.textContent = `Saved ${date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`;
      }, 900);
    }
  }

  function downloadTextFile(filename, content, type = 'application/json') {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  function exportCareer() {
    const payload = {
      product: 'World of Trade',
      schemaVersion: 23,
      exportedAt: new Date().toISOString(),
      state
    };
    const safeCompany = (state.companyName || 'WorldOfTrade').replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
    downloadTextFile(`${safeCompany || 'world-of-trade'}-career-day-${state.dayIndex}.json`, JSON.stringify(payload, null, 2));
    showToast('Career backup exported.');
  }

  async function importCareerFile(file) {
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      const imported = parsed?.state || parsed;
      if (!imported || typeof imported !== 'object' || !Array.isArray(imported.activeDeals) || !Array.isArray(imported.history)) {
        throw new Error('Invalid World of Trade career file');
      }
      const migrated = { ...defaultState(), ...imported, version: 32 };
      migrated.activeDeals = (migrated.activeDeals || []).map(hydrateDealOperations);
      migrated.fleetAssets = (migrated.fleetAssets || []).filter(asset => vesselCatalog.some(vessel => vessel.id === asset.catalogId));
      migrated.offices = [...new Set(['geneva', ...(migrated.offices || [])])];
      migrated.tutorialEnabled = migrated.tutorialEnabled ?? true;
      migrated.tutorialStep = Number.isFinite(migrated.tutorialStep) ? migrated.tutorialStep : 0;
      migrated.tutorialDismissed = migrated.tutorialDismissed ?? false;
      migrated.graphicsQuality = ['auto','high','balanced','performance'].includes(migrated.graphicsQuality) ? migrated.graphicsQuality : 'auto';
      migrated.autosave = migrated.autosave !== false;
      migrated.marketRegime = marketRegimeCatalog[migrated.marketRegime] ? migrated.marketRegime : 'balanced';
      migrated.rivalMarket = migrated.rivalMarket || {};
      migrated.rivalFeed = migrated.rivalFeed || [];
      migrated.tenderWins = migrated.tenderWins || 0;
      migrated.tenderLosses = migrated.tenderLosses || 0;
      migrated.achievements = migrated.achievements || [];
      migrated.complianceReviews = migrated.complianceReviews || {};
      migrated.complianceIncidents = migrated.complianceIncidents || [];
      migrated.complianceSpend = migrated.complianceSpend || 0;
      migrated.tradeJournal = migrated.tradeJournal || [];
      migrated.counterpartyLimitOverrides = migrated.counterpartyLimitOverrides || {};
      migrated.creditLimitRequests = migrated.creditLimitRequests || {};
      migrated.receivablesCollected = migrated.receivablesCollected || 0;
      migrated.overdueReceivables = migrated.overdueReceivables || 0;
      migrated.contractIncidents = migrated.contractIncidents || [];
      migrated.procurementAgreements = migrated.procurementAgreements || {};
      migrated.routeConditions = migrated.routeConditions || {};
      migrated.supplyChainSpend = migrated.supplyChainSpend || 0;
      migrated.supplyChainSavings = migrated.supplyChainSavings || 0;
      migrated.commitmentsFulfilled = migrated.commitmentsFulfilled || 0;
      migrated.congestionMitigations = migrated.congestionMitigations || 0;
      migrated.supplyIncidents = migrated.supplyIncidents || [];
      migrated.capitalPolicy = capitalPolicyCatalog[migrated.capitalPolicy] ? migrated.capitalPolicy : 'balanced';
      migrated.capitalPolicyChangedDay = Number.isFinite(migrated.capitalPolicyChangedDay) ? migrated.capitalPolicyChangedDay : -30;
      migrated.stressTestsRun = migrated.stressTestsRun || 0;
      migrated.stressTestHistory = migrated.stressTestHistory || [];
      migrated.lastStressTest = migrated.lastStressTest || null;
      migrated.shopAssets = migrated.shopAssets || {};
      migrated.shopOrders = migrated.shopOrders || [];
      migrated.shopSpent = migrated.shopSpent || 0;
      migrated.shopDeliveries = migrated.shopDeliveries || 0;
      state = migrated;
      initializeCounterparties();
      initializeCompetitiveMarket();
      evaluateAchievements(false);
      selected = { type: 'hub', id: 'geneva' };
      runningSpeed = 0;
      dpr = targetPixelRatio();
      resizeCanvas();
      saveState(true);
      renderAll();
      cleanGlobeView();
      showToast('Career imported successfully.');
      $('#profileDialog')?.close();
    } catch (error) {
      console.error(error);
      showToast('This file is not a valid World of Trade career backup.');
    } finally {
      const input = $('#importCareerInput');
      if (input) input.value = '';
    }
  }

  function openProfileDialog() {
    const dialog = $('#profileDialog');
    if (!dialog || dialog.open) return;
    $('#profileNameInput').value = state.profileName || '';
    $('#companyNameInput').value = state.companyName || '';
    $('#graphicsQualitySelect').value = state.graphicsQuality || 'auto';
    $('#autosaveSelect').value = state.autosave === false ? 'off' : 'on';
    if ($('#reduceMotionSelect')) $('#reduceMotionSelect').value = state.reduceMotion ? 'off' : 'on';
    if ($('#soundSelect')) $('#soundSelect').value = state.soundEnabled === false ? 'off' : 'on';
    if ($('#languageSelect')) $('#languageSelect').value = state.language === 'it' ? 'it' : 'en';
    dialog.showModal();
  }

  function applyProfileChanges() {
    state.profileName = ($('#profileNameInput')?.value || state.profileName || 'Trader').trim().slice(0, 48);
    state.companyName = ($('#companyNameInput')?.value || state.companyName || 'World of Trade Co.').trim().slice(0, 48);
    state.graphicsQuality = $('#graphicsQualitySelect')?.value || 'auto';
    state.autosave = $('#autosaveSelect')?.value !== 'off';
    state.reduceMotion = $('#reduceMotionSelect')?.value === 'off';
    document.body.classList.toggle('reduce-motion', !!state.reduceMotion);
    state.soundEnabled = $('#soundSelect')?.value !== 'off';
    if (state.soundEnabled) { try { Sound.unlock(); Sound.play('success'); } catch (e) {} }
    state.language = $('#languageSelect')?.value === 'it' ? 'it' : 'en';
    applyLanguage(state.language);
    dpr = targetPixelRatio();
    resizeCanvas();
    saveState(true);
    renderAll();
    showToast('Profile and performance settings updated.');
  }

  const canvas = $('#globeCanvas');
  const earthCanvas = $('#earthCanvas');
  const ctx = canvas.getContext('2d');
  let dpr = targetPixelRatio();
  let view = { lon: 6, lat: 18, zoom: 1, targetLon: null, targetLat: null };

  let earthRenderer = null;
  let earthScene = null;
  let earthCamera = null;
  let earthMesh = null;
  let earthMaterial = null;
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
    const quality = state?.graphicsQuality || 'auto';
    const count = quality === 'performance' ? 650 : quality === 'high' ? 1500 : 950;
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

  function createSolidTexture(r, g, b, a = 255) {
    const texture = new THREE.DataTexture(new Uint8Array([r, g, b, a]), 1, 1, THREE.RGBAFormat);
    texture.needsUpdate = true;
    return texture;
  }

  function earthGeometrySegments() {
    const quality = state?.graphicsQuality || 'auto';
    if (quality === 'high') return [144, 96];
    if (quality === 'balanced') return [112, 72];
    if (quality === 'performance') return [72, 48];
    const constrained = (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) || window.matchMedia('(max-width: 900px)').matches;
    return constrained ? [80, 52] : [112, 72];
  }

  function prepareEarthTexture(texture, srgb = false) {
    if (srgb) texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(4, earthRenderer?.capabilities?.getMaxAnisotropy?.() || 1);
    return texture;
  }

  function deferNonCritical(callback, timeout = 900) {
    if ('requestIdleCallback' in window) window.requestIdleCallback(callback, { timeout });
    else setTimeout(callback, Math.min(timeout, 240));
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
      earthScene.fog = new THREE.FogExp2(0x010307, 0.006);
      earthCamera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);

      const placeholderDay = createSolidTexture(20, 58, 76);
      const placeholderNight = createSolidTexture(0, 0, 0);
      const placeholderSpecular = createSolidTexture(25, 25, 25);
      const placeholderNormal = createSolidTexture(128, 128, 255);
      const [widthSegments, heightSegments] = earthGeometrySegments();
      const earthGeometry = new THREE.SphereGeometry(1, widthSegments, heightSegments);

      earthMaterial = new THREE.ShaderMaterial({
        uniforms: {
          dayMap: { value: placeholderDay },
          nightMap: { value: placeholderNight },
          specularMap: { value: placeholderSpecular },
          normalMap: { value: placeholderNormal },
          nightIntensity: { value: 0.0 },
          sunDirection: { value: new THREE.Vector3(1, .25, 1).normalize() },
          atmosphereColor: { value: new THREE.Color(0x5faee7) }
        },
        vertexShader: `
          varying vec2 vUv;
          varying vec3 vWorldNormal;
          varying vec3 vWorldPosition;
          void main() {
            vUv = uv;
            vWorldNormal = normalize(mat3(modelMatrix) * normal);
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            gl_Position = projectionMatrix * viewMatrix * worldPosition;
          }
        `,
        fragmentShader: `
          uniform sampler2D dayMap;
          uniform sampler2D nightMap;
          uniform sampler2D specularMap;
          uniform sampler2D normalMap;
          uniform float nightIntensity;
          uniform vec3 sunDirection;
          uniform vec3 atmosphereColor;
          varying vec2 vUv;
          varying vec3 vWorldNormal;
          varying vec3 vWorldPosition;
          void main() {
            vec3 baseNormal = normalize(vWorldNormal);
            vec3 mapN = texture2D(normalMap, vUv).xyz * 2.0 - 1.0;
            vec3 dp1 = dFdx(vWorldPosition);
            vec3 dp2 = dFdy(vWorldPosition);
            vec2 duv1 = dFdx(vUv);
            vec2 duv2 = dFdy(vUv);
            vec3 dp2perp = cross(dp2, baseNormal);
            vec3 dp1perp = cross(baseNormal, dp1);
            vec3 tangent = dp2perp * duv1.x + dp1perp * duv2.x;
            vec3 bitangent = dp2perp * duv1.y + dp1perp * duv2.y;
            float invmax = inversesqrt(max(dot(tangent, tangent), dot(bitangent, bitangent)));
            mat3 tbn = mat3(tangent * invmax, bitangent * invmax, baseNormal);
            vec3 normal = normalize(tbn * vec3(mapN.xy * 0.30, max(mapN.z, 0.35)));
            vec3 lightDir = normalize(sunDirection);
            vec3 viewDir = normalize(cameraPosition - vWorldPosition);
            float ndl = dot(normal, lightDir);
            float dayFactor = smoothstep(-0.16, 0.22, ndl);
            vec3 dayColor = texture2D(dayMap, vUv).rgb;
            vec3 nightColor = texture2D(nightMap, vUv).rgb;
            float oceanMask = texture2D(specularMap, vUv).r;
            float diffuse = 0.20 + 0.84 * max(ndl, 0.0);
            vec3 litDay = dayColor * diffuse;
            vec3 color = mix(nightColor * nightIntensity, litDay, dayFactor);
            vec3 halfVector = normalize(lightDir + viewDir);
            float specular = pow(max(dot(normal, halfVector), 0.0), 74.0) * oceanMask * max(ndl, 0.0);
            color += vec3(0.46, 0.68, 0.82) * specular * 0.42;
            float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 4.0);
            color += atmosphereColor * fresnel * 0.09 * dayFactor;
            gl_FragColor = vec4(color, 1.0);
          }
        `
      });
      earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
      earthScene.add(earthMesh);

      const cloudMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        side: THREE.DoubleSide
      });
      cloudMesh = new THREE.Mesh(new THREE.SphereGeometry(1.006, widthSegments, heightSegments), cloudMaterial);
      earthScene.add(cloudMesh);

      const atmosphereMaterial = new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        uniforms: { glowColor: { value: new THREE.Color(0x79bdea) } },
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
            float fresnel = pow(max(0.0, 0.57 - dot(vNormal, viewDirection)), 3.8);
            gl_FragColor = vec4(glowColor, fresnel * 0.20);
          }
        `
      });
      atmosphereMesh = new THREE.Mesh(new THREE.SphereGeometry(1.022, Math.max(64, widthSegments), Math.max(42, heightSegments)), atmosphereMaterial);
      earthScene.add(atmosphereMesh);

      earthScene.add(new THREE.HemisphereLight(0x9ecbf0, 0x020409, 0.16));
      sunLight = new THREE.DirectionalLight(0xffffff, 1.15);
      sunLight.position.set(4.5, 2.4, 5.2);
      earthScene.add(sunLight);
      const rimLight = new THREE.DirectionalLight(0x5b9fd2, 0.15);
      rimLight.position.set(-4, 1.2, -3);
      earthScene.add(rimLight);

      starField = createStarField();
      earthScene.add(starField);

      // Render immediately with a lightweight procedural globe. Real textures arrive progressively.
      earthWebGLReady = true;
      const loadingLabel = $('#earthLoading strong');
      if (loadingLabel) loadingLabel.textContent = 'Loading world map';

      const primaryLoader = new THREE.TextureLoader();
      primaryLoader.load(
        './assets/earth/earth_atmos_2048.jpg',
        texture => {
          prepareEarthTexture(texture, true);
          earthMaterial.uniforms.dayMap.value = texture;
          earthMaterial.needsUpdate = true;
          $('#earthLoading')?.classList.add('loaded');
          earthCanvas?.classList.add('earth-map-ready');

          deferNonCritical(() => {
            const detailLoader = new THREE.TextureLoader();
            detailLoader.load('./assets/earth/earth_lights_2048.png', value => {
              prepareEarthTexture(value, true);
              earthMaterial.uniforms.nightMap.value = value;
              earthMaterial.uniforms.nightIntensity.value = globeOptions.night ? 0.82 : 0;
            }, undefined, () => {});
            detailLoader.load('./assets/earth/earth_normal_2048.jpg', value => {
              prepareEarthTexture(value, false);
              earthMaterial.uniforms.normalMap.value = value;
            }, undefined, () => {});
            detailLoader.load('./assets/earth/earth_specular_2048.jpg', value => {
              prepareEarthTexture(value, false);
              earthMaterial.uniforms.specularMap.value = value;
            }, undefined, () => {});
            detailLoader.load('./assets/earth/earth_clouds_1024.png', value => {
              prepareEarthTexture(value, false);
              cloudMaterial.map = value;
              cloudMaterial.alphaMap = value;
              cloudMaterial.opacity = 0.22;
              cloudMaterial.needsUpdate = true;
              earthCanvas?.classList.add('earth-detail-ready');
            }, undefined, () => {});
          }, 1200);
        },
        undefined,
        () => {
          if (loadingLabel) loadingLabel.textContent = 'Fast Earth fallback';
          setTimeout(() => $('#earthLoading')?.classList.add('loaded'), 700);
        }
      );
    } catch (error) {
      console.warn('WebGL Earth fallback', error);
      document.body.classList.add('webgl-fallback');
      $('#earthLoading')?.classList.add('loaded');
    }
  }

  function desiredGlobeRadius() {
    if (!canvasRect) return 1;
    return Math.min(canvasRect.width, canvasRect.height) * 0.43 * view.zoom;
  }

  function syncEarthProjection() {
    if (!earthCamera || !canvasRect) return;
    const width = Math.max(1, canvasRect.width);
    const height = Math.max(1, canvasRect.height);
    earthCamera.aspect = width / height;
    earthCamera.fov = 32;
    earthCamera.updateProjectionMatrix();

    const radiusPx = desiredGlobeRadius();
    const focalPx = height / (2 * Math.tan(THREE.MathUtils.degToRad(earthCamera.fov * .5)));
    const angularRadius = Math.atan(radiusPx / focalPx);
    const distance = 1 / Math.max(.11, Math.sin(angularRadius));
    earthCameraVector.copy(geoVector3(view.lon, view.lat, distance));
    earthCamera.position.copy(earthCameraVector);
    earthCamera.up.set(0, 1, 0);
    earthCamera.lookAt(0, 0, 0);
    earthCamera.updateMatrixWorld();
  }

  function renderEarth(timestamp = 0) {
    if (!earthRenderer || !earthScene || !earthCamera || !canvasRect) return;
    syncEarthProjection();
    if (cloudMesh) {
      cloudMesh.visible = globeOptions.clouds;
      cloudMesh.rotation.y = timestamp * 0.000006;
    }
    if (starField) starField.rotation.y = timestamp * 0.0000015;
    if (earthMaterial?.uniforms?.nightIntensity) earthMaterial.uniforms.nightIntensity.value = globeOptions.night ? 0.82 : 0.0;
    if (sunLight) {
      const date = currentDate();
      const yearStart = Date.UTC(date.getUTCFullYear(), 0, 0);
      const dayOfYear = Math.floor((date.getTime() - yearStart) / 86400000);
      const declination = 23.44 * Math.sin(THREE.MathUtils.degToRad((360 / 365) * (dayOfYear - 81)));
      const realNow = new Date();
      const utcHours = realNow.getUTCHours() + realNow.getUTCMinutes() / 60 + realNow.getUTCSeconds() / 3600;
      const subsolarLongitude = ((180 - utcHours * 15 + 540) % 360) - 180;
      const sunDirection = geoVector3(subsolarLongitude, declination, 1).normalize();
      sunLight.position.copy(sunDirection).multiplyScalar(6);
      earthMaterial?.uniforms?.sunDirection?.value.copy(sunDirection);
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
  let selectedShopCategory = 'all';
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
    const assetOperatingCost = shopFacilityOperatingCost() + ownedFleetMaintenance();
    return Math.round((officeCost + salaryCost + assetOperatingCost) * activeDoctrine().overheadFactor);
  }
  function shopDefinition(id) { return shopCatalog.find(item => item.id === id); }
  function shopAssetRecord(id) {
    state.shopAssets = state.shopAssets || {};
    return state.shopAssets[id] || { quantity:0, totalSpent:0 };
  }
  function shopOwnedQuantity(id) { return shopAssetRecord(id).quantity || 0; }
  function shopPendingQuantity(id) { return (state.shopOrders || []).filter(order => order.itemId === id).length; }
  function shopUnlocked(item) {
    return state.reputation >= item.minReputation && state.completedDeals >= item.minDeals && (!item.requiresOffice || officeOwned(item.requiresOffice));
  }
  function shopFacilityOperatingCost() {
    return shopCatalog.filter(item => item.category !== 'fleet').reduce((sum,item)=>sum+(item.dailyCost||0)*shopOwnedQuantity(item.id),0);
  }
  function ownedFleetMaintenance() {
    return (state.fleetAssets || []).filter(asset => asset.ownership === 'owned').reduce((sum,asset)=>sum+(asset.maintenance||0),0);
  }
  function shopDailyIncome() {
    return shopCatalog.reduce((sum,item)=>sum+(item.dailyIncome||0)*shopOwnedQuantity(item.id),0);
  }
  function shopBookValue() {
    return Object.values(state.shopAssets || {}).reduce((sum,record)=>sum+(record.totalSpent||0)*.82,0);
  }
  function shopBuilderBonus() {
    return shopCatalog.reduce((sum,item)=>sum+(item.builderBonus||0)*shopOwnedQuantity(item.id),0);
  }
  function activeShopOrders() { return (state.shopOrders || []).length; }
  function activeProjectCount() { return activeConstructionCount() + activeShopOrders(); }
  function shopItemMatches(item, opp) {
    if (item.category === 'fleet') return false;
    if (item.matchHubs && !item.matchHubs.some(hub => [opp.origin,opp.destination,...(opp.via||[])].includes(hub))) return false;
    if (item.transportClass && item.transportClass !== transportClassForOpportunity(opp)) return false;
    if (item.commodity && item.commodity !== opp.commodity) return false;
    return true;
  }
  function shopAdjustments(opp) {
    return shopCatalog.reduce((acc,item)=>{
      const quantity=shopOwnedQuantity(item.id);
      if (!quantity || !shopItemMatches(item,opp)) return acc;
      acc.pnlBonus += (item.pnlBonus||0)*quantity;
      acc.durationBonus += (item.durationBonus||0)*quantity;
      acc.acceptanceBonus += (item.acceptanceBonus||0)*quantity;
      acc.equityFactor *= Math.max(.75,1-(item.equityReduction||0)*quantity);
      acc.sources.push(`${item.name} ×${quantity}`);
      return acc;
    },{pnlBonus:0,durationBonus:0,acceptanceBonus:0,equityFactor:1,sources:[]});
  }
  function storageDiscountForHub(hubId) {
    return clamp(shopCatalog.reduce((sum,item)=>{
      const quantity=shopOwnedQuantity(item.id);
      return sum + (quantity && item.storageDiscount && (!item.matchHubs || item.matchHubs.includes(hubId)) ? item.storageDiscount*quantity : 0);
    },0),0,.55);
  }
  function buyShopItem(id) {
    const item=shopDefinition(id); if(!item) return;
    const owned=shopOwnedQuantity(id), pending=shopPendingQuantity(id);
    if (!shopUnlocked(item)) {
      const requirement=item.requiresOffice&&!officeOwned(item.requiresOffice)?getOffice(item.requiresOffice)?.name:`reputation ${item.minReputation} and ${item.minDeals} deals`;
      return showToast(`Locked: requires ${requirement}.`);
    }
    if (owned+pending >= item.maxOwned) return showToast('Maximum quantity already owned or under construction.');
    if (activeProjectCount() >= builderSlots()) return showToast('All project teams are busy. Finish a project or buy another Capital Projects Office.');
    if (state.cash < item.cost) return showToast('Insufficient liquidity for this purchase.');
    state.cash -= item.cost;
    state.shopSpent = (state.shopSpent||0) + item.cost;
    state.shopOrders = state.shopOrders || [];
    state.shopOrders.push({ id:`shop-order-${state.sequence++}`, itemId:id, daysRemaining:item.buildDays, totalDays:item.buildDays, orderedAt:state.date, cost:item.cost });
    recordJournal('Capital project', `${item.name} ordered`, `${item.buildDays}-day construction program started.`, -item.cost, id);
    activeLeftTab='shop'; saveState(); renderAll();
    try { Sound.play('purchase'); } catch (e) {}
    addXp(30, 'shop');
    showToast(`${item.name} ordered. Delivery in ${item.buildDays} days.`);
  }
  function completeShopOrder(order) {
    const item=shopDefinition(order.itemId); if(!item) return;
    const record=shopAssetRecord(item.id);
    state.shopAssets[item.id]={ quantity:(record.quantity||0)+1, totalSpent:(record.totalSpent||0)+order.cost };
    state.shopDeliveries=(state.shopDeliveries||0)+1;
    if (item.category === 'fleet') {
      const vessel=getVesselCatalog(item.vesselCatalogId);
      if (vessel) state.fleetAssets.push({
        id:`owned-vessel-${item.vesselCatalogId}-${state.sequence++}`, catalogId:item.vesselCatalogId, name:vessel.name,
        status:'available', assignedDealId:null, positionHub:vessel.homeHub, ownership:'owned', maintenance:item.maintenance||0,
        purchaseCost:item.cost, acquired:state.date, daysRemaining:null, charterDays:null, charterCost:0
      });
    }
    state.reputation=clamp(state.reputation+1,0,100);
    state.worldEventFeed.unshift({type:'investment',title:`${item.name} delivered`,date:state.date,description:`The new ${item.category} asset is operational and its permanent benefits are active.`});
    recordJournal('Capital project', `${item.name} commissioned`, 'Construction completed and asset entered service.', 0, item.id);
    evaluateMissions();
  }
  function processShopDay() {
    const income=shopDailyIncome();
    if (income>0) { state.cash += income; state.assetIncome=(state.assetIncome||0)+income; }
    (state.shopOrders||[]).forEach(order=>{ order.daysRemaining=Math.max(0,order.daysRemaining-1); });
    const completed=(state.shopOrders||[]).filter(order=>order.daysRemaining<=0);
    completed.forEach(completeShopOrder);
    if (completed.length) state.shopOrders=(state.shopOrders||[]).filter(order=>order.daysRemaining>0);
  }

  function investmentDefinition(id) { return investmentCatalog.find(asset => asset.id === id); }
  function investmentRecord(id) {
    state.investments = state.investments || {};
    return state.investments[id] || { level:0, buildingTo:null, daysRemaining:0, totalSpent:0 };
  }
  function investmentLevel(id) { return investmentRecord(id).level || 0; }
  function totalInvestmentLevels() { return investmentCatalog.reduce((sum,asset)=>sum+investmentLevel(asset.id),0); }
  function activeConstructionCount() { return Object.values(state.investments || {}).filter(record => record.buildingTo && record.daysRemaining > 0).length; }
  function builderSlots() { return 1 + (officeOwned('rotterdam') ? 1 : 0) + (officeOwned('singapore') ? 1 : 0) + shopBuilderBonus() + (state.bonusBuilders || 0); }
  function builderGoldCost() { return 8 + (state.bonusBuilders || 0) * 6; }
  function buyExtraBuilder() {
    const cost = builderGoldCost();
    if ((state.goldBars || 0) < cost) { showToast(`Servono ${cost} lingotti d'oro per una nuova squadra.`, 'error'); return; }
    if ((state.bonusBuilders || 0) >= 4) { showToast('Numero massimo di squadre extra raggiunto.', 'warning'); return; }
    state.goldBars -= cost;
    state.bonusBuilders = (state.bonusBuilders || 0) + 1;
    try { Sound.play('purchase'); } catch (e) {}
    addXp(25, 'builder');
    saveState(true);
    renderAll();
    showToast(`Nuova squadra di progetto assunta! Ora hai ${builderSlots()} builder.`, 'success');
  }
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
      acc.pnlBonus += (asset.pnlBonus||0)*level*(activeDoctrine().assetMultiplier || 1);
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
    if (record.buildingTo) return showToast('This asset is already under construction.');
    if (record.level >= asset.maxLevel) return showToast('Asset already at maximum level.');
    if (!investmentUnlocked(asset)) return showToast(`You need reputation ${asset.minReputation} and ${asset.minDeals} completed deals.`);
    if (activeProjectCount() >= builderSlots()) return showToast('All project teams are busy. Wait for a project to complete or expand the Projects Office.');
    const target=record.level+1, cost=investmentCost(asset,target), days=investmentBuildDays(asset,target);
    if (state.cash < cost) return showToast('Insufficient liquidity for this investment.');
    state.cash -= cost;
    state.investments[id]={...record,buildingTo:target,daysRemaining:days,totalSpent:(record.totalSpent||0)+cost};
    state.constructionQueue=state.constructionQueue||[];
    if (!state.constructionQueue.includes(id)) state.constructionQueue.push(id);
    activeLeftTab='empire'; selected={type:'investment',id}; focusOnHub(asset.hub); saveState(); renderAll();
    try { Sound.play('purchase'); } catch (e) {}
    addXp(30, 'empire');
    showToast(`${asset.name}: level ${target} construction started (${days} days).`);
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
        state.worldEventFeed.unshift({type:'investment',title:`${asset.name} upgraded`,date:state.date,description:`Asset operational at level ${record.level}. New industrial benefits are active.`});
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
  function partiesForOpportunity(opp) { return opportunityParties[opp.id] || opp?.counterparties || {}; }

  function counterpartyBaseCreditLimit(id) {
    const party = getCounterparty(id);
    if (!party) return 0;
    const relationship = getCounterpartyState(id).relationship || 50;
    const score = party.credit || 70;
    const ratingFactor = /^(AA|A)/.test(party.creditRating || '') ? 1.12 : /^BBB/.test(party.creditRating || '') ? 1 : .82;
    return Math.round((750_000 + score * 65_000) * (.72 + relationship / 180) * ratingFactor);
  }

  function counterpartyCreditLimit(id) {
    return Math.max(250_000, counterpartyBaseCreditLimit(id) + (state.counterpartyLimitOverrides?.[id] || 0));
  }

  function dealCreditExposure(deal) {
    if (!deal?.buyerId) return 0;
    const opp = getOpportunity(deal.opportunityId);
    if (!opp) return 0;
    const notional = deal.invoiceAmount || physicalNotional(opp, deal.quantity || opp.quantity, deal.capital);
    const payment = deal.commercialTerms?.payment || 'delivery';
    if (deal.delivered && (deal.paymentDaysRemaining || 0) > 0) return notional;
    if (payment === 'thirty') return notional * .72;
    if (payment === 'delivery') return notional * .14;
    return notional * .05;
  }

  function counterpartyExposure(id) {
    return state.activeDeals.reduce((sum, deal) => deal.buyerId === id ? sum + dealCreditExposure(deal) : sum, 0);
  }

  function counterpartyCreditHeadroom(id) {
    return Math.max(0, counterpartyCreditLimit(id) - counterpartyExposure(id));
  }

  function prospectiveCreditExposure(opp, economics = opportunityEconomics(opp)) {
    const payment = economics.terms?.payment || 'delivery';
    const notional = physicalNotional(opp, economics.quantity, economics.capital) + Math.max(0, economics.basePnl || 0);
    if (payment === 'thirty') return notional;
    if (payment === 'delivery') return notional * .14;
    return notional * .05;
  }

  function requestCreditLimit(counterpartyId) {
    const party = getCounterparty(counterpartyId);
    if (!party || state.creditLimitRequests?.[counterpartyId]?.daysRemaining > 0) return;
    const base = counterpartyBaseCreditLimit(counterpartyId);
    const increment = Math.max(500_000, Math.round(base * .25));
    const cost = Math.max(7_500, Math.round(increment * .004));
    if (state.cash < cost) return showToast('Insufficient cash for the credit committee review.');
    state.cash -= cost;
    state.creditLimitRequests[counterpartyId] = { counterpartyId, daysRemaining: 5, increment, cost, requestedAt: state.date, status: 'pending' };
    recordJournal('Credit', `${party.name}: limit increase requested`, `Requested ${money(increment)} additional buyer limit · committee fee ${money(cost)}`, -cost, counterpartyId);
    saveState(); renderAll(); showToast(`Credit committee review started for ${party.name}.`);
  }

  function processCreditLimitRequests() {
    Object.entries(state.creditLimitRequests || {}).forEach(([id, request]) => {
      if (!request || request.status !== 'pending') return;
      request.daysRemaining = Math.max(0, (request.daysRemaining || 0) - 1);
      if (request.daysRemaining > 0) return;
      const party = getCounterparty(id);
      const relationship = getCounterpartyState(id).relationship || 50;
      const approval = clamp((party?.credit || 65) * .58 + relationship * .34 - (state.difficulty === 'expert' ? 8 : 0), 20, 96);
      const roll = deterministicRandom(`${id}-credit-committee-${state.dayIndex}`) * 100;
      if (roll <= approval) {
        request.status = 'approved';
        state.counterpartyLimitOverrides[id] = (state.counterpartyLimitOverrides[id] || 0) + request.increment;
        state.worldEventFeed.unshift({ type:'credit', title:`Credit limit approved · ${party?.name || id}`, date:state.date, description:`The committee approved ${money(request.increment)} of additional buyer exposure.` });
        recordJournal('Credit', `${party?.name || id}: limit approved`, `Additional buyer limit ${money(request.increment)}`, 0, id);
      } else {
        request.status = 'declined';
        state.worldEventFeed.unshift({ type:'credit', title:`Credit limit declined · ${party?.name || id}`, date:state.date, description:'The committee declined the request. Improve payment security or reduce transaction size.' });
        recordJournal('Credit', `${party?.name || id}: limit declined`, `Committee approval probability was ${Math.round(approval)}%`, 0, id);
      }
      state.worldEventFeed = state.worldEventFeed.slice(0,18);
    });
  }

  function paymentDaysForDeal(deal) {
    return deal.commercialTerms?.payment === 'thirty' ? 30 : 0;
  }

  function activeEventDefinition(active) { return globalEventCatalog.find(event => event.id === active.id); }
  function activeCrisisDefinitions() { return (state.activeGlobalEvents || []).map(active => ({ ...activeEventDefinition(active), ...active })).filter(Boolean); }
  function effectiveCreditLimit() {
    const penalty = activeCrisisDefinitions().reduce((sum, event) => sum + (event.creditPenalty || 0), 0);
    return Math.max(1_000_000, (state.creditLimit - penalty) * activeDoctrine().creditFactor);
  }
  function difficultySettings() {
    if (state.difficulty === 'guided') return { acceptance: 7, marginRate: .04, eventLoss: .82, emergencyRate: .009, riskPenalty: -6 };
    if (state.difficulty === 'expert') return { acceptance: -6, marginRate: .075, eventLoss: 1.22, emergencyRate: .025, riskPenalty: 8 };
    return { acceptance: 0, marginRate: .055, eventLoss: 1, emergencyRate: .016, riskPenalty: 0 };
  }
  function activeDoctrine() { return strategyDoctrineCatalog[state.strategyDoctrine] || strategyDoctrineCatalog.merchant; }
  function activeCapitalPolicy() { return capitalPolicyCatalog[state.capitalPolicy] || capitalPolicyCatalog.balanced; }
  function minimumCashReserve() {
    const nav = Math.max(0, portfolioStats().nav);
    return Math.max(100_000, Math.round(nav * activeCapitalPolicy().reserveRatio));
  }
  function capitalPolicyHeadroom() { return state.cash - minimumCashReserve(); }
  function canChangeCapitalPolicy() { return (state.dayIndex || 0) - (Number.isFinite(state.capitalPolicyChangedDay) ? state.capitalPolicyChangedDay : -30) >= 14; }
  function changeCapitalPolicy(id) {
    const policy = capitalPolicyCatalog[id];
    if (!policy || id === state.capitalPolicy) return;
    if (!canChangeCapitalPolicy()) return showToast(`Capital mandate can be changed again in ${14 - ((state.dayIndex||0) - (Number.isFinite(state.capitalPolicyChangedDay) ? state.capitalPolicyChangedDay : -30))} days.`);
    state.capitalPolicy = id;
    state.capitalPolicyChangedDay = state.dayIndex || 0;
    state.worldEventFeed.unshift({ type:'capital', title:`Capital policy: ${policy.label}`, date:state.date, description:`The board reset the minimum liquidity reserve to ${Math.round(policy.reserveRatio*100)}% of NAV.` });
    state.worldEventFeed = state.worldEventFeed.slice(0,18);
    recordJournal('Board', `Capital policy changed`, `${policy.label} · minimum reserve ${Math.round(policy.reserveRatio*100)}% of NAV`, 0, id);
    saveState(); renderAll(); showToast(`${policy.label} is now active.`);
  }
  function canChangeDoctrine() { return (state.dayIndex || 0) - (state.strategyChangedDay ?? -30) >= 14; }
  function changeDoctrine(id) {
    const doctrine = strategyDoctrineCatalog[id];
    if (!doctrine || id === state.strategyDoctrine) return;
    if (!canChangeDoctrine()) return showToast(`Board policy can be changed again in ${14 - ((state.dayIndex||0)-(state.strategyChangedDay??-30))} days.`);
    const transitionCost = 18_000 + state.activeDeals.length * 4_000;
    if (state.cash < transitionCost) return showToast('Insufficient liquidity for the strategy transition.');
    state.cash -= transitionCost;
    state.strategyDoctrine = id;
    state.strategyChangedDay = state.dayIndex || 0;
    state.worldEventFeed.unshift({ type:'strategy', title:`Doctrine changed: ${doctrine.label}`, date:state.date, description:`The board approved a new operating model. Transition cost ${money(transitionCost)}.` });
    saveState(); renderAll(); showToast(`${doctrine.label} is now active.`);
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

  function currentMarketRegime() {
    return marketRegimeCatalog[state.marketRegime] || marketRegimeCatalog.balanced;
  }

  function generateMarketRegime(cycle = state.marketCycle || 1) {
    const ids = Object.keys(marketRegimeCatalog);
    const month = currentDate().getUTCMonth();
    const seasonalTilt = month >= 9 || month <= 1 ? 1 : 0;
    const index = Math.floor(deterministicRandom(`regime-${cycle}-${month}-${seasonalTilt}`) * ids.length);
    return ids[index] || 'balanced';
  }

  function eligibleRivals(opp) {
    const matches = aiRivalDesks.filter(rival => rival.specialties.includes(opp.commodity));
    return matches.length ? matches : aiRivalDesks;
  }

  function initializeCompetitiveMarket(force = false) {
    state.rivalMarket = state.rivalMarket || {};
    opportunities.forEach(opp => {
      const existing = state.rivalMarket[opp.id];
      if (!force && existing?.cycle === state.marketCycle) return;
      const candidates = eligibleRivals(opp);
      const leader = candidates[Math.floor(deterministicRandom(`${opp.id}-${state.marketCycle}-rival`) * candidates.length)] || candidates[0];
      const base = 28 + deterministicRandom(`${opp.id}-${state.marketCycle}-pressure`) * 58;
      const valueBoost = clamp(opp.basePnl / 2500, 0, 18);
      const pressure = Math.round(clamp(base + valueBoost + (opp.riskClass === 'low' ? 5 : 0), 18, 96));
      const awardDay = 2 + Math.floor(deterministicRandom(`${opp.id}-${state.marketCycle}-award`) * 4);
      state.rivalMarket[opp.id] = { cycle: state.marketCycle, pressure, leaderId: leader.id, awardDay, status:'open', awardedTo:null };
    });
  }

  function rivalTenderFor(oppId) {
    initializeCompetitiveMarket();
    return state.rivalMarket?.[oppId] || null;
  }

  function rivalForTender(tender) {
    return aiRivalDesks.find(rival => rival.id === tender?.leaderId) || aiRivalDesks[0];
  }

  function competitionPenalty(opp) {
    const tender = rivalTenderFor(opp.id);
    if (!tender || tender.status === 'player_reserved') return 0;
    return Math.max(0, (tender.pressure - 35) * .18);
  }

  function advanceRivalMarketDay() {
    initializeCompetitiveMarket();
    opportunities.forEach(opp => {
      const tender = rivalTenderFor(opp.id);
      if (!tender || tender.cycle !== state.marketCycle || tender.status !== 'open') return;
      const negotiation = state.negotiations?.[opp.id];
      if (negotiation?.status === 'accepted' || negotiation?.status === 'consumed') {
        tender.status = 'player_reserved';
        tender.awardedTo = 'player';
        return;
      }
      if (state.marketCycleDay < tender.awardDay) return;
      const closeRoll = deterministicRandom(`${opp.id}-${state.marketCycle}-${state.marketCycleDay}-close`) * 100;
      if (closeRoll > tender.pressure && state.marketCycleDay < 6) {
        tender.awardDay += 1;
        tender.pressure = clamp(tender.pressure + 4, 0, 99);
        return;
      }
      const rival = rivalForTender(tender);
      tender.status = 'awarded';
      tender.awardedTo = rival.id;
      state.tenderLosses = (state.tenderLosses || 0) + 1;
      state.rivalFeed.unshift({ date:state.date, cycle:state.marketCycle, opportunityId:opp.id, rivalId:rival.id, title:`${rival.name} wins ${opp.title}`, description:`${opp.commodity} tender awarded after ${tender.pressure}% competitive pressure.` });
      state.rivalFeed = state.rivalFeed.slice(0,18);
    });
  }

  function evaluateAchievements(notify = true) {
    state.achievements = state.achievements || [];
    const unlocked = [];
    achievementCatalog.forEach(item => {
      if (state.achievements.includes(item.id) || !item.achieved(state)) return;
      state.achievements.push(item.id);
      unlocked.push(item.title);
    });
    if (notify && unlocked.length) { setTimeout(() => showToast(`Achievement unlocked: ${unlocked.join(', ')}.`), 120); try { Sound.play('achievement'); } catch (e) {} addXp(35 * unlocked.length, 'achievement'); addGold(3 * unlocked.length, 'achievement'); }
  }

  function currentSeason() {
    const month = currentDate().getUTCMonth();
    if ([11,0,1].includes(month)) return { id:'winter', label:'Northern winter', icon:'❄' };
    if ([2,3,4].includes(month)) return { id:'spring', label:'Northern spring', icon:'✦' };
    if ([5,6,7].includes(month)) return { id:'summer', label:'Northern summer', icon:'☀' };
    return { id:'autumn', label:'Northern autumn', icon:'◒' };
  }
  function seasonalDemand(opp) {
    const month = currentDate().getUTCMonth();
    const key = opp.priceKey || 'copper';
    const cycles = {
      copper:[1.08,1.07,1.05,1.02,.98,.94,.91,.93,1.02,1.10,1.12,1.10],
      aluminium:[1.06,1.05,1.04,1.01,.98,.95,.93,.95,1.03,1.09,1.10,1.08],
      urea:[1.04,1.13,1.18,1.12,.96,.88,.86,.93,1.14,1.16,1.05,.98],
      crude:[1.08,1.05,.99,.96,1.02,1.10,1.14,1.12,1.01,.96,1.02,1.09],
      wheat:[.96,.98,1.02,1.08,1.12,1.06,.91,.88,.94,1.04,1.08,1.01],
      ironore:[1.12,1.10,1.07,1.03,.98,.94,.91,.93,1.01,1.07,1.11,1.13],
      coffee:[1.03,1.04,1.06,1.08,1.10,.94,.88,.90,1.01,1.09,1.11,1.07]
    };
    const factor = (cycles[key] || cycles.copper)[month];
    const label = factor >= 1.10 ? 'Peak demand' : factor >= 1.04 ? 'Firm demand' : factor <= .92 ? 'Seasonal low' : factor <= .97 ? 'Soft demand' : 'Normal demand';
    return { factor, label, acceptance: Math.round((factor-1)*28), pnlFactor: .84 + factor*.16, quantityFactor: .9 + factor*.1 };
  }
  function liveOffer(opp) {
    const cycle = state.marketCycle || 1;
    const qRand = deterministicRandom(`${opp.id}-${cycle}-quantity`);
    const pnlRand = deterministicRandom(`${opp.id}-${cycle}-pnl`);
    const capitalRand = deterministicRandom(`${opp.id}-${cycle}-capital`);
    const durationRand = deterministicRandom(`${opp.id}-${cycle}-duration`);
    const season = seasonalDemand(opp);
    const quantity = Math.max(100, Math.round((opp.quantity * (.88 + qRand * .26) * season.quantityFactor) / 25) * 25);
    const quantityFactor = quantity / opp.quantity;
    return {
      quantity,
      basePnl: Math.round(opp.basePnl * (.82 + pnlRand * .38) * quantityFactor * season.pnlFactor),
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
    const draft = { cycle: state.marketCycle, status: 'draft', commercial: 'market', payment: 'delivery', pricing: 'fixed', delivery: 'standard', attempts: 0 };
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
    const pricing = negotiationProfiles.pricing[negotiation.pricing || 'fixed'];
    const delivery = negotiationProfiles.delivery[negotiation.delivery];
    const financing = financingProfiles[financingSelection(opp)] || financingProfiles.revolver;
    const vertical = investmentAdjustments(opp);
    const shop = shopAdjustments(opp);
    const regime = currentMarketRegime();
    const season = seasonalDemand(opp);
    const doctrine = activeDoctrine();
    const capitalPolicy = activeCapitalPolicy();
    const procurement = procurementAgreementAdjustments(opp);
    const route = routeConditionFor(opp);
    // Credit rating modifier: A=+3, BBB=0, BB=-4, B=-9
    const _ratingMod = { 'A': 3, 'BBB': 0, 'BB': -4, 'B': -9 };
    const _creditMod = _ratingMod[buyer?.creditRating] ?? 0;
    return clamp(54 + state.reputation * .18 + (relationship - 50) * .45 + (buyer?.credit || 70) * .08 + commercial.acceptance + payment.acceptance + pricing.acceptance + delivery.acceptance + (financing.acceptance || 0) + vertical.acceptanceBonus + shop.acceptanceBonus + difficultySettings().acceptance + regime.acceptance + season.acceptance + doctrine.acceptance + procurement.acceptance - route.acceptancePenalty - competitionPenalty(opp) + _creditMod, 5, 97);
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
    const pricing = negotiationProfiles.pricing[negotiation.pricing || 'fixed'] || negotiationProfiles.pricing.fixed;
    const delivery = negotiationProfiles.delivery[negotiation.delivery] || negotiationProfiles.delivery.standard;
    const office = opportunityOfficeAdjustments(opp);
    const crisis = crisisAdjustments(opp);
    const vertical = investmentAdjustments(opp);
    const shop = shopAdjustments(opp);
    const structure = structureForOpportunity(opp);
    const regime = currentMarketRegime();
    const doctrine = activeDoctrine();
    const capitalPolicy = activeCapitalPolicy();
    const procurement = procurementAgreementAdjustments(opp);
    const route = routeConditionFor(opp);
    const tender = rivalTenderFor(opp.id);
    const competitionCost = Math.round(Math.max(0, (tender?.pressure || 0) - 45) * 240 * procurement.competitionFactor);
    const financeStaffFactor = hasStaff('trade-finance-manager') ? .9 : 1;
    const equity = Math.min(offer.capital, Math.round(offer.equity * payment.equityFactor * financeStaffFactor * crisis.equityFactor * structure.financing.equityFactor * vertical.equityFactor * shop.equityFactor * regime.equityFactor * doctrine.equityFactor * procurement.equityFactor * capitalPolicy.equityFactor));
    const borrowed = Math.max(0, offer.capital - equity);
    const _carrierStrat = selectedCarrierStrategies[opp.id] || 'spot';
    const _vc = _carrierStrat === 'spot' ? vesselClassFor(opp.id) : vesselClasses.supramax;
    const vesselPnlBonus = Math.round(offer.basePnl * (_vc.pnlMod || 0));
    const basePnl = Math.round(offer.basePnl * regime.pnlFactor * doctrine.pnlFactor * capitalPolicy.pnlFactor) + commercial.pnl + pricing.pnl + delivery.pnl + office.pnlBonus + crisis.pnl + structure.financing.pnl + structure.insurance.pnl + structure.inspection.pnl + vertical.pnlBonus + shop.pnlBonus + procurement.pnlBonus - competitionCost - route.freightCost + vesselPnlBonus;
    const financingRate = structure.financing.rate * capitalPolicy.financingRateFactor;
    const estimatedInterest = borrowed * financingRate * Math.max(10, offer.duration + delivery.duration - office.durationBonus - vertical.durationBonus - shop.durationBonus + crisis.duration + regime.duration) / 360;
    const expectedPnl = basePnl - estimatedInterest;
    return {
      ...offer,
      quantity: offer.quantity,
      capital: offer.capital,
      equity,
      borrowed,
      basePnl,
      estimatedInterest,
      financingRate,
      expectedPnl,
      duration: Math.max(10, offer.duration + delivery.duration - office.durationBonus - vertical.durationBonus - shop.durationBonus + crisis.duration + regime.duration + route.delayDays - procurement.durationBonus + (_vc.durationMod || 0)),
      acceptance: negotiationAcceptance(opp, negotiation),
      crisisLabels: crisis.labels,
      marketRegime: regime,
      tenderPressure: tender?.pressure || 0,
      tenderLeader: rivalForTender(tender),
      competitionCost,
      routeCondition: route,
      procurementAgreement: procurement.agreement,
      procurementBonus: procurement.pnlBonus,
      procurementSavings: procurement.pnlBonus + Math.round(route.freightCost * .15),
      verticalSources: vertical.sources,
      shopSources: shop.sources,
      structure,
      initialMargin: initialMarginFor(opp, Number(selectedHedgeRatios[opp.id] ?? opp.recommendedHedge ?? 100), offer.quantity, offer.capital),
      pricingProfile: pricing,
      terms: { commercial: negotiation.commercial, payment: negotiation.payment, pricing: negotiation.pricing || 'fixed', delivery: negotiation.delivery }
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
    if (!officeUnlocked(office)) return showToast(`You need reputation ${office.minReputation} and ${office.minDeals} completed deals.`);
    if (state.cash < office.cost) return showToast('Insufficient liquidity to open this desk.');
    state.cash -= office.cost;
    state.offices.push(id);
    state.reputation = clamp(state.reputation + 1, 0, 100);
    evaluateMissions();
    saveState(); renderAll(); focusOnHub(office.hub);
    showToast(`${office.name} opened. New opportunities are available.`);
  }
  function hireStaff(id) {
    const member = getStaff(id);
    if (!member || hasStaff(id)) return;
    if (!staffUnlocked(member)) return showToast(`You need reputation ${member.minReputation} to hire this specialist.`);
    if (state.cash < member.hireCost) return showToast('Insufficient liquidity to hire this specialist.');
    state.cash -= member.hireCost;
    state.staff.push(id);
    if (id === 'trade-finance-manager') state.creditLimit += 1_000_000;
    state.reputation = clamp(state.reputation + 1, 0, 100);
    evaluateMissions();
    saveState(); renderAll();
    showToast(`${member.role} joined the WoT team.`);
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
    if (unlocked.length) { setTimeout(() => showToast(`Mission completed: ${unlocked.join(', ')}.`), 80); try { Sound.play('achievement'); } catch (e) {} addXp(50 * unlocked.length, 'mission'); }
  }

  function saveState(force = false) {
    if (state.autosave === false && !force) {
      markSaveStatus('Autosave off');
      return;
    }
    try {
      markSaveStatus('Saving…', true);
      state.lastSavedAt = new Date().toISOString();
      const serialized = JSON.stringify(state);
      const key = currentStorageKey();
      const previous = localStorage.getItem(key);
      if (previous && previous !== serialized) localStorage.setItem(`${key}-backup`, previous);
      localStorage.setItem(key, serialized);
      markSaveStatus('Saved');
    } catch {
      markSaveStatus('Save failed');
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
    deal.delivered = Boolean(deal.delivered);
    deal.paymentDaysRemaining = Number.isFinite(deal.paymentDaysRemaining) ? deal.paymentDaysRemaining : null;
    deal.collectionDelayDays = Number.isFinite(deal.collectionDelayDays) ? deal.collectionDelayDays : 0;
    deal.overdueRecorded = Boolean(deal.overdueRecorded);
    deal.invoiceStatus = deal.invoiceStatus || (deal.delivered ? 'Outstanding' : 'Not issued');
    deal.contractLifecycle = deal.contractLifecycle || { nominated: true, loaded: (deal.elapsed || 0) > Math.max(2, (deal.duration || 20) * .18), delivered: Boolean(deal.delivered), invoiced: Boolean(deal.delivered), paid: false };
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
    if (deal.delivered) {
      ops.transport.status = 'Delivered';
      ops.storage.active = false;
      ops.purchaseContract.status = 'Completed';
      ops.salesContract.status = deal.invoiceStatus === 'Paid' ? 'Settled' : 'Invoiced';
      ops.documents.forEach(doc => { if (doc.status !== 'blocked') doc.status = 'ready'; });
      return deal;
    }
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
    const purchaseComplete = ['Signed', 'Completed'].includes(deal.operations.purchaseContract.status);
    const salesComplete = ['Signed', 'Invoiced', 'Settled'].includes(deal.operations.salesContract.status);
    const contractScore = purchaseComplete && salesComplete ? 1 : .5;
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
    showToast(`Documents expedited. Operating cost ${money(cost)}.`);
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
    showToast(`Priority transport confirmed. ETA reduced by 4 days.`);
  }

  function bookEmergencyStorage(dealId) {
    const deal = getActiveDeal(dealId);
    if (!deal || deal.operations?.storage?.emergency) return;
    const discount=storageDiscountForHub(deal.operations?.storage?.hubId);
    const cost = Math.round(8_000*(1-discount));
    deal.pnlAdjustments -= cost;
    deal.operations.storage.emergency = true;
    deal.operations.storage.reserved = true;
    deal.operations.storage.days += 5;
    saveState();
    renderAll();
    showToast(`Emergency storage booked for ${money(cost)}.`);
  }


  function charterVessel(catalogId) {
    const vessel = getVesselCatalog(catalogId);
    if (!vessel || !vesselUnlocked(vessel)) return showToast('This asset is not yet available to your desk.');
    if (state.fleetAssets.some(asset => asset.catalogId === catalogId)) return showToast('You already have this asset on charter.');
    const hireCost = charterHireCost(vessel);
    if (state.cash < hireCost) return showToast('Insufficient liquidity for the charter.');
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
    showToast(`${vessel.name} noleggiata per ${vessel.charterDays} days.`);
  }

  function releaseVessel(assetId) {
    const asset = getFleetAsset(assetId);
    if (!asset || asset.status === 'assigned') return showToast('You cannot release a vessel while it is assigned to a deal.');
    if (asset.ownership === 'owned') {
      const refund = Math.round((asset.purchaseCost || 0) * .45);
      state.cash += refund;
      state.fleetAssets = state.fleetAssets.filter(v => v.id !== assetId);
      const shopItem=shopCatalog.find(item=>item.vesselCatalogId===asset.catalogId && item.category==='fleet');
      if (shopItem) { const record=shopAssetRecord(shopItem.id); state.shopAssets[shopItem.id]={...record,quantity:Math.max(0,(record.quantity||0)-1),totalSpent:Math.max(0,(record.totalSpent||0)-(asset.purchaseCost||0))}; }
      selected={type:'hub',id:'geneva'}; saveState(); renderAll();
      return showToast(`Vessel sold. ${money(refund)} recovered.`);
    }
    const refund = Math.round(asset.charterCost * (asset.daysRemaining / asset.charterDays) * .2);
    state.cash += refund;
    state.fleetAssets = state.fleetAssets.filter(v => v.id !== assetId);
    selected = { type: 'hub', id: 'geneva' };
    saveState();
    renderAll();
    showToast(`Charter terminated. ${money(refund)} recovered.`);
  }

  function advanceFleetDay() {
    const expired = [];
    state.fleetAssets.forEach(asset => {
      if (asset.ownership === 'owned') return;
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
    if (deal.delivered) return;
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
    state.marketRegime = generateMarketRegime(state.marketCycle);
    opportunities.forEach(opp => { selectedNegotiationDrafts[opp.id] = null; });
    initializeCompetitiveMarket(true);
    refreshRouteConditions();
    state.worldEventFeed.unshift({
      type: 'market', title: 'Opportunity book refreshed', date: state.date,
      description: `New quantities, margins and delivery windows are available under a ${currentMarketRegime().label.toLowerCase()} regime.`
    });
    state.worldEventFeed = state.worldEventFeed.slice(0, 14);
    showToast('The opportunity market has been refreshed.');
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
    refreshRouteConditions();
    state.activeDeals.forEach(deal => {
      const opp = getOpportunity(deal.opportunityId);
      if (!definition.affects?.(opp)) return;
      deal.globalEventImpacts = deal.globalEventImpacts || [];
      if (deal.globalEventImpacts.includes(definition.id)) return;
      deal.globalEventImpacts.push(definition.id);
      deal.duration += definition.dealDays || 0;
      deal.pnlAdjustments += definition.dealPnl || 0;
      deal.eventResult = `${definition.title}: impact incorporated into route timing and P&L.`;
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
        state.worldEventFeed.unshift({ type: 'resolved', id, title: `${definition?.title || id} resolved`, date: state.date, description: 'Operating conditions are gradually returning to normal.' });
      });
      state.activeGlobalEvents = state.activeGlobalEvents.filter(event => !expired.includes(event.id));
      refreshRouteConditions();
    }
    if (state.marketCycleDay >= 7) refreshOpportunityMarket();
    else advanceRivalMarketDay();
    // Rival deal activity — inject a competitor deal closing every 4-6 days
    if ((state.dayIndex||0) > 0 && (state.dayIndex||0) % 5 === 0) {
      const rivalList = [
        {name:'Helios Commodities',city:'Zurich',trades:[['copper','Tallinn','Brescia'],['aluminium','Rotterdam','Brescia'],['diesel','Houston','Rotterdam']]},
        {name:'NorthSea Trading',city:'Rotterdam',trades:[['aluminium','Rotterdam','Brescia'],['iron ore','Port Hedland','Shanghai'],['diesel','Houston','Rotterdam']]},
        {name:'Pacific Bulk Partners',city:'Singapore',trades:[['iron ore','Port Hedland','Shanghai'],['wheat','Rosario','Genoa'],['coffee','Santos','Genoa']]},
        {name:'Atlas Merchant Group',city:'London',trades:[['copper','Santiago','Brescia'],['urea','Casablanca','Genoa'],['wheat','Rosario','Genoa']]},
        {name:'Stratus Energy',city:'Houston',trades:[['diesel','Houston','Rotterdam'],['LNG','Doha','Rotterdam'],['crude','Houston','Rotterdam']]},
        {name:'Orion Agri Trade',city:'Geneva',trades:[['coffee','Santos','Brescia'],['wheat','Rosario','Genoa'],['palm oil','Port Klang','Genoa']]},
        {name:'Rhine Metals Desk',city:'Geneva',trades:[['copper','Tallinn','Brescia'],['aluminium','Rotterdam','Brescia'],['copper','Dubai','Singapore']]}
      ];
      const seed2 = deterministicRandom(state.date + '-rival-pick');
      const rival = rivalList[Math.floor(seed2 * rivalList.length)];
      const tradeSeed = deterministicRandom(state.date + '-rival-trade');
      const trade = rival.trades[Math.floor(tradeSeed * rival.trades.length)];
      const marginSeed = deterministicRandom(state.date + '-rival-margin');
      const marginPct = (2.8 + marginSeed * 4.2).toFixed(1);
      state.worldEventFeed.unshift({
        type: 'market',
        title: `${rival.name} closes ${trade[0]} cargo`,
        date: state.date,
        description: `${rival.city}-based desk settled a ${trade[0]} shipment from ${trade[1]} to ${trade[2]} with a ${marginPct}% margin. Competitive pressure in this corridor remains active.`
      });
      state.worldEventFeed = state.worldEventFeed.slice(0, 18);
    }

    if (state.dayIndex >= (state.nextGlobalEventDay || 6)) {
      triggerGlobalEvent();
      state.nextGlobalEventDay = state.dayIndex + 8 + Math.floor(deterministicRandom(`${state.date}-next-world`) * 6);
    }
    // Counterparty relationship decay every 21 days without active deal
    if ((state.dayIndex || 0) % 21 === 0 && state.dayIndex > 0) {
      const activeCpIds = new Set();
      state.activeDeals.forEach(deal => {
        const opp = getOpportunity(deal.opportunityId);
        if (!opp) return;
        const parties = partiesForOpportunity(opp);
        if (parties.supplierId) activeCpIds.add(parties.supplierId);
        if (parties.buyerId) activeCpIds.add(parties.buyerId);
      });
      counterpartyCatalog.forEach(cp => {
        if (activeCpIds.has(cp.id)) return; // active deal — no decay
        const record = getCounterpartyState(cp.id);
        if ((record.relationship || 50) > 30) {
          record.relationship = (record.relationship || 50) - 1;
        }
      });
    }

    // ── Distressed cargo injection (every 7-11 days) ─────────────────────────
    if (!state.distressedCargoDay) state.distressedCargoDay = 7 + Math.floor(deterministicRandom(`${state.date}-dc-init`) * 5);
    if ((state.dayIndex || 0) >= state.distressedCargoDay) {
      state.distressedCargoDay = state.dayIndex + 7 + Math.floor(deterministicRandom(`${state.date}-dc-next`) * 5);
      const _dcPool = [
        { id:'dc-copper-scrap', origin:'antwerp',  destination:'shanghai', commodity:'Copper', priceKey:'copper', quantity:3000,  capital:2_800_000, basePnl:210_000, duration:18, risk:'High', riskClass:'high', transportMode:'Handymax bulk', title:'Distressed copper parcel · ARA', description:'Seller facing liquidity squeeze. Vessel approaching laytime limits. Steep discount to clear cargo before demurrage escalates.', event:{id:'inspection-failure',title:'Disputed quality certificate',text:'Pre-shipment inspection flagged a moisture deviation. Resolve before discharge or renegotiate price adjustment.',choices:[{id:'accept',label:'Accept & adjust price',hint:'-$40k but deal closes cleanly'},{id:'dispute',label:'Dispute and hold',hint:'Risk 3-day delay and $25k demurrage'}]}, recommendedHedge:90 },
        { id:'dc-wheat-cargo', origin:'new-orleans', destination:'cairo', commodity:'Wheat', priceKey:'wheat', quantity:25000, capital:5_200_000, basePnl:290_000, duration:14, risk:'Medium', riskClass:'medium', transportMode:'Panamax bulk',  title:'Distressed wheat cargo · Gulf',  description:'US exporter offloading surplus position. Buyer in Egypt cancelled LC. Cargo available at significant discount to replacement cost.', recommendedHedge:80 },
        { id:'dc-crude-vlcc',  origin:'houston',   destination:'singapore', commodity:'Crude Oil', priceKey:'crude', quantity:280000, capital:22_000_000, basePnl:480_000, duration:20, risk:'High', riskClass:'high', transportMode:'VLCC', title:'Distressed crude VLCC · Gulf',    description:'Trader unwinding long position. VLCC on demurrage at Galveston anchorage. Price reflects urgent disposal; cargo is clean WTI equivalent.', recommendedHedge:95 },
        { id:'dc-coffee-santos', origin:'santos',  destination:'antwerp', commodity:'Coffee', priceKey:'coffee', quantity:5000,  capital:19_000_000, basePnl:520_000, duration:16, risk:'Medium', riskClass:'medium', transportMode:'Container ship', title:'Distressed coffee lot · Brazil', description:'Brazilian trader caught long after local currency move. Grade 2 arabica, discount to ICE benchmark. Deal must close this market cycle.', recommendedHedge:75 },
        { id:'dc-ironore-cape', origin:'port-hedland', destination:'shanghai', commodity:'Iron ore', priceKey:'ironore', quantity:80000, capital:8_000_000, basePnl:350_000, duration:21, risk:'Medium', riskClass:'medium', transportMode:'Capesize bulk', title:'Distressed iron ore · Pilbara', description:'Mining co. needs to move spot cargo — port capacity allocation expires. 62% Fe fines at discount. Competitive bids expected.', recommendedHedge:85 },
      ];
      const dcSeed = deterministicRandom(`${state.date}-dc-pick`);
      const dc = _dcPool[Math.floor(dcSeed * _dcPool.length)];
      // Mark as distressed and short-lived
      state.distressedOpportunity = { ...dc, distressed: true, distressedExpiry: state.dayIndex + 4 };
      state.worldEventFeed.unshift({
        type: 'distressed',
        title: `Distressed cargo available — ${dc.commodity}`,
        date: state.date,
        description: `${dc.title}: ${dc.description} Window: ~4 days. Margin: ${money(dc.basePnl)} (discounted).`
      });
      state.worldEventFeed = state.worldEventFeed.slice(0, 18);
    }
    // Expire distressed opportunity
    if (state.distressedOpportunity && state.dayIndex > (state.distressedOpportunity.distressedExpiry || 0)) {
      state.worldEventFeed.unshift({ type: 'market', title: `Distressed ${state.distressedOpportunity.commodity} cargo window closed`, date: state.date, description: 'The distressed parcel was absorbed by another desk. Window expired.' });
      state.worldEventFeed = state.worldEventFeed.slice(0, 18);
      state.distressedOpportunity = null;
    }

    // ── Quarter-end evaluation (every 90 days) ─────────────────────────────
    if ((state.dayIndex || 0) > 0 && (state.dayIndex || 0) % 90 === 0) {
      const quarterPnl = state.realizedPnl - (state.quarterStartPnl || 0);
      const target     = state.quarterTarget || 500000;
      const hit        = quarterPnl >= target;
      const surplus    = quarterPnl - target;
      const bonus      = hit ? Math.round(Math.min(surplus * 0.12, target * 0.25)) : 0;
      const qNum       = state.quarterNumber || 1;
      const qLabel     = ['Q1','Q2','Q3','Q4'][(qNum - 1) % 4];
      const yearNum    = Math.ceil(qNum / 4);

      if (hit) {
        state.cash += bonus;
        state.quarterBonusPaid = (state.quarterBonusPaid || 0) + bonus;
        state.quarterMissed   = Math.max(0, (state.quarterMissed || 0) - 1);
        state.reputation      = clamp((state.reputation || 0) + 3, 0, 100);
        state.worldEventFeed.unshift({
          type: 'alert',
          title: `${qLabel} Year ${yearNum}: Target hit — bonus ${money(bonus)}`,
          date: state.date,
          description: `Management commends the desk. ${qLabel} P&L: ${money(quarterPnl)} vs target ${money(target)}. Performance bonus of ${money(bonus)} credited. Next quarter target raised.`
        });
        // Raise target by 15-25%
        const growthSeed = deterministicRandom(state.date + '-target-growth');
        state.quarterTarget = Math.round(target * (1.15 + growthSeed * 0.10));
      } else {
        state.quarterMissed  = (state.quarterMissed || 0) + 1;
        state.reputation     = clamp((state.reputation || 0) - 2, 0, 100);
        const shortfall      = money(target - quarterPnl);
        const pressure       = state.quarterMissed >= 2 ? 'Senior management is closely monitoring the desk.' : 'Management expects improved performance next quarter.';
        state.worldEventFeed.unshift({
          type: 'alert',
          title: `${qLabel} Year ${yearNum}: Target missed — short by ${shortfall}`,
          date: state.date,
          description: `${qLabel} P&L: ${money(quarterPnl)} vs target ${money(target)}. ${pressure} ${state.quarterMissed >= 2 ? 'Target reduced to rebuild momentum.' : 'No bonus this quarter.'}`
        });
        if (state.quarterMissed >= 2) {
          state.quarterTarget = Math.round(target * 0.80); // ease the target
        }
      }
      state.worldEventFeed = state.worldEventFeed.slice(0, 18);
      state.quarterStartPnl = state.realizedPnl;
      state.quarterNumber   = qNum + 1;
      saveState();
    }
  }

  function computeDealProgress(deal) {
    if (deal.delivered) return 1;
    return clamp(deal.elapsed / deal.duration, 0, 1);
  }

  function marketPriceForOpportunity(opp) {
    if (opp.priceKey === 'aluminium') return state.aluminiumPrice;
    if (opp.priceKey === 'urea') return state.ureaPrice;
    if (opp.priceKey === 'crude') return state.crudePrice;
    if (opp.priceKey === 'wheat') return state.wheatPrice;
    if (opp.priceKey === 'ironore') return state.ironorePrice;
    if (opp.priceKey === 'coffee') return state.coffeePrice;
    if (opp.priceKey === 'zinc') return state.zincPrice;
    if (opp.priceKey === 'nickel') return state.nickelPrice;
    if (opp.priceKey === 'lng') return state.lngPrice;
    return state.copperPrice;
  }

  function computeMarketImpact(deal) {
    if (deal.delivered && Number.isFinite(deal.deliveryMarketPnl)) return deal.deliveryMarketPnl;
    const opp = getOpportunity(deal.opportunityId);
    const current = marketPriceForOpportunity(opp);
    const entry = deal.entryMarketPrice || current;
    const hedgeShare = clamp((deal.hedgeRatio || 0) / 100, 0, 1.1);
    const basisRisk = negotiationProfiles.pricing[deal.commercialTerms?.pricing || deal.pricingStrategy || 'fixed']?.basisRisk || 0;
    const unhedgedShare = clamp(1 - hedgeShare + basisRisk * Math.min(1, hedgeShare), -0.1, 1);
    // Pricing windows and buyer options leave basis risk even when futures hedge coverage is high.
    return -(current - entry) * (deal.quantity || opp.quantity) * unitMultiplierForOpportunity(opp) * unhedgedShare;
  }

  function computeFxImpact(deal) {
    if (deal.delivered && Number.isFinite(deal.deliveryFxPnl)) return deal.deliveryFxPnl;
    const opp = getOpportunity(deal.opportunityId);
    const entry = deal.entryFx || state.eurusd;
    const unhedged = Math.max(0, 1 - (deal.fxHedgeRatio || 0) / 100);
    const exposure = physicalNotional(opp, deal.quantity || opp.quantity, deal.capital) * fxExposureShare(opp) * unhedged;
    return entry ? ((state.eurusd - entry) / entry) * exposure : 0;
  }

  function currentMarginRequirement(deal) {
    if (deal.delivered) return 0;
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
      deal.eventResult = `Margin shortfall: hedge reduced to ${deal.hedgeRatio}% to release collateral.`;
    }
  }

  function accrueDailyFinancing(deal) {
    const rate = deal.financingRate ?? financingProfiles[deal.financingStrategy || 'revolver']?.rate ?? .075;
    const interest = (deal.borrowed || 0) * rate / 360;
    deal.financingAccrued = (deal.financingAccrued || 0) + interest;
    state.totalInterestPaid = (state.totalInterestPaid || 0) + interest;
  }

  function dealPhase(deal) {
    if (deal.delivered && (deal.paymentDaysRemaining || 0) > 0) return { key:'receivable', label:deal.invoiceStatus === 'Overdue' ? 'Overdue receivable' : 'Awaiting payment', location:getHub(getOpportunity(deal.opportunityId).destination).name };
    const p = computeDealProgress(deal);
    if (p < .15) return { key: 'booked', label: 'Booked', location: getHub(getOpportunity(deal.opportunityId).origin).name };
    if (p < .78) return { key: 'transit', label: 'In transit', location: 'In transit' };
    if (p < .93) {
      const opp = getOpportunity(deal.opportunityId);
      const port = opp.via?.length ? getHub(opp.via.at(-1)).name : getHub(opp.destination).name;
      return { key: 'port', label: 'Port / Warehouse', location: port };
    }
    return { key: 'delivery', label: 'Final delivery', location: getHub(getOpportunity(deal.opportunityId).destination).name };
  }

  function computeUnrealizedPnl(deal) {
    const progress = computeDealProgress(deal);
    const completionFactor = deal.delivered ? 1 : Math.min(1, progress * .86);
    const operatingPnl = (deal.basePnl + deal.pnlAdjustments - (deal.financingAccrued || 0)) * completionFactor;
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
    ) - (hasStaff('risk-analyst') ? 8 : 0) + difficultySettings().riskPenalty + activeDoctrine().riskAdjustment + activeCapitalPolicy().riskAdjustment;
    const stressLoss = netFlatExposure * .08 + netFxExposure * .05 + stats.creditUsed * .012;
    return { ...stats, grossByCommodity, netFlatExposure, netFxExposure, marginRequirement, stressLoss, creditUtilization, concentration, liquidityReserve, liquidityCoverage, riskScore: clamp(riskScore, 0, 100) };
  }

  function portfolioStats() {
    const invested = state.activeDeals.reduce((sum, d) => sum + d.equity, 0);
    const marginCollateral = state.activeDeals.reduce((sum, d) => sum + (d.marginCollateral || 0), 0);
    const activePnl = state.activeDeals.reduce((sum, d) => sum + computeUnrealizedPnl(d), 0);
    const creditUsed = state.activeDeals.reduce((sum, d) => sum + d.borrowed, 0);
    const assetValue = investmentBookValue() + shopBookValue();
    const nav = state.cash + invested + marginCollateral + activePnl + assetValue;
    return { invested, marginCollateral, activePnl, creditUsed, creditAvailable: effectiveCreditLimit() - creditUsed, assetValue, nav };
  }

  function isOpportunityUnlocked(opp) {
    if (!opp) return false;
    if (typeof opp.unlock === 'function') return Boolean(opp.unlock(state));
    return !opp.locked;
  }

  function tradingHouseValuation() {
    const stats = portfolioStats();
    const earnings = Math.max(0, state.realizedPnl || 0);
    const assetValue = investmentBookValue() + shopBookValue();
    const relationshipValue = Object.values(state.counterparties||{}).reduce((sum,cp)=>sum+Math.max(0,(cp.relationship||50)-45)*4_000,0);
    const executionValue = state.completedDeals * 35_000 + (state.reputation||0)*9_000;
    const value = Math.max(stats.nav, stats.nav + earnings*1.8 + assetValue*.35 + relationshipValue + executionValue);
    const tier = value >= 50_000_000 ? 'Integrated Major' : value >= 20_000_000 ? 'Global Trading House' : value >= 8_000_000 ? 'Regional Merchant' : value >= 3_000_000 ? 'Growth Trader' : 'Boutique Desk';
    return { value, tier, earnings, assetValue, relationshipValue, executionValue };
  }
  function boardMandateData() {
    const valuation = tradingHouseValuation();
    const chains = ['upstream','midstream','downstream'].filter(chain=>investmentCatalog.some(asset=>asset.chain===chain&&investmentLevel(asset.id)>0)).length;
    const origins = new Set((state.history||[]).map(item=>getOpportunity(item.opportunityId)?.origin).filter(Boolean)).size;
    return [
      { label:'Build a $10M merchant', progress:valuation.value, target:10_000_000, copy:'Scale equity, earnings and franchise value.' },
      { label:'Vertically integrate', progress:chains, target:3, copy:'Own upstream, midstream and downstream capacity.' },
      { label:'Global origination network', progress:origins, target:6, copy:'Complete cargoes from six distinct origins.' },
      { label:'Credit discipline', progress:(state.creditLosses||0)===0?Math.min(5,state.completedDeals||0):0, target:5, copy:'Build five clean settlement milestones without material credit loss.' }
    ];
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
      + (state.achievements?.length||0) * 18
      + (state.tenderWins||0) * 12
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
      name:state.companyName || 'World of Trade Co.',
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
    dpr = targetPixelRatio();
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
    const radius = desiredGlobeRadius();
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

  function loadGeoBorders() {
    fetch('./assets/data/countries-lowres.geojson')
      .then(r => {
        if (!r.ok) throw new Error('Geography asset unavailable');
        return r.json();
      })
      .then(world => {
        const borders = [];
        const coasts = [];
        const addPolygon = polygon => {
          if (!Array.isArray(polygon) || !polygon.length) return;
          polygon.forEach((ring,index) => {
            if (!Array.isArray(ring) || ring.length < 2) return;
            borders.push(ring);
            if (index === 0) coasts.push(ring);
          });
        };
        (world.features || []).forEach(feature => {
          const geometry = feature?.geometry;
          if (!geometry) return;
          if (geometry.type === 'Polygon') addPolygon(geometry.coordinates);
          if (geometry.type === 'MultiPolygon') geometry.coordinates.forEach(addPolygon);
        });
        geoBorderLines = borders;
        geoCoastlines = coasts;
      })
      .catch(() => {});
  }

  function drawGeoBorders() {
    if (!canvasRect) return;
    const radius = desiredGlobeRadius();
    const cx = canvasRect.width * .5;
    const cy = canvasRect.height * .5;
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.clip();
    function drawLines(lines, color, lw, dash) {
      if (!lines?.length) return;
      ctx.strokeStyle = color;
      ctx.lineWidth = lw;
      if (dash) ctx.setLineDash(dash); else ctx.setLineDash([]);
      for (const line of lines) {
        let open = false;
        ctx.beginPath();
        for (const [lon, lat] of line) {
          const p = project(lon, lat);
          if (p.z > 0.0) {
            if (!open) { ctx.moveTo(p.x, p.y); open = true; }
            else ctx.lineTo(p.x, p.y);
          } else { open = false; }
        }
        ctx.stroke();
      }
      ctx.setLineDash([]);
    }
    if (earthWebGLReady) {
      drawLines(geoCoastlines,  'rgba(255,255,255,0.40)', 0.75, null);
      drawLines(geoBorderLines, 'rgba(220,235,255,0.22)', 0.45, [2,3]);
    } else {
      drawLines(geoCoastlines,  'rgba(140,220,190,0.55)', 0.90, null);
      drawLines(geoBorderLines, 'rgba(140,220,190,0.30)', 0.55, [2,3]);
    }
    ctx.restore();
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

    const radius = desiredGlobeRadius();
    const cx = width * .5;
    const cy = height * .5;

    if (!earthRenderer || !earthWebGLReady) {
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
      if (!geoBorderLines) drawContinents();
      ctx.restore();
    }

    if (geoBorderLines || geoCoastlines) drawGeoBorders();

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
    if (style.dash) { ctx.setLineDash(style.dash); ctx.lineDashOffset = -(animationTime * 0.012); }
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
      const hoveredHub = hoveredTarget?.type === 'hub' && hoveredTarget.id === hub.id;
      if (globeOptions.labels && (selectedHub || hoveredHub)) {
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
      const hoveredShip = hoveredTarget?.type === 'deal' && hoveredTarget.id === deal.id;
      if(globeOptions.labels && (selectedShip || hoveredShip)){ctx.save();ctx.font='700 8px Inter,sans-serif';ctx.textAlign='center';ctx.fillStyle='rgba(235,249,255,.9)';ctx.fillText(`${type.toUpperCase()} · ${Math.round(progress*100)}%`,p.x,p.y-14);ctx.restore();}
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

  function findGlobeTarget(x, y) {
    const groups = [
      { type: 'investment', items: investmentHitboxes },
      { type: 'vessel', items: fleetHitboxes },
      { type: 'deal', items: shipHitboxes },
      { type: 'hub', items: markerHitboxes }
    ];
    for (const group of groups) {
      const hit = [...group.items].sort((a,b) => b.z - a.z).find(item => Math.hypot(x - item.x, y - item.y) <= item.r);
      if (hit) return { type: group.type, id: hit.id };
    }
    return null;
  }

  function globeTargetCopy(target) {
    if (!target) return null;
    if (target.type === 'hub') {
      const hub = getHub(target.id);
      return hub ? { eyebrow: hub.type, title: hub.name, detail: `${hub.country} · ${hub.subtitle}` } : null;
    }
    if (target.type === 'deal') {
      const deal = getActiveDeal(target.id);
      if (!deal) return null;
      const opp = getOpportunity(deal.opportunityId);
      const progress = visualDealProgress(deal);
      return { eyebrow: 'Moving cargo', title: opp.title, detail: `${getHub(opp.origin).name} → ${getHub(opp.destination).name} · ${Math.round(progress * 100)}%` };
    }
    if (target.type === 'vessel') {
      const vessel = getFleetAsset(target.id);
      return vessel ? { eyebrow: 'Fleet asset', title: vessel.name, detail: `${vessel.className || vessel.vesselClass || 'Chartered vessel'} · ${getHub(vessel.positionHub)?.name || 'At sea'}` } : null;
    }
    if (target.type === 'investment') {
      const asset = investmentDefinition(target.id);
      const record = investmentRecord(target.id);
      return asset ? { eyebrow: `${asset.chain} asset`, title: asset.name, detail: `${getHub(asset.hub)?.name || ''} · Level ${record.level || 0}` } : null;
    }
    return null;
  }

  function updateGlobeTooltip(target, x, y) {
    hoveredTarget = target;
    const tooltip = $('#globeTooltip');
    if (!tooltip || !target) {
      tooltip?.classList.remove('visible');
      tooltip?.setAttribute('aria-hidden', 'true');
      canvas.style.cursor = dragging ? 'grabbing' : 'grab';
      return;
    }
    const copy = globeTargetCopy(target);
    if (!copy) return updateGlobeTooltip(null, x, y);
    tooltip.innerHTML = `<span>${copy.eyebrow}</span><strong>${copy.title}</strong><small>${copy.detail}</small>`;
    const maxX = Math.max(8, (canvasRect?.width || 0) - 245);
    const maxY = Math.max(8, (canvasRect?.height || 0) - 105);
    tooltip.style.left = `${clamp(x, 8, maxX)}px`;
    tooltip.style.top = `${clamp(y, 8, maxY)}px`;
    tooltip.classList.add('visible');
    tooltip.setAttribute('aria-hidden', 'false');
    canvas.style.cursor = 'pointer';
  }

  function renderLiveTracker() {
    const tracker = $('#liveTracker');
    const deal = trackingDealId ? getActiveDeal(trackingDealId) : null;
    if (!tracker || !deal) {
      tracker?.classList.remove('open');
      tracker?.setAttribute('aria-hidden', 'true');
      if (!deal) { trackingDealId = null; followCargo = false; }
      return;
    }
    const opp = getOpportunity(deal.opportunityId);
    const progress = visualDealProgress(deal);
    const remainingDays = Math.max(0, Math.ceil(deal.duration * (1 - progress)));
    const eta = new Date(currentDate());
    eta.setUTCDate(eta.getUTCDate() + remainingDays);
    const mode = vehicleTypeForDeal(deal, progress);
    $('#trackerTitle').textContent = opp.title;
    $('#trackerRoute').textContent = `${getHub(opp.origin).name} → ${getHub(opp.destination).name}`;
    $('#trackerProgress').textContent = `${Math.round(progress * 100)}%`;
    $('#trackerProgressBar').style.width = `${progress * 100}%`;
    $('#trackerEta').textContent = remainingDays ? formatDate(eta) : 'Arriving';
    $('#trackerMode').textContent = mode.charAt(0).toUpperCase() + mode.slice(1);
    $('#trackerPnl').textContent = money(computeUnrealizedPnl(deal));
    $('#trackerPnl').className = computeUnrealizedPnl(deal) >= 0 ? 'positive' : 'negative';
    $('#followCargoButton').textContent = followCargo ? 'Stop following' : 'Follow cargo';
    $('#followCargoButton').classList.toggle('active', followCargo);
    tracker.classList.add('open');
    tracker.setAttribute('aria-hidden', 'false');
  }

  function openLiveTracker(dealId, follow = false) {
    if (!getActiveDeal(dealId)) return;
    trackingDealId = dealId;
    followCargo = follow;
    renderLiveTracker();
  }

  function closeLiveTracker() {
    trackingDealId = null;
    followCargo = false;
    renderLiveTracker();
  }

  function animate(timestamp) {
    animationTime = timestamp;
    if (timestamp - lastDrawTime >= 32) {
      lastDrawTime = timestamp;
      const trackedDeal = followCargo && trackingDealId ? getActiveDeal(trackingDealId) : null;
      if (trackedDeal) {
        const opp = getOpportunity(trackedDeal.opportunityId);
        const point = pointOnRoute(opp, visualDealProgress(trackedDeal));
        view.targetLon = point.lon;
        view.targetLat = clamp(point.lat * .80, -58, 62);
        view.zoom = Math.max(view.zoom, 1.10);
      } else if (globeOptions.autoRotate && !dragging && view.targetLon === null && !leftDrawerOpen && !inspectorOpen && timestamp - lastInteractionTime > 2200) {
        view.lon = ((view.lon + 0.025 + 540) % 360) - 180;
      }
      if (view.targetLon !== null) {
        let diffLon = ((view.targetLon - view.lon + 540) % 360) - 180;
        const diffLat = view.targetLat - view.lat;
        view.lon += diffLon * (trackedDeal ? .20 : .12);
        view.lat += diffLat * (trackedDeal ? .20 : .12);
        if (!trackedDeal && Math.abs(diffLon) < .08 && Math.abs(diffLat) < .08) {
          view.lon = view.targetLon;
          view.lat = view.targetLat;
          view.targetLon = null;
          view.targetLat = null;
        }
      }
      renderEarth(timestamp);
      drawGlobe();
      renderLiveTracker();
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

  const drawerLabels = {
    portfolio: 'Trading desk', inventory: 'Physical inventory', operations: 'Operations center', supply: 'Supply chain control', contracts: 'Contracts & credit',
    fleet: 'Fleet desk', risk: 'Risk dashboard', opportunities: 'Opportunity market', rivals: 'Competitive intelligence', strategy: 'Board strategy',
    counterparties: 'Commercial network', compliance: 'Compliance desk', events: 'Global intelligence', finance: 'Treasury desk', performance: 'Performance office',
    academy: 'WoT Academy', empire: 'Trading empire', shop: 'Empire shop', hq: 'Headquarters',
    career: 'Career progression', leaderboard: 'Career League'
  };

  function drawerLabel(id) {
    if (state && state.language === 'it' && drawerLabelsIT[id]) return drawerLabelsIT[id];
    return drawerLabels[id];
  }

  const searchModuleIcons = {
    portfolio:'◇', inventory:'▣', operations:'≋', supply:'⛓', contracts:'§', fleet:'⌁', risk:'!', opportunities:'◎', rivals:'⚔', strategy:'◈',
    counterparties:'○', compliance:'✓', events:'⚠', finance:'$', performance:'Σ', academy:'A', empire:'▲', shop:'▦', hq:'⌂', career:'↗', leaderboard:'#'
  };

  function buildGlobalSearchItems() {
    const modules = Object.keys(drawerLabels).map((id) => ({ type:'module', id, title:drawerLabel(id), subtitle:'Open command-center module', icon:searchModuleIcons[id] || '•', group:'Modules' }));
    const hubItems = hubs.filter(hub => hubVisible(hub) || hub.type === 'hq').map(hub => ({ type:'hub', id:hub.id, title:hub.name, subtitle:`${hub.country} · ${hub.subtitle}`, icon:hub.type === 'port' ? '⚓' : hub.type === 'supplier' ? '↑' : hub.type === 'customer' ? '↓' : '⌂', group:'World' }));
    const dealItems = state.activeDeals.map(deal => {
      const opp = getOpportunity(deal.opportunityId);
      return { type:'deal', id:deal.id, title:opp.title, subtitle:`${getHub(opp.origin).name} → ${getHub(opp.destination).name} · ${Math.round(visualDealProgress(deal)*100)}%`, icon:'➤', group:'Live cargo' };
    });
    const opportunityItems = opportunities.filter(isOpportunityUnlocked).filter(opportunityAvailable).map(opp => ({ type:'opportunity', id:opp.id, title:opp.title, subtitle:`${opp.commodity} · ${getHub(opp.origin).name} → ${getHub(opp.destination).name}`, icon:'◆', group:'Opportunities' }));
    const investmentItems = investmentCatalog.filter(asset => { const record=investmentRecord(asset.id); return record.level || record.buildingTo; }).map(asset => ({ type:'investment', id:asset.id, title:asset.name, subtitle:`${asset.chain} · ${getHub(asset.hub)?.name || ''}`, icon:asset.icon || '▲', group:'Owned assets' }));
    return [...modules, ...dealItems, ...opportunityItems, ...hubItems, ...investmentItems];
  }

  function executeSearchItem(item) {
    const dialog = $('#searchDialog');
    dialog?.close();
    if (item.type === 'module') openLeftDrawer(item.id);
    else if (item.type === 'hub') selectHub(item.id);
    else if (item.type === 'deal') trackLiveDeal(item.id);
    else if (item.type === 'opportunity') selectOpportunity(item.id);
    else if (item.type === 'investment') selectInvestment(item.id);
  }

  function renderGlobalSearch(query = '') {
    const container = $('#globalSearchResults');
    if (!container) return;
    const term = query.trim().toLowerCase();
    searchItems = buildGlobalSearchItems().filter(item => !term || `${item.title} ${item.subtitle} ${item.group}`.toLowerCase().includes(term)).slice(0, 28);
    searchActiveIndex = clamp(searchActiveIndex, 0, Math.max(0, searchItems.length - 1));
    if (!searchItems.length) { container.innerHTML = '<div class="search-empty">No results. Try a city, commodity or function.</div>'; return; }
    const groups = [...new Set(searchItems.map(item => item.group))];
    container.innerHTML = groups.map(group => `<div class="search-group-title">${group}</div>${searchItems.map((item,index) => ({item,index})).filter(row => row.item.group === group).map(({item,index}) => `<button type="button" class="search-result ${index === searchActiveIndex ? 'active' : ''}" data-search-index="${index}"><span class="search-result-icon">${item.icon}</span><span><strong>${item.title}</strong><small>${item.subtitle}</small></span><kbd>↵</kbd></button>`).join('')}`).join('');
    $$('[data-search-index]', container).forEach(button => button.addEventListener('click', () => executeSearchItem(searchItems[Number(button.dataset.searchIndex)])));
    container.querySelector('.search-result.active')?.scrollIntoView({ block:'nearest' });
  }

  function openGlobalSearch() {
    const dialog = $('#searchDialog');
    if (!dialog || dialog.open) return;
    searchActiveIndex = 0;
    renderGlobalSearch('');
    dialog.showModal();
    setTimeout(() => { const input=$('#globalSearchInput'); if (input) { input.value=''; input.focus(); } }, 20);
  }


  function recommendedOpportunity() {
    const candidates = opportunities
      .filter(isOpportunityUnlocked)
      .filter(opportunityAvailable)
      .map(opp => {
        const economics = opportunityEconomics(opp);
        const capitalEfficiency = economics.expectedPnl / Math.max(1, economics.equity);
        const timeEfficiency = capitalEfficiency / Math.max(10, economics.duration);
        const riskPenalty = (opp.risk === 'High' ? .00045 : opp.risk === 'Medium' ? .00018 : 0);
        return { opp, economics, score: timeEfficiency - riskPenalty };
      })
      .sort((a, b) => b.score - a.score);
    return candidates[0] || null;
  }

  function briefingSignals() {
    const pending = state.activeDeals.filter(deal => deal.pendingDecision);
    const crises = activeCrisisDefinitions();
    const expiring = opportunities.filter(isOpportunityUnlocked).filter(opportunityAvailable).filter(opp => liveOffer(opp).expiresIn <= 2);
    const contested = opportunities.filter(isOpportunityUnlocked).filter(opportunityAvailable).filter(opp => {
      const tender = rivalTenderFor(opp.id);
      return tender?.status === 'open' && tender.awardDay - state.marketCycleDay <= 1;
    });
    const risk = riskStats();
    const recommended = recommendedOpportunity();
    const constructing = state.constructionQueue || [];
    const shopConstructing = state.shopOrders || [];
    const congestedDeals = state.activeDeals.filter(deal => !deal.delivered && !deal.routeMitigated && (deal.routeCondition?.score || 0) >= 70);
    const expiringAgreements = Object.values(state.procurementAgreements || {}).filter(item => item?.status === 'active' && item.daysRemaining <= 15 && item.liftings < item.commitment);
    const priorities = [];
    pending.forEach(deal => priorities.push({
      severity: 'critical',
      title: `Decision required · ${getOpportunity(deal.opportunityId)?.title || 'Active cargo'}`,
      copy: deal.eventResult || 'Operations cannot advance until this decision is resolved.',
      action: 'deal',
      id: deal.id
    }));
    if (risk.liquidityCoverage < 1.2 && state.activeDeals.length) priorities.push({
      severity: 'critical',
      title: 'Liquidity buffer under pressure',
      copy: `Coverage is ${risk.liquidityCoverage.toFixed(1)}× against the desk reserve. Review collateral and funding before advancing time.`,
      action: 'module',
      id: 'finance'
    });
    crises.slice(0, 2).forEach(event => priorities.push({
      severity: 'warning',
      title: event.title,
      copy: `${event.region || 'Global'} disruption · ${event.remaining} days remaining.`,
      action: 'module',
      id: 'events'
    }));
    contested.slice(0, 2).forEach(opp => {
      const tender = rivalTenderFor(opp.id);
      priorities.push({
        severity: 'critical',
        title: `Rival tender closing · ${opp.title}`,
        copy: `${rivalForTender(tender).name} leads at ${tender.pressure}% pressure. Submit terms before the next award decision.`,
        action: 'opportunity',
        id: opp.id
      });
    });
    expiring.slice(0, 2).forEach(opp => priorities.push({
      severity: 'warning',
      title: `${opp.title} expires soon`,
      copy: `${liveOffer(opp).expiresIn} days remaining in the current market cycle.`,
      action: 'opportunity',
      id: opp.id
    }));
    congestedDeals.slice(0, 2).forEach(deal => priorities.push({
      severity: 'warning',
      title: `Capacity risk · ${getOpportunity(deal.opportunityId).title}`,
      copy: `${deal.routeCondition.severity} congestion at ${deal.routeCondition.score}/100. Priority capacity can protect the ETA.`,
      action: 'deal',
      id: deal.id
    }));
    expiringAgreements.slice(0, 2).forEach(agreement => priorities.push({
      severity: 'critical',
      title: `Procurement commitment due · ${getCounterparty(agreement.supplierId)?.name || 'Supplier'}`,
      copy: `${agreement.daysRemaining} days left · ${Math.max(0,agreement.commitment-agreement.liftings)} cargo liftings still required.`,
      action: 'module',
      id: 'supply'
    }));
    if (recommended && !pending.length) priorities.push({
      severity: 'opportunity',
      title: `Best capital-adjusted opportunity · ${recommended.opp.title}`,
      copy: `${money(recommended.economics.expectedPnl)} expected P&L · ${money(recommended.economics.equity)} equity · ${recommended.economics.duration} days.`,
      action: 'opportunity',
      id: recommended.opp.id
    });
    if (constructing.length) priorities.push({
      severity: 'info',
      title: `${constructing.length} industrial project${constructing.length === 1 ? '' : 's'} under construction`,
      copy: 'Construction progress continues when the game clock advances.',
      action: 'module',
      id: 'empire'
    });
    if (shopConstructing.length) priorities.push({
      severity: 'info',
      title: `${shopConstructing.length} shop order${shopConstructing.length === 1 ? '' : 's'} under construction`,
      copy: 'Your permanent fleet and logistics assets progress whenever the game clock advances.',
      action: 'module',
      id: 'shop'
    });
    if (!priorities.length) priorities.push({
      severity: 'info',
      title: 'Desk is clear',
      copy: 'No urgent decisions. Review the market or invest in the physical value chain.',
      action: 'module',
      id: 'opportunities'
    });
    return { pending, crises, expiring, contested, congestedDeals, expiringAgreements, risk, recommended, priorities };
  }

  function briefingUnreadCount() {
    const signals = briefingSignals();
    let count = signals.pending.length + signals.crises.length + signals.expiring.length + signals.contested.length + signals.congestedDeals.length + signals.expiringAgreements.length;
    if (signals.risk.liquidityCoverage < 1.2 && state.activeDeals.length) count += 1;
    if (state.briefingViewedDay !== state.dayIndex) count = Math.max(1, count);
    return count;
  }

  function executeBriefingAction(type, id) {
    closeBriefing();
    if (type === 'deal') selectDeal(id);
    else if (type === 'opportunity') selectOpportunity(id);
    else if (type === 'module') openLeftDrawer(id);
  }

  function renderBriefing() {
    const panel = $('#briefingPanel');
    if (!panel) return;
    const signals = briefingSignals();
    $('#briefingDate').textContent = `${formatDate(currentDate())} · Day ${state.dayIndex + 1} · ${rankFromState()}`;
    const stats = portfolioStats();
    $('#briefingScorecard').innerHTML = `
      <div><span>NAV</span><strong>${money(stats.nav, true)}</strong><small>${state.realizedPnl >= 0 ? '+' : ''}${money(state.realizedPnl)} realized</small></div>
      <div><span>Liquidity</span><strong>${money(state.cash, true)}</strong><small>${signals.risk.liquidityCoverage.toFixed(1)}× coverage</small></div>
      <div><span>Open cargoes</span><strong>${state.activeDeals.length}</strong><small>${money(stats.activePnl)} live P&L</small></div>
      <div><span>Desk risk</span><strong>${Math.round(signals.risk.riskScore)}</strong><small>${signals.risk.riskScore < 35 ? 'Controlled' : signals.risk.riskScore < 65 ? 'Elevated' : 'High'}</small></div>`;
    $('#briefingPriorities').innerHTML = signals.priorities.slice(0, 6).map((item, index) => `
      <button class="briefing-priority ${item.severity}" data-briefing-index="${index}">
        <i></i><span><strong>${item.title}</strong><small>${item.copy}</small></span><b>Open</b>
      </button>`).join('');
    $$('[data-briefing-index]', $('#briefingPriorities')).forEach(button => button.addEventListener('click', () => {
      const item = signals.priorities[Number(button.dataset.briefingIndex)];
      executeBriefingAction(item.action, item.id);
    }));
    const quick = [];
    if (signals.pending[0]) quick.push({ label: 'Resolve decision', type: 'deal', id: signals.pending[0].id });
    if (signals.recommended) quick.push({ label: 'Review best trade', type: 'opportunity', id: signals.recommended.opp.id });
    quick.push({ label: 'Open risk desk', type: 'module', id: 'risk' });
    $('#briefingActions').innerHTML = quick.map((item, index) => `<button data-briefing-quick="${index}">${item.label}</button>`).join('');
    $$('[data-briefing-quick]', $('#briefingActions')).forEach(button => button.addEventListener('click', () => {
      const item = quick[Number(button.dataset.briefingQuick)];
      executeBriefingAction(item.type, item.id);
    }));
    const unread = briefingUnreadCount();
    const badge = $('#briefingBadge');
    badge.textContent = unread;
    badge.classList.toggle('hidden', unread <= 0 || briefingOpen);
  }

  function openBriefing() {
    briefingOpen = true;
    state.briefingViewedDay = state.dayIndex;
    saveState();
    leftDrawerOpen = false;
    inspectorOpen = false;
    overviewOpen = false;
    marketsOpen = false;
    layersOpen = false;
    renderBriefing();
    syncOverlayUI();
  }

  function closeBriefing() {
    briefingOpen = false;
    syncOverlayUI();
    renderBriefing();
  }

  const tutorialSteps = [
    {
      title: 'Read the opportunity market',
      copy: 'Physical trading starts with a buyer need and a viable source. Compare expected margin, equity, duration and route risk.',
      action: 'Open Market'
    },
    {
      title: 'Inspect a trade route',
      copy: 'Open the recommended opportunity and review origin, destination, commodity, freight path and counterparties.',
      action: 'Inspect opportunity'
    },
    {
      title: 'Negotiate commercial terms',
      copy: 'Balance buyer acceptance against margin. Price, payment and delivery terms change both economics and working capital.',
      action: 'Open negotiation'
    },
    {
      title: 'Structure and fund the deal',
      copy: 'Choose the hedge, FX coverage, financing, insurance, inspection and carrier before committing capital.',
      action: 'Open deal structure'
    },
    {
      title: 'Run the physical operation',
      copy: 'Advance time and monitor cargo, documents, collateral, interest and global disruptions.',
      action: 'Advance to next event'
    },
    {
      title: 'Resolve the operational event',
      copy: 'Your response affects P&L, delivery time, reputation and counterparty relationships.',
      action: 'Open decision'
    },
    {
      title: 'Reach settlement',
      copy: 'Advance to the next milestone. The final review attributes commercial, market, FX, finance and operational P&L.',
      action: 'Advance to settlement'
    },
    {
      title: 'First cargo completed',
      copy: 'You now control the full physical-trading cycle. Continue freely, build the company and climb the Career League.',
      action: 'Finish tour'
    }
  ];

  function inferredTutorialStep() {
    if (state.history.length) return 7;
    const pending = state.activeDeals.find(deal => deal.pendingDecision);
    if (pending) return 5;
    if (state.activeDeals.length) return state.activeDeals.some(deal => deal.eventResolved) ? 6 : 4;
    const accepted = opportunities.find(opp => state.negotiations?.[opp.id]?.cycle === state.marketCycle && state.negotiations[opp.id].status === 'accepted');
    if (accepted) return 3;
    if (selected.type === 'opportunity') return 2;
    if (activeLeftTab === 'opportunities' && leftDrawerOpen) return 1;
    return 0;
  }

  function currentTutorialStep() {
    state.tutorialStep = Math.max(state.tutorialStep || 0, inferredTutorialStep());
    return clamp(state.tutorialStep, 0, tutorialSteps.length - 1);
  }

  function runTutorialAction() {
    const step = currentTutorialStep();
    const recommended = recommendedOpportunity()?.opp;
    if (step === 0) {
      state.tutorialStep = 1;
      openLeftDrawer('opportunities');
    } else if (step === 1) {
      state.tutorialStep = 2;
      if (recommended) selectOpportunity(recommended.id);
      else openLeftDrawer('opportunities');
    } else if (step === 2) {
      if (selected.type === 'opportunity') selectOpportunity(selected.id);
      else if (recommended) selectOpportunity(recommended.id);
    } else if (step === 3) {
      const accepted = opportunities.find(opp => state.negotiations?.[opp.id]?.cycle === state.marketCycle && state.negotiations[opp.id].status === 'accepted');
      if (accepted) selectOpportunity(accepted.id);
    } else if (step === 4 || step === 6) {
      advanceToNextEvent();
    } else if (step === 5) {
      const pending = state.activeDeals.find(deal => deal.pendingDecision);
      if (pending) selectDeal(pending.id);
    } else {
      state.tutorialDismissed = true;
      state.tutorialEnabled = false;
      saveState();
      showToast('Guided first deal completed.');
    }
    renderTutorialCoach();
  }

  function renderTutorialCoach() {
    const coach = $('#tutorialCoach');
    if (!coach) return;
    const visible = state.onboardingComplete && state.tutorialEnabled && !state.tutorialDismissed;
    coach.classList.toggle('open', visible);
    coach.setAttribute('aria-hidden', String(!visible));
    if (!visible) return;
    const step = currentTutorialStep();
    const data = tutorialSteps[step];
    $('#tutorialStepLabel').textContent = `Guided career · ${step + 1}/${tutorialSteps.length}`;
    $('#tutorialTitle').textContent = data.title;
    $('#tutorialCopy').textContent = data.copy;
    $('#tutorialActionButton').textContent = data.action;
    $('#tutorialProgressBar').style.width = `${((step + 1) / tutorialSteps.length) * 100}%`;
    const back = $('#tutorialBackButton');
    back.disabled = step === 0;
  }

  function syncOverlayUI() {
    const left = $('#leftDrawer');
    const right = $('#rightInspector');
    const backdrop = $('#drawerBackdrop');
    left?.classList.toggle('open', leftDrawerOpen);
    right?.classList.toggle('open', inspectorOpen);
    left?.setAttribute('aria-hidden', String(!leftDrawerOpen));
    right?.setAttribute('aria-hidden', String(!inspectorOpen));
    $('#briefingPanel')?.classList.toggle('open', briefingOpen);
    $('#briefingPanel')?.setAttribute('aria-hidden', String(!briefingOpen));
    backdrop?.classList.toggle('open', leftDrawerOpen || inspectorOpen || briefingOpen);
    backdrop?.setAttribute('aria-hidden', String(!(leftDrawerOpen || inspectorOpen || briefingOpen)));
    $('#overviewPanel')?.classList.toggle('open', overviewOpen);
    $('#overviewPanel')?.setAttribute('aria-hidden', String(!overviewOpen));
    $('#marketStrip')?.classList.toggle('open', marketsOpen);
    $('#marketStrip')?.setAttribute('aria-hidden', String(!marketsOpen));
    $('#layerControls')?.classList.toggle('open', layersOpen);
    $('#layerControls')?.setAttribute('aria-hidden', String(!layersOpen));
    $('#globeLegend')?.classList.toggle('open', layersOpen);
    $('#globeLegend')?.setAttribute('aria-hidden', String(!layersOpen));
    $('#openDeskButton')?.classList.toggle('active', leftDrawerOpen);
    $('#openShopButton')?.classList.toggle('active', leftDrawerOpen && activeLeftTab === 'shop');
    $('#toggleOverviewButton')?.classList.toggle('active', overviewOpen);
    $('#toggleMarketsButton')?.classList.toggle('active', marketsOpen);
    $('#toggleLayersButton')?.classList.toggle('active', layersOpen);
    $('#openBriefingButton')?.classList.toggle('active', briefingOpen);
    document.body.classList.toggle('overlay-active', leftDrawerOpen || inspectorOpen || overviewOpen || marketsOpen || layersOpen || briefingOpen);
  }

  function openLeftDrawer(tab = activeLeftTab) {
    activeLeftTab = tab;
    leftDrawerOpen = true;
    inspectorOpen = false;
    overviewOpen = false;
    marketsOpen = false;
    briefingOpen = false;
    renderTabs();
    syncOverlayUI();
  }

  function closeLeftDrawer() { leftDrawerOpen = false; syncOverlayUI(); }
  function openInspector() { inspectorOpen = true; leftDrawerOpen = false; overviewOpen = false; marketsOpen = false; briefingOpen = false; syncOverlayUI(); }
  function closeInspectorPanel() { inspectorOpen = false; syncOverlayUI(); }
  function cleanGlobeView() {
    leftDrawerOpen = false; inspectorOpen = false; briefingOpen = false; overviewOpen = false; marketsOpen = false; layersOpen = false; briefingOpen = false;
    if (globeOptions.cinematic) globeOptions.cinematic = false;
    renderLayers();
    syncOverlayUI();
  }

  function openShortcutsOverlay() {
    const ov = $('#shortcutsOverlay');
    if (!ov) return;
    ov.classList.add('open');
    ov.setAttribute('aria-hidden', 'false');
  }
  function closeShortcutsOverlay() {
    const ov = $('#shortcutsOverlay');
    if (!ov) return;
    ov.classList.remove('open');
    ov.setAttribute('aria-hidden', 'true');
  }
  function toggleShortcutsOverlay() {
    const ov = $('#shortcutsOverlay');
    if (!ov) return;
    ov.classList.contains('open') ? closeShortcutsOverlay() : openShortcutsOverlay();
  }

  const toastIcons = { success: '✓', error: '✕', warning: '!', info: 'ℹ', money: '$', deal: '◎' };
  function inferToastType(message) {
    const m = String(message).toLowerCase();
    if (/(fail|reject|error|blocked|cannot|insufficient|not enough|not a valid|denied|invalid|declined|lost|missed|too busy|all project teams are busy)/.test(m)) return 'error';
    if (/(warn|risk|delay|caution|overdue|breach|dispute|penalt|shortfall|exceed|locked:|requires )/.test(m)) return 'warning';
    if (/(complete|approved|won|success|secured|delivered|profit|accepted|started|purchased|built|unlocked|saved|imported|exported|paid|settled|ordered|joined|opened|confirmed|is now active|activated|expedited|booked|hired|granted)/.test(m)) return 'success';
    return 'info';
  }
  function showToast(message, type) {
    const stack = $('#toastStack');
    if (!stack) { // fallback to legacy element
      const toast = $('#toast');
      if (!toast) return;
      clearTimeout(toastTimer);
      toast.textContent = message;
      toast.classList.remove('hidden');
      requestAnimationFrame(() => toast.classList.add('visible'));
      toastTimer = setTimeout(() => { toast.classList.remove('visible'); setTimeout(() => toast.classList.add('hidden'), 260); }, 2600);
      return;
    }
    const kind = type || inferToastType(message);
    try {
      notificationHistory.unshift({ message: String(message), kind, at: Date.now(), gameDate: (typeof state !== 'undefined' && state) ? state.date : null });
      if (notificationHistory.length > 60) notificationHistory.length = 60;
      notificationsUnread = Math.min(99, notificationsUnread + 1);
      updateNotificationsBadge();
    } catch (e) {}
    try { Sound.play(kind); } catch (e) {}
    const el = document.createElement('div');
    el.className = `toast-item toast-${kind}`;
    el.setAttribute('role', kind === 'error' ? 'alert' : 'status');
    el.innerHTML = `<span class="toast-icon">${toastIcons[kind] || 'ℹ'}</span><span class="toast-msg"></span><button class="toast-close" aria-label="Dismiss">×</button>`;
    el.querySelector('.toast-msg').textContent = message;
    // Cap stack at 4 — remove oldest
    while (stack.children.length >= 4) stack.firstElementChild?.remove();
    stack.appendChild(el);
    requestAnimationFrame(() => el.classList.add('visible'));
    const dismiss = () => {
      el.classList.remove('visible');
      el.classList.add('leaving');
      setTimeout(() => el.remove(), 300);
    };
    const timer = setTimeout(dismiss, kind === 'error' ? 4200 : 3000);
    el.querySelector('.toast-close').addEventListener('click', () => { clearTimeout(timer); dismiss(); });
  }

  function selectHub(id, focus = true) {
    selected = { type: 'hub', id };
    if (focus) focusOnHub(id);
    renderInspector();
    renderAllLists();
    openInspector();
  }

  function selectOpportunity(id, focus = true) {
    const opp = getOpportunity(id);
    if (!isOpportunityUnlocked(opp)) return showToast('This opportunity is not yet unlocked.');
    if (!opportunityAvailable(opp)) return showToast('This opportunity has already been allocated in the current cycle.');
    selected = { type: 'opportunity', id };
    if (focus) focusOnOpportunity(id);
    renderInspector();
    renderOpportunityList();
    openInspector();
  }

  function trackLiveDeal(id, focus = true) {
    if (!getActiveDeal(id)) return;
    selected = { type: 'deal', id };
    leftDrawerOpen = false; inspectorOpen = false; briefingOpen = false; overviewOpen = false; marketsOpen = false; layersOpen = false;
    if (focus) focusOnDeal(id);
    syncOverlayUI();
    renderActiveDeals();
    openLiveTracker(id);
  }

  function selectDeal(id, focus = true) {
    selected = { type: 'deal', id };
    closeLiveTracker();
    if (focus) focusOnDeal(id);
    renderInspector();
    renderActiveDeals();
    openInspector();
  }

  function selectHistory(id) {
    const item = getHistoryDeal(id);
    if (!item) return;
    selected = { type: 'history', id };
    activeLeftTab = 'portfolio';
    renderTabs();
    renderInspector();
    renderHistory();
    openInspector();
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
    openInspector();
  }

  function opportunityAvailable(opp) {
    if (opp?.distressed) {
      return !!(state.distressedOpportunity?.id === opp.id && state.dayIndex <= (opp.distressedExpiry || 0));
    }
    const negotiation = state.negotiations?.[opp.id];
    const tender = rivalTenderFor(opp.id);
    const consumed = negotiation && negotiation.cycle === state.marketCycle && negotiation.status === 'consumed';
    const rivalAwarded = tender?.cycle === state.marketCycle && tender.status === 'awarded';
    return !consumed && !rivalAwarded;
  }

  function submitNegotiation(oppId) {
    const opp = getOpportunity(oppId);
    if (!opp || !isOpportunityUnlocked(opp) || !opportunityAvailable(opp)) return;
    const draft = { ...negotiationFor(oppId) };
    const attempts = (draft.attempts || 0) + 1;
    const probability = negotiationAcceptance(opp, draft);
    const roll = deterministicRandom(`${opp.id}-${state.marketCycle}-${attempts}-${draft.commercial}-${draft.payment}-${draft.pricing||'fixed'}-${draft.delivery}`) * 100;
    const accepted = roll <= probability;
    const parties = partiesForOpportunity(opp);
    const buyerState = getCounterpartyState(parties.buyerId);
    const result = { ...draft, attempts, probability, status: accepted ? 'accepted' : 'rejected', submittedAt: state.date };
    state.negotiations[oppId] = result;
    selectedNegotiationDrafts[oppId] = result;
    recordJournal('Negotiation', `${opp.title}: ${accepted ? 'offer accepted' : 'offer rejected'}`, `${negotiationProfiles.commercial[draft.commercial]?.label || 'Quote'} · ${negotiationProfiles.payment[draft.payment]?.label || 'Payment terms'} · probability ${Math.round(probability)}%`, 0, opp.id);
    const tender = rivalTenderFor(opp.id);
    if (accepted) {
      buyerState.relationship = clamp(buyerState.relationship + 1, 0, 100);
      if (tender && tender.status !== 'player_reserved') {
        tender.status = 'player_reserved';
        tender.awardedTo = 'player';
        state.tenderWins = (state.tenderWins || 0) + 1; addXp(25, 'tender');
        state.rivalFeed.unshift({ date:state.date, cycle:state.marketCycle, opportunityId:opp.id, rivalId:'player', title:`${state.companyName} secures ${opp.title}`, description:`Player bid accepted against ${tender.pressure}% competitive pressure.` });
        state.rivalFeed = state.rivalFeed.slice(0,18);
      }
      evaluateAchievements();
      showToast(`Tender won. The deal can be opened within ${liveOffer(opp).expiresIn} days.`);
    } else {
      buyerState.relationship = clamp(buyerState.relationship - 1, 0, 100);
      if (tender) tender.pressure = clamp(tender.pressure + 5, 0, 99);
      showToast('Offer rejected. Rival pressure has increased; revise price, payment or delivery terms.');
    }
    saveState();
    renderAll();
  }

  function submitTenderBid(oppId, marginAdjust) {
    const opp = getOpportunity(oppId);
    if (!opp || !opp.tender) return;
    const tender = rivalTenderFor(oppId);
    if (!tender || tender.status === 'awarded') {
      showToast('This tender has already been awarded.');
      return;
    }
    const adj = Math.max(Math.round(-opp.basePnl * 0.7), Math.min(0, marginAdjust));
    const concessionRatio = Math.abs(adj) / opp.basePnl;
    const winPct = Math.min(95, Math.max(5, 30 + concessionRatio * 120));
    const seed = `${oppId}-tender-${state.marketCycle}-${adj}`;
    const roll = deterministicRandom(seed) * 100;
    const won = roll <= winPct;
    if (won) {
      tender.status = 'player_reserved';
      tender.awardedTo = 'player';
      state.tenderWins = (state.tenderWins || 0) + 1; addXp(25, 'tender');
      state.rivalFeed.unshift({ date: state.date, cycle: state.marketCycle, opportunityId: oppId, rivalId: 'player', title: `${state.companyName || 'Player'} secures tender`, description: `Competitive bid accepted for ${opp.title} with ${Math.round(winPct)}% win probability.` });
      state.rivalFeed = state.rivalFeed.slice(0, 18);
      // Temporarily apply margin adjustment for this deal
      if (adj !== 0) {
        const orig = opp.basePnl;
        opp.basePnl = orig + adj;
        startOpportunity(oppId);
        opp.basePnl = orig;
      } else {
        startOpportunity(oppId);
      }
      evaluateAchievements();
      showToast(`Tender won! Margin offered: ${money(opp.basePnl + adj)}. Deal started.`);
    } else {
      state.tenderLosses = (state.tenderLosses || 0) + 1;
      if (tender) tender.pressure = clamp((tender.pressure || 0) + 8, 0, 99);
      showToast(`Bid not accepted. Rival interest has risen to ${tender.pressure}%. Improve your offer or try the next cycle.`);
    }
    saveState();
    renderAll();
  }

  function canStartOpportunity(opp) {
    const stats = portfolioStats();
    const negotiation = state.negotiations?.[opp.id];
    const effectiveNegotiation = negotiation || negotiationFor(opp.id);
    const economics = opportunityEconomics(opp, effectiveNegotiation);
    const structure = economics.structure;
    const compliance = complianceProfileForOpportunity(opp);
    const commercialClearance = Boolean(opp.distressed || (negotiation?.cycle === state.marketCycle && negotiation.status === 'accepted'));
    const buyerId = partiesForOpportunity(opp).buyerId;
    const creditClearance = !buyerId || counterpartyCreditHeadroom(buyerId) >= prospectiveCreditExposure(opp, economics);
    return opportunityAvailable(opp) && commercialClearance && compliance.canTrade && creditClearance && financingAvailable(structure.financingId) && state.cash >= economics.equity + economics.initialMargin && state.cash - economics.equity - economics.initialMargin >= minimumCashReserve() && stats.creditAvailable >= economics.borrowed;
  }

  function startOpportunity(oppId) {
    const opp = getOpportunity(oppId);
    if (!opp || !isOpportunityUnlocked(opp) || !opportunityAvailable(opp)) return;
    const negotiation = state.negotiations?.[opp.id] || negotiationFor(opp.id);
    // Distressed cargo: seller is desperate — deal is pre-accepted, skip negotiation
    if (!opp.distressed) {
      if (!negotiation || negotiation.cycle !== state.marketCycle || negotiation.status !== 'accepted') {
        showToast('Negotiate and obtain buyer acceptance before opening the deal.');
        return;
      }
    }
    if (!canStartOpportunity(opp)) {
      const compliance = complianceProfileForOpportunity(opp);
      const buyerId = partiesForOpportunity(opp).buyerId;
      const economics = opportunityEconomics(opp, negotiation);
      if (!compliance.canTrade) showToast('Compliance clearance is required before the deal can be opened.');
      else if (buyerId && counterpartyCreditHeadroom(buyerId) < prospectiveCreditExposure(opp, economics)) showToast('Buyer credit limit is insufficient. Improve payment security or request a limit increase.');
      else if (state.cash - economics.equity - economics.initialMargin < minimumCashReserve()) showToast(`${activeCapitalPolicy().label} requires a minimum liquidity reserve of ${money(minimumCashReserve())}.`);
      else showToast('Insufficient capital or bank credit capacity for this deal.');
      return;
    }
    const strategy = selectedCarrierStrategies[opp.id] || 'spot';
    const fleetAsset = strategy.startsWith('fleet:') ? getFleetAsset(strategy.slice(6)) : null;
    if (fleetAsset && !fleetAssetAvailableFor(fleetAsset, opp)) {
      selectedCarrierStrategies[opp.id] = 'spot';
      return showToast('The selected vessel is no longer available or is not at the origin port.');
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
      pricingStrategy: economics.terms.pricing || 'fixed',
      receivableProtection: null,
      storageOptionUsed: false,
      storageOptionalityEntry: null,
      financingStrategy: economics.structure.financingId,
      financingRate: economics.financingRate,
      insuranceStrategy: economics.structure.insuranceId,
      inspectionStrategy: economics.structure.inspectionId,
      fxHedgeRatio: economics.structure.fxHedgeRatio,
      entryFx: state.eurusd,
      initialMargin: economics.initialMargin,
      marginCollateral: economics.initialMargin,
      marginCalls: 0,
      financingAccrued: 0,
      marketCycle: state.marketCycle,
      vesselClass: selectedVesselClasses[opp.id] || 'supramax',
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
      eventResult: null,
      complianceStatus: complianceProfileForOpportunity(opp).status,
      complianceReviewed: complianceProfileForOpportunity(opp).reviewed,
      complianceScore: complianceProfileForOpportunity(opp).score,
      delivered: false,
      deliveredAt: null,
      paymentDaysRemaining: null,
      collectionDelayDays: 0,
      overdueRecorded: false,
      invoiceStatus: 'Not issued',
      invoiceAmount: Math.round(physicalNotional(opp, economics.quantity, economics.capital) + Math.max(0, economics.basePnl || 0)),
      contractLifecycle: { nominated: true, loaded: false, delivered: false, invoiced: false, paid: false },
      procurementAgreementId: economics.procurementAgreement?.supplierId || null,
      routeCondition: { ...economics.routeCondition },
      routeMitigated: false
    };
    deal.operations = makeDealOperations(opp, deal.id, fleetAsset);
    if (opp.distressed) { state.distressedOpportunity = null; }
    const commercialLabel = negotiationProfiles.commercial[negotiation.commercial]?.label || 'Market quote';
    const paymentLabel = negotiationProfiles.payment[negotiation.payment]?.label || 'Payment at delivery';
    const pricingLabel = negotiationProfiles.pricing[negotiation.pricing || 'fixed']?.label || 'Fixed price';
    const deliveryLabel = negotiationProfiles.delivery[negotiation.delivery]?.label || 'Standard window';
    deal.operations.salesContract.terms = `${deal.operations.salesContract.terms} · ${commercialLabel} · ${paymentLabel} · ${pricingLabel} · ${deliveryLabel}`;
    deal.operations.purchaseContract.terms = `${deal.operations.purchaseContract.terms} · ${economics.structure.inspection.label}`;
    deal.operations.finance = { facility: economics.structure.financing.label, rate: economics.financingRate, insurance: economics.structure.insurance.label, fxHedgeRatio: economics.structure.fxHedgeRatio };
    if (economics.structure.inspectionId === 'independent') {
      const qualityDoc = deal.operations.documents.find(doc => /quality|assay|protein|moisture/i.test(doc.name));
      if (qualityDoc) qualityDoc.status = 'ready';
    }
    if (fleetAsset) { fleetAsset.status = 'assigned'; fleetAsset.assignedDealId = deal.id; }
    selectedCarrierStrategies[opp.id] = 'spot';
    state.cash -= deal.equity + deal.marginCollateral;
    state.activeDeals.push(deal);
    registerProcurementLift(opp, deal, economics);
    state.negotiations[opp.id] = { ...negotiation, status: 'consumed' };
    recordJournal('Deal opened', opp.title, `${getHub(opp.origin).name} → ${getHub(opp.destination).name} · ${economics.quantity.toLocaleString('en-US')} t · hedge ${deal.hedgeRatio}% · ${deal.complianceStatus}`, -(deal.equity + deal.marginCollateral), deal.id);
    saveState();
    selectDeal(deal.id);
    activeLeftTab = 'portfolio';
    renderTabs();
    renderAll();
    showToast(`${opp.title} started: capital allocated and shipment opened.`);
  }

  function protectReceivable(dealId, type) {
    const deal = getActiveDeal(dealId);
    if (!deal || deal.receivableProtection || deal.commercialTerms?.payment !== 'thirty') return;
    const notional = physicalNotional(getOpportunity(deal.opportunityId), deal.quantity, deal.capital);
    const profile = type === 'factor'
      ? { label:'Receivable factored', cost:Math.round(notional*.012), lossFactor:0 }
      : { label:'Trade credit insurance', cost:Math.round(notional*.0065), lossFactor:.12 };
    deal.receivableProtection = { type, label:profile.label, lossFactor:profile.lossFactor, cost:profile.cost };
    deal.pnlAdjustments -= profile.cost;
    state.receivableProtectionCost = (state.receivableProtectionCost||0) + profile.cost;
    saveState(); renderAll(); showToast(`${profile.label} secured for ${money(profile.cost)}.`);
  }

  function exerciseStorageOption(dealId) {
    const deal = getActiveDeal(dealId);
    if (!deal || deal.storageOptionUsed || !deal.operations?.storage?.active || deal.commercialTerms?.delivery !== 'flexible') return;
    const warehouseDiscount=storageDiscountForHub(deal.operations?.storage?.hubId);
    const dailyCost = Math.max(900, Math.round((deal.capital||0)*.00022*(1-warehouseDiscount)));
    const days = 7;
    deal.storageOptionUsed = true;
    deal.storageOptionalityEntry = marketPriceForOpportunity(getOpportunity(deal.opportunityId));
    deal.storageOptionalityShare = .20;
    deal.duration += days;
    deal.pnlAdjustments -= dailyCost*days;
    deal.operations.storage.days += days;
    deal.eventResult = `Warehouse optionality exercised: 20% of the flexible parcel held for ${days} days.`;
    saveState(); renderAll(); showToast(`Warehouse option exercised. Cost ${money(dailyCost*days)}.`);
  }

  function storageOptionalityPnl(deal) {
    if (!deal.storageOptionUsed || !deal.storageOptionalityEntry) return 0;
    const opp = getOpportunity(deal.opportunityId);
    const move = marketPriceForOpportunity(opp) - deal.storageOptionalityEntry;
    return Math.max(0, move) * (deal.quantity||opp.quantity) * unitMultiplierForOpportunity(opp) * (deal.storageOptionalityShare||.2);
  }

  function settlementCreditPnl(deal) {
    if (deal.commercialTerms?.payment !== 'thirty') return { pnl:0, label:'Payment secured at delivery' };
    const buyer = getCounterparty(deal.buyerId);
    const relationship = getCounterpartyState(deal.buyerId);
    const protection = deal.receivableProtection;
    const financeShield = deal.financingStrategy === 'lc' ? .32 : 1;
    const probability = clamp((100-(buyer?.credit||70))*.38 + Math.max(0,55-(relationship.relationship||50))*.22 + (state.difficulty==='expert'?5:0), 1, 24) * financeShield;
    const roll = deterministicRandom(`${deal.id}-credit-${state.marketCycle}`)*100;
    if (roll > probability) return { pnl:0, label:protection ? `${protection.label}; buyer paid on time` : 'Buyer paid on time' };
    const grossLoss = Math.min(120_000, Math.round((deal.capital||0)*(.018 + deterministicRandom(`${deal.id}-credit-loss`)*.022)));
    const loss = Math.round(grossLoss * (protection?.lossFactor ?? 1));
    state.creditLosses = (state.creditLosses||0) + loss;
    relationship.disputes = (relationship.disputes||0) + 1;
    relationship.relationship = clamp((relationship.relationship||50)-4,0,100);
    return { pnl:-loss, label: protection ? `Buyer delay/default mitigated by ${protection.label}` : 'Uninsured buyer delay/default' };
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
      openInspector();
      showToast(`Decision required: ${opp.event.title}`);
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
    recordJournal('Operations', `${opp.event.title}: ${choice.label}`, outcome.result, mitigatedPnl, deal.id);
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
    recordJournal('Risk', `${opp.title}: hedge raised to 100%`, `Residual market exposure crystallized and hedge reset at the current market price.`, realizedMarketImpact - transactionCost, deal.id);
    deal.hedgeTransactions = (deal.hedgeTransactions || 1) + 1;
    updateMarginLiquidity(deal);
    saveState();
    renderAll();
    showToast(`Hedge increased to 100%. Operating cost ${money(transactionCost)}.`);
  }

  function collectionDelayForDeal(deal) {
    if (deal.commercialTerms?.payment !== 'thirty') return 0;
    if (deal.receivableProtection?.type === 'factor' || deal.financingStrategy === 'lc') return 0;
    const buyer = getCounterparty(deal.buyerId);
    const relationship = getCounterpartyState(deal.buyerId);
    const risk = clamp((100 - (buyer?.credit || 70)) * .42 + Math.max(0, 58 - (relationship.relationship || 50)) * .18 + (state.difficulty === 'expert' ? 5 : 0), 1, 30);
    const roll = deterministicRandom(`${deal.id}-collection-delay-${state.marketCycle}`) * 100;
    if (roll >= risk) return 0;
    const severity = deterministicRandom(`${deal.id}-collection-severity`);
    const rawDays = severity < .55 ? 5 : severity < .86 ? 10 : 20;
    return deal.receivableProtection?.type === 'insurance' ? Math.max(2, Math.round(rawDays * .6)) : rawDays;
  }

  function deliverDeal(deal) {
    if (!deal || deal.delivered) return;
    const opp = getOpportunity(deal.opportunityId);
    deal.deliveryMarketPnl = computeMarketImpact(deal);
    deal.deliveryFxPnl = computeFxImpact(deal);
    deal.delivered = true;
    deal.deliveredAt = state.date;
    deal.elapsed = Math.max(deal.elapsed, deal.duration);
    deal.paymentDaysRemaining = paymentDaysForDeal(deal);
    deal.collectionDelayDays = collectionDelayForDeal(deal);
    deal.overdueRecorded = false;
    deal.invoiceStatus = deal.paymentDaysRemaining > 0 ? 'Outstanding' : 'Due';
    deal.contractLifecycle = { ...(deal.contractLifecycle || {}), nominated:true, loaded:true, delivered:true, invoiced:true, paid:false };
    if (deal.marginCollateral > 0) { state.cash += deal.marginCollateral; deal.marginCollateral = 0; }
    updateDealOperations(deal);
    if (deal.fleetAssetId) {
      const fleetAsset = getFleetAsset(deal.fleetAssetId);
      if (fleetAsset) { fleetAsset.status = 'available'; fleetAsset.assignedDealId = null; fleetAsset.positionHub = opp.destination; }
    }
    recordJournal('Delivery', `${opp.title} delivered`, `${deal.invoiceStatus} invoice ${deal.operations?.contractId || deal.id} · ${deal.paymentDaysRemaining} payment days`, 0, deal.id);
    state.worldEventFeed.unshift({ type:'contract', title:`Cargo delivered · ${opp.title}`, date:state.date, description:deal.paymentDaysRemaining ? `Invoice issued for ${money(deal.invoiceAmount)}. Payment due in ${deal.paymentDaysRemaining} days.` : 'Payment is due at delivery; settlement is processing.' });
    state.worldEventFeed = state.worldEventFeed.slice(0,18);
    if (deal.paymentDaysRemaining <= 0) completeDeal(deal);
    else showToast(`${opp.title} delivered. Invoice due in ${deal.paymentDaysRemaining} days.`);
  }

  function completeDeal(deal) {
    const opp = getOpportunity(deal.opportunityId);
    const marketPnl = computeMarketImpact(deal);
    const fxPnl = computeFxImpact(deal);
    const financingCost = deal.financingAccrued || 0;
    const storagePnl = storageOptionalityPnl(deal);
    const creditResult = settlementCreditPnl(deal);
    const creditPnl = creditResult.pnl || 0;
    const pnl = deal.basePnl + deal.pnlAdjustments - financingCost + marketPnl + fxPnl + storagePnl + creditPnl;
    deal.invoiceStatus = 'Paid';
    deal.paymentDaysRemaining = 0;
    deal.collectionDelayDays = 0;
    deal.contractLifecycle = { ...(deal.contractLifecycle || {}), delivered:true, invoiced:true, paid:true };
    state.receivablesCollected = (state.receivablesCollected || 0) + (deal.invoiceAmount || 0);
    state.storageOptionIncome = (state.storageOptionIncome||0) + storagePnl;
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
      eventResult: [deal.eventResult, creditResult.label].filter(Boolean).join(' · '),
      operationalReadiness: readiness,
      carrier: deal.operations?.transport?.carrier || 'N/A',
      charterType: deal.operations?.transport?.charterType || 'N/A',
      demurrage: deal.operations?.transport?.demurrageAccrued || 0,
      hedgeRatio: deal.hedgeRatio || 0,
      shippingStrategy: deal.shippingStrategy || 'spot-carrier',
      commodity: opp.commodity,
      priceKey: opp.priceKey,
      quantity: deal.quantity || opp.quantity,
      supplierId: deal.supplierId,
      buyerId: deal.buyerId,
      commercialTerms: deal.commercialTerms,
      financingStrategy: deal.financingStrategy,
      insuranceStrategy: deal.insuranceStrategy,
      inspectionStrategy: deal.inspectionStrategy,
      fxHedgeRatio: deal.fxHedgeRatio || 0,
      marginCalls: deal.marginCalls || 0,
      pricingStrategy: deal.pricingStrategy || 'fixed',
      receivableProtection: deal.receivableProtection?.label || null,
      storageOptionality: storagePnl,
      creditPnl,
      pnlBreakdown: { commercial: deal.basePnl, operations: deal.pnlAdjustments, financing: -financingCost, market: marketPnl, fx: fxPnl, storage: storagePnl, credit: creditPnl, demurrage: -(deal.operations?.transport?.demurrageAccrued || 0) },
      globalEventImpacts: deal.globalEventImpacts || [],
      verticalSources: deal.verticalSources || [],
      complianceStatus: deal.complianceStatus || 'Clear',
      complianceScore: deal.complianceScore || 0,
      deliveredAt: deal.deliveredAt || state.date,
      invoiceAmount: deal.invoiceAmount || 0,
      invoiceStatus: deal.invoiceStatus || 'Paid',
      paymentTerms: negotiationProfiles.payment[deal.commercialTerms?.payment || 'delivery']?.label || 'Payment at delivery'
    });
    recordJournal('Settlement', `${opp.title} settled`, `Realized P&L ${money(pnl)} · operational readiness ${Math.round(readiness)}% · compliance ${deal.complianceStatus || 'Clear'}`, pnl, deal.id);
    state.history = state.history.slice(0, 60);
    state.activeDeals = state.activeDeals.filter(d => d.id !== deal.id);
    state.valuationHigh = Math.max(state.valuationHigh||0, tradingHouseValuation().value);
    evaluateMissions();
    evaluateAchievements();
    selected = { type: 'hub', id: 'geneva' };
    focusOnHub('geneva');
    { const _ps = _soundSuppressed; _soundSuppressed = true; showToast(`${opp.title} closed with ${money(pnl)} P&L.`, pnl >= 0 ? 'success' : 'warning'); _soundSuppressed = _ps; }
    try { Sound.play(pnl >= 0 ? 'deal' : 'error'); } catch (e) {}
    addXp(20 + Math.max(0, Math.min(80, Math.round(pnl / 5000))), 'deal');
  }

  // ─── Commodity price news headline catalog ─────────────────────────────────
  const _priceNews = {
    copper: {
      up:   ['BHP mine disruption tightens copper supply','Chinese EV demand lifts copper premiums','LME copper backwardation widens on low stocks','Codelco force majeure boosts copper spread','Supply disruption at major Zambia mine','Copper scrap availability tightens in Europe'],
      down: ['Chinese industrial data disappoints base metals','LME copper stocks rise at Rotterdam warehouses','Risk-off macro environment weighs on metals','Scrap substitution rises on elevated copper price','Demand softness in Chinese construction sector','Chilean exports accelerate on weaker peso']
    },
    aluminium: {
      up:   ['Power curtailments reduce Chinese aluminium output','Bauxite export restrictions tighten supply chain','EU energy crisis lifts aluminium smelting costs','Atlantic arbitrage widens on low European stocks'],
      down: ['Chinese aluminium production data beats expectations','Hydropower capacity returns in Yunnan province','Demand softness in automotive and packaging sector','LME aluminium warrant cancellations fall']
    },
    crude: {
      up:   ['OPEC+ announces unexpected production cut','US crude inventory draw exceeds expectations','Middle East tension premium re-enters the market','Refinery outages tighten refined product supply'],
      down: ['OPEC spare capacity signals ease market concerns','Demand outlook weakened by macro headwinds','US shale output beats monthly estimates','IEA raises global demand growth forecast lower']
    },
    wheat: {
      up:   ['Black Sea export corridor disruption lifts grain','Adverse weather forecast hits European crop outlook','Argentine peso weakness may cut export competitiveness','Wheat tender from Egypt lifts benchmark prices'],
      down: ['Australia harvest estimates revised higher','Russian export quota raised for current season','Global wheat carry-out projections improve','Rain improves US winter wheat condition ratings']
    },
    ironore: {
      up:   ['China steel mills restock on improved demand signals','Pilbara port scheduling disruption tightens supply','Brazilian iron ore shipments delayed by weather','Steel margin recovery lifts iron ore demand'],
      down: ['China construction activity softens demand outlook','Steel mill margins compress on rising coke costs','Indian ore exports accelerate into Asian markets','Chinese steel inventories build above seasonal norms']
    },
    coffee: {
      up:   ['Brazilian frost risk premium enters arabica market','Vietnam robusta crop forecast cut on dry weather','ICO export data shows tighter-than-expected supply','Colombian production hampered by La Niña rains'],
      down: ['Brazil harvest weather improves crop estimates','Certified arabica warehouse stocks rise in New York','Vietnamese output recovery weighs on robusta','Global coffee demand softens in key European markets']
    },
    urea: {
      up:   ['Gas curtailments reduce European urea output','India tender demand lifts benchmark urea price','Spring planting season drives fertilizer buying','Egypt export restrictions tighten Mediterranean supply'],
      down: ['Chinese urea export window may reopen on inventory','Gas prices ease, restoring production economics','Seasonal demand lull weighs on nitrogen markets','Brazilian import demand finishes for the season']
    },
    zinc: { up:['Smelter maintenance tightens refined zinc supply','LME zinc stocks fall on stronger galvanizing demand'], down:['Chinese zinc output recovers after maintenance','Galvanized steel demand softens in Europe'] },
    nickel: { up:['Indonesia policy tightens Class I nickel availability','Battery-grade nickel premiums strengthen in Europe'], down:['Indonesian nickel output exceeds market expectations','Stainless demand slowdown weighs on nickel'] },
    lng: { up:['European utilities accelerate spot LNG buying','Asian LNG demand tightens Atlantic basin supply'], down:['Mild weather reduces European gas demand','High storage levels weigh on spot LNG prices'] }
  };

  function generatePriceNews(key, prevPrice, newPrice, date) {
    const pct = (newPrice - prevPrice) / prevPrice;
    if (Math.abs(pct) < 0.007) return null; // threshold: 0.7% move
    const dir = pct > 0 ? 'up' : 'down';
    const templates = _priceNews[key]?.[dir];
    if (!templates?.length) return null;
    const idx = Math.floor(deterministicRandom(date.toISOString() + '-news-' + key) * templates.length);
    const sign = pct > 0 ? '+' : '';
    const labels = { copper: 'Copper', aluminium: 'Aluminium', crude: 'Crude', wheat: 'Wheat', ironore: 'Iron ore', coffee: 'Coffee', urea: 'Urea', zinc:'Zinc', nickel:'Nickel', lng:'LNG' };
    return {
      type: 'market',
      title: templates[idx],
      date: date.toISOString(),
      description: `${labels[key] || key}: ${sign}${(pct * 100).toFixed(1)}% — price moves to ${key === 'crude' ? `$${newPrice.toFixed(2)}/bbl` : key === 'urea' || key === 'wheat' ? `$${Math.round(newPrice)}/t` : key === 'coffee' ? `$${Math.round(newPrice)}/t` : money(Math.round(newPrice)) + '/t'}.`
    };
  }

  // ─── Seasonal volatility per commodity (month 0-11 index) ──────────────────
  const _seasonalVol = {
    copper:    [1.00,1.00,1.05,1.10,1.05,1.00,0.95,0.90,1.00,1.05,1.00,0.95],
    aluminium: [0.95,0.95,1.00,1.05,1.05,1.00,0.95,0.90,1.00,1.05,1.00,0.95],
    urea:      [1.10,1.00,1.10,1.20,0.95,0.85,0.80,0.85,1.00,1.15,1.10,1.05],
    crude:     [1.10,1.05,1.00,0.95,1.00,1.10,1.15,1.10,0.95,0.90,1.00,1.15],
    wheat:     [0.90,0.85,0.95,1.10,1.20,1.35,1.40,1.20,0.90,0.80,0.85,0.90],
    ironore:   [0.95,1.00,1.10,1.15,1.05,0.95,0.90,0.85,1.00,1.10,1.05,0.95],
    coffee:    [0.90,0.90,1.00,1.10,1.30,1.40,1.35,1.10,1.00,1.20,1.10,0.95],
    zinc:      [0.95,0.95,1.00,1.05,1.05,1.00,0.95,0.95,1.00,1.05,1.05,1.00],
    nickel:    [1.05,1.00,1.10,1.15,1.05,1.00,0.95,0.95,1.05,1.10,1.05,1.00],
    lng:       [1.30,1.20,1.05,0.90,0.80,0.75,0.80,0.85,0.95,1.10,1.20,1.35]
  };
  function seasonalPriceVolatility(key, date) {
    return (_seasonalVol[key] || [])[date.getUTCMonth()] || 1;
  }

  // ─── Market Intelligence report ──────────────────────────────────────────
  function buyMarketIntel() {
    const cost = 18_000;
    const cooldownDays = 5;
    if (state.completedDeals < 1) return showToast('Complete at least one deal to access market intelligence.');
    if ((state.dayIndex||0) - (state.intelCooldownDay||0) < cooldownDays) {
      const wait = cooldownDays - ((state.dayIndex||0) - (state.intelCooldownDay||0));
      return showToast(`Research desk is still compiling. Available in ${wait} day${wait > 1 ? 's' : ''}.`);
    }
    if (state.cash < cost) return showToast(`Insufficient liquidity. Research report costs ${money(cost)}.`);
    state.cash -= cost;
    state.intelCooldownDay = state.dayIndex || 0;
    // Compute a forward-looking directional bias for top commodities
    const date = currentDate();
    const nextDate1 = new Date(date); nextDate1.setUTCDate(date.getUTCDate() + 1);
    const nextDate2 = new Date(date); nextDate2.setUTCDate(date.getUTCDate() + 2);
    const nextDate3 = new Date(date); nextDate3.setUTCDate(date.getUTCDate() + 3);
    function priceDirection(key, priceNow, dateSeeds) {
      // Reproduce noise formula to find direction (same deterministic seed logic)
      const equilibria = { copper: 9500, aluminium: 2450, urea: 360, crude: 78.5, wheat: 245, ironore: 108, coffee: 4200 };
      const noiseAmp = { copper: [18,34], aluminium: [7,15], urea: [1.6,4.5], crude: [0.45,1.45], wheat: [1.3,4.2], ironore: [0.55,1.8], coffee: [18,46] };
      let price = priceNow;
      let delta = 0;
      const regime = currentMarketRegime();
      const vol = regime.volatility || 1;
      for (const d of dateSeeds) {
        const s = deterministicRandom(d.toISOString());
        const s2 = deterministicRandom(d.toISOString() + '-' + key.slice(0,2));
        const amp = noiseAmp[key] || [1, 2];
        const mr = (equilibria[key] - price) * 0.018;
        const noise = (Math.sin(d.getUTCDate() * 0.43) * amp[0] + (s2 - 0.5) * amp[1] + mr) * vol * seasonalPriceVolatility(key, d);
        delta += noise;
        price += noise;
      }
      return delta;
    }
    const commodityMap = [
      { key: 'copper', label: 'Copper', price: state.copperPrice },
      { key: 'crude', label: 'Crude', price: state.crudePrice },
      { key: 'wheat', label: 'Wheat', price: state.wheatPrice },
      { key: 'coffee', label: 'Coffee', price: state.coffeePrice },
      { key: 'ironore', label: 'Iron ore', price: state.ironorePrice }
    ];
    const dateSeeds = [nextDate1, nextDate2, nextDate3];
    const directions = commodityMap.map(c => {
      const delta = priceDirection(c.key, c.price, dateSeeds);
      return { ...c, delta, arrow: delta > 0 ? '↑' : '↓', bias: Math.abs(delta) > (c.price * 0.006) ? 'strong' : 'mild' };
    });
    // Event risk
    const daysToEvent = Math.max(0, (state.nextGlobalEventDay||0) - (state.dayIndex||0));
    const eventRisk = daysToEvent <= 2 ? 'HIGH' : daysToEvent <= 5 ? 'MEDIUM' : 'LOW';
    // Freight outlook
    const freightDir = currentMarketRegime().freightBias > 0 ? 'tightening' : currentMarketRegime().freightBias < 0 ? 'softening' : 'stable';
    state.intelReport = { day: state.dayIndex, directions, eventRisk, daysToEvent, freightDir, regime: currentMarketRegime().label };
    state.worldEventFeed.unshift({ type: 'market', title: 'Market intelligence report issued', date: state.date, description: `Analysis desk delivered a 3-day directional outlook. Cost: ${money(cost)}.` });
    state.worldEventFeed = state.worldEventFeed.slice(0, 14);
    saveState(); renderAll();
    showToast('Market intelligence report ready — see World Events.');
  }

  // ─── Mid-deal hedge adjustment ──────────────────────────────────────────────
  function rehedgeDeal(dealId, newRatio) {
    const deal = getActiveDeal(dealId);
    if (!deal) return;
    const opp = getOpportunity(deal.opportunityId);
    const progress = computeDealProgress(deal);
    if (progress < 0.12 || progress > 0.88) return showToast('Rehedging is only possible while the cargo is in transit.');
    const oldRatio = deal.hedgeRatio || 0;
    const deltaRatio = Math.abs(newRatio - oldRatio);
    if (deltaRatio < 1) return showToast('Minimum hedge adjustment is 1%.');
    if (newRatio < 0 || newRatio > 110) return showToast('Hedge ratio must be between 0% and 110%.');
    const cost = Math.round(8_000 + deltaRatio * 200); // base + execution cost per %
    if (state.cash < cost) return showToast(`Insufficient liquidity. Rehedge execution costs ${money(cost)}.`);
    state.cash -= cost;
    deal.pnlAdjustments -= cost;
    deal.hedgeRatio = newRatio;
    updateMarginLiquidity(deal);
    state.worldEventFeed.unshift({ type: 'market', title: `Hedge adjusted: ${opp.title}`, date: state.date, description: `Hedge ratio moved from ${oldRatio}% to ${newRatio}%. Execution cost ${money(cost)}.` });
    state.worldEventFeed = state.worldEventFeed.slice(0, 18);
    saveState(); renderAll();
    showToast(`Hedge adjusted to ${newRatio}%. Cost: ${money(cost)}.`);
  }

  // ─── Warm outreach to counterparty ──────────────────────────────────────
  function warmOutreach(cpId) {
    const cost = 5_000;
    const cooldown = 14;
    const lastDay = (state.cpOutreachDays || {})[cpId] || -99;
    if ((state.dayIndex||0) - lastDay < cooldown) {
      const wait = cooldown - ((state.dayIndex||0) - lastDay);
      return showToast(`Outreach cooldown: available in ${wait} day${wait > 1 ? 's' : ''}.`);
    }
    if (state.cash < cost) return showToast(`Insufficient liquidity. Outreach costs ${money(cost)}.`);
    const cp = counterpartyCatalog.find(p => p.id === cpId);
    if (!cp) return;
    state.cash -= cost;
    state.cpOutreachDays = state.cpOutreachDays || {};
    state.cpOutreachDays[cpId] = state.dayIndex || 0;
    const record = getCounterpartyState(cpId);
    record.relationship = clamp((record.relationship || 50) + 3, 0, 100);
    saveState(); renderAll();
    showToast(`Outreach to ${cp.name} complete. Relationship +3.`);
  }

  function advanceDay({ silent = false, deferRender = false } = {}) {
    if (state.activeDeals.some(d => d.pendingDecision)) {
      const pending = state.activeDeals.find(d => d.pendingDecision);
      selectDeal(pending.id);
      if (!silent) showToast('Resolve the open operational decision first.');
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
    state.zincPrev = state.zincPrice;
    state.nickelPrev = state.nickelPrice;
    state.lngPrev = state.lngPrice;
    const seed = deterministicRandom(state.date);
    const regime = currentMarketRegime();
    const volatility = regime.volatility || 1;
    const crisisDrift = key => activeCrisisDefinitions().filter(event => event.commodity === key).reduce((sum,event)=>sum+(event.dailyDrift||0),0);
    // Mean reversion toward equilibrium prices (prevents runaway drift)
    const _eq = { copper: 9500, aluminium: 2450, urea: 360, crude: 78.5, wheat: 245, ironore: 108, coffee: 4200, zinc: 2800, nickel: 16000, lng: 12.5 };
    const _mrStrength = 0.018;
    const copperMR    = (state.copperPrice    - _eq.copper)    * _mrStrength;
    const aluminiumMR = (state.aluminiumPrice - _eq.aluminium) * _mrStrength;
    const ureaMR      = (state.ureaPrice      - _eq.urea)      * _mrStrength;
    const crudeMR     = (state.crudePrice     - _eq.crude)     * _mrStrength;
    const wheatMR     = (state.wheatPrice     - _eq.wheat)     * _mrStrength;
    const ironMR      = (state.ironorePrice   - _eq.ironore)   * _mrStrength;
    const coffeeMR    = (state.coffeePrice    - _eq.coffee)    * _mrStrength;
    const zincMR      = (state.zincPrice      - _eq.zinc)      * _mrStrength;
    const nickelMR    = (state.nickelPrice    - _eq.nickel)    * _mrStrength;
    const lngMR       = (state.lngPrice       - _eq.lng)       * _mrStrength;
    // Seasonal multipliers (month-specific volatility per commodity)
    const svCopper    = seasonalPriceVolatility('copper',    date);
    const svAluminium = seasonalPriceVolatility('aluminium', date);
    const svUrea      = seasonalPriceVolatility('urea',      date);
    const svCrude     = seasonalPriceVolatility('crude',     date);
    const svWheat     = seasonalPriceVolatility('wheat',     date);
    const svIronore   = seasonalPriceVolatility('ironore',   date);
    const svCoffee    = seasonalPriceVolatility('coffee',    date);
    const svZinc      = seasonalPriceVolatility('zinc',      date);
    const svNickel    = seasonalPriceVolatility('nickel',    date);
    const svLng       = seasonalPriceVolatility('lng',       date);
    // Base noise (same deterministic seeds as before) + seasonal vol + mean reversion
    const copperNoise    = ((Math.sin(date.getUTCDate() * .71 + date.getUTCMonth()) * 18 + (seed - .5) * 34 + crisisDrift('copper')) * volatility * svCopper) - copperMR;
    const aluminiumNoise = ((Math.cos(date.getUTCDate() * .53 + date.getUTCMonth() * .7) * 7 + (deterministicRandom(state.date + '-al') - .5) * 15 + crisisDrift('aluminium')) * volatility * svAluminium) - aluminiumMR;
    const ureaNoise      = ((Math.sin(date.getUTCDate() * .27 + date.getUTCMonth() * .9) * 1.6 + (deterministicRandom(state.date + '-ur') - .5) * 4.5 + crisisDrift('urea')) * volatility * svUrea) - ureaMR;
    const crudeNoise     = ((Math.sin(date.getUTCDate() * .43) * .45 + (deterministicRandom(state.date + '-cr') - .5) * 1.45 + crisisDrift('crude')) * volatility * svCrude) - crudeMR;
    const wheatNoise     = ((Math.cos(date.getUTCDate() * .37) * 1.3 + (deterministicRandom(state.date + '-wh') - .5) * 4.2 + crisisDrift('wheat')) * volatility * svWheat) - wheatMR + crudeNoise * 0.08;
    const ironNoise      = ((Math.sin(date.getUTCDate() * .32) * .55 + (deterministicRandom(state.date + '-io') - .5) * 1.8 + crisisDrift('ironore')) * volatility * svIronore) - ironMR;
    const coffeeNoise    = ((Math.cos(date.getUTCDate() * .25) * 18 + (deterministicRandom(state.date + '-co') - .5) * 46 + crisisDrift('coffee')) * volatility * svCoffee) - coffeeMR;
    const zincNoise      = ((Math.sin(date.getUTCDate() * .36) * 8 + (deterministicRandom(state.date + '-zn') - .5) * 22 + crisisDrift('zinc')) * volatility * svZinc) - zincMR;
    const nickelNoise    = ((Math.cos(date.getUTCDate() * .29) * 48 + (deterministicRandom(state.date + '-ni') - .5) * 145 + crisisDrift('nickel')) * volatility * svNickel) - nickelMR;
    const lngNoise       = ((Math.sin(date.getUTCDate() * .41) * .12 + (deterministicRandom(state.date + '-lng') - .5) * .38 + crisisDrift('lng')) * volatility * svLng) - lngMR;
    const fxNoise        = (Math.sin(date.getUTCDate() * .39) * .0011 + (deterministicRandom(state.date + '-fx') - .5) * .0025) * volatility + (regime.id === 'riskon' ? .0006 : regime.id === 'soft' ? -.0004 : 0);
    const freightNoise   = (Math.cos(date.getUTCDate() * .31) * .65 + (deterministicRandom(state.date + '-fr') - .5) * 1.4 + activeCrisisDefinitions().length * .08) * volatility + regime.freightBias + crudeNoise * 0.18;
    state.copperPrice    = clamp(state.copperPrice    + copperNoise,    8200,  11600);
    state.aluminiumPrice = clamp(state.aluminiumPrice + aluminiumNoise, 1950,   3100);
    state.ureaPrice      = clamp(state.ureaPrice      + ureaNoise,       250,    580);
    state.crudePrice     = clamp(state.crudePrice     + crudeNoise,       52,    116);
    state.wheatPrice     = clamp(state.wheatPrice     + wheatNoise,      175,    365);
    state.ironorePrice   = clamp(state.ironorePrice   + ironNoise,        72,    168);
    state.coffeePrice    = clamp(state.coffeePrice    + coffeeNoise,     2900,   6100);
    state.zincPrice      = clamp(state.zincPrice      + zincNoise,       2100,   3900);
    state.nickelPrice    = clamp(state.nickelPrice    + nickelNoise,    10500,  28000);
    state.lngPrice       = clamp(state.lngPrice       + lngNoise,         5.5,   28.0);
    state.eurusd         = clamp(state.eurusd         + fxNoise,          .94,   1.24);
    state.freightIndex   = clamp(state.freightIndex   + freightNoise,     68,    165);
    // Generate price news headlines for significant moves
    const _newsChecks = [
      ['copper',    state.copperPrev,    state.copperPrice],
      ['aluminium', state.aluminiumPrev, state.aluminiumPrice],
      ['crude',     state.crudePrev,     state.crudePrice],
      ['wheat',     state.wheatPrev,     state.wheatPrice],
      ['ironore',   state.ironorePrev,   state.ironorePrice],
      ['coffee',    state.coffeePrev,    state.coffeePrice],
      ['urea',      state.ureaPrev,      state.ureaPrice],
      ['zinc',      state.zincPrev,      state.zincPrice],
      ['nickel',    state.nickelPrev,    state.nickelPrice],
      ['lng',       state.lngPrev,       state.lngPrice]
    ];
    let newsAdded = 0;
    for (const [key, prev, curr] of _newsChecks) {
      if (newsAdded >= 2) break; // max 2 headlines per day
      const item = generatePriceNews(key, prev, curr, date);
      if (item) { state.worldEventFeed.unshift(item); newsAdded++; }
    }
    if (newsAdded) state.worldEventFeed = state.worldEventFeed.slice(0, 18);
    advanceFleetDay();
    // Update hub basis differentials (premium/discount vs global benchmark, in price units)
    const _hubBasisConfig = {
      'geneva':       { copper: { s:+18, r:.05 }, aluminium: { s:+12, r:.05 } },
      'london':       { copper: { s:+22, r:.04 }, aluminium: { s:+15, r:.04 } },
      'singapore':    { crude:  { s:-1.2, r:.04 }, wheat: { s:-8, r:.05 } },
      'shanghai':     { copper: { s:-30, r:.06 }, ironore: { s:-15, r:.06 } },
      'dubai':        { crude:  { s:-0.8, r:.04 }, urea: { s:-12, r:.05 } },
      'houston':      { crude:  { s:+0.6, r:.04 }, wheat: { s:+6, r:.05 } },
      'new-orleans':  { wheat:  { s:+10, r:.05 }, coffee: { s:-18, r:.04 } },
      'antwerp':      { copper: { s:+8, r:.04 }, aluminium: { s:+10, r:.04 }, ironore: { s:+5, r:.05 } },
      'santos':       { coffee: { s:-40, r:.06 }, wheat: { s:+5, r:.05 } },
      'abidjan':      { coffee: { s:-50, r:.07 } },
      'lagos':        { crude:  { s:-3.0, r:.05 } },
      'port-klang':   { crude:  { s:-1.5, r:.04 } },
      'doha':         { urea:   { s:-18, r:.05 }, crude: { s:-2.5, r:.04 } },
      'buenos-aires': { wheat:  { s:+8, r:.05 } },
    };
    state.hubBasis = state.hubBasis || {};
    Object.entries(_hubBasisConfig).forEach(([hubId, comms]) => {
      state.hubBasis[hubId] = state.hubBasis[hubId] || {};
      Object.entries(comms).forEach(([key, cfg]) => {
        const prev = state.hubBasis[hubId][key] ?? cfg.s;
        const noise = (Math.random() - 0.5) * Math.abs(cfg.s) * 0.08;
        state.hubBasis[hubId][key] = prev + (cfg.s - prev) * cfg.r + noise;
      });
    });

    // Update term structure (contango = positive → near price < forward; backwardation = negative)
    // Driven by inventory tightness proxy: price deviation from equilibrium and regime
    const _updateTermStructure = (key, price, eq, regimeId) => {
      const deviation = (price - eq) / eq; // positive = above eq → backwardation signal
      const regimeBias = regimeId === 'squeeze' ? -0.12 : regimeId === 'soft' ? 0.08 : regimeId === 'freight' ? 0.05 : 0;
      const prev = state.termStructure[key] || 0;
      const target = clamp(-deviation * 1.8 + regimeBias, -0.5, 0.5);
      state.termStructure[key] = prev * 0.85 + target * 0.15; // smooth
    };
    const _reg = currentMarketRegime().id;
    _updateTermStructure('copper',    state.copperPrice,    _eq.copper,    _reg);
    _updateTermStructure('aluminium', state.aluminiumPrice, _eq.aluminium, _reg);
    _updateTermStructure('crude',     state.crudePrice,     _eq.crude,     _reg);
    _updateTermStructure('wheat',     state.wheatPrice,     _eq.wheat,     _reg);
    _updateTermStructure('ironore',   state.ironorePrice,   _eq.ironore,   _reg);
    _updateTermStructure('coffee',    state.coffeePrice,    _eq.coffee,    _reg);
    _updateTermStructure('urea',      state.ureaPrice,      _eq.urea,      _reg);
    _updateTermStructure('zinc',      state.zincPrice,      _eq.zinc,      _reg);
    _updateTermStructure('nickel',    state.nickelPrice,    _eq.nickel,    _reg);
    _updateTermStructure('lng',       state.lngPrice,       _eq.lng,       _reg);
    // Compute synthetic forward curve M1-M6 for each major commodity
    const _fwdComms = [
      ['copper', state.copperPrice], ['aluminium', state.aluminiumPrice],
      ['urea', state.ureaPrice],     ['crude', state.crudePrice],
      ['wheat', state.wheatPrice],   ['ironore', state.ironorePrice],
      ['coffee', state.coffeePrice], ['zinc', state.zincPrice],
      ['nickel', state.nickelPrice], ['lng', state.lngPrice],
    ];
    state.forwardCurve = {};
    _fwdComms.forEach(([key, spot]) => {
      const ts = state.termStructure[key] || 0;
      state.forwardCurve[key] = [1,2,3,4,5,6].map(m => {
        const carry = Math.pow(1 + ts * 0.12, m);
        const noise = 1 + (deterministicRandom(`fwd-${key}-${state.date}-${m}`) - 0.5) * 0.004;
        return Math.round(spot * carry * noise * 100) / 100;
      });
    });
    // Record rolling price history (last 90 days) per commodity
    state.priceHistory = state.priceHistory || {};
    _fwdComms.forEach(([key, spot]) => {
      const arr = state.priceHistory[key] || [];
      arr.push(Math.round(spot * 100) / 100);
      if (arr.length > 90) arr.shift();
      state.priceHistory[key] = arr;
    });
    const overhead = dailyOverhead();
    state.cash -= overhead;
    state.overheadPaid = (state.overheadPaid || 0) + overhead;
    processInvestmentDay();
    processShopDay();
    processCreditLimitRequests();
    processProcurementAgreements();

    let eventTriggered = false;
    for (const deal of [...state.activeDeals]) {
      accrueDailyFinancing(deal);
      if (deal.delivered) {
        if ((deal.paymentDaysRemaining || 0) > 0) {
          deal.paymentDaysRemaining = Math.max(0, deal.paymentDaysRemaining - 1);
          if (deal.paymentDaysRemaining <= 0 && (deal.collectionDelayDays || 0) > 0) {
            deal.invoiceStatus = 'Overdue';
            if (!deal.overdueRecorded) {
              deal.overdueRecorded = true;
              state.overdueReceivables = (state.overdueReceivables || 0) + 1;
              recordJournal('Credit', `${getOpportunity(deal.opportunityId).title}: invoice overdue`, `${deal.collectionDelayDays} additional collection days expected.`, 0, deal.id);
            }
          } else if (deal.paymentDaysRemaining <= 0) completeDeal(deal);
        } else if ((deal.collectionDelayDays || 0) > 0) {
          deal.invoiceStatus = 'Overdue';
          deal.collectionDelayDays = Math.max(0, deal.collectionDelayDays - 1);
          if (deal.collectionDelayDays <= 0) completeDeal(deal);
        } else completeDeal(deal);
        continue;
      }
      deal.elapsed += 1;
      deal.contractLifecycle = { ...(deal.contractLifecycle || {}), loaded:(deal.elapsed / Math.max(1, deal.duration)) >= .18 };
      updateDealOperations(deal);
      updateMarginLiquidity(deal);
      accrueDailyShippingCosts(deal);
      if (!deal.eventTriggered && triggerDealEvent(deal)) {
        eventTriggered = true;
        break;
      }
      if (deal.elapsed >= deal.duration) deliverDeal(deal);
    }

    evaluateAchievements();
    const stats = portfolioStats();
    state.valuationHigh = Math.max(state.valuationHigh||0, tradingHouseValuation().value);
    checkVictory();
    state.navHistory.push(stats.nav);
    if (state.navHistory.length > 50) state.navHistory.shift();
    saveState();
    if (!deferRender) renderAll();
    if (!silent) { pulseNewDay(); try { Sound.play('day'); } catch (e) {} addXp(2, 'day'); }
    return !eventTriggered;
  }

  function pulseNewDay() {
    if (!motionEnabled()) return;
    const dateEl = $('#gameDate');
    if (dateEl) {
      dateEl.classList.remove('date-pulse');
      void dateEl.offsetWidth;
      dateEl.classList.add('date-pulse');
      setTimeout(() => dateEl.classList.remove('date-pulse'), 700);
    }
    const stage = $('#globeStage');
    if (stage && motionEnabled()) {
      const sweep = document.createElement('div');
      sweep.className = 'day-sweep';
      stage.appendChild(sweep);
      setTimeout(() => sweep.remove(), 900);
    }
  }

  function advanceToNextEvent() {
    if (state.activeDeals.some(d => d.pendingDecision)) return selectDeal(state.activeDeals.find(d => d.pendingDecision).id);
    let safe = 0;
    const feedBefore = state.worldEventFeed.length;
    const cycleBefore = state.marketCycle;
    const _prevSuppress = _soundSuppressed;
    _soundSuppressed = true;
    while (safe < 120) {
      safe++;
      const before = state.activeDeals.length;
      const continued = advanceDay({ silent: true, deferRender: true });
      if (!continued || state.activeDeals.length < before || state.worldEventFeed.length > feedBefore || state.marketCycle !== cycleBefore) break;
    }
    _soundSuppressed = _prevSuppress;
    renderAll();
    try { Sound.play('info'); } catch (e) {}
  }

  function updateClock() {
    $$('.time-button').forEach(b => b.classList.remove('active'));
    const dot = $('#clockDot');
    if (runningSpeed === 0) {
      $('#pauseButton').classList.add('active');
      $('#clockStatus').textContent = 'Paused';
      dot.classList.remove('running');
    } else {
      const speedButton = $(`.time-button[data-speed="${runningSpeed}"]`);
      speedButton?.classList.add('active');
      $('#clockStatus').textContent = `${runningSpeed}× active`;
      dot.classList.add('running');
    }
    _soundSuppressed = runningSpeed > 0;
    clearInterval(clockTimer);
    simulationDayAnchor = performance.now();
    if (runningSpeed > 0) {
      clockTimer = setInterval(() => advanceDay(), runningSpeed === 1 ? 1800 : 430);
    }
  }

  function forwardCurvePopupHtml(key, label, unit) {
    const curve = state.forwardCurve?.[key] || [];
    if (!curve.length) return '';
    const spot = curve[0];
    const ts = state.termStructure?.[key] || 0;
    const tsLabel = ts < -0.06 ? 'Backwardation' : ts > 0.06 ? 'Contango' : 'Flat';
    const tsColor = ts < -0.06 ? 'var(--orange)' : ts > 0.06 ? '#60a5fa' : 'var(--muted)';
    const months = ['M1','M2','M3','M4','M5','M6'];
    const mn = Math.min(...curve), mx = Math.max(...curve);
    const rng = mx - mn || 1;
    const bW=30, bG=5, pX=6, pY=10, cH=52, svgW = pX*2+(bW+bG)*6-bG;
    const fmt = p => unit==='bbl' ? '$'+p.toFixed(1) : Math.round(p).toLocaleString();
    const bars = curve.map((p,i)=>{
      const bH = Math.max(4, Math.round((p-mn)/rng*cH));
      const x = pX+i*(bW+bG), y = pY+cH-bH;
      const col = i===0 ? '#f59e0b' : p>spot ? '#60a5fa' : '#f97316';
      return `<rect x="${x}" y="${y}" width="${bW}" height="${bH}" rx="3" fill="${col}" opacity="${i===0?1:0.75}"/>`
           + `<text x="${x+bW/2}" y="${pY+cH+13}" text-anchor="middle" fill="rgba(255,255,255,.45)" font-size="9">${months[i]}</text>`
           + `<text x="${x+bW/2}" y="${y-3}" text-anchor="middle" fill="rgba(255,255,255,.85)" font-size="8">${fmt(p)}</text>`;
    }).join('');
    // Historical price line chart (last up to 60 days)
    const hist = (state.priceHistory?.[key] || []).slice(-60);
    let histSvg = '';
    if (hist.length >= 2) {
      const hMn = Math.min(...hist), hMx = Math.max(...hist);
      const hRng = hMx - hMn || 1;
      const hW = svgW, hH = 46, hPad = 4;
      const stepX = (hW - hPad*2) / (hist.length - 1);
      const pts = hist.map((p,i) => {
        const x = hPad + i*stepX;
        const y = hPad + (hH - hPad*2) * (1 - (p - hMn) / hRng);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      }).join(' ');
      const first = hist[0], last = hist[hist.length-1];
      const lineCol = last >= first ? '#6ce3a6' : '#f0717f';
      const areaPts = `${hPad},${hH-hPad} ${pts} ${(hPad+(hist.length-1)*stepX).toFixed(1)},${hH-hPad}`;
      const pctChg = ((last/first - 1) * 100);
      histSvg = `<div class="fwd-hist-head"><span>${hist.length}-day trend</span><strong style="color:${lineCol}">${pctChg>=0?'+':''}${pctChg.toFixed(1)}%</strong></div>
        <svg viewBox="0 0 ${hW} ${hH}" width="100%" style="display:block;margin-bottom:8px">
          <polyline points="${areaPts}" fill="${lineCol}" opacity="0.08" stroke="none"/>
          <polyline points="${pts}" fill="none" stroke="${lineCol}" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/>
        </svg>`;
    }
    return `<div class="fwd-curve-popup" id="fwdCurvePopup">
      <div class="fwd-curve-head"><strong>${label}</strong><em style="color:${tsColor}">${tsLabel}</em></div>
      ${histSvg}
      <div class="fwd-curve-sub">Forward curve</div>
      <svg viewBox="0 0 ${svgW} ${pY*2+cH+18}" width="100%" style="overflow:visible;display:block">${bars}</svg>
      <div class="fwd-curve-meta">
        <div><span>Spot</span><strong>${fmt(spot)}</strong></div>
        <div><span>6M forward</span><strong>${fmt(curve[5])}</strong></div>
        <div><span>Carry</span><strong style="color:${tsColor}">${ts>=0?'+':''}${(ts*100).toFixed(1)}%</strong></div>
      </div>
    </div>`;
  }

  function motionEnabled() {
    if (state && state.reduceMotion) return false;
    try { if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false; } catch (e) {}
    return true;
  }

  const _counterAnims = new WeakMap();
  function animateCounter(el, target, fmt) {
    if (!el) return;
    const prev = _counterAnims.get(el);
    if (prev) cancelAnimationFrame(prev.raf);
    const from = prev ? prev.current : (Number.isFinite(el._counterVal) ? el._counterVal : target);
    if (!motionEnabled() || from === target || from === null || from === undefined) {
      el.textContent = fmt(target);
      el._counterVal = target;
      _counterAnims.delete(el);
      return;
    }
    const duration = 520;
    const startT = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - startT) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const value = from + (target - from) * eased;
      el.textContent = fmt(value);
      if (t < 1) {
        const raf = requestAnimationFrame(step);
        _counterAnims.set(el, { raf, current: value });
      } else {
        el.textContent = fmt(target);
        el._counterVal = target;
        _counterAnims.delete(el);
      }
    };
    const raf = requestAnimationFrame(step);
    _counterAnims.set(el, { raf, current: from });
    el._counterVal = target;
  }

  let _prevMetricValues = { nav: null, cash: null, rep: null };
  function flashMetric(elId, newVal, prevVal, opts = {}) {
    const el = $('#' + elId);
    if (!el) return;
    if (prevVal === null || prevVal === undefined || newVal === prevVal) return;
    if (!motionEnabled()) return;
    const up = newVal > prevVal;
    el.classList.remove('metric-flash-up', 'metric-flash-down');
    void el.offsetWidth; // reflow to restart animation
    el.classList.add(up ? 'metric-flash-up' : 'metric-flash-down');
    setTimeout(() => el.classList.remove('metric-flash-up', 'metric-flash-down'), 900);
    // Floating delta chip
    if (opts.showDelta && Math.abs(newVal - prevVal) >= (opts.threshold || 1)) {
      const chip = document.createElement('span');
      chip.className = 'metric-delta-chip ' + (up ? 'up' : 'down');
      const diff = newVal - prevVal;
      chip.textContent = (up ? '+' : '−') + (opts.fmt ? opts.fmt(Math.abs(diff)) : Math.abs(Math.round(diff)));
      const host = el.parentElement;
      if (host) {
        host.style.position = host.style.position || 'relative';
        host.appendChild(chip);
        requestAnimationFrame(() => chip.classList.add('rise'));
        setTimeout(() => chip.remove(), 1400);
      }
    }
  }

  function renderMetrics() {
    const stats = portfolioStats();
    const start = 1_000_000;
    const ret = (stats.nav / start - 1) * 100;
    animateCounter($('#navMetric'), stats.nav, v => money(v, true));
    $('#navDelta').textContent = `${ret >= 0 ? '+' : ''}${ret.toFixed(1)}% all time`;
    animateCounter($('#cashMetric'), state.cash, v => money(v, true));
    $('#cashDelta').textContent = (dailyInvestmentIncome()+shopDailyIncome()) ? `${money(dailyInvestmentIncome()+shopDailyIncome())}/day assets` : (state.cash < 250_000 ? 'Low liquidity' : 'Available');
    animateCounter($('#creditMetric'), stats.creditUsed, v => money(v, true));
    $('#creditSub').textContent = `of ${money(effectiveCreditLimit(), true)}`;
    $('#repMetric').textContent = Math.round(state.reputation);
    $('#rankMetric').textContent = rankFromState();
    $('#portfolioValue').textContent = money(stats.nav);
    $('#portfolioReturn').textContent = `${ret >= 0 ? '+' : ''}${ret.toFixed(1)}% since inception`;
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
    const prestigeBadge = $('#prestigeBadge');
    if (prestigeBadge) {
      const lvl = state.prestigeLevel || 0;
      if (lvl > 0) { prestigeBadge.textContent = '★ ' + lvl; prestigeBadge.classList.remove('hidden'); prestigeBadge.title = `Prestige level ${lvl} · +${12*lvl}% starting capital`; }
      else prestigeBadge.classList.add('hidden');
    }
    // v31 XP HUD
    const xpLabel = $('#xpLevelLabel');
    if (xpLabel) xpLabel.textContent = state.xpLevel || 1;
    const xpFill = $('#xpFill');
    if (xpFill) { const p = xpLevelProgress(); xpFill.style.width = p.pct + '%'; const chip = $('#xpChip'); if (chip) chip.title = `Level ${state.xpLevel} · ${p.have}/${p.need} XP`; }
    const goldLabel = $('#goldBarsLabel'); if (goldLabel) goldLabel.textContent = (state.goldBars || 0).toLocaleString('en-US');

    // v24 animated metric feedback
    flashMetric('navMetric', stats.nav, _prevMetricValues.nav, { showDelta: true, threshold: 500, fmt: v => money(v, true).replace('$','$') });
    flashMetric('cashMetric', state.cash, _prevMetricValues.cash, { showDelta: true, threshold: 500, fmt: v => money(v, true) });
    flashMetric('repMetric', Math.round(state.reputation), _prevMetricValues.rep, { showDelta: true, threshold: 1 });
    _prevMetricValues = { nav: stats.nav, cash: state.cash, rep: Math.round(state.reputation) };

    const marketDisplays = [
      ['copper', state.copperPrice, state.copperPrev, `${money(state.copperPrice)}/t`, 2],
      ['aluminium', state.aluminiumPrice, state.aluminiumPrev, `${money(state.aluminiumPrice)}/t`, 2],
      ['urea', state.ureaPrice, state.ureaPrev, `${money(state.ureaPrice)}/t`, 2],
      ['crude', state.crudePrice, state.crudePrev, `$${state.crudePrice.toFixed(2)}/bbl`, 2],
      ['wheat', state.wheatPrice, state.wheatPrev, `${money(state.wheatPrice)}/t`, 2],
      ['ironore', state.ironorePrice, state.ironorePrev, `${money(state.ironorePrice)}/t`, 2],
      ['eurusd', state.eurusd, state.eurusdPrev, state.eurusd.toFixed(4), 2],
      ['freight', state.freightIndex, state.freightPrev, state.freightIndex.toFixed(1), 2],
      ['zinc',    state.zincPrice   || 2800,  state.zincPrev   || 2800,  `${money(state.zincPrice||2800)}/t`,   2],
      ['nickel',  state.nickelPrice || 16000, state.nickelPrev || 16000, `${money(state.nickelPrice||16000)}/t`, 2],
      ['lng',     state.lngPrice    || 12.5,  state.lngPrev    || 12.5,  `$${(state.lngPrice||12.5).toFixed(2)}/MMBtu`, 2]
    ];
    const _tsKeys = { copper:'copper', aluminium:'aluminium', urea:'urea', crude:'crude', wheat:'wheat', ironore:'ironore' };
    marketDisplays.forEach(([id, value, previous, label, decimals]) => {
      const move = previous ? (value / previous - 1) * 100 : 0;
      $(`#${id}Price`).textContent = label;
      const moveEl = $(`#${id}Move`);
      moveEl.textContent = `${move >= 0 ? '+' : ''}${move.toFixed(decimals)}%`;
      moveEl.style.color = move >= 0 ? 'var(--green)' : 'var(--red)';
      // Show term structure indicator
      const tsKey = _tsKeys[id];
      if (tsKey) {
        const ts = state.termStructure?.[tsKey] || 0;
        const tsEl = $(`#${id}TermStructure`);
        if (tsEl) {
          const tsLabel = ts < -0.06 ? 'Backw.' : ts > 0.06 ? 'Contango' : 'Flat';
          tsEl.textContent = tsLabel;
          tsEl.setAttribute('data-term', ts < -0.06 ? 'backwardation' : ts > 0.06 ? 'contango' : 'termstructure');
          tsEl.style.color = ts < -0.06 ? 'var(--orange)' : ts > 0.06 ? 'var(--blue)' : 'var(--muted)';
        }
      }
    });
    // Wire forward curve popup on clickable commodity tickers
    const _fwdMeta = {copper:['Copper','t'],aluminium:['Aluminium','t'],urea:['Urea','t'],crude:['Crude Oil','bbl'],wheat:['Wheat','t'],ironore:['Iron Ore','t'],coffee:['Coffee','t']};
    document.querySelectorAll('.market-ticker').forEach(ticker => {
      const priceEl = ticker.querySelector('[id$="Price"]');
      if (!priceEl) return;
      const comKey = priceEl.id.replace('Price','');
      if (!_fwdMeta[comKey]) return;
      ticker.style.cursor = 'pointer';
      ticker.onclick = (e) => {
        e.stopPropagation();
        const existing = document.getElementById('fwdCurvePopup');
        if (existing && existing._key === comKey) { existing.remove(); return; }
        if (existing) existing.remove();
        const [label, unit] = _fwdMeta[comKey];
        const wrapper = document.createElement('div');
        wrapper.innerHTML = forwardCurvePopupHtml(comKey, label, unit);
        const popup = wrapper.firstElementChild;
        if (!popup) return;
        popup._key = comKey;
        const rect = ticker.getBoundingClientRect();
        popup.style.top = (rect.bottom + 8) + 'px';
        popup.style.left = Math.max(8, Math.min(rect.left, window.innerWidth - 230)) + 'px';
        document.body.appendChild(popup);
        setTimeout(() => document.addEventListener('click', () => popup?.remove(), {once:true}), 60);
      };
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
    if ($('#drawerTitle')) $('#drawerTitle').textContent = drawerLabel(activeLeftTab) || 'Command center';
  }

  function renderActiveDeals() {
    const container = $('#activeDealsList');
    if (!state.activeDeals.length) {
      container.innerHTML = '<div class="empty-card">No open operations.<br>Open the Market tab and select a route on the globe.</div>';
      return;
    }
    container.innerHTML = state.activeDeals.map(deal => {
      const opp = getOpportunity(deal.opportunityId);
      const progress = computeDealProgress(deal);
      const pnl = computeUnrealizedPnl(deal);
      return `<button class="deal-card ${selected.type === 'deal' && selected.id === deal.id ? 'selected' : ''}" data-deal-id="${deal.id}">
        <div class="deal-card-head"><span class="route-name">${getHub(opp.origin).name} <span class="route-arrow">→</span> ${getHub(opp.destination).name}</span><span class="status-pill ${deal.pendingDecision ? 'high' : ''}">${deal.pendingDecision ? 'Decision' : Math.round(progress*100)+'%'}</span></div>
        <div class="deal-card-meta"><div><span>Unrealized P&amp;L</span><strong style="color:${pnl >= 0 ? 'var(--green)' : 'var(--red)'}">${money(pnl)}</strong></div><div><span>${deal.delivered?(deal.invoiceStatus==='Overdue'?'Overdue':'Cash due'):'ETA'}</span><strong>${deal.delivered?(deal.invoiceStatus==='Overdue'?Math.max(0,deal.collectionDelayDays||0):Math.max(0,deal.paymentDaysRemaining||0)):Math.max(0, deal.duration-deal.elapsed)} days</strong></div><div><span>Hedge</span><strong>${deal.hedgeRatio || 0}%</strong></div><div><span>Ops ready</span><strong>${Math.round(operationsReadiness(deal))}%</strong></div></div>
        <div class="progress-track"><span style="width:${progress*100}%"></span></div>
      </button>`;
    }).join('');
    $$('[data-deal-id]', container).forEach(button => button.addEventListener('click', () => selectDeal(button.dataset.dealId)));
  }

  function renderHistory() {
    const container = $('#historyList');
    if (!state.history.length) {
      container.innerHTML = '<div class="empty-card">Your track record will appear after the first closed deal.</div>';
      return;
    }
    container.innerHTML = state.history.slice(0,8).map(item => {
      const opp = getOpportunity(item.opportunityId);
      return `<button class="history-card ${selected.type==='history'&&selected.id===item.id?'selected':''}" data-history-id="${item.id}"><div class="history-card-head"><span class="route-name">${opp.title}</span><strong class="history-pnl ${item.pnl >= 0 ? 'positive' : 'negative'}">${money(item.pnl)}</strong></div><div class="deal-card-meta"><div><span>Duration</span><strong>${item.days} days</strong></div><div><span>Ops score</span><strong>${Math.round(item.operationalReadiness ?? 100)}%</strong></div><div><span>Margin calls</span><strong>${item.marginCalls||0}</strong></div><div><span>FX hedge</span><strong>${item.fxHedgeRatio||0}%</strong></div></div></button>`;
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
      container.innerHTML = '<div class="empty-card">No physical inventory. Start a deal from Market to open your first cargo.</div>';
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
      container.innerHTML = '<div class="empty-card">No active operations chain. Start a deal to generate contracts, bookings and documents.</div>';
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


  function routeConditionFor(opp) {
    state.routeConditions = state.routeConditions || {};
    const current = state.routeConditions[opp.id];
    if (current && current.cycle === state.marketCycle) return current;
    const ocean = /Ocean|bulk|carrier|VLCC|Panamax|Capesize|Handymax|LNG/i.test(opp.transportMode || '');
    const crisisPressure = activeCrisisDefinitions().filter(event => event.affects?.(opp)).reduce((sum, event) => sum + (event.severity === 'Critical' ? 22 : event.severity === 'High' ? 16 : 9), 0);
    const freightPressure = Math.max(0, (state.freightIndex || 100) - 100) * .55;
    const regimePressure = currentMarketRegime().id === 'freight' ? 18 : currentMarketRegime().id === 'squeeze' ? 10 : 0;
    const seed = deterministicRandom(`${opp.id}-${state.marketCycle}-network`);
    const score = clamp(Math.round(12 + seed * 58 + crisisPressure + freightPressure + regimePressure + (ocean ? 8 : 0)), 5, 96);
    const severity = score >= 78 ? 'Severe' : score >= 55 ? 'Elevated' : score >= 32 ? 'Moderate' : 'Fluid';
    const delayDays = severity === 'Severe' ? 4 + Math.floor(seed * 3) : severity === 'Elevated' ? 2 + Math.floor(seed * 2) : severity === 'Moderate' ? 1 : 0;
    const notionalScale = Math.max(.7, Math.min(2.8, (opp.capital || 1_000_000) / 3_000_000));
    const freightCost = Math.round((score ** 1.25) * 95 * notionalScale / 1000) * 1000;
    const bottleneck = ocean
      ? (score >= 70 ? 'Berth and vessel capacity' : score >= 45 ? 'Port rotation' : 'Open capacity')
      : (score >= 70 ? 'Border and rail slots' : score >= 45 ? 'Terminal handling' : 'Open capacity');
    const condition = {
      cycle: state.marketCycle,
      score,
      severity,
      delayDays,
      freightCost,
      acceptancePenalty: severity === 'Severe' ? 7 : severity === 'Elevated' ? 4 : severity === 'Moderate' ? 1 : 0,
      bottleneck,
      generatedAt: state.date
    };
    state.routeConditions[opp.id] = condition;
    return condition;
  }

  function refreshRouteConditions() {
    state.routeConditions = {};
    opportunities.forEach(opp => routeConditionFor(opp));
  }

  function procurementAgreementForOpportunity(opp) {
    const supplierId = partiesForOpportunity(opp).supplierId;
    const agreement = supplierId ? state.procurementAgreements?.[supplierId] : null;
    if (!agreement || agreement.status !== 'active' || agreement.daysRemaining <= 0) return null;
    return agreement.commodities?.includes(opp.commodity) ? agreement : null;
  }

  function procurementAgreementAdjustments(opp) {
    const agreement = procurementAgreementForOpportunity(opp);
    if (!agreement) return { agreement: null, pnlBonus: 0, acceptance: 0, equityFactor: 1, durationBonus: 0, competitionFactor: 1 };
    const remainingCommitment = Math.max(0, agreement.commitment - agreement.liftings);
    return {
      agreement,
      pnlBonus: Math.round(Math.max(6_000, opp.basePnl * .075)),
      acceptance: 6,
      equityFactor: .96,
      durationBonus: 1,
      competitionFactor: remainingCommitment > 0 ? .72 : .84
    };
  }

  function supplierAgreementCandidates() {
    const map = new Map();
    opportunities.filter(isOpportunityUnlocked).forEach(opp => {
      const supplierId = partiesForOpportunity(opp).supplierId;
      const supplier = getCounterparty(supplierId);
      if (!supplier || !supplierId) return;
      if (!map.has(supplierId)) map.set(supplierId, { supplierId, supplier, commodities: new Set(), routes: [] });
      const row = map.get(supplierId);
      row.commodities.add(opp.commodity);
      row.routes.push(opp);
    });
    return [...map.values()].map(item => ({ ...item, commodities: [...item.commodities] }));
  }

  function signProcurementAgreement(supplierId) {
    state.procurementAgreements = state.procurementAgreements || {};
    const existing = state.procurementAgreements[supplierId];
    if (existing?.status === 'active' && existing.daysRemaining > 0) return showToast('An active procurement agreement already covers this supplier.');
    const candidate = supplierAgreementCandidates().find(item => item.supplierId === supplierId);
    if (!candidate) return showToast('No eligible supply program is available.');
    const relationship = getCounterpartyState(supplierId).relationship || 50;
    if (relationship < 42) return showToast('Improve the supplier relationship before proposing a strategic agreement.');
    const averageCapital = candidate.routes.reduce((sum, opp) => sum + (opp.capital || 0), 0) / Math.max(1, candidate.routes.length);
    const fee = Math.round(clamp(averageCapital * .012, 32_000, 95_000) / 1000) * 1000;
    if (state.cash < fee) return showToast(`Insufficient liquidity. The reservation fee is ${money(fee)}.`);
    state.cash -= fee;
    state.supplyChainSpend = (state.supplyChainSpend || 0) + fee;
    state.procurementAgreements[supplierId] = {
      supplierId,
      commodities: candidate.commodities,
      signedAt: state.date,
      daysRemaining: 90,
      commitment: 3,
      liftings: 0,
      fee,
      status: 'active',
      fulfilledRewardPaid: false
    };
    recordJournal('Procurement', `${candidate.supplier.name}: strategic supply agreement`, `90-day framework · 3 cargo commitment · reservation fee ${money(fee)}.`, -fee, supplierId);
    state.worldEventFeed.unshift({ type:'contract', title:`Supply framework signed · ${candidate.supplier.name}`, date:state.date, description:`Priority access secured for ${candidate.commodities.join(', ')}. Three cargo liftings are due within 90 days.` });
    state.worldEventFeed = state.worldEventFeed.slice(0, 18);
    saveState();
    renderAll();
    showToast(`Strategic supply agreement signed with ${candidate.supplier.name}.`);
  }

  function registerProcurementLift(opp, deal, economics) {
    const agreement = procurementAgreementForOpportunity(opp);
    if (!agreement) return;
    agreement.liftings += 1;
    agreement.lastLiftDay = state.dayIndex || 0;
    state.supplyChainSavings = (state.supplyChainSavings || 0) + (economics.procurementSavings || economics.procurementBonus || 0);
    deal.procurementAgreementId = agreement.supplierId;
    if (agreement.liftings >= agreement.commitment && !agreement.fulfilledRewardPaid) {
      agreement.fulfilledRewardPaid = true;
      state.commitmentsFulfilled = (state.commitmentsFulfilled || 0) + 1;
      state.reputation = clamp((state.reputation || 0) + 2, 0, 100);
      recordJournal('Procurement', `${getCounterparty(agreement.supplierId)?.name || 'Supplier'} commitment fulfilled`, `${agreement.liftings}/${agreement.commitment} cargoes lifted. Reputation +2.`, 0, agreement.supplierId);
    }
  }

  function processProcurementAgreements() {
    Object.values(state.procurementAgreements || {}).forEach(agreement => {
      if (!agreement || agreement.status !== 'active') return;
      agreement.daysRemaining = Math.max(0, (agreement.daysRemaining || 0) - 1);
      if (agreement.daysRemaining > 0) return;
      const shortfall = Math.max(0, (agreement.commitment || 0) - (agreement.liftings || 0));
      const penalty = shortfall * 18_000;
      if (penalty > 0) {
        state.cash -= penalty;
        state.supplyChainSpend = (state.supplyChainSpend || 0) + penalty;
        agreement.status = 'expired-shortfall';
        agreement.shortfallPenalty = penalty;
        state.reputation = clamp((state.reputation || 0) - Math.min(4, shortfall), 0, 100);
        recordJournal('Procurement', `${getCounterparty(agreement.supplierId)?.name || 'Supplier'} commitment shortfall`, `${shortfall} cargo commitment missed · penalty ${money(penalty)}.`, -penalty, agreement.supplierId);
        state.worldEventFeed.unshift({ type:'alert', title:'Take-or-pay commitment missed', date:state.date, description:`${getCounterparty(agreement.supplierId)?.name || 'Supplier'} charged ${money(penalty)} for ${shortfall} unlifted cargo commitment${shortfall === 1 ? '' : 's'}.` });
      } else {
        agreement.status = 'fulfilled';
        recordJournal('Procurement', `${getCounterparty(agreement.supplierId)?.name || 'Supplier'} framework completed`, `${agreement.liftings} cargoes lifted with no shortfall.`, 0, agreement.supplierId);
      }
    });
    state.worldEventFeed = state.worldEventFeed.slice(0, 18);
  }

  function mitigateRouteCongestion(dealId) {
    const deal = getActiveDeal(dealId);
    if (!deal || deal.delivered || deal.routeMitigated) return;
    const route = deal.routeCondition || routeConditionFor(getOpportunity(deal.opportunityId));
    if (!route || route.delayDays <= 0) return showToast('This route is currently fluid; no mitigation is required.');
    const daysSaved = Math.min(3, Math.max(1, Math.ceil(route.delayDays * .6)));
    const cost = Math.round((9_000 + route.score * 180) / 1000) * 1000;
    deal.duration = Math.max(deal.elapsed + 1, deal.duration - daysSaved);
    deal.pnlAdjustments -= cost;
    deal.routeMitigated = true;
    deal.routeMitigationCost = cost;
    deal.routeMitigationDays = daysSaved;
    state.congestionMitigations = (state.congestionMitigations || 0) + 1;
    state.supplyChainSpend = (state.supplyChainSpend || 0) + cost;
    recordJournal('Supply chain', `${getOpportunity(deal.opportunityId).title}: congestion mitigation`, `${daysSaved} transit days protected through priority slots and alternate handling · cost ${money(cost)}.`, -cost, deal.id);
    saveState(); renderAll(); showToast(`Priority capacity secured. ETA improved by ${daysSaved} day${daysSaved === 1 ? '' : 's'}.`);
  }

  function renderSupplyChain() {
    const summary = $('#supplyChainSummary');
    const routes = $('#routeConditionList');
    const agreements = $('#procurementAgreementList');
    const cargoes = $('#supplyChainCargoList');
    if (!summary || !routes || !agreements || !cargoes) return;
    const visibleOpps = opportunities.filter(isOpportunityUnlocked);
    const conditions = visibleOpps.map(opp => ({ opp, condition: routeConditionFor(opp) }));
    const averageCongestion = conditions.length ? Math.round(conditions.reduce((sum, row) => sum + row.condition.score, 0) / conditions.length) : 0;
    const severe = conditions.filter(row => row.condition.score >= 78).length;
    const activeAgreements = Object.values(state.procurementAgreements || {}).filter(item => item?.status === 'active' && item.daysRemaining > 0);
    const inventoryAtRisk = state.activeDeals.filter(deal => !deal.delivered && (deal.routeCondition?.score || 0) >= 55).reduce((sum, deal) => sum + (deal.capital || 0), 0);
    summary.innerHTML = `
      <div><span>Network congestion</span><strong>${averageCongestion}/100</strong></div>
      <div><span>Severe corridors</span><strong style="color:${severe ? 'var(--red)' : 'var(--green)'}">${severe}</strong></div>
      <div><span>Strategic suppliers</span><strong>${activeAgreements.length}</strong></div>
      <div><span>Inventory at risk</span><strong>${money(inventoryAtRisk,true)}</strong></div>`;
    routes.innerHTML = conditions.sort((a,b) => b.condition.score - a.condition.score).map(({opp, condition}) => `
      <button class="route-condition-card severity-${condition.severity.toLowerCase()}" data-supply-route="${opp.id}">
        <div class="route-condition-head"><div><span>${opp.commodity} · ${condition.bottleneck}</span><strong>${getHub(opp.origin).name} → ${getHub(opp.destination).name}</strong></div><b>${condition.score}</b></div>
        <div class="route-condition-meter"><i style="width:${condition.score}%"></i></div>
        <div class="route-condition-meta"><span>${condition.severity}</span><span>+${condition.delayDays}d</span><span>${money(condition.freightCost)} capacity cost</span></div>
      </button>`).join('') || '<div class="empty-card">No unlocked trade corridors.</div>';
    const candidates = supplierAgreementCandidates();
    agreements.innerHTML = candidates.map(candidate => {
      const agreement = state.procurementAgreements?.[candidate.supplierId];
      const active = agreement?.status === 'active' && agreement.daysRemaining > 0;
      const completed = agreement && !active;
      return `<div class="procurement-card ${active ? 'active' : completed ? 'completed' : ''}">
        <div class="procurement-head"><div><span>${candidate.supplier.country} · ${candidate.commodities.join(', ')}</span><strong>${candidate.supplier.name}</strong></div><b>${active ? `${agreement.daysRemaining}d` : completed ? agreement.status.replace('-', ' ') : 'Open'}</b></div>
        ${active ? `<div class="commitment-progress"><span style="width:${Math.min(100,agreement.liftings/agreement.commitment*100)}%"></span></div><div class="procurement-meta"><span>${agreement.liftings}/${agreement.commitment} cargoes lifted</span><span>Priority access · lower capital · margin edge</span></div>` : `<p>Secure priority allocation, reduced tender pressure and better working-capital terms for a 90-day, three-cargo commitment.</p><button class="button secondary" data-sign-procurement="${candidate.supplierId}">${completed ? 'Renew framework' : 'Propose framework'}</button>`}
      </div>`;
    }).join('') || '<div class="empty-card">No supplier programs are currently accessible.</div>';
    cargoes.innerHTML = state.activeDeals.length ? state.activeDeals.map(deal => {
      const opp = getOpportunity(deal.opportunityId);
      const route = deal.routeCondition || routeConditionFor(opp);
      const mtm = computeUnrealizedPnl(deal);
      return `<button class="supply-cargo-card" data-supply-deal="${deal.id}"><div><span>${deal.delivered ? deal.invoiceStatus : `${Math.max(0,deal.duration-deal.elapsed)}d to destination`}</span><strong>${opp.title}</strong><small>${deal.quantity.toLocaleString('en-US')} t · ${route.severity} route · ${deal.procurementAgreementId ? 'contracted supply' : 'spot supply'}</small></div><b style="color:${mtm>=0?'var(--green)':'var(--red)'}">${money(mtm,true)}</b></button>`;
    }).join('') : '<div class="empty-card">No inventory is currently moving through the network.</div>';
    $$('[data-supply-route]', routes).forEach(button => button.addEventListener('click', () => selectOpportunity(button.dataset.supplyRoute)));
    $$('[data-sign-procurement]', agreements).forEach(button => button.addEventListener('click', () => signProcurementAgreement(button.dataset.signProcurement)));
    $$('[data-supply-deal]', cargoes).forEach(button => button.addEventListener('click', () => selectDeal(button.dataset.supplyDeal)));
  }


  function renderContracts() {
    const summary = $('#contractSummary');
    const contracts = $('#contractList');
    const receivables = $('#receivableList');
    const requests = $('#creditRequestList');
    if (!summary || !contracts || !receivables || !requests) return;
    const outstanding = state.activeDeals.filter(deal => deal.delivered && ((deal.paymentDaysRemaining || 0) > 0 || (deal.collectionDelayDays || 0) > 0));
    const outstandingValue = outstanding.reduce((sum, deal) => sum + (deal.invoiceAmount || 0), 0);
    const creditUsed = counterpartyCatalog.reduce((sum, party) => sum + counterpartyExposure(party.id), 0);
    const totalLimits = counterpartyCatalog.reduce((sum, party) => sum + counterpartyCreditLimit(party.id), 0);
    summary.innerHTML = `
      <div><span>Live contracts</span><strong>${state.activeDeals.length}</strong></div>
      <div><span>Receivables</span><strong>${money(outstandingValue,true)}</strong></div>
      <div><span>Buyer limits used</span><strong>${totalLimits ? Math.round(creditUsed/totalLimits*100) : 0}%</strong></div>
      <div><span>Cash collected</span><strong>${money(state.receivablesCollected||0,true)}</strong></div>`;
    contracts.innerHTML = state.activeDeals.length ? state.activeDeals.map(deal => {
      const opp = getOpportunity(deal.opportunityId);
      const phase = dealPhase(deal);
      const stages = [
        ['Contract', true], ['Nominated', deal.contractLifecycle?.nominated], ['Loaded', deal.contractLifecycle?.loaded],
        ['Delivered', deal.contractLifecycle?.delivered], ['Invoiced', deal.contractLifecycle?.invoiced], ['Paid', deal.contractLifecycle?.paid]
      ];
      return `<button class="contract-card" data-contract-deal="${deal.id}">
        <div class="contract-card-head"><div><span>${deal.operations?.contractId || deal.id}</span><strong>${opp.title}</strong></div><b class="status-pill ${deal.delivered?'medium':'low'}">${phase.label}</b></div>
        <div class="contract-route">${getHub(opp.origin).name} → ${getHub(opp.destination).name} · ${negotiationProfiles.payment[deal.commercialTerms?.payment || 'delivery']?.label}</div>
        <div class="contract-stages">${stages.map(([label,done])=>`<span class="${done?'done':''}"><i></i>${label}</span>`).join('')}</div>
        <div class="contract-meta"><span>Buyer: ${getCounterparty(deal.buyerId)?.name || '—'}</span><strong>${deal.delivered ? (deal.invoiceStatus === 'Overdue' ? `${Math.max(0,deal.collectionDelayDays||0)} overdue days remaining` : `${Math.max(0,deal.paymentDaysRemaining||0)} days to cash`) : `${Math.max(0,deal.duration-deal.elapsed)} days to delivery`}</strong></div>
      </button>`;
    }).join('') : '<div class="empty-card">No live contracts. Accepted physical deals will appear here.</div>';
    receivables.innerHTML = outstanding.length ? outstanding.map(deal => {
      const buyer = getCounterparty(deal.buyerId);
      const limit = counterpartyCreditLimit(deal.buyerId);
      const exposure = counterpartyExposure(deal.buyerId);
      return `<div class="receivable-card">
        <div class="receivable-head"><div><span>${deal.operations?.contractId || deal.id} · ${deal.invoiceStatus}</span><strong>${buyer?.name || 'Buyer receivable'}</strong></div><b>${money(deal.invoiceAmount||0,true)}</b></div>
        <div class="receivable-grid"><div><span>${deal.invoiceStatus === 'Overdue' ? 'Collection delay' : 'Due in'}</span><strong>${deal.invoiceStatus === 'Overdue' ? deal.collectionDelayDays : deal.paymentDaysRemaining} days</strong></div><div><span>Protection</span><strong>${deal.receivableProtection?.label || 'Unprotected'}</strong></div><div><span>Buyer limit</span><strong>${money(limit,true)}</strong></div><div><span>Limit use</span><strong>${limit ? Math.round(exposure/limit*100) : 0}%</strong></div></div>
        <button class="button secondary" data-open-receivable="${deal.id}">Open invoice</button>
      </div>`;
    }).join('') : '<div class="empty-card">No outstanding receivables. Deferred-payment invoices appear after delivery.</div>';
    const activeRequests = Object.values(state.creditLimitRequests || {}).filter(Boolean).sort((a,b)=>(a.status==='pending'?-1:1)-(b.status==='pending'?-1:1));
    requests.innerHTML = activeRequests.length ? activeRequests.map(request => {
      const party = getCounterparty(request.counterpartyId);
      return `<div class="credit-request-row ${request.status}"><div><span>${party?.country || ''} · ${request.status}</span><strong>${party?.name || request.counterpartyId}</strong><small>${request.status==='pending' ? `${request.daysRemaining} committee days remaining` : `${money(request.increment)} requested`}</small></div><b>${request.status==='approved'?'+':''}${request.status==='approved'?money(request.increment,true):request.status==='declined'?'Declined':'Review'}</b></div>`;
    }).join('') : '<div class="empty-card">No credit committee requests are active.</div>';
    $$('[data-contract-deal]', contracts).forEach(button => button.addEventListener('click',()=>selectDeal(button.dataset.contractDeal)));
    $$('[data-open-receivable]', receivables).forEach(button => button.addEventListener('click',()=>selectDeal(button.dataset.openReceivable)));
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
      <div><span>Controlled assets</span><strong>${state.fleetAssets.length}</strong></div>
      <div><span>Available</span><strong>${available}</strong></div>
      <div><span>Assigned</span><strong>${assigned}</strong></div>
      <div><span>Total capacity</span><strong>${capacity.toLocaleString('en-US')} t</strong></div>`;
    if (!state.fleetAssets.length) {
      container.innerHTML = '<div class="empty-card">No vessels under control. Charter your first asset from the charter market.</div>';
    } else {
      container.innerHTML = state.fleetAssets.map(asset => {
        const vessel = getVesselCatalog(asset.catalogId);
        const deal = asset.assignedDealId ? getActiveDeal(asset.assignedDealId) : null;
        return `<button class="fleet-card ${selected.type === 'vessel' && selected.id === asset.id ? 'selected' : ''}" data-fleet-asset="${asset.id}">
          <div class="fleet-card-head"><div><span>${vessel.vesselClass}</span><strong>${vessel.name}</strong></div><span class="status-pill ${asset.status === 'assigned' ? 'medium' : 'low'}">${asset.status}</span></div>
          <div class="fleet-grid">
            <div><span>Position</span><strong>${getHub(asset.positionHub)?.name || 'At sea'}</strong></div>
            <div><span>Capacity</span><strong>${vessel.capacity.toLocaleString('en-US')} t</strong></div>
            <div><span>${asset.ownership==='owned'?'Ownership':'Charter remaining'}</span><strong>${asset.ownership==='owned'?'Owned outright':`${asset.daysRemaining} days`}</strong></div>
            <div><span>Allocation</span><strong>${deal ? getOpportunity(deal.opportunityId).title : 'Open'}</strong></div>
          </div>
          ${asset.ownership==='owned'?`<div class="owned-vessel-strip"><span>Permanent fleet</span><strong>${money(asset.maintenance||0)}/day upkeep</strong></div>`:`<div class="charter-life"><span style="width:${asset.daysRemaining/asset.charterDays*100}%"></span></div>`}
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
        <button class="button secondary charter-button" data-charter-vessel="${vessel.id}" ${!unlocked || owned || !canAfford ? 'disabled' : ''}>${owned ? 'Already controlled' : unlocked ? 'Start time charter' : vessel.requiresOffice && !officeOwned(vessel.requiresOffice) ? `Requires ${getOffice(vessel.requiresOffice).name}` : `Requires rep ${vessel.minReputation}`}</button>
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
    if (risk.creditUtilization > .75) warnings.push('Credit-line utilization is above 75%.');
    if (risk.concentration > .65 && state.activeDeals.length > 1) warnings.push('The portfolio is concentrated in a single deal.');
    if (risk.liquidityCoverage < 1.25) warnings.push('Liquidity may not cover margin calls and unexpected costs.');
    if (risk.netFlatExposure > 1_000_000) warnings.push('Unhedged flat-price exposure exceeds $1 million.');
    if (risk.netFxExposure > 500_000) warnings.push('Residual FX exposure is significant.');
    if (risk.marginRequirement > state.cash * 1.5) warnings.push('Futures collateral is high relative to available liquidity.');
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
      ${warnings.length ? warnings.map(w => `<div class="risk-alert">${w}</div>`).join('') : '<div class="success-box">The portfolio is within the desk’s operating limits.</div>'}
      ${(()=>{
        if (!state.activeDeals.length) return '';
        const _book = {};
        state.activeDeals.forEach(deal => {
          const opp = getOpportunity(deal.opportunityId);
          if (!opp) return;
          const key = opp.priceKey || 'other';
          const label = opp.commodity || key;
          const qty = deal.quantity || opp.quantity || 0;
          const unhedgedShare = Math.max(0, 1 - (deal.hedgeRatio || 0) / 100);
          const mtmPnl = computeMarketImpact(deal);
          const notional = physicalNotional(opp, qty, deal.capital);
          if (!_book[key]) _book[key] = { label, qty: 0, notional: 0, mtmPnl: 0, deals: 0 };
          _book[key].qty += qty;
          _book[key].notional += notional * unhedgedShare;
          _book[key].mtmPnl += mtmPnl;
          _book[key].deals++;
        });
        const rows = Object.values(_book).map(pos => {
          const pnlColor = pos.mtmPnl >= 0 ? 'var(--green)' : 'var(--red)';
          return `<div class="position-row"><div class="pos-commodity">${pos.label}</div><div class="pos-stats"><div><span>Qty</span><strong>${(pos.qty/1000).toFixed(0)}kt</strong></div><div><span>Unhedged</span><strong>${money(pos.notional, true)}</strong></div><div><span>MTM P&L</span><strong style="color:${pnlColor}">${money(pos.mtmPnl)}</strong></div><div><span>Deals</span><strong>${pos.deals}</strong></div></div></div>`;
        }).join('');
        const totalMtm = Object.values(_book).reduce((s,p) => s + p.mtmPnl, 0);
        const totalNotional = Object.values(_book).reduce((s,p) => s + p.notional, 0);
        return `<div class="risk-card position-book"><div class="risk-headline"><strong>Open position book</strong><span style="color:${totalMtm>=0?'var(--green)':'var(--red)'}">MTM ${money(totalMtm)}</span></div><div class="pos-summary"><div><span>Unhedged notional</span><strong>${money(totalNotional, true)}</strong></div><div><span>Commodities</span><strong>${Object.keys(_book).length}</strong></div></div>${rows}</div>`;
      })()}`;
  }

  function renderOpportunityList() {
    const container = $('#opportunityList');
    const summary = $('#marketCycleSummary');
    if (summary) {
      const accepted = Object.values(state.negotiations || {}).filter(n => n.cycle === state.marketCycle && n.status === 'accepted').length;
      const regime = currentMarketRegime();
      const openTenders = Object.values(state.rivalMarket || {}).filter(t=>t.cycle===state.marketCycle && t.status==='open').length;
      summary.innerHTML = `
        <div><span>Market cycle</span><strong>#${state.marketCycle}</strong></div>
        <div><span>Regime</span><strong>${regime.label}</strong></div>
        <div><span>Season</span><strong>${currentSeason().label}</strong></div>
        <div><span>Refresh in</span><strong>${Math.max(0, 7-state.marketCycleDay)} days</strong></div>
        <div><span>Open tenders</span><strong>${openTenders}</strong></div>
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
      const tender = rivalTenderFor(opp.id);
      const rival = rivalForTender(tender);
      const rivalWon = tender?.status === 'awarded';
      const status = !unlocked ? 'Locked' : rivalWon ? `${rival.name} won` : !available ? 'Taken' : negotiation?.status === 'accepted' ? 'Tender secured' : negotiation?.status === 'rejected' ? 'Revise bid' : `${economics.expiresIn}d left`;
      const statusClass = !unlocked || rivalWon || !available ? 'high' : negotiation?.status === 'accepted' ? 'low' : negotiation?.status === 'rejected' ? 'medium' : opp.riskClass;
      return `<button class="opportunity-card ${selectedClass} ${unlocked && available ? '' : 'locked'}" data-opportunity-id="${opp.id}" ${unlocked && available ? '' : 'disabled'}>
        <div class="opportunity-card-head"><span class="route-name">${origin.name} <span class="route-arrow">→</span> ${destination.name}</span><span class="status-pill ${statusClass}">${status}</span></div>
        <div class="offer-line"><strong>${economics.quantity.toLocaleString('en-US')} t ${opp.commodity}</strong><span>Cycle ${state.marketCycle}</span></div>
        <div class="deal-card-meta"><div><span>Expected P&amp;L</span><strong>${money(economics.expectedPnl)}</strong></div><div><span>Required equity</span><strong>${money(economics.equity, true)}</strong></div></div>
        <div class="opportunity-card-meta"><div><span>Duration</span><strong>${economics.duration} days</strong></div><div><span>Acceptance</span><strong>${Math.round(economics.acceptance)}%</strong></div></div>
        <div class="seasonal-demand-row"><span>Seasonal flow · ${seasonalDemand(opp).label}</span><strong>${Math.round(seasonalDemand(opp).factor*100)}</strong></div>
        <div class="tender-pressure-row"><span>Rival interest · ${rival.name}</span><strong>${tender?.pressure || 0}%</strong></div>
        <div class="tender-pressure-track"><span style="width:${tender?.pressure || 0}%"></span></div>
        ${economics.crisisLabels.length ? `<div class="crisis-tag">Impacted · ${economics.crisisLabels.join(', ')}</div>` : ''}
      </button>`;
    }).join('');
    $$('[data-opportunity-id]', container).forEach(button => button.addEventListener('click', () => selectOpportunity(button.dataset.opportunityId)));
  }

  function renderRivals() {
    const summary = $('#rivalSummary');
    const list = $('#rivalOpportunityList');
    const feed = $('#rivalFeed');
    if (!summary || !list || !feed) return;
    initializeCompetitiveMarket();
    const regime = currentMarketRegime();
    const current = Object.entries(state.rivalMarket || {}).filter(([,t])=>t.cycle===state.marketCycle);
    const open = current.filter(([,t])=>t.status==='open').length;
    const won = current.filter(([,t])=>t.status==='player_reserved').length;
    const lost = current.filter(([,t])=>t.status==='awarded').length;
    const avgPressure = current.length ? current.reduce((sum,[,t])=>sum+(t.pressure||0),0)/current.length : 0;
    summary.innerHTML = `
      <div class="regime-card ${regime.tone}"><span>Market regime</span><strong>${regime.label}</strong><small>${regime.description}</small></div>
      <div><span>Open tenders</span><strong>${open}</strong></div>
      <div><span>Secured by you</span><strong>${won}</strong></div>
      <div><span>Lost this cycle</span><strong>${lost}</strong></div>
      <div><span>Average pressure</span><strong>${avgPressure.toFixed(0)}%</strong></div>`;
    list.innerHTML = opportunities.filter(isOpportunityUnlocked).map(opp => {
      const tender = rivalTenderFor(opp.id);
      const rival = rivalForTender(tender);
      const statusLabel = tender.status==='player_reserved' ? 'Secured' : tender.status==='awarded' ? 'Awarded to rival' : `Closes day ${tender.awardDay}`;
      return `<button class="rival-tender-card ${tender.status}" data-rival-opportunity="${opp.id}" ${tender.status==='awarded'?'disabled':''}>
        <div class="rival-tender-head"><div><span>${opp.commodity} tender</span><strong>${opp.title}</strong></div><span class="status-pill ${tender.status==='player_reserved'?'low':tender.status==='awarded'?'high':'medium'}">${statusLabel}</span></div>
        <div class="rival-desk-line"><span>Leading rival</span><strong>${rival.name} · ${rival.city}</strong></div>
        <div class="tender-pressure-row"><span>Competitive pressure</span><strong>${tender.pressure}%</strong></div>
        <div class="tender-pressure-track"><span style="width:${tender.pressure}%"></span></div>
      </button>`;
    }).join('');
    const entries = state.rivalFeed || [];
    feed.innerHTML = entries.length ? entries.slice(0,10).map(item => `<div class="rival-feed-card"><div><span>${formatDate(new Date(item.date))} · cycle ${item.cycle}</span><strong>${item.title}</strong></div><p>${item.description}</p></div>`).join('') : '<div class="empty-card">No tender awards yet. Rival desks will begin bidding as game days advance.</div>';
    $$('[data-rival-opportunity]', list).forEach(button=>button.addEventListener('click',()=>selectOpportunity(button.dataset.rivalOpportunity)));
  }

  function renderStrategy() {
    const summary=$('#strategySummary'), demand=$('#seasonDemandGrid'), doctrines=$('#doctrineList'), mandates=$('#boardMandates');
    if (!summary||!demand||!doctrines||!mandates) return;
    const season=currentSeason(), valuation=tradingHouseValuation(), doctrine=activeDoctrine();
    summary.innerHTML=`<div><span>Enterprise value</span><strong>${money(valuation.value,true)}</strong><small>${valuation.tier}</small></div><div><span>Current season</span><strong>${season.icon} ${season.label}</strong><small>${currentMarketRegime().label}</small></div><div><span>Desk doctrine</span><strong>${doctrine.label}</strong><small>${canChangeDoctrine()?'Board change available':`${14-((state.dayIndex||0)-(state.strategyChangedDay??-30))}d lock`}</small></div><div><span>Valuation high</span><strong>${money(state.valuationHigh||valuation.value,true)}</strong><small>Career record</small></div>`;
    const commodityDefs=[['Copper','copper'],['Aluminium','aluminium'],['Urea','urea'],['Diesel','crude'],['Wheat','wheat'],['Iron ore','ironore'],['Coffee','coffee']];
    demand.innerHTML=commodityDefs.map(([label,key])=>{const sample={priceKey:key},s=seasonalDemand(sample);return `<div class="season-card ${s.factor>=1.08?'hot':s.factor<=.94?'cold':''}"><span>${label}</span><strong>${s.label}</strong><div class="season-meter"><i style="width:${clamp((s.factor-.82)/.38*100,5,100)}%"></i></div><small>Demand index ${(s.factor*100).toFixed(0)}</small></div>`}).join('');
    doctrines.innerHTML=Object.values(strategyDoctrineCatalog).map(item=>`<button class="doctrine-card ${item.id===state.strategyDoctrine?'active':''}" data-doctrine="${item.id}" ${item.id!==state.strategyDoctrine&&!canChangeDoctrine()?'disabled':''}><div><i>${item.icon}</i><span><strong>${item.label}</strong><small>${item.description}</small></span></div><em>${item.id===state.strategyDoctrine?'Active':canChangeDoctrine()?'Adopt · '+money(18_000+state.activeDeals.length*4_000):'Board locked'}</em></button>`).join('');
    $$('[data-doctrine]',doctrines).forEach(button=>button.addEventListener('click',()=>changeDoctrine(button.dataset.doctrine)));
    mandates.innerHTML=boardMandateData().map(item=>{const pct=clamp(item.progress/item.target*100,0,100);return `<div class="mandate-card"><div><span>${item.label}</span><strong>${pct>=100?'Complete':`${Math.round(pct)}%`}</strong></div><p>${item.copy}</p><div class="mandate-track"><i style="width:${pct}%"></i></div><small>${typeof item.target==='number'&&item.target>=1_000_000?`${money(item.progress,true)} / ${money(item.target,true)}`:`${Math.min(item.progress,item.target)} / ${item.target}`}</small></div>`}).join('');
  }

  function renderCounterparties() {
    const summary = $('#counterpartySummary');
    const container = $('#counterpartyList');
    if (!summary || !container) return;
    const exposures = {};
    counterpartyCatalog.forEach(party => { exposures[party.id] = counterpartyExposure(party.id); });
    const avgRelationship = counterpartyCatalog.reduce((sum, p) => sum + getCounterpartyState(p.id).relationship, 0) / counterpartyCatalog.length;
    summary.innerHTML = `
      <div><span>Approved KYC</span><strong>${counterpartyCatalog.filter(p=>p.kyc==='Approved').length}/${counterpartyCatalog.length}</strong></div>
      <div><span>Avg relationship</span><strong>${Math.round(avgRelationship)}/100</strong></div>
      <div><span>Active exposure</span><strong>${money(Object.values(exposures).reduce((a,b)=>a+b,0), true)}</strong></div>
      <div><span>Disputes</span><strong>${counterpartyCatalog.reduce((sum,p)=>sum+(getCounterpartyState(p.id).disputes||0),0)}</strong></div>`;
    container.innerHTML = counterpartyCatalog.map(party => {
      const record = getCounterpartyState(party.id);
      const exposure = exposures[party.id] || 0;
      const limit = counterpartyCreditLimit(party.id);
      const pendingRequest = state.creditLimitRequests?.[party.id]?.status === 'pending';
      const relClass = record.relationship >= 65 ? 'low' : record.relationship >= 45 ? 'medium' : 'high';
      return `<div class="counterparty-card">
        <div class="counterparty-head"><div><span>${party.type} · ${party.country}</span><strong>${party.name}</strong></div><span class="status-pill ${party.kyc === 'Approved' ? 'low' : 'medium'}">${party.kyc}</span></div>
        <p>${party.description}</p>
        <div class="counterparty-grid">
          <div><span>Credit score</span><strong>${party.credit}/100</strong></div>
          <div><span>Rating</span><strong class="credit-rating-badge rating-${(party.creditRating||'BBB').replace('+','p').replace('-','m')}">${party.creditRating||'BBB'}</strong></div>
          <div><span>Reliability</span><strong>${party.reliability}/100</strong></div>
          <div><span>Relationship</span><strong>${record.relationship}/100</strong></div>
          <div><span>Exposure</span><strong>${money(exposure,true)}</strong></div>
          <div><span>Buyer limit</span><strong>${money(limit,true)}</strong></div>
        </div>
        <div class="credit-usage-bar"><span style="width:${clamp(limit?exposure/limit*100:0,0,100)}%"></span></div>
        <div class="relationship-bar"><span class="${relClass}" style="width:${record.relationship}%"></span></div>
        <div class="counterparty-foot"><span>${record.deals || 0} completed deals</span><span>${record.disputes || 0} disputes</span>
          <button class="outreach-btn" data-outreach="${party.id}">Warm outreach — $5,000</button>
          ${party.type === 'Buyer' ? `<button class="outreach-btn" data-limit-request="${party.id}" ${pendingRequest?'disabled':''}>${pendingRequest?'Limit review pending':'Request limit increase'}</button>` : ''}
        </div>
      </div>`;
    }).join('');
    $$('[data-outreach]', container).forEach(btn => btn.addEventListener('click', e => { e.stopPropagation(); warmOutreach(btn.dataset.outreach); }));
    $$('[data-limit-request]', container).forEach(btn => btn.addEventListener('click', e => { e.stopPropagation(); requestCreditLimit(btn.dataset.limitRequest); }));
  }

  function renderCompliance() {
    const summary = $('#complianceSummary');
    const queue = $('#complianceQueue');
    const active = $('#complianceActiveDeals');
    const journal = $('#tradeJournalList');
    if (!summary || !queue || !active || !journal) return;
    const profiles = opportunities.filter(isOpportunityUnlocked).filter(opportunityAvailable).map(opp => ({ opp, profile: complianceProfileForOpportunity(opp) }));
    const clearCount = profiles.filter(item => item.profile.canTrade).length;
    const reviewCount = profiles.filter(item => item.profile.requiresReview && !item.profile.reviewed && item.profile.status !== 'Blocked').length;
    const blockedCount = profiles.filter(item => item.profile.status === 'Blocked').length;
    summary.innerHTML = `
      <div><span>Tradable routes</span><strong>${clearCount}</strong></div>
      <div><span>Reviews required</span><strong>${reviewCount}</strong></div>
      <div><span>Blocked</span><strong>${blockedCount}</strong></div>
      <div><span>Compliance spend</span><strong>${money(state.complianceSpend || 0, true)}</strong></div>`;
    const reviewItems = profiles.filter(item => item.profile.requiresReview || item.profile.status === 'Blocked');
    queue.innerHTML = reviewItems.length ? reviewItems.map(({opp,profile}) => `
      <article class="compliance-card ${profile.status === 'Blocked' ? 'blocked' : profile.reviewed ? 'approved' : 'review'}">
        <div class="compliance-card-head"><div><span>${opp.commodity} · ${getHub(opp.origin).country}</span><strong>${opp.title}</strong></div><b>${profile.status}</b></div>
        <div class="compliance-score"><span>Risk score</span><strong>${profile.score}/100</strong></div>
        <p>${profile.flags.length ? profile.flags.join(' · ') : 'Standard KYC and jurisdiction profile.'}</p>
        ${profile.requiresReview && !profile.reviewed && profile.status !== 'Blocked' ? `<button class="button secondary" data-compliance-review="${opp.id}">Run enhanced review · ${money(profile.cost)}</button>` : ''}
      </article>`).join('') : '<div class="empty-card">No enhanced reviews are required in the current market cycle.</div>';
    active.innerHTML = state.activeDeals.length ? state.activeDeals.map(deal => {
      const opp = getOpportunity(deal.opportunityId);
      return `<div class="compliance-active-row"><div><span>${opp.commodity} · ${deal.operations?.salesContract?.status || 'Signed'}</span><strong>${opp.title}</strong></div><b>${deal.complianceStatus || 'Clear'} · ${deal.complianceScore || 0}/100</b></div>`;
    }).join('') : '<div class="empty-card">No live cargoes require compliance monitoring.</div>';
    const entries = state.tradeJournal || [];
    journal.innerHTML = entries.length ? entries.slice(0,24).map(item => `
      <div class="journal-row"><i class="journal-${(item.category || 'general').toLowerCase().replace(/[^a-z]+/g,'-')}"></i><div><span>${formatDate(new Date(item.date))} · ${item.category}</span><strong>${item.title}</strong><small>${item.detail}</small></div><b style="color:${item.impact >= 0 ? 'var(--green)' : 'var(--red)'}">${item.impact ? money(item.impact) : '—'}</b></div>`).join('') : '<div class="empty-card">Major commercial, risk and operational decisions will be recorded here.</div>';
    $$('[data-compliance-review]', queue).forEach(button => button.addEventListener('click', () => runComplianceReview(button.dataset.complianceReview)));
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
    </div>`).join('') : '<div class="success-box">No active global crisis. Routes are operating under normal conditions.</div>';
    // Market Intelligence panel
    const intelCooldown = (state.dayIndex||0) - (state.intelCooldownDay||-99);
    const intelReady = intelCooldown >= 5 && state.completedDeals >= 1;
    const intelWait = Math.max(0, 5 - intelCooldown);
    const report = state.intelReport;
    const intelReportHtml = report ? (() => {
      const dirRows = report.directions.map(d => `<div class="intel-dir ${d.delta > 0 ? 'up' : 'down'}"><span>${d.label}</span><strong>${d.arrow} ${d.bias}</strong></div>`).join('');
      return `<div class="intel-report-card">
        <div class="intel-report-head"><span class="eyebrow">3-day outlook · issued day ${report.day}</span><strong>Market Intelligence Report</strong></div>
        <div class="intel-dir-grid">${dirRows}</div>
        <div class="intel-meta"><div><span>Event risk</span><strong class="risk-${report.eventRisk.toLowerCase()}">${report.eventRisk}</strong></div><div><span>Freight</span><strong>${report.freightDir}</strong></div><div><span>Regime</span><strong>${report.regime}</strong></div></div>
      </div>`;
    })() : '';
    const intelBtnLabel = !intelReady && state.completedDeals < 1 ? 'Complete a deal to unlock intel' : !intelReady ? `Available in ${intelWait}d` : 'Buy research report — $18,000';
    const intelSection = `<div class="section-head history-head"><div><span class="eyebrow">Market intelligence</span><h2>Research desk</h2></div></div>
      ${intelReportHtml}
      <button class="action-btn intel-btn" id="buyIntelBtn" ${!intelReady ? 'disabled' : ''}>${intelBtnLabel}</button>`;
    const distressedOpp = state.distressedOpportunity;
    const distressedCard = distressedOpp ? `<div class="distressed-cargo-card">
      <div class="distressed-head"><span class="status-pill high">⚡ Distressed · ${Math.max(0, (distressedOpp.distressedExpiry||0) - (state.dayIndex||0))}d left</span><strong>${distressedOpp.title}</strong></div>
      <p>${distressedOpp.description}</p>
      <div class="distressed-stats">
        <div><span>Commodity</span><strong>${distressedOpp.commodity}</strong></div>
        <div><span>Route</span><strong>${getHub(distressedOpp.origin)?.name || distressedOpp.origin} → ${getHub(distressedOpp.destination)?.name || distressedOpp.destination}</strong></div>
        <div><span>Margin (discounted)</span><strong style="color:var(--green)">${money(distressedOpp.basePnl)}</strong></div>
        <div><span>Duration</span><strong>${distressedOpp.duration} days</strong></div>
      </div>
      <button class="button primary" id="viewDistressedBtn">Open distressed opportunity →</button>
    </div>` : '';
    const feedHtml = (state.worldEventFeed || []).map(item => `<div class="intelligence-item ${item.type}"><span>${formatDate(new Date(item.date))}</span><strong>${item.title}</strong><p>${item.description}</p></div>`).join('');
    container.innerHTML = `${activeHtml}${intelSection}${distressedCard ? `<div class="section-head history-head"><div><span class="eyebrow">Distressed cargo</span><h2>Urgent deal window</h2></div></div>${distressedCard}` : ''}<div class="section-head history-head"><div><span class="eyebrow">Intelligence feed</span><h2>Latest developments</h2></div></div>${feedHtml || '<div class="empty-card">The global intelligence feed will update over time.</div>'}`;
    $('#buyIntelBtn')?.addEventListener('click', () => buyMarketIntel());
    $('#viewDistressedBtn')?.addEventListener('click', () => {
      if (state.distressedOpportunity) {
        selected = { type: 'opportunity', id: state.distressedOpportunity.id };
        openInspector();
        // Switch to market tab so opportunity inspector is visible
        renderInspector();
      }
    });
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
      <div><span>Emergency fees</span><strong>${money(state.emergencyFundingCost||0)}</strong></div>
      <div><span>Credit losses</span><strong>${money(state.creditLosses||0)}</strong></div>
      <div><span>Receivable protection</span><strong>${money(state.receivableProtectionCost||0)}</strong></div>`;
    dealList.innerHTML = state.activeDeals.length ? state.activeDeals.map(deal => {
      const opp = getOpportunity(deal.opportunityId);
      const required = currentMarginRequirement(deal);
      const coverage = required ? (deal.marginCollateral||0)/required : 1;
      return `<button class="finance-card" data-finance-deal="${deal.id}">
        <div class="finance-card-head"><div><span>${opp.commodity} · ${opp.title}</span><strong>${financingProfiles[deal.financingStrategy||'revolver']?.label}</strong></div><span class="status-pill ${coverage>=1?'low':'high'}">${Math.round(coverage*100)}% margin</span></div>
        <div class="finance-grid"><div><span>Debt</span><strong>${money(deal.borrowed,true)}</strong></div><div><span>Rate</span><strong>${((deal.financingRate||0)*100).toFixed(1)}%</strong></div><div><span>Collateral</span><strong>${money(deal.marginCollateral||0,true)}</strong></div><div><span>Interest</span><strong>${money(deal.financingAccrued||0)}</strong></div></div>
        <div class="capital-bar margin"><span style="width:${clamp(coverage*100,0,100)}%"></span></div>
      </button>`;
    }).join('') : '<div class="empty-card">No active funding. Open a deal to use facilities, LCs and futures collateral.</div>';
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
        showToast(`Lesson completed: ${lesson.title}. Reward ${money(12_000)}.`);
      }
    } else {
      current.lastWrong = Number(answer);
      showToast('Incorrect answer. Review the concept and try again.');
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
      return `<div class="academy-card ${progress.completed?'completed':unlocked?'':'locked'}"><div class="academy-head"><div><span>Module ${index+1}</span><strong>${lesson.title}</strong></div><span class="status-pill ${progress.completed?'low':unlocked?'medium':'high'}">${progress.completed?'Complete':unlocked?'Open':'Locked'}</span></div><p>${lesson.concept}</p>${unlocked&&!progress.completed?`<div class="academy-question"><strong>${lesson.question}</strong>${lesson.options.map((option,i)=>`<button data-academy-answer="${lesson.id}" data-answer-index="${i}">${option}</button>`).join('')}</div>`:progress.completed?'<div class="success-box">Knowledge verified and ready to apply in deals.</div>':'<div class="warning-box">Complete the previous module to unlock this lesson.</div>'}</div>`;
    }).join('');
    glossary.innerHTML = glossaryCatalog.map(([term,definition])=>`<details class="glossary-item"><summary>${term}</summary><p>${definition}</p></details>`).join('');
    $$('[data-academy-answer]',lessons).forEach(button=>button.addEventListener('click',()=>completeAcademyLesson(button.dataset.academyAnswer,button.dataset.answerIndex)));
  }

  function renderEmpire() {
    const summary=$('#investmentSummary'), queue=$('#builderQueue'), container=$('#investmentList');
    if(!summary||!queue||!container) return;
    const levels=totalInvestmentLevels(), income=dailyInvestmentIncome(), book=investmentBookValue(), active=activeProjectCount();
    summary.innerHTML=`<div><span>Industrial levels</span><strong>${levels}</strong></div><div><span>Asset book value</span><strong>${money(book,true)}</strong></div><div><span>Daily asset income</span><strong>${money(income)}</strong></div><div><span>Project teams</span><strong>${active}/${builderSlots()}</strong></div>`;
    const builds=investmentCatalog.filter(asset=>investmentRecord(asset.id).buildingTo);
    queue.innerHTML=builds.length?builds.map(asset=>{const r=investmentRecord(asset.id);const total=investmentBuildDays(asset,r.buildingTo);const pct=(1-r.daysRemaining/total)*100;return `<div class="builder-card"><div><span>${asset.chain} construction</span><strong>${asset.name} · L${r.buildingTo}</strong><small>${r.daysRemaining} days remaining</small></div><div class="progress-track"><span style="width:${pct}%"></span></div></div>`}).join(''):`<div class="empty-card compact">No projects under construction. You have ${builderSlots()} project teams available.</div>`;
    // v32 buy extra project team with gold bars
    const gCost = builderGoldCost();
    queue.innerHTML += `<div class="buy-builder-card"><div class="bb-info"><span>Squadra di progetto extra</span><small>+1 builder permanente · ${state.bonusBuilders||0} acquistati</small></div><button class="button gold buy-builder-btn" id="buyBuilderBtn" ${(state.goldBars||0)<gCost?'disabled':''}>${gCost} lingotti</button></div>`;
    const bbBtn = $('#buyBuilderBtn'); if (bbBtn) bbBtn.addEventListener('click', buyExtraBuilder);
    const visible=investmentCatalog.filter(asset=>selectedEmpireChain==='all'||asset.chain===selectedEmpireChain);
    container.innerHTML=visible.map(asset=>{
      const r=investmentRecord(asset.id), level=r.level||0, target=level+1, max=level>=asset.maxLevel, unlocked=investmentUnlocked(asset), building=Boolean(r.buildingTo), cost=max?0:investmentCost(asset,target), days=max?0:investmentBuildDays(asset,target);
      const benefits=[asset.dailyIncome?`${money(asset.dailyIncome*level)}/day`:null,asset.pnlBonus?`+${money(asset.pnlBonus*level)} deal edge`:null,asset.durationBonus&&level?`-${asset.durationBonus*level} days`:null].filter(Boolean).join(' · ');
      return `<article class="investment-card chain-${asset.chain} ${building?'building':''} ${!unlocked?'locked':''}" data-investment-card="${asset.id}"><div class="investment-card-top"><div class="asset-icon">${asset.icon}</div><div><span>${asset.chain}</span><strong>${asset.name}</strong><small>${getHub(asset.hub)?.name||''}</small></div><b>L${level}/${asset.maxLevel}</b></div><p>${asset.description}</p><div class="asset-level-track">${Array.from({length:asset.maxLevel},(_,i)=>`<i class="${i<level?'filled':''} ${r.buildingTo===i+1?'building':''}"></i>`).join('')}</div><div class="investment-benefit">${level?benefits:'No active benefit — build level 1'}</div><div class="investment-economics"><div><span>Upgrade cost</span><strong>${max?'MAX':money(cost)}</strong></div><div><span>Build time</span><strong>${max?'—':`${days} days`}</strong></div></div><button class="button ${building?'secondary':'primary'} investment-action" data-build-investment="${asset.id}" ${max||building||!unlocked||state.cash<cost||activeProjectCount()>=builderSlots()?'disabled':''}>${building?`Building L${r.buildingTo} · ${r.daysRemaining}d`:max?'Maximum level':unlocked?`Build level ${target}`:`Requires rep ${asset.minReputation} · ${asset.minDeals} deals`}</button></article>`;
    }).join('');
    $$('[data-empire-chain]').forEach(button=>button.classList.toggle('active',button.dataset.empireChain===selectedEmpireChain));
    $$('[data-empire-chain]').forEach(button=>button.onclick=()=>{selectedEmpireChain=button.dataset.empireChain;renderEmpire();});
    $$('[data-build-investment]',container).forEach(button=>button.onclick=()=>startInvestment(button.dataset.buildInvestment));
    $$('[data-investment-card]',container).forEach(card=>card.addEventListener('click',event=>{if(event.target.closest('button'))return;selectInvestment(card.dataset.investmentCard);}));
  }

  function renderShop() {
    const summary=$('#shopSummary'), queue=$('#shopBuildQueue'), catalog=$('#shopCatalogList');
    if(!summary||!queue||!catalog) return;
    const orders=state.shopOrders||[];
    const delivered=shopCatalog.reduce((sum,item)=>sum+shopOwnedQuantity(item.id),0);
    const permanentShips=(state.fleetAssets||[]).filter(asset=>asset.ownership==='owned').length;
    summary.innerHTML=`
      <div><span>Permanent assets</span><strong>${delivered}</strong></div>
      <div><span>Owned vessels</span><strong>${permanentShips}</strong></div>
      <div><span>Asset book value</span><strong>${money(shopBookValue(),true)}</strong></div>
      <div><span>Project teams</span><strong>${activeProjectCount()}/${builderSlots()}</strong></div>`;
    const queueCount=$('#shopQueueCount'); if(queueCount) queueCount.textContent=orders.length;
    const badge=$('#shopBadge'); if(badge){ badge.textContent=orders.length; badge.classList.toggle('hidden',!orders.length); }
    queue.innerHTML=orders.length?orders.map(order=>{
      const item=shopDefinition(order.itemId); const pct=Math.round((1-order.daysRemaining/Math.max(1,order.totalDays))*100);
      return `<article class="shop-order-card"><div class="shop-order-icon">${item?.icon||'▦'}</div><div><span>${item?.category||'asset'} project</span><strong>${item?.name||'Capital asset'}</strong><small>${order.daysRemaining} days remaining · ${pct}% complete</small><div class="shop-order-progress"><i style="width:${pct}%"></i></div></div></article>`;
    }).join(''):`<div class="empty-card compact">No store orders under construction. ${Math.max(0,builderSlots()-activeProjectCount())} project team${builderSlots()-activeProjectCount()===1?'':'s'} available.</div>`;
    const visible=shopCatalog.filter(item=>selectedShopCategory==='all'||item.category===selectedShopCategory);
    catalog.innerHTML=visible.map(item=>{
      const owned=shopOwnedQuantity(item.id), pending=shopPendingQuantity(item.id), unlocked=shopUnlocked(item), maxed=owned+pending>=item.maxOwned;
      const officeMissing=item.requiresOffice&&!officeOwned(item.requiresOffice);
      const lockText=officeMissing?`Requires ${getOffice(item.requiresOffice)?.name}`:`Requires rep ${item.minReputation} · ${item.minDeals} deals`;
      const busy=activeProjectCount()>=builderSlots();
      const status=pending?`${pending} building`:owned?`${owned}/${item.maxOwned} owned`:'Available';
      return `<article class="shop-item-card category-${item.category} ${!unlocked?'locked':''} ${pending?'building':''}">
        <div class="shop-ribbon">${item.category==='fleet'?'SHIPYARD':item.category==='storage'?'STORAGE':'LOGISTICS'}</div>
        <div class="shop-item-visual"><span>${item.icon}</span><em>${status}</em></div>
        <div class="shop-item-copy"><span>${item.category}</span><h3>${item.name}</h3><p>${item.description}</p></div>
        <div class="shop-benefit"><b>Permanent benefit</b><span>${item.benefit}</span></div>
        <div class="shop-item-meta">
          <div><span>Price</span><strong>${money(item.cost)}</strong></div>
          <div><span>Build time</span><strong>${item.buildDays} days</strong></div>
          <div><span>Owned</span><strong>${owned}/${item.maxOwned}</strong></div>
          <div><span>Daily upkeep</span><strong>${money(item.maintenance||item.dailyCost||0)}</strong></div>
        </div>
        <div class="shop-level-pips">${Array.from({length:item.maxOwned},(_,i)=>`<i class="${i<owned?'owned':i<owned+pending?'building':''}"></i>`).join('')}</div>
        <button class="shop-buy-button" data-buy-shop-item="${item.id}" ${!unlocked||maxed||busy||state.cash<item.cost?'disabled':''}>
          <span>${maxed?'MAX':pending?'ORDER MORE':unlocked?'BUY & BUILD':'LOCKED'}</span><b>${maxed?'Capacity reached':!unlocked?lockText:busy?'All teams busy':state.cash<item.cost?'Insufficient cash':`${money(item.cost)} · ${item.buildDays}d`}</b>
        </button>
      </article>`;
    }).join('');
    $$('[data-shop-category]').forEach(button=>button.classList.toggle('active',button.dataset.shopCategory===selectedShopCategory));
    $$('[data-shop-category]').forEach(button=>button.onclick=()=>{selectedShopCategory=button.dataset.shopCategory;renderShop();});
    $$('[data-buy-shop-item]',catalog).forEach(button=>button.onclick=()=>buyShopItem(button.dataset.buyShopItem));
  }

  function renderHQ() {
    const summary = $('#hqSummary');
    const officesContainer = $('#officeList');
    const staffContainer = $('#staffList');
    if (!summary || !officesContainer || !staffContainer) return;
    const _qPnl      = state.realizedPnl - (state.quarterStartPnl || 0);
    const _qTarget   = state.quarterTarget || 500000;
    const _qPct      = Math.min(100, Math.round((_qPnl / _qTarget) * 100));
    const _qNum      = state.quarterNumber || 1;
    const _qLabel    = ['Q1','Q2','Q3','Q4'][(_qNum - 1) % 4] + ' Year ' + Math.ceil(_qNum / 4);
    const _qColor    = _qPct >= 100 ? 'var(--green)' : _qPct >= 60 ? 'var(--orange)' : 'var(--red)';
    summary.innerHTML = `
      <div><span>Regional desks</span><strong>${state.offices.length}/${officeCatalog.length}</strong></div>
      <div><span>Team members</span><strong>${state.staff.length}/${staffCatalog.length}</strong></div>
      <div><span>Daily overhead</span><strong>${money(dailyOverhead())}</strong></div>
      <div><span>Total overhead paid</span><strong>${money(state.overheadPaid || 0, true)}</strong></div>
      <div class="quarter-target-block">
        <div class="quarter-target-head"><span>${_qLabel} desk target</span><strong>${money(_qPnl, true)} / ${money(_qTarget, true)}</strong></div>
        <div class="quarter-target-bar"><span style="width:${_qPct}%;background:${_qColor}"></span></div>
        <div class="quarter-target-meta"><span>${_qPct}% of target${state.quarterBonusPaid ? ' · Bonuses paid: ' + money(state.quarterBonusPaid, true) : ''}</span><span>${state.quarterMissed ? state.quarterMissed + ' missed' : '✓ on track'}</span></div>
      </div>`;
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
    const achievementGrid = $('#achievementGrid');
    if (achievementGrid) achievementGrid.innerHTML = achievementCatalog.map(item => {
      const unlocked = (state.achievements || []).includes(item.id);
      return `<div class="achievement-card ${unlocked?'unlocked':'locked'}"><span class="achievement-icon">${item.icon}</span><div><strong>${item.title}</strong><p>${item.description}</p></div><em>${unlocked?'Unlocked':'Locked'}</em></div>`;
    }).join('');
    // Analytics panel
    const analyticsPanel = $('#analyticsPanel');
    if (analyticsPanel) {
      const pnlMap = state.pnlByCommodity || {};
      const entries = Object.entries(pnlMap).sort((a,b) => b[1].pnl - a[1].pnl);
      if (!entries.length) {
        analyticsPanel.innerHTML = '<p style="color:var(--muted);font-size:13px;padding:12px 0">No closed trades yet. Complete your first deal to see analytics.</p>';
      } else {
        const totalPnl = entries.reduce((s,[,v]) => s+v.pnl, 0);
        const totalWins = entries.reduce((s,[,v]) => s+v.wins, 0);
        const totalTrades = entries.reduce((s,[,v]) => s+v.wins+v.losses, 0);
        const bestTrade = entries.reduce((best,[k,v]) => v.bestPnl > (best?.pnl||0) ? {commodity:k,pnl:v.bestPnl} : best, null);
        const worstTrade = entries.reduce((worst,[k,v]) => v.worstPnl < (worst?.pnl||Infinity) ? {commodity:k,pnl:v.worstPnl} : worst, null);
        const overallBar = `<div class="analytics-overview">
          <div><span>Total realised P&L</span><strong style="color:${totalPnl>=0?'var(--green)':'var(--red)'}">${money(totalPnl)}</strong></div>
          <div><span>Win rate</span><strong>${totalTrades?Math.round(totalWins/totalTrades*100):0}%</strong></div>
          <div><span>Best trade</span><strong style="color:var(--green)">${bestTrade?money(bestTrade.pnl)+' ('+bestTrade.commodity+')':'—'}</strong></div>
          <div><span>Worst trade</span><strong style="color:var(--red)">${worstTrade&&worstTrade.pnl<0?money(worstTrade.pnl)+' ('+worstTrade.commodity+')':'—'}</strong></div>
        </div>`;
        const maxAbsPnl = Math.max(...entries.map(([,v])=>Math.abs(v.pnl)),1);
        const rows = entries.map(([key,v]) => {
          const wr = (v.wins+v.losses) ? Math.round(v.wins/(v.wins+v.losses)*100) : 0;
          const barW = Math.round(Math.abs(v.pnl)/maxAbsPnl*100);
          const col = v.pnl >= 0 ? 'var(--green)' : 'var(--red)';
          return `<div class="analytics-row">
            <div class="analytics-label"><strong>${key}</strong><span>${v.wins+v.losses} trades · ${wr}% win</span></div>
            <div class="analytics-bar-wrap"><div class="analytics-bar" style="width:${barW}%;background:${col}"></div></div>
            <div class="analytics-value" style="color:${col}">${money(v.pnl)}</div>
          </div>`;
        }).join('');
        analyticsPanel.innerHTML = overallBar + '<div class="analytics-table">' + rows + '</div>';
      }
    }
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
      <div class="leaderboard-disclosure">World of Trade Career League uses transparent simulated rivals in this offline prototype. Your score is based only on your real World of Trade career results.</div>
      <button class="button secondary leaderboard-share" id="copyLeaderboardResult">Copy ranking result</button>`;
    history.innerHTML=(state.leaderboardSnapshots||[]).length ? state.leaderboardSnapshots.map(item=>`<div class="season-card"><div><span>Season ${item.season}</span><strong>#${item.position} · ${item.league}</strong></div><div><span>Rating</span><strong>${item.score.toLocaleString('en-US')}</strong></div><div><span>P&L</span><strong>${money(item.pnl,true)}</strong></div></div>`).join('') : '<div class="empty-card">The first season will be archived after 90 game days.</div>';
    $$('[data-leaderboard-mode]',table).forEach(button=>button.addEventListener('click',()=>{selectedLeaderboardMode=button.dataset.leaderboardMode;renderLeaderboard();}));
    $('#saveLeaderboardProfile')?.addEventListener('click',()=>{
      const trader=$('#leaderboardTraderName')?.value.trim();
      const company=$('#leaderboardCompanyName')?.value.trim();
      if (trader) state.profileName=trader;
      if (company) state.companyName=company;
      saveState();renderAll();showToast('Career League identity updated.');
    });
    $('#copyLeaderboardResult')?.addEventListener('click',async()=>{
      const text=`World of Trade Career League · ${state.companyName} · #${player.position}/${rows.length} · ${league.name} · rating ${leaderboardScore()} · P&L ${money(state.realizedPnl||0)}`;
      try { await navigator.clipboard.writeText(text); showToast('Ranking result copied.'); }
      catch { showToast(text); }
    });
  }

  function performanceAttribution() {
    const labels = {
      commercial:'Commercial margin', operations:'Operations & claims', financing:'Financing', market:'Market & basis',
      fx:'FX', storage:'Storage optionality', credit:'Credit', demurrage:'Demurrage'
    };
    const totals = Object.fromEntries(Object.keys(labels).map(key => [key, 0]));
    (state.history || []).forEach(deal => {
      const breakdown = deal.pnlBreakdown || {};
      Object.keys(totals).forEach(key => { totals[key] += Number(breakdown[key] || 0); });
    });
    return Object.entries(totals).map(([key,value]) => ({ key, label:labels[key], value })).sort((a,b)=>Math.abs(b.value)-Math.abs(a.value));
  }

  function outstandingReceivablesValue() {
    return state.activeDeals.reduce((sum, deal) => {
      if (!deal.delivered || deal.invoiceStatus === 'Paid') return sum;
      return sum + Number(deal.invoiceAmount || deal.capital || 0);
    }, 0);
  }

  function performanceScore() {
    const risk = riskStats();
    const closed = state.history || [];
    const profitable = closed.length ? closed.filter(item => (item.pnl || 0) > 0).length / closed.length : .5;
    const avgReadiness = closed.length ? closed.reduce((sum,item)=>sum+(item.operationalReadiness||75),0)/closed.length : 75;
    const cashConversion = Math.min(100, 55 + (state.receivablesCollected||0)/100_000*4 - (state.overdueReceivables||0)*6);
    const compliance = Math.max(0, 100 - (state.complianceIncidents||[]).length*12);
    const profitability = clamp(45 + profitable*35 + Math.min(20, Math.max(-20,(state.realizedPnl||0)/100_000*3)),0,100);
    const resilience = clamp(100-risk.riskScore,0,100);
    const score = Math.round(profitability*.28 + resilience*.27 + avgReadiness*.20 + cashConversion*.15 + compliance*.10);
    return { score, profitability, resilience, execution:avgReadiness, cashConversion, compliance };
  }

  function calculateStressScenario(id) {
    const scenario = stressScenarioCatalog[id];
    if (!scenario) return null;
    const risk = riskStats();
    const stats = portfolioStats();
    const receivables = outstandingReceivablesValue();
    const oceanCapital = state.activeDeals.reduce((sum,deal)=>{
      const opp=getOpportunity(deal.opportunityId);
      return sum + (transportClassForOpportunity(opp)==='ocean' ? (deal.capital||0) : 0);
    },0);
    let components = [];
    let loss = 0;
    let collateralCall = 0;
    let creditCapacityReduction = 0;
    if (id === 'commodity') {
      const flatLoss = risk.netFlatExposure * .12;
      const basisLoss = state.activeDeals.reduce((sum,deal)=>sum + physicalNotional(getOpportunity(deal.opportunityId),deal.quantity,deal.capital)*.012,0);
      components=[['Residual flat-price exposure',flatLoss],['Basis widening',basisLoss]];
      loss=flatLoss+basisLoss;
      collateralCall=risk.marginRequirement*.24;
    } else if (id === 'freight') {
      const freightLoss=oceanCapital*.018;
      const delayFunding=state.activeDeals.reduce((sum,d)=>sum+(d.borrowed||0)*.075*14/360,0);
      components=[['Freight repricing',freightLoss],['Extended financing',delayFunding]];
      loss=freightLoss+delayFunding;
    } else if (id === 'fx') {
      const fxLoss=risk.netFxExposure*.10;
      const settlementMismatch=receivables*.015;
      components=[['Unhedged FX exposure',fxLoss],['Receivable mismatch',settlementMismatch]];
      loss=fxLoss+settlementMismatch;
    } else if (id === 'credit') {
      const defaultLoss=receivables*.20;
      const concentrationLoss=Math.max(0,risk.concentration-.30)*stats.creditUsed*.08;
      components=[['Unsecured receivable loss',defaultLoss],['Concentration penalty',concentrationLoss]];
      loss=defaultLoss+concentrationLoss;
      creditCapacityReduction=effectiveCreditLimit()*.15;
    } else if (id === 'liquidity') {
      collateralCall=risk.marginRequirement*.45 + risk.netFlatExposure*.035;
      const fundingSpread=stats.creditUsed*.025;
      const receivableDelay=receivables*.06;
      components=[['Variation margin call',collateralCall],['Funding spread shock',fundingSpread],['Delayed collections',receivableDelay]];
      loss=fundingSpread+receivableDelay;
      creditCapacityReduction=effectiveCreditLimit()*.25;
    }
    const cashImpact = loss + collateralCall;
    const postStressCash = state.cash - cashImpact;
    const postStressNav = stats.nav - loss;
    const postStressCreditAvailable = stats.creditAvailable - creditCapacityReduction;
    const reserve = minimumCashReserve();
    return {
      id, label:scenario.label, date:state.date, dayIndex:state.dayIndex, loss:Math.round(loss), collateralCall:Math.round(collateralCall),
      cashImpact:Math.round(cashImpact), postStressCash:Math.round(postStressCash), postStressNav:Math.round(postStressNav),
      postStressCreditAvailable:Math.round(postStressCreditAvailable), reserve,
      liquidityBreach:postStressCash<reserve, creditBreach:postStressCreditAvailable<0,
      components:components.map(([label,value])=>({label,value:Math.round(value)}))
    };
  }

  function runStressTest(id) {
    const result = calculateStressScenario(id);
    if (!result) return;
    state.lastStressTest = result;
    state.stressTestsRun = (state.stressTestsRun || 0) + 1;
    state.stressTestHistory = [result, ...(state.stressTestHistory || [])].slice(0,12);
    recordJournal('Risk', `${result.label} stress test`, `Projected loss ${money(result.loss)} · post-stress cash ${money(result.postStressCash)}${result.liquidityBreach?' · liquidity breach':''}`, 0, id);
    evaluateMissions();
    evaluateAchievements();
    saveState(); renderAll();
    showToast(`${result.label}: projected cash impact ${money(result.cashImpact)}.`);
  }

  function renderPerformance() {
    const summary=$('#performanceSummary'), attribution=$('#pnlAttribution'), policies=$('#capitalPolicyList'), scenarios=$('#stressScenarioList'), resultBox=$('#stressResult');
    if (!summary || !attribution || !policies || !scenarios || !resultBox) return;
    const stats=portfolioStats(); const risk=riskStats(); const score=performanceScore(); const reserve=minimumCashReserve(); const policy=activeCapitalPolicy();
    const closed=state.history||[]; const winRate=closed.length ? closed.filter(item=>(item.pnl||0)>0).length/closed.length*100 : 0;
    summary.innerHTML=`
      <div class="performance-score-card"><span>Board performance score</span><strong>${score.score}</strong><small>${score.score>=80?'Institutional quality':score.score>=65?'Scalable platform':score.score>=50?'Developing desk':'Board intervention required'}</small></div>
      <div><span>Realized P&amp;L</span><strong class="${(state.realizedPnl||0)>=0?'positive':'negative'}">${money(state.realizedPnl||0,true)}</strong><small>${closed.length} closed cargoes</small></div>
      <div><span>Win rate</span><strong>${winRate.toFixed(0)}%</strong><small>Profitable settlements</small></div>
      <div><span>Liquidity reserve</span><strong>${money(reserve,true)}</strong><small>${Math.round(policy.reserveRatio*100)}% of NAV policy</small></div>
      <div><span>Reserve headroom</span><strong class="${capitalPolicyHeadroom()>=0?'positive':'negative'}">${money(capitalPolicyHeadroom(),true)}</strong><small>Cash above board minimum</small></div>
      <div><span>Desk risk</span><strong>${Math.round(risk.riskScore)}/100</strong><small>${risk.riskScore<35?'Controlled':risk.riskScore<65?'Elevated':'High'}</small></div>`;
    const items=performanceAttribution(); const max=Math.max(1,...items.map(item=>Math.abs(item.value)));
    attribution.innerHTML=items.map(item=>`<div class="attribution-row"><div><span>${item.label}</span><strong class="${item.value>=0?'positive':'negative'}">${money(item.value,true)}</strong></div><div class="attribution-track"><i class="${item.value>=0?'positive':'negative'}" style="width:${Math.max(2,Math.abs(item.value)/max*100)}%"></i></div></div>`).join('') || '<div class="empty-card">P&amp;L attribution will appear after the first settlement.</div>';
    policies.innerHTML=Object.values(capitalPolicyCatalog).map(item=>`<button class="capital-policy-card ${item.id===state.capitalPolicy?'active':''}" data-capital-policy="${item.id}" ${item.id!==state.capitalPolicy&&!canChangeCapitalPolicy()?'disabled':''}><div><i>${item.icon}</i><span><strong>${item.label}</strong><small>${item.description}</small></span></div><div class="policy-metrics"><em>${Math.round(item.reserveRatio*100)}% reserve</em><em>${item.pnlFactor>1?'+':''}${Math.round((item.pnlFactor-1)*100)}% deal margin</em><em>${item.riskAdjustment>0?'+':''}${item.riskAdjustment} risk</em></div><b>${item.id===state.capitalPolicy?'Active':canChangeCapitalPolicy()?'Adopt':'Board locked'}</b></button>`).join('');
    scenarios.innerHTML=Object.values(stressScenarioCatalog).map(item=>{const preview=calculateStressScenario(item.id); return `<button class="stress-scenario-card" data-stress-scenario="${item.id}"><i>${item.icon}</i><span><strong>${item.label}</strong><small>${item.subtitle}</small><em>${item.description}</em></span><b>${money(preview?.cashImpact||0,true)} impact</b></button>`;}).join('');
    const result=state.lastStressTest;
    resultBox.innerHTML=result?`<div class="stress-result-head"><div><span>Latest stress test</span><strong>${result.label}</strong></div><b class="${result.liquidityBreach||result.creditBreach?'negative':'positive'}">${result.liquidityBreach||result.creditBreach?'Limit breach':'Within limits'}</b></div><div class="stress-result-grid"><div><span>Projected loss</span><strong class="negative">${money(result.loss,true)}</strong></div><div><span>Cash impact</span><strong class="negative">${money(result.cashImpact,true)}</strong></div><div><span>Post-stress cash</span><strong>${money(result.postStressCash,true)}</strong></div><div><span>Post-stress NAV</span><strong>${money(result.postStressNav,true)}</strong></div></div><div class="stress-components">${(result.components||[]).map(item=>`<div><span>${item.label}</span><strong>${money(item.value)}</strong></div>`).join('')}</div>`:'<div class="empty-card">Select a scenario to produce a board-level loss and liquidity estimate.</div>';
    $$('[data-capital-policy]',policies).forEach(button=>button.addEventListener('click',()=>changeCapitalPolicy(button.dataset.capitalPolicy)));
    $$('[data-stress-scenario]',scenarios).forEach(button=>button.addEventListener('click',()=>runStressTest(button.dataset.stressScenario)));
  }

  function renderAllLists() {
    renderActiveDeals();
    renderHistory();
    renderInventory();
    renderOperations();
    renderSupplyChain();
    renderContracts();
    renderFleet();
    renderRiskDashboard();
    renderOpportunityList();
    renderRivals();
    renderStrategy();
    renderCounterparties();
    renderCompliance();
    renderWorldEvents();
    renderFinance();
    renderPerformance();
    renderAcademy();
    renderEmpire();
    renderShop();
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
        <div class="inspector-stat"><span>Available routes</span><strong>${related.length}</strong></div>
        <div class="inspector-stat"><span>WoT presence</span><strong>${officeOwned(hub.id) ? 'Regional desk' : hub.id === 'geneva' ? 'Headquarters' : 'No office'}</strong></div>
        <div class="inspector-stat"><span>Commodity access</span><strong>${hub.commodities.length}</strong></div>
      </div>
      <div class="inspector-section"><h3>Local market</h3>
        <div class="tag-row">${hub.commodities.map(c => `<span class="tag">${c}</span>`).join('')}</div>
        ${(()=>{
          const basis = state.hubBasis?.[hub.id];
          if (!basis || !Object.keys(basis).length) return '';
          const rows = Object.entries(basis).map(([key,val]) => {
            const sign = val >= 0 ? '+' : '';
            const fmt = Math.abs(val) < 5 ? val.toFixed(2) : Math.round(val);
            const col = val > 2 ? 'var(--green)' : val < -2 ? 'var(--red)' : 'var(--muted)';
            const unit = key === 'crude' ? '/bbl' : '/t';
            return `<div class="basis-row"><span>${key.charAt(0).toUpperCase()+key.slice(1)} local basis</span><strong style="color:${col}">${sign}${fmt}${unit}</strong></div>`;
          }).join('');
          return `<div class="basis-grid">${rows}</div>`;
        })()}
      </div>
      ${related.length ? `<div class="inspector-section"><h3>Related opportunities</h3>${related.map(o => `<button class="event-choice" data-open-opportunity="${o.id}"><strong>${o.title}</strong><small>${getHub(o.origin).name} → ${getHub(o.destination).name} · ${money(opportunityEconomics(o).basePnl)} expected</small></button>`).join('')}</div>` : ''}
      ${hub.locked && related.length === 0 ? '<div class="warning-box">Hub not yet accessible. Complete more deals and increase reputation.</div>' : ''}
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
    const buyerId = partiesForOpportunity(opp).buyerId;
    const buyerLimit = buyerId ? counterpartyCreditLimit(buyerId) : 0;
    const buyerExposure = buyerId ? counterpartyExposure(buyerId) : 0;
    const requiredBuyerLimit = buyerId ? prospectiveCreditExposure(opp, economics) : 0;
    const buyerLimitClear = !buyerId || buyerLimit - buyerExposure >= requiredBuyerLimit;
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
    const compliance = complianceProfileForOpportunity(opp);
    return `
      <div class="location-badge">◎ Live market offer · ${economics.expiresIn}d</div>
      <h2>${opp.title}</h2>
      <div class="inspector-subtitle">${origin.name} → ${destination.name}${opp.via?.length ? ` via ${opp.via.map(id=>getHub(id).name).join(', ')}` : ''}</div>
      <p class="inspector-subtitle" style="margin-top:12px">${opp.description}</p>
      ${economics.crisisLabels.length ? `<div class="global-impact-box"><strong>Global disruption impact</strong><span>${economics.crisisLabels.join(' · ')}</span></div>` : ''}
      ${economics.verticalSources?.length ? `<div class="vertical-impact-box"><strong>Vertical integration advantage</strong><span>${economics.verticalSources.join(' · ')}</span></div>` : ''}
      <div class="supply-impact-box ${economics.routeCondition.severity.toLowerCase()}"><div><span>Supply-chain capacity</span><strong>${economics.routeCondition.severity} · ${economics.routeCondition.score}/100</strong></div><small>${economics.routeCondition.bottleneck} · +${economics.routeCondition.delayDays} days · ${money(economics.routeCondition.freightCost)} capacity cost${economics.procurementAgreement ? ` · strategic agreement active with ${getCounterparty(economics.procurementAgreement.supplierId)?.name || 'supplier'}` : ''}</small></div>
      <div class="competitive-impact-box"><div><span>Competitive tender</span><strong>${economics.tenderLeader?.name || 'Rival desk'} · ${economics.tenderPressure}% pressure</strong></div><small>${economics.marketRegime.label} · estimated margin compression ${money(economics.competitionCost)}</small></div>
      <div class="inspector-grid">
        <div class="inspector-stat"><span>Expected P&amp;L</span><strong style="color:var(--green)">${money(adjustedPnl)}</strong></div>
        <div class="inspector-stat"><span>Duration</span><strong>${adjustedDuration} days</strong></div>
        <div class="inspector-stat"><span>Total capital</span><strong>${money(economics.capital, true)}</strong></div>
        <div class="inspector-stat"><span>Offer quantity</span><strong>${economics.quantity} t</strong></div>
      </div>
      <div class="compliance-impact-box ${compliance.status === 'Blocked' ? 'blocked' : compliance.canTrade ? 'clear' : 'review'}">
        <div><span>Compliance clearance</span><strong>${compliance.status} · score ${compliance.score}/100</strong></div>
        <small>${compliance.flags.length ? compliance.flags.join(' · ') : 'Standard KYC, jurisdiction and route screening completed.'}</small>
        ${compliance.requiresReview && !compliance.reviewed && compliance.status !== 'Blocked' ? `<button class="button secondary compact" id="runComplianceReviewButton">Run enhanced due diligence · ${money(compliance.cost)}</button>` : ''}
      </div>
      ${buyerId ? `<div class="inspector-section"><h3>Buyer credit capacity</h3><div class="timeline-mini-row"><i></i><span>Approved limit</span><strong>${money(buyerLimit,true)}</strong></div><div class="timeline-mini-row"><i></i><span>Current exposure</span><strong>${money(buyerExposure,true)}</strong></div><div class="timeline-mini-row"><i></i><span>Required for this structure</span><strong style="color:${buyerLimitClear?'var(--green)':'var(--red)'}">${money(requiredBuyerLimit,true)}</strong></div>${buyerLimitClear?'<div class="success-box">Buyer credit capacity is available.</div>':`<div class="warning-box">Credit limit is insufficient for the selected payment terms.</div><button class="button secondary" id="requestBuyerLimitButton">Request credit limit increase</button>`}</div>` : ''}
      <div class="inspector-section"><h3>Commercial counterparties</h3>
        <div class="party-pair">
          <div class="party-mini"><span>Supplier · ${supplier?.country || ''}</span><strong>${supplier?.name || 'Supplier'}</strong><small>Credit ${supplier?.credit || 0} · relationship ${supplierState.relationship}</small></div>
          <div class="party-mini"><span>Buyer · ${buyer?.country || ''}</span><strong>${buyer?.name || 'Buyer'}</strong><small>Credit ${buyer?.credit || 0} · relationship ${buyerState.relationship}</small></div>
        </div>
      </div>
      <div class="negotiation-box">
        <div class="negotiation-heading"><div><span class="eyebrow">Contract negotiation</span><h3>Build your offer</h3></div><strong>${Math.round(economics.acceptance)}%</strong></div>
        <div class="acceptance-meter"><span style="width:${economics.acceptance}%"></span></div>
        <label>Commercial quote<select id="commercialTermSelect">
          ${Object.entries(negotiationProfiles.commercial).map(([id,item])=>`<option value="${id}" ${negotiation.commercial===id?'selected':''}>${item.label}</option>`).join('')}
        </select></label>
        <label>Payment terms<select id="paymentTermSelect">
          ${Object.entries(negotiationProfiles.payment).map(([id,item])=>`<option value="${id}" ${negotiation.payment===id?'selected':''}>${item.label}</option>`).join('')}
        </select></label>
        <label>Pricing formula<select id="pricingTermSelect">
          ${Object.entries(negotiationProfiles.pricing).map(([id,item])=>`<option value="${id}" ${(negotiation.pricing||'fixed')===id?'selected':''}>${item.label}</option>`).join('')}
        </select></label>
        <label>Delivery window<select id="deliveryTermSelect">
          ${Object.entries(negotiationProfiles.delivery).map(([id,item])=>`<option value="${id}" ${negotiation.delivery===id?'selected':''}>${item.label}</option>`).join('')}
        </select></label>
        <div class="negotiation-result ${accepted?'accepted':rejected?'rejected':''}">
          ${accepted ? 'Offer accepted: terms are locked until the market refresh.' : rejected ? 'Offer rejected: change at least one term and submit it again.' : 'The probability combines price, payment terms, reputation, buyer relationship and live rival pressure.'}
        </div>
        <button class="button secondary" id="submitNegotiationButton" ${consumed ? 'disabled' : ''}>${accepted ? 'Renegotiate terms' : rejected ? 'Submit a new offer' : 'Submit offer to buyer'}</button>
      </div>
      <div class="inspector-section"><h3>Capital structure</h3>
        <div class="timeline-mini-row"><i></i><span>Required equity</span><strong>${money(requiredEquity)}</strong></div>
        <div class="capital-bar"><span style="width:${clamp(cashCoverage*100,0,100)}%"></span></div>
        <div class="timeline-mini-row" style="margin-top:12px"><i></i><span>Credit facility</span><strong>${money(borrowed)}</strong></div>
        <div class="capital-bar"><span style="width:${clamp(creditCoverage*100,0,100)}%"></span></div>
        <div class="timeline-mini-row" style="margin-top:12px"><i></i><span>Initial futures margin</span><strong>${money(economics.initialMargin)}</strong></div>
        <div class="capital-bar margin"><span style="width:${clamp(state.cash/Math.max(1,economics.initialMargin)*100,0,100)}%"></span></div>
      </div>
      <div class="deal-structure-box">
        <span class="eyebrow">Deal structuring</span><h3>Funding, insurance and controls</h3>
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
        ${carrierStrategy === 'spot' ? (() => {
          const avClasses = availableVesselClasses(opp);
          const curClass  = vesselClassFor(opp.id);
          return `<label for="vesselClassSelect" style="margin-top:6px"><span>Vessel class</span><strong>${curClass.label}</strong></label>
          <select id="vesselClassSelect">
            ${avClasses.map(vc => `<option value="${vc.id}" ${vc.id === curClass.id ? 'selected' : ''}>${vc.label}</option>`).join('')}
          </select>
          <div class="shipping-benefit">${curClass.desc}${curClass.pnlMod !== 0 ? ' · Freight P&amp;L: ' + (curClass.pnlMod > 0 ? '+' : '') + Math.round(curClass.pnlMod * 100) + '%' : ''}${curClass.durationMod !== 0 ? ' · Transit: ' + (curClass.durationMod > 0 ? '+' : '') + curClass.durationMod + 'd' : ''}</div>`;
        })() : ''}
        ${compatibleFleet.length ? '' : '<small>No compatible vessel at the origin port. Open the Fleet Desk to charter one.</small>'}
      </div>` : ''}
      <div class="hedge-control">
        <label for="hedgeRatioInput"><span>Futures hedge ratio</span><strong id="hedgeRatioValue">${selectedHedge}%</strong></label>
        <input id="hedgeRatioInput" type="range" min="0" max="100" step="10" value="${selectedHedge}">
        <div class="hedge-scale"><span>0% speculative</span><span>${opp.recommendedHedge}% recommended</span><span>100% protected</span></div>
        <div class="timeline-mini-row" style="margin-top:12px;margin-bottom:0"><i></i><span>Residual flat-price exposure</span><strong id="residualExposureValue">${money(residualExposure, true)}</strong></div>
      </div>
      ${accepted && fundsReady ? '<div class="success-box">Contract accepted and funding available. You can open the deal.</div>' : accepted ? '<div class="warning-box">Offer accepted, but cash, margin collateral, facility capacity or the financing structure is insufficient.</div>' : '<div class="warning-box">The deal cannot start until the buyer accepts the terms.</div>'}
      ${opp.tender ? `
      <div class="inspector-section tender-section">
        <h3>Competitive tender</h3>
        <p style="font-size:8px;color:var(--muted);margin:6px 0 10px">This opportunity is awarded via competitive bidding. Lower your margin offer to improve win probability, but protect your economics.</p>
        <div class="tender-bid-row">
          <span>Margin concession</span>
          <input id="tenderBidInput" type="range" min="${Math.round(-opp.basePnl*0.7)}" max="0" step="${Math.round(opp.basePnl*0.05)}" value="0">
          <strong id="tenderBidVal">$0</strong>
        </div>
        <div class="tender-preview">
          <div><span>Your offered margin</span><strong id="tenderMarginPreview">${money(opp.basePnl)}</strong></div>
          <div><span>Win probability</span><strong id="tenderWinPct">~50%</strong></div>
        </div>
        <button class="button primary" id="submitTenderBtn" ${canStart ? '' : 'disabled'}>Submit competitive bid</button>
      </div>` : `<button class="button primary" id="startDealButton" ${canStart ? '' : 'disabled'}>Open the physical deal</button>`}
      <button class="button secondary" id="focusOriginButton">Go to supplier</button>
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
    const eventHtml = deal.pendingDecision && opp.event ? `
      <div class="event-box"><span class="eyebrow">Operational event</span><h3>${opp.event.title}</h3><p>${opp.event.text}</p>
      ${opp.event.choices.map(choice => `<button class="event-choice" data-event-choice="${choice.id}"><strong>${choice.label}</strong><small>${choice.hint}</small></button>`).join('')}</div>` : '';
    const paymentThirty = deal.commercialTerms?.payment === 'thirty';
    const receivableLifecycle = deal.delivered ? `<div class="inspector-section"><h3>Invoice &amp; collection</h3><div class="timeline-mini-row"><i></i><span>Invoice status</span><strong>${deal.invoiceStatus || 'Outstanding'}</strong></div><div class="timeline-mini-row"><i></i><span>Invoice amount</span><strong>${money(deal.invoiceAmount || 0,true)}</strong></div><div class="timeline-mini-row"><i></i><span>${deal.invoiceStatus === 'Overdue' ? 'Collection delay' : 'Payment due'}</span><strong>${deal.invoiceStatus === 'Overdue' ? Math.max(0,deal.collectionDelayDays||0) : Math.max(0,deal.paymentDaysRemaining||0)} days</strong></div><div class="timeline-mini-row"><i></i><span>Buyer limit used</span><strong>${deal.buyerId ? Math.round(counterpartyExposure(deal.buyerId)/Math.max(1,counterpartyCreditLimit(deal.buyerId))*100) : 0}%</strong></div></div>` : '';
    const creditTools = paymentThirty ? `<div class="inspector-section"><h3>Receivable risk</h3>${deal.receivableProtection?`<div class="success-box">${deal.receivableProtection.label} active · cost ${money(deal.receivableProtection.cost)}</div>`:`<p class="inspector-subtitle">The buyer pays 30 days after delivery. Protect the receivable or retain the credit exposure.</p><div class="ops-actions"><button class="button secondary" id="creditInsuranceButton">Credit insurance</button><button class="button secondary" id="factorReceivableButton">Factor receivable</button></div>`}</div>` : '';
    const storageTool = deal.commercialTerms?.delivery === 'flexible' && (deal.operations?.storage?.active || deal.storageOptionUsed) ? `<div class="inspector-section"><h3>Warehouse optionality</h3>${deal.storageOptionUsed?`<div class="success-box">20% flexible parcel held in storage. Current optionality value ${money(storageOptionalityPnl(deal))}.</div>`:'<p class="inspector-subtitle">Use the flexible delivery window to hold 20% of the parcel for seven days and capture a favourable price move.</p><button class="button secondary" id="storageOptionButton">Exercise 7-day storage option</button>'}</div>` : '';
    const routeCondition = deal.routeCondition || routeConditionFor(opp);
    const routeTool = `<div class="inspector-section"><h3>Supply-chain condition</h3><div class="timeline-mini-row"><i></i><span>Congestion score</span><strong>${routeCondition.score}/100 · ${routeCondition.severity}</strong></div><div class="timeline-mini-row"><i></i><span>Primary bottleneck</span><strong>${routeCondition.bottleneck}</strong></div><div class="timeline-mini-row"><i></i><span>Capacity impact at booking</span><strong>+${routeCondition.delayDays}d · ${money(routeCondition.freightCost)}</strong></div><div class="timeline-mini-row"><i></i><span>Procurement structure</span><strong>${deal.procurementAgreementId ? 'Strategic framework' : 'Spot supply'}</strong></div>${deal.routeMitigated ? `<div class="success-box">Priority capacity secured · ${deal.routeMitigationDays} days protected · cost ${money(deal.routeMitigationCost)}.</div>` : (!deal.delivered && routeCondition.delayDays > 0 ? '<button class="button secondary" id="mitigateRouteButton">Secure priority capacity</button>' : '')}</div>`;
    return `
      <div class="location-badge">↗ Active shipment</div>
      <h2>${opp.title}</h2>
      <div class="inspector-subtitle">${getHub(opp.origin).name} → ${getHub(opp.destination).name} · ${Math.round(progress*100)}% complete</div>
      <div class="inspector-grid">
        <div class="inspector-stat"><span>Unrealized P&amp;L</span><strong style="color:${pnl>=0?'var(--green)':'var(--red)'}">${money(pnl)}</strong></div>
        <div class="inspector-stat"><span>ETA</span><strong>${Math.max(0,deal.duration-deal.elapsed)} days</strong></div>
        <div class="inspector-stat"><span>Hedge ratio</span><strong>${deal.hedgeRatio || 0}%</strong></div>
        <div class="inspector-stat"><span>Physical phase</span><strong>${phase.label}</strong></div>
      </div>
      ${(()=>{
        const entryPx = deal.entryMarketPrice;
        const currentPx = marketPriceForOpportunity(opp);
        if (!entryPx || !currentPx) return '';
        const movePct = (currentPx - entryPx) / entryPx * 100;
        const moveColor = movePct >= 0 ? 'var(--green)' : 'var(--red)';
        const commodity = opp.commodity || opp.priceKey || '';
        const ts = state.termStructure?.[opp.priceKey || 'copper'] || 0;
        const tsLabel = ts < -0.06 ? 'Backwardation' : ts > 0.06 ? 'Contango' : 'Flat';
        return `<div class="mtm-card">
          <div class="mtm-label">Mark-to-Market · ${commodity.toUpperCase()}</div>
          <div class="mtm-row">
            <div><span>Entry price</span><strong>${entryPx < 200 ? '$'+entryPx.toFixed(2) : money(entryPx, true)}</strong></div>
            <div><span>Current price</span><strong>${currentPx < 200 ? '$'+currentPx.toFixed(2) : money(currentPx, true)}</strong></div>
            <div><span>Move since inception</span><strong style="color:${moveColor}">${movePct>=0?'+':''}${movePct.toFixed(2)}%</strong></div>
            <div><span>Term structure</span><strong style="color:${ts<-0.06?'var(--orange)':ts>0.06?'var(--blue)':'var(--muted)'}">${tsLabel}</strong></div>
          </div>
          <div class="mtm-impact-row"><span>Price impact on P&amp;L</span><strong style="color:${marketImpact>=0?'var(--green)':'var(--red)'}">${money(marketImpact)}</strong></div>
        </div>`;
      })()}
      <div class="inspector-section"><h3>Commercial execution</h3>
        <div class="timeline-mini-row"><i></i><span>Supplier</span><strong>${getCounterparty(deal.supplierId)?.name || 'N/A'}</strong></div>
        <div class="timeline-mini-row"><i></i><span>Buyer</span><strong>${getCounterparty(deal.buyerId)?.name || 'N/A'}</strong></div>
        <div class="timeline-mini-row"><i></i><span>Quantity</span><strong>${deal.quantity || opp.quantity} t</strong></div>
        <div class="timeline-mini-row"><i></i><span>Payment</span><strong>${negotiationProfiles.payment[deal.commercialTerms?.payment]?.label || 'Contract terms'}</strong></div>
        <div class="timeline-mini-row"><i></i><span>Pricing formula</span><strong>${negotiationProfiles.pricing[deal.commercialTerms?.pricing || 'fixed']?.label || 'Fixed price'}</strong></div>
        ${(deal.globalEventImpacts||[]).length ? `<div class="global-impact-box"><strong>Global events affecting this cargo</strong><span>${deal.globalEventImpacts.map(id=>globalEventCatalog.find(e=>e.id===id)?.title||id).join(' · ')}</span></div>` : ''}
      </div>
      ${routeTool}
      <div class="inspector-section"><h3>Risk, treasury &amp; hedge liquidity</h3>
        <div class="timeline-mini-row"><i></i><span>Residual flat-price exposure</span><strong>${money(residualExposure, true)}</strong></div>
        <div class="timeline-mini-row"><i></i><span>Commodity impact to date</span><strong style="color:${marketImpact>=0?'var(--green)':'var(--red)'}">${money(marketImpact)}</strong></div>
        <div class="timeline-mini-row"><i></i><span>FX impact · hedge ${deal.fxHedgeRatio || 0}%</span><strong style="color:${fxImpact>=0?'var(--green)':'var(--red)'}">${money(fxImpact)}</strong></div>
        <div class="timeline-mini-row"><i></i><span>Equity locked</span><strong>${money(deal.equity, true)}</strong></div>
        <div class="timeline-mini-row"><i></i><span>Debt funded · ${(deal.financingRate*100).toFixed(1)}%</span><strong>${money(deal.borrowed, true)}</strong></div>
        <div class="timeline-mini-row"><i></i><span>Interest accrued</span><strong style="color:var(--orange)">${money(deal.financingAccrued || 0)}</strong></div>
        <div class="timeline-mini-row"><i></i><span>Futures collateral</span><strong>${money(deal.marginCollateral || 0)} / ${money(marginRequirement)}</strong></div>
        <div class="timeline-mini-row"><i></i><span>Margin calls funded</span><strong>${deal.marginCalls || 0}</strong></div>
        ${deal.hedgeRatio < 100 ? '<button class="button secondary" id="increaseHedgeButton">Increase hedge to 100%</button>' : '<div class="success-box">Flat-price exposure is fully hedged. Continue monitoring variation margin and basis risk.</div>'}
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
          <div class="timeline-mini-row done"><i></i><span>Contracts signed</span><strong>Day 0</strong></div>
          <div class="timeline-mini-row ${progress>.18?'done':'current'}"><i></i><span>Cargo loaded</span><strong>${progress>.18?'Done':'Pending'}</strong></div>
          <div class="timeline-mini-row ${progress>.18&&progress<.9?'current':progress>=.9?'done':''}"><i></i><span>In transit · near ${nearestHub.name}</span><strong>${Math.round(progress*100)}%</strong></div>
          <div class="timeline-mini-row ${progress>=1?'done':''}"><i></i><span>Delivery &amp; settlement</span><strong>${progress>=1?'Done':'Pending'}</strong></div>
        </div>
      </div>
      ${receivableLifecycle}${creditTools}
      ${storageTool}
      ${deal.eventResult ? `<div class="inspector-section"><h3>Latest event</h3><p>${deal.eventResult}</p></div>` : ''}
      ${eventHtml}
      ${progress > 0.12 && progress < 0.88 ? `
      <div class="inspector-section"><h3>Hedge management</h3>
        <div class="rehedge-row">
          <span>Current: <strong>${deal.hedgeRatio || 0}%</strong></span>
          <input id="rehedgeInput" type="range" min="0" max="110" step="5" value="${deal.hedgeRatio || 0}" style="flex:1">
          <span id="rehedgeVal">${deal.hedgeRatio || 0}%</span>
        </div>
        <p style="font-size:8px;color:var(--muted);margin:6px 0">Execution cost: $8,000 + $200 per % change. Only available in transit.</p>
        <button class="button secondary" id="rehedgeBtn">Adjust hedge</button>
      </div>` : ''}
      <button class="button secondary" id="focusShipmentButton">Focus shipment</button>
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
      ['FX result', breakdown.fx || 0],
      ['Storage optionality', breakdown.storage || 0],
      ['Credit / receivable result', breakdown.credit || 0]
    ];
    const maxAbs = Math.max(1,...rows.map(([,value])=>Math.abs(value)));
    return `<div class="location-badge">✓ Settled cargo</div><h2>${opp.title}</h2><div class="inspector-subtitle">${getHub(opp.origin).name} → ${getHub(opp.destination).name} · closed ${formatDate(new Date(item.completed))}</div>
      <div class="settlement-hero ${item.pnl>=0?'positive':'negative'}"><span>Realized P&amp;L</span><strong>${money(item.pnl)}</strong><small>${item.quantity||opp.quantity} t · ${item.days} days · ops ${Math.round(item.operationalReadiness||0)}%</small></div>
      <div class="inspector-section"><h3>P&amp;L attribution</h3><div class="pnl-waterfall">${rows.map(([label,value])=>`<div class="pnl-row"><div><span>${label}</span><strong style="color:${value>=0?'var(--green)':'var(--red)'}">${money(value)}</strong></div><div class="pnl-bar"><span class="${value>=0?'positive':'negative'}" style="width:${Math.max(3,Math.abs(value)/maxAbs*100)}%"></span></div></div>`).join('')}</div></div>
      <div class="inspector-section"><h3>Execution scorecard</h3><div class="inspector-grid"><div class="inspector-stat"><span>Hedge</span><strong>${item.hedgeRatio||0}%</strong></div><div class="inspector-stat"><span>FX hedge</span><strong>${item.fxHedgeRatio||0}%</strong></div><div class="inspector-stat"><span>Margin calls</span><strong>${item.marginCalls||0}</strong></div><div class="inspector-stat"><span>Demurrage</span><strong>${money(item.demurrage||0)}</strong></div></div></div>
      <div class="inspector-section"><h3>Structure used</h3><div class="timeline-mini-row"><i></i><span>Funding</span><strong>${financingProfiles[item.financingStrategy||'revolver']?.label||'N/A'}</strong></div><div class="timeline-mini-row"><i></i><span>Insurance</span><strong>${insuranceProfiles[item.insuranceStrategy||'basic']?.label||'N/A'}</strong></div><div class="timeline-mini-row"><i></i><span>Inspection</span><strong>${inspectionProfiles[item.inspectionStrategy||'standard']?.label||'N/A'}</strong></div><div class="timeline-mini-row"><i></i><span>Pricing</span><strong>${negotiationProfiles.pricing[item.pricingStrategy||'fixed']?.label||'Fixed price'}</strong></div><div class="timeline-mini-row"><i></i><span>Receivable</span><strong>${item.receivableProtection||'Open account / contract terms'}</strong></div></div>
      ${item.eventResult?`<div class="inspector-section"><h3>Operational outcome</h3><p>${item.eventResult}</p></div>`:''}`;
  }

  function vesselInspector(asset) {
    const vessel = getVesselCatalog(asset.catalogId);
    const deal = asset.assignedDealId ? getActiveDeal(asset.assignedDealId) : null;
    return `
      <div class="location-badge">◆ ${asset.ownership==='owned'?'Owned vessel':'Chartered asset'}</div>
      <h2>${vessel.name}</h2>
      <div class="inspector-subtitle">${vessel.vesselClass} · ${vessel.capacity.toLocaleString('en-US')} t DWT</div>
      <p class="inspector-subtitle" style="margin-top:12px">${vessel.description}</p>
      <div class="inspector-grid">
        <div class="inspector-stat"><span>Status</span><strong>${asset.status}</strong></div>
        <div class="inspector-stat"><span>Position</span><strong>${getHub(asset.positionHub)?.name || 'At sea'}</strong></div>
        <div class="inspector-stat"><span>${asset.ownership==='owned'?'Ownership':'Days remaining'}</span><strong>${asset.ownership==='owned'?'Permanent':asset.daysRemaining}</strong></div>
        <div class="inspector-stat"><span>${asset.ownership==='owned'?'Purchase cost':'Charter cost'}</span><strong>${money(asset.ownership==='owned'?(asset.purchaseCost||0):(asset.charterCost + (asset.extensionCost || 0)))}</strong></div>
      </div>
      <div class="inspector-section"><h3>Commercial employment</h3>
        ${deal ? `<div class="success-box">Assigned to ${getOpportunity(deal.opportunityId).title}. The vessel will be released at settlement.</div><button class="button secondary" id="openAssignedDealButton">Open assigned deal</button>` : '<div class="success-box">Available for a compatible opportunity departing from this location.</div>'}
      </div>
      <div class="inspector-section"><h3>${asset.ownership==='owned'?'Ownership profile':'Charter profile'}</h3>
        <div class="timeline-mini-row"><i></i><span>Transport class</span><strong>${vessel.transportClass}</strong></div>
        <div class="timeline-mini-row"><i></i><span>Expected freight advantage</span><strong>${money(vessel.bonusPnl)}</strong></div>
        <div class="timeline-mini-row"><i></i><span>Execution advantage</span><strong>-${vessel.durationBonus} days</strong></div>
      </div>
      <button class="button secondary" id="focusVesselButton">Focus vessel</button>
      <button class="button danger" id="releaseVesselButton" ${asset.status === 'assigned' ? 'disabled' : ''}>${asset.ownership==='owned'?'Sell vessel (45% recovery)':'Terminate charter'}</button>`;
  }

  function selectInvestment(id,focus=true){const asset=investmentDefinition(id);if(!asset)return;selected={type:'investment',id};activeLeftTab='empire';if(focus)focusOnHub(asset.hub);renderTabs();renderInspector();renderEmpire();openInspector();}
  function investmentInspector(asset){const r=investmentRecord(asset.id),level=r.level||0,target=level+1,max=level>=asset.maxLevel,cost=max?0:investmentCost(asset,target),days=max?0:investmentBuildDays(asset,target);return `<div class="location-badge chain-${asset.chain}">${asset.chain} asset</div><h2>${asset.name}</h2><div class="inspector-subtitle">${getHub(asset.hub)?.name} · Level ${level}/${asset.maxLevel}</div><p class="inspector-subtitle" style="margin-top:12px">${asset.description}</p><div class="economics-grid"><div><span>Daily income</span><strong>${money((asset.dailyIncome||0)*level)}</strong></div><div><span>Deal P&L edge</span><strong>${money((asset.pnlBonus||0)*level)}</strong></div><div><span>Book value</span><strong>${money((r.totalSpent||0)*.88,true)}</strong></div><div><span>Status</span><strong>${r.buildingTo?`Building L${r.buildingTo}`:level?'Operational':'Greenfield'}</strong></div></div>${r.buildingTo?`<div class="success-box">Project team at work · ${r.daysRemaining} days remaining.</div>`:`<button class="button primary" id="inspectorBuildInvestment" ${max||!investmentUnlocked(asset)||state.cash<cost||activeProjectCount()>=builderSlots()?'disabled':''}>${max?'Maximum level':`Invest ${money(cost)} · ${days} days`}</button>`}<button class="button secondary" id="focusInvestmentHub">Focus location</button>`;}

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
      ['commercial','payment','pricing','delivery'].forEach(field => {
        const id = field === 'commercial' ? '#commercialTermSelect' : field === 'payment' ? '#paymentTermSelect' : field === 'pricing' ? '#pricingTermSelect' : '#deliveryTermSelect';
        $(id)?.addEventListener('change', event => {
          setNegotiationDraft(opp.id, field, event.target.value);
          renderInspector();
          renderOpportunityList();
        });
      });
      $('#submitNegotiationButton')?.addEventListener('click', () => submitNegotiation(opp.id));
      $('#runComplianceReviewButton')?.addEventListener('click', () => runComplianceReview(opp.id));
      $('#carrierStrategySelect')?.addEventListener('change', (event) => {
        selectedCarrierStrategies[opp.id] = event.target.value;
        renderInspector();
      });
      $('#vesselClassSelect')?.addEventListener('change', (event) => {
        selectedVesselClasses[opp.id] = event.target.value;
        renderInspector();
      });
      $('#financingStrategySelect')?.addEventListener('change', event => { selectedFinancingStrategies[opp.id] = event.target.value; renderInspector(); renderOpportunityList(); });
      $('#insuranceStrategySelect')?.addEventListener('change', event => { selectedInsuranceStrategies[opp.id] = event.target.value; renderInspector(); renderOpportunityList(); });
      $('#inspectionStrategySelect')?.addEventListener('change', event => { selectedInspectionStrategies[opp.id] = event.target.value; renderInspector(); renderOpportunityList(); });
      $('#fxHedgeRatioInput')?.addEventListener('input', event => { selectedFxHedgeRatios[opp.id] = Number(event.target.value); $('#fxHedgeRatioValue').textContent = `${event.target.value}%`; });
      $('#startDealButton')?.addEventListener('click', () => startOpportunity(opp.id));
      $('#requestBuyerLimitButton')?.addEventListener('click', () => { const buyerId=partiesForOpportunity(opp).buyerId; if(buyerId) requestCreditLimit(buyerId); });
      const tenderInput = $('#tenderBidInput');
      if (tenderInput) {
        const tenderBidVal = $('#tenderBidVal');
        const tenderMarginPreview = $('#tenderMarginPreview');
        const tenderWinPct = $('#tenderWinPct');
        tenderInput.addEventListener('input', () => {
          const adj = Number(tenderInput.value);
          if (tenderBidVal) tenderBidVal.textContent = adj === 0 ? '$0' : (adj > 0 ? '+' : '') + money(adj);
          if (tenderMarginPreview) tenderMarginPreview.textContent = money(opp.basePnl + adj);
          // Rough win probability estimate based on concession depth
          const concessionRatio = Math.abs(adj) / Math.max(1, opp.basePnl);
          const winPct = Math.round(Math.min(95, Math.max(5, 30 + concessionRatio * 120)));
          if (tenderWinPct) tenderWinPct.textContent = `~${winPct}%`;
        });
        $('#submitTenderBtn')?.addEventListener('click', () => submitTenderBid(opp.id, Number(tenderInput.value)));
      }
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
      $('#creditInsuranceButton')?.addEventListener('click', () => protectReceivable(deal.id, 'insurance'));
      $('#factorReceivableButton')?.addEventListener('click', () => protectReceivable(deal.id, 'factor'));
      $('#storageOptionButton')?.addEventListener('click', () => exerciseStorageOption(deal.id));
      $('#mitigateRouteButton')?.addEventListener('click', () => mitigateRouteCongestion(deal.id));
      $('#focusShipmentButton')?.addEventListener('click', () => focusOnDeal(deal.id));
      const rehedgeInput = $('#rehedgeInput');
      if (rehedgeInput) {
        const rehedgeVal = $('#rehedgeVal');
        rehedgeInput.addEventListener('input', () => { if (rehedgeVal) rehedgeVal.textContent = rehedgeInput.value + '%'; });
        $('#rehedgeBtn')?.addEventListener('click', () => rehedgeDeal(deal.id, Number(rehedgeInput.value)));
      }
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
    $('#openWorldEventsButton').onclick = () => openLeftDrawer('events');
  }

  function renderLayers() {
    $$('.layer-button[data-layer]').forEach(button => button.classList.toggle('active', layers[button.dataset.layer]));
    $$('.layer-button[data-globe-option]').forEach(button => button.classList.toggle('active', globeOptions[button.dataset.globeOption]));
    document.body.classList.toggle('cinematic-mode', globeOptions.cinematic);
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
    renderBriefing();
    renderTutorialCoach();
  }

  function configureDifficulty(level) {
    state.difficulty = level;
    if (level === 'guided') { state.cash = 1_300_000; state.creditLimit = 7_500_000; state.nextGlobalEventDay = 10; }
    else if (level === 'expert') { state.cash = 800_000; state.creditLimit = 5_000_000; state.nextGlobalEventDay = 4; }
    else { state.cash = 1_000_000; state.creditLimit = 6_000_000; state.nextGlobalEventDay = 6; }
    state.navHistory = [state.cash,state.cash,state.cash];
    state.marketRegime = generateMarketRegime(1);
    initializeCompetitiveMarket(true);
    state.onboardingComplete = true;
    saveState();
  }

  function openOnboarding() {
    const dialog = $('#onboardingDialog');
    if (!dialog || state.onboardingComplete || dialog.open) return;
    dialog.showModal();
  }

  function openVictoryDialog() {
    const dialog = $('#victoryDialog');
    if (!dialog || dialog.open) return;
    const val = tradingHouseValuation();
    const nextLevel = loadPrestige() + 1;
    const stats = portfolioStats();
    const statsEl = $('#victoryStats');
    if (statsEl) {
      statsEl.innerHTML = `
        <div><span>Enterprise value</span><strong>${money(val.value, true)}</strong></div>
        <div><span>Net asset value</span><strong>${money(stats.nav, true)}</strong></div>
        <div><span>Deals closed</span><strong>${state.completedDeals}</strong></div>
        <div><span>Reputation</span><strong>${Math.round(state.reputation)}</strong></div>`;
    }
    const note = $('#victoryPrestigeNote');
    if (note) {
      note.innerHTML = `Prestige level ${loadPrestige()} → <strong>${nextLevel}</strong> · new careers start with <strong>+${12*nextLevel}% capital</strong>, <strong>+${8*nextLevel}% credit</strong> and higher reputation.`;
    }
    try { Sound.play('victory'); } catch (e) {}
    dialog.showModal();
  }

  function claimPrestige() {
    const newLevel = loadPrestige() + 1;
    savePrestige(newLevel);
    showToast(`Prestige ${newLevel} claimed! Your legacy carries into a new career.`, 'success');
    resetCareer();
  }

  function checkVictory() {
    if (!state || state.victoryClaimed) return;
    const val = tradingHouseValuation();
    if (val.value >= VICTORY_VALUATION) {
      state.victoryClaimed = true;
      saveState();
      setTimeout(openVictoryDialog, 400);
    }
  }

  // ── v31 XP / experience levels (Clash-of-Clans-style) ──────────────────────
  function xpForLevel(level) { return Math.round(300 * Math.pow(1.16, Math.max(0, level - 1))); }
  function xpLevelProgress() {
    const need = xpForLevel(state.xpLevel || 1);
    return { have: state.xp || 0, need, pct: Math.min(100, Math.round(((state.xp || 0) / need) * 100)) };
  }
  let _pendingLevelUps = 0;
  function addXp(amount, reason) {
    if (!amount || amount <= 0) return;
    state.xp = (state.xp || 0) + Math.round(amount);
    state.xpLevel = state.xpLevel || 1;
    let leveled = false;
    while (state.xp >= xpForLevel(state.xpLevel)) {
      state.xp -= xpForLevel(state.xpLevel);
      state.xpLevel += 1;
      leveled = true;
      const reward = 4000 + state.xpLevel * 2500;
      state.cash += reward;
      state.goldBars = (state.goldBars || 0) + 5;
      _pendingLevelUps++;
      _lastLevelReward = reward;
    }
    if (leveled && !_soundSuppressed) {
      try { Sound.play('victory'); } catch (e) {}
      setTimeout(() => celebrateLevelUp(), 60);
    }
    // pop the xp chip
    if (!_soundSuppressed) { const chip = document.getElementById('xpChip'); if (chip) { chip.classList.remove('xp-pop'); void chip.offsetWidth; if (motionEnabled()) chip.classList.add('xp-pop'); } }
  }
  let _lastLevelReward = 0;
  function addGold(n, reason) { if (!n) return; state.goldBars = Math.max(0, (state.goldBars || 0) + Math.round(n)); if (!_soundSuppressed) { const c = document.getElementById('goldChip'); if (c && motionEnabled()) { c.classList.remove('xp-pop'); void c.offsetWidth; c.classList.add('xp-pop'); } } }
  function celebrateLevelUp() {
    const overlay = document.getElementById('levelUpOverlay');
    if (!overlay) { showToast(`Level ${state.xpLevel} reached! +${money(_lastLevelReward)} bonus.`, 'success'); return; }
    const numEl = document.getElementById('levelUpNumber');
    const rwEl = document.getElementById('levelUpReward');
    if (numEl) numEl.textContent = state.xpLevel;
    if (rwEl) rwEl.textContent = `+${money(_lastLevelReward)} cash bonus`;
    overlay.classList.add('show');
    overlay.setAttribute('aria-hidden', 'false');
    clearTimeout(overlay._t);
    overlay._t = setTimeout(() => { overlay.classList.remove('show'); overlay.setAttribute('aria-hidden','true'); }, 2600);
  }

  // ── v32 daily login reward (streak) ────────────────────────────────────────
  function dailyRewardFor(streakDay) {
    const d = Math.min(7, Math.max(1, streakDay));
    return { cash: 20000 * d, xp: 15 * d, gold: 2 + d };
  }
  let _pendingDailyReward = null;
  function checkDailyReward() {
    const today = new Date().toISOString().slice(0, 10);
    if (state.lastRewardDay === today) return;
    // streak: consecutive calendar days
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    state.loginStreak = (state.lastRewardDay === yesterday) ? (state.loginStreak || 0) + 1 : 1;
    _pendingDailyReward = today;
    setTimeout(openDailyReward, 700);
  }
  function openDailyReward() {
    const dialog = $('#dailyRewardDialog');
    const streak = state.loginStreak || 1;
    const reward = dailyRewardFor(streak);
    if (!dialog) { // fallback: auto-grant
      claimDailyReward();
      return;
    }
    const sub = $('#dailyStreakSub'); if (sub) sub.textContent = `Giorno ${streak} di fila`;
    const row = $('#dailyDaysRow');
    if (row) {
      row.innerHTML = Array.from({ length: 7 }, (_, i) => {
        const day = i + 1; const r = dailyRewardFor(day);
        const cls = day < streak ? 'done' : day === Math.min(7, streak) ? 'active' : '';
        return `<div class="daily-day ${cls}"><span>G${day}</span><b>${r.gold}⬤</b></div>`;
      }).join('');
    }
    const line = $('#dailyRewardLine');
    if (line) line.innerHTML = `Oggi: <strong>${money(reward.cash)}</strong> · <strong>${reward.xp} XP</strong> · <strong>${reward.gold} lingotti</strong>`;
    try { Sound.play('purchase'); } catch (e) {}
    if (!dialog.open) dialog.showModal();
  }
  function claimDailyReward() {
    const streak = state.loginStreak || 1;
    const reward = dailyRewardFor(streak);
    state.cash += reward.cash;
    addGold(reward.gold, 'daily');
    state.lastRewardDay = _pendingDailyReward || new Date().toISOString().slice(0, 10);
    addXp(reward.xp, 'daily');
    saveState(true);
    renderAll();
    showToast(`Bonus giornaliero riscosso: ${money(reward.cash)} + ${reward.gold} lingotti.`, 'success');
  }

  function switchToSlot(n) {
    if (n === activeSlot) { $('#slotDialog')?.close(); return; }
    saveState(true); // persist current slot first
    setActiveSlot(n);
    state = loadState();
    initializeCounterparties();
    initializeCompetitiveMarket(true);
    selected = { type: 'hub', id: 'geneva' };
    activeLeftTab = 'portfolio';
    runningSpeed = 0;
    if (state.reduceMotion) document.body.classList.add('reduce-motion'); else document.body.classList.remove('reduce-motion');
    cleanGlobeView();
    updateClock();
    saveState(true);
    view = { lon: 6, lat: 18, zoom: 1, targetLon: 6, targetLat: 18 };
    renderAll();
    $('#slotDialog')?.close();
    const meta = readSlotMeta(n);
    showToast(`Switched to slot ${n}${meta ? ' · ' + meta.companyName : ' (new career)'}.`, 'success');
    if (!localStorage.getItem(currentStorageKey())) setTimeout(openOnboarding, 80);
  }

  function deleteSlot(n) {
    try {
      localStorage.removeItem(slotKey(n));
      localStorage.removeItem(`${slotKey(n)}-backup`);
    } catch (e) {}
    if (n === activeSlot) {
      state = defaultState();
      initializeCounterparties();
      initializeCompetitiveMarket(true);
      saveState(true);
      renderAll();
    }
    showToast(`Slot ${n} cleared.`, 'warning');
    renderSlotManager();
  }

  function renderSlotManager() {
    const list = $('#slotList');
    if (!list) return;
    const cards = [];
    for (let n = 1; n <= SLOT_COUNT; n++) {
      const meta = (n === activeSlot) ? {
        empty: false, companyName: state.companyName, profileName: state.profileName,
        completedDeals: state.completedDeals, cash: state.cash, prestigeLevel: state.prestigeLevel,
        date: state.date, lastSavedAt: state.lastSavedAt
      } : readSlotMeta(n);
      const isActive = n === activeSlot;
      if (!meta) {
        cards.push(`<div class="slot-card empty">
          <div class="slot-head"><strong>Slot ${n}</strong><span class="slot-tag">Empty</span></div>
          <p class="slot-empty-copy">No career here yet.</p>
          <div class="slot-actions"><button class="button primary" data-slot-switch="${n}">Start career</button></div>
        </div>`);
      } else {
        const val = meta.date ? new Intl.DateTimeFormat('en-GB',{day:'2-digit',month:'short',year:'numeric'}).format(new Date(meta.date)) : '—';
        cards.push(`<div class="slot-card ${isActive?'active':''}">
          <div class="slot-head"><strong>Slot ${n}${isActive?' <span class="slot-tag current">Current</span>':''}</strong>${meta.prestigeLevel?`<span class="slot-prestige">★ ${meta.prestigeLevel}</span>`:''}</div>
          <div class="slot-company">${(meta.companyName||'World of Trade Co.').replace(/</g,'&lt;')}</div>
          <div class="slot-meta"><span>${meta.completedDeals} deals</span><span>${money(meta.cash,true)}</span><span>${val}</span></div>
          <div class="slot-actions">
            ${isActive?'<button class="button secondary" disabled>Active</button>':`<button class="button primary" data-slot-switch="${n}">Load</button>`}
            <button class="button danger" data-slot-delete="${n}">Delete</button>
          </div>
        </div>`);
      }
    }
    list.innerHTML = cards.join('');
    list.querySelectorAll('[data-slot-switch]').forEach(b => b.addEventListener('click', () => switchToSlot(Number(b.dataset.slotSwitch))));
    list.querySelectorAll('[data-slot-delete]').forEach(b => b.addEventListener('click', () => {
      if (confirm(`Delete the career in slot ${b.dataset.slotDelete}? This cannot be undone.`)) deleteSlot(Number(b.dataset.slotDelete));
    }));
  }

  function openSlotManager() {
    const dialog = $('#slotDialog');
    if (!dialog) return;
    renderSlotManager();
    if (!dialog.open) dialog.showModal();
  }

  function resetCareer() {
    state = defaultState();
    initializeCounterparties();
    initializeCompetitiveMarket(true);
    selected = { type: 'hub', id: 'geneva' };
    activeLeftTab = 'portfolio';
    selectedLeaderboardMode = 'overall';
    runningSpeed = 0;
    cleanGlobeView();
    updateClock();
    saveState();
    view = { lon: 6, lat: 18, zoom: 1, targetLon: 6, targetLat: 18 };
    renderAll();
    showToast('A new World of Trade career is ready. Choose the difficulty and onboarding mode.');
    setTimeout(openOnboarding,80);
  }

  const wotIcons = {
    openDeskButton: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 9h18M9 9v11"/></svg>',
    openShopButton: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>',
    toggleOverviewButton: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v9l7 4"/><circle cx="12" cy="12" r="9"/></svg>',
    toggleMarketsButton: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5v14M5 9h4M9 6v10M12 5v14M12 8h4M16 6v9M19 5v14"/></svg>',
    toggleLayersButton: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/></svg>',
    openSearchButton: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
    openBriefingButton: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h9l3 3v15H6z"/><path d="M9 9h6M9 13h6M9 17h4"/></svg>',
    openShortcutsButton: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="6" width="19" height="12" rx="2.5"/><path d="M7 10h.01M11 10h.01M15 10h.01M7 14h10"/></svg>',
    openGlossaryButton: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5a2 2 0 0 1 2-2h5v17H6a2 2 0 0 0-2 2z"/><path d="M20 5a2 2 0 0 0-2-2h-5v17h5a2 2 0 0 1 2 2z"/></svg>',
    installButton: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v11m0 0l-4-4m4 4l4-4"/><path d="M5 19h14"/></svg>',
    openNotificationsButton: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>',
    resetButton: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 1 1 2.3 5.6"/><path d="M4 20v-5h5"/></svg>',
  };
  const metricCoinIcons = {
    navMetric: '<svg viewBox="0 0 24 24" fill="none" stroke="#3a1e6e" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 16l5-5 3 3 6-7"/><path d="M15 7h4v4"/></svg>',
    cashMetric: '<svg viewBox="0 0 24 24" fill="none" stroke="#0a3d1a" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><path d="M12 8v8M9.5 9.5a2.5 2 0 0 1 5 0c0 1.5-5 1.5-5 3a2.5 2 0 0 0 5 0"/></svg>',
    creditMetric: '<svg viewBox="0 0 24 24" fill="none" stroke="#0a2d5e" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10l9-5 9 5"/><path d="M5 10v8M12 10v8M19 10v8M3 19h18"/></svg>',
    repMetric: '<svg viewBox="0 0 24 24" fill="#5a3600" stroke="#5a3600" stroke-width="1.5" stroke-linejoin="round"><path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.2l5.9-.9z"/></svg>',
  };
  function injectIcons() {
    Object.entries(wotIcons).forEach(([id, svg]) => {
      const btn = document.getElementById(id);
      if (!btn) return;
      let holder = btn.querySelector('span');
      if (!holder) { holder = document.createElement('span'); btn.insertBefore(holder, btn.firstChild); }
      holder.classList.add('wot-icon');
      holder.innerHTML = svg;
    });
    // Metric resource coins
    Object.entries(metricCoinIcons).forEach(([id, svg]) => {
      const strong = document.getElementById(id);
      const metric = strong ? strong.closest('.top-metric') : null;
      if (!metric || metric.querySelector('.metric-coin')) return;
      // Wrap existing label/value/sub into a column body
      const body = document.createElement('div');
      body.className = 'metric-body';
      while (metric.firstChild) body.appendChild(metric.firstChild);
      const coin = document.createElement('span');
      coin.className = 'metric-coin coin-' + id;
      coin.innerHTML = svg;
      metric.appendChild(coin);
      metric.appendChild(body);
    });
  }

  function bindEvents() {
    injectIcons();
    // Unlock Web Audio on the first user gesture (autoplay policy)
    const _unlockAudio = () => { try { Sound.unlock(); } catch (e) {} window.removeEventListener('pointerdown', _unlockAudio); window.removeEventListener('keydown', _unlockAudio); };
    window.addEventListener('pointerdown', _unlockAudio, { once: false });
    window.addEventListener('keydown', _unlockAudio, { once: false });
    window.addEventListener('resize', resizeCanvas);
    new ResizeObserver(resizeCanvas).observe($('#globeStage'));

    canvas.addEventListener('pointerdown', (event) => {
      dragging = true;
      dragMoved = false;
      followCargo = false;
      lastInteractionTime = performance.now();
      dragStart = { x: event.clientX, y: event.clientY, lon: view.lon, lat: view.lat };
      view.targetLon = null;
      canvas.setPointerCapture(event.pointerId);
      canvas.classList.add('dragging');
      updateGlobeTooltip(null, 0, 0);
      $('#globeHint').classList.add('dismissed');
    });
    canvas.addEventListener('pointermove', (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      lastPointerPosition = { x, y };
      if (!dragging) {
        updateGlobeTooltip(findGlobeTarget(x, y), x, y);
        return;
      }
      const dx = event.clientX - dragStart.x;
      const dy = event.clientY - dragStart.y;
      if (Math.abs(dx)+Math.abs(dy) > 3) dragMoved = true;
      view.lon = ((dragStart.lon - dx * .28 / view.zoom + 540) % 360) - 180;
      view.lat = clamp(dragStart.lat + dy * .20 / view.zoom, -70, 70);
    });
    canvas.addEventListener('pointerup', (event) => {
      dragging = false;
      lastInteractionTime = performance.now();
      canvas.releasePointerCapture(event.pointerId);
      canvas.classList.remove('dragging');
      if (!dragMoved) {
        const rect = canvas.getBoundingClientRect();
        const target = findGlobeTarget(event.clientX - rect.left, event.clientY - rect.top);
        if (target?.type === 'investment') return selectInvestment(target.id, false);
        if (target?.type === 'vessel') return selectVessel(target.id, false);
        if (target?.type === 'deal') return trackLiveDeal(target.id, false);
        if (target?.type === 'hub') return selectHub(target.id, false);
      }
    });
    canvas.addEventListener('pointerleave', () => updateGlobeTooltip(null, 0, 0));
    canvas.addEventListener('wheel', (event) => {
      event.preventDefault();
      followCargo = false;
      lastInteractionTime = performance.now();
      view.zoom = clamp(view.zoom * (event.deltaY > 0 ? .93 : 1.07), .72, 1.45);
      $('#globeHint').classList.add('dismissed');
    }, { passive: false });

    $$('.panel-tab').forEach(button => button.addEventListener('click', () => {
      activeLeftTab = button.dataset.leftTab;
      leftDrawerOpen = true;
      renderTabs();
      syncOverlayUI();
    }));

    $$('.layer-button[data-layer]').forEach(button => button.addEventListener('click', () => {
      layers[button.dataset.layer] = !layers[button.dataset.layer];
      renderLayers();
    }));
    $$('.layer-button[data-globe-option]').forEach(button => button.addEventListener('click', () => {
      const option = button.dataset.globeOption;
      globeOptions[option] = !globeOptions[option];
      if (option === 'cinematic' && globeOptions.cinematic) {
        leftDrawerOpen = false; inspectorOpen = false; briefingOpen = false; overviewOpen = false; marketsOpen = false; layersOpen = false;
        syncOverlayUI();
      }
      lastInteractionTime = performance.now();
      renderLayers();
    }));

    $('#pauseButton').addEventListener('click', () => { runningSpeed = 0; updateClock(); });
    $$('.time-button[data-speed]').forEach(button => button.addEventListener('click', () => {
      runningSpeed = Number(button.dataset.speed);
      updateClock();
    }));
    $('#nextDayButton').addEventListener('click', () => advanceDay());
    $('#nextEventButton').addEventListener('click', advanceToNextEvent);
    $('#closeInspector').addEventListener('click', closeInspectorPanel);
    $('#closeLeftPanel')?.addEventListener('click', closeLeftDrawer);
    $('#openDeskButton')?.addEventListener('click', () => leftDrawerOpen ? closeLeftDrawer() : openLeftDrawer(activeLeftTab));
    $('#openShopButton')?.addEventListener('click', () => openLeftDrawer('shop'));
    $('#toggleOverviewButton')?.addEventListener('click', () => { overviewOpen = !overviewOpen; marketsOpen = false; syncOverlayUI(); });
    $('#toggleMarketsButton')?.addEventListener('click', () => { marketsOpen = !marketsOpen; overviewOpen = false; syncOverlayUI(); });
    $('#toggleLayersButton')?.addEventListener('click', () => { layersOpen = !layersOpen; syncOverlayUI(); });
    $('#openSearchButton')?.addEventListener('click', openGlobalSearch);
    $('#openBriefingButton')?.addEventListener('click', () => briefingOpen ? closeBriefing() : openBriefing());
    $('#closeBriefingButton')?.addEventListener('click', closeBriefing);
    $('#cleanViewButton')?.addEventListener('click', cleanGlobeView);
    $('#drawerBackdrop')?.addEventListener('click', cleanGlobeView);
    $('#closeTrackerButton')?.addEventListener('click', closeLiveTracker);
    $('#followCargoButton')?.addEventListener('click', () => { followCargo = !followCargo; lastInteractionTime = performance.now(); renderLiveTracker(); });
    $('#openCargoButton')?.addEventListener('click', () => trackingDealId && selectDeal(trackingDealId, false));
    $('#tutorialActionButton')?.addEventListener('click', runTutorialAction);
    $('#tutorialBackButton')?.addEventListener('click', () => {
      state.tutorialStep = Math.max(0, currentTutorialStep() - 1);
      saveState();
      renderTutorialCoach();
    });
    $('#skipTutorialButton')?.addEventListener('click', () => {
      state.tutorialEnabled = false;
      state.tutorialDismissed = true;
      saveState();
      renderTutorialCoach();
      showToast('Guided tour skipped. You can restart it from your profile.');
    });
    $('#globalSearchInput')?.addEventListener('input', event => { searchActiveIndex = 0; renderGlobalSearch(event.target.value); });
    $('#searchDialog')?.addEventListener('keydown', event => {
      if (event.key === 'Escape') { event.preventDefault(); $('#searchDialog')?.close(); return; }
      if (!searchItems.length) return;
      if (event.key === 'ArrowDown') { event.preventDefault(); searchActiveIndex = (searchActiveIndex + 1) % searchItems.length; renderGlobalSearch($('#globalSearchInput')?.value || ''); }
      else if (event.key === 'ArrowUp') { event.preventDefault(); searchActiveIndex = (searchActiveIndex - 1 + searchItems.length) % searchItems.length; renderGlobalSearch($('#globalSearchInput')?.value || ''); }
      else if (event.key === 'Enter') { event.preventDefault(); executeSearchItem(searchItems[searchActiveIndex]); }
    });
    document.addEventListener('keydown', event => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); return openGlobalSearch(); }
      if (!['INPUT','SELECT','TEXTAREA'].includes(document.activeElement?.tagName)) {
        if (event.key.toLowerCase() === 'b') { event.preventDefault(); return briefingOpen ? closeBriefing() : openBriefing(); }
        if (event.key.toLowerCase() === 'm') { event.preventDefault(); return openLeftDrawer('opportunities'); }
        if (event.key.toLowerCase() === 'r') { event.preventDefault(); return openLeftDrawer('risk'); }
        if (event.key.toLowerCase() === 'p') { event.preventDefault(); return openLeftDrawer('performance'); }
        if (event.key.toLowerCase() === 's') { event.preventDefault(); return openLeftDrawer('shop'); }
        if (event.key.toLowerCase() === 'n') { event.preventDefault(); return advanceDay(); }
        if (event.key === '?' || (event.shiftKey && event.key === '/')) { event.preventDefault(); return toggleShortcutsOverlay(); }
        if (event.key.toLowerCase() === 'g') { event.preventDefault(); return openGlossaryDialog(); }
      }
      if (event.key.toLowerCase() === 'f' && !['INPUT','SELECT','TEXTAREA'].includes(document.activeElement?.tagName)) {
        globeOptions.cinematic = !globeOptions.cinematic;
        if (globeOptions.cinematic) { leftDrawerOpen=false; inspectorOpen=false; briefingOpen=false; overviewOpen=false; marketsOpen=false; layersOpen=false; syncOverlayUI(); }
        renderLayers();
        return;
      }
      if (event.key === 'Escape' && $('#shortcutsOverlay')?.classList.contains('open')) { closeShortcutsOverlay(); return; }
      if (event.key === 'Escape' && !$('#searchDialog')?.open) cleanGlobeView();
    });
    $('#profileButton')?.addEventListener('click', openProfileDialog);
    $('#openShortcutsButton')?.addEventListener('click', toggleShortcutsOverlay);
    $('#openGlossaryButton')?.addEventListener('click', openGlossaryDialog);
    $('#openNotificationsButton')?.addEventListener('click', openNotificationsDialog);
    $('#manageSlotsButton')?.addEventListener('click', () => { $('#profileDialog')?.close(); setTimeout(openSlotManager, 60); });
    $('#installButton')?.addEventListener('click', async () => {
      if (!_deferredInstallPrompt) { showToast('Install is not available right now. Use your browser menu → Install / Add to Home Screen.', 'info'); return; }
      _deferredInstallPrompt.prompt();
      try { await _deferredInstallPrompt.userChoice; } catch (e) {}
      _deferredInstallPrompt = null;
      $('#installButton')?.classList.add('hidden');
    });
    bindTermTooltips();
    $('#shortcutsCloseButton')?.addEventListener('click', closeShortcutsOverlay);
    $('#shortcutsOverlay')?.addEventListener('click', event => { if (event.target === $('#shortcutsOverlay')) closeShortcutsOverlay(); });
    $('#exportCareerButton')?.addEventListener('click', exportCareer);
    $('#importCareerButton')?.addEventListener('click', () => $('#importCareerInput')?.click());
    $('#importCareerInput')?.addEventListener('change', event => importCareerFile(event.target.files?.[0]));
    $('#restartTutorialButton')?.addEventListener('click', () => {
      state.tutorialEnabled = true;
      state.tutorialDismissed = false;
      state.tutorialStep = 0;
      saveState(true);
      $('#profileDialog')?.close();
      cleanGlobeView();
      renderTutorialCoach();
      showToast('Guided first-deal tour restarted.');
    });
    $('#profileDialog')?.addEventListener('close', () => {
      if ($('#profileDialog')?.returnValue === 'save') applyProfileChanges();
    });

    const dialog = $('#confirmDialog');
    $('#resetButton').addEventListener('click', () => dialog.showModal());
    dialog.addEventListener('close', () => { if (dialog.returnValue === 'confirm') resetCareer(); });
    const onboarding = $('#onboardingDialog');
    onboarding?.addEventListener('close', () => {
      if (onboarding.returnValue === 'start') {
        state.tutorialEnabled = $('#guidedTourToggle')?.checked !== false;
        state.tutorialDismissed = !state.tutorialEnabled;
        state.tutorialStep = 0;
        configureDifficulty($('#difficultySelect')?.value || 'standard');
        renderAll();
        showToast(state.tutorialEnabled ? `${state.difficulty} career started. Follow the guided first deal.` : `${state.difficulty} career started. Open Market and negotiate your first deal.`);
      } else if (!state.onboardingComplete) setTimeout(openOnboarding,80);
    });
    const dailyDialog = $('#dailyRewardDialog');
    dailyDialog?.addEventListener('close', () => { if (dailyDialog.returnValue === 'claim') claimDailyReward(); });
    const victoryDialog = $('#victoryDialog');
    victoryDialog?.addEventListener('close', () => {
      if (victoryDialog.returnValue === 'prestige') claimPrestige();
    });
  }

  let _deferredInstallPrompt = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    _deferredInstallPrompt = e;
    const btn = $('#installButton');
    if (btn) btn.classList.remove('hidden');
  });
  window.addEventListener('appinstalled', () => {
    _deferredInstallPrompt = null;
    const btn = $('#installButton');
    if (btn) btn.classList.add('hidden');
    showToast('World of Trade installed as an app.', 'success');
  });

  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' }).catch(() => {}));
  }

  if (state.reduceMotion) document.body.classList.add('reduce-motion');
  applyLanguage(state.language || 'en');
  initEarthRenderer();
  deferNonCritical(loadGeoBorders, 1600);
  resizeCanvas();
  bindEvents();
  renderAll();
  syncOverlayUI();
  updateClock();
  requestAnimationFrame(animate);
  setTimeout(openOnboarding,120);
  setTimeout(() => { if (state.onboardingComplete) checkDailyReward(); }, 1400);
  (function hideSplash(){
    const splash = document.getElementById('wotSplash');
    if (!splash) return;
    setTimeout(() => splash.classList.add('hide'), 1100);
    setTimeout(() => splash.remove(), 1700);
  })();
})();
