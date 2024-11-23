import type { Metadata } from "next";
import "./globals.css";
import { useEffect } from "react";
import { redirect, usePathname } from "next/navigation";
import getToken from "@/lib/get-token";

export const metadata: Metadata = {
  title: "MoaTime",
  description: "gather team members at the same time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`h-screen w-full px-64 py-14`}>{children}</body>
    </html>
  );
}
