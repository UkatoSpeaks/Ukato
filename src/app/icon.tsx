import { ImageResponse } from "next/og";
import { profile } from "@/content/data";
import { ogFonts } from "@/lib/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon: the first letter of the name in the display font. The avatar
    drawing is too detailed to read at this size. */
export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          borderRadius: 7,
          fontFamily: "Instrument Serif",
          fontSize: 28,
          lineHeight: 1,
          color: "#f5f5f5",
        }}
      >
        {profile.name[0]}
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
