// Fractal noise mapped to alpha, so the mask eats small flecks out of the
// stamp the way an uneven ink pad would.
const noise = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='56' height='56'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='7'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -1.5 1.6'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`,
)}")`;

export function Seal({ size = 28 }: { size?: number }) {
  return (
    <span
      aria-hidden
      className="flex shrink-0 -rotate-[4deg] items-center justify-center bg-seal leading-none text-paper select-none"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.57,
        borderRadius: size * 0.215,
        letterSpacing: 0,
        maskImage: noise,
        WebkitMaskImage: noise,
        maskSize: "100% 100%",
        WebkitMaskSize: "100% 100%",
        fontFamily:
          '"Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", "Songti SC", serif',
      }}
    >
      忍
    </span>
  );
}
