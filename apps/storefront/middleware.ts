import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Since we are not using subdomains, we can just pass-through everything.
  // All routing is handled by standard Next.js path-based routes (e.g. /store/[name]).
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|_next/data|assets|favicon.ico|sw.js).*)"],
};
