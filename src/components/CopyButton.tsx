"use client";

import { useEffect, useState } from "react";

/** Copies `value`; if the clipboard is unavailable it opens `fallbackHref`. */
export function CopyButton({
  value,
  fallbackHref,
}: {
  value: string;
  fallbackHref: string;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1500);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      window.location.href = fallbackHref;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="text-[15px] text-ink-3 decoration-1 underline-offset-[3px] hover:underline"
    >
      {/* Keyed so each swap remounts and replays the fade. */}
      <span key={String(copied)} className="inline-block animate-fade" aria-live="polite">
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
  );
}
