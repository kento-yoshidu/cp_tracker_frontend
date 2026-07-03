import { apiFetch } from "@/lib/api";

export default async function fetchProblemsServer() {
  const res = apiFetch("problems");

  return res;
}
