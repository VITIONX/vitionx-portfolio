
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import ActiveSection from "./components/ActiveSection";
import MobileNav from "./components/MobileNav";
import ProjectInquiryModal from "./components/ProjectInquiryModal";

type ContactModalContextType = {
  openContactModal: () => void;
  closeContactModal: () => void;
};

const ContactModalContext = createContext<ContactModalContextType | undefined>(
  undefined
);

export function useContactModal() {
  const context = useContext(ContactModalContext);

  if (!context) {
    throw new Error("useContactModal must be used within Providers");
  }

  return context;
}

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  /*
   * Every normal click on a link to /contact ("Contact" in any menu,
   * "Let's Talk", footers ...) opens the project inquiry popup instead of
   * leaving the current page. This works on every page, including pages
   * that were written without the popup (the portfolio pages), and for
   * links added in the future.
   *
   * Not touched: ctrl / cmd / shift / middle click, links that open in a
   * new tab, and other websites - those behave as usual, so visiting
   * /contact directly (or without JavaScript) still shows the contact page.
   */
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!anchor) return;

      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      let url: URL;

      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;
      if (url.pathname.replace(/\/+$/, "") !== "/contact") return;

      event.preventDefault();
      event.stopPropagation(); // keeps Next.js <Link> from navigating
      setIsOpen(true);
    };

    // capture phase: runs before React / Next.js see the click
    document.addEventListener("click", handleClick, true);

    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return (
    <ContactModalContext.Provider
      value={{
        openContactModal: () => setIsOpen(true),
        closeContactModal: () => setIsOpen(false),
      }}
    >
      {children}
      <ActiveSection />
      <MobileNav onContactClick={() => setIsOpen(true)} />
      <ProjectInquiryModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </ContactModalContext.Provider>
  );
}
