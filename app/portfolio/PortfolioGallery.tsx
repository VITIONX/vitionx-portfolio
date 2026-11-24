"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useInfiniteBatch } from "./useInfiniteBatch";

type PortfolioImage = {
  src: string;
  alt: string;
};

type PortfolioGalleryProps = {
  images: PortfolioImage[];
};

type Rect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type Direction = 1 | -1;

/** The image that fades out while the next one fades in. */
type Ghost = {
  src: string;
  rect: Rect;
};

const BATCH_SIZE = 30;
const LOAD_MARGIN = 500;

const ZOOM_DURATION = 480; // thumbnail -> lightbox (first open)
const FADE_DURATION = 450; // previous / next (crossfade)
const FADE_EASING = "cubic-bezier(0.4, 0, 0.2, 1)";

/**
 * The area the artwork really occupies inside its thumbnail
 * (the thumbnail uses object-fit: contain, so there can be empty bars).
 */
function getVisibleRect(img: HTMLImageElement): Rect {
  const box = img.getBoundingClientRect();
  const nw = img.naturalWidth;
  const nh = img.naturalHeight;

  if (!nw || !nh) {
    return {
      left: box.left,
      top: box.top,
      width: box.width,
      height: box.height,
    };
  }

  const fit = Math.min(box.width / nw, box.height / nh);
  const width = nw * fit;
  const height = nh * fit;

  return {
    left: box.left + (box.width - width) / 2,
    top: box.top + (box.height - height) / 2,
    width,
    height,
  };
}

/**
 * Resolves when the image is loaded and decoded (or failed / took too long),
 * so the crossfade never starts with an empty frame.
 */
function waitForImage(src: string, timeout = 1500): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      window.clearTimeout(timer);
      resolve();
    };

    const timer = window.setTimeout(finish, timeout);

    img.src = src;

    if (typeof img.decode === "function") {
      img.decode().then(finish, finish);
    } else {
      img.onload = finish;
      img.onerror = finish;
    }
  });
}

type GalleryCardProps = {
  image: PortfolioImage;
  index: number;
  onOpen: (index: number, thumb: HTMLImageElement | null) => void;
};

const GalleryCard = memo(function GalleryCard({
  image,
  index,
  onOpen,
}: GalleryCardProps) {
  return (
    <button
      type="button"
      className="portfolio-gallery-card"
      onClick={(event) =>
        onOpen(index, event.currentTarget.querySelector("img"))
      }
      aria-label={`View ${image.alt}`}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </button>
  );
});

export default function PortfolioGallery({ images }: PortfolioGalleryProps) {
  const total = images.length;

  const { visibleCount, hasMore, isLoading, sentinelRef } = useInfiniteBatch(
    total,
    BATCH_SIZE,
    LOAD_MARGIN
  );

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [ghost, setGhost] = useState<Ghost | null>(null);
  // the image that arrived by crossfade: it must not play the opening fade too
  const [noFadeSrc, setNoFadeSrc] = useState<string | null>(null);
  const isOpen = activeIndex !== null;

  const activeIndexRef = useRef<number | null>(null);
  activeIndexRef.current = activeIndex;

  const closeRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const lightboxImgRef = useRef<HTMLImageElement | null>(null);
  const originRectRef = useRef<Rect | null>(null);

  // previous / next crossfade bookkeeping
  const busyRef = useRef(false);
  const pendingDirRef = useRef<Direction | 0>(0);
  const fadePendingRef = useRef(false);
  const safetyTimerRef = useRef<number | null>(null);
  const navigateRef = useRef<(dir: Direction) => void>(() => {});

  const visibleImages = useMemo(
    () => images.slice(0, visibleCount),
    [images, visibleCount]
  );

  const clearSafetyTimer = useCallback(() => {
    if (safetyTimerRef.current !== null) {
      window.clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = null;
    }
  }, []);

  /** Called when a crossfade is over: drop the ghost, run a queued key press. */
  const endTransition = useCallback(() => {
    clearSafetyTimer();
    fadePendingRef.current = false;
    busyRef.current = false;
    setGhost(null);

    const pending = pendingDirRef.current;
    pendingDirRef.current = 0;

    if (pending !== 0) navigateRef.current(pending);
  }, [clearSafetyTimer]);

  const openAt = useCallback(
    (index: number, thumb: HTMLImageElement | null) => {
      lastFocusedRef.current = document.activeElement as HTMLElement | null;
      originRectRef.current = thumb ? getVisibleRect(thumb) : null;
      setNoFadeSrc(null);
      setActiveIndex(index);
    },
    []
  );

  const closeLightbox = useCallback(() => {
    originRectRef.current = null;
    pendingDirRef.current = 0;
    fadePendingRef.current = false;
    busyRef.current = false;
    clearSafetyTimer();
    setGhost(null);
    setNoFadeSrc(null);
    setActiveIndex(null);
    lastFocusedRef.current?.focus?.();
  }, [clearSafetyTimer]);

  /**
   * Previous / next with a crossfade: the next image fades in over the
   * current one. The next image is loaded first, so there is never an
   * empty frame in between.
   */
  const navigate = useCallback(
    async (dir: Direction) => {
      if (total < 2) return;

      if (busyRef.current) {
        pendingDirRef.current = dir; // run it right after the current crossfade
        return;
      }

      const current = activeIndexRef.current;
      if (current === null) return;

      busyRef.current = true;

      const next = (current + dir + total) % total;

      await waitForImage(images[next].src);

      // closed (or moved elsewhere) while the image was loading
      if (activeIndexRef.current !== current) {
        busyRef.current = false;
        return;
      }

      const img = lightboxImgRef.current;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (!reduceMotion && img && typeof img.animate === "function") {
        const box = img.getBoundingClientRect();

        fadePendingRef.current = true;

        setGhost({
          src: images[current].src,
          rect: {
            left: box.left,
            top: box.top,
            width: box.width,
            height: box.height,
          },
        });

        // never stay locked if the animation can't finish (e.g. image error)
        clearSafetyTimer();
        safetyTimerRef.current = window.setTimeout(
          endTransition,
          FADE_DURATION + 1500
        );

        setNoFadeSrc(images[next].src);
        setActiveIndex(next);
      } else {
        setActiveIndex(next);
        busyRef.current = false;
      }
    },
    [images, total, clearSafetyTimer, endTransition]
  );

  navigateRef.current = navigate;

  const showPrevious = useCallback(() => navigate(-1), [navigate]);
  const showNext = useCallback(() => navigate(1), [navigate]);

  /**
   * Zoom the lightbox image out of the thumbnail that was clicked:
   * start at the thumbnail's position/size, end at its normal place.
   * Runs once per open.
   */
  const playZoomIn = useCallback(() => {
    const img = lightboxImgRef.current;
    const origin = originRectRef.current;

    if (!img || !origin) return;
    if (typeof img.animate !== "function") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      originRectRef.current = null;
      return;
    }

    const target = img.getBoundingClientRect();
    if (!target.width || !target.height) return; // not loaded yet, onLoad retries

    originRectRef.current = null;

    const dx = origin.left + origin.width / 2 - (target.left + target.width / 2);
    const dy = origin.top + origin.height / 2 - (target.top + target.height / 2);
    const scale = origin.width / target.width;

    img.animate(
      [
        {
          transform: `translate(${dx}px, ${dy}px) scale(${scale})`,
        },
        {
          transform: "translate(0, 0) scale(1)",
        },
      ],
      {
        duration: ZOOM_DURATION,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      }
    );
  }, []);

  /**
   * Crossfade: the new image fades in right on top of the old one (the
   * "ghost"), then the old one fades away underneath. Nothing moves, and
   * the screen never dips to black in between. Runs for every previous / next.
   */
  const playCrossfade = useCallback(() => {
    const img = lightboxImgRef.current;

    if (!img || !fadePendingRef.current) return;

    const target = img.getBoundingClientRect();
    if (!target.width || !target.height) return; // not loaded yet, onLoad retries

    fadePendingRef.current = false;

    const ghostEl = img
      .closest(".portfolio-lightbox")
      ?.querySelector<HTMLElement>(".portfolio-lightbox-ghost");

    // old image: stays solid while the new one fades in, then fades out
    ghostEl?.animate(
      [
        { opacity: 1 },
        { opacity: 1, offset: 0.75 },
        { opacity: 0 },
      ],
      { duration: FADE_DURATION, easing: FADE_EASING, fill: "forwards" }
    );

    const incoming = img.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: FADE_DURATION,
      easing: FADE_EASING,
    });

    incoming.onfinish = endTransition;
    incoming.oncancel = endTransition;
  }, [endTransition]);

  const playEnter = useCallback(() => {
    if (originRectRef.current) {
      playZoomIn();
    } else {
      playCrossfade();
    }
  }, [playZoomIn, playCrossfade]);

  // Runs while React attaches the image (before the browser paints),
  // so there is no flash of the full-size image before the animation starts.
  const setLightboxImg = useCallback(
    (node: HTMLImageElement | null) => {
      lightboxImgRef.current = node;
      if (node && node.complete && node.naturalWidth > 0) {
        playEnter();
      }
    },
    [playEnter]
  );

  // Keyboard: Escape / Arrow keys
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeLightbox, showPrevious, showNext]);

  // Lock background scroll while the lightbox is open
  useEffect(() => {
    if (!isOpen) return;

    const previousBody = document.body.style.overflow;
    const previousHtml = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousBody;
      document.documentElement.style.overflow = previousHtml;
    };
  }, [isOpen]);

  // Preload the neighbouring images so next / previous feels instant
  useEffect(() => {
    if (activeIndex === null || total < 2) return;

    [1, -1].forEach((step) => {
      const preload = new Image();
      preload.src = images[(activeIndex + step + total) % total].src;
    });
  }, [activeIndex, images, total]);

  // Never leave a timer behind
  useEffect(() => clearSafetyTimer, [clearSafetyTimer]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start) return;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;

    // Horizontal swipe only; never blocks normal touch scrolling
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) showNext();
      else showPrevious();
    }
  };

  if (total === 0) {
    return (
      <div className="portfolio-empty">
        <p>No projects available yet.</p>
        <span>New projects will appear here soon.</span>
      </div>
    );
  }

  return (
    <>
      <div className="portfolio-gallery-grid">
        {visibleImages.map((image, index) => (
          <GalleryCard
            key={image.src}
            image={image}
            index={index}
            onOpen={openAt}
          />
        ))}
      </div>

      {hasMore && (
        <div
          ref={sentinelRef}
          className="portfolio-gallery-loader"
          aria-live="polite"
        >
          {isLoading && (
            <>
              <span aria-hidden="true" />
              Loading more projects…
            </>
          )}
        </div>
      )}

      {!hasMore && total > BATCH_SIZE && (
        <p className="portfolio-gallery-progress">
          All {total} projects loaded
        </p>
      )}

      {activeIndex !== null &&
        createPortal(
        <div
          className="portfolio-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Project image preview"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            ref={closeRef}
            type="button"
            className="portfolio-lightbox-close"
            onClick={(event) => {
              event.stopPropagation();
              closeLightbox();
            }}
            aria-label="Close preview"
          >
            ×
          </button>

          <button
            type="button"
            className="portfolio-lightbox-arrow portfolio-lightbox-prev"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
            aria-label="Previous image"
          >
            ‹
          </button>

          <div className="portfolio-lightbox-content">
            <img
              key={images[activeIndex].src}
              ref={setLightboxImg}
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              onLoad={playEnter}
              onClick={(event) => event.stopPropagation()}
              onContextMenu={(event) => event.preventDefault()}
              draggable={false}
              // an image that arrives by crossfade must not play the opening
              // fade as well (kept while it is shown, so nothing restarts)
              style={
                noFadeSrc === images[activeIndex].src
                  ? { animation: "none" }
                  : undefined
              }
            />
            <p>
              {activeIndex + 1} / {total}
            </p>
          </div>

          {ghost && (
            <img
              className="portfolio-lightbox-ghost"
              src={ghost.src}
              alt=""
              aria-hidden="true"
              draggable={false}
              style={{
                left: ghost.rect.left,
                top: ghost.rect.top,
                width: ghost.rect.width,
                height: ghost.rect.height,
              }}
            />
          )}

          <button
            type="button"
            className="portfolio-lightbox-arrow portfolio-lightbox-next"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            aria-label="Next image"
          >
            ›
          </button>
        </div>,
        document.body
      )}
    </>
  );
}
