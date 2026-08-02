import { apiFetch } from "@/lib/api";

export default function fetchArchives() {
  const res = apiFetch("archives");

  return res;
}
