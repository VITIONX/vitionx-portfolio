
"use client";

import { useEffect, useState } from "react";

type PortfolioImage = {
  src: string;
  alt: string;
};

type PortfolioGalleryProps = {
  images: PortfolioImage[];
};

export default function PortfolioGallery({
  images,
}: PortfolioGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const closeLightbox = () => setActiveIndex(null);

  const showPrevious = () => {
    if (activeIndex === null || images.length === 0) return;

    setActiveIndex(
      (activeIndex - 1 + images.length) % images.length
    );
  };

  const showNext = () => {
    if (activeIndex === null || images.length === 0) return;

    setActiveIndex((activeIndex + 1) % images.length);
  };

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, images.length]);

  if (images.length === 0) {
    return (
      <div className="portfolio-empty">
        <p>No projects available yet.</p>
        <span>New projects will appear here soon.</span>
      </div>
    );
  }

  return (
    <>
      <div className="portfolio-gallery">
        {images.map((image, index) => (
          <button
            type="button"
            className="portfolio-gallery-item"
            key={image.src}
            onClick={() => setActiveIndex(index)}
            aria-label={`View ${image.alt}`}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          className="portfolio-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Project image preview"
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="portfolio-lightbox-close"
            onClick={closeLightbox}
            aria-label="Close preview"
          >
            ×
          </button>

          <button
            type="button"
            className="portfolio-lightbox-prev"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
            aria-label="Previous image"
          >
            ‹
          </button>

          <img
            className="portfolio-lightbox-image"
            src={images[activeIndex].src}
            alt={images[activeIndex].alt}
            onClick={(event) => event.stopPropagation()}
          />

          <button
            type="button"
            className="portfolio-lightbox-next"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            aria-label="Next image"
          >
            ›
          </button>

          <div className="portfolio-lightbox-counter">
            {activeIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}