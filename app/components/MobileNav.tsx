"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type MobileNavProps = {
  onContactClick: () => void;
};

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
] as const;

function isActivePath(pathname: string, target: string) {
  const current = pathname.replace(/\/+$/, "") || "/";
  const path = target.replace(/\/+$/, "") || "/";

  if (path === "/") return current === "/";

  return current === path || current.startsWith(path + "/");
}

/**
 * Top navigation bar for phones / small tablets.
 * The desktop menu (.nav) is hidden at 900px and below, so this bar
 * keeps every page reachable. It is hidden by CSS on larger screens.
 */
export default function MobileNav({ onContactClick }: MobileNavProps) {
  const pathname = usePathname() ?? "/";

  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      {NAV_ITEMS.map((item) => {
        const active = isActivePath(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`mobile-nav-link${active ? " active" : ""}`}
            aria-current={active ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}

      <button
        type="button"
        className="mobile-nav-link"
        onClick={onContactClick}
      >
        Contact
      </button>
    </nav>
  );
}
