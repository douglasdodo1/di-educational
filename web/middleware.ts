import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ROUTES = {
  PUBLIC: ["/login", "/register"],
  PRIVATE: ["/home"],
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  const { pathname } = req.nextUrl;

  if (pathname === "/") {
    return token ? NextResponse.redirect(new URL("/home", req.url)) : NextResponse.redirect(new URL("/login", req.url));
  }

  const isPublicRoute = ROUTES.PUBLIC.some((r) => pathname.startsWith(r));
  const isPrivateRoute = ROUTES.PRIVATE.some((r) => pathname.startsWith(r));

  if (!token && isPrivateRoute) return NextResponse.redirect(new URL("/login", req.url));
  if (token && isPublicRoute) return NextResponse.redirect(new URL("/home", req.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
