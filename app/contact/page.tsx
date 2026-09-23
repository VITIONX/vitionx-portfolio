"use client";

import { useState } from "react";

type FormStatus = "idle" | "success" | "error";

type SocialIconProps = {
  type: "facebook" | "youtube" | "instagram" | "linkedin";
};

function SocialIcon({ type }: SocialIconProps) {
  if (type === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13.5 8H16V4.5C15.57 4.44 14.59 4.33 13.42 4.33C10.98 4.33 9.31 5.82 9.31 8.55V11.5H6.65V15.4H9.31V24H13.42V15.4H16.08L16.5 11.5H13.42V8.87C13.42 8.3 13.58 8 13.5 8Z" />
      </svg>
    );
  }

  if (type === "youtube") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.5 6.2C23.2 5.05 22.6 4.1 21.45 3.8C19.35 3.25 12 3.25 12 3.25C12 3.25 4.65 3.25 2.55 3.8C1.4 4.1 0.8 5.05 0.5 6.2C0 8.3 0 12 0 12C0 12 0 15.7 0.5 17.8C0.8 18.95 1.4 19.9 2.55 20.2C4.65 20.75 12 20.75 12 20.75C12 20.75 19.35 20.75 21.45 20.2C22.6 19.9 23.2 18.95 23.5 17.8C24 15.7 24 12 24 12C24 12 24 8.3 23.5 6.2ZM9.6 16.25V7.75L16.5 12L9.6 16.25Z" />
      </svg>
    );
  }

  if (type === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle
          cx="17.4"
          cy="6.7"
          r="1"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5.2 3.5C3.98 3.5 3 4.48 3 5.7C3 6.92 3.98 7.9 5.2 7.9C6.42 7.9 7.4 6.92 7.4 5.7C7.4 4.48 6.42 3.5 5.2 3.5ZM3.35 9.55H7.05V20.5H3.35V9.55ZM9.2 9.55H12.75V11.05H12.8C13.3 10.1 14.5 9.1 16.5 9.1C20.25 9.1 20.95 11.55 20.95 14.75V20.5H17.25V15.4C17.25 14.18 17.22 12.62 15.55 12.62C13.85 12.62 13.6 13.95 13.6 15.32V20.5H9.9V9.55H9.2Z" />
    </svg>
  );
}

const socialLinks = [
  {
    type: "facebook" as const,
    label: "Facebook",
    href: "https://www.facebook.com/VITIONX",
  },
  {
    type: "youtube" as const,
    label: "YouTube",
    href: "https://www.youtube.com/@VITIONX",
  },
  {
    type: "instagram" as const,
    label: "Instagram",
    href: "https://www.instagram.com/vitionx",
  },
  {
    type: "linkedin" as const,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/vitionx",
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] =
    useState<FormStatus>("idle");

  return (
    <>
      {/* =========================
          HEADER
      ========================= */}

      <header className="header">
        <div className="logo">
          <a href="/">
            <img src="/logo.svg" alt="VITIONX" />
          </a>
        </div>

        <nav
          className="nav"
          aria-label="Main navigation"
        >
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/portfolio">Portfolio</a>
          <a href="/services">Services</a>
          <a href="/contact">Contact</a>
        </nav>

        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <a
            href="/contact"
            className="header-cta"
          >
            Let's Talk <span>→</span>
          </a>

          <div
            className="header-socials"
            aria-label="Social media links"
          >
            {socialLinks.map((social) => (
              <a
                key={social.type}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="header-social-link"
                aria-label={`Visit VITIONX on ${social.label}`}
                title={social.label}
              >
                <SocialIcon type={social.type} />
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* =========================
          CONTACT
      ========================= */}

<main className="site">
  <section className="contact-section contact-page-section">
    <div className="contact-page-heading">
      <p className="section-label">
        GET IN TOUCH
      </p>

      <h1>
        Have a project in mind?
      </h1>

            <p>
              Let's create something strategic,
              memorable and professionally
              designed for your brand.
            </p>

            <a
              href="mailto:ahmedsakib857@gmail.com"
              className="contact-email"
            >
              ahmedsakib857@gmail.com
            </a>
          </div>

          {/* =========================
              PROJECT FORM
          ========================= */}

          <div className="contact-form-card">

            <form
              className="project-form contact-project-form"
              onSubmit={async (e) => {
                e.preventDefault();

                setIsSubmitting(true);
                setFormStatus("idle");

                const form = e.currentTarget;
                const formData = new FormData(form);

                const data = {
                  name: formData.get("name"),
                  email: formData.get("email"),
                  company: formData.get("company"),
                  projectType:
                    formData.get("projectType"),
                  budget: formData.get("budget"),
                  message: formData.get("message"),
                };

                try {
                  const response = await fetch(
                    "/api/contact",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type":
                          "application/json",
                      },
                      body: JSON.stringify(data),
                    }
                  );

                  const result =
                    await response.json();

                  if (
                    !response.ok ||
                    !result.success
                  ) {
                    throw new Error(
                      result.message ||
                        "Something went wrong."
                    );
                  }

                  setFormStatus("success");
                  form.reset();
                } catch (error) {
                  console.error(
                    "Project inquiry error:",
                    error
                  );

                  setFormStatus("error");
                } finally {
                  setIsSubmitting(false);
                }
              }}
            >
              {/* ROW 1 */}

              <div className="contact-form-row">
                <div className="project-form-field">
                  <label htmlFor="project-name">
                    Your Name *
                  </label>

                  <input
                    id="project-name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="project-form-field">
                  <label htmlFor="project-email">
                    Email Address *
                  </label>

                  <input
                    id="project-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {/* ROW 2 */}

              <div className="contact-form-row">
                <div className="project-form-field">
                  <label htmlFor="project-company">
                    Company / Brand
                  </label>

                  <input
                    id="project-company"
                    name="company"
                    type="text"
                    placeholder="Your company or brand name"
                    autoComplete="organization"
                  />
                </div>

                <div className="project-form-field">
                  <label htmlFor="project-type">
                    Project Type
                  </label>

                  <select
                    id="project-type"
                    name="projectType"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select project type
                    </option>

                    <option value="Brand Identity">
                      Brand Identity
                    </option>

                    <option value="Logo Design">
                      Logo Design
                    </option>

                    <option value="Graphic Design">
                      Graphic Design
                    </option>

                    <option value="Social Media Design">
                      Social Media Design
                    </option>

                    <option value="Presentation Design">
                      Presentation Design
                    </option>

                    <option value="Product Image Editing">
                      Product Image Editing
                    </option>

                    <option value="Video Editing">
                      Video Editing
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>
              </div>

              {/* ROW 3 */}

              <div className="contact-form-row">
                <div className="project-form-field">
                  <label htmlFor="project-budget">
                    Estimated Budget
                  </label>

                  <select
                    id="project-budget"
                    name="budget"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select your budget
                    </option>

                    <option value="Under $100">
                      Under $100
                    </option>

                    <option value="$100 - $250">
                      $100 – $250
                    </option>

                    <option value="$250 - $500">
                      $250 – $500
                    </option>

                    <option value="$500 - $1000">
                      $500 – $1,000
                    </option>

                    <option value="$1000+">
                      $1,000+
                    </option>

                    <option value="Not sure yet">
                      Not sure yet
                    </option>
                  </select>
                </div>

                <div className="project-form-field">
                  <label htmlFor="project-message">
                    Tell me about your project *
                  </label>

                  <textarea
                    id="project-message"
                    name="message"
                    rows={3}
                    placeholder="Tell me about your project, goals, timeline, and requirements..."
                    required
                  />
                </div>
              </div>

              {/* STATUS */}

              {formStatus === "success" && (
                <div className="project-form-success">
                  ✓ Thanks! Your project inquiry
                  has been sent successfully.
                  I'll get back to you soon.
                </div>
              )}

              {formStatus === "error" && (
                <div className="project-form-error">
                  Something went wrong. Please try
                  again or contact me directly by
                  email.
                </div>
              )}

              {/* SUBMIT */}

              <button
                type="submit"
                className="project-form-submit"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "SENDING..."
                  : "SEND PROJECT INQUIRY"}

                <span>↗</span>
              </button>
            </form>

            {/* =========================
                DIRECT LINKS
            ========================= */}

            <div className="project-form-links">
              <p>
                Prefer to connect directly?
              </p>

              <div
                className="contact-socials"
                aria-label="VITIONX social media and freelance profile links"
              >
                <a
                  href="https://www.fiverr.com/s/Q7lmbPR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="freelance-badge"
                  aria-label="Visit VITIONX on Fiverr"
                  title="Fiverr"
                >
                  <img
                    src="/icons/fiverr.svg"
                    alt="Fiverr"
                  />
                </a>

                <a
                  href="https://www.upwork.com/freelancers/~01ef8afa2de340406e?mp_source=share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="freelance-badge"
                  aria-label="Visit VITIONX on Upwork"
                  title="Upwork"
                >
                  <img
                    src="/icons/upwork.svg"
                    alt="Upwork"
                  />
                </a>

                <a
                  href="https://www.freelancer.com/u/darkstorybangla8?sb=t"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="freelance-badge"
                  aria-label="Visit VITIONX on Freelancer"
                  title="Freelancer"
                >
                  <img
                    src="/icons/freelancer.svg"
                    alt="Freelancer"
                  />
                </a>

                {socialLinks.map((social) => (
                  <a
                    key={social.type}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`contact-social-link ${
                      social.type === "instagram"
                        ? "instagram"
                        : ""
                    }`}
                    aria-label={`Visit VITIONX on ${social.label}`}
                    title={social.label}
                  >
                    <SocialIcon
                      type={social.type}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================
            FOOTER
        ========================= */}

        <footer className="footer">
          <p>
            © 2026 VITIONX. All rights reserved.
          </p>

          <a href="/">
            Back to home ↑
          </a>
        </footer>
      </main>
    </>
  );
}