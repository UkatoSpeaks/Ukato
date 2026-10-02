type Props = {
  children: React.ReactNode;
};

/**
 * Page frame: the dashed lines down both edges of the content column, running
 * the full page height. Sections inside are full-width and place their own
 * content in the column with `col`.
 */
export function PageShell({ children }: Props) {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div
        aria-hidden
        className="col pointer-events-none absolute inset-0 z-10 border-x border-dashed border-border"
      />
      {children}
    </div>
  );
}
