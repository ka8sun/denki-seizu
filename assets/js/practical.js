/* practical.js | Stage 14 bundled in the original execution order. */

/* ===== BEGIN practical-hub.js ===== */
(()=>{'use strict';let weeks={};try{weeks=JSON.parse(localStorage.getItem('denki2_practical_weeks_v1')||'{}')||{}}catch(e){}let n=0;for(let i=1;i<=4;i++){const done=!!weeks[i];if(done)n++;const label=document.querySelector(`[data-week="${i}"]`),bar=document.querySelector(`[data-bar="${i}"]`);if(label&&done)label.textContent='この週は学習済み';if(bar)bar.style.width=done?'100%':'0%'}document.getElementById('weeks-done').textContent=n+' / 4';let checks=[];try{checks=JSON.parse(localStorage.getItem('denki2_practical_2026_v1')||'[]')||[]}catch(e){}const completed=Array.isArray(checks)?checks.filter(Boolean).length:0;document.getElementById('practice-rate').textContent=Math.round(completed/18*100)+'%';})();
;
/* ===== END practical-hub.js ===== */
