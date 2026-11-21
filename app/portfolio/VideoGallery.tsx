"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useInfiniteBatch } from "./useInfiniteBatch";

type VideoItem = {
  src: string;
  alt: string;
};

type VideoGalleryProps = {
  videos: VideoItem[];
};

type Rect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

const BATCH_SIZE = 30;
const LOAD_MARGIN = 500;
const ZOOM_DURATION = 480;

/** The area the video frame really occupies inside its thumbnail (object-fit: contain). */
function getVisibleRect(video: HTMLVideoElement): Rect {
  const box = video.getBoundingClientRect();
  const nw = video.videoWidth;
  const nh = video.videoHeight;

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

type VideoCardProps = {
  video: VideoItem;
  index: number;
  onOpen: (index: number, thumb: HTMLVideoElement | null) => void;
};

/**
 * Thumbnails never play on their own (they only show the first frame),
 * so two videos can never play at the same time in the grid.
 */
const VideoCard = memo(function VideoCard({
  video,
  index,
  onOpen,
}: VideoCardProps) {
  return (
    <button
      type="button"
      className="portfolio-gallery-card"
      onClick={(event) =>
        onOpen(index, event.currentTarget.querySelector("video"))
      }
      aria-label={`Play ${video.alt}`}
    >
      <video
        src={`${video.src}#t=0.1`}
        preload="metadata"
        muted
        playsInline
        tabIndex={-1}
        aria-hidden="true"
      />
      <span className="portfolio-video-play" aria-hidden="true" />
    </button>
  );
});

export default function VideoGallery({ videos }: VideoGalleryProps) {
  const total = videos.length;

  const { visibleCount, hasMore, isLoading, sentinelRef } = useInfiniteBatch(
    total,
    BATCH_SIZE,
    LOAD_MARGIN
  );

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isOpen = activeIndex !== null;

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const lightboxVideoRef = useRef<HTMLVideoElement | null>(null);
  const originRectRef = useRef<Rect | null>(null);

  const visibleVideos = useMemo(
    () => videos.slice(0, visibleCount),
    [videos, visibleCount]
  );

  const openAt = useCallback(
    (index: number, thumb: HTMLVideoElement | null) => {
      lastFocusedRef.current = document.activeElement as HTMLElement | null;
      originRectRef.current = thumb ? getVisibleRect(thumb) : null;
      setActiveIndex(index);
    },
    []
  );

  const closeLightbox = useCallback(() => {
    originRectRef.current = null;
    setActiveIndex(null); // the <video> unmounts, so playback stops
    lastFocusedRef.current?.focus?.();
  }, []);

  const showPrevious = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((current) =>
      current === null ? null : (current - 1 + total) % total
    );
  }, [total]);

  const showNext = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % total
    );
  }, [total]);

  // Zoom the player out of the clicked thumbnail (runs once per open)
  const playZoomIn = useCallback(() => {
    const video = lightboxVideoRef.current;
    const origin = originRectRef.current;

    if (!video || !origin) return;
    if (typeof video.animate !== "function") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      originRectRef.current = null;
      return;
    }

    // Until metadata is loaded the element has a default 300x150 size
    if (video.readyState < 1 || !video.videoWidth) return;

    const target = video.getBoundingClientRect();
    if (!target.width || !target.height) return;

    originRectRef.current = null;

    const dx = origin.left + origin.width / 2 - (target.left + target.width / 2);
    const dy = origin.top + origin.height / 2 - (target.top + target.height / 2);
    const scale = origin.width / target.width;

    video.animate(
      [
        { transform: `translate(${dx}px, ${dy}px) scale(${scale})` },
        { transform: "translate(0, 0) scale(1)" },
      ],
      {
        duration: ZOOM_DURATION,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      }
    );
  }, []);

  const setLightboxVideo = useCallback(
    (node: HTMLVideoElement | null) => {
      lightboxVideoRef.current = node;
      if (node && node.readyState >= 1) {
        playZoomIn();
      }
    },
    [playZoomIn]
  );

  // Keyboard
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const onVideo = target?.tagName === "VIDEO";
      const onButton = target?.tagName === "BUTTON";

      if (event.key === "Escape") {
        closeLightbox();
        return;
      }

      // When the player itself has focus, arrows seek inside the video
      if (event.key === "ArrowLeft" && !onVideo) showPrevious();
      if (event.key === "ArrowRight" && !onVideo) showNext();

      // Space = play / pause (unless a button or the player handles it)
      if (event.key === " " && !onVideo && !onButton) {
        event.preventDefault();
        const video = lightboxVideoRef.current;
        if (video) {
          if (video.paused) void video.play();
          else video.pause();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeLightbox, showPrevious, showNext]);

  // Lock background scroll while the player is open
  useEffect(() => {
    if (!isOpen) return;

    const previousBody = document.body.style.overflow;
    const previousHtml = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = previousBody;
      document.documentElement.style.overflow = previousHtml;
    };
  }, [isOpen]);

  if (total === 0) {
    return (
      <div className="portfolio-empty">
        <p>No videos available yet.</p>
        <span>New video projects will appear here soon.</span>
      </div>
    );
  }

  return (
    <>
      <div className="portfolio-gallery-grid">
        {visibleVideos.map((video, index) => (
          <VideoCard
            key={video.src}
            video={video}
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
          ref={dialogRef}
          tabIndex={-1}
          className="portfolio-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Video preview"
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="portfolio-lightbox-close"
            onClick={(event) => {
              event.stopPropagation();
              closeLightbox();
            }}
            aria-label="Close video"
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
            aria-label="Previous video"
          >
            ‹
          </button>

          <div className="portfolio-lightbox-content">
            {/* key = new player per video, so only one video ever exists / plays */}
            <video
              key={videos[activeIndex].src}
              ref={setLightboxVideo}
              src={videos[activeIndex].src}
              controls
              autoPlay
              playsInline
              aria-label={videos[activeIndex].alt}
              onLoadedMetadata={playZoomIn}
              onClick={(event) => event.stopPropagation()}
            />
            <p>
              {activeIndex + 1} / {total}
            </p>
          </div>

          <button
            type="button"
            className="portfolio-lightbox-arrow portfolio-lightbox-next"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            aria-label="Next video"
          >
            ›
          </button>
        </div>,
        document.body
      )}
    </>
  );
}
