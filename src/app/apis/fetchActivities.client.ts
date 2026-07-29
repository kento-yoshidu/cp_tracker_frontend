import { apiFetch } from "@/lib/api";

export default async function fetchActivities() {
  const res = apiFetch("activities");

  return res;
}
