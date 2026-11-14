
"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => {
    setOpen(false);
  };

  const normalizePath = (path: string) => {
    if (path === "/") return "/";
    return path.replace(/\/+$/, "");
  };

  const isActive = (path: string) => {
    return normalizePath(pathname) === normalizePath(path);
  };

  return (
    <>
      <button
        type="button"
        className={`mobile-menu-button ${open ? "active" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <nav>
          <a href="/" onClick={closeMenu} className={isActive("/") ? "active" : ""} aria-current={isActive("/") ? "page" : undefined}>
            Home
          </a>

          <a href="/about" onClick={closeMenu} className={isActive("/about") ? "active" : ""} aria-current={isActive("/about") ? "page" : undefined}>
            About
          </a>

          <a href="/services" onClick={closeMenu} className={isActive("/services") ? "active" : ""} aria-current={isActive("/services") ? "page" : undefined}>
            Services
          </a>

          <a href="/portfolio" onClick={closeMenu} className={isActive("/portfolio") ? "active" : ""} aria-current={isActive("/portfolio") ? "page" : undefined}>
            Portfolio
          </a>

          <a href="/contact" onClick={closeMenu} className={isActive("/contact") ? "active" : ""} aria-current={isActive("/contact") ? "page" : undefined}>
            Contact
          </a>
        </nav>

        <a
          href="mailto:ahmedsakib857@gmail.com"
          className="mobile-menu-cta"
          onClick={closeMenu}
        >
          Start a Project
          <span>↗</span>
        </a>
      </div>
    </>
  );
}
