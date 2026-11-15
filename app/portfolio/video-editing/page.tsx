
import type { Metadata } from "next";
import Link from "next/link";
import { existsSync } from "node:fs";
import path from "node:path";
import VideoGallery from "../VideoGallery";

export const metadata: Metadata = {
  title: "Video Editing Portfolio | VITIONX",
  description:
    "Explore professional video editing projects, promotional videos, social media videos, and creative video content by VITIONX.",
};

const IMAGE_FOLDER = "video-editing";
const VIDEO_PREFIX = "video";
const EXTENSIONS = ["mp4", "mov", "webm", "m4v"];

function getPortfolioVideos() {
  const publicFolder = path.join(
    process.cwd(),
    "public",
    "portfolio",
    IMAGE_FOLDER
  );

  const videos: { src: string; alt: string }[] = [];

  for (let i = 1; i <= 500; i++) {
    for (const extension of EXTENSIONS) {
      const fileName = `${VIDEO_PREFIX}-${i}.${extension}`;
      const filePath = path.join(publicFolder, fileName);

      if (existsSync(filePath)) {
        videos.push({
          src: `/portfolio/${IMAGE_FOLDER}/${fileName}`,
          alt: `Video Editing Project ${i}`,
        });

        break;
      }
    }
  }

  return videos;
}

export default function VideoEditingPage() {
  const videos = getPortfolioVideos();

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
            <p className="section-label">MY WORK / 10</p>

            <h1>Video Editing</h1>

            <p className="portfolio-detail-description">
              Engaging and professionally edited videos designed to
              communicate stories, promote brands, and capture audience
              attention across digital platforms and social media.
            </p>

            <span className="portfolio-detail-count">
              {String(videos.length).padStart(2, "0")} PROJECTS
            </span>
          </div>

          <VideoGallery videos={videos} />
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
