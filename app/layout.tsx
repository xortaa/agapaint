import type { Metadata } from "next";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/auth/SessionProvider";
import { Next13NProgress, Link } from "nextjs13-progress";
// Bootstrap
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
// Google font - Poppins
import { Poppins } from "next/font/google";
const poppins = Poppins({
   subsets: ['latin'],
   display: 'swap',
   variable: '--font-poppins',
   weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
 });

export const metadata: Metadata = {
  title: "AGAPAINT",
  description: "AGAPAINT WEBSITE",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={poppins.className}>
        <SessionProvider session={session}>
          <main>{children}</main>
          <Next13NProgress color="#f1b038" height={5} />
        </SessionProvider>
      </body>
    </html>
  );
}
