import { profile, site } from "@/content/data";
import { ogImage, ogSize } from "@/lib/og";

export const alt = site.title;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    title: profile.name,
    line: profile.role,
    footer: profile.location.toUpperCase(),
    image: profile.avatar,
  });
}
