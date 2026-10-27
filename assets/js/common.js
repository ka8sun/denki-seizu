/* Stage 11: navigation/a11y only. Deliberately does not read or write learning data. */
(()=>{'use strict';
 const main=document.querySelector('main');
 if(main){if(!main.id)main.id='main-content';main.setAttribute('tabindex','-1');
   const skip=document.createElement('a');skip.className='s11-skip';skip.href='#'+main.id;skip.textContent='本文へスキップ';document.body.prepend(skip);
 }
 const file=(location.pathname.split('/').pop()||'index.html');
 const group=file==='october.html'||file==='november.html'?'problems.html':file==='practical-study.html'?'practical.html':file;
 document.querySelectorAll('.mobile-bottom-nav').forEach(nav=>{
  nav.querySelectorAll('a[href]').forEach(a=>{
    const active=a.getAttribute('href')===group;
    if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');
  });
 });
 // Use native links so browser back/forward and direct Github Pages URLs keep working.
 // Only mark wide tables as scrollable when a wrapper is absent. Never alter table markup.
 document.querySelectorAll('table').forEach(t=>{
   if(t.closest('.table-wrap,.scroll-table,.table-responsive'))return;
   const wrap=document.createElement('div');wrap.className='table-responsive';wrap.setAttribute('role','region');
   wrap.setAttribute('tabindex','0');wrap.setAttribute('aria-label','表（横にスクロールできます）');
   t.parentNode.insertBefore(wrap,t);wrap.appendChild(t);
 });
 document.querySelectorAll('.mobile-bottom-nav a').forEach(a=>{a.addEventListener('click',()=>{a.blur();});});
})();
