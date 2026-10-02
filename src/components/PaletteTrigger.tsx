"use client";

/** Event the command palette listens for. */
export const OPEN_PALETTE = "palette:open";

type Props = {
  label: string;
  className?: string;
  children: React.ReactNode;
};

/** A button that opens the command palette. */
export function PaletteTrigger({ label, className, children }: Props) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-haspopup="dialog"
      onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE))}
      className={className}
    >
      {children}
    </button>
  );
}
