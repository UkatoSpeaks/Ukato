import { about, isTodo, nowPlaying } from "@/content/data";
import { projectImage } from "@/lib/projectImage";
import { NowPlaying } from "@/components/NowPlaying";

export function About() {
  // Without the file or a title, the player renders in its empty state.
  const audioSrc = isTodo(nowPlaying.title)
    ? undefined
    : projectImage(nowPlaying.audioSrc);

  return (
    <div>
      <ul className="space-y-4">
        {about.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-3 text-base text-text">
            <span
              aria-hidden
              className="mt-[0.75em] size-[3px] shrink-0 rounded-full bg-faint"
            />
            {bullet}
          </li>
        ))}
      </ul>
      <NowPlaying src={audioSrc} />
    </div>
  );
}
