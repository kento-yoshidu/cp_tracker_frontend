import { codeToHtml } from "shiki";
import { snippets } from "@/data/snippets";
import MenuDrawer from "./MenuDrawer";

export default async function Menu() {
  const items = await Promise.all(
    snippets.map(async (s) => ({
      ...s,
      html: await codeToHtml(s.code, { lang: "rust", theme: "github-dark" }),
    }))
  );

  return <MenuDrawer items={items} />;
}
