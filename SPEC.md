# フロントエンド仕様書

## 復習インターバルと Solve バッジ

`ac_count` と `last_solved_at` から算出する。バックエンド・DB の変更は不要。

### インターバル定義

| ac_count | 次の Solve 条件 |
|---|---|
| 0 | 常時表示 |
| 1 | last_solved_at から 3 日後 |
| 2 | last_solved_at から 7 日後 |
| 3 | last_solved_at から 30 日後 |
| 4 | last_solved_at から 60 日後 |
| 5 以上 | 完了（Solve バッジなし） |

### Solve バッジ

条件を満たした問題には **「Solve!」** バッジを表示する。

### 完了判定

`ac_count >= 5` で完了とみなす。DB にフィールドは持たない。
