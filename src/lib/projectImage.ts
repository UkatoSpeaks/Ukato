import { existsSync } from "node:fs";
import { join } from "node:path";
import { isTodo } from "@/content/data";

/**
 * A public path from the content file, or undefined when it is still a TODO or
 * the file has not been added yet. Callers show a placeholder for undefined.
 */
export function projectImage(path: string): string | undefined {
  if (isTodo(path)) return undefined;
  return existsSync(join(process.cwd(), "public", path)) ? path : undefined;
}
