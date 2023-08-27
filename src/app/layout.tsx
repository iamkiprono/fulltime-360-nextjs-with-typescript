import DefaultNavbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./Context/AuthContext";
import { QueryProvider } from "./Context/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FullTime 360",
  description: "Get the latest Football News and Live matches",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} dark:text-[#DAFFFB] dark:bg-[#26292b]`}
      >
        <QueryProvider>
          <AuthContextProvider>
            <DefaultNavbar />
            <div className="max-w-7xl mx-auto md:p-6 p-2">{children}</div>
            <Toaster />
          </AuthContextProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
