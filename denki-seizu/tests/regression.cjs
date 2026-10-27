'use strict';
// Node.js built-ins only. No production files are modified by this suite.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
let passed=0,failed=0;
function test(name,fn){try{fn();passed++;console.log('PASS '+name)}catch(e){failed++;console.error('FAIL '+name+' — '+e.message)}}
function captureArray(src,name,terminator){const start=src.indexOf('const '+name+' = [');assert(start>=0,name+' not found');const end=src.indexOf(terminator,start);assert(end>=0,name+' closing token not found');return vm.runInNewContext(src.slice(start,end+terminator.length)+'\n'+name,{},{timeout:1500})}
const oct=read('october.html'),nov=read('november.html');
const octQuestions=captureArray(oct,'Q','\n];');
const m=nov.match(/<script id="questionBank" type="application\/json">([\s\S]*?)<\/script>/);assert(m,'November bank absent');const november=JSON.parse(m[1]);
function verifyQuestions(qs,month){assert.equal(qs.length,60,month+' 60 questions');const seen=new Set();for(const q of qs){assert.equal(typeof q.id,'string');assert(!seen.has(q.id),'duplicate ID '+q.id);seen.add(q.id);assert.equal(typeof (q.q??q.question),'string');if(month==='10月'){assert(['tf','mcq'].includes(q.type));assert(q.answer==='○'||q.answer==='×'||Array.isArray(q.choices)&&q.choices.includes(q.answer),'invalid October answer '+q.id)}else{assert(['true_false','choice4'].includes(q.type));assert(Array.isArray(q.options));assert.equal(q.options.length,q.type==='true_false'?2:4);assert(Number.isInteger(q.answerIndex)&&q.answerIndex>=0&&q.answerIndex<q.options.length,'invalid November answer '+q.id);assert(q.explanation&&typeof q.explanation.correctReason==='string')}}}
test('10月の問題60問：ID・出題形式・正答定義',()=>verifyQuestions(octQuestions,'10月'));
test('11月の問題60問：ID・選択肢・正答番号・解説',()=>verifyQuestions(november.questions,'11月'));
test('11月の宣言問題数と形式内訳',()=>{assert.equal(november.counts.total,60);assert.equal(november.questions.filter(q=>q.type==='true_false').length,30);assert.equal(november.questions.filter(q=>q.type==='choice4').length,30)});
function functionText(source,name){const m=new RegExp('function '+name+'\\s*\\(').exec(source);assert(m,'function not found '+name);let opening=source.indexOf('{',m.index),depth=0,quote='',escaped=false;for(let i=opening;i<source.length;i++){const c=source[i];if(quote){if(escaped)escaped=false;else if(c==='\\')escaped=true;else if(c===quote)quote='';continue}if(c==='"'||c==="'"||c==='`'){quote=c;continue}if(c==='{')depth++;if(c==='}'&&!--depth)return source.slice(m.index,i+1)}throw Error('unbalanced function '+name)}
function storage(){const data=new Map();return {getItem:k=>data.has(k)?data.get(k):null,setItem:(k,v)=>data.set(k,String(v)),removeItem:k=>data.delete(k),data}}
function octRun(correct){const s=storage();const elements={explain:{className:'',innerHTML:''},quizButtons:{innerHTML:''}};const ctx={localStorage:s,session:[{...octQuestions[0],displayChoices:['○','×']}],pos:0,locked:false,state:{version:1,stats:{},totalAnswered:0,totalCorrect:0},sessionCorrect:0,mode:'drill',getStat(id){return this.state.stats[id]??(this.state.stats[id]={attempts:0,correct:0,last:null,streak:0})},saveState(){s.setItem('denki2_oct_state',JSON.stringify(this.state))},document:{getElementById:id=>elements[id],querySelectorAll:()=>[]},readingHtml:x=>x};ctx.getStat=ctx.getStat.bind(ctx);ctx.saveState=ctx.saveState.bind(ctx);vm.createContext(ctx);vm.runInContext(functionText(oct,'answerChoice'),ctx);const q=ctx.session[0],i=ctx.session[0].displayChoices.indexOf(correct?q.answer:(q.answer==='○'?'×':'○'));vm.runInContext('answerChoice('+i+',null)',ctx);const snapshot=JSON.parse(s.getItem('denki2_oct_state'));assert.equal(snapshot.totalAnswered,1);assert.equal(snapshot.totalCorrect,correct?1:0);assert.equal(snapshot.stats[q.id].last,correct?'correct':'wrong');vm.runInContext('answerChoice('+i+',null)',ctx);assert.equal(JSON.parse(s.getItem('denki2_oct_state')).totalAnswered,1)}
test('10月採点：正解・保存・二重採点防止',()=>octRun(true));test('10月採点：不正解・保存・二重採点防止',()=>octRun(false));
function novRun(correct){const s=storage(),q=november.questions[0];const nodes={'submitAnswer':{remove(){}},toast:{textContent:'',classList:{add(){},remove(){}}}};const ctx={localStorage:s,session:[q],pos:0,selected:correct?q.answerIndex:(q.answerIndex+1)%q.options.length,locked:false,sessionCorrect:0,state:{version:1,stats:{},totalAnswered:0,totalCorrect:0},mutableStat(id){return this.state.stats[id]??(this.state.stats[id]={attempts:0,correct:0,last:null,understanding:null})},save(){s.setItem('denki2_nov_2026_v1',JSON.stringify(this.state))},document:{getElementById:id=>nodes[id]??{innerHTML:'',classList:{add(){},remove(){}}},querySelectorAll:()=>[]},html:x=>String(x),relevantTerms:()=>'',get:id=>nodes[id]??{innerHTML:'',insertAdjacentHTML(){},classList:{add(){},remove(){}}}};ctx.mutableStat=ctx.mutableStat.bind(ctx);ctx.save=ctx.save.bind(ctx);vm.createContext(ctx);vm.runInContext(functionText(nov,'submitAnswer'),ctx);vm.runInContext('submitAnswer()',ctx);const snap=JSON.parse(s.getItem('denki2_nov_2026_v1'));assert.equal(snap.totalAnswered,1);assert.equal(snap.totalCorrect,correct?1:0);assert.equal(snap.stats[q.id].last,correct?'correct':'wrong');if(!correct)assert.equal(snap.stats[q.id].understanding,'retry');vm.runInContext('submitAnswer()',ctx);assert.equal(JSON.parse(s.getItem('denki2_nov_2026_v1')).totalAnswered,1)}
test('11月採点：正解・保存・二重採点防止',()=>novRun(true));test('11月採点：不正解・復習設定・二重採点防止',()=>novRun(false));
function loadWithStorage(source,name,key,call){const st=storage(),sandbox={localStorage:st,console,APP_VERSION:1,STORE:'denki2_nov_2026_v1',VERSION:1,defaultState:()=>({version:1,stats:{},totalAnswered:0,totalCorrect:0})};vm.createContext(sandbox);vm.runInContext(functionText(source,name),sandbox);const run=()=>JSON.parse(JSON.stringify(vm.runInContext(call,sandbox)));return {st,run,key}}
test('10月学習履歴：空・正常・破損JSONの読み込み',()=>{const x=loadWithStorage(oct,'loadState','denki2_oct_state','loadState()');assert.equal(x.run().totalAnswered,0);x.st.setItem(x.key,JSON.stringify({stats:{'M-T01':{attempts:2,correct:1}},totalAnswered:2,totalCorrect:1}));assert.equal(x.run().totalCorrect,1);x.st.setItem(x.key,'{corrupt');assert.equal(x.run().totalAnswered,0)});
test('11月学習履歴：空・正常・破損JSONの読み込み',()=>{const x=loadWithStorage(nov,'load','denki2_nov_2026_v1','load()');assert.equal(x.run().totalAnswered,0);x.st.setItem(x.key,JSON.stringify({stats:{'NOV-A-001':{attempts:2,correct:1}},totalAnswered:2,totalCorrect:1}));assert.equal(x.run().totalCorrect,1);x.st.setItem(x.key,'{corrupt');assert.equal(x.run().totalAnswered,0)});
test('10月・11月・実技の保存キーが重複しない',()=>{const keys=['denki2_oct_state','denki2_nov_2026_v1','denki2_practical_weeks_v1','denki2_practical_2026_v1'];assert.equal(new Set(keys).size,keys.length);for(const key of keys)assert([oct,nov,read('practical-study.html'),read('assets/js/records.js'),read('assets/js/practical-study.js')].some(s=>s.includes(key)),key+' not referenced')});
test('学習記録集計の入力キーと集計式が維持されている',()=>{const src=read('assets/js/records.js');for(const key of ['denki2_oct_state','denki2_nov_2026_v1','denki2_practical_weeks_v1'])assert(src.includes(key));assert(src.includes('totalAnswered'));assert(src.includes('totalCorrect'));assert(src.includes('Math.round(correct/attempts*100)'))});

// Stage 14 structure guard: make sure no old flat-root dependencies remain.
test('全8ページの CSS/JavaScript 参照先が存在し、外部ファイルが正しく統合されている',()=>{
 const pages=['index','problems','practical','review','records','october','november','practical-study'];
 for(const page of pages){const s=read(page+'.html');
  const css=[...s.matchAll(/<link\b[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*>/g)].map(x=>x[1]);
  const js=[...s.matchAll(/<script\b[^>]*src=["']([^"']+)["'][^>]*>/g)].map(x=>x[1]);
  assert.deepEqual(css,['assets/css/'+page+'.css'],page+' CSS bundle');
  assert(js.includes('assets/js/common.js'),page+' common JS');
  for(const asset of [...css,...js])assert(fs.existsSync(path.join(root,asset)),page+' missing '+asset);
  for(const link of s.matchAll(/\bhref=["']([^"']+\.html)(?:#[^"']*)?["']/g))assert(fs.existsSync(path.join(root,link[1])),page+' broken href '+link[1]);
 }
});
test('実技10モジュール・記録2モジュールの実行順序が維持されている',()=>{
 const sources=['practical-weeks','practical-upgrade-v6','practical-upgrade-v7','practical-upgrade-v8','practical-upgrade-v9','practical-upgrade-v10','exam-focus-v11','practical-validated-v12','practical-validated-v13','mobile-stage8-practical'];
 const practical=read('assets/js/practical-study.js');
 let last=-1;for(const name of sources){const pos=practical.indexOf('BEGIN '+name+'.js');assert(pos>last,name+' order');last=pos;}
 const records=read('assets/js/records.js');assert(records.indexOf('BEGIN records.js')<records.indexOf('BEGIN mobile-stage10-records.js'));
});

console.log(`\n結果: ${passed}件成功 / ${failed}件失敗`);if(failed)process.exitCode=1;
