import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(req: NextRequest) {
  const cookie = req.headers.get("cookie");

  const res = await fetch(`${BASE_URL}/me`, {
    method: "GET",
    headers: cookie ? { cookie } : {},
  });

  return new NextResponse(null, { status: res.status });
}
