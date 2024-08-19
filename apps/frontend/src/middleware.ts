import { NextAuth } from "@template/auth";

import { authConfig } from "@template/auth";

export const { auth: middleware } = NextAuth(authConfig);

// Optionally, only invoke Middleware on some paths
export const config = {
  matcher: [
    "/((?!api|static|.*\\..*|_next|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
