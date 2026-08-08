import { NextRequest, NextResponse } from "next/server";
import { BASE_URL } from "@/constants/constants";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!res.ok) {
    return new NextResponse(null, { status: res.status });
  }

  const setCookie = res.headers.get("set-cookie");
  const response = new NextResponse(null, { status: 200 });

  if (setCookie) {
    response.headers.set("set-cookie", setCookie);
  }

  return response;
}
