import { apiFetch } from "@/lib/api";
import type { Activity, ApiGetActivityResponse } from "@/types";

const map = (a: ApiGetActivityResponse): Activity => {
  return {
    date: a.date,
    acCount: a.ac_count,
    maxDifficulty: a.max_difficulty,
  };
};

export default async function fetchActivities() {
  const data: ApiGetActivityResponse[] = await apiFetch("activities");

  return data.map(map);
}
