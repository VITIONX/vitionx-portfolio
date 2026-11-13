
"use client";

import { createContext, useContext, useState } from "react";
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

  return (
    <ContactModalContext.Provider
      value={{
        openContactModal: () => setIsOpen(true),
        closeContactModal: () => setIsOpen(false),
      }}
    >
      {children}
      <ProjectInquiryModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </ContactModalContext.Provider>
  );
}
