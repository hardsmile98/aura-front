import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isValidLocale, defaultLocale } from "./lib/i18n";

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const segments = pathname.split("/").filter(Boolean);
  const locale = segments[0];
  const response = NextResponse.next();

  if (isValidLocale(locale)) {
    response.headers.set("x-next-locale", locale);
  } else {
    response.headers.set("x-next-locale", defaultLocale);
  }

  return response;
}
