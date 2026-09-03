import { NextRequest, NextResponse } from "next/server";

const ENV = process.env.NEXT_PUBLIC_ENVIRONMENT!; // "local" | "preprod" | "production"
// Domains
const PREPROD_BASE_DOMAIN = process.env.NEXT_PUBLIC_PREPROD_BASE_DOMAIN!;
const PROD_BASE_DOMAIN = process.env.NEXT_PUBLIC_PROD_BASE_DOMAIN!;

// Regex for store path matching
const STORE_PATH_REGEX = /^\/store\/([^/]+)(\/.*)?$/;

// Reserved subdomains
const RESERVED_SUBDOMAINS = new Set(["www", "app", "admin", "api", "blog", "docs"]);

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  const currentHost = host.split(":")[0];
  const hostParts = currentHost.split(".");

  const runningOnLocalhost = currentHost === "localhost" || currentHost === "127.0.0.1" || ENV === "local";

  // Simple local development bypass
  if (runningOnLocalhost) {
    if (pathname.startsWith("/shop-local")) {
      url.pathname = `/store${url.pathname}`;
      return NextResponse.rewrite(url);
    }
    // Fix the 404 when you click buttons that go to /products
    if (pathname.startsWith("/products")) {
      url.pathname = `/store/shop-local${url.pathname}`;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  const isPreProdEnv = ENV === "preprod";
  const isProdEnv = ENV === "production";

  // Root vs subdomain
  const subdomain = hostParts.length >= 3 ? hostParts[0].toLowerCase() : null;
  const isRootDomain = hostParts.length <= 2;

  // 1. Handle redirect from /store/subdomain → subdomain.domain
  const storePathMatch = pathname.match(STORE_PATH_REGEX);
  if (isRootDomain && storePathMatch) {
    const storeSubdomain = storePathMatch[1].toLowerCase();
    const restPath = storePathMatch[2] || "";

    let redirectDomain: string;
    let protocol: string;
    let statusCode: number;

    if (isPreProdEnv) {
      protocol = "https";
      redirectDomain = `${storeSubdomain}.${PREPROD_BASE_DOMAIN}`;
      statusCode = 308;
    } else if (isProdEnv) {
      protocol = "https";
      redirectDomain = `${storeSubdomain}.${PROD_BASE_DOMAIN}`;
      statusCode = 308;
    } else {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL(`${protocol}://${redirectDomain}${restPath}${url.search}${url.hash}`), statusCode);
  }

  // Global paths that should NOT be rewritten to a specific store
  const GLOBAL_PATHS = [
    "/auth",
    "/cart",
    "/wishlist",
    "/edit-user-profile",
    "/orders",
    "/trackYourOrder",
    "/policy",
    "/faq",
    "/aboutUs",
    "/contact",
    "/careersAtKraya",
  ];

  // 2. Handle rewrite for subdomain.domain → /store/subdomain
  if (!isRootDomain && subdomain) {
    if (RESERVED_SUBDOMAINS.has(subdomain)) {
      return NextResponse.next();
    }

    const isGlobalPath = GLOBAL_PATHS.some(path => pathname.startsWith(path));
    if (isGlobalPath) {
      return NextResponse.next();
    }

    if (!url.pathname.startsWith(`/store/${subdomain}`)) {
      url.pathname = `/store/${subdomain}${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|_next/data|assets|favicon.ico|sw.js).*)"],
};
