import { GoogleAnalytics } from '@next/third-parties/google'
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
      <body>
        {children}
        <GoogleAnalytics gaId="G-9P51KHL1MS" />
      </body>
    </html>
  );
}