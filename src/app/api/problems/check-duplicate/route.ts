import type { NextRequest } from "next/server";
import { BASE_URL } from "@/constants/constants";

export async function GET(req: NextRequest) {
  await new Promise((rev) => setTimeout(rev, 1000));

  const url = req.nextUrl.searchParams.get("url") ?? "";

  const res = await fetch(
    `${BASE_URL}/problems/check-duplicate?url=${encodeURIComponent(url)}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    },
  );

  if (!res.ok) {
    return new Response(null, { status: res.status });
  }

  const data = await res.json();

  return Response.json(data, { status: res.status });
}
