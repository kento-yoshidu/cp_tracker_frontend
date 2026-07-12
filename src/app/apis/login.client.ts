export default async function loginClient(
  username: string,
  password: string,
): Promise<void> {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
    }),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to login: ${res.status}`);
  }
}
