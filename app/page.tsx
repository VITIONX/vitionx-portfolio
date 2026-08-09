"use client";

export default function Home() {
  return (
    <main className="site">

      {/* =========================
          HEADER
      ========================= */}
      <header className="header">
        <a href="#home" className="logo">
  <img src="/logo.svg" alt="VitionX" />
</a>

        <nav className="nav">
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
            strategic brand
            <br />
            <span>designer</span>
          </h1>

          <p className="hero-description">
            I create strategic, memorable and professional visual
            identities that help brands stand out and grow with purpose.
          </p>

          <div className="hero-buttons">

            <a href="#portfolio" className="primary-button">
              VIEW MY WORK <span>→</span>
            </a>

            <a href="#about" className="secondary-button">
              <span className="play-icon">▶</span>
              WATCH INTRO
            </a>

          </div>

          <div className="hero-proof">

            <div className="proof-number">
              700+
            </div>

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


        {/* Hero Visual */}
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
            <span>
              STRATEGIC • BRAND • DESIGN •
            </span>
          </div>

        </div>

      </section>


      {/* =========================
          HERO STATS
      ========================= */}
      <section className="stats-section">

        <div className="stat">
          <strong>10+</strong>
          <span>Years of Experience</span>
        </div>

        <div className="stat">
          <strong>700+</strong>
          <span>Projects Completed</span>
        </div>

        <div className="stat">
          <strong>100%</strong>
          <span>Professional Focus</span>
        </div>

        <div className="stat">
          <strong>24/7</strong>
          <span>Client Communication</span>
        </div>

      </section>


      {/* =========================
          ABOUT
      ========================= */}
      <section id="about" className="section about-section">

        <div className="about-content">

          <div className="about-heading">

            <p className="section-label">
              ABOUT ME
            </p>

            <h2>
              Designing brands
              <br />
              with purpose.
            </h2>

          </div>


          <div className="about-details">

            <p className="about-intro">
              I&apos;m Sakib, a Strategic Brand Designer focused on creating
              memorable, professional and meaningful visual identities
              that help brands stand out.
            </p>

            <p className="about-text">
              With years of experience in graphic and brand design, I work
              across visual identity, marketing communication and digital
              design to build clear and consistent brand experiences.
            </p>


            <div className="about-stats">

              <div className="about-stat">
                <strong>10+</strong>
                <span>Years Experience</span>
              </div>

              <div className="about-stat">
                <strong>700+</strong>
                <span>Projects Completed</span>
              </div>

              <div className="about-stat">
                <strong>4</strong>
                <span>Core Design Tools</span>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          SERVICES
      ========================= */}
      <section id="services" className="section">

        <p className="section-label">
          MY SERVICES
        </p>

        <h2>
          What I do
        </h2>


        <div className="service-grid">

          <div className="service-card">

            <span className="service-number">
              01
            </span>

            <div className="service-card-content">

              <h3>
                Brand Identity
              </h3>

              <p>
                Building distinctive brand identities, visual systems and
                strategic design foundations that create a consistent brand
                presence.
              </p>

            </div>

            <span className="service-arrow">
              ↗
            </span>

          </div>


          <div className="service-card">

            <span className="service-number">
              02
            </span>

            <div className="service-card-content">

              <h3>
                Graphic Design
              </h3>

              <p>
                Creating professional visual communication for marketing,
                advertising, presentations and promotional materials.
              </p>

            </div>

            <span className="service-arrow">
              ↗
            </span>

          </div>


          <div className="service-card">

            <span className="service-number">
              03
            </span>

            <div className="service-card-content">

              <h3>
                Social Media Design
              </h3>

              <p>
                Designing engaging and consistent social media visuals that
                communicate clearly and strengthen your brand online.
              </p>

            </div>

            <span className="service-arrow">
              ↗
            </span>

          </div>

        </div>

      </section>


      {/* =========================
          PORTFOLIO
      ========================= */}
      <section id="portfolio" className="section">

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
          <div className="portfolio-card">

            <div className="portfolio-image">
              <img
                src="/portfolio/project-01.jpg"
                alt="Strategic Brand Design"
              />
            </div>

            <div className="portfolio-info">
              <span>01</span>
              <h3>Strategic Brand Design</h3>
            </div>

          </div>


          {/* Project 02 */}
          <div className="portfolio-card">

            <div className="portfolio-image">
              <img
                src="/portfolio/project-02.jpg"
                alt="Stationery Design"
              />
            </div>

            <div className="portfolio-info">
              <span>02</span>
              <h3>Stationery Design</h3>
            </div>

          </div>


          {/* Project 03 */}
          <div className="portfolio-card">

            <div className="portfolio-image">
              <img
                src="/portfolio/project-03.jpg"
                alt="Social Media Post Design"
              />
            </div>

            <div className="portfolio-info">
              <span>03</span>
              <h3>Social Media Post Design</h3>
            </div>

          </div>


          {/* Project 04 */}
          <div className="portfolio-card">

            <div className="portfolio-image">
              <img
                src="/portfolio/project-04.jpg"
                alt="Presentation Design"
              />
            </div>

            <div className="portfolio-info">
              <span>04</span>
              <h3>Presentation Design</h3>
            </div>

          </div>


          {/* Project 05 */}
          <div className="portfolio-card">

            <div className="portfolio-image">
              <img
                src="/portfolio/project-05.jpg"
                alt="Logo Design"
              />
            </div>

            <div className="portfolio-info">
              <span>05</span>
              <h3>Logo Design</h3>
            </div>

          </div>


          {/* Project 06 */}
          <div className="portfolio-card">

            <div className="portfolio-image">
              <img
                src="/portfolio/project-06.jpg"
                alt="Video Editing"
              />
            </div>

            <div className="portfolio-info">
              <span>06</span>
              <h3>Video Editing</h3>
            </div>

          </div>


          {/* Project 07 */}
          <div className="portfolio-card">

            <div className="portfolio-image">
              <img
                src="/portfolio/project-07.jpg"
                alt="Social Media Cover and Banner Design"
              />
            </div>

            <div className="portfolio-info">
              <span>07</span>
              <h3>Social Media Cover &amp; Banner Design</h3>
            </div>

          </div>


          {/* Project 08 */}
          <div className="portfolio-card">

            <div className="portfolio-image">
              <img
                src="/portfolio/project-08.jpg"
                alt="Product Image Editing"
              />
            </div>

            <div className="portfolio-info">
              <span>08</span>
              <h3>Product Image Editing</h3>
            </div>

          </div>

        </div>

      </section>


      {/* =========================
          CONTACT
      ========================= */}
      <section id="contact" className="contact-section">

        <p className="section-label">
          GET IN TOUCH
        </p>

        <h2>
          Have a project
          <br />
          in mind?
        </h2>

        <p>
          Let&apos;s create something strategic, memorable and
          professionally designed for your brand.
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

        <p>
          © 2026 VITIONX. All rights reserved.
        </p>

        <a href="#home">
          Back to top ↑
        </a>

      </footer>


      {/* =========================
          PAGE STYLING
      ========================= */}
      <style jsx global>{`

        @font-face {
          font-family: "Mandalore";
          src: url("/fonts/mandalore.ttf") format("truetype");
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        :root {
          --black: #000000;
          --black-soft: #050505;
          --black-card: #0a0a0a;
          --orange: #f26f21;
          --white: #ffffff;
          --gray: #b0b0b0;
          --gray-dark: #707070;
          --border: rgba(255, 255, 255, 0.12);
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          scroll-behavior: smooth;
          background: #000000;
        }

        body {
          background: #000000;
          color: var(--white);
          font-family: "Poppins", Arial, sans-serif;
          line-height: 1.7;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        img {
          max-width: 100%;
        }

        .site {
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
          background: #000000;
        }


        /* =========================
           HEADER
        ========================= */

        .header {
          width: min(1280px, calc(100% - 80px));
          height: 90px;
          margin: 0 auto;

          display: flex;
          align-items: center;
          justify-content: space-between;

          position: relative;
          z-index: 20;
        }

        .logo {
          font-family: "Mandalore", sans-serif;
          font-size: 25px;
          letter-spacing: 1px;
          color: var(--white);
        }

        .logo span {
          color: var(--orange);
        }

        .nav {
          display: flex;
          align-items: center;
          gap: 34px;
        }

        .nav a {
          font-size: 13px;
          font-weight: 500;
          color: #d5d5d5;
          transition: color 0.3s ease;
        }

        .nav a:hover {
          color: var(--orange);
        }

        .header-cta {
          border: 1px solid var(--orange);
          border-radius: 50px;
          padding: 11px 20px;
          font-size: 11px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .header-cta span {
          color: var(--orange);
          margin-left: 5px;
        }

        .header-cta:hover {
          background: var(--orange);
          color: var(--black);
        }

        .header-cta:hover span {
          color: var(--black);
        }


        /* =========================
           HERO
        ========================= */

        .hero {
          width: min(1280px, calc(100% - 80px));
          min-height: 650px;
          margin: 0 auto;

          display: grid;
          grid-template-columns: 48% 52%;

          position: relative;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          justify-content: center;

          padding: 50px 0 80px;

          position: relative;
          z-index: 5;
        }

        .hero-eyebrow {
          font-size: 15px;
          letter-spacing: 2px;
          font-weight: 500;
          margin-bottom: 22px;
          color: var(--white);
        }

        .hero-eyebrow span {
          color: var(--orange);
        }

        .hero-title {
          font-family: "Mandalore", sans-serif;
          font-size: clamp(62px, 6.4vw, 104px);
          line-height: 0.88;
          letter-spacing: 1px;
          font-weight: 400;
          color: var(--white);
          max-width: 700px;
        }

        .hero-title span {
          color: var(--orange);
        }

        .hero-description {
          max-width: 470px;
          margin-top: 32px;
          color: #b4b4b4;
          font-size: 14px;
          line-height: 1.9;
          font-weight: 300;
        }

        .hero-buttons {
          display: flex;
          align-items: center;
          gap: 22px;
          margin-top: 34px;
        }

        .primary-button {
          display: inline-flex;
          align-items: center;
          gap: 12px;

          border: 1px solid var(--orange);
          background: var(--orange);
          color: #000;

          padding: 14px 24px;
          border-radius: 50px;

          font-size: 11px;
          font-weight: 700;

          transition: all 0.3s ease;
        }

        .primary-button:hover {
          background: transparent;
          color: var(--white);
        }

        .secondary-button {
          display: flex;
          align-items: center;
          gap: 10px;

          color: var(--white);
          font-size: 11px;
          font-weight: 500;
        }

        .play-icon {
          width: 34px;
          height: 34px;

          border: 1px solid var(--orange);
          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          color: var(--orange);
          font-size: 9px;
          padding-left: 2px;
        }


        /* HERO PROOF */

        .hero-proof {
          display: flex;
          align-items: center;
          margin-top: 65px;
          gap: 14px;
        }

        .proof-number {
          font-family: "Mandalore", sans-serif;
          font-size: 30px;
        }

        .proof-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .proof-text strong {
          font-size: 9px;
          letter-spacing: 1px;
        }

        .proof-text span {
          font-size: 9px;
          color: var(--gray);
        }

        .proof-line {
          height: 42px;
          width: 1px;
          background: #454545;
          margin: 0 8px;
        }

        .proof-badge {
          width: 32px;
          height: 32px;

          border: 1px solid #575757;
          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 11px;
          color: var(--orange);
        }


        /* =========================
           HERO IMAGE
        ========================= */

        .hero-visual {
          position: relative;
          min-height: 650px;

          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .hero-image {
          position: relative;
          z-index: 5;

          width: min(560px, 100%);
          max-height: 650px;

          height: auto;

          object-fit: contain;
          object-position: bottom center;

          filter: drop-shadow(
            0 25px 45px rgba(0, 0, 0, 0.65)
          );
        }

        .portrait-backdrop {
          position: absolute;

          width: 380px;
          height: 500px;

          right: 70px;
          bottom: 40px;

          background:
            radial-gradient(
              circle at center,
              rgba(242, 111, 33, 0.13),
              rgba(242, 111, 33, 0.02) 50%,
              transparent 72%
            );

          filter: blur(12px);
          z-index: 1;
        }

        .geometric-frame {
          position: absolute;

          width: 390px;
          height: 420px;

          right: 45px;
          top: 115px;

          border: 2px solid rgba(242, 111, 33, 0.9);
          border-radius: 20px;

          transform: rotate(-24deg) skewY(-3deg);

          z-index: 2;
        }

        .geometric-frame::before {
          content: "";

          position: absolute;
          inset: 20px;

          border: 1px solid rgba(242, 111, 33, 0.16);
          border-radius: 12px;
        }

        .frame-dot {
          position: absolute;

          width: 7px;
          height: 7px;

          background: var(--orange);
          border-radius: 50%;

          box-shadow:
            0 0 12px rgba(242, 111, 33, 0.8);
        }

        .dot-one {
          top: -4px;
          left: 50%;
        }

        .dot-two {
          bottom: 10px;
          right: 25px;
        }

        .dot-three {
          left: 10px;
          top: 50%;
        }

        .hero-glow {
          position: absolute;

          border-radius: 50%;
          background: rgba(242, 111, 33, 0.16);

          filter: blur(35px);
          z-index: 0;
        }

        .glow-one {
          width: 90px;
          height: 90px;

          top: 120px;
          right: 15px;
        }

        .glow-two {
          width: 55px;
          height: 55px;

          bottom: 80px;
          left: 60px;

          opacity: 0.65;
        }

        .hero-orbit {
          position: absolute;

          right: 5px;
          bottom: 115px;

          width: 105px;
          height: 105px;

          border: 1px dashed rgba(255, 255, 255, 0.25);
          border-radius: 50%;

          z-index: 8;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-orbit span {
          font-size: 6px;
          letter-spacing: 1px;
          color: #b8b8b8;
          text-align: center;
          transform: rotate(-20deg);
        }


        /* =========================
           STATS
        ========================= */

        .stats-section {
          width: min(1200px, calc(100% - 80px));

          margin: 20px auto 100px;

          min-height: 125px;

          border: 1px solid #292929;
          border-radius: 4px;

          background: #0a0a0a;

          display: grid;
          grid-template-columns: repeat(4, 1fr);
          align-items: center;
        }

        .stat {
          min-height: 70px;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          border-right: 1px solid #333;
        }

        .stat:last-child {
          border-right: none;
        }

        .stat strong {
          font-family: "Mandalore", sans-serif;
          font-size: 30px;
        }

        .stat span {
          color: var(--gray);
          font-size: 10px;
          margin-top: 7px;
        }


        /* =========================
           GENERAL SECTIONS
        ========================= */

        .section {
          width: min(1200px, calc(100% - 80px));

          margin: 0 auto;

          padding: 110px 0;

          background: #000;
        }

        .section-label {
          color: var(--orange);

          font-size: 11px;
          font-weight: 700;

          letter-spacing: 2px;

          margin-bottom: 15px;
        }

        .section h2 {
          font-family: "Mandalore", sans-serif;

          font-size: clamp(40px, 5vw, 72px);

          line-height: 0.95;
          letter-spacing: 0.5px;
        }


        /* =========================
           ABOUT
        ========================= */

        .about-section {
          width: 100%;
          max-width: none;

          padding: 140px 7vw;

          background: #000;
        }

        .about-content {
          width: min(1400px, 100%);

          margin: 0 auto;

          display: grid;

          grid-template-columns: 42% 58%;

          gap: 70px;

          align-items: start;
        }

        .about-heading h2 {
          margin: 0;

          font-family: "Mandalore", sans-serif;

          font-size: clamp(48px, 5.5vw, 82px);

          font-weight: 400;

          line-height: 0.95;
        }

        .about-details {
          padding-top: 48px;
        }

        .about-intro {
          max-width: 680px;

          margin: 0 0 25px;

          color: var(--white);

          font-size: 19px;
          font-weight: 400;

          line-height: 1.8;
        }

        .about-text {
          max-width: 650px;

          margin: 0;

          color: var(--gray);

          font-size: 14px;
          font-weight: 300;

          line-height: 2;
        }

        .about-stats {
          display: grid;

          grid-template-columns: repeat(3, 1fr);

          margin-top: 55px;

          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .about-stat {
          padding: 28px 20px;

          border-right: 1px solid var(--border);
        }

        .about-stat:first-child {
          padding-left: 0;
        }

        .about-stat:last-child {
          border-right: 0;
        }

        .about-stat strong {
          display: block;

          color: var(--orange);

          font-size: 38px;
          font-weight: 500;

          line-height: 1;
        }

        .about-stat span {
          display: block;

          margin-top: 10px;

          color: var(--gray-dark);

          font-size: 10px;
          letter-spacing: 0.5px;
        }


        /* =========================
           SERVICES
        ========================= */

        .service-grid {
          display: grid;

          grid-template-columns: repeat(3, 1fr);

          gap: 18px;

          margin-top: 55px;
        }

        .service-card {
          min-height: 300px;

          padding: 30px;

          border: 1px solid #2e2e2e;

          background: #0a0a0a;

          border-radius: 4px;

          display: flex;
          flex-direction: column;
          justify-content: space-between;

          transition:
            transform 0.3s ease,
            border-color 0.3s ease;
        }

        .service-card:hover {
          transform: translateY(-8px);

          border-color: var(--orange);
        }

        .service-number {
          color: var(--orange);

          font-family: "Mandalore", sans-serif;

          font-size: 22px;
        }

        .service-card h3 {
          font-family: "Mandalore", sans-serif;

          font-size: 27px;

          margin-top: 55px;
        }

        .service-card p {
          color: var(--gray);

          font-size: 12px;

          line-height: 1.8;

          margin-top: 15px;
        }

        .service-arrow {
          align-self: flex-end;

          color: var(--orange);

          font-size: 22px;

          margin-top: 20px;
        }


        /* =========================
           PORTFOLIO
        ========================= */

        .portfolio-grid {
          display: grid;

          grid-template-columns: repeat(4, 1fr);

          gap: 18px;

          margin-top: 50px;
        }

        .portfolio-card {
          overflow: hidden;
        }

        .portfolio-image {
          width: 100%;

          height: 250px;

          overflow: hidden;

          border-radius: 5px;

          background: #111;
        }

        .portfolio-image img {
          width: 100%;
          height: 100%;

          display: block;

          object-fit: cover;

          transition:
            transform 0.5s ease,
            filter 0.5s ease;
        }

        .portfolio-card:hover .portfolio-image img {
          transform: scale(1.05);
        }

        .portfolio-info {
          padding-top: 15px;
        }

        .portfolio-info span {
          color: var(--orange);

          font-size: 10px;

          font-weight: 600;
        }

        .portfolio-card h3 {
          font-family: "Mandalore", sans-serif;

          font-size: 18px;

          margin-top: 6px;

          line-height: 1.2;
        }


        /* =========================
           CONTACT
        ========================= */

        .contact-section {
          width: min(1200px, calc(100% - 80px));

          margin: 80px auto 0;

          padding: 120px 0;

          text-align: center;

          border-top: 1px solid #292929;

          background: #000;
        }

        .contact-section h2 {
          font-family: "Mandalore", sans-serif;

          font-size: clamp(45px, 6vw, 80px);

          line-height: 0.95;
        }

        .contact-section > p:not(.section-label) {
          max-width: 500px;

          margin: 25px auto;

          color: var(--gray);

          font-size: 13px;

          line-height: 1.8;
        }

        .contact-actions {
          display: flex;

          align-items: center;
          justify-content: center;

          gap: 25px;

          margin-top: 30px;
        }

        .contact-email {
          color: var(--orange);

          font-size: 14px;

          font-weight: 600;
        }

        .contact-button {
          display: inline-flex;

          align-items: center;

          gap: 10px;

          padding: 13px 22px;

          border: 1px solid var(--orange);

          border-radius: 50px;

          color: var(--white);

          font-size: 11px;

          font-weight: 600;

          transition: all 0.3s ease;
        }

        .contact-button:hover {
          background: var(--orange);

          color: #000;
        }


        /* =========================
           FOOTER
        ========================= */

        .footer {
          width: min(1200px, calc(100% - 80px));

          margin: 0 auto;

          padding: 25px 0 35px;

          border-top: 1px solid #292929;

          display: flex;

          align-items: center;

          justify-content: space-between;
        }

        .footer p,
        .footer a {
          color: #777;

          font-size: 10px;
        }

        .footer a:hover {
          color: var(--orange);
        }


        /* =========================
           TABLET
        ========================= */

        @media (max-width: 900px) {

          .header,
          .hero,
          .stats-section,
          .section,
          .contact-section,
          .footer {
            width: min(100% - 40px, 700px);
          }

          .nav {
            display: none;
          }

          .header {
            height: 75px;
          }

          .hero {
            grid-template-columns: 1fr;

            min-height: auto;
          }

          .hero-content {
            padding: 70px 0 30px;

            text-align: center;

            align-items: center;
          }

          .hero-title {
            font-size: clamp(58px, 13vw, 90px);
          }

          .hero-description {
            max-width: 500px;
          }

          .hero-buttons {
            justify-content: center;
          }

          .hero-proof {
            justify-content: center;
          }

          .hero-visual {
            min-height: 580px;

            margin-top: -10px;
          }

          .hero-image {
            width: min(500px, 95%);
          }

          .geometric-frame {
            right: 50%;

            transform:
              translateX(50%)
              rotate(-24deg)
              skewY(-3deg);
          }

          .hero-orbit {
            right: 20px;
          }

          .stats-section {
            grid-template-columns: repeat(2, 1fr);
          }

          .stat:nth-child(2) {
            border-right: none;
          }

          .stat {
            border-bottom: 1px solid #333;
          }

          .stat:nth-child(3),
          .stat:nth-child(4) {
            border-bottom: none;
          }

          .about-content {
            grid-template-columns: 1fr;

            gap: 25px;
          }

          .about-details {
            padding-top: 10px;
          }

          .service-grid {
            grid-template-columns: 1fr;
          }

          .portfolio-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .section-heading-row {
            align-items: flex-start;

            flex-direction: column;
          }

        }


        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 600px) {

          .header,
          .hero,
          .stats-section,
          .section,
          .contact-section,
          .footer {
            width: calc(100% - 30px);
          }

          .header-cta {
            padding: 9px 14px;

            font-size: 9px;
          }

          .hero-content {
            padding-top: 50px;
          }

          .hero-eyebrow {
            font-size: 11px;
          }

          .hero-title {
            font-size: clamp(48px, 15vw, 70px);
          }

          .hero-description {
            font-size: 12px;
          }

          .hero-buttons {
            flex-direction: column;

            gap: 15px;
          }

          .hero-proof {
            margin-top: 45px;
          }

          .hero-visual {
            min-height: 470px;
          }

          .hero-image {
            width: 110%;
          }

          .geometric-frame {
            width: 285px;
            height: 330px;

            top: 85px;
          }

          .hero-orbit {
            width: 75px;
            height: 75px;

            right: 0;
            bottom: 80px;
          }

          .stats-section {
            grid-template-columns: 1fr 1fr;
          }

          .stat strong {
            font-size: 24px;
          }

          .stat span {
            font-size: 8px;

            text-align: center;
          }

          .section {
            padding: 70px 0;
          }

          .section h2 {
            font-size: 48px;
          }

          .about-section {
            padding: 90px 7%;
          }

          .about-heading h2 {
            font-size: clamp(46px, 13vw, 65px);
          }

          .about-intro {
            font-size: 16px;
          }

          .about-text {
            font-size: 13px;
          }

          .about-stats {
            grid-template-columns: 1fr;

            margin-top: 40px;
          }

          .about-stat,
          .about-stat:first-child {
            padding: 22px 0;

            border-right: 0;

            border-bottom: 1px solid var(--border);
          }

          .about-stat:last-child {
            border-bottom: 0;
          }

          .portfolio-grid {
            grid-template-columns: 1fr;
          }

          .portfolio-image {
            height: 300px;
          }

          .contact-actions {
            flex-direction: column;

            gap: 18px;
          }

          .footer {
            flex-direction: column;

            gap: 15px;

            text-align: center;
          }

        }

      `}</style>

    </main>
  );
}