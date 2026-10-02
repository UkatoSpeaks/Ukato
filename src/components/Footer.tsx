import { footer, profile } from "@/content/data";
import { FooterClock } from "@/components/FooterClock";

export function Footer() {
  return (
    <footer>
      <div className="rule" />
      <div className="hatch">
        <div className="col h-6 bg-bg" />
      </div>
      <div className="h-px bg-border" />

      <div className="col px-4 py-12 text-center sm:px-8">
        <p className="text-base text-soft">
          {footer.credit}{" "}
          <span className="font-bold text-text">{profile.name}</span>
        </p>
        <p className="mt-3 font-mono text-xs tracking-normal text-muted">
          © {new Date().getFullYear()} {footer.rights}
        </p>
        <p className="mt-3 flex flex-wrap items-center justify-center gap-x-2 font-mono text-xs tracking-normal text-muted">
          <span
            aria-hidden
            className="mr-0.5 size-1.5 animate-seal-pulse rounded-full bg-[#22c55e]"
          />
          {profile.location}
          <span aria-hidden className="text-faint">
            ·
          </span>
          <FooterClock />
        </p>
      </div>
    </footer>
  );
}
