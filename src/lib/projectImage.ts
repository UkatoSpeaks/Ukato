import { existsSync } from "node:fs";
import { join } from "node:path";

/** Public path of a project's screenshot, or undefined when none was captured. */
export function projectImage(slug: string): string | undefined {
  const file = join(process.cwd(), "public", "projects", `${slug}.webp`);
  return existsSync(file) ? `/projects/${slug}.webp` : undefined;
}
