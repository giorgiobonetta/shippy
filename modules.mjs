import { boot } from './harness.mjs';
const ok=[],ko=[]; const t=(n,c,i='')=>{(c?ok:ko).push(n+(i?' — '+i:''));};
const {w,errors}=await boot();
const A=w.__API__,S=()=>w.__STATE__();
const dlg=w.document.getElementById('onboardingDialog'); if(dlg&&dlg.open) dlg.close('start');
await new Promise(r=>setTimeout(r,300));
const visibleGroups=()=>[...w.document.querySelectorAll('[data-tab-group]')].map(g=>g.dataset.tabGroup);
const visibleTabs=()=>[...w.document.querySelectorAll('.panel-tab')].filter(b=>!b.hidden).map(b=>b.dataset.leftTab);
const allUnlocked=()=>[...w.document.querySelectorAll('.panel-tab')].filter(b=>A.moduleUnlocked(b.dataset.leftTab)).map(b=>b.dataset.leftTab);

console.log('livello  aree                                  moduli disponibili');
for(const lvl of [1,2,3,4,5,6,7,8,9,11,13,15]){
  S().xpLevel=lvl; A.renderAll(); await new Promise(r=>setTimeout(r,40));
  console.log(`  ${String(lvl).padStart(2)}     ${visibleGroups().join(',').padEnd(38)}${allUnlocked().length}: ${allUnlocked().join(', ')}`);
}
S().xpLevel=1; S().seenModules=[]; A.renderAll(); await new Promise(r=>setTimeout(r,60));
t('al livello 1 solo due moduli', allUnlocked().length===2, allUnlocked().join(','));
t('al livello 1 una sola area', visibleGroups().length===1, visibleGroups().join(','));
t('schede visibili = moduli dell area', visibleTabs().join(',')==='portfolio,opportunities', visibleTabs().join(','));
S().xpLevel=15; A.renderAll(); await new Promise(r=>setTimeout(r,60));
t('al livello 15 tutti i 22 moduli', allUnlocked().length===22, allUnlocked().length+'');
t('al livello 15 tutte le 5 aree', visibleGroups().length===5);
// il dock segue
S().xpLevel=1; A.renderAll(); await new Promise(r=>setTimeout(r,60));
t('pulsante Shop nascosto a inizio partita', w.document.getElementById('openShopButton').hidden===true);
t('pulsante Offices nascosto a inizio partita', w.document.getElementById('openOfficesButton').hidden===true);
S().xpLevel=13; A.renderAll(); await new Promise(r=>setTimeout(r,60));
t('pulsante Shop compare al 13', w.document.getElementById('openShopButton').hidden===false);
// nessuna scorciatoia apre un modulo bloccato
S().xpLevel=1; A.renderAll();
A.openLeftDrawer('shop');
t('scorciatoia verso modulo bloccato respinta', w.document.querySelector('.panel-tab.active').dataset.leftTab!=='shop', 'attivo='+w.document.querySelector('.panel-tab.active').dataset.leftTab);
// badge nuovo
S().xpLevel=2; S().seenModules=['portfolio','opportunities']; A.renderAll(); await new Promise(r=>setTimeout(r,60));
t('modulo appena sbloccato marcato nuovo', A.moduleIsNew('inventory')===true);
const freshGroup=[...w.document.querySelectorAll('.panel-group.fresh')].length;
t('area col puntino nuovo', freshGroup>0, freshGroup+' aree');
w.document.querySelector('[data-left-tab="inventory"]').dispatchEvent(new w.Event('click',{bubbles:true}));
await new Promise(r=>setTimeout(r,80));
t('il puntino sparisce dopo la visita', A.moduleIsNew('inventory')===false);
t('annuncio al level-up', A.modulesUnlockedAtLevel(4).length>0, 'livello 4 apre: '+A.modulesUnlockedAtLevel(4).join(', '));
t('nessun errore', errors.length===0, [...new Set(errors)].slice(0,2).join('|'));
console.log('\n=== PASSATI ('+ok.length+') ===');ok.forEach(x=>console.log('  ✓',x));
console.log('=== FALLITI ('+ko.length+') ===');ko.forEach(x=>console.log('  ✗',x));
process.exit(0);
