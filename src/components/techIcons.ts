import type { ComponentType } from "react";
import {
  Box,
  Braces,
  Database,
  FileSearch,
  Waypoints,
  Zap,
} from "lucide-react";
import {
  SiCplusplus,
  SiFastapi,
  SiGit,
  SiHuggingface,
  SiJavascript,
  SiLangchain,
  SiLanggraph,
  SiNextdotjs,
  SiNodedotjs,
  SiPandas,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRender,
  SiScikitlearn,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

export type TechIcon = {
  icon: ComponentType<{ size?: number; className?: string }>;
  /** Brand color. */
  color: string;
  /** Lighter version for the dark theme, where the brand color is too dark. */
  dark?: string;
};

/** Logos that are black or white take the text color. */
const TEXT = "var(--text)";

/**
 * Logo and color for each name in `techStack`. Simple Icons where the tech
 * has a logo there; otherwise a lucide icon in a color picked for it.
 */
export const techIcons: Record<string, TechIcon> = {
  Python: { icon: SiPython, color: "#3776AB", dark: "#4B8BBE" },
  TypeScript: { icon: SiTypescript, color: "#3178C6", dark: "#4A8FDB" },
  JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
  "C++": { icon: SiCplusplus, color: "#00599C", dark: "#3D8FCC" },
  React: { icon: SiReact, color: "#61DAFB" },
  "Next.js": { icon: SiNextdotjs, color: TEXT },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
  "Node.js": { icon: SiNodedotjs, color: "#5FA04E" },
  FastAPI: { icon: SiFastapi, color: "#009688", dark: "#14B8A6" },
  PostgreSQL: { icon: SiPostgresql, color: "#4169E1", dark: "#6C8CF0" },
  Supabase: { icon: SiSupabase, color: "#3FCF8E" },
  LangChain: { icon: SiLangchain, color: TEXT },
  LangGraph: { icon: SiLanggraph, color: TEXT },
  "Hugging Face": { icon: SiHuggingface, color: "#FFD21E" },
  "scikit-learn": { icon: SiScikitlearn, color: "#F7931E" },
  pandas: { icon: SiPandas, color: "#150458", dark: "#9D8CF0" },
  Git: { icon: SiGit, color: "#F05032" },
  Vercel: { icon: SiVercel, color: TEXT },
  Render: { icon: SiRender, color: "#46E3B7" },

  // No logo in Simple Icons.
  "REST APIs": { icon: Braces, color: "#38BDF8" },
  ChromaDB: { icon: Database, color: "#FFB454" },
  RAG: { icon: FileSearch, color: "#A78BFA" },
  Groq: { icon: Zap, color: "#F55036" },
  "Vector Embeddings": { icon: Waypoints, color: "#F472B6" },
};

export const fallbackIcon: TechIcon = { icon: Box, color: "var(--muted)" };
