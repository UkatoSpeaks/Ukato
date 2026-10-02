import { site } from "@/content/data";
import { ogSize } from "@/lib/og";
import Image from "./opengraph-image";

// The same picture as the Open Graph image.
export const alt = site.title;
export const size = ogSize;
export const contentType = "image/png";

export default Image;
