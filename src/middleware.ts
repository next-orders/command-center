import { NextRequest } from "next/server";
import { GetEmployeeAccessPayload } from "@/server/actions";

const LOGIN_PAGE = "/auth/login";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;

  const isOnLoginPage = url.pathname.startsWith(LOGIN_PAGE);

  let isLoggedIn = false;

  try {
    const employeePayload = await GetEmployeeAccessPayload();
    isLoggedIn = !!employeePayload.user;
  } catch (err) {
    // No Auth?
  }

  if (isOnLoginPage && isLoggedIn) {
    return Response.redirect(new URL(`/command-center`, url));
  }
  if (!isOnLoginPage && !isLoggedIn) {
    return Response.redirect(new URL(`/command-center${LOGIN_PAGE}`, url));
  }
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|static|favicon.ico).*)"],
};
