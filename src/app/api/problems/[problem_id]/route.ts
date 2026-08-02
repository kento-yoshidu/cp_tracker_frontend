import { BASE_URL } from "@/constants/constants";
import type { NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  ctx: RouteContext<"/api/problems/[problem_id]">
) {
  const { problem_id } = await ctx.params;
  const body = await req.json();
  const cookie = req.headers.get("cookie");

  const res = await fetch(`${BASE_URL}/problems/${problem_id}`, {
    method: "PUT",
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

export async function DELETE(
  req: NextRequest,
  ctx: RouteContext<"/api/problems/[problem_id]">
) {
  const { problem_id } = await ctx.params;
  const cookie = req.headers.get("cookie");

  const res = await fetch(`${BASE_URL}/problems/${problem_id}`, {
    method: "DELETE",
    headers: cookie ? { cookie } : {},
  });

  return new Response(null, { status: res.status });
}
