"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Keeps <html data-section="..."> in sync with the current page
 * (home, portfolio, services, about, contact ...). The desktop menu
 * highlight in globals.css reads this attribute, so every page gets the
 * orange active link without editing each page's header.
 *
 * The very first value is set by a tiny inline script in layout.tsx
 * (so there is no flash on a fresh load); this component keeps it correct
 * when the visitor moves between pages.
 */
export default function ActiveSection() {
  const pathname = usePathname();

  useEffect(() => {
    const clean = (pathname ?? "/").replace(/\/+$/, "");
    const section = clean.split("/")[1] || "home";

    document.documentElement.setAttribute("data-section", section);
  }, [pathname]);

  return null;
}
