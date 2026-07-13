import { NextRequest } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const cookie = req.headers.get("cookie");

  const res = await fetch(`${BASE_URL}/problems`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(cookie ? { cookie } : {}),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return new Response(null, { status: res.status });
  }

  const data = await res.json();

  return Response.json(data, { status: res.status });
}
