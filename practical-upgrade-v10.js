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
