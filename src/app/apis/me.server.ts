import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function meServer(): Promise<boolean> {
  const cookieStore = await cookies();
  const cookie = cookieStore.toString();

  const res = await fetch(`${BASE_URL}/me`, {
    method: "GET",
    headers: cookie ? { cookie } : {},
    cache: "no-store",
  });

  return res.ok;
}
