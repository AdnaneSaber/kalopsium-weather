import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { Locale, locales } from "./i18n-config";

const intlMiddleware = createMiddleware({
  defaultLocale: "en",
  locales,
  localeDetection: false,
});

export default async function middleware(req: NextRequest) {
  const res = intlMiddleware(req);

  const urlLocale = req.nextUrl.pathname.split("/")[1] as Locale;

  const locale = locales.includes(urlLocale) ? urlLocale : "en";

  res.cookies.set("NEXT_LOCALE", locale);

  return res;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
