/* practical-study.js | Stage 14 bundled in the original execution order. */

/* ===== BEGIN practical-weeks.js ===== */
(()=>{'use strict';
const key='denki2_practical_weeks_v1', mistakesKey='denki2_practical_errors_v1';let state={};try{state=JSON.parse(localStorage.getItem(key)||'{}')||{}}catch(e){}function save(){try{localStorage.setItem(key,JSON.stringify(state))}catch(e){}}function progress(){let n=0;document.querySelectorAll('[data-week]').forEach(c=>{if(c.checked)n++});document.getElementById('weeklyProgress').textContent='週別進捗 '+n+' / 4 （'+Math.round(n*25)+'%）';document.getElementById('weeklyBar').style.width=n*25+'%';document.getElementById('weeklyBarBox').setAttribute('aria-valuenow',String(n*25))}document.querySelectorAll('[data-week]').forEach(c=>{c.checked=!!state[c.dataset.week];c.addEventListener('change',()=>{state[c.dataset.week]=c.checked;save();progress()})});progress();
const stages=['第1段階／条件表：P1・P2の運転条件、停止条件、異常条件と機器符号を一覧表に書き出す。','第2段階／改造前：P1の停止b・THR1 b・起動a・MC1補助a・MC1コイルをたどり、直列・並列を確認する。','第3段階／主回路：P1にINV1とM1の関係を示し、P2の回路は変更しない。保護器は課題の指定に合わせる。','第4段階／制御回路：停止条件・異常条件とRUN指令を区別し、運転許可の保持を模式回路で構成する。','第5段階／仕上げ：INVの制御入出力と故障信号の名称・端子を仕様で照合し、接点の通常状態と交差接続点を検図する。'];let step=0;function renderStep(){document.getElementById('drawStepText').textContent=stages[step]+' （'+(step+1)+' / '+stages.length+'）';document.getElementById('drawPrev').disabled=step===0;document.getElementById('drawNext').disabled=step===stages.length-1}document.getElementById('drawPrev').onclick=()=>{step--;renderStep()};document.getElementById('drawNext').onclick=()=>{step++;renderStep()};renderStep();
const drawings=[['改造前のP1回路','停止b・THR1 b・起動a・MC1補助aとMC1コイルの関係を白紙に描く。','停止bとTHR1 bを直列に置く。起動aとMC1補助aを並列にし、その合流後にMC1コイルを接続。保持用a接点を直列にしてしまわない。'],['改造後P1の主回路比較','P1だけにINVを追加した主回路概念図を描き、P2を変更しない。','電源・保護器からP1はINV1→M1、P2は既設のMC2・THR2→M2を示す。製品依存の端子・保護は概念図から断定しない。'],['改造後のRUN指令','停止b・異常b・起動a・運転許可R補助aを使って保持論理を描く。','停止b、正常時に閉じると仮定した異常bを直列配置。起動aとR補助aを並列にしてRコイルへ。Rの運転信号はINVのRUN入力への概念上の信号とする。'],['改造前後の差分検図','図面2組を比較し、変更点を少なくとも5つ記述する。','P1の主回路、運転指令先、異常信号、接点の状態、保護条件・端子照合を確認。P2が変更されていないかも明記する。']];
const draw=document.getElementById('drawingExercises');drawings.forEach((d,i)=>{const a=document.createElement('article');a.className='exercise';const h=document.createElement('h3');h.textContent='作図'+(i+1)+'｜'+d[0];const p=document.createElement('p');p.textContent=d[1];const details=document.createElement('details');const sum=document.createElement('summary');sum.textContent='参考解答を表示・非表示';const answer=document.createElement('p');answer.textContent=d[2];details.append(sum,answer);a.append(h,p,details);draw.append(a)});
const checks=[['停止ボタンの接点をa接点として描いた。どこが誤り？',['停止ボタンは通常閉b接点で、押すと開く','起動a接点と全く同じでよい','MCコイルを省く'],0,'停止用の共通直列経路にa接点を置くと通常時に経路が開き、想定の停止論理と合いません。'],['改造後もMC1コイルだけに運転指令を送った。問題は？',['P2の電流が増える','INVのRUN指令経路が示されない','図面の中心線が不足'],1,'INV制御入力へのRUN指令と、MCによる主回路開閉を混同しないこと。'],['異常出力の接点を仕様未確認のまま「正常時閉」と決めた。問題は？',['仕様により論理・端子が違う','全てのインバータで同じ','配線色だけが問題'],0,'異常出力には機種設定や端子仕様の差があるため、図面凡例と仕様書で確認します。'],['P2の既設回路を理由なく書き換えた。何を確認？',['全てP1に接続する','両方のポンプを同じ配線にする','P2は既設維持という条件に戻す'],2,'「2台のうち1台を改造」の想定では、P2に不要な差分を作らないことが大切です。'],['自己保持a接点を起動aの直列に追加した。どこが誤り？',['並列にすべき','過負荷bを除去すべき','INV出力を直接短絡すべき'],0,'自己保持a接点は起動a接点と並列。直列だと起動直後にコイルを励磁できません。']];
let status={};try{status=JSON.parse(localStorage.getItem(mistakesKey)||'{}')||{}}catch(e){}const area=document.getElementById('errorExercises');function drawErrors(onlyWrong){area.replaceChildren();let ids=checks.map((_,i)=>i);if(onlyWrong){ids=ids.filter(i=>status[i]!==true);if(!ids.length){area.textContent='現在、未正解の問題はありません。全問題表示に戻して復習できます。';return}}ids.forEach(i=>{const q=checks[i],a=document.createElement('article');a.className='exercise';const h=document.createElement('h3');h.textContent='検図'+(i+1)+'｜'+q[0];a.append(h);const feedback=document.createElement('p');feedback.className='explain-result';feedback.setAttribute('aria-live','polite');q[1].forEach((c,j)=>{const b=document.createElement('button');b.type='button';b.textContent=(j+1)+'．'+c;b.onclick=()=>{const ok=j===q[2];status[i]=ok;try{localStorage.setItem(mistakesKey,JSON.stringify(status))}catch(e){}feedback.textContent=(ok?'正解。':'再確認しましょう。')+q[3]};a.append(b)});a.append(feedback);area.append(a)})}document.getElementById('reviewErrors').onclick=()=>drawErrors(true);document.getElementById('showAllErrors').onclick=()=>drawErrors(false);drawErrors(false);
})();
;
/* ===== END practical-weeks.js ===== */

/* ===== BEGIN practical-upgrade-v6.js ===== */
(()=>{'use strict';
const KEY='denki2_practical_v6_exercises',FINAL='denki2_practical_v6_final';
function read(k){try{return JSON.parse(localStorage.getItem(k)||'{}')||{}}catch{return {}}}
function write(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch{}}
const answers=read(KEY);
const trace=[
['停止b(閉)と起動a(開)を直列にすると、無操作時は通電する？','しない','する','起動aが開いているため直列経路が切れている。'],
['停止b(閉)と起動a(押下中は閉)を直列にすると？','通電する','通電しない','どちらも閉じていれば通電経路が成立する。'],
['停止bを押して開いたとき、自己保持中のMCコイルは？','消磁する','励磁したまま','停止bは共通直列経路を開くためコイルは消磁する。'],
['MCが消磁中の補助a接点の状態は？','開','閉','補助a接点はコイル無励磁時に開。'],
['MCが励磁中の補助a接点の状態は？','閉','開','補助a接点はコイル励磁で閉じる。'],
['THRの正常時閉じるb接点が過負荷で開いた場合は？','運転許可を遮断','コイルを強制励磁','例示した保護回路では直列のb接点が開きコイルを消磁する。'],
['起動aとMC補助aを並列に置いたとき、MC励磁中に起動ボタンを離すと？','保持される','必ず停止','補助aが閉じ、停止条件が満たされれば保持経路が残る。'],
['正転MC-Fが励磁したとき、逆転回路側のMC-F補助bは？','開','閉','相手コイルの励磁により補助bが開き、逆転経路を遮断する。'],
['停止bとTHR bが閉、起動aと保持aの両方が開なら？','コイル非通電','コイル通電','並列分岐の両方が開なので経路がない。'],
['直列にある接点が3個閉、1個開のとき？','経路不成立','経路成立','直列はどれか1つでも開くと導通しない。']
];
const wiring=[
['停止ボタンを通常開a接点で描いた','停止bを共通直列経路へ','起動ボタンと並列にする','通常停止ボタンはb接点を利用する練習条件。'],
['自己保持補助aを起動aの直列へ配置','起動aと並列にする','THRと並列にする','自己保持は起動aと同名補助aの並列分岐。'],
['正転回路に正転自身の補助bを直列挿入し相手の補助bを省略','相手である逆転側補助bを入れる','インターロックを省く','相手コイルが励磁している時に自回路を阻止する。'],
['過負荷b接点を起動aだけの分岐に配置して保持経路は通過しない','共通直列部へ入れる','保持aを除去する','保持中も過負荷で停止できるよう共通経路に置く練習。'],
['図面交差部を全部接続点として黒丸を付けた','接続あり・なしを区別する','全交差点を短絡する','交差と接続は別。図面の接続表記規則に合わせて検図する。']
];
const doors=[
['機器の中心寸法を外形の端ではなく別の曖昧な点から記入した','基準を統一して寸法を記入','寸法を全部削除','中心位置の基準を明示して寸法の重複や矛盾を防ぐ。'],
['扉外形の指定が幅600×高さ800なのに幅800×高さ600で描いた','幅600×高さ800に修正','そのままでよい','外形の方向と寸法条件を確認する。'],
['計器が1個指定なのに2個描いた','指定数量と照合','2個に増やす','設置機器の個数は課題条件を優先する。'],
['中心線を太い実線で描き、外形線と区別できない','線種を区別する','すべて同じ太さにする','中心線や寸法線の線種は図面の規定に合わせて描き分ける。'],
['寸法補助線が寸法線まで届かず対応点が不明','対応点が分かるよう整える','寸法を口頭で説明するだけ','寸法補助線・矢印・寸法数値の対応を検図する。']
];
function makeQuiz(id,items,group){const root=document.getElementById(id);if(!root)return;const show=(review=false)=>{root.replaceChildren();items.forEach((q,i)=>{const token=group+'-'+i;if(review&&answers[token]===true)return;const article=document.createElement('article');article.className='question-card';const fs=document.createElement('fieldset');const legend=document.createElement('legend');legend.textContent=(i+1)+'問｜'+q[0];fs.append(legend);const response=document.createElement('p');response.className='result';response.setAttribute('aria-live','polite');response.textContent=answers[token]===true?'前回正解済み。何度でも再挑戦できます。':'選択後に解説が出ます。';[q[1],q[2]].forEach((option,j)=>{const label=document.createElement('label');const input=document.createElement('input');input.type='radio';input.name=token;input.value=String(j);input.addEventListener('change',()=>{const ok=j===0;answers[token]=ok;write(KEY,answers);response.textContent=(ok?'正解。':'不正解。正解：'+q[1]+'。')+q[3];response.className='result '+(ok?'correctlight':'warninglight');scores()});label.append(input,document.createTextNode(option));fs.append(label)});article.append(fs,response);root.append(article)});if(!root.children.length)root.textContent='未正解の問題はありません。全問表示で繰り返し練習できます。'};root.showQuiz=show;show()}
makeQuiz('traceQuestions',trace,'trace');makeQuiz('wiringQuestions',wiring,'wire');makeQuiz('doorErrorQuestions',doors,'door');
function scores(){const a=[...Array(10)].filter((_,i)=>answers['trace-'+i]===true).length;const b=[...Array(5)].filter((_,i)=>answers['wire-'+i]===true).length;const c=[...Array(5)].filter((_,i)=>answers['door-'+i]===true).length;document.getElementById('firstWeekScore').textContent='第1週 正解済み：接点追跡 '+a+'/10、誤配線 '+b+'/5';document.getElementById('doorScore').textContent='第4週 検図 正解済み：'+c+'/5'}scores();
document.getElementById('firstWeekReview').onclick=()=>{document.getElementById('traceQuestions').showQuiz(true);document.getElementById('wiringQuestions').showQuiz(true)};
document.getElementById('firstWeekAll').onclick=()=>{document.getElementById('traceQuestions').showQuiz();document.getElementById('wiringQuestions').showQuiz()};
// Educational logical-state models. A button press is one discrete event.
let mc=false,trip=false;
function selfRender(msg){const on=mc?'●励磁中':'○消磁中';document.getElementById('selfCircuit').textContent='L ──[停止 b:閉]──[THR b:'+(trip?'開':'閉')+']──┬──[起動 a:通常開]──┬──( MC '+on+' )── N\n                              └──[MC 補助a:'+(mc?'閉':'開')+']─────┘\n保持経路：'+(mc&&!trip?'導通':'遮断');document.getElementById('selfStatus').textContent=msg+' 現在：MC '+(mc?'運転保持（励磁）':'停止（消磁）')+'。'}
const selfStart=document.getElementById('selfStart');selfStart.onclick=()=>{if(!trip){mc=true;selfRender('起動aを押して瞬時に閉じ、その後離しました。MC補助aによる保持が成立します。')}else selfRender('過負荷bが開いているため起動できません。')};
document.getElementById('selfStop').onclick=()=>{mc=false;selfRender('停止bを押して開き、MCは消磁しました。ボタンは離して閉に戻りました。')};document.getElementById('selfTrip').onclick=()=>{trip=true;mc=false;selfRender('過負荷でTHR bが開きました。')};document.getElementById('selfReset').onclick=()=>{trip=false;mc=false;selfRender('異常を解除して初期状態へ戻しました。')};selfRender('初期状態。');
let dir='停止';function interRender(msg){document.getElementById('interCircuit').textContent='正転：L ──[停止b]──[R補助b:'+(dir==='逆転'?'開':'閉')+']──[起動F a ∥ F保持a]──(F:'+ (dir==='正転'?'ON':'OFF')+')──N\n逆転：L ──[停止b]──[F補助b:'+(dir==='正転'?'開':'閉')+']──[起動R a ∥ R保持a]──(R:'+(dir==='逆転'?'ON':'OFF')+')──N';document.getElementById('interStatus').textContent=msg+' 現在：'+dir+'。'+(dir==='正転'?'逆転側はF補助bで遮断。':dir==='逆転'?'正転側はR補助bで遮断。':'両コイル消磁、両補助bは閉。')}
document.getElementById('forwardStart').onclick=()=>{if(dir==='逆転')interRender('逆転中はR補助bが開いているため正転できません。停止後に再操作してください。');else{dir='正転';interRender('正転起動してFが自己保持します。')}};
document.getElementById('reverseStart').onclick=()=>{if(dir==='正転')interRender('正転中はF補助bが開いているため逆転できません。停止後に再操作してください。');else{dir='逆転';interRender('逆転起動してRが自己保持します。')}};
document.getElementById('directionStop').onclick=()=>{dir='停止';interRender('共通停止を押しました。')};document.getElementById('directionReset').onclick=()=>{dir='停止';interRender('初期化しました。')};interRender('初期状態。');
const finalItems=['改造前のP1・P2を描き、機器符号を照合した','P1のみインバータを追加しP2を維持した','停止b・起動a・保持a・異常条件を区別した','RUN指令と主回路の相違点を5つ記録した','扉正面図の外形・中心線・機器数・寸法を検図した','変更前後と安全上の注意書きを記入した'];const done=read(FINAL);const fc=document.getElementById('finalChecks');function finalRender(){let n=0;finalItems.forEach((_,i)=>{if(done[i])n++});document.getElementById('finalProgress').textContent='総合課題セルフチェック：'+n+'/'+finalItems.length+'（'+Math.round(n*100/finalItems.length)+'%）'}finalItems.forEach((t,i)=>{const l=document.createElement('label');const c=document.createElement('input');c.type='checkbox';c.checked=!!done[i];c.addEventListener('change',()=>{done[i]=c.checked;write(FINAL,done);finalRender()});l.append(c,document.createTextNode(' '+t));fc.append(l)});finalRender();
document.getElementById('printPractice').onclick=()=>{document.body.classList.add('print-worksheets');window.print()};window.addEventListener('afterprint',()=>document.body.classList.remove('print-worksheets'));
})();

;
/* ===== END practical-upgrade-v6.js ===== */

/* ===== BEGIN practical-upgrade-v7.js ===== */
(()=>{'use strict';
function insertHTML(targetId, position, html){const el=document.getElementById(targetId); if(el) el.insertAdjacentHTML(position, html)}
const nav=document.querySelector('header nav');
if(nav && !nav.querySelector('a[href="#door-detailed"]')){
  const a=document.createElement('a'); a.className='btn'; a.href='#door-detailed'; a.textContent='扉正面図の見本'; nav.appendChild(a);
}
insertHTML('week4','beforebegin',`
<section class="card" id="modeldrawings">
  <h2>第3週強化｜詳細作図見本（CWD方式・インバータ改造）</h2>
  <p class="alert"><b>独自教材：</b>以下の図面見本は、技能検定2級の学習を助けるために簡略化した参考例です。正式課題や模範解答ではありません。変更前後の関係を読み取り、白紙に描き起こす練習に使ってください。</p>
  <p>ポイントは、<b>どこを変更し、どこを残すか</b>を図面上で言えることです。P1のみインバータ化し、P2は既設の直入れ運転を維持する流れを追います。</p>
  <div class="modeltabs" role="tablist" aria-label="第3週の詳細作図見本">
    <button type="button" class="active" data-tab-group="cwd" data-tab-target="cwd-before" aria-selected="true">STEP1 改造前</button>
    <button type="button" data-tab-group="cwd" data-tab-target="cwd-after">STEP2 改造後の主回路</button>
    <button type="button" data-tab-group="cwd" data-tab-target="cwd-control">STEP3 制御回路見本</button>
    <button type="button" data-tab-group="cwd" data-tab-target="cwd-check">STEP4 変更点まとめ</button>
  </div>
  <div id="cwd-before" class="model-panel active" role="tabpanel">
    <div class="model-grid">
      <div class="model-figure">
        <svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="改造前のポンプ2台の主回路見本図">
          <g fill="none" stroke="#334155" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M70 40 V255 M120 40 V255 M170 40 V255"/>
            <path d="M170 105 H315 M170 195 H315"/>
            <rect x="315" y="78" width="105" height="54" rx="8"/>
            <rect x="442" y="78" width="105" height="54" rx="8"/>
            <rect x="570" y="78" width="105" height="54" rx="8"/>
            <circle cx="735" cy="105" r="33"/>
            <rect x="315" y="168" width="105" height="54" rx="8"/>
            <rect x="442" y="168" width="105" height="54" rx="8"/>
            <rect x="570" y="168" width="105" height="54" rx="8"/>
            <circle cx="735" cy="195" r="33"/>
            <path d="M420 105 H442 M547 105 H570 M675 105 H702"/>
            <path d="M420 195 H442 M547 195 H570 M675 195 H702"/>
          </g>
          <g font-size="17" font-weight="700" fill="#0f172a" text-anchor="middle">
            <text x="120" y="28">三相電源</text>
            <text x="367" y="110">MCCB</text><text x="494" y="110">MC1</text><text x="622" y="110">THR1</text><text x="735" y="110">M1</text>
            <text x="367" y="200">MCCB</text><text x="494" y="200">MC2</text><text x="622" y="200">THR2</text><text x="735" y="200">M2</text>
          </g>
          <g font-size="14" fill="#475569">
            <text x="52" y="62">R</text><text x="102" y="62">S</text><text x="152" y="62">T</text>
            <text x="250" y="96">P1系統</text><text x="250" y="186">P2系統</text>
          </g>
        </svg>
        <p class="model-figure-caption">改造前：P1・P2とも接触器と過負荷継電器を通る直入れ運転の学習用模式図。</p>
      </div>
      <div class="model-note">
        <h3>この段階で読むこと</h3>
        <ul>
          <li>主回路は <b>電源 → 保護器 → 開閉器/接触器 → 保護 → 電動機</b> の順を追います。</li>
          <li>P1とP2は枝分かれした別系統です。片方を改造しても、もう片方を不用意に描き替えないことが重要です。</li>
          <li>機器符号を決めたら、主回路図・制御回路図・端子記号で同じ意味に揃えます。</li>
        </ul>
        <p class="tagline">見本の読み方：P1の主回路が後でどう変わるかを先に把握してから制御回路へ進みます。</p>
      </div>
    </div>
  </div>
  <div id="cwd-after" class="model-panel" role="tabpanel">
    <div class="model-grid">
      <div class="model-figure">
        <svg viewBox="0 0 840 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="P1にインバータを追加した改造後の主回路見本図">
          <g fill="none" stroke="#334155" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M70 50 V275 M120 50 V275 M170 50 V275"/>
            <path d="M170 110 H315 M170 210 H315"/>
            <rect x="315" y="83" width="105" height="54" rx="8"/>
            <rect x="448" y="73" width="125" height="74" rx="8"/>
            <circle cx="735" cy="110" r="33"/>
            <rect x="315" y="183" width="105" height="54" rx="8"/>
            <rect x="448" y="183" width="105" height="54" rx="8"/>
            <rect x="581" y="183" width="105" height="54" rx="8"/>
            <circle cx="735" cy="210" r="33"/>
            <path d="M420 110 H448 M573 110 H702"/>
            <path d="M420 210 H448 M553 210 H581 M686 210 H702"/>
          </g>
          <g font-size="17" font-weight="700" fill="#0f172a" text-anchor="middle">
            <text x="120" y="34">三相電源</text>
            <text x="367" y="115">MCCB</text><text x="510" y="104">INV1</text><text x="510" y="124">（可変速）</text><text x="735" y="115">M1</text>
            <text x="367" y="215">MCCB</text><text x="500" y="215">MC2</text><text x="633" y="215">THR2</text><text x="735" y="215">M2</text>
          </g>
          <g font-size="14" fill="#2563eb" font-weight="700">
            <text x="455" y="55">← P1系統の変更点</text>
          </g>
        </svg>
        <p class="model-figure-caption">改造後：P1のみインバータ経由に変更し、P2は既設の直入れ系統を維持。</p>
      </div>
      <div class="model-note">
        <h3>改造後に確認すること</h3>
        <ul>
          <li>P1の主回路は <b>保護器 → INV → M1</b> へ変わります。</li>
          <li>P2は既設回路のまま残し、比較対象として描き分けます。</li>
          <li>インバータ故障出力や運転指令は、主回路ではなく制御回路側で表すのが学習のポイントです。</li>
        </ul>
        <table class="minitable">
          <tr><th>残すもの</th><th>変更するもの</th></tr>
          <tr><td>P2系統、電源側保護、図面全体の符号ルール</td><td>P1主回路、P1の運転指令、異常関連の制御表示</td></tr>
        </table>
      </div>
    </div>
  </div>
  <div id="cwd-control" class="model-panel" role="tabpanel">
    <div class="model-grid">
      <div>
        <pre class="ladder">L ──|/|──|/|──┬──| |──┬──( R )── N
    停止  INV異常b │ 起動  │
                  └──| |──┘
                    R補助a

L ──| |────────────────────( RUN )── N
    R補助a                  INV入力へ

L ──| |────────────────────( 故障表示 )── N
    INV故障a</pre>
        <p class="tagline">制御回路の見本：Rは運転許可の中間継電器の例。実際の入力論理や接点の極性は、機種仕様と課題条件を優先します。</p>
      </div>
      <div class="model-note">
        <h3>段階別に描く順番</h3>
        <ol>
          <li>左右の母線（L/N）を描く。</li>
          <li>共通停止条件（停止b、異常b）を直列に置く。</li>
          <li>起動aとR補助aを並列に置き、保持経路を作る。</li>
          <li>Rコイルを書き、その先でRUN指令・故障表示など枝回路を追加する。</li>
        </ol>
        <div class="answerbox">
          <b>よくある誤り</b>
          <ul>
            <li>RUN指令を主回路側に書いてしまう。</li>
            <li>異常接点を保持枝の一部にしか入れず、保持中に停止できない。</li>
            <li>起動aとR補助aを直列に描いてしまい、自己保持にならない。</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div id="cwd-check" class="model-panel" role="tabpanel">
    <h3>変更点の比較表</h3>
    <table class="compare-table">
      <tr><th>比較項目</th><th>改造前</th><th>改造後</th><th>検図の着眼点</th></tr>
      <tr><td>P1主回路</td><td>MC1 → THR1 → M1</td><td>INV1 → M1</td><td>変更対象がP1のみになっているか</td></tr>
      <tr><td>P1制御の終点</td><td>MC1コイル</td><td>RUN指令 / 運転許可R</td><td>制御対象を描き分けているか</td></tr>
      <tr><td>異常時の扱い</td><td>THR1 bで停止</td><td>INV故障・異常bで停止</td><td>正常時閉・異常時開の考え方を確認</td></tr>
      <tr><td>P2系統</td><td>既設直入れ</td><td>既設直入れ</td><td>不要な変更をしていないか</td></tr>
    </table>
    <div class="modelexercise">
      <h4>自分で描く練習 1</h4>
      <p>白紙に「改造後のP1主回路」と「P2既設回路」を並べて描いてください。描き終わったら参考解答を開きます。</p>
      <button type="button" class="toggle-answer" data-target="modelAnswerA">解答表示</button>
      <div id="modelAnswerA" class="answerbox" hidden>
        <p><b>参考解答の要点：</b>P1は <b>MCCB → INV1 → M1</b>、P2は <b>MCCB → MC2 → THR2 → M2</b>。P1・P2が並列の別系統であることを保ち、P2の既設回路を残します。</p>
        <ul><li>インバータはP1の枝の中に入れる。</li><li>THR2はP2側に残す。</li><li>P1とP2の機器符号を混在させない。</li></ul>
      </div>
    </div>
    <div class="modelexercise">
      <h4>自分で描く練習 2</h4>
      <p>白紙に、停止b・異常b・起動a・R補助a・Rコイル・RUN指令からなる簡略制御回路を描いてください。</p>
      <button type="button" class="toggle-answer" data-target="modelAnswerB">解答表示</button>
      <div id="modelAnswerB" class="answerbox" hidden>
        <pre class="ladder">L ──|/|──|/|──┬──| |──┬──( R )── N
    停止  異常b   │ 起動  │
                  └──| |──┘
                    R補助a

R補助a ───────────── RUN指令</pre>
        <p>停止条件を<b>共通直列</b>に置くこと、起動aと保持aを<b>並列</b>に置くことがポイントです。</p>
      </div>
    </div>
  </div>
</section>`);

insertHTML('door-errors','beforebegin',`
<section class="card" id="door-detailed">
  <h2>第4週強化｜扉正面図の詳細作図見本</h2>
  <p>扉正面図は、<b>外形と基準を先に決める</b>ことが重要です。下の見本では、同じ題材を「外形→機器配置→寸法記入」の3段階に分けて示します。</p>
  <div class="modeltabs" role="tablist" aria-label="扉正面図の詳細見本">
    <button type="button" class="active" data-tab-group="door" data-tab-target="door-step1" aria-selected="true">STEP1 外形と中心線</button>
    <button type="button" data-tab-group="door" data-tab-target="door-step2">STEP2 機器配置</button>
    <button type="button" data-tab-group="door" data-tab-target="door-step3">STEP3 寸法記入</button>
  </div>
  <div id="door-step1" class="model-panel active" role="tabpanel">
    <div class="model-grid">
      <div class="model-figure">
        <svg viewBox="0 0 760 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="扉正面図の第1段階：外形と中心線">
          <g fill="none" stroke="#334155" stroke-width="3">
            <rect x="210" y="40" width="320" height="340" rx="4"/>
            <path d="M370 25 V396" stroke="#94a3b8" stroke-dasharray="9 7"/>
            <path d="M190 210 H550" stroke="#94a3b8" stroke-dasharray="9 7"/>
          </g>
          <g fill="#0f172a" font-size="16" font-weight="700" text-anchor="middle">
            <text x="370" y="424">幅 600（例）</text>
            <text x="160" y="215" transform="rotate(-90 160 215)">高さ 800（例）</text>
          </g>
          <g fill="#475569" font-size="14">
            <text x="548" y="38">中心線</text>
            <text x="548" y="206">基準横線</text>
            <text x="206" y="28">まず外形と基準線を描く</text>
          </g>
          <g fill="none" stroke="#64748b" stroke-width="1.6">
            <path d="M210 394 V413 M530 394 V413 M210 404 H530"/>
            <path d="M192 40 H170 M192 380 H170 M181 40 V380"/>
          </g>
        </svg>
      </div>
      <div class="model-note">
        <h3>段階1の着眼点</h3>
        <ul>
          <li>用紙の向きと尺度を確認します。</li>
          <li>外形寸法を書き始める前に、中心線・基準線で配置の基礎を作ります。</li>
          <li>この段階では、まだ機器の種類や数量を書き込みすぎません。</li>
        </ul>
      </div>
    </div>
  </div>
  <div id="door-step2" class="model-panel" role="tabpanel">
    <div class="model-grid">
      <div class="model-figure">
        <svg viewBox="0 0 760 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="扉正面図の第2段階：機器配置">
          <g fill="none" stroke="#334155" stroke-width="3">
            <rect x="210" y="40" width="320" height="340" rx="4"/>
            <path d="M370 25 V396" stroke="#94a3b8" stroke-dasharray="9 7"/>
            <rect x="312" y="74" width="116" height="62"/>
            <circle cx="278" cy="188" r="18"/>
            <circle cx="370" cy="188" r="18"/>
            <circle cx="462" cy="188" r="18"/>
            <circle cx="322" cy="288" r="24"/>
            <circle cx="418" cy="288" r="24"/>
          </g>
          <g fill="#0f172a" font-size="16" font-weight="700" text-anchor="middle">
            <text x="370" y="110">計器</text>
            <text x="278" y="223">電源</text><text x="370" y="223">運転</text><text x="462" y="223">異常</text>
            <text x="322" y="332">起動</text><text x="418" y="332">停止</text>
          </g>
          <g fill="#475569" font-size="14">
            <text x="554" y="80">表示器類は上段</text>
            <text x="554" y="190">表示灯は横一列</text>
            <text x="554" y="290">操作器は下段</text>
          </g>
        </svg>
      </div>
      <div class="model-note">
        <h3>段階2の着眼点</h3>
        <ul>
          <li>中心線から左右のバランスを取り、上段・中段・下段の役割を整理します。</li>
          <li>機器の個数が課題条件と一致しているか必ず確認します。</li>
          <li>丸形器具の中心位置は、外形端ではなく中心寸法で管理します。</li>
        </ul>
      </div>
    </div>
  </div>
  <div id="door-step3" class="model-panel" role="tabpanel">
    <div class="model-grid">
      <div class="model-figure">
        <svg viewBox="0 0 780 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="扉正面図の第3段階：寸法記入まで行った見本">
          <g fill="none" stroke="#334155" stroke-width="3">
            <rect x="210" y="40" width="320" height="340" rx="4"/>
            <path d="M370 25 V396" stroke="#94a3b8" stroke-dasharray="9 7"/>
            <rect x="312" y="74" width="116" height="62"/>
            <circle cx="278" cy="188" r="18"/>
            <circle cx="370" cy="188" r="18"/>
            <circle cx="462" cy="188" r="18"/>
            <circle cx="322" cy="288" r="24"/>
            <circle cx="418" cy="288" r="24"/>
          </g>
          <g fill="none" stroke="#64748b" stroke-width="1.6">
            <path d="M210 404 V425 M530 404 V425 M210 414 H530"/>
            <path d="M192 40 H164 M192 380 H164 M178 40 V380"/>
            <path d="M278 188 V156 M462 188 V156 M278 166 H462"/>
            <path d="M322 288 V352 M418 288 V352 M322 342 H418"/>
          </g>
          <g fill="#0f172a" font-size="15" font-weight="700" text-anchor="middle">
            <text x="370" y="440">600</text>
            <text x="146" y="210" transform="rotate(-90 146 210)">800</text>
            <text x="370" y="160">表示灯列の中心間隔 184</text>
            <text x="370" y="362">押しボタン中心間隔 96</text>
          </g>
          <g fill="#475569" font-size="13">
            <text x="550" y="70">※寸法値は独自教材の例</text>
            <text x="550" y="90">実際は課題の指定値を優先</text>
          </g>
        </svg>
      </div>
      <div class="model-note">
        <h3>段階3の着眼点</h3>
        <ul>
          <li>寸法線・寸法補助線・外形線・中心線の線種を混同しないこと。</li>
          <li>寸法は「何の位置を示しているか」が分かるよう、基準を統一します。</li>
          <li>数値は例示であり、課題指定の外形・取付条件へ置き換えて練習します。</li>
        </ul>
        <button type="button" class="toggle-answer" data-target="doorAnswer">解答の見方を表示</button>
        <div id="doorAnswer" class="answerbox" hidden>
          <p><b>模範的な検図順：</b>①外形 ②基準線 ③機器数 ④配置バランス ⑤寸法補助線 ⑥寸法値 ⑦記入漏れ、の順に見直します。</p>
          <table class="minitable">
            <tr><th>確認項目</th><th>見直しポイント</th></tr>
            <tr><td>外形</td><td>幅・高さ、縦横の向き、用紙の余白</td></tr>
            <tr><td>配置</td><td>計器・表示灯・操作器の段分け、左右バランス</td></tr>
            <tr><td>寸法</td><td>基準位置、中心寸法、重複・矛盾の有無</td></tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</section>`);

function setupTabs(group){
  const buttons=[...document.querySelectorAll(`[data-tab-group="${group}"]`)];
  buttons.forEach(btn=>btn.addEventListener('click',()=>{
    buttons.forEach(b=>{b.classList.toggle('active',b===btn); b.setAttribute('aria-selected',b===btn?'true':'false')});
    document.querySelectorAll(`.model-panel`).forEach(panel=>{
      if(panel.id===btn.dataset.tabTarget) panel.classList.add('active');
      else if(buttons.some(b=>b.dataset.tabTarget===panel.id)) panel.classList.remove('active');
    });
  }));
}
setupTabs('cwd'); setupTabs('door');

document.querySelectorAll('.toggle-answer').forEach(btn=>btn.addEventListener('click',()=>{
  const target=document.getElementById(btn.dataset.target); if(!target) return;
  const open=target.hasAttribute('hidden');
  if(open){target.removeAttribute('hidden'); btn.textContent='解答を隠す';}
  else {target.setAttribute('hidden',''); btn.textContent='解答表示';}
}));
})();

;
/* ===== END practical-upgrade-v7.js ===== */

/* ===== BEGIN practical-upgrade-v8.js ===== */
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

;
/* ===== END practical-upgrade-v8.js ===== */

/* ===== BEGIN practical-upgrade-v9.js ===== */
(()=>{'use strict';
const KEY='denki2_practical_v9_pro';
function read(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch{return {}}}
function write(v){try{localStorage.setItem(KEY,JSON.stringify(v))}catch{}}
const state=read();
const html=`
<section class="card" id="pro-models">
  <h2>仕上げ強化｜本格作図見本</h2>
  <p class="alert"><b>独自作成の学習用見本です。</b> 公式模範解答ではありません。図面の見方・描き方・検図順を学ぶために、機器符号、接点番号、端子・信号の整理を加えた参考例として掲載します。</p>
  <div class="v9-wrap">
    <div class="v9-tabs" role="tablist" aria-label="本格作図見本の切替">
      <button type="button" class="active" data-v9tab="scheme">制御回路見本</button>
      <button type="button" data-v9tab="parts">機器・端子整理表</button>
      <button type="button" data-v9tab="final">総合課題の参考見本</button>
    </div>
    <div class="v9-panel active" data-v9panel="scheme">
      <div class="v9-grid">
        <div class="v9-figure">
          <svg viewBox="0 0 1100 540" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="制御回路見本。Lから停止b、インバータ異常bを直列に通し、起動aとR1補助aを並列に接続してR1コイルを励磁する。下段はR1補助aでRUN出力Y1を制御する。">
            <g font-family="sans-serif" fill="#17253b">
              <text x="55" y="48" text-anchor="middle" font-size="23" font-weight="700">L</text>
              <text x="1045" y="48" text-anchor="middle" font-size="23" font-weight="700">N</text>
              <text x="80" y="87" font-size="16" font-weight="700">① 運転許可・自己保持</text>
              <text x="80" y="355" font-size="16" font-weight="700">② RUN出力</text>
            </g>
            <g stroke="#334155" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="M55 64 V481 M1045 64 V481"/>
              <!-- 第1段：停止b、異常b、起動a／保持a、R1コイル -->
              <path d="M55 171 H175 M205 171 H325 M355 171 H460 M460 171 H550 M580 171 H760 M760 171 H911 M969 171 H1045"/>
              <path d="M460 171 V270 H550 M580 270 H760 V171"/>
              <!-- 第2段：R1補助aを介したRUN出力 -->
              <path d="M55 424 H320 M350 424 H911 M969 424 H1045"/>
              <!-- b接点：斜線、a接点：並行線 -->
              <path d="M175 153 V189 M205 153 V189 M171 193 L209 149"/>
              <path d="M325 153 V189 M355 153 V189 M321 193 L359 149"/>
              <path d="M550 153 V189 M580 153 V189"/>
              <path d="M550 252 V288 M580 252 V288"/>
              <path d="M320 406 V442 M350 406 V442"/>
              <!-- コイルは配線上に中央揃え -->
              <circle cx="940" cy="171" r="29" fill="#fff"/>
              <circle cx="940" cy="424" r="29" fill="#fff"/>
            </g>
            <!-- 機器名を配線の上、接点番号を配線の下に分離 -->
            <g font-family="sans-serif" fill="#17253b" text-anchor="middle">
              <g font-size="19" font-weight="700">
                <text x="190" y="133">SB1</text><text x="340" y="133">F1</text>
                <text x="565" y="133">SB2</text><text x="565" y="236">R1補助a</text>
                <text x="335" y="392">R1補助a</text>
                <text x="940" y="178">R1</text><text x="940" y="431">Y1</text>
              </g>
              <g font-size="16">
                <text x="190" y="214">停止b</text><text x="190" y="235">1–2</text>
                <text x="340" y="214">INV異常b</text><text x="340" y="235">95–96</text>
                <text x="565" y="214">起動a</text><text x="565" y="327">13–14</text>
                <text x="565" y="193">3–4</text>
                <text x="335" y="465">13–14</text>
                <text x="940" y="217">A1／A2</text>
                <text x="940" y="467">INV入力へ</text>
              </g>
            </g>
            <g font-family="sans-serif" font-size="15" fill="#475569">
              <text x="675" y="248">起動接点と保持接点は並列</text>
              <text x="470" y="503">R1が動作すると補助a接点が閉じ、RUN出力を有効化</text>
            </g>
          </svg>
        </div>
        <div class="v9-side">
          <h3>読み取るポイント</h3>
          <ul class="v9-list">
            <li><span class="v9-chip">緑</span> 停止bなど正常時に閉じる共通条件</li>
            <li><span class="v9-chip">赤</span> 手動起動のきっかけになる起動a</li>
            <li><span class="v9-chip">青</span> 変更後に重視したい保持・出力・異常関連</li>
            <li>番号 <b>1-2 / 3-4 / 13-14 / A1-A2</b> は学習用の代表例です。実際の課題指示と一致しない場合があります。</li>
            <li>起動aとR1補助aは並列で自己保持、停止bと異常bは直列で共通停止条件です。</li>
          </ul>
          <div class="v9-card">
            <b>描く順番</b>
            <ol>
              <li>左右母線</li>
              <li>共通停止条件</li>
              <li>起動aと保持aの並列</li>
              <li>R1コイル</li>
              <li>RUN出力とINV入力</li>
              <li>注記・符号・番号</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div class="v9-panel" data-v9panel="parts">
      <h3>機器符号・接点番号・端子整理</h3>
      <table class="v9-table">
        <tr><th>記号</th><th>名称</th><th>見本の表記</th><th>役割</th><th>注意</th></tr>
        <tr><td>SB1</td><td>停止押しボタン</td><td>b接点 1-2</td><td>共通停止条件</td><td>通常閉で描く条件か確認</td></tr>
        <tr><td>SB2</td><td>起動押しボタン</td><td>a接点 3-4</td><td>起動きっかけ</td><td>押している間だけ閉じる</td></tr>
        <tr><td>R1</td><td>運転許可リレー</td><td>コイル A1/A2</td><td>保持とRUN出力の基準</td><td>MCではなく中間継電器の例</td></tr>
        <tr><td>R1補助a</td><td>補助a接点</td><td>13-14</td><td>自己保持・出力許可</td><td>直列と並列の位置を混同しない</td></tr>
        <tr><td>F1</td><td>INV異常接点</td><td>b接点 95-96</td><td>異常時の運転遮断</td><td>正常時閉・異常時開の仮定例</td></tr>
        <tr><td>Y1</td><td>RUN出力</td><td>出力接点/信号</td><td>INVの入力を駆動</td><td>端子名は機種ごとに異なる</td></tr>
      </table>
      <div class="v9-grid" style="margin-top:12px">
        <div class="v9-side">
          <h3>端子・信号の整理例</h3>
          <table class="v9-table">
            <tr><th>行先</th><th>信号</th><th>意味</th></tr>
            <tr><td>INV1</td><td>RUN</td><td>運転指令</td></tr>
            <tr><td>INV1</td><td>FLT</td><td>故障出力</td></tr>
            <tr><td>表示灯</td><td>RUN Lamp</td><td>運転中の表示</td></tr>
            <tr><td>警報</td><td>Alarm</td><td>異常の表示</td></tr>
          </table>
        </div>
        <div class="v9-side">
          <h3>検図の観点</h3>
          <ul class="v9-list">
            <li>記号が主回路・制御回路・扉正面図で矛盾していないか。</li>
            <li>接点番号が同一機器の補助接点として自然につながっているか。</li>
            <li>端子や信号の向き、入出力の意味を書き違えていないか。</li>
            <li>P2既設側の記号を不用意に書き換えていないか。</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="v9-panel" data-v9panel="final">
      <div class="v9-grid">
        <div>
          <div class="v9-card">
            <h3>総合課題の参考見本（方針）</h3>
            <ol>
              <li>1枚目：P1/P2の改造前後比較図。P1のみ変更、P2は既設維持。</li>
              <li>2枚目：P1の制御回路。停止b、異常b、起動a、R1補助a、R1、RUN出力を記載。</li>
              <li>3枚目：扉正面図。外形、中心線、計器1、表示灯3、押しボタン2、寸法線。</li>
              <li>4枚目：変更点5項目と検図表。誤りを自分で見つける。</li>
            </ol>
            <button type="button" class="v9-toggle btn" data-target="v9-model-answer">参考解答の要点を表示</button>
            <div id="v9-model-answer" class="v9-ans" hidden>
              <p><b>参考解答の要点：</b> 停止条件は共通直列、起動aとR1補助aは並列、R1コイルは運転許可の中心、RUN出力はINV入力へ向かう別枝回路として整理します。扉正面図は外形→基準→機器→寸法の順で描きます。</p>
              <table class="v9-table">
                <tr><th>図面</th><th>最低限そろえるもの</th></tr>
                <tr><td>主回路比較図</td><td>P1改造前後、P2既設、機器符号、変更箇所の注記</td></tr>
                <tr><td>制御回路図</td><td>停止b、異常b、起動a、保持a、R1、RUN</td></tr>
                <tr><td>扉正面図</td><td>外形、中心線、機器数、中心寸法、寸法補助線</td></tr>
                <tr><td>検図表</td><td>変更点、注意点、見直し結果</td></tr>
              </table>
            </div>
          </div>
          <div class="v9-card v9-checklist">
            <h3>仕上げチェック</h3>
            <label><input type="checkbox" data-v9check="0">機器符号（SB1、SB2、R1、F1、Y1）を図面内で統一した</label>
            <label><input type="checkbox" data-v9check="1">停止条件と異常条件を共通直列に置いた</label>
            <label><input type="checkbox" data-v9check="2">起動aと保持aを並列に描いた</label>
            <label><input type="checkbox" data-v9check="3">P1のみを改造対象とし、P2既設を維持した</label>
            <label><input type="checkbox" data-v9check="4">扉正面図の外形・基準線・寸法線を確認した</label>
            <p id="v9-check-progress" class="v9-feedback" aria-live="polite"></p>
          </div>
        </div>
        <div class="v9-side">
          <h3>よくある減点イメージ</h3>
          <ul class="v9-list">
            <li>停止bをa接点で描いてしまう。</li>
            <li>自己保持を直列に描いて成立しなくなる。</li>
            <li>P2側までインバータ化してしまう。</li>
            <li>機器符号はあるが、接点番号や説明が抜ける。</li>
            <li>扉正面図で中心線と寸法線の線種が混同する。</li>
          </ul>
          <div class="v9-card">
            <b>おすすめの学習順</b>
            <p>第3週詳細見本 → 本格作図見本 → 第4週詳細見本 → 総合課題 → 印刷用紙で再作図、の順で繰り返すと定着しやすくなります。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`;
const practice=document.getElementById('practice');
if(practice && !document.getElementById('pro-models')) practice.insertAdjacentHTML('beforebegin',html);
// tabs
const tabBtns=[...document.querySelectorAll('[data-v9tab]')];
tabBtns.forEach(btn=>btn.addEventListener('click',()=>{
  tabBtns.forEach(b=>b.classList.toggle('active',b===btn));
  document.querySelectorAll('[data-v9panel]').forEach(p=>p.classList.toggle('active',p.dataset.v9panel===btn.dataset.v9tab));
}));
// toggle answer
const tgl=document.querySelector('.v9-toggle');
if(tgl) tgl.addEventListener('click',()=>{const box=document.getElementById(tgl.dataset.target); if(!box) return; const hidden=box.hasAttribute('hidden'); if(hidden){box.removeAttribute('hidden'); tgl.textContent='参考解答の要点を隠す'} else {box.setAttribute('hidden',''); tgl.textContent='参考解答の要点を表示'}});
// checklist persistence
const checks=[...document.querySelectorAll('[data-v9check]')];
checks.forEach(ch=>{ch.checked=!!state[ch.dataset.v9check]; ch.addEventListener('change',()=>{state[ch.dataset.v9check]=ch.checked; write(state); update()})});
function update(){const n=checks.filter(x=>x.checked).length; const total=checks.length; const pct=Math.round(n*100/total); const el=document.getElementById('v9-check-progress'); if(el) el.textContent=`本格作図見本の仕上げチェック： ${n} / ${total} 項目（${pct}%）`;}
update();
// nav link if missing (safety)
const nav=document.querySelector('header nav');
if(nav && !nav.querySelector('a[href="#pro-models"]')){const a=document.createElement('a');a.className='btn';a.href='#pro-models';a.textContent='本格作図見本';nav.appendChild(a);}
})();

;
/* ===== END practical-upgrade-v9.js ===== */

/* ===== BEGIN practical-upgrade-v10.js ===== */
(()=>{'use strict';
const KEY='denki2_practical_v10_complete';
function read(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch{return {}}}
function write(v){try{localStorage.setItem(KEY,JSON.stringify(v))}catch{}}
const state=read();
const html=`
<section class="card" id="complete-models">
  <h2>総合実技課題の完成見本図</h2>
  <p class="alert"><b>独自作成の学習用完成見本です。</b> 公式模範解答ではありません。第3週のインバータ改造と第4週の扉正面図をつなげて、総合課題としてどのように整理して描くかを示した参考例です。</p>
  <p>主回路 → 制御回路 → 扉正面図 → 変更点・検図表、の順で確認すると理解しやすくなります。</p>
  <div class="v10-tabs" role="tablist" aria-label="総合課題完成見本の切替">
    <button type="button" class="active" data-v10tab="power">完成見本1 主回路</button>
    <button type="button" data-v10tab="control">完成見本2 制御回路</button>
    <button type="button" data-v10tab="door">完成見本3 扉正面図</button>
    <button type="button" data-v10tab="review">完成見本4 変更点・検図表</button>
  </div>
  <div class="v10-panel active" data-v10panel="power">
    <div class="v10-grid">
      <div class="v10-figure">
        <svg viewBox="0 0 980 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="総合課題の主回路完成見本図。P1はインバータ化、P2は既設直入れを維持する。">
          <g fill="none" stroke="#334155" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M70 40 V350 M120 40 V350 M170 40 V350"/>
            <path d="M170 130 H300 M170 260 H300"/>
            <rect x="300" y="100" width="110" height="60" rx="8"/>
            <rect x="445" y="88" width="150" height="84" rx="8"/>
            <circle cx="760" cy="130" r="34"/>
            <rect x="300" y="230" width="110" height="60" rx="8"/>
            <rect x="445" y="230" width="110" height="60" rx="8"/>
            <rect x="590" y="230" width="110" height="60" rx="8"/>
            <circle cx="760" cy="260" r="34"/>
            <path d="M410 130 H445 M595 130 H726"/>
            <path d="M410 260 H445 M555 260 H590 M700 260 H726"/>
          </g>
          <g fill="#2563eb" fill-opacity="0.09" stroke="#2563eb" stroke-width="2">
            <rect x="432" y="76" width="176" height="108" rx="12"/>
          </g>
          <g font-size="18" font-weight="700" fill="#0f172a" text-anchor="middle">
            <text x="120" y="30">三相電源</text>
            <text x="355" y="136">MCCB1</text><text x="520" y="126">INV1</text><text x="520" y="148">可変速</text><text x="760" y="136">M1 / P1</text>
            <text x="355" y="266">MCCB2</text><text x="500" y="266">MC2</text><text x="645" y="266">THR2</text><text x="760" y="266">M2 / P2</text>
          </g>
          <g font-size="14" fill="#475569">
            <text x="55" y="62">R</text><text x="105" y="62">S</text><text x="155" y="62">T</text>
            <text x="610" y="92">P1変更箇所</text>
            <text x="600" y="332">P1のみインバータ化、P2は既設直入れ回路を維持</text>
            <text x="208" y="122">P1系統</text><text x="208" y="252">P2系統</text>
          </g>
        </svg>
      </div>
      <div class="v10-note">
        <h3>主回路の完成見本で見ること</h3>
        <ul>
          <li>P1系統だけが変更対象です。<b>MCCB1 → INV1 → M1</b> の流れを押さえます。</li>
          <li>P2系統は <b>MCCB2 → MC2 → THR2 → M2</b> の既設回路を維持します。</li>
          <li>比較図は、変えた部分を強調しつつ、残す部分も明確に残すことが大切です。</li>
        </ul>
        <div class="v10-box">
          <b>描く順番の例</b>
          <ol>
            <li>三相母線</li>
            <li>P1・P2の枝分かれ</li>
            <li>P1へINV1を追加</li>
            <li>P2既設側を描く</li>
            <li>機器符号と注記を書く</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
  <div class="v10-panel" data-v10panel="control">
    <div class="v10-grid">
      <div class="v10-figure">
        <svg viewBox="0 0 1040 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="総合課題の制御回路完成見本図。停止b、異常b、起動a、自己保持、運転許可リレー、RUN出力を示す。">
          <g fill="none" stroke="#334155" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M80 40 V420 M970 40 V420"/>
            <path d="M80 110 H150 M205 110 H290 M290 110 H350 M350 110 H430 M500 110 H580 M580 110 H740 M815 110 H970"/>
            <path d="M430 110 V185 H580 M740 185 H815 V110"/>
            <path d="M80 255 H210 M275 255 H360 M430 255 H540 M605 255 H700 M760 255 H970"/>
            <path d="M80 350 H300 M360 350 H470 M530 350 H650 M720 350 H970"/>
            <circle cx="790" cy="110" r="25"/>
            <circle cx="730" cy="255" r="25"/>
            <rect x="150" y="88" width="55" height="44" rx="8"/>
            <rect x="350" y="88" width="80" height="44" rx="8"/>
            <rect x="580" y="88" width="80" height="44" rx="8"/>
            <rect x="210" y="233" width="65" height="44" rx="8"/>
            <rect x="470" y="328" width="60" height="44" rx="8"/>
          </g>
          <g fill="#fff" stroke-width="2">
            <rect x="150" y="88" width="55" height="44" rx="8" stroke="#16a34a"/>
            <rect x="350" y="88" width="80" height="44" rx="8" stroke="#dc2626"/>
            <rect x="580" y="88" width="80" height="44" rx="8" stroke="#2563eb"/>
            <rect x="210" y="233" width="65" height="44" rx="8" stroke="#2563eb"/>
            <rect x="470" y="328" width="60" height="44" rx="8" stroke="#2563eb"/>
          </g>
          <g font-size="15" font-weight="700" fill="#0f172a" text-anchor="middle">
            <text x="80" y="28">L</text><text x="970" y="28">N</text>
            <text x="177" y="104">SB1</text><text x="177" y="122">停止b</text><text x="177" y="140">1-2</text>
            <text x="320" y="104">F1</text><text x="320" y="122">INV異常b</text><text x="320" y="140">95-96</text>
            <text x="390" y="104">SB2</text><text x="390" y="122">起動a</text><text x="390" y="140">3-4</text>
            <text x="620" y="104">R1補助a</text><text x="620" y="122">13-14</text>
            <text x="790" y="115">R1</text><text x="790" y="134">A1/A2</text>
            <text x="242" y="249">R1補助a</text><text x="242" y="267">13-14</text>
            <text x="730" y="260">Y1</text><text x="730" y="279">RUN</text>
            <text x="500" y="344">F2a</text><text x="500" y="362">故障表示</text>
          </g>
          <g font-size="13" fill="#475569">
            <text x="120" y="92">共通停止条件</text>
            <text x="460" y="175">自己保持枝</text>
            <text x="330" y="221">運転許可が成立したら</text>
            <text x="330" y="237">RUN出力へつなぐ</text>
            <text x="555" y="397">故障表示枝は別に整理</text>
          </g>
        </svg>
      </div>
      <div class="v10-note">
        <h3>制御回路の完成見本で見ること</h3>
        <ul>
          <li>停止bと異常bを<b>共通直列</b>に置く。</li>
          <li>起動aとR1補助aを<b>並列</b>にして自己保持を作る。</li>
          <li>R1コイルが成立したあと、別枝としてRUN出力へつなげる。</li>
          <li>故障表示は運転許可回路とは別に分けて整理すると読みやすい。</li>
        </ul>
        <div class="v10-box">
          <button type="button" class="v10-toggle btn" data-target="v10-control-answer">参考解答の要点を表示</button>
          <div id="v10-control-answer" class="v10-answer" hidden>
            <p><b>要点：</b>「停止・異常」で止める共通条件、「起動・保持」で動かす条件、「RUN出力」「故障表示」の枝回路、の3つに分けて考えると整理しやすくなります。</p>
            <table class="v10-table">
              <tr><th>枝</th><th>意味</th></tr>
              <tr><td>1段目</td><td>運転許可R1の自己保持回路</td></tr>
              <tr><td>2段目</td><td>R1成立後のRUN出力</td></tr>
              <tr><td>3段目</td><td>故障表示・警報系の枝回路</td></tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="v10-panel" data-v10panel="door">
    <div class="v10-grid">
      <div class="v10-figure">
        <svg viewBox="0 0 840 520" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="総合課題の扉正面図完成見本。外形、中心線、計器、表示灯、押しボタン、寸法線を示す。">
          <g fill="none" stroke="#334155" stroke-width="3">
            <rect x="230" y="50" width="360" height="380" rx="4"/>
            <path d="M410 34 V446" stroke="#94a3b8" stroke-dasharray="9 7"/>
            <path d="M212 240 H608" stroke="#94a3b8" stroke-dasharray="9 7"/>
            <rect x="338" y="92" width="144" height="74"/>
            <circle cx="300" cy="228" r="20"/>
            <circle cx="410" cy="228" r="20"/>
            <circle cx="520" cy="228" r="20"/>
            <circle cx="350" cy="338" r="27"/>
            <circle cx="470" cy="338" r="27"/>
            <path d="M230 454 V482 M590 454 V482 M230 468 H590" stroke="#64748b" stroke-width="1.8"/>
            <path d="M210 50 H180 M210 430 H180 M194 50 V430" stroke="#64748b" stroke-width="1.8"/>
            <path d="M300 228 V190 M520 228 V190 M300 200 H520" stroke="#64748b" stroke-width="1.5"/>
            <path d="M350 338 V390 M470 338 V390 M350 380 H470" stroke="#64748b" stroke-width="1.5"/>
          </g>
          <g fill="#0f172a" font-size="17" font-weight="700" text-anchor="middle">
            <text x="410" y="135">計器</text>
            <text x="300" y="265">電源</text><text x="410" y="265">運転</text><text x="520" y="265">異常</text>
            <text x="350" y="388">起動</text><text x="470" y="388">停止</text>
            <text x="410" y="500">幅 600</text>
            <text x="162" y="240" transform="rotate(-90 162 240)">高さ 800</text>
            <text x="410" y="194">表示灯中心間隔 220</text>
            <text x="410" y="398">押しボタン中心間隔 120</text>
          </g>
          <g fill="#475569" font-size="13">
            <text x="620" y="68">独自教材の例</text>
            <text x="620" y="88">実際は課題指定値を優先</text>
          </g>
        </svg>
      </div>
      <div class="v10-note">
        <h3>扉正面図の完成見本で見ること</h3>
        <ol>
          <li>外形と中心線を最初に描く。</li>
          <li>上段：計器、中段：表示灯、下段：押しボタン、と段分けする。</li>
          <li>丸形器具は中心寸法で管理し、寸法補助線を明確にする。</li>
          <li>寸法値は例示なので、実際は課題条件の値へ置き換える。</li>
        </ol>
        <div class="v10-box">
          <b>検図の順番</b>
          <ul>
            <li>外形寸法</li>
            <li>中心線</li>
            <li>機器数量</li>
            <li>配置バランス</li>
            <li>寸法補助線と数値</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="v10-panel" data-v10panel="review">
    <div class="v10-grid">
      <div>
        <div class="v10-box">
          <h3>変更点リストの完成例</h3>
          <table class="v10-table">
            <tr><th>No.</th><th>変更点</th><th>見直しポイント</th></tr>
            <tr><td>1</td><td>P1主回路をMC1直入れからINV1経由へ変更</td><td>P1だけが変更対象か</td></tr>
            <tr><td>2</td><td>P1制御の終点をMC1コイルからRUN出力へ変更</td><td>制御対象の書き分けができているか</td></tr>
            <tr><td>3</td><td>異常接点F1を共通停止条件に追加</td><td>保持中でも停止できる位置か</td></tr>
            <tr><td>4</td><td>故障表示枝を別回路として追加</td><td>運転許可回路と混同していないか</td></tr>
            <tr><td>5</td><td>扉正面図の計器・表示灯・押しボタンを整理配置</td><td>数量・位置・寸法の整合があるか</td></tr>
          </table>
        </div>
        <div class="v10-box">
          <h3>検図表の完成例</h3>
          <table class="v10-table">
            <tr><th>確認項目</th><th>確認内容</th><th>結果</th></tr>
            <tr><td>機器符号</td><td>P1/P2、INV1、R1、SB1、SB2、F1、Y1の表記確認</td><td>○</td></tr>
            <tr><td>接点種別</td><td>停止b、異常b、起動a、保持aの確認</td><td>○</td></tr>
            <tr><td>回路構成</td><td>共通直列、並列保持、出力枝、表示枝の確認</td><td>○</td></tr>
            <tr><td>扉正面図</td><td>外形、中心線、機器数、寸法記入の確認</td><td>○</td></tr>
            <tr><td>変更範囲</td><td>P1のみ変更、P2既設維持の確認</td><td>○</td></tr>
          </table>
        </div>
      </div>
      <div class="v10-note v10-check">
        <h3>仕上げセルフチェック</h3>
        <label><input type="checkbox" data-v10check="0">主回路の変更対象がP1のみになっている</label>
        <label><input type="checkbox" data-v10check="1">停止b・異常bを共通直列に置いた</label>
        <label><input type="checkbox" data-v10check="2">起動aと保持aを並列に置いた</label>
        <label><input type="checkbox" data-v10check="3">RUN出力と故障表示の枝を整理した</label>
        <label><input type="checkbox" data-v10check="4">扉正面図の外形・中心線・機器数・寸法を確認した</label>
        <label><input type="checkbox" data-v10check="5">変更点5項目と検図結果を自分の言葉で説明できる</label>
        <p id="v10-progress" class="v10-status" aria-live="polite"></p>
        <button type="button" class="v10-toggle btn" data-target="v10-review-answer">参考解答の考え方を表示</button>
        <div id="v10-review-answer" class="v10-answer" hidden>
          <p><b>完成見本の考え方：</b> 総合課題では「何を変えたか」「どう動くか」「どう配置するか」「どこを見直すか」を4枚または4ブロックに分けて整理すると、描き漏れを防ぎやすくなります。</p>
          <ul>
            <li>主回路比較図：変更対象と既設維持を区別する。</li>
            <li>制御回路図：停止・起動・保持・出力・故障表示を分けて考える。</li>
            <li>扉正面図：外形 → 基準 → 機器 → 寸法の順で描く。</li>
            <li>検図表：誤りやすい点を先にリスト化して見直す。</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>`;
const finalAssignment=document.getElementById('final-assignment');
if(finalAssignment && !document.getElementById('complete-models')) finalAssignment.insertAdjacentHTML('beforebegin', html);
// tabs
const tabs=[...document.querySelectorAll('[data-v10tab]')];
tabs.forEach(btn=>btn.addEventListener('click',()=>{
  tabs.forEach(b=>b.classList.toggle('active', b===btn));
  document.querySelectorAll('[data-v10panel]').forEach(p=>p.classList.toggle('active', p.dataset.v10panel===btn.dataset.v10tab));
}));
// toggles
function bindToggle(btn){const box=document.getElementById(btn.dataset.target); if(!box) return; btn.addEventListener('click',()=>{const hidden=box.hasAttribute('hidden'); if(hidden){box.removeAttribute('hidden'); btn.textContent=btn.textContent.replace('表示','隠す');}else{box.setAttribute('hidden',''); btn.textContent=btn.textContent.replace('隠す','表示');}})}
document.querySelectorAll('.v10-toggle').forEach(bindToggle);
// save checks
const checks=[...document.querySelectorAll('[data-v10check]')];
checks.forEach(ch=>{ch.checked=!!state[ch.dataset.v10check]; ch.addEventListener('change',()=>{state[ch.dataset.v10check]=ch.checked; write(state); update();})});
function update(){const n=checks.filter(x=>x.checked).length; const total=checks.length; const pct=Math.round(n*100/total); const t=document.getElementById('v10-progress'); if(t) t.textContent=`総合実技課題の完成見本チェック： ${n} / ${total} 項目（${pct}%）`;}
update();
})();

;
/* ===== END practical-upgrade-v10.js ===== */

/* ===== BEGIN exam-focus-v11.js ===== */
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

;
/* ===== END exam-focus-v11.js ===== */

/* ===== BEGIN practical-validated-v12.js ===== */
(()=>{'use strict';
const svg=(body,height=250)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 950 ${height}" role="img" aria-label="無励磁の接点を基準とした学習用回路模式図">${body}</svg>`;
const line=(x1,y1,x2,y2)=>`<path d="M${x1} ${y1} L${x2} ${y2}" fill="none" stroke="#20344f" stroke-width="2.8" stroke-linecap="round"/>`;
function textBlock(x,y,lines,size=14,opts={}){const arr=Array.isArray(lines)?lines:[lines];const anchor=opts.anchor||'middle';const fill=opts.fill||'#173454';const weight=opts.weight||700;const cls=opts.cls||'';const gap=size+3;const firstY=y-((arr.length-1)*gap/2);return `<text x="${x}" y="${firstY}" text-anchor="${anchor}" font-size="${size}" fill="${fill}" font-weight="${weight}" class="${cls}">`+arr.map((line,i)=>`<tspan x="${x}" y="${firstY+i*gap}">${line}</tspan>`).join('')+`</text>`}
const node=(x,y)=>`<circle cx="${x}" cy="${y}" r="4" fill="#173454"/>`;
function labelLines(label){const m=label.match(/^(.*?)(（.*）)$/);let base=label,suffix='';if(m){base=m[1];suffix=m[2]}if(base.includes('補助')){return [base.replace('補助',''),'補助'+suffix].filter(Boolean)}if(base.includes('起動')){return [base.replace('起動',''),'起動'+suffix].filter(Boolean)}if(suffix)return [base,suffix];return [label]}
function contact(x,y,label,nc=false){let b=line(x-34,y,x-10,y)+line(x+10,y,x+34,y);b+=`<path d="M${x-10} ${y-14} V${y+14} M${x+10} ${y-14} V${y+14}" stroke="#20344f" stroke-width="2.9" stroke-linecap="round"/>`;if(nc)b+=line(x-12,y+17,x+12,y-17);return b+textBlock(x,y-43,labelLines(label),12.5)}
function coil(x,y,label){return `<rect x="${x-24}" y="${y-22}" width="48" height="44" rx="15" stroke="#20344f" stroke-width="2.8" fill="none"/>`+textBlock(x,y+5,label,14)}
function power(y=100){return line(30,35,30,y+60)+line(915,35,915,y+60)+textBlock(30,22,'L',14)+textBlock(915,22,'N',14)}
function hold(){let a=power(125)+line(30,125,100,125)+contact(134,125,'停止PB（b）',true)+line(168,125,205,125)+contact(240,125,'THR（b）',true)+line(274,125,328,125)+line(328,125,370,125)+contact(410,125,'運転PB（a）')+line(444,125,495,125)+line(495,125,700,125)+coil(750,125,'MC')+line(774,125,915,125);a+=line(328,125,328,218)+line(328,218,370,218)+contact(410,218,'MC補助（a）')+line(444,218,495,218)+line(495,218,495,125)+node(328,125)+node(495,125)+textBlock(650,236,['起動枝と保持枝は並列','停止PB・THRは共通直列'],12.5,{fill:'#475569',weight:600});return svg(a,275)}
function reverse(){let a=power(255);function branch(y,me,other){let b=line(30,y,90,y)+contact(124,y,'停止PB（b）',true)+line(158,y,185,y)+contact(219,y,'THR（b）',true)+line(253,y,275,y)+contact(309,y,other+'補助（b）',true)+line(343,y,375,y)+contact(409,y,me+'起動（a）')+line(443,y,530,y)+line(530,y,715,y)+coil(760,y,me)+line(784,y,915,y);b+=line(375,y,375,y+74)+line(375,y+74,399,y+74)+contact(433,y+74,me+'補助（a）')+line(467,y+74,530,y+74)+line(530,y+74,530,y)+node(375,y)+node(530,y);return b};a+=branch(105,'MC-F','MC-R')+branch(255,'MC-R','MC-F');a+=textBlock(470,336,['各回路は「停止PB → THR → 相手側b接点 → 起動／自己保持」','の順で読み、最後に同名コイルへ接続する'],12,{fill:'#475569',weight:600});return svg(a,370)}
function block(x,y,w,h,title){return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" stroke="#20344f" fill="#eff6ff" stroke-width="2"/>`+textBlock(x+w/2,y+h/2+5,title,15)}
function inv(){let b=textBlock(120,28,'改造前：直入れの主回路',14)+textBlock(580,28,'改造後：インバータ方式の主回路',14);for(const off of [0,470]){b+=textBlock(off+65,65,'三相電源',14)+block(off+45,80,95,45,'MCCB')+line(off+92,65,off+92,80)+line(off+92,125,off+92,157)}b+=block(45,157,95,45,'MC')+line(92,202,92,234)+block(45,234,95,45,'THR')+line(92,279,92,311)+block(45,311,95,45,'M1');b+=block(515,157,160,72,['INV','（入力）'])+line(595,229,595,262)+block(515,262,160,58,['INV','（出力）'])+line(595,320,595,340)+block(545,340,100,46,'M1');b+=textBlock(805,154,['制御信号','（別回路）'],14)+block(735,180,140,50,'RUN用接点')+line(805,230,805,261)+block(720,261,170,63,['INV運転入力'])+textBlock(805,352,['論理入力','三相電源ではない'],12.5,{fill:'#475569',weight:600});return svg(b,420)}
const diagrams=[['v12svgHold',hold()],['v12svgReverse',reverse()],['v12svgInv',inv()]];diagrams.forEach(([id,markup])=>{const e=document.getElementById(id);if(e)e.innerHTML=markup});
const questions=[
['自己保持a接点はどこに接続する？',['運転a接点と並列','停止b接点と並列','MCコイルと直列だけ'],0,'保持枝は運転PBを離した後の迂回経路。停止bと並列にすると停止が効かない。'],
['停止PB（b）の推奨位置は？',['運転aのみに直列','起動・保持両枝の共通直列','MCコイルと並列'],1,'停止操作で保持枝も遮断できる位置に置く。'],
['MCコイルが無励磁のとき補助a接点は？',['閉','開','短絡'],1,'無励磁の通常状態でaは開、bは閉。'],
['MC-Fのコイル直列に必要な相手側接点は？',['MC-Fのa','MC-Rのb','MC-Rのa'],1,'MC-R励磁時に開くMC-R補助bをMC-Fコイル側へ挿入する。'],
['正逆接触器が同時に動作しないためには？',['b接点だけであらゆる故障を防止','電気的b接点に加え機械的インターロック等を検討','表示灯だけで制御'],1,'b接点だけでは溶着・同時操作などの安全保証にならない。'],
['逆転用主回路で通常必要な変更は？',['三相のうち二相を入れ替える','中性線を必ず外す','接地線を入れ替える'],0,'三相誘導電動機の相順を逆転させるため二相を交換。保護接地は入れ替えない。'],
['INVのRUN端子は通常どんな役割？',['三相電動機の主出力','制御用指令入力','短絡保護用母線'],1,'運転指令の論理入力。具体的な入力方式・端子名・電圧はメーカー仕様を確認。'],
['インバータの異常出力接点について正しいのは？',['どの機種も常閉固定','異常条件と接点設定を機種資料で確認','常に三相交流を出力'],1,'NO/NCと動作論理、リレー出力の設定は機種や配線方法に依存。'],
['図面内で線が交差する場合は？',['すべて結線している','交差箇所の接続点記号・図面規約を確認','すべて短絡禁止'],1,'接続●の有無など、採用する製図規約の読み方を明示する。'],
['試験で指定されていない機器端子番号は？',['適当なメーカー番号を正解として確定','製品資料・課題条件で確認し、未確認なら仮定として明示','すべて13-14にする'],1,'例示番号を実機共通の正解として扱わない。']
];
const target=document.getElementById('v12questions');if(!target)return;
questions.forEach((q,i)=>{const div=document.createElement('div');div.className='v12-question';const h=document.createElement('strong');h.textContent=`問${i+1}：${q[0]}`;div.appendChild(h);q[1].forEach((opt,j)=>{const label=document.createElement('label');const radio=document.createElement('input');radio.type='radio';radio.name=`v12q${i}`;radio.value=j;label.append(radio,document.createTextNode(opt));div.appendChild(label)});let answer=document.createElement('div');answer.className='v12-answer';answer.hidden=true;answer.id=`v12a${i}`;div.appendChild(answer);target.appendChild(div)});
try{const previous=JSON.parse(localStorage.getItem('denki-v12-check-answers')||'[]');previous.forEach((a,i)=>{const r=target.querySelector(`input[name="v12q${i}"][value="${a}"]`);if(r)r.checked=true})}catch(e){}
document.getElementById('v12score').addEventListener('click',()=>{let good=0,filled=0;let picks=[];questions.forEach((q,i)=>{const checked=target.querySelector(`input[name="v12q${i}"]:checked`);const a=checked?Number(checked.value):null;picks.push(a);if(a!==null)filled++;if(a===q[2])good++;const ans=document.getElementById(`v12a${i}`);ans.hidden=false;ans.textContent=`${a===q[2]?'正解':'要復習'}｜正答：${q[1][q[2]]}。${q[3]}`});document.getElementById('v12result').textContent=`独自練習評価：${good}/10問正解（回答${filled}/10）。${good===10?'次は見本なしの作図・寸法演習に進みましょう。':'間違えた問題の図を自分で描き直しましょう。'}`;try{localStorage.setItem('denki-v12-check-answers',JSON.stringify(picks));localStorage.setItem('denki-v12-check-result',JSON.stringify({score:good,total:10,answered:filled,date:new Date().toISOString()}))}catch(e){document.getElementById('v12result').textContent+=' 保存が利用できない環境です。'}});
})();

;
/* ===== END practical-validated-v12.js ===== */

/* ===== BEGIN practical-validated-v13.js ===== */
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
;
/* ===== END practical-validated-v13.js ===== */

/* ===== BEGIN mobile-stage8-practical.js ===== */
/* Stage 8: view-only enlarged diagrams. Does not touch scoring or storage. */
(()=>{'use strict';
 const root=document.querySelector('.practical-study-page');if(!root)return;
 const main=root.querySelector('main');if(!main)return;
 const quick=document.createElement('nav');quick.className='practical-quick-links';quick.setAttribute('aria-label','実技の学習ステップ');
 [['#weekly','学習の道順'],['#week1','図記号'],['#self-visual','自己保持'],['#interlock-anchor','インターロック'],['#validatedV12','検図'],['#week3','作図'],['#week4','扉正面図'],['#practice','自己点検']].forEach(([href,t])=>{const a=document.createElement('a');a.href=href;a.textContent=t;quick.append(a)});
 main.insertBefore(quick,main.firstChild);
 const modal=document.createElement('div');modal.className='diagram-modal';modal.hidden=true;modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.setAttribute('aria-label','図面の拡大表示');
 modal.innerHTML='<div class="diagram-modal-bar"><strong id="diagram-modal-title">図面を拡大表示</strong><button type="button" data-zoom="out" aria-label="縮小">−</button><button type="button" data-zoom="reset">等倍</button><button type="button" data-zoom="in" aria-label="拡大">＋</button><button type="button" class="diagram-close">閉じる ×</button></div><div class="diagram-modal-viewport" tabindex="0"><div class="diagram-modal-canvas"></div></div><div class="diagram-modal-hint">＋ / − で拡大縮小。指でスクロールして図面を確認できます。</div>';
 root.append(modal);
 const canvas=modal.querySelector('.diagram-modal-canvas'),viewport=modal.querySelector('.diagram-modal-viewport');
 let zoom=1,base=600,focusFrom=null,clone=null;
 function fit(){if(!clone)return;clone.style.width=Math.round(base*zoom)+'px';}
 function close(){modal.hidden=true;canvas.replaceChildren();clone=null;root.style.overflow='';if(focusFrom&&focusFrom.isConnected)focusFrom.focus();}
 function open(svg,button){focusFrom=button;const label=svg.closest('section')?.querySelector('h2,h3')?.textContent.trim()||'実技の図面';modal.querySelector('#diagram-modal-title').textContent=label;clone=svg.cloneNode(true);clone.removeAttribute('id');clone.removeAttribute('style');clone.setAttribute('aria-label',svg.getAttribute('aria-label')||label);const vb=svg.viewBox?.baseVal;const ratio=vb&&vb.width&&vb.height?vb.height/vb.width:0.7;base=Math.max(320,Math.min(1100,viewport.clientWidth-32));clone.style.aspectRatio=ratio?`${1}/${ratio}`:'auto';canvas.replaceChildren(clone);zoom=1;fit();modal.hidden=false;root.style.overflow='hidden';modal.querySelector('.diagram-close').focus();}
 modal.querySelectorAll('[data-zoom]').forEach(b=>b.addEventListener('click',()=>{zoom=b.dataset.zoom==='reset'?1:Math.min(3,Math.max(.65,zoom+(b.dataset.zoom==='in'?.3:-.3)));fit();}));
 modal.querySelector('.diagram-close').addEventListener('click',close);
 modal.addEventListener('click',e=>{if(e.target===modal)close()});
 document.addEventListener('keydown',e=>{if(!modal.hidden&&e.key==='Escape')close()});
 const scopes='.figure,.mini-figure,.v12-diagram,.model-figure,.v9-figure,.v10-figure';
 function enhance(){main.querySelectorAll(scopes).forEach(el=>{if(el.dataset.diagramEnhanced)return;const svg=el.querySelector('svg');if(!svg)return;el.dataset.diagramEnhanced='1';const actions=document.createElement('div');actions.className='diagram-action';const b=document.createElement('button');b.type='button';b.className='diagram-open';b.textContent='↗ 図面を拡大';b.setAttribute('aria-label','この図面を拡大表示');b.addEventListener('click',()=>open(el.querySelector('svg')||svg,b));actions.append(b);el.insertAdjacentElement('afterend',actions)})}
 enhance();let queued=false;const observer=new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;enhance()})});observer.observe(main,{childList:true,subtree:true});
})();

;
/* ===== END mobile-stage8-practical.js ===== */
