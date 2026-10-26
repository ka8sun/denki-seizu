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
