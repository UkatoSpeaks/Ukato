type Props = {
  title: string;
  subtitle?: string;
  /** Dates or other small right-aligned meta. */
  meta?: string;
  /** Only linked entries get the hover fill. */
  href?: string;
  children?: React.ReactNode;
};

/** A CV row: title over subtitle on the left, meta on the right, body below. */
export function Entry({ title, subtitle, meta, href, children }: Props) {
  const body = (
    <>
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <p className="font-name text-ink">{title}</p>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {meta && <p className="meta shrink-0 pt-[3px]">{meta}</p>}
      </div>
      {children && <div className="mt-2 text-[15px]">{children}</div>}
    </>
  );

  if (!href) return <div>{body}</div>;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="-mx-3 -my-2.5 block rounded-lg px-3 py-2.5 transition-colors duration-150 hover:bg-paper-2"
    >
      {body}
    </a>
  );
}
