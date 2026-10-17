"use client";

import { ReactNode, useEffect, useRef } from "react";

/**
 * Pins the hero underneath the page so the next sections slide over it.
 *
 * When the hero is taller than the screen (e.g. with the booking widget),
 * pinning it at top: 0 would hide its bottom. Instead it's pinned by its
 * bottom edge: it scrolls normally until its bottom reaches the bottom of
 * the screen, then stays put while the page scrolls over it.
 */
export default function HeroStage({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const offset = Math.min(0, window.innerHeight - el.offsetHeight);
      el.style.top = `${offset}px`;
    };

    update();

    // Fonts, images and the widget can change the hero's height after load.
    const ro =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
    ro?.observe(el);
    window.addEventListener("resize", update);

    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
