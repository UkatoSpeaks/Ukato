"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { nowPlaying } from "@/content/data";

/** Degrees per second at full speed: one turn every 3s. */
const SPEED = 120;
/** The record: center dot and label, groove rings, and a soft sheen that makes
    the turning visible. Dark on both themes. */
const DISC = [
  "radial-gradient(circle, #e5e5e5 0 2.5px, #1a1a1a 3px 17px, transparent 17.5px)",
  "repeating-radial-gradient(circle, transparent 0 4px, rgb(255 255 255 / 0.07) 4.5px 5px)",
  "conic-gradient(from 30deg, transparent, rgb(255 255 255 / 0.09) 25deg, transparent 50deg 180deg, rgb(255 255 255 / 0.09) 205deg, transparent 230deg)",
  "#111111",
].join(", ");

type Props = {
  /** Public path of the track, or undefined when there is nothing to play. */
  src?: string;
};

export function NowPlaying({ src }: Props) {
  const audio = useRef<HTMLAudioElement>(null);
  const disc = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const available = src !== undefined && !failed;

  // Spin the record. The speed eases towards its target, so the record winds
  // up on play and coasts to a stop on pause.
  useEffect(() => {
    if (reduce) return;
    let frame = 0;
    let last = performance.now();
    let speed = 0;
    let angle = 0;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      speed += ((playing ? SPEED : 0) - speed) * Math.min(1, dt * 4);
      angle = (angle + speed * dt) % 360;
      if (disc.current) disc.current.style.transform = `rotate(${angle}deg)`;
      if (playing || speed > 0.5) frame = requestAnimationFrame(tick);
    };

    // Carry on from where the record stopped.
    const current = disc.current?.style.transform.match(/rotate\(([\d.]+)deg\)/);
    if (current) angle = Number(current[1]);
    if (!playing) speed = current ? SPEED : 0;

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, reduce]);

  const toggle = () => {
    const el = audio.current;
    if (!el || !available) return;
    if (el.paused) el.play().catch(() => setPlaying(false));
    else el.pause();
  };

  const seek = (fraction: number) => {
    const el = audio.current;
    if (!el || !available || !Number.isFinite(el.duration)) return;
    el.currentTime = Math.min(1, Math.max(0, fraction)) * el.duration;
    setProgress(el.currentTime / el.duration);
  };

  const title = available ? nowPlaying.title : nowPlaying.empty.title;
  const artist = available ? nowPlaying.artist : nowPlaying.empty.artist;

  return (
    <div className="mt-8 flex items-center gap-4 sm:gap-6">
      {src && (
        <audio
          ref={audio}
          src={src}
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setProgress(0)}
          onError={() => setFailed(true)}
          onTimeUpdate={(e) => {
            const el = e.currentTarget;
            if (el.duration > 0) setProgress(el.currentTime / el.duration);
          }}
        />
      )}

      <div aria-hidden className="relative h-[124px] w-[132px] shrink-0">
        <div
          ref={disc}
          className="absolute bottom-0 left-0 size-[120px] rounded-full border border-white/10"
          style={{ background: DISC }}
        />

        {/* Tonearm: pivots at its head, top right, and swings onto the record. */}
        <svg viewBox="0 0 132 124" className="absolute inset-0 size-full">
          <g
            className="transition-transform duration-700 ease-in-out motion-reduce:transition-none"
            style={{
              transformOrigin: "122px 8px",
              transform: `rotate(${playing ? 28 : 8}deg)`,
            }}
          >
            <line
              x1="122"
              y1="8"
              x2="122"
              y2="68"
              stroke="var(--muted)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="122" cy="68" r="2.5" fill="var(--muted)" />
            <circle cx="122" cy="8" r="4" fill="var(--muted)" />
          </g>
        </svg>
      </div>

      <div className="min-w-0 flex-1">
        <p className="label">{nowPlaying.label}</p>

        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-8">
          <div className="min-w-0 sm:w-52">
            <p className="truncate text-[17px] font-bold text-text">{title}</p>
            <p className="mt-1.5 truncate font-mono text-xs tracking-normal text-muted">
              {artist}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous track"
              disabled={!available}
              onClick={() => seek(0)}
              className="p-1.5 text-muted transition-colors duration-200 hover:text-text disabled:pointer-events-none disabled:opacity-50"
            >
              <SkipBack size={18} strokeWidth={1.75} fill="currentColor" />
            </button>
            <button
              type="button"
              aria-label={playing ? "Pause" : "Play"}
              disabled={!available}
              onClick={toggle}
              className="inline-flex size-[52px] items-center justify-center rounded-full border border-border text-text transition-colors duration-200 hover:bg-surface-2 disabled:pointer-events-none disabled:opacity-50"
            >
              {playing ? (
                <Pause size={18} strokeWidth={1.75} fill="currentColor" />
              ) : (
                <Play
                  size={18}
                  strokeWidth={1.75}
                  fill="currentColor"
                  className="translate-x-px"
                />
              )}
            </button>
            {/* One track for now, so next starts it over as well. */}
            <button
              type="button"
              aria-label="Next track"
              disabled={!available}
              onClick={() => seek(0)}
              className="p-1.5 text-muted transition-colors duration-200 hover:text-text disabled:pointer-events-none disabled:opacity-50"
            >
              <SkipForward size={18} strokeWidth={1.75} fill="currentColor" />
            </button>
          </div>
        </div>

        {/* The bar is 2px; the padding makes it easier to hit. */}
        <div
          role="slider"
          tabIndex={available ? 0 : -1}
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          aria-disabled={!available}
          onClick={(e) => {
            const box = e.currentTarget.getBoundingClientRect();
            seek((e.clientX - box.left) / box.width);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") seek(progress + 0.05);
            if (e.key === "ArrowLeft") seek(progress - 0.05);
          }}
          className={`mt-3 py-2 ${available ? "cursor-pointer" : ""}`}
        >
          <div className="h-0.5 overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-text"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
