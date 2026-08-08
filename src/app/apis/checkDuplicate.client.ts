export default async function checkDuplicateClient(
  url: string,
): Promise<boolean> {
  const res = await fetch(
    `/api/problems/check-duplicate?url=${encodeURIComponent(url)}`,
  );

  if (!res.ok) {
    throw new Error(`Failed to check duplicate: ${res.status}`);
  }

  const data: { exists: boolean } = await res.json();
  return data.exists;
}
