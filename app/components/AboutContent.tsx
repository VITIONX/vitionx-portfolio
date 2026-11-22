"use client";

import { Fragment } from "react";
import { aboutContent } from "../data/about-data";

type AboutContentProps = {
  onPlayIntro: () => void;
};

/**
 * The About block (image on the left, text on the right).
 * Rendered by the home page AND the /about page; the content lives in
 * data/about-data.ts. Each page keeps its own <section> wrapper and its
 * own intro-video state, and passes `onPlayIntro` to open the video.
 */
export default function AboutContent({ onPlayIntro }: AboutContentProps) {
  return (
    <div className="about-content">
      {/* LEFT — ABOUT IMAGE */}

      <div className="about-media">
        <div className="about-media-frame">
          <img
            src={aboutContent.image}
            alt={aboutContent.imageAlt}
            className="about-video-image"
          />

          <div className="about-media-overlay" />

          <button
            type="button"
            className="about-play-button"
            onClick={onPlayIntro}
            aria-label={aboutContent.playButtonLabel}
          >
            <span>▶</span>
          </button>

          <div className="about-media-label">
            <span>{aboutContent.mediaNumber}</span>
            <strong>{aboutContent.mediaLabel}</strong>
          </div>
        </div>
      </div>

      {/* RIGHT — ABOUT CONTENT */}

      <div className="about-details">
        <p className="section-label">{aboutContent.label}</p>

        <h2>
          {aboutContent.headingLines.map((line, index) => (
            <Fragment key={line}>
              {index > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </h2>

        <p className="about-intro">{aboutContent.intro}</p>

        <p className="about-text">{aboutContent.text}</p>
      </div>
    </div>
  );
}
