"use client";

import { introVideo } from "../data/about-data";

type IntroVideoModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

/**
 * The introduction video popup. Used by the home page (hero + About
 * buttons) and the /about page. The video link lives in data/about-data.ts.
 */
export default function IntroVideoModal({
  isOpen,
  onClose,
}: IntroVideoModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="video-modal"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={introVideo.dialogLabel}
    >
      <div
        className="video-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="video-close"
          onClick={onClose}
          aria-label="Close video"
        >
          ×
        </button>

        <div className="video-wrapper">
          <iframe
            src={introVideo.embedUrl}
            title={introVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
