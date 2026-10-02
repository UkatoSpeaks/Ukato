"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/data";

const format = new Intl.DateTimeFormat("en-US", {
  timeZone: profile.timezone,
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

/** Local time where I am, ticking every second. */
export function FooterClock() {
  // Empty until mounted, so server and client markup match.
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return <time className="tabular-nums">{time ?? "--:--:-- --"}</time>;
}
