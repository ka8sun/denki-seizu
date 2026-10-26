(()=>{'use strict';
const root=document.getElementById('validatedV12');if(!root)return;
const section=document.createElement('section');section.className='card';section.id='auditV13';
section.innerHTML=`<h2>回路図照査とCWD方式に近づける作図演習</h2>
<p class="alert"><strong>独自教材・施工禁止：</strong>ここに示す図は通常状態で表した機能確認用の展開接続図例です。JAVADAの正式な試験指定図・模範解答・施工配線図ではありません。回路番号、端子番号、接点表、制御電圧、保護方式、使用機器の詳細は課題条件・メーカー資料に依存します。CWD方式の正式提出図と同一だとは扱わないでください。</p>
<p>次の参考図を用いて、接点の通常状態、自己保持、インターロックおよび制御回路の読み方を確認しましょう。</p>
<h3>図面A｜自己保持の通常状態</h3><div class="v13-figure" id="v13-hold"></div><p>停止PB（b）と過負荷保護用THR（b）は共通直列。起動PB（a）とMC補助（a）は並列。MCコイルは合流後に置きます。</p>
<h3>図面B｜正転・逆転インターロック</h3><div class="v13-figure" id="v13-interlock"></div><p>正転枝にMC-Rのb接点、逆転枝にMC-Fのb接点。どちらの枝も自身の補助aで自己保持します。実機は機械的インターロックや逆転切替条件を別途検討します。</p>
<h3>図面C｜インバータ改造前・後の制御論理</h3><div class="v13-figure" id="v13-inverter"></div><p>改造前はMC1コイル、改造後はR1運転許可コイルを保持する学習用の例です。RUNは三相電力ではなくインバータへの制御入力です。異常/保護接点は「正常で閉、故障で開」と仮定した外部の許可信号で、特定のインバータの故障リレー接点を意味しません。</p>
<h3>作図・検図チェック</h3><ol><li>通常状態でa接点は開、b接点は閉として作図できるか。</li><li>自己保持a接点が起動aと並列で、停止bと並列になっていないか。</li><li>正転枝・逆転枝の相手側b接点が入れ替わっていないか。</li><li>主回路の電力とRUN制御信号を混同していないか。</li><li>接続点（●）と非接続交差、コイルと補助接点の機器符号が一致しているか。</li><li>正式課題で指定される端子、線番、表題欄、図記号、寸法をこの教材の例から推測していないか。</li></ol>
<p><a href="https://www.kentei.javada.or.jp/" target="_blank" rel="noopener noreferrer">JAVADA 技能検定試験問題公開サイト</a> ／ <a href="https://www.javada.or.jp/jigyou/gino/sagyou_naiyou.html" target="_blank" rel="noopener noreferrer">JAVADA 職種・作業内容</a></p>`;
root.insertAdjacentElement('afterend',section);
const nav=document.querySelector('header nav');if(nav){const a=document.createElement('a');a.href='#auditV13';a.className='btn';a.textContent='回路図の照査';nav.appendChild(a)}
// All contacts are drawn in the de-energized, unoperated state. Junctions are explicitly dotted.
const w=(str,h)=>`<svg viewBox="0 0 1060 ${h}" role="img" xmlns="http://www.w3.org/2000/svg" aria-label="${str}">`;
const end='</svg>';
const L=(a,b,c,d)=>`<path d="M${a} ${b}L${c} ${d}" stroke="#334155" stroke-width="2.5" fill="none"/>`;
const T=(x,y,s,size=14)=>`<text x="${x}" y="${y}" font-family="sans-serif" font-size="${size}" text-anchor="middle" fill="#172033">${s}</text>`;
const J=(x,y)=>`<circle cx="${x}" cy="${y}" r="4.3" fill="#334155"/>`;
function c(x,y,name,nc=false){let q=L(x-31,y,x-11,y)+L(x+11,y,x+31,y)+L(x-11,y-16,x-11,y+16)+L(x+11,y-16,x+11,y+16);if(nc)q+=L(x-10,y+10,x+10,y-10);q+=T(x,y-29,name,15)+T(x,y+34,nc?'b（通常閉）':'a（通常開）',12);return q}
function coil(x,y,name){return L(x-45,y,x-23,y)+`<circle cx="${x}" cy="${y}" r="23" stroke="#334155" stroke-width="2.5" fill="white"/>`+L(x+23,y,x+45,y)+T(x,y+5,name,14)}
function rails(h){return L(40,42,40,h-25)+L(1020,42,1020,h-25)+T(40,28,'L',17)+T(1020,28,'N',17)}
function hold(y,coilName,startX=60,stop='停止PB',th='THR',pb='起動PB'){
  let a=L(40,y,89,y)+c(120,y,stop,true)+L(151,y,229,y)+c(260,y,th,true)+L(291,y,399,y)+J(400,y)+L(400,y,449,y)+c(480,y,pb)+L(511,y,619,y)+J(620,y)+L(620,y,765,y)+coil(810,y,coilName)+L(855,y,1020,y);
  a+=L(400,y,400,y+108)+L(400,y+108,449,y+108)+c(480,y+108,coilName+'補助')+L(511,y+108,620,y+108)+L(620,y+108,620,y)+J(400,y+108)+J(620,y+108);
  return a;
}
let hs=w('自己保持回路の通常状態。停止b、THR b、起動aとMC補助aの並列、MCコイル',292)+rails(292)+T(530,30,'自己保持：共通停止条件と並列保持',18)+hold(104,'MC')+end;
document.getElementById('v13-hold').innerHTML=hs;
function rev(y,my,other,pb){let a=L(40,y,78,y)+c(109,y,'停止PB',true)+L(140,y,213,y)+c(244,y,'THR',true)+L(275,y,358,y)+c(389,y,other+'補助',true)+L(420,y,497,y)+J(498,y)+L(498,y,539,y)+c(570,y,pb)+L(601,y,699,y)+J(700,y)+L(700,y,826,y)+coil(871,y,my)+L(916,y,1020,y);a+=L(498,y,498,y+108)+L(498,y+108,539,y+108)+c(570,y+108,my+'補助')+L(601,y+108,700,y+108)+L(700,y+108,700,y)+J(498,y+108)+J(700,y+108);return a}
let ir=w('正転逆転2回路。相手側の補助b接点による相互インターロック',492)+rails(492)+T(530,27,'相互インターロック：2回路を個別に検図',18)+rev(103,'MC-F','MC-R','正転PB')+rev(302,'MC-R','MC-F','逆転PB')+end;
document.getElementById('v13-interlock').innerHTML=ir;
let inv=w('P1インバータ改造前後の制御回路。改造前のMC1コイル保持と改造後のR1保持、RUN指令',804)+rails(804)+T(530,27,'改造前：P1直入れ運転コイル',18)+hold(108,'MC1',60,'停止PB','THR1','起動PB1')+T(530,368,'改造後：R1運転許可コイル（正常時閉の許可信号を仮定）',18)+hold(439,'R1',60,'停止PB','許可接点','起動PB1')+L(40,718,145,718)+c(176,718,'R1補助')+L(207,718,320,718)+`<rect x="320" y="686" width="230" height="63" rx="8" stroke="#334155" stroke-width="2.5" fill="#eff6ff"/>`+T(435,714,'INV1 RUN入力',19)+T(435,734,'制御入力（端子番号未指定）',12)+L(550,718,1020,718)+end;
document.getElementById('v13-inverter').innerHTML=inv;
})();