import { Fragment } from "react";
import { contact, site } from "@/content/data";
import { CopyButton } from "@/components/CopyButton";

const links = [
  { label: "GitHub", href: site.links.github },
  { label: "LinkedIn", href: site.links.linkedin },
  { label: "X", href: site.links.x },
  { label: "Resume", href: site.links.resume },
];

export function Contact() {
  const mailto = `mailto:${site.links.email}`;

  return (
    <div>
      <p>{contact.note}</p>
      <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <a href={mailto} className="link text-[17px] font-name break-all">
          {site.links.email}
        </a>
        <CopyButton value={site.links.email} fallbackHref={mailto} />
      </p>
      <p className="mt-6 text-[15px]">
        {links.map((l, i) => (
          <Fragment key={l.label}>
            {i > 0 && " · "}
            <a
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="link whitespace-nowrap"
            >
              {l.label} ↗
            </a>
          </Fragment>
        ))}
      </p>
    </div>
  );
}
