// Single source of truth for all site content.
// Unknown values are "TODO_" strings. Never invent numbers, metrics or links.

export type Links = {
  github: string;
  linkedin: string;
  x: string;
  email: string;
  resume: string;
};

export type Site = {
  name: string;
  title: string;
  tagline: string;
  location: string;
  links: Links;
};

export type Experience = {
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  highlights: string[];
};

export type Education = {
  degree: string;
  school: string;
  location: string;
  start: string;
  end: string;
};

export type Achievement = {
  title: string;
  detail?: string;
};

export type Project = {
  slug: string;
  name: string;
  summary: string;
  description?: string;
  stack: string[];
  year?: string;
  links: {
    repo?: string;
    live?: string;
  };
  featured?: boolean;
};

export const site: Site = {
  name: "Anurag Chaudhary",
  title: "AI Engineer",
  tagline: "AI engineer who also ships full-stack.",
  location: "India",
  links: {
    github: "https://github.com/UkatoSpeaks",
    linkedin: "https://www.linkedin.com/in/anurag-chaudhary-238625309/",
    x: "https://x.com/AnuragGeeK",
    email: "TODO_EMAIL",
    resume: "/resume.pdf",
  },
};

export const experience: Experience[] = [
  {
    role: "AI Engineer Intern",
    company: "Tsole Technologies",
    location: "Remote",
    start: "Apr 2026",
    end: "Jun 2026",
    highlights: [
      "Built FastAPI + PostgreSQL backends.",
      "Built LangGraph/LangChain agent workflows.",
      "Built RAG pipelines with ChromaDB.",
    ],
  },
];

export const education: Education[] = [
  {
    degree: "B.Tech, Computer Science and Engineering",
    school: "Graphic Era University",
    location: "Dehradun",
    start: "2023",
    end: "2027",
  },
];

export const achievements: Achievement[] = [
  {
    title: "LeetCode Knight",
    detail: "Top 5%, 350+ DSA problems solved",
  },
  {
    title: "Oracle Certified Foundations Associate",
  },
  {
    title: "Oracle Agentic AI Certified Foundations Associate",
  },
];

export const projects: Project[] = [];
