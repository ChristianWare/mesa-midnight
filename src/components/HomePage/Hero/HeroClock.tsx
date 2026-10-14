"use client";

import { useSyncExternalStore } from "react";
import { SITE } from "@/config/site";

function formatNow(): string {
  const now = new Date();
  const time = new Intl.DateTimeFormat("en-US", {
    timeZone: SITE.timezone,
    hour: "numeric",
    minute: "2-digit",
  }).format(now);
  const date = new Intl.DateTimeFormat("en-US", {
    timeZone: SITE.timezone,
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(now);
  return `${time} \u2022 ${date}`;
}

function subscribe(callback: () => void) {
  const id = window.setInterval(callback, 15_000);
  return () => window.clearInterval(id);
}

/** Live local time for the business, e.g. "4:50 PM • Oct 14, 2026". */
export default function HeroClock({ className }: { className?: string }) {
  // Empty on the server, filled in on the client, so hydration never mismatches.
  const value = useSyncExternalStore(subscribe, formatNow, () => "");

  return (
    <time className={className} suppressHydrationWarning>
      {value || "\u00A0"}
    </time>
  );
}
