import { about } from "@/content/data";

export function Intro() {
  return (
    <div>
      <div className="space-y-4">
        {about.bullets.map((bullet) => (
          <p key={bullet}>{bullet}</p>
        ))}
      </div>
    </div>
  );
}
