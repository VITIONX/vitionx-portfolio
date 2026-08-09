"use client";

import { useState } from "react";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
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
          <a href="#home" onClick={closeMenu}>
            Home
          </a>

          <a href="#about" onClick={closeMenu}>
            About
          </a>

          <a href="#services" onClick={closeMenu}>
            Services
          </a>

          <a href="#portfolio" onClick={closeMenu}>
            Portfolio
          </a>

          <a href="#contact" onClick={closeMenu}>
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