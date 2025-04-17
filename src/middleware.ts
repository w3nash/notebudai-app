import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import protectedRoutes from "./protected-routes";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("authjs.session-token");
  const { pathname } = request.nextUrl;

  // Find the matching route configuration
  const routeConfig = protectedRoutes.find((route) =>
    pathname.startsWith(route),
  );

  if (routeConfig) {
    // Redirect authenticated users away from login page
    if (token && pathname === "/login") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Redirect unauthenticated users trying to access protected routes
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next(); // Allow access if no conditions are met
}

// Protect all routes defined in the configuration
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
