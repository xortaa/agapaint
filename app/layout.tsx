import type { Metadata } from "next";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/auth/SessionProvider";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
export const metadata: Metadata = {
  title: "AGAPAINT",
  description: "AGAPAINT WEBSITE",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
