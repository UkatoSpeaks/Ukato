"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/data";

const ist = new Intl.DateTimeFormat("en-GB", {
  timeZone: profile.timezone,
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export function Footer() {
  // Empty until mounted so server and client markup match.
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(ist.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex items-baseline justify-between gap-6 text-ink-3">
      <p>© 2026 {profile.name}</p>
      <p className="meta">
        <time suppressHydrationWarning>{time ?? "--:--"}</time> IST
      </p>
    </div>
  );
}
