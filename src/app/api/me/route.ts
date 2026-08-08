import { type NextRequest, NextResponse } from "next/server";
import { BASE_URL } from "@/constants/constants";

export async function GET(req: NextRequest) {
  const cookie = req.headers.get("cookie");

  const res = await fetch(`${BASE_URL}/me`, {
    method: "GET",
    headers: cookie ? { cookie } : {},
  });

  return new NextResponse(null, { status: res.status });
}
