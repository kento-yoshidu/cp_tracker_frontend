import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { createHighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import { bundledLanguages } from "shiki/langs";
import { bundledThemes } from "shiki/themes";
import { snippets } from "../src/data/snippets";

async function main() {
  const highlighter = await createHighlighterCore({
    langs: [bundledLanguages.rust],
    themes: [bundledThemes["github-dark"]],
    engine: createJavaScriptRegexEngine(),
  });

  const entries = snippets.map((s) => {
    const html = highlighter.codeToHtml(s.code, {
      lang: "rust",
      theme: "github-dark",
    });
    return `  "${s.id}": ${JSON.stringify(html)},`;
  });

  const output = `// このファイルは \`pnpm run snippets:build\` で自動生成されます。手動で編集しないでください。
export const snippetHtml: Record<string, string> = {
${entries.join("\n")}
};
`;

  writeFileSync(
    join(import.meta.dirname, "../src/data/snippets.generated.ts"),
    output,
  );
  console.log(`Generated snippets.generated.ts (${snippets.length} snippets)`);
}

main();
