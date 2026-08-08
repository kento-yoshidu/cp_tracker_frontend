import { UpdateProblemInput } from "@/types";

export default async function updateProblemClient(
  id: string,
  input: UpdateProblemInput,
): Promise<void> {
  const res = await fetch(`/api/problems/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    throw new Error(`Failed to update problem: ${res.status}`);
  }
}
