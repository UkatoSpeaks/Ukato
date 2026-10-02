import { Fragment } from "react";
import { contact } from "@/content/data";
import { CopyButton } from "@/components/CopyButton";

const links = contact.links.filter((l) => l.id !== "mail");

export function Contact() {
  const mailto = `mailto:${contact.email}`;

  return (
    <div>
      <p>{contact.note}</p>
      <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <a href={mailto} className="link text-[17px] font-name break-all">
          {contact.email}
        </a>
        <CopyButton value={contact.email} fallbackHref={mailto} />
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
