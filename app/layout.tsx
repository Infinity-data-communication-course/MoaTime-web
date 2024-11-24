import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
