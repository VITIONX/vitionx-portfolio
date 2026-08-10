import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VITIONX — Strategic Brand Designer",
  description:
    "Sakib is a Strategic Brand Designer creating memorable, professional and meaningful visual identities.",
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