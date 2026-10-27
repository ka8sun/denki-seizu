/* review.js | Stage 14 bundled in the original execution order. */

/* ===== BEGIN review-hub.js ===== */
(()=>{'use strict';
const $=id=>document.getElementById(id);
function read(key){
  try{
    const v=JSON.parse(localStorage.getItem(key)||'null');
    return v&&typeof v.stats==='object'&&v.stats ? v : {stats:{}};
  }catch(e){
    return {stats:{}};
  }
}
const oct=read('denki2_oct_state');
const nov=read('denki2_nov_2026_v1');
const octWrong=s=>s&&s.last==='wrong';
const novWrong=s=>s&&(s.last==='wrong'||s.understanding==='retry'||s.understanding==='uncertain');
const octEntries=Object.entries(oct.stats);
const novEntries=Object.entries(nov.stats);
const oc=octEntries.filter(([,s])=>octWrong(s)).length;
const nc=novEntries.filter(([,s])=>novWrong(s)).length;
const total=oc+nc;
const totalEl=$('total-review'); if(totalEl) totalEl.textContent=total;
const octCount=$('oct-count'); if(octCount) octCount.textContent=oc+'問';
const novCount=$('nov-count'); if(novCount) novCount.textContent=nc+'問';
const wrongSummary=$('wrong-summary'); if(wrongSummary) wrongSummary.textContent=total+'問が復習対象';
const reviewTime=$('review-time'); if(reviewTime) reviewTime.textContent=total ? '復習目安 約'+Math.max(5,Math.ceil(total*2/5)*5)+'分' : '新しい問題を解いて復習を始めよう';
const reviewStatus=$('review-status'); if(reviewStatus) reviewStatus.textContent=total ? '10月 '+oc+'問・11月 '+nc+'問の復習が必要です。' : 'まだ復習対象の問題はありません。まずは問題を解いてみましょう。';

const dest=nc ? 'november.html#review' : oc ? 'october.html#review' : 'problems.html';
const start=$('review-start'); if(start) start.href=dest;
const wrongLink=$('wrong-link'); if(wrongLink) wrongLink.href=dest;

const domains={};
for(const [id,s] of novEntries){
  if(!novWrong(s)) continue;
  const m=/^NOV-([A-F])-/.exec(id);
  if(m) domains[m[1]]=(domains[m[1]]||0)+1;
}
const labels={A:'機器・図記号',B:'回路・配線',C:'展開図',D:'制御・保護',E:'製図・規格',F:'電気・材料の基礎'};
const max=Object.entries(domains).sort((a,b)=>b[1]-a[1])[0];
const weakLink=$('weak-link');
if(max){
  $('weak-topic').textContent=labels[max[0]]+'が復習対象';
  $('weak-summary').textContent=max[1]+'問を確認';
  if(weakLink) weakLink.href='november.html#review';
}else if(oc){
  $('weak-topic').textContent='10月の基礎問題を確認';
  $('weak-summary').textContent=oc+'問から復習';
  if(weakLink) weakLink.href='october.html#review';
}else{
  $('weak-topic').textContent='問題を解くと苦手分野が見えてきます';
  $('weak-summary').textContent='基礎から始める';
  if(weakLink) weakLink.href='problems.html#topic';
}

const priorityChip=$('priority-chip');
const wrongChip=$('wrong-chip');
const weakChip=$('weak-chip');
const focusBadge=$('focus-badge');
const focusMessage=$('focus-message');
const focusPrimary=$('focus-primary');
const focusPrimaryNote=$('focus-primary-note');
if(wrongChip) wrongChip.textContent='間違えた問題 '+total+'問';
if(weakChip) weakChip.textContent=max ? ('苦手分野 '+labels[max[0]]) : (oc ? '10月の基礎を確認' : '苦手分野はこれから表示');

if(total===0){
  if(priorityChip) priorityChip.textContent='まずは問題を解いてみよう';
  if(focusBadge) focusBadge.textContent='準備OK';
  if(focusMessage) focusMessage.textContent='復習対象はまだありません。問題演習から始めると、復習に必要な記録がたまります。';
  if(focusPrimary){ focusPrimary.href='problems.html'; focusPrimary.querySelector('strong').textContent='問題を解く'; }
  if(focusPrimaryNote) focusPrimaryNote.textContent='基礎問題や模擬演習へ進む';
}else if(nc>=oc){
  if(priorityChip) priorityChip.textContent='おすすめ：11月の理解を復習';
  if(focusBadge) focusBadge.textContent='最優先';
  if(focusMessage) focusMessage.textContent=(max ? labels[max[0]]+'を中心に' : '11月教材を中心に')+'復習すると、苦手をまとめて見直せます。';
  if(focusPrimary){ focusPrimary.href='november.html#review'; focusPrimary.querySelector('strong').textContent='11月の復習へ進む'; }
  if(focusPrimaryNote) focusPrimaryNote.textContent='理解度が低い問題をまとめて確認';
}else{
  if(priorityChip) priorityChip.textContent='おすすめ：10月の基礎を復習';
  if(focusBadge) focusBadge.textContent='基礎優先';
  if(focusMessage) focusMessage.textContent='まずは10月教材の基礎問題を解き直して、土台を整えましょう。';
  if(focusPrimary){ focusPrimary.href='october.html#review'; focusPrimary.querySelector('strong').textContent='10月の復習へ進む'; }
  if(focusPrimaryNote) focusPrimaryNote.textContent='間違えた基礎問題を解き直す';
}
})();

;
/* ===== END review-hub.js ===== */
