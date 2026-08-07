import { snippets } from "@/data/snippets";
import { snippetHtml } from "@/data/snippets.generated";
import MenuDrawer from "./MenuDrawer";

export default function Menu() {
  const items = snippets.map((s) => ({
    ...s,
    html: snippetHtml[s.id] ?? "",
  }));

  return <MenuDrawer items={items} />;
}
