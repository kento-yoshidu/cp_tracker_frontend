import { BASE_URL } from "@/constants/constants";
import type { NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  ctx: RouteContext<"/api/archives/[archive_id]">,
) {
  const { archive_id } = await ctx.params;

  const cookie = req.headers.get("cookie");

  const res = await fetch(`${BASE_URL}/archives/${archive_id}`, {
    method: "DELETE",
    headers: cookie ? { cookie } : {},
  });

  return new Response(null, { status: res.status });
}