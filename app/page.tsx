"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [showIntro, setShowIntro] = useState(false);

  // Prevent background scrolling while video modal is open
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

  return (
    <main className="site">
      {/* =========================
          HEADER
      ========================= */}
      <header className="header">
        <a href="#home" className="logo" aria-label="VITIONX Home">
          <img src="/logo.svg" alt="VITIONX" />
        </a>

        <nav className="nav" aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </nav>

        <a href="#contact" className="header-cta">
          Let&apos;s Talk <span>→</span>
        </a>
      </header>

      {/* =========================
          HERO
      ========================= */}
      <section id="home" className="hero">
        <div className="hero-content">
          <p className="hero-eyebrow">
            HELLO, I&apos;M <span>SAKIB</span>
          </p>

          <h1 className="hero-title">
            strategic
            <br />
            brand <span>designer</span>
          </h1>

          <p className="hero-description">
            I create strategic, memorable and professional visual identities
            that help brands stand out and grow with purpose.
          </p>

          <div className="hero-buttons">
            <a href="#portfolio" className="primary-button">
              VIEW MY WORK <span>→</span>
            </a>

            <button
              type="button"
              className="secondary-button"
              onClick={() => setShowIntro(true)}
              aria-label="Watch Sakib introduction video"
            >
              <span className="play-icon">▶</span>
              WATCH INTRO
            </button>
          </div>

          <div className="hero-proof">
            <div className="proof-number">700+</div>

            <div className="proof-text">
              <strong>PROJECTS</strong>
              <span>Completed Successfully</span>
            </div>

            <div className="proof-line" />

            <div className="proof-badge">✦</div>
            <div className="proof-badge">✦</div>
            <div className="proof-badge">✦</div>
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

          <div className="hero-orbit">
            <span>STRATEGIC • BRAND • DESIGN •</span>
          </div>
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
          <strong>10+</strong>
          <span>Years of Experience</span>
        </div>

        <div className="stat">
          <strong>700+</strong>
          <span>Projects Completed</span>
        </div>

        <div className="stat">
          <strong>4.9/5</strong>
          <span>Satisfied Clients</span>
        </div>

        <div className="stat">
          <strong>24/7</strong>
          <span>Client Communication</span>
        </div>
      </section>

      {/* =========================
          ABOUT
      ========================= */}
      <section id="about" className="about-section">
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
                onClick={() => setShowIntro(true)}
                aria-label="Watch Sakib introduction video"
              >
                <span>▶</span>
              </button>

              <div className="about-media-label">
                <span>01</span>
                <strong>ABOUT ME</strong>
              </div>
            </div>
          </div>

          {/* RIGHT — ABOUT CONTENT */}
          <div className="about-details">
            <p className="section-label">ABOUT ME</p>

            <h2>
              Designing brands
              <br />
              with purpose.
            </h2>

            <p className="about-intro">
              I&apos;m Sakib, a Strategic Brand Designer focused on creating
              memorable, professional and meaningful visual identities that
              help brands stand out.
            </p>

            <p className="about-text">
              With years of experience in graphic and brand design, I work
              across visual identity, marketing communication and digital
              design to build clear and consistent brand experiences.
            </p>
          </div>
        </div>
      </section>

      {/* =========================
          SERVICES
      ========================= */}
      <section id="services" className="section">
        <p className="section-label">MY SERVICES</p>

        <h2>What I do</h2>

        <div className="service-grid">
          {/* Service 01 */}
          <article className="service-card">
            <span className="service-number">01</span>

            <div className="service-card-content">
              <h3>Brand Identity</h3>

              <p>
                Building distinctive brand identities, visual systems and
                strategic design foundations that create a consistent brand
                presence.
              </p>
            </div>

            <span className="service-arrow">↗</span>
          </article>

          {/* Service 02 */}
          <article className="service-card">
            <span className="service-number">02</span>

            <div className="service-card-content">
              <h3>Graphic Design</h3>

              <p>
                Creating professional visual communication for marketing,
                advertising, presentations and promotional materials.
              </p>
            </div>

            <span className="service-arrow">↗</span>
          </article>

          {/* Service 03 */}
          <article className="service-card">
            <span className="service-number">03</span>

            <div className="service-card-content">
              <h3>Social Media Design</h3>

              <p>
                Designing engaging and consistent social media visuals that
                communicate clearly and strengthen your brand online.
              </p>
            </div>

            <span className="service-arrow">↗</span>
          </article>
        </div>
      </section>

      {/* =========================
          PORTFOLIO
      ========================= */}
      <section id="portfolio" className="section">
        <div className="section-heading-row">
          <div>
            <p className="section-label">MY WORK</p>

            <h2>Selected projects</h2>
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
              <h3>Strategic Brand Design</h3>
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
              <h3>Stationery Design</h3>
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
              <h3>Social Media Post Design</h3>
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
              <h3>Presentation Design</h3>
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
              <h3>Logo Design</h3>
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
              <h3>Video Editing</h3>
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
              <h3>Social Media Cover &amp; Banner Design</h3>
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
              <h3>Product Image Editing</h3>
            </div>
          </article>
        </div>
      </section>

      {/* =========================
          CONTACT
      ========================= */}
      <section id="contact" className="contact-section">
        <p className="section-label">GET IN TOUCH</p>

        <h2>
          Have a project
          <br />
          in mind?
        </h2>

        <p>
          Let&apos;s create something strategic, memorable and professionally
          designed for your brand.
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
      </section>

      {/* =========================
          FOOTER
      ========================= */}
      <footer className="footer">
        <p>© 2026 VITIONX. All rights reserved.</p>

        <a href="#home">Back to top ↑</a>
      </footer>

      {/* =========================
          INTRO VIDEO MODAL
      ========================= */}
      {showIntro && (
        <div
          className="video-modal"
          onClick={() => setShowIntro(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Sakib introduction video"
        >
          <div
            className="video-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="video-close"
              onClick={() => setShowIntro(false)}
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
  );
}