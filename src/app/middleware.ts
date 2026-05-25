import { NextResponse } from "next/server";

import type {
  NextRequest,
} from "next/server";

export function middleware(
  request: NextRequest
) {

  const pathname =
    request.nextUrl.pathname;

  // Routes المحمية

  const protectedRoutes = [

    "/dashboard",

    "/dashboard/artisan",

    "/dashboard/artisan/chats",

    "/dashboard/artisan/requests",

  ];

  // هل الصفحة محمية؟

  const isProtected =
    protectedRoutes.some(
      (route) =>
        pathname.startsWith(
          route
        )
    );

  // Session من cookies

  const accessToken =
    request.cookies.get(
      "sb-access-token"
    )?.value;

  // إذا لم يكن مسجل دخول

  if (
    isProtected &&
    !accessToken
  ) {

    return NextResponse.redirect(

      new URL(
        "/login",
        request.url
      )

    );

  }

  // Header إضافي

  const requestHeaders =
    new Headers(
      request.headers
    );

  requestHeaders.set(
    "x-pathname",
    pathname
  );

  return NextResponse.next({

    request: {

      headers:
        requestHeaders,

    },

  });

}

// Matcher

export const config = {

  matcher: [

    "/dashboard/:path*",

  ],

};