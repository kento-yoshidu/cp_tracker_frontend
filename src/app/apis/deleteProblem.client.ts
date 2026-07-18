export default async function deleteProblemClient(id: string): Promise<void> {
  const res = await fetch(`/api/problems/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`Failed to delete problem: ${res.status}`);
  }
}
