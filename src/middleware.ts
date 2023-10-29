import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { GetEmployeeAccessPayload } from "@/server/actions";

const LOGIN_PAGE = "/auth/login";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const isOnLoginPage = request.nextUrl.pathname.startsWith(LOGIN_PAGE);
  let isLoggedIn = false;

  try {
    const employeePayload = await GetEmployeeAccessPayload();
    isLoggedIn = !!employeePayload.user;
  } catch (err) {
    // No Auth?
  }

  if (isOnLoginPage && isLoggedIn) {
    return NextResponse.redirect(
      new URL(`/command-center/dashboard`, request.url),
    );
  }
  if (!isOnLoginPage && !isLoggedIn) {
    return NextResponse.redirect(
      new URL(`/command-center${LOGIN_PAGE}`, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - website-api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - static (folder in public)
   * - favicon.ico (favicon file)
   */
  matcher: ["/((?!website-api|_next/static|_next/image|static|favicon.ico).*)"],
};
