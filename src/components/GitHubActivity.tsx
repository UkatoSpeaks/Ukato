import { Suspense } from "react";
import { contact, github } from "@/content/data";
import { getContributions } from "@/lib/github";
import {
  ContributionGraph,
  ContributionSkeleton,
} from "@/components/ContributionGraph";

/** Years shown as tabs: this one and the two before it. */
function tabYears() {
  const now = new Date().getFullYear();
  return [now, now - 1, now - 2];
}

async function Graph({ href }: { href: string }) {
  const years = await Promise.all(
    tabYears().map(async (year) => ({
      year,
      data: await getContributions(github.username, year),
    })),
  );
  return (
    <ContributionGraph
      years={years}
      href={href}
      today={new Date().toISOString().slice(0, 10)}
    />
  );
}

export function GitHubActivity() {
  const href = contact.links.find((l) => l.id === "github")?.href ?? "";

  return (
    <Suspense fallback={<ContributionSkeleton years={tabYears()} />}>
      <Graph href={href} />
    </Suspense>
  );
}
