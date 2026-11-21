---
name: figure-page
description: 競プロ問題の解説ページ（public/figures/*.html）を新規作成・修正するときの仕様。共通CSS（common/base.v1.css）と共通JS（common/stepper.v1.js）の使い方、HTMLの骨組み、ステップ送りUIの約束、守るべきルールをまとめている。「解説ページを作って」「figureを作って」などで使う。
---

# 解説ページ（figures）の仕様

競プロの問題ごとに、アルゴリズムの動きをステップ再生で見せる単体HTMLを作る。

## 置き場所と参照

- ページ: `public/figures/<問題ID>.html`（例: `abc463_c.html`。AtCoder のタスクIDに合わせる。鉄則本などは `tessoku_a42.html` のように出典を接頭辞にする）
- 共通ファイル: `public/figures/common/`（**作業前に必ず実物を読むこと**）
  - `base.v1.css` … 全ページ共通のCSS
  - `stepper.v1.js` … 全ページ共通のステップ送り（`createStepper`）
- アプリからは問題データの `figure_url` に `/figures/<問題ID>.html` を設定して開く（フルURLは使わない）
- 見本
  - 図が主役: `public/figures/abc463_c.html`
  - 表が主役: `public/figures/abc123_c.html`
  - 入力例を切り替える（`<select id="example">`）: `public/figures/abc484_c.html`

> 将来 S3 + CloudFront へ移行し、`next.config.ts` の rewrites で `/figures/*` を中継する予定。移行後もパスと相対参照（`./common/...`）はそのまま使える。

## 守るルール

- **PC専用**。スマホ幅向けのメディアクエリや調整は書かない
- **実装コードの節は載せない**（解法の説明と図だけ）
- **問題文はそのまま載せない**。自分の言葉での短い要約にとどめ、詳細は問題ページへ誘導する
- タイトル直下に非公式の注記を必ず入れる（文言は下の骨組みのとおり）
- 外部のスクリプト・スタイル・フォントは読み込まない（共通ファイル以外は1ファイルで完結させる）
- **自動再生（再生ボタン・速度選択）は付けない**。操作は「前へ / 次へ / 最初から」と矢印キーのみ

## HTMLの骨組み

```html
<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ABC463 C 解説</title>
<link href="./common/base.v1.css" rel="stylesheet">
<style>
  /* このページ固有のスタイルだけを書く */
</style>
</head>
<body>
<main>
  <h1>ABC463 C - 問題名</h1>
  <p class="source"><a href="https://atcoder.jp/contests/abc463/tasks/abc463_c" target="_blank" rel="noopener noreferrer">問題ページ</a></p>
  <p class="notice">非公式解説です。内容はすべて Claude Code が出力しています。</p>

  <h2>問題の要約</h2>
  <p>…</p>

  <h2>考え方</h2>
  <p>…（計算量もここで書く）</p>

  <h2>動かして確認する</h2>
  <p>入力例1を使います。…（図の見方を一言）</p>

  <section class="player" aria-label="アルゴリズムのステップ再生">
    <!-- 図（ページ固有） -->

    <div class="explain" aria-live="polite">
      <h3 id="step-title"></h3>
      <p id="step-text"></p>
    </div>

    <div class="answers" id="answers"></div>  <!-- 答えを並べる場合のみ -->

    <div class="controls">
      <button type="button" id="prev">← 前へ</button>
      <button type="button" id="next">次へ →</button>
      <button type="button" id="reset">最初から</button>
      <span class="progress" id="progress"></span>
    </div>
  </section>
</main>

<script src="./common/stepper.v1.js"></script>
<script>
  // 下の「JS」を参照
</script>
</body>
</html>
```

- `h2` の3節（問題の要約 / 考え方 / 動かして確認する）は全ページ共通。補足が必要なら節を足してよい
- `<link>` は `./common/...` の相対パスで書く（`file://`・devサーバー・S3 のどれでも解決できる）

## 共通CSS（base.v1.css）にあるもの

以下は**各ページの `<style>` に書かない**。中身は実ファイルを確認すること。

| 区分 | セレクタ |
|---|---|
| 変数 | `:root`（`--bg` `--panel` `--border` `--text` `--muted` `--primary` `--current` `--answer` `--removed`） |
| 土台 | `*` `body` `main` `h1` `h2` `p + p` `a` |
| ヘッダー | `.source` `.notice` |
| ステップUI | `.player` `.explain` `.explain h3` `.controls` `.progress` |
| フォーム | `button, select`（ボタン・セレクト本体） `select option` `button:disabled` `button:hover:not(:disabled)` |
| 部品 | `.label`（図の上の小見出し） `.answers div` `.answers div.done`（答えのチップ） `td.ok`（表の正解セル） |

色は必ず変数を使う（現在 = `--current`、確定・正解 = `--answer`、除外・NG = `--removed`、強調 = `--primary`）。

## 各ページで書くもの

- 図そのもの（`.stage` `.cell` `.bar` など、問題ごとに自由に命名）
- `.answers` のレイアウト（ページにより `display:flex` の詳細が違う）
- 表を使う場合: `.table-scroll` `table` `th, td` `th` `tr.pending td` `tr.current td` など
- `@media (prefers-reduced-motion: reduce)` で、そのページのアニメーション（transition）を止める

## JS

ステップ送りは `common/stepper.v1.js` の `createStepper` に任せ、ページには「データ・ステップ生成・描画」だけを書く。

`createStepper` が受け持つこと（**ページ側で書かない**）:

- `#step-title` / `#step-text` / `#progress` / `#prev` / `#next` / `#reset` の取得
- タイトル・説明の表示、`1 / N` の表示、前へ・次へボタンの無効化
- 前へ / 次へ / 最初から ボタンと ←→ キーの配線、最初の描画

ページ側の構成:

```js
  // 1. 入力例を定数で持つ
  const n = 5;

  // 2. 各ステップの状態を { title, text, ...状態 } の配列として先に全部作る
  function buildSteps(n) {
    const steps = [];
    // steps.push({ title: "準備", text: "…", ... });
    return steps;
  }

  const steps = buildSteps(n);

  // 3. 図などの要素を作る（ページ固有）

  // 4. 1ステップ分の描画（タイトル・説明・進捗・ボタンは書かない）
  function render(step, { index, steps }) {
    // step の状態を図に反映する
  }

  // 5. 最後に呼ぶ（render より後ろで宣言した変数も使えるよう、末尾に置く）
  createStepper({ steps, render });
```

- `render` の第2引数 `{ index, steps }` は必要なときだけ受け取る（例: 最後のステップを参照する `abc123_c.html`）
- 説明文に HTML（`<strong>` など）を使う場合は `createStepper({ steps, render, html: true })`（例: `abc166_d.html`）
- 入力例を切り替える場合は、戻り値の `setSteps` で作り直す。先頭のステップに戻る（例: `abc484_c.html`）

```js
  const stepper = createStepper({ steps, render });

  exampleSelect.addEventListener("change", () => {
    example = examples[Number(exampleSelect.value)];
    stepper.setSteps(buildSteps(example.a, example.b));
  });
```

## 共通ファイルを変えるとき

- **既存の `base.v1.css` / `stepper.v1.js` は上書きしない**（全ページに影響するため）。互換のない変更は `base.v2.css` / `stepper.v2.js` を新規作成し、使うページだけ切り替える
- `stepper.v1.js` は `type="module"` にしない（`file://` で開いたときに動かなくなるため）。公開するのは `window.createStepper` のみ
- 共通ファイルには stylelint がかかる: `npx stylelint "public/figures/common/*.css"`（`no-descending-specificity` に注意）

## 仕上げの確認

- `pnpm run dev` で `http://localhost:3000/figures/<問題ID>.html` を開き、全ステップを送って表示崩れがないか見る
- 問題データの `figure_url` に `/figures/<問題ID>.html` を設定するようユーザーに伝える
