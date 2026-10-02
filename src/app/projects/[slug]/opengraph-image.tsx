import { profile, projects } from "@/content/data";
import { ogImage, ogSize } from "@/lib/og";

export const alt = "Project case study";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Props = { params: { slug: string } | Promise<{ slug: string }> };

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  return ogImage({
    title: project?.title ?? profile.name,
    line: project ? `${project.year} · ${project.category}` : profile.role,
    footer: profile.name.toUpperCase(),
    accent: project?.accentColor,
  });
}
