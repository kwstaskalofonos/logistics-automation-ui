import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.scss';
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import NextAuthProvider from "@/components/NextAuthProvider";
import Footer from "@/components/Footer";
import Modal from "@/components/modal/Modal";

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
          <div className="flex flex-col md:flex-row md:min-h-[calc(100vh)]">
            <div className="bg-neutral-700 text-zinc-200 pl-4 pr-6 pt-3 pb-3">
              <Sidebar />
            </div>
            <div className="flex-grow pl-4 pr-6">
              <Navbar/>
              {children}
            </div>
          </div>
          <Modal/>
        </NextAuthProvider>
      </body>
    </html>
  );
}
