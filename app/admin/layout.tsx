import type { Metadata } from "next";
import "@/app/globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/auth/SessionProvider";
// Bootstrap
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
// Google font - Poppins
import { Poppins } from "next/font/google";
import { redirect } from "next/navigation";
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "AGAPAINT",
  description: "AGAPAINT WEBSITE",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  if (!session || session.user.email !== process.env.ADMIN_EMAIL) {
    redirect("/");
  }

  return (
    <html lang="en">
      <body className={poppins.className}>
        <SessionProvider session={session}>
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
