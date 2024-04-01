import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/admin/signup", "/admin/hub/:path*", "/customer/appointment", "/customer/appointment/payment", "/booking"],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  if (request.nextUrl.pathname === "/admin/signup" && token && token.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}`);
  }

  if (
    request.nextUrl.pathname.startsWith("/admin/hub") &&
    token &&
    token.email !== process.env.ADMIN_EMAIL
  ) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}`);
  }

  if (
    request.nextUrl.pathname.startsWith("/admin/hub") &&
    (!token || token.email !== process.env.ADMIN_EMAIL)
  ) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/admin/signup`);
  }

  if (
    !token &&
    (request.nextUrl.pathname.startsWith("/customer/appointment") || request.nextUrl.pathname === "/booking")
  ) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/customer/signup`);
  }

  return NextResponse.next();
}
