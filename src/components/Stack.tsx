import { techStack } from "@/content/data";

export function Stack() {
  return (
    <dl className="space-y-2.5 text-[15px]">
      {techStack.map((group) => (
        <div key={group.category} className="sm:grid sm:grid-cols-[72px_1fr]">
          <dt className="mr-3 inline text-ink-3 sm:mr-0 sm:block">
            {group.category}
          </dt>
          <dd className="inline sm:block">{group.items.join(", ")}</dd>
        </div>
      ))}
    </dl>
  );
}
