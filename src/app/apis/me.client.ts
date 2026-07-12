export default async function meClient(): Promise<boolean> {
  const res = await fetch("/api/me");
  return res.ok;
}
