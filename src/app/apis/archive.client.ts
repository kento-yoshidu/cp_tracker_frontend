export default async function archiveClient(id: string) {
  await new Promise((rev) => setTimeout(rev, 1000));

  const res = await fetch(`/api/problems/${id}/archive`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Failed to archive: ${res.status}`);
  }
}
