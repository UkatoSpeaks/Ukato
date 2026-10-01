import { achievements } from "@/content/data";

export function Recognition() {
  return (
    <ul className="space-y-4">
      {achievements.map((a) => {
        const body = (
          <>
            <p className="text-ink">{a.title}</p>
            {a.detail && <p className="text-[15px]">{a.detail}</p>}
          </>
        );
        return (
          <li key={a.title}>
            {a.href ? (
              <a
                href={a.href}
                target="_blank"
                rel="noreferrer"
                className="-mx-3 -my-2 block rounded-lg px-3 py-2 transition-colors duration-150 hover:bg-paper-2"
              >
                {body}
              </a>
            ) : (
              body
            )}
          </li>
        );
      })}
    </ul>
  );
}
