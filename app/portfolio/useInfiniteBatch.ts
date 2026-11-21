"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Shows `batchSize` items first, then reveals the next batch when the
 * sentinel element is within `margin` px of the viewport bottom.
 * Uses IntersectionObserver (no scroll listeners), one load at a time.
 */
export function useInfiniteBatch(
  total: number,
  batchSize = 30,
  margin = 500
) {
  const [visibleCount, setVisibleCount] = useState(
    Math.min(batchSize, total)
  );
  const [isLoading, setIsLoading] = useState(false);

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const lockRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  const hasMore = visibleCount < total;

  useEffect(() => {
    if (!hasMore) return;

    const node = sentinelRef.current;
    if (!node) return;

    // A new observer is created after every batch, so if the sentinel
    // is still near the viewport (tall screens) the next batch loads too.
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        if (lockRef.current) return;

        lockRef.current = true;
        setIsLoading(true);

        timerRef.current = window.setTimeout(() => {
          timerRef.current = null;
          setVisibleCount((count) => Math.min(count + batchSize, total));
          lockRef.current = false;
          setIsLoading(false);
        }, 250);
      },
      { rootMargin: `0px 0px ${margin}px 0px` }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [hasMore, visibleCount, total, batchSize, margin]);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      lockRef.current = false;
    };
  }, []);

  return { visibleCount, hasMore, isLoading, sentinelRef };
}