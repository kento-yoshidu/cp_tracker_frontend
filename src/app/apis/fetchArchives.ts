import { apiFetch } from "@/lib/api";
import type { ApiGetArchivesResponse, Archives } from "@/types";

const map = (a: ApiGetArchivesResponse): Archives => {
  return {
    id: a.id,
    platform: a.platform,
    title: a.title,
    url: a.url,
    tags: a.tags,
    difficulty: a.difficulty,
    archivedAt: a.archived_at,
  };
};

export default async function fetchArchives() {
  const data = await apiFetch("archives");

  return data.map(map);
}
