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
