"use client";

import { useEffect, useRef, useState } from "react";

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
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
        />
        <circle
          cx="12"
          cy="12"
          r="4.2"
        />
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

const reviews = [
  "review-01.png",
  "review-02.png",
  "review-03.png",
  "review-04.png",
  "review-05.png",
  "review-06.png",
  "review-07.png",
  "review-08.png",
];

const REVIEWS_PER_PAGE = 3;
const TRANSITION_DURATION = 900;

export default function Home() {
  const [showIntro, setShowIntro] = useState(false);

  /*
   * =========================================================
   * CLIENT REVIEWS
   * =========================================================
   */

  const [currentReviewPage, setCurrentReviewPage] = useState(0);
  const [isReviewTransitioning, setIsReviewTransitioning] =
    useState(false);
  const [reviewDirection, setReviewDirection] =
    useState<"next" | "previous">("next");
  const [isReviewHovered, setIsReviewHovered] =
    useState(false);

  const reviewTimeoutRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  const totalReviewPages = Math.ceil(
    reviews.length / REVIEWS_PER_PAGE
  );

  const getReviewIndexes = (page: number) => {
    return Array.from(
      { length: REVIEWS_PER_PAGE },
      (_, index) =>
        (page * REVIEWS_PER_PAGE + index) % reviews.length
    );
  };

  const currentReviewIndexes =
    getReviewIndexes(currentReviewPage);

  const nextReviewPage =
    reviewDirection === "next"
      ? (currentReviewPage + 1) % totalReviewPages
      : (currentReviewPage - 1 + totalReviewPages) %
        totalReviewPages;

  const nextReviewIndexes =
    getReviewIndexes(nextReviewPage);

  const changeReviewPage = (
    direction: "next" | "previous"
  ) => {
    if (isReviewTransitioning) return;

    if (reviewTimeoutRef.current) {
      clearTimeout(reviewTimeoutRef.current);
    }

    setReviewDirection(direction);
    setIsReviewTransitioning(true);

    reviewTimeoutRef.current = setTimeout(() => {
      setCurrentReviewPage((prev) => {
        if (direction === "next") {
          return (prev + 1) % totalReviewPages;
        }

        return (
          (prev - 1 + totalReviewPages) %
          totalReviewPages
        );
      });

      setIsReviewTransitioning(false);
    }, TRANSITION_DURATION);
  };

  /*
   * Automatically change reviews every 5 seconds.
   * Stops while mouse is over the review area.
   */
  useEffect(() => {
    if (isReviewHovered || isReviewTransitioning) {
      return;
    }

    const interval = setInterval(() => {
      changeReviewPage("next");
    }, 5000);

    return () => clearInterval(interval);
  }, [
    isReviewHovered,
    isReviewTransitioning,
    currentReviewPage,
  ]);

  useEffect(() => {
    return () => {
      if (reviewTimeoutRef.current) {
        clearTimeout(reviewTimeoutRef.current);
      }
    };
  }, []);

  /*
   * =========================================================
   * PREVENT BACKGROUND SCROLLING WHILE VIDEO MODAL IS OPEN
   * =========================================================
   */

  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showIntro]);

  /*
   * =========================================================
   * STATS COUNT-UP ANIMATION
   * =========================================================
   */

  useEffect(() => {
    const stats =
      document.querySelectorAll<HTMLElement>(".stat strong");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target as HTMLElement;

          const target = parseFloat(
            element.dataset.target ?? "0"
          );

          if (isNaN(target)) return;

          const duration = 3000;
          const startTime = performance.now();

          const updateNumber = (currentTime: number) => {
            const progress = Math.min(
              (currentTime - startTime) / duration,
              1
            );

            const easedProgress =
              1 - Math.pow(1 - progress, 3);

            const currentValue =
              target * easedProgress;

            if (element.dataset.type === "rating") {
              element.textContent =
                currentValue.toFixed(1) + "/5";
            } else if (
              element.dataset.type === "availability"
            ) {
              element.textContent =
                Math.floor(currentValue) + "/7";
            } else {
              element.textContent =
                Math.floor(currentValue) + "+";
            }

            if (progress < 1) {
              requestAnimationFrame(updateNumber);
            }
          };

          requestAnimationFrame(updateNumber);

          observer.unobserve(element);
        });
      },
      {
        threshold: 0.4,
      }
    );

    stats.forEach((stat) => observer.observe(stat));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* =========================
          HEADER
      ========================= */}

      <header className="header">
        <div className="logo">
          <img
            src="/logo.svg"
            alt="VITIONX"
          />
        </div>

        <nav
          className="nav"
          aria-label="Main navigation"
        >
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </nav>

        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <a
            href="#contact"
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
    HERO
========================= */}

<main className="site">
  <section
    id="home"
    className="hero"
  >
    <div className="hero-content">
      <p className="hero-eyebrow">
        HELLO, I&apos;M{" "}
        <span>SAKIB</span>
      </p>

      <h1 className="hero-title">
        strategic
        <br />
        brand{" "}
        <span>designer</span>
      </h1>

      <p className="hero-description">
        I create strategic, memorable and
        professional visual identities that
        help brands stand out and grow with
        purpose.
      </p>

      <div className="hero-buttons">
        <a
          href="#portfolio"
          className="primary-button"
        >
          VIEW MY WORK{" "}
          <span>→</span>
        </a>

        <button
          type="button"
          className="secondary-button"
          onClick={() =>
            setShowIntro(true)
          }
          aria-label="Watch Sakib introduction video"
        >
          <span className="play-icon">
            ▶
          </span>
          WATCH INTRO
        </button>
      </div>

      <div className="hero-proof">
        <div className="proof-number">
          700+
        </div>

        <div className="proof-text">
          <strong>PROJECTS</strong>
          <span>
            Completed Successfully
          </span>
        </div>

        <div className="proof-line" />

<a
  href="https://www.fiverr.com/s/Q7lmbPR"
  target="_blank"
  rel="noopener noreferrer"
  className="proof-badge freelance-badge"
  aria-label="Visit my Fiverr profile"
  title="View my Fiverr profile"
>
  <img
    src="/icons/fiverr.svg"
    alt=""
    className="freelance-logo"
  />
</a>

<a
  href="https://www.upwork.com/freelancers/~01ef8afa2de340406e?mp_source=share"
  target="_blank"
  rel="noopener noreferrer"
  className="proof-badge freelance-badge"
  aria-label="Visit my Upwork profile"
  title="View my Upwork profile"
>
  <img
    src="/icons/upwork.svg"
    alt=""
    className="freelance-logo"
  />
</a>

<a
  href="https://www.freelancer.com/u/darkstorybangla8?sb=t"
  target="_blank"
  rel="noopener noreferrer"
  className="proof-badge freelance-badge"
  aria-label="Visit my Freelancer.com profile"
  title="View my Freelancer.com profile"
>
  <img
    src="/icons/freelancer.svg"
    alt=""
    className="freelance-logo"
  />
</a>
      </div>
    </div>
          {/* =========================
              HERO VISUAL
          ========================= */}

          <div className="hero-visual">
            <div className="hero-glow glow-one" />
            <div className="hero-glow glow-two" />

            <div className="geometric-frame">
              <span className="frame-dot dot-one" />
              <span className="frame-dot dot-two" />
              <span className="frame-dot dot-three" />
            </div>

            <div className="portrait-backdrop" />

            <img
              src="/sakib-hero.png"
              alt="Sakib — Strategic Brand Designer"
              className="hero-image"
            />

            <a
              href="#contact"
              className="hero-orbit"
            >
              <span>
                HIRE
                <br />
                ME
              </span>
            </a>
          </div>
        </section>

        {/* =========================
            HERO STATS
        ========================= */}

        <section
          className="stats-section"
          aria-label="Professional statistics"
        >
          <div className="stat">
            <strong data-target="10">
              0+
            </strong>
            <span>
              Years of Experience
            </span>
          </div>

          <div className="stat">
            <strong data-target="700">
              0+
            </strong>
            <span>
              Projects Completed
            </span>
          </div>

          <div className="stat">
            <strong
              data-target="4.9"
              data-type="rating"
            >
              0.0/5
            </strong>
            <span>
              Satisfied Clients
            </span>
          </div>

          <div className="stat">
            <strong
              data-target="24"
              data-type="availability"
            >
              0/7
            </strong>
            <span>
              Client Communication
            </span>
          </div>
        </section>

        {/* =========================
            ABOUT
        ========================= */}

        <section
          id="about"
          className="about-section"
        >
          <div className="about-content">
            {/* LEFT — ABOUT IMAGE */}

            <div className="about-media">
              <div className="about-media-frame">
                <img
                  src="/about-video.jpg"
                  alt="Sakib — Strategic Brand Designer"
                  className="about-video-image"
                />

                <div className="about-media-overlay" />

                <button
                  type="button"
                  className="about-play-button"
                  onClick={() =>
                    setShowIntro(true)
                  }
                  aria-label="Watch Sakib introduction video"
                >
                  <span>▶</span>
                </button>

                <div className="about-media-label">
                  <span>01</span>
                  <strong>
                    ABOUT ME
                  </strong>
                </div>
              </div>
            </div>

            {/* RIGHT — ABOUT CONTENT */}

            <div className="about-details">
              <p className="section-label">
                ABOUT ME
              </p>

              <h2>
                Designing brands
                <br />
                with purpose.
              </h2>

              <p className="about-intro">
                I&apos;m Sakib, a Strategic Brand
                Designer focused on creating
                memorable, professional and
                meaningful visual identities that
                help brands stand out.
              </p>

              <p className="about-text">
                With years of experience in
                graphic and brand design, I work
                across visual identity, marketing
                communication and digital design
                to build clear and consistent brand
                experiences.
              </p>
            </div>
          </div>
        </section>

        {/* =========================
            SERVICES
        ========================= */}

        <section
          id="services"
          className="section"
        >
          <p className="section-label">
            MY SERVICES
          </p>

          <h2>What I do</h2>

          <div className="service-grid">
            {/* Service 01 */}

            <article className="service-card">
              <span className="service-number">
                01
              </span>

              <div className="service-card-content">
                <h3>
                  Brand Identity
                </h3>

                <p>
                  Building distinctive brand
                  identities, visual systems and
                  strategic design foundations
                  that create a consistent brand
                  presence.
                </p>
              </div>

              <span className="service-arrow">
                ↗
              </span>
            </article>

            {/* Service 02 */}

            <article className="service-card">
              <span className="service-number">
                02
              </span>

              <div className="service-card-content">
                <h3>
                  Graphic Design
                </h3>

                <p>
                  Creating professional visual
                  communication for marketing,
                  advertising, presentations and
                  promotional materials.
                </p>
              </div>

              <span className="service-arrow">
                ↗
              </span>
            </article>

            {/* Service 03 */}

            <article className="service-card">
              <span className="service-number">
                03
              </span>

              <div className="service-card-content">
                <h3>
                  Social Media Design
                </h3>

                <p>
                  Designing engaging and
                  consistent social media visuals
                  that communicate clearly and
                  strengthen your brand online.
                </p>
              </div>

              <span className="service-arrow">
                ↗
              </span>
            </article>
          </div>
        </section>

        {/* =========================
            PORTFOLIO
        ========================= */}

        <section
          id="portfolio"
          className="section"
        >
          <div className="section-heading-row">
            <div>
              <p className="section-label">
                MY WORK
              </p>

              <h2>
                Selected projects
              </h2>
            </div>
          </div>

          <div className="portfolio-grid">
            {/* Project 01 */}

            <article className="portfolio-card">
              <div className="portfolio-image">
                <img
                  src="/portfolio/project-01.jpg"
                  alt="Strategic Brand Design"
                  loading="lazy"
                />
              </div>

              <div className="portfolio-info">
                <span>01</span>
                <h3>
                  Strategic Brand Design
                </h3>
              </div>
            </article>

            {/* Project 02 */}

            <article className="portfolio-card">
              <div className="portfolio-image">
                <img
                  src="/portfolio/project-02.jpg"
                  alt="Stationery Design"
                  loading="lazy"
                />
              </div>

              <div className="portfolio-info">
                <span>02</span>
                <h3>
                  Stationery Design
                </h3>
              </div>
            </article>

            {/* Project 03 */}

            <article className="portfolio-card">
              <div className="portfolio-image">
                <img
                  src="/portfolio/project-03.jpg"
                  alt="Social Media Post Design"
                  loading="lazy"
                />
              </div>

              <div className="portfolio-info">
                <span>03</span>
                <h3>
                  Social Media Post Design
                </h3>
              </div>
            </article>

            {/* Project 04 */}

            <article className="portfolio-card">
              <div className="portfolio-image">
                <img
                  src="/portfolio/project-04.jpg"
                  alt="Presentation Design"
                  loading="lazy"
                />
              </div>

              <div className="portfolio-info">
                <span>04</span>
                <h3>
                  Presentation Design
                </h3>
              </div>
            </article>

            {/* Project 05 */}

            <article className="portfolio-card">
              <div className="portfolio-image">
                <img
                  src="/portfolio/project-05.jpg"
                  alt="Logo Design"
                  loading="lazy"
                />
              </div>

              <div className="portfolio-info">
                <span>05</span>
                <h3>
                  Logo Design
                </h3>
              </div>
            </article>

            {/* Project 06 */}

            <article className="portfolio-card">
              <div className="portfolio-image">
                <img
                  src="/portfolio/project-06.jpg"
                  alt="Video Editing"
                  loading="lazy"
                />
              </div>

              <div className="portfolio-info">
                <span>06</span>
                <h3>
                  Video Editing
                </h3>
              </div>
            </article>

            {/* Project 07 */}

            <article className="portfolio-card">
              <div className="portfolio-image">
                <img
                  src="/portfolio/project-07.jpg"
                  alt="Social Media Cover and Banner Design"
                  loading="lazy"
                />
              </div>

              <div className="portfolio-info">
                <span>07</span>
                <h3>
                  Social Media Cover &amp;
                  Banner Design
                </h3>
              </div>
            </article>

            {/* Project 08 */}

            <article className="portfolio-card">
              <div className="portfolio-image">
                <img
                  src="/portfolio/project-08.jpg"
                  alt="Product Image Editing"
                  loading="lazy"
                />
              </div>

              <div className="portfolio-info">
                <span>08</span>
                <h3>
                  Product Image Editing
                </h3>
              </div>
            </article>
          </div>
        </section>

        {/* =================================================
            CLIENT REVIEWS
        ================================================= */}

        <section
          className="reviews-section"
          onMouseEnter={() =>
            setIsReviewHovered(true)
          }
          onMouseLeave={() =>
            setIsReviewHovered(false)
          }
        >
          <p className="section-label">
            CLIENT FEEDBACK
          </p>

          <h2>
            What my customers
            <br />
            say about me.
          </h2>

          <div
            style={{
              position: "relative",
              width: "100%",
              overflow: "hidden",
              marginTop: "50px",
            }}
          >
            {/* LEFT ARROW */}

            <button
              type="button"
              onClick={() =>
                changeReviewPage("previous")
              }
              aria-label="Previous client reviews"
              disabled={isReviewTransitioning}
              style={{
                position: "absolute",
                left: "0",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 20,
                width: "46px",
                height: "46px",
                borderRadius: "50%",
                border: "1px solid rgba(255, 138, 0, 0.7)",
                background:
                  "rgba(0, 0, 0, 0.75)",
                color: "#ff8a00",
                fontSize: "22px",
                cursor: isReviewTransitioning
                  ? "default"
                  : "pointer",
                opacity: isReviewTransitioning
                  ? 0.5
                  : 1,
                transition:
                  "all 0.25s ease",
              }}
            >
              ←
            </button>

            {/* REVIEW VIEWPORT */}

            <div
              style={{
                width:
                  "calc(100% - 120px)",
                margin:
                  "0 auto",
                overflow: "hidden",
              }}
            >
              {/* REVIEW TRACK */}

              <div
                style={{
                  display: "flex",
                  width: "200%",
                  transform:
                    isReviewTransitioning
                      ? "translateX(-50%)"
                      : "translateX(0)",
                  transition:
                    isReviewTransitioning
                      ? `transform ${TRANSITION_DURATION}ms cubic-bezier(0.76, 0, 0.24, 1)`
                      : "none",
                }}
              >
                {/* CURRENT REVIEWS */}

                <div
                  style={{
                    width: "50%",
                    flexShrink: 0,
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(3, minmax(0, 1fr))",
                    gap: "24px",
                  }}
                >
                  {currentReviewIndexes.map(
                    (reviewIndex, index) => (
                      <div
                        key={`current-${reviewIndex}-${index}`}
                        style={{
                          width: "100%",
                          overflow: "hidden",
                          border:
                            "1px solid rgba(255, 138, 0, 0.75)",
                          background:
                            "rgba(255, 255, 255, 0.02)",
                          boxSizing: "border-box",
                          transition:
                            "transform 0.3s ease, border-color 0.3s ease",
                        }}
                      >
                        <img
                          src={`/review/${reviews[reviewIndex]}`}
                          alt={`Client Review ${
                            reviewIndex + 1
                          }`}
                          style={{
                            display: "block",
                            width: "100%",
                            height: "auto",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                    )
                  )}
                </div>

                {/* NEXT REVIEWS */}

                <div
                  style={{
                    width: "50%",
                    flexShrink: 0,
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(3, minmax(0, 1fr))",
                    gap: "24px",
                  }}
                >
                  {nextReviewIndexes.map(
                    (reviewIndex, index) => (
                      <div
                        key={`next-${reviewIndex}-${index}`}
                        style={{
                          width: "100%",
                          overflow: "hidden",
                          border:
                            "1px solid rgba(255, 138, 0, 0.75)",
                          background:
                            "rgba(255, 255, 255, 0.02)",
                          boxSizing: "border-box",
                        }}
                      >
                        <img
                          src={`/review/${reviews[reviewIndex]}`}
                          alt={`Client Review ${
                            reviewIndex + 1
                          }`}
                          style={{
                            display: "block",
                            width: "100%",
                            height: "auto",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT ARROW */}

            <button
              type="button"
              onClick={() =>
                changeReviewPage("next")
              }
              aria-label="Next client reviews"
              disabled={isReviewTransitioning}
              style={{
                position: "absolute",
                right: "0",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 20,
                width: "46px",
                height: "46px",
                borderRadius: "50%",
                border: "1px solid rgba(255, 138, 0, 0.7)",
                background:
                  "rgba(0, 0, 0, 0.75)",
                color: "#ff8a00",
                fontSize: "22px",
                cursor: isReviewTransitioning
                  ? "default"
                  : "pointer",
                opacity: isReviewTransitioning
                  ? 0.5
                  : 1,
                transition:
                  "all 0.25s ease",
              }}
            >
              →
            </button>
          </div>

          {/* REVIEW COUNTER */}

          <div
            className="review-counter"
            style={{
              marginTop: "30px",
            }}
          >
            <span>
              {String(
                currentReviewPage + 1
              ).padStart(2, "0")}
            </span>

            <span className="review-counter-line" />

            <span>
              {String(
                totalReviewPages
              ).padStart(2, "0")}
            </span>
          </div>

          {/* REVIEW DOTS */}

          <div
            className="review-dots"
            style={{
              marginTop: "18px",
            }}
          >
            {Array.from(
              { length: totalReviewPages },
              (_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`review-dot ${
                    currentReviewPage === index
                      ? "active"
                      : ""
                  }`}
                  onClick={() => {
                    if (
                      index ===
                      currentReviewPage
                    ) {
                      return;
                    }

                    if (
                      reviewTimeoutRef.current
                    ) {
                      clearTimeout(
                        reviewTimeoutRef.current
                      );
                    }

                    setReviewDirection(
                      index >
                        currentReviewPage
                        ? "next"
                        : "previous"
                    );

                    setIsReviewTransitioning(
                      true
                    );

                    reviewTimeoutRef.current =
                      setTimeout(() => {
                        setCurrentReviewPage(
                          index
                        );
                        setIsReviewTransitioning(
                          false
                        );
                      }, TRANSITION_DURATION);
                  }}
                  aria-label={`Show review group ${
                    index + 1
                  }`}
                />
              )
            )}
          </div>
        </section>

        {/* =========================
            CONTACT
        ========================= */}

        <section
          id="contact"
          className="contact-section"
        >
          <p className="section-label">
            GET IN TOUCH
          </p>

          <h2>
            Have a project
            <br />
            in mind?
          </h2>

          <p>
            Let's create something
            strategic, memorable and
            professionally designed for your
            brand.
          </p>

          <div className="contact-actions">
            <a
              href="mailto:ahmedsakib857@gmail.com"
              className="contact-email"
            >
              ahmedsakib857@gmail.com
            </a>

            <a
              href="mailto:ahmedsakib857@gmail.com"
              className="contact-button"
            >
              Start a Project
              <span>↗</span>
            </a>
          </div>
      
{/* =================================================
    SOCIAL MEDIA + FREELANCE PROFILES — CONTACT
================================================= */}

<div
  className="contact-socials"
  aria-label="VITIONX social media and freelance profile links"
>

  {/* =================================================
      FREELANCE PROFILES
  ================================================= */}

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

  {/* =================================================
      SOCIAL MEDIA
  ================================================= */}

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
      <SocialIcon type={social.type} />
    </a>
  ))}

</div>

    </section>

        {/* =========================
            FOOTER
        ========================= */}

        <footer className="footer">
          <p>
            © 2026 VITIONX. All rights
            reserved.
          </p>

          <a href="#home">
            Back to top ↑
          </a>
        </footer>

        {/* =========================
            INTRO VIDEO MODAL
        ========================= */}

        {showIntro && (
          <div
            className="video-modal"
            onClick={() =>
              setShowIntro(false)
            }
            role="dialog"
            aria-modal="true"
            aria-label="Sakib introduction video"
          >
            <div
              className="video-modal-content"
              onClick={(e) =>
                e.stopPropagation()
              }
            >
              <button
                type="button"
                className="video-close"
                onClick={() =>
                  setShowIntro(false)
                }
                aria-label="Close video"
              >
                ×
              </button>

              <div className="video-wrapper">
                <iframe
                  src="https://www.youtube.com/embed/1P2d6WZwbMo?autoplay=1&rel=0"
                  title="Sakib — Strategic Brand Designer Introduction"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}