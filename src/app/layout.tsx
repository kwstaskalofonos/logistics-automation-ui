import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.scss';
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import NextAuthProvider from "@/components/NextAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Logistics Automation",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Navbar />
          <div className="columns mt-2">
            <div className="column is-1">
              <Sidebar/>
            </div>
            <div className="column">
              {children}
            </div>
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
