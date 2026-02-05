import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SESSION_COOKIE_NAME } from "@/constants/constants";
import { cookies } from "next/headers";
import Header from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RateMyAOC",
  description: "A tool to help AOC students and teachers alike",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = (await cookies()).get(SESSION_COOKIE_NAME)?.value || null;
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header session={session} />
        {children}
      </body>
    </html>
  );
}
