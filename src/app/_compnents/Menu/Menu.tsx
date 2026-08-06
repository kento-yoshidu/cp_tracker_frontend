import { createHighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import { bundledLanguages } from "shiki/langs";
import { bundledThemes } from "shiki/themes";
import { snippets } from "@/data/snippets";
import MenuDrawer from "./MenuDrawer";

export default async function Menu() {
  const highlighter = await createHighlighterCore({
    langs: [bundledLanguages.rust],
    themes: [bundledThemes["github-dark"]],
    engine: createJavaScriptRegexEngine(),
  });

  const items = snippets.map((s) => ({
    ...s,
    html: highlighter.codeToHtml(s.code, { lang: "rust", theme: "github-dark" }),
  }));

  return <MenuDrawer items={items} />;
}
