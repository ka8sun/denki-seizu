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
