// 挙動がごみすぎて使い物にならないから使わないと思う。

"use client";
import { useEffect, useRef } from 'react';

export const useSmoothScroll = (containerId: string): void => {
  const isScrolling = useRef<boolean>(false);
  const targetScrollY = useRef<number>(0);
  const pendingScrollY = useRef<number | null>(null);
  const start = useRef<number | null>(null);

  useEffect(() => {
    if (!containerId) return;

    const scrollContainer = document.querySelector<HTMLElement>(`#${containerId}`);
    if (!scrollContainer) {
      console.error(`#${containerId} not found`);
      return;
    }
    const easeOutCubic = (t: number, b: number, c: number, d: number): number => {
      t /= d;
      t--;
      return c * (t * t * t + 1) + b;
    };

    const animateScroll = (timestamp: number, startY: number, targetY: number, duration: number): void => {
      if (!isScrolling.current) return;

      if (start.current === null) start.current = timestamp;
      const elapsed = timestamp - start.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedPosition = easeOutCubic(progress, startY, targetY - startY, duration);

      scrollContainer.scrollTo(0, easedPosition);

      if (progress < 1 || targetScrollY.current !== targetY) {
        window.requestAnimationFrame((newTimestamp) =>
          animateScroll(newTimestamp, startY, targetScrollY.current, duration)
        );
      } else {
        isScrolling.current = false;
        start.current = null;

        if (pendingScrollY.current !== null) {
          targetScrollY.current = pendingScrollY.current;
          pendingScrollY.current = null;
          isScrolling.current = true;
          const newStartY = scrollContainer.scrollTop;
          start.current = performance.now();
          window.requestAnimationFrame((newTimestamp) =>
            animateScroll(newTimestamp, newStartY, targetScrollY.current, duration)
          );
        }
      }
    };

    const handleWheel = (e: WheelEvent): void => {
      e.preventDefault();

      const baseScrollAmount = 45000;
      const scrollSpeed = Math.min(Math.abs(e.deltaY) / 100, 10);
      const scrollAmount = baseScrollAmount * scrollSpeed;

      const maxScrollAmount = 40000;
      const cappedScrollAmount = Math.min(scrollAmount, maxScrollAmount);
      const newTargetScrollY = scrollContainer.scrollTop + Math.sign(e.deltaY) * cappedScrollAmount;

      const duration = 500 - (scrollSpeed * 20);

      if (isScrolling.current) {
        pendingScrollY.current = newTargetScrollY;
      } else {
        targetScrollY.current = newTargetScrollY;
        isScrolling.current = true;
        const startY = scrollContainer.scrollTop;
        start.current = performance.now();
        window.requestAnimationFrame((timestamp) => animateScroll(timestamp, startY, targetScrollY.current, duration));
      }
    };

    scrollContainer.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel);
    };
  }, [containerId]);
};
