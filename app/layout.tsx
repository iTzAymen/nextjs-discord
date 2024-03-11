import type { Metadata } from "next";
import "./globals.css";
import { whitney } from "./ui/fonts";

export const metadata: Metadata = {
  title: "Next Discord",
  description: "a discord clone test project built using NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={whitney.className}>{children}</body>
    </html>
  );
}
