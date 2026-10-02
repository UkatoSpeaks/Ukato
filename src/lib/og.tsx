import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

// The dark theme's colors; link previews do not follow the visitor's theme.
const BG = "#0a0a0a";
const TEXT = "#f5f5f5";
const MUTED = "#a1a1a1";
const BORDER = "rgba(255, 255, 255, 0.1)";

const root = process.cwd();
const font = (file: string) => readFile(join(root, "src/assets/fonts", file));

/** Instrument Serif and Geist Mono, as used on the site. */
export async function ogFonts() {
  const [serif, mono] = await Promise.all([
    font("InstrumentSerif-Regular.ttf"),
    font("GeistMono-Medium.ttf"),
  ]);
  return [
    { name: "Instrument Serif", data: serif, weight: 400 as const },
    { name: "Geist Mono", data: mono, weight: 500 as const },
  ];
}

type Props = {
  /** Large line in the display font. */
  title: string;
  /** Mono line under the title. */
  line: string;
  /** Small mono line at the bottom. */
  footer?: string;
  /** Public path of an image shown beside the title. */
  image?: string;
  /** Color of the dot before `line`. */
  accent?: string;
};

/** 1200×630 link preview: dark page, hatch pattern, serif title, mono line. */
export async function ogImage({ title, line, footer, image, accent }: Props) {
  const picture = image
    ? `data:image/svg+xml;base64,${(await readFile(join(root, "public", image))).toString("base64")}`
    : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: BG,
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 9px)",
          padding: 56,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: BG,
            border: `1px solid ${BORDER}`,
            borderRadius: 16,
            padding: 56,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 48 }}>
            {picture && (
              // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
              <img
                src={picture}
                width={200}
                height={200}
                style={{ borderRadius: 24, border: `1px solid ${BORDER}` }}
              />
            )}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  fontFamily: "Instrument Serif",
                  fontSize: title.length > 18 ? 84 : 104,
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  color: TEXT,
                }}
              >
                {title}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginTop: 28,
                  fontFamily: "Geist Mono",
                  fontSize: 28,
                  color: MUTED,
                }}
              >
                {accent && (
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 8,
                      background: accent,
                    }}
                  />
                )}
                {line}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontFamily: "Geist Mono",
              fontSize: 22,
              letterSpacing: "0.08em",
              color: MUTED,
            }}
          >
            <div style={{ display: "flex" }}>{footer}</div>
            {accent && (
              <div
                style={{
                  width: 120,
                  height: 4,
                  borderRadius: 2,
                  background: accent,
                }}
              />
            )}
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: await ogFonts() },
  );
}
