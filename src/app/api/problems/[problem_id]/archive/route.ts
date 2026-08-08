import type { NextRequest } from "next/server";
import { BASE_URL } from "@/constants/constants";

export async function POST(
  req: NextRequest,
  ctx: RouteContext<"/api/problems/[problem_id]/archive">,
) {
  const { problem_id } = await ctx.params;
  const cookie = req.headers.get("cookie");

  const res = await fetch(`${BASE_URL}/problems/${problem_id}/archive`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(cookie ? { cookie } : {}),
    },
  });

  if (!res.ok) {
    return new Response(null, { status: res.status });
  }

  const data = await res.json();

  return Response.json(data, { status: res.status });
}
