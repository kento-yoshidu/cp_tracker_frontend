import type { CreateProblemInput } from "@/types";

export default async function createNewProblemClient(
  input: CreateProblemInput,
): Promise<void> {
  const res = await fetch(`/api/problems`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    throw new Error(`Failed to create problem: ${res.status}`);
  }
}
