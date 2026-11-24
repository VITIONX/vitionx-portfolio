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

type Direction = 1 | -1;

/** The last frame of the video that fades out. src is null if it could not be captured. */
type Ghost = {
  src: string | null;
  rect: Rect;
};

const BATCH_SIZE = 30;
const LOAD_MARGIN = 500;

const ZOOM_DURATION = 480; // thumbnail -> player (first open)
const FADE_DURATION = 450; // previous / next (crossfade)
const FADE_EASING = "cubic-bezier(0.4, 0, 0.2, 1)";

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

/** Resolves when the video's size is known (or it failed / took too long). */
function waitForVideo(src: string, timeout = 1500): Promise<void> {
  return new Promise((resolve) => {
    const probe = document.createElement("video");
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      window.clearTimeout(timer);
      probe.removeAttribute("src");
      probe.load(); // frees the request
      resolve();
    };

    const timer = window.setTimeout(finish, timeout);

    probe.preload = "metadata";
    probe.muted = true;
    probe.onloadedmetadata = finish;
    probe.onerror = finish;
    probe.src = src;
  });
}

/** Copies the frame that is on screen into a small image, or null if the browser refuses. */
function captureFrame(video: HTMLVideoElement, rect: Rect): string | null {
  try {
    if (!video.videoWidth || !rect.width || !rect.height) return null;

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(rect.width);
    canvas.height = Math.round(rect.height);

    const context = canvas.getContext("2d");
    if (!context) return null;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL("image/jpeg", 0.85);
  } catch {
    return null;
  }
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
  const [ghost, setGhost] = useState<Ghost | null>(null);
  // the video that arrived by crossfade: it must not play the opening fade too
  const [noFadeSrc, setNoFadeSrc] = useState<string | null>(null);
  const isOpen = activeIndex !== null;

  const activeIndexRef = useRef<number | null>(null);
  activeIndexRef.current = activeIndex;

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const lightboxVideoRef = useRef<HTMLVideoElement | null>(null);
  const originRectRef = useRef<Rect | null>(null);

  // previous / next crossfade bookkeeping
  const busyRef = useRef(false);
  const pendingDirRef = useRef<Direction | 0>(0);
  const fadePendingRef = useRef(false);
  const safetyTimerRef = useRef<number | null>(null);
  const navigateRef = useRef<(dir: Direction) => void>(() => {});

  const visibleVideos = useMemo(
    () => videos.slice(0, visibleCount),
    [videos, visibleCount]
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
    (index: number, thumb: HTMLVideoElement | null) => {
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
    setActiveIndex(null); // the <video> unmounts, so playback stops
    lastFocusedRef.current?.focus?.();
  }, [clearSafetyTimer]);

  /**
   * Previous / next with a crossfade: a picture of the current video's last
   * frame stays on screen while the next player fades in over it. The next
   * video's size is loaded first, so the player never jumps while fading.
   * Only one real <video> exists at any time, so only one video can play.
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

      await waitForVideo(videos[next].src);

      // closed (or moved elsewhere) while the video was loading
      if (activeIndexRef.current !== current) {
        busyRef.current = false;
        return;
      }

      const video = lightboxVideoRef.current;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (!reduceMotion && video && typeof video.animate === "function") {
        const box = video.getBoundingClientRect();
        const rect: Rect = {
          left: box.left,
          top: box.top,
          width: box.width,
          height: box.height,
        };

        fadePendingRef.current = true;

        setGhost({ src: captureFrame(video, rect), rect });

        // never stay locked if the fade can't finish (e.g. video error)
        clearSafetyTimer();
        safetyTimerRef.current = window.setTimeout(
          endTransition,
          FADE_DURATION + 2500
        );

        setNoFadeSrc(videos[next].src);
        setActiveIndex(next);
      } else {
        setActiveIndex(next);
        busyRef.current = false;
      }
    },
    [videos, total, clearSafetyTimer, endTransition]
  );

  navigateRef.current = navigate;

  const showPrevious = useCallback(() => navigate(-1), [navigate]);
  const showNext = useCallback(() => navigate(1), [navigate]);

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

  /**
   * Crossfade: the new player fades in right on top of the old frame (the
   * "ghost"), then the old frame fades away underneath. Nothing moves.
   * Runs for every previous / next.
   */
  const playCrossfade = useCallback(() => {
    const video = lightboxVideoRef.current;

    if (!video || !fadePendingRef.current) return;

    // Until metadata is loaded the element has a default 300x150 size
    if (video.readyState < 1 || !video.videoWidth) return;

    const target = video.getBoundingClientRect();
    if (!target.width || !target.height) return;

    fadePendingRef.current = false;

    const ghostEl = video
      .closest(".portfolio-lightbox")
      ?.querySelector<HTMLElement>(".portfolio-lightbox-ghost");

    // old frame: stays solid while the new player fades in, then fades out
    ghostEl?.animate(
      [
        { opacity: 1 },
        { opacity: 1, offset: 0.75 },
        { opacity: 0 },
      ],
      { duration: FADE_DURATION, easing: FADE_EASING, fill: "forwards" }
    );

    const incoming = video.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: FADE_DURATION,
      easing: FADE_EASING,
    });

    incoming.onfinish = endTransition;
    incoming.oncancel = endTransition;

    video.style.opacity = ""; // it was hidden until its size was known
  }, [endTransition]);

  const playEnter = useCallback(() => {
    if (originRectRef.current) {
      playZoomIn();
    } else {
      playCrossfade();
    }
  }, [playZoomIn, playCrossfade]);

  const setLightboxVideo = useCallback(
    (node: HTMLVideoElement | null) => {
      lightboxVideoRef.current = node;

      if (!node) return;

      // a fading-in player stays invisible until its real size is known
      if (fadePendingRef.current) node.style.opacity = "0";

      if (node.readyState >= 1) playEnter();
    },
    [playEnter]
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

  // Never leave a timer behind
  useEffect(() => clearSafetyTimer, [clearSafetyTimer]);

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
              controlsList="nodownload"
              disablePictureInPicture
              autoPlay
              playsInline
              aria-label={videos[activeIndex].alt}
              onLoadedMetadata={playEnter}
              onClick={(event) => event.stopPropagation()}
              onContextMenu={(event) => event.preventDefault()}
              // a player that arrives by crossfade must not play the opening
              // fade as well
              style={
                noFadeSrc === videos[activeIndex].src
                  ? { animation: "none" }
                  : undefined
              }
            />
            <p>
              {activeIndex + 1} / {total}
            </p>
          </div>

          {ghost && ghost.src && (
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
