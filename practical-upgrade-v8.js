(()=>{'use strict';
const host=document.getElementById('modeldrawings');if(!host)return;
const ns='http://www.w3.org/2000/svg';const NS='denki2_practical_v8_dimensions';
const section=document.createElement('section');section.className='card v8';section.id='v8-diagrams';
section.innerHTML=`<h2>本格的な図記号で練習する</h2>
<p>学習用の接点記号を線で描いたSVG図面です。青は改造で変更する部分、灰色は維持する部分を示します。図中のL・Nは制御電源を抽象化した表示です。</p>
<p class="alert"><b>重要：</b>ここにある回路は機能を学ぶための独自作成の模式図です。公式試験の模範解答でも実機用回路図でもありません。接点番号、電源電圧、インバータ入出力端子、安全回路、保護構成を指定するものではありません。</p>
<div class="v8-toolbar"><button type="button" data-v8-view="before" aria-pressed="true">改造前</button><button type="button" data-v8-view="after" aria-pressed="false">改造後</button><button type="button" data-v8-view="compare" aria-pressed="false">変更前後を比較</button></div>
<div id="v8-visuals"></div>
<h3>図面の読み取りポイント</h3><ol><li>停止bと過負荷／異常条件は共通の直列経路を遮断する役割。</li><li>起動aと自身の保持補助a接点は並列で、保持経路をつくる。</li><li>改造後の運転許可Rは、INVへRUN指令を送るための論理的な状態を表す。</li><li>変更していないポンプP2の回路は、P1の改造と混同せず残す。</li></ol>
<h3>追加作図演習｜図を隠して描く</h3><p>白紙で図を描いてから模範的な参考例を表示し、差分を確認しましょう。</p><button type="button" id="v8-show-model" aria-expanded="false">参考解答図を表示</button><div id="v8-model" hidden></div>
</section>`;
host.insertAdjacentElement('afterend',section);
function el(tag,attrs={},text){const n=document.createElementNS(ns,tag);for(const [k,v]of Object.entries(attrs))n.setAttribute(k,String(v));if(text!==undefined)n.textContent=text;return n}
function diagram(mode){let svg=el('svg',{viewBox:'0 0 1000 395',role:'img','aria-label':mode==='before'?'改造前、自己保持用MC1コイルとP2系統の回路図':'改造後、運転許可RとインバータへのRUN指令の回路図'});const line=(x1,y1,x2,y2,c='#334155',w=3)=>svg.append(el('line',{x1,y1,x2,y2,stroke:c,'stroke-width':w,'stroke-linecap':'round'}));const txt=(x,y,s,size=17,anchor='middle',color='#0f172a')=>svg.append(el('text',{x,y,fill:color,'font-size':size,'text-anchor':anchor,'font-family':'sans-serif'},s));const rect=(x,y,w,h,fill='#f8fafc',stroke='#94a3b8')=>svg.append(el('rect',{x,y,width:w,height:h,rx:8,fill,stroke}));
 const blue='#2563eb', grey='#64748b', active=mode==='after'?blue:grey;
 // rails
 line(65,45,65,330);line(930,45,930,330);txt(65,30,'L');txt(930,30,'N');
 // first rung stop and guard
 line(65,110,150,110);line(150,93,150,127);line(182,93,182,127);line(148,125,184,95,'#0f172a',2);line(182,110,260,110);txt(166,77,'停止 PB (b)',15);
 line(260,93,260,127);line(292,93,292,127);line(258,125,294,95,'#0f172a',2);line(292,110,365,110);txt(276,77,mode==='before'?'THR1 (b)':'異常許可 (b)',15);
 // branch start + holding
 line(365,110,410,110);line(410,110,410,180);line(410,110,470,110);line(470,93,470,127);line(500,93,500,127);line(500,110,590,110);line(410,180,470,180);line(470,163,470,197);line(500,163,500,197);line(500,180,590,180);line(590,110,590,180);line(590,110,700,110);txt(485,77,'起動 PB (a)',15);txt(485,223,mode==='before'?'MC1補助 (a)':'R補助 (a)',15);
 line(700,110,726,110);svg.append(el('circle',{cx:767,cy:110,r:41,fill:'white',stroke:active,'stroke-width':3}));line(808,110,930,110);txt(767,117,mode==='before'?'MC1':'R',20);txt(760,63,mode==='before'?'直入れ運転用コイル':'運転許可コイル',15,'middle',active);
 // second rung comparison
 line(65,275,145,275);line(145,258,145,292);line(175,258,175,292);line(175,275,310,275);line(310,275,445,275);rect(445,245,210,60,mode==='before'?'#f1f5f9':'#eff6ff',active);line(655,275,930,275);txt(160,245,mode==='before'?'P2起動条件 (例)':'R補助 (a)',15);txt(550,282,mode==='before'?'P2既設系統へ':'INVへのRUN論理出力',17,'middle',active);
 // descriptive banner
 txt(500,357,mode==='before'?'灰色：既設状態。P1のMC1自己保持回路を確認する':'青色：変更側。Rを自己保持し、別回路へRUN状態を伝える',18);
 txt(500,379,'記号は学習用表記。接点番号・端子・電圧・安全機能は省略',13,'middle','#64748b');return svg}
function panel(mode){const box=document.createElement('div');box.className='v8-figure';box.append(diagram(mode));const cap=document.createElement('p');cap.className='v8-caption';cap.textContent=mode==='before'?'改造前：起動・保持によりMC1コイルを制御する概念図（下段はP2系統の省略表示）':'改造後：運転許可Rの接点からインバータへRUN状態を伝える概念図（実機端子配線を示さない）';box.append(cap);return box}
const visuals=document.getElementById('v8-visuals');function show(mode){visuals.replaceChildren();if(mode==='compare'){const grid=document.createElement('div');grid.className='v8-compare';grid.append(panel('before'),panel('after'));visuals.append(grid)}else visuals.append(panel(mode));document.querySelectorAll('[data-v8-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.v8View===mode)))}document.querySelectorAll('[data-v8-view]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.v8View)));show('before');
const model=document.getElementById('v8-model');model.append(panel('before'),panel('after'));document.getElementById('v8-show-model').addEventListener('click',e=>{model.hidden=!model.hidden;e.currentTarget.setAttribute('aria-expanded',String(!model.hidden));e.currentTarget.textContent=model.hidden?'参考解答図を表示':'参考解答図を隠す'});
const door=document.getElementById('door-detailed');if(door){const s=document.createElement('section');s.className='card v8';s.id='v8-dimensions';s.innerHTML=`<h2>扉正面図の寸法演習（独自条件）</h2><p>指定条件を読み、機器中心位置と必要な寸法線を考えてから解答してください。寸法値は練習用で、公式課題の指定値ではありません。</p>
<div class="v8-figure" id="v8-door-figure"></div><fieldset class="v8-dimquiz"><legend><b>中心線から左右100mmに表示灯を2個配置。両方の中心間隔は？</b></legend>
<label><input type="radio" name="v8-dim-answer" value="100">100 mm</label>
<label><input type="radio" name="v8-dim-answer" value="200">200 mm</label>
<label><input type="radio" name="v8-dim-answer" value="300">300 mm</label>
<button type="button" id="v8-dim-check">答え合わせ</button><p id="v8-dim-feedback" role="status"></p></fieldset>
<p><button type="button" id="v8-dim-reveal" aria-expanded="false">寸法記入の参考解答を表示</button></p><div id="v8-dim-solution" hidden><p><b>参考解答：200 mm。</b>中心線の左に100mm、右に100mmなので、中心間隔は200mmです。実際の図面では基準線から各中心までの寸法を示し、指示条件に従い重複寸法を避けてください。</p></div>`;door.insertAdjacentElement('afterend',s);
const svg=el('svg',{viewBox:'0 0 650 340',role:'img','aria-label':'幅600ミリの扉、中央の中心線、左右100ミリの表示灯の寸法問題'});const l=(x1,y1,x2,y2,c='#334155',w=2)=>svg.append(el('line',{x1,y1,x2,y2,stroke:c,'stroke-width':w}));svg.append(el('rect',{x:190,y:25,width:270,height:280,fill:'#fff',stroke:'#334155','stroke-width':3}));l(325,15,325,315,'#94a3b8');for(let y=17;y<315;y+=15)l(325,y,325,y+8,'#94a3b8',1);[280,370].forEach(x=>svg.append(el('circle',{cx:x,cy:128,r:13,fill:'#eff6ff',stroke:'#334155','stroke-width':2})));const t=(x,y,s)=>svg.append(el('text',{x,y,'font-size':15,fill:'#0f172a','text-anchor':'middle'},s));t(325,328,'幅600mm（例）');t(325,12,'中心線');t(280,163,'左表示灯');t(370,163,'右表示灯');t(508,130,'左右それぞれ100mm');document.getElementById('v8-door-figure').append(svg);
let state={};try{state=JSON.parse(localStorage.getItem(NS)||'{}')||{}}catch{}const fb=document.getElementById('v8-dim-feedback');if(state.solved)fb.textContent='前回正解済みです。何度でも解き直せます。';document.getElementById('v8-dim-check').addEventListener('click',()=>{const c=document.querySelector('input[name="v8-dim-answer"]:checked');if(!c){fb.textContent='選択肢を選んでください。';return;}if(c.value==='200'){fb.textContent='正解です。100＋100＝200mmです。';try{localStorage.setItem(NS,JSON.stringify({solved:true}))}catch{}}else fb.textContent='もう一度考えましょう。中心線の左右の距離を足します。'});document.getElementById('v8-dim-reveal').addEventListener('click',e=>{const d=document.getElementById('v8-dim-solution');d.hidden=!d.hidden;e.currentTarget.setAttribute('aria-expanded',String(!d.hidden));e.currentTarget.textContent=d.hidden?'寸法記入の参考解答を表示':'参考解答を隠す'});}
})();
