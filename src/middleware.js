import { NextResponse } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { i18n } from "./i18n.config";
import { clerkMiddleware } from "@clerk/nextjs/server"

function getLocale(request) {
  const negotiatorHeaders = {};
  request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  const locales = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  let locale = "";

  try {
    locale = matchLocale(languages, locales, i18n.defaultLocal);
  } catch (error) {
    locale = i18n.defaultLocal;
  }

  return locale;
}



export async function middleware(request) {
  // Run Clerk middleware first
  const clerkResponse = await clerkMiddleware(request);
  if (clerkResponse instanceof Response) {
    // If Clerk returns a Response (like a redirect), use it
    return clerkResponse;
  }

 

  // --- Your locale logic below ---
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);

  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}`)
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  // Matcher ignoring `/_next/`, `/api/`, ..etc
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
