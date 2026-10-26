(()=>{'use strict';
const KEY='denki2_practical_v11_exam_focus';
const store=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch{return {}}};
const persist=v=>{try{localStorage.setItem(KEY,JSON.stringify(v))}catch{}};
const state=store(); if(!state.diagnosis)state.diagnosis={};if(!state.runs)state.runs=[];
const groups=[['symbol','接点・図記号','a/b接点とコイル、無励磁時の状態を説明できる'],['hold','自己保持・インターロック','起動、保持、停止、過負荷の経路を説明できる'],['drawing','展開接続図','共通直列条件と保持並列枝を白紙に描ける'],['inverter','インバータ改造','変更範囲・INVへの運転指令・故障条件を区別できる'],['door','扉正面図','外形、中心、器具位置、寸法線を正しく整理できる'],['review','検図・時間管理','課題条件の照合と時間内の検図ができる']];
const checks=[
 ['A','変更範囲','P1のみの変更とP2維持を一貫して表現できた',15],
 ['B','制御論理','停止・異常・起動・自己保持の条件を追跡できた',20],
 ['C','RUN/故障','INVの運転指令と故障信号を取り違えなかった',15],
 ['D','機器表記','符号・接点状態・端子の仮定を凡例と照合した',15],
 ['E','扉正面図','外形・機器数量・寸法基準・中心線を確認した',20],
 ['F','最終検図','記入漏れ・交差接続・変更範囲を見直した',15]
];
let nowRunning=false,startMs=0,secondsLimit=0,timerHandle=null;
const $=id=>document.getElementById(id);
function main(){const root=$('examFocusV11');if(!root)return;
 root.innerHTML=`<h2>合格最優先｜実技診断・時間制限演習・自己採点</h2>
 <p class="alert">ここは<strong>独自の練習・採点機能</strong>です。公式の試験時間・配点・減点基準ではありません。実技で出題される課題、設備仕様、図記号の詳細は受検年度の公式資料を優先します。</p>
 <div class="v11-summary"><div><b id="v11WeakCount">—</b><small>要重点復習の分野</small></div><div><b id="v11Last">—</b><small>直近の自己採点</small></div><div><b id="v11Count">0</b><small>演習の記録回数</small></div></div>
 <h3>① 実技力診断｜6分野</h3><p>各項目について「できる・練習中・まだ難しい」を選びます。自信ではなく、実際に白紙で再現できるかで判断してください。</p><div id="v11Diagnosis"></div><div class="v11-note" id="v11Recommendation" aria-live="polite"></div>
 <h3>② 時間を区切って作図</h3><p>実際に紙またはCADに描いてください。タイマーは学習用で、途中で離席した際の作図時間までは自動補正しません。</p>
 <div class="v11-controls"><label>演習テーマ <select id="v11Theme"><option value="inverter">インバータ改造・CWD展開接続図</option><option value="door">閉鎖配電盤の扉正面図</option><option value="all">両方の総合演習</option></select></label><label>練習時間 <select id="v11Minutes"><option value="20">20分（部分練習）</option><option value="45">45分（応用練習）</option><option value="90" selected>90分（総合練習）</option><option value="150">150分（長時間練習）</option></select></label></div>
 <div class="v11-controls"><button type="button" id="v11Start">演習開始</button><button type="button" id="v11End" disabled>終了して採点</button><span id="v11Timer" class="v11-timer" role="timer">未開始</span></div>
 <div class="v11-note"><b>作図課題の条件（サイト独自の例）</b><ol><li>ポンプP1・P2のうちP1をインバータ化し、P2の既設回路は維持する。</li><li>停止b・異常条件・起動a・保持a・運転許可リレー・RUN信号の論理を整理し、機種未指定の端子番号は決めつけない。</li><li>扉正面図は練習寸法600×800 mmとし、計器1・表示灯3・押しボタン2を配置する。機器の中心寸法を明示する。</li><li>最後に変更点、接点状態、接続の有無、寸法・機器数量を検図する。</li></ol><p><a href="#complete-models">既存の総合完成見本を見る（描いた後に参照）</a> ｜ <a href="#printSheets">印刷練習用紙へ</a></p></div>
 <h3>③ 自己採点｜100点満点の練習用ルーブリック</h3><p>各項目で「確認できた・一部できた・未達」を選びます。重大な論理ミスがある場合は、点数よりも原因の修正を優先してください。</p><div id="v11Rubric"></div><div class="v11-controls"><button id="v11Score" type="button">今回の自己採点を保存</button><b id="v11ScoreResult" aria-live="polite"></b></div>
 <h3>④ 直近の練習記録と次の学習</h3><div id="v11History"></div><p class="note">採点は自己申告です。正確な作図技能の保証や合格判定ではありません。受検日程・受検資格・試験内容は各都道府県職業能力開発協会の案内で確認してください。</p>`;
 const diag=$('v11Diagnosis');groups.forEach(([id,label,detail])=>{const wrap=document.createElement('fieldset');wrap.className='v11-field';wrap.innerHTML=`<legend>${label}</legend><p>${detail}</p>`;const row=document.createElement('div');row.className='v11-options';[['good','できる'],['some','練習中'],['poor','まだ難しい']].forEach(([val,caption])=>{const l=document.createElement('label');const inp=document.createElement('input');inp.type='radio';inp.name='v11diag-'+id;inp.value=val;inp.checked=state.diagnosis[id]===val;inp.onchange=()=>{state.diagnosis[id]=val;persist(state);refresh()};l.append(inp,document.createTextNode(caption));row.append(l)});wrap.append(row);diag.append(wrap)});
 const rubric=$('v11Rubric');checks.forEach(([id,label,detail,weight])=>{const wrap=document.createElement('fieldset');wrap.className='v11-field';const leg=document.createElement('legend');leg.textContent=`${label}｜${weight}点`;wrap.append(leg);const p=document.createElement('p');p.textContent=detail;wrap.append(p);const row=document.createElement('div');row.className='v11-options';[['1','確認できた'],['0.5','一部できた'],['0','未達']].forEach(([val,caption])=>{const l=document.createElement('label');const inp=document.createElement('input');inp.type='radio';inp.name='v11rubric-'+id;inp.value=val;l.append(inp,document.createTextNode(caption));row.append(l)});wrap.append(row);rubric.append(wrap)});
 $('v11Start').onclick=()=>{if(nowRunning)return;startMs=Date.now();secondsLimit=Number($('v11Minutes').value)*60;nowRunning=true;$('v11Start').disabled=true;$('v11End').disabled=false;tick();timerHandle=setInterval(tick,1000)};
 $('v11End').onclick=stop;
 $('v11Score').onclick=()=>{const vals=checks.map(([id])=>document.querySelector(`input[name="v11rubric-${id}"]:checked`)?.value);if(vals.some(v=>v===undefined)){$('v11ScoreResult').textContent='6項目すべてを採点してください。';return}const total=Math.round(checks.reduce((sum,check,i)=>sum+check[3]*Number(vals[i]),0));const weak=checks.filter((c,i)=>Number(vals[i])<1).map(c=>c[1]);const record={date:new Date().toISOString(),score:total,weak,theme:$('v11Theme').selectedOptions[0].textContent};state.runs.unshift(record);state.runs=state.runs.slice(0,20);persist(state);$('v11ScoreResult').textContent=`自己採点 ${total}/100点を保存しました。`;refresh()};
 refresh();
 if(location.hash==='#examFocusV11') requestAnimationFrame(()=>document.getElementById('examFocusV11')?.scrollIntoView());
}
function tick(){if(!nowRunning)return;const elapsed=Math.floor((Date.now()-startMs)/1000);const left=Math.max(0,secondsLimit-elapsed);$('v11Timer').textContent=`残り ${Math.floor(left/60)}分${String(left%60).padStart(2,'0')}秒`;if(left===0){stop();$('v11Timer').textContent='設定時間終了。自己採点してください。'}}
function stop(){if(!nowRunning)return;nowRunning=false;clearInterval(timerHandle);$('v11Start').disabled=false;$('v11End').disabled=true;$('v11Timer').textContent='演習終了。自己採点してください。'}
function refresh(){let weak=groups.filter(g=>state.diagnosis[g[0]]!=='good');$('v11WeakCount').textContent=weak.length;$('v11Count').textContent=state.runs.length;$('v11Last').textContent=state.runs.length?state.runs[0].score+'点':'未採点';const p=$('v11Recommendation');if(!weak.length)p.textContent='全分野の基礎は確認済み。白紙作図と総合検図を繰り返しましょう。';else{const sorted=[...weak].sort((a,b)=>(state.diagnosis[a[0]]==='poor'?-1:0)-(state.diagnosis[b[0]]==='poor'?-1:0));p.textContent='次に重点復習：'+sorted.slice(0,3).map(g=>g[1]).join(' → ')+'。該当する週の教材を復習後、再診断しましょう。'}$('v11History').replaceChildren();if(!state.runs.length){$('v11History').textContent='まだ採点記録はありません。演習後に自己採点を保存してください。';return}const table=document.createElement('table');table.className='v11-table';table.innerHTML='<thead><tr><th>日時</th><th>テーマ</th><th>自己採点</th><th>復習優先</th></tr></thead>';const tb=document.createElement('tbody');state.runs.slice(0,8).forEach(r=>{const tr=document.createElement('tr');[new Date(r.date).toLocaleString('ja-JP'),r.theme,r.score+'点',r.weak.length?r.weak.join('、'):'なし'].forEach(v=>{const td=document.createElement('td');td.textContent=v;tr.append(td)});tb.append(tr)});table.append(tb);$('v11History').append(table)}
main();
})();
