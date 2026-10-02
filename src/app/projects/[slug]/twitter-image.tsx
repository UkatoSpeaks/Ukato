import { ogSize } from "@/lib/og";
import Image, { generateStaticParams } from "./opengraph-image";

// The same picture as the Open Graph image.
export const alt = "Project case study";
export const size = ogSize;
export const contentType = "image/png";

export { generateStaticParams };
export default Image;
