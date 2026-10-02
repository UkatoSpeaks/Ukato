import Image from "next/image";
import { MapPin, Search, Star } from "lucide-react";
import { contact, palette, profile } from "@/content/data";
import { projectImage } from "@/lib/projectImage";
import { PaletteTrigger } from "@/components/PaletteTrigger";
import { Reveal } from "@/components/Reveal";

export function Hero() {
  const banner = projectImage(profile.banner);
  const avatar = projectImage(profile.avatar);
  const github = contact.links.find((l) => l.id === "github");

  return (
    <Reveal className="col pb-7">
      {/* Without the files, both frames stay as plain neutral blocks. */}
      <div className="px-3 pt-3">
        <div className="group relative aspect-[4/1] overflow-hidden rounded-xl border border-border bg-surface-2">
          {banner && (
            <Image
              src={banner}
              alt=""
              fill
              unoptimized
              priority
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
            />
          )}
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-5 px-4 sm:flex-row sm:items-center sm:px-8">
        <div className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-border bg-surface-2">
          {avatar && (
            <Image
              src={avatar}
              alt={`Portrait of ${profile.name}`}
              fill
              unoptimized
              className="object-cover"
            />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="font-display text-[40px] leading-none tracking-[-0.04em] text-text">
            {profile.name}
          </h1>
          <p className="mt-2.5 font-mono text-[13px] tracking-normal text-muted">
            {profile.role}
          </p>
          <p className="mt-1.5 flex items-center gap-1.5 font-mono text-[11px] tracking-[0.04em] text-faint">
            <MapPin size={12} strokeWidth={1.75} aria-hidden />
            {profile.location}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {github && (
            <a
              href={github.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${github.label} profile`}
              className="p-1.5 text-muted transition-colors duration-200 hover:text-text"
            >
              <Star size={18} strokeWidth={1.75} />
            </a>
          )}
          <PaletteTrigger
            label={palette.label}
            className="inline-flex h-8 items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 font-mono text-[11px] tracking-[0.06em] text-muted transition-colors duration-200 hover:text-text"
          >
            <Search size={14} strokeWidth={1.75} />
            ⌘K
          </PaletteTrigger>
        </div>
      </div>
    </Reveal>
  );
}
