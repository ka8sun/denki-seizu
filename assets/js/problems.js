/* problems.js | Stage 14 bundled in the original execution order. */

/* ===== BEGIN learning-ui.js ===== */
(()=>{
const tabs=[...document.querySelectorAll('[data-tab]')];
function activate(name,focus=false){tabs.forEach(t=>{const active=t.dataset.tab===name;t.classList.toggle('active',active);t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;document.getElementById('panel-'+t.dataset.tab).hidden=!active;if(active&&focus)t.focus()});history.replaceState(null,'','#'+name)}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>activate(tab.dataset.tab));tab.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const ix=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;activate(tabs[ix].dataset.tab,true)})});
if(['basic','topic','mock'].includes(location.hash.slice(1)))activate(location.hash.slice(1));
// Trigger an existing quiz mode only after a deliberate click, on the destination page.
document.querySelectorAll('[data-auto]').forEach(a=>a.addEventListener('click',()=>sessionStorage.setItem('denki-next-action',a.dataset.auto)));
})();

;
/* ===== END learning-ui.js ===== */
