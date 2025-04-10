import { updateSession } from "@/lib/supabase/middleware";

import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/dashboard/articles") {
    // 生成UUID并构建新URL
    const uuid = crypto.randomUUID();
    const url = new URL(request.url);
    url.pathname = `/dashboard/articles/${uuid}`;
    return NextResponse.redirect(url);
  }
  // update user's auth session
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
