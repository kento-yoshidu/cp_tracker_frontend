import { apiFetch } from "@/lib/api";
import type { ApiGetProblemsResponse, Problem } from "@/types";

const map = (a: ApiGetProblemsResponse): Problem => {
  return {
    id: a.id,
    platform: a.platform,
    title: a.title,
    url: a.url,
    tags: a.tags,
    difficulty: a.difficulty,
    acCount: a.ac_count,
    lastSolvedAt: a.last_solved_at,
  };
};

export default async function fetchProblemsServer() {
  const data: ApiGetProblemsResponse[] = await apiFetch("problems");

  return data.map(map);
}
