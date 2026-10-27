# denki-seizu｜第14段階：シンプル構成版

技能検定2級・電気製図学習サイト。**第13段階から機能・問題データ・学習記録キーを変えず、ファイルだけ整理**しました。

## フォルダ構成

```text
index.html                 ホーム
problems.html              問題メニュー
practical.html             実技メニュー
review.html                復習メニュー
records.html               学習記録
october.html               10月の問題・採点
november.html              11月の問題・採点
practical-study.html       実技教材
assets/
  css/                     各HTMLに対応する8本のCSS
  js/
    common.js              すべてのページ共通のUI調整
    problems.js            問題メニュー
    practical.js           実技メニュー
    review.js              復習メニュー
    records.js             学習記録
    practical-study.js     実技教材の改修機能を元の順序で統合
tests/
  regression.cjs           回帰テスト（Node.jsのみ、外部パッケージ不要）
README.md                  この説明
```

## ファイル削減
- 第13段階：HTML 8 + CSS 15 + JS 16 + Markdown 3 + テスト 1 + README 1 = **44ファイル**
- 第14段階：HTML 8 + CSS 8 + JS 6 + テスト 1 + README 1 = **24ファイル**（20減）
- CSSは各ページで適用されていた**元のスタイル（HTML埋め込み分含む）を元の順序のまま連結**しています。
- JavaScriptは元の実行順で連結し、各モジュールの始まりと終わりに旧ファイル名のコメントを付けました。
- 大きな問題データと採点処理は従来どおり10月・11月HTML内のままです。

## 動作確認
Node.jsがインストールされていれば、展開先で以下を実行します。

```sh
node tests/regression.cjs
```

HTML・CSS・JSをGitHubリポジトリのルートへ**フォルダごと上書き・追加**してください。古いルート直下のCSS/JSは、**新HTMLをアップロードした後で**不要になります（GitHubに旧ファイルが残るだけなら動作は変わりません）。一度にすべて削除する前に公開ページを確認してください。

### 学習履歴の注意
ブラウザの `localStorage` をそのまま利用します。**保存キーは変更していません**。ただし、ブラウザ・端末・サイトURL（オリジン）が異なると履歴は引き継がれません。今回はサーバー側への保存や同期を追加していません。

### 未検証の範囲
全120問の専門知識上の正誤、実技の完成物の正しさ、全実機でのタップ操作は保証しません。問題の採点・保存キーの自動検査に加え、公開後の各画面・スマホ表示を確認してください。
