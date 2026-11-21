import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "VITIONX — Strategic Brand Designer",
  description:
    "Sakib is a Strategic Brand Designer creating memorable, professional and meaningful visual identities.",
};

// Runs before the page paints: marks which section we are in, so the
// desktop menu can highlight the active page without a flash.
const activeSectionScript = `(function(){try{var s=location.pathname.split("/")[1]||"home";document.documentElement.setAttribute("data-section",s);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: activeSectionScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
        <GoogleAnalytics gaId="G-9P51KHL1MS" />
      </body>
    </html>
  );
}
