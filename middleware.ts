import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { Locale, locales } from "./i18n-config";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const res = intlMiddleware(req);

  const urlLocale = req.nextUrl.pathname.split("/")[1] as Locale;
  const currentLocale = req.cookies.get("NEXT_LOCALE");
  console.log(urlLocale);
  console.log(currentLocale);
  // If no locale is found in the URL and there's a locale in the cookie, redirect
  if (
    !urlLocale &&
    currentLocale &&
    locales.includes(currentLocale as unknown as Locale)
  ) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = `/${currentLocale}${redirectUrl.pathname.replace(
      /^\/+/,
      ""
    )}`; // Ensure no extra slashes

    // Perform the redirection to the correct path with locale
    return NextResponse.redirect(redirectUrl);
  } else {
    // If the URL has a valid locale, use it; otherwise, default to 'en'
    const locale = locales.includes(urlLocale) ? urlLocale : "en";
    res.cookies.set("NEXT_LOCALE", locale);
  }

  return res;
}

export const config = {
  matcher: ["/", "/(kr|en)/:path*"],
};
