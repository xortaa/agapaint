import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export const config = { matcher: ["/admin/hub/:path*"] };

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  if (token && token.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.redirect(process.env.NEXTAUTH_URL);
  }

  if (!token) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/admin/signup`);
  }
}
