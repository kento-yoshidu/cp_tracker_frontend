type TagColor = {
  bg: string;
  text: string;
};

const TAG_COLORS: Record<string, TagColor> = {
  // DP: インディゴ → バイオレット
  動的計画法:
    { bg: "linear-gradient(135deg, #4338ca, #7c3aed)", text: "#fff" },
  "動的計画法-ナップサック":
    { bg: "linear-gradient(135deg, #4338ca, #7c3aed)", text: "#fff" },
  // 二分探索: バイオレット → パープル
  二分探索:
    { bg: "linear-gradient(135deg, #7c3aed, #a21caf)", text: "#fff" },
  lower_bound:
    { bg: "linear-gradient(135deg, #7c3aed, #a21caf)", text: "#fff" },
  // その他
  greedy:          { bg: "linear-gradient(135deg, #059669, #0891b2)", text: "#fff" },
  "binary-search": { bg: "linear-gradient(135deg, #d97706, #ea580c)", text: "#fff" },
  bfs:             { bg: "linear-gradient(135deg, #0891b2, #0284c7)", text: "#fff" },
  dfs:             { bg: "linear-gradient(135deg, #0284c7, #1d4ed8)", text: "#fff" },
  math:            { bg: "linear-gradient(135deg, #db2777, #be185d)", text: "#fff" },
  string:          { bg: "linear-gradient(135deg, #c2410c, #b91c1c)", text: "#fff" },
  sorting:         { bg: "linear-gradient(135deg, #65a30d, #059669)", text: "#fff" },
  "segment-tree":  { bg: "linear-gradient(135deg, #9333ea, #7c3aed)", text: "#fff" },
  "Union Find":    { bg: "linear-gradient(135deg, #0f766e, #0891b2)", text: "#fff" },
  "shortest-path": { bg: "linear-gradient(135deg, #1d4ed8, #4338ca)", text: "#fff" },
  tree:            { bg: "linear-gradient(135deg, #15803d, #059669)", text: "#fff" },
  bit:             { bg: "linear-gradient(135deg, #b45309, #ca8a04)", text: "#fff" },
  "two-pointers":  { bg: "linear-gradient(135deg, #be185d, #db2777)", text: "#fff" },
  simulation:      { bg: "linear-gradient(135deg, #475569, #6b7280)", text: "#fff" },
  geometry:        { bg: "linear-gradient(135deg, #b91c1c, #be185d)", text: "#fff" },
  "number-theory": { bg: "linear-gradient(135deg, #6d28d9, #9333ea)", text: "#fff" },
};

const DEFAULT_COLOR: TagColor = { bg: "#6b7280", text: "#fff" };

export function getTagColor(tagName: string): TagColor {
  return TAG_COLORS[tagName] ?? DEFAULT_COLOR;
}
