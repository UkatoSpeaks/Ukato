import { projects } from "@/content/data";
import { projectImage } from "@/lib/projectImage";
import { WorkList } from "@/components/WorkList";

export function SelectedWork() {
  const featured = projects
    .filter((p) => p.featured)
    .map((p) => ({
      slug: p.slug,
      name: p.title,
      oneLiner: p.description,
      year: p.year,
      live: p.status === "live",
      image: projectImage(p.image),
    }));
  const others = projects
    .filter((p) => !p.featured)
    .map((p) => ({
      slug: p.slug,
      name: p.title,
      category: p.category,
      year: p.year,
    }));

  return <WorkList featured={featured} others={others} />;
}
