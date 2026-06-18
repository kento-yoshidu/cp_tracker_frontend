import { apiFetch } from "@/lib/api";

export default function fetchProblemsServer() {
  const res = apiFetch("problems");

  return res;
}
