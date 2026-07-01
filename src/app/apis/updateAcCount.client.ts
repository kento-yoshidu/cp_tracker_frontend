export default async function updateAcCountClient(id: string): Promise<void> {
  await new Promise((rev) => setTimeout(rev, 2000));

  const res = await fetch(`/api/problems/${id}/ac`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ac_count: 1 }),
  });

  if (!res.ok) {
    throw new Error(`Failed to update AC count: ${res.status}`);
  }
}
