export default async function createNewProblemClient(): Promise<void> {
  const body = {
    platform: "AtCoder",
    url: "jga",
    title: "テスト",
    tags: ["hoge"],
    difficulty: 999,
  };

  const res = await fetch(`/api/problems`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Failed to create problem: ${res.status}`);
  }
}
