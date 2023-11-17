import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { GetEmployeeAccessPayload, GetShop } from "@/server/actions";
import { GetApiVersion } from "@/client/api";

const LOGIN_PAGE = "/auth/login";
const INSTALL_PAGE = "/install";
const ERROR_PAGE = "/error";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  // Check API Version: is it healthy?
  const apiVersion = await GetApiVersion();
  if (!apiVersion?.ok || !apiVersion?.version) {
    // Api is not good...
    const isOnErrorPage = request.nextUrl.pathname.startsWith(ERROR_PAGE);

    if (!isOnErrorPage) {
      const errorMessage = "Main API is not responding";
      return NextResponse.redirect(
        new URL(`/command-center/error?message=${errorMessage}`, request.url),
      );
    }

    return NextResponse.next();
  }

  // Check if shop is OK
  const shop = await GetShop();
  if (!shop) {
    const isOnInstallPage = request.nextUrl.pathname.startsWith(INSTALL_PAGE);

    if (!isOnInstallPage) {
      return NextResponse.redirect(
        new URL(`/command-center/install`, request.url),
      );
    }

    return NextResponse.next();
  }

  // Need to log in?
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
