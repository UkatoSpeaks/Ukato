import { ImageResponse } from "next/og";
import { profile } from "@/content/data";
import { ogFonts } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon: the favicon's monogram, without rounding (iOS masks it). */
export default async function AppleIcon() {
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
          fontFamily: "Instrument Serif",
          fontSize: 140,
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
