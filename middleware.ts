import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { Locale, locales } from "./i18n-config";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const res = intlMiddleware(req);

  const urlLocale = req.nextUrl.pathname.split("/")[1] as Locale;
  const currentLocale = req.cookies.get("NEXT_LOCALE");
  if (
    !urlLocale &&
    currentLocale &&
    locales.includes(currentLocale as unknown as Locale)
  ) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = `/${currentLocale}${redirectUrl.pathname.replace(
      /^\/+/,
      ""
    )}`;

    return NextResponse.redirect(redirectUrl);
  } else {
    const locale = locales.includes(urlLocale) ? urlLocale : "en";
    res.cookies.set("NEXT_LOCALE", locale);
  }

  return res;
}

export const config = {
  matcher: ["/", "/(kr|en)/:path*"],
};
