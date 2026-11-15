
import type { Metadata } from "next";
import Link from "next/link";
import { existsSync } from "node:fs";
import path from "node:path";
import PortfolioGallery from "../PortfolioGallery";

export const metadata: Metadata = {
  title: "Flyer & Brochure Design Portfolio | VITIONX",
  description:
    "Explore professional flyer designs, brochure layouts, promotional materials, and creative print design projects by VITIONX.",
};

const IMAGE_FOLDER = "flyer-&-brochure-design";
const IMAGE_PREFIX = "flyer";
const EXTENSIONS = ["jpg", "jpeg", "png", "webp"];

function getPortfolioImages() {
  const publicFolder = path.join(
    process.cwd(),
    "public",
    "portfolio",
    IMAGE_FOLDER
  );

  const images: { src: string; alt: string }[] = [];

  // Automatically checks all 500 image slots
  for (let i = 1; i <= 500; i++) {
    for (const extension of EXTENSIONS) {
      const fileName = `${IMAGE_PREFIX}-${i}.${extension}`;
      const filePath = path.join(publicFolder, fileName);

      if (existsSync(filePath)) {
        images.push({
          src: `/portfolio/${IMAGE_FOLDER}/${fileName}`,
          alt: `Flyer and Brochure Design Project ${i}`,
        });

        break;
      }
    }
  }

  return images;
}

export default function FlyerBrochureDesignPage() {
  const images = getPortfolioImages();

  return (
    <>
      <header className="header">
        <div className="logo">
          <Link href="/">
            <img src="/logo.svg" alt="VITIONX" />
          </Link>
        </div>

        <nav className="nav" aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/services">Services</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <div style={{ display: "flex", alignItems: "center" }}>
          <Link href="/contact" className="header-cta">
            Let's Talk <span>→</span>
          </Link>
        </div>
      </header>

      <main className="site">
        <section className="section portfolio-detail-section">
          <Link href="/portfolio" className="portfolio-back-link">
            ← BACK TO PORTFOLIO
          </Link>

          <div className="portfolio-detail-heading">
            <p className="section-label">MY WORK / 05</p>

            <h1>Flyer &amp; Brochure Design</h1>

            <p className="portfolio-detail-description">
              Professional flyers and brochures designed to
              communicate brand messages, showcase products and
              services, and create a strong visual impact through
              effective print and promotional design.
            </p>

            <span className="portfolio-detail-count">
              {String(images.length).padStart(2, "0")} PROJECTS
            </span>
          </div>

          <PortfolioGallery images={images} />
        </section>

        <footer className="footer">
          <p>© 2026 VITIONX. All rights reserved.</p>

          <Link href="/portfolio">
            Back to portfolio ↑
          </Link>
        </footer>
      </main>
    </>
  );
}
