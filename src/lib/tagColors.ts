type TagColor = {
  bg: string;
  text: string;
};

const TAG_COLORS: Record<string, TagColor> = {
  // グラフ探索
  BFS:          { bg: "linear-gradient(135deg, #0891b2, #0284c7)", text: "#fff" },
  DFS:          { bg: "linear-gradient(135deg, #0891b2, #0284c7)", text: "#fff" },
  多始点BFS:      { bg: "linear-gradient(135deg, #0891b2, #0284c7)", text: "#fff" },
  tree:         { bg: "linear-gradient(135deg, #0891b2, #0284c7)", text: "#fff" },
  "Union Find": { bg: "linear-gradient(135deg, #0891b2, #0284c7)", text: "#fff" },
  連結成分:       { bg: "linear-gradient(135deg, #0891b2, #0284c7)", text: "#fff" },
  弱連結成分:      { bg: "linear-gradient(135deg, #0891b2, #0284c7)", text: "#fff" },
  有向グラフ:      { bg: "linear-gradient(135deg, #0891b2, #0284c7)", text: "#fff" },

  // 最短経路
  最短経路:        { bg: "linear-gradient(135deg, #1d4ed8, #4338ca)", text: "#fff" },
  重み付きグラフ:    { bg: "linear-gradient(135deg, #1d4ed8, #4338ca)", text: "#fff" },
  DAG:            { bg: "linear-gradient(135deg, #1d4ed8, #4338ca)", text: "#fff" },
  ダイクストラ法:      { bg: "linear-gradient(135deg, #1d4ed8, #4338ca)", text: "#fff" },
  逆向きダイクストラ:    { bg: "linear-gradient(135deg, #1d4ed8, #4338ca)", text: "#fff" },
  ベルマンフォード法:    { bg: "linear-gradient(135deg, #1d4ed8, #4338ca)", text: "#fff" },
  ワーシャルフロイド法:   { bg: "linear-gradient(135deg, #1d4ed8, #4338ca)", text: "#fff" },

  // 全域木
  クラスカル法:     { bg: "linear-gradient(135deg, #0e7490, #1d4ed8)", text: "#fff" },
  プリム法:        { bg: "linear-gradient(135deg, #0e7490, #1d4ed8)", text: "#fff" },
  全域木:         { bg: "linear-gradient(135deg, #0e7490, #1d4ed8)", text: "#fff" },
  最小全域木:      { bg: "linear-gradient(135deg, #0e7490, #1d4ed8)", text: "#fff" },

  // DP
  動的計画法: { bg: "linear-gradient(135deg, #4338ca, #7c3aed)", text: "#fff" },
  部分和問題: { bg: "linear-gradient(135deg, #4338ca, #7c3aed)", text: "#fff" },

  // 探索系
  二分探索:          { bg: "linear-gradient(135deg, #7c3aed, #a21caf)", text: "#fff" },
  lower_bound:      { bg: "linear-gradient(135deg, #7c3aed, #a21caf)", text: "#fff" },
  "binary-search":  { bg: "linear-gradient(135deg, #7c3aed, #a21caf)", text: "#fff" },

  // 貪欲・実装トリック
  greedy:         { bg: "linear-gradient(135deg, #059669, #0891b2)", text: "#fff" },
  simulation:     { bg: "linear-gradient(135deg, #059669, #0891b2)", text: "#fff" },
  "two-pointers": { bg: "linear-gradient(135deg, #059669, #0891b2)", text: "#fff" },
  尺取り法:        { bg: "linear-gradient(135deg, #059669, #0891b2)", text: "#fff" },
  imos法:          { bg: "linear-gradient(135deg, #059669, #0891b2)", text: "#fff" },
  sorting:        { bg: "linear-gradient(135deg, #059669, #0891b2)", text: "#fff" },
  sort:           { bg: "linear-gradient(135deg, #059669, #0891b2)", text: "#fff" },
  配列インデックス:     { bg: "linear-gradient(135deg, #059669, #0891b2)", text: "#fff" },

  // 数学
  math:            { bg: "linear-gradient(135deg, #db2777, #be185d)", text: "#fff" },
  "number-theory": { bg: "linear-gradient(135deg, #db2777, #be185d)", text: "#fff" },
  bit:             { bg: "linear-gradient(135deg, #db2777, #be185d)", text: "#fff" },
  geometry:        { bg: "linear-gradient(135deg, #db2777, #be185d)", text: "#fff" },
  bit全探索:         { bg: "linear-gradient(135deg, #db2777, #be185d)", text: "#fff" },

  // 文字列
  文字列:          { bg: "linear-gradient(135deg, #c2410c, #b91c1c)", text: "#fff" },
  ローリングハッシュ: { bg: "linear-gradient(135deg, #c2410c, #b91c1c)", text: "#fff" },

  // データ構造
  "segment-tree": { bg: "linear-gradient(135deg, #9333ea, #7c3aed)", text: "#fff" },
  "Segment Tree": { bg: "linear-gradient(135deg, #9333ea, #7c3aed)", text: "#fff" },
  queue:          { bg: "linear-gradient(135deg, #9333ea, #7c3aed)", text: "#fff" },
  HashMap:        { bg: "linear-gradient(135deg, #9333ea, #7c3aed)", text: "#fff" },
  HashSet:        { bg: "linear-gradient(135deg, #9333ea, #7c3aed)", text: "#fff" },
  BtreeMap:       { bg: "linear-gradient(135deg, #9333ea, #7c3aed)", text: "#fff" },
  BtreeSet:       { bg: "linear-gradient(135deg, #9333ea, #7c3aed)", text: "#fff" },
  VecDeque:       { bg: "linear-gradient(135deg, #9333ea, #7c3aed)", text: "#fff" },
};

const DEFAULT_COLOR: TagColor = { bg: "#6b7280", text: "#fff" };

export function getTagColor(tagName: string): TagColor {
  return TAG_COLORS[tagName] ?? DEFAULT_COLOR;
}
