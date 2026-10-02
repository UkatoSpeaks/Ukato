// Single source of truth for every piece of text on the site.
// Unknown values are strings ending in "_TODO"; the UI hides them (see isTodo).
// Never invent numbers, metrics or links.

/** True for a value that has not been filled in yet, e.g. "LIVE_URL_TODO". */
export function isTodo(value: string | undefined): boolean {
  return value === undefined || value.endsWith("_TODO");
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Profile = {
  name: string;
  shortName: string;
  pronunciation: string;
  role: string;
  location: string;
  /** IANA time zone, for the local clock. */
  timezone: string;
  /** Public paths. The files may not exist yet; the UI shows a neutral placeholder. */
  avatar: string;
  banner: string;
};

export type SectionId =
  | "about"
  | "contact"
  | "projects"
  | "experience"
  | "skills"
  | "github";

export type SiteSection = {
  /** Anchor id. */
  id: SectionId;
  /** Heading in the section band. */
  title: string;
  /** Short label for the side index. */
  indexLabel: string;
  /** Text of the control on the right of the band, when there is one. */
  action?: string;
};

export type NavLink = {
  label: string;
  /** Section the link scrolls to. Without one it goes to the top of the page. */
  section?: SectionId;
  /** Other sections that keep this link active, so one link always is. */
  covers?: SectionId[];
};

export type About = {
  bullets: string[];
};

export type ContactLink = {
  id: "github" | "linkedin" | "x" | "mail" | "resume";
  label: string;
  href: string;
};

export type Contact = {
  /** Plain address, for display and copy. The mail link carries the mailto. */
  email: string;
  links: ContactLink[];
};

export type ProjectStatus = "live" | "building" | "shipped";

export type ProjectCategory =
  | "AI Agents"
  | "RAG"
  | "Full Stack"
  | "ML"
  | "Dev Tools";

export type Project = {
  slug: string;
  title: string;
  year: number;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  /** Public path of the screenshot, or "IMAGE_TODO" when none was captured. */
  image: string;
  /** Hex color. */
  accentColor: string;
  featured: boolean;

  // Case-study page.
  status: ProjectStatus;
  category: ProjectCategory;
  problem: string;
  approach: string[];
  flow?: string[];
};

export type Experience = {
  role: string;
  company: string;
  location?: string;
  start: string;
  end: string;
  summary: string;
  points: ExperiencePoint[];
};

export type ExperiencePoint = {
  /** Short heading on the timeline. */
  title: string;
  detail: string;
};

export type Stat = {
  value: string;
  label: string;
};

/** The stat filled in from GitHub, and what replaces it if that fails. */
export type ContributionsStat = {
  /** The year is added after it. */
  label: string;
  fallback: Stat;
};

export type TechCategory =
  | "Languages"
  | "Frontend"
  | "Backend"
  | "Databases"
  | "AI/ML"
  | "DevOps";

export type TechGroup = {
  category: TechCategory;
  items: string[];
};

export type NowPlaying = {
  label: string;
  title: string;
  artist: string;
  audioSrc: string;
  /** Shown while there is no track to play. */
  empty: { title: string; artist: string };
};

export type GitHub = {
  username: string;
  /** Ends of the heatmap legend. */
  less: string;
  more: string;
  /** Shown when the contributions cannot be loaded. */
  error: string;
};

export type Footer = {
  /** Comes before the name. */
  credit: string;
  /** Comes after the year. */
  rights: string;
};

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

/** Page metadata and link previews. */
export const site = {
  /** Where the site is deployed, without a trailing slash. */
  url: "https://ukato.vercel.app",
  title: "Anurag Chaudhary — AI Engineer",
  description:
    "AI Engineer & Full Stack Developer building AI agents, RAG pipelines and full-stack products.",
};

export const profile: Profile = {
  name: "Anurag Chaudhary",
  shortName: "Anurag",
  pronunciation: "/a · nu · raag/",
  role: "AI Engineer · Full Stack Developer",
  location: "Dehradun, India",
  timezone: "Asia/Kolkata",
  avatar: "/avatar.svg",
  banner: "/banner.svg",
};

export const sections: SiteSection[] = [
  { id: "about", title: "About", indexLabel: "About" },
  { id: "contact", title: "Contact", indexLabel: "Contact" },
  {
    id: "projects",
    title: "Projects",
    indexLabel: "Projects",
    action: "View All Projects",
  },
  { id: "experience", title: "Experience", indexLabel: "Experience" },
  {
    id: "skills",
    title: "Tech Stack",
    indexLabel: "Skills",
    action: "( select tab to filter )",
  },
  { id: "github", title: "GitHub Activity", indexLabel: "GitHub" },
];

export const navLinks: NavLink[] = [
  { label: "Home", covers: ["about"] },
  { label: "Projects", section: "projects" },
  { label: "Experience", section: "experience", covers: ["skills", "github"] },
  { label: "Contact", section: "contact" },
];

export const about: About = {
  bullets: [
    "I build AI agents, RAG pipelines and full-stack products that actually ship.",
    "CS undergrad at Graphic Era University, graduating 2027. Currently deep in agentic workflows, LLM tooling and real-time AI systems.",
    "Open to AI / Full Stack Engineer roles and interesting collaborations.",
  ],
};

const email = "chaudharyanurag801@gmail.com";

export const contact: Contact = {
  email,
  links: [
    { id: "github", label: "GitHub", href: "https://github.com/UkatoSpeaks" },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/anurag-chaudhary-238625309/",
    },
    { id: "x", label: "X", href: "https://x.com/AnuragGeeK" },
    { id: "mail", label: "Mail", href: `mailto:${email}` },
    { id: "resume", label: "Resume", href: "/resume.pdf" },
  ],
};

export const projects: Project[] = [
  {
    slug: "kavach",
    title: "Kavach",
    year: 2026,
    description:
      "Real-time AI fraud detection for Indian users: scans UPI IDs, links, messages, QR codes and screenshots for scams.",
    tags: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "Groq",
      "Supabase",
      "Vercel",
      "Render",
    ],
    liveUrl: "https://kavach-mu-blush.vercel.app",
    githubUrl: "https://github.com/UkatoSpeaks/Kavach",
    image: "/projects/kavach.webp",
    accentColor: "#ef4444",
    featured: true,
    status: "live",
    category: "AI Agents",
    problem:
      "Fraud in India arrives dressed as routine messages: KYC updates, UPI collect requests, lookalike links. A spam filter cannot tell an annoying promotion from an actual scam. v1 covers UPI and link fraud.",
    approach: [
      "Input is normalized and URLs, UPI IDs, phones and amounts are extracted. Rules, URL intel (redirect expansion, RDAP domain age), UPI checks, community reputation and a TF-IDF + logistic regression classifier then run in parallel.",
      "The verdict comes from weighted scoring of deterministic signals. A LangGraph agent on Groq (gpt-oss-120b, falling back to gpt-oss-20b) only writes the English/Hindi explanation, so a jailbreak or hallucination cannot flip a verdict.",
      "The classifier is trained in scikit-learn, exported to JSON and run with numpy so the API fits Render's 512 MB free tier. Entity masking and character n-grams keep it robust to leetspeak and misspellings.",
      "Screenshots go through Groq vision OCR with a RapidOCR fallback, followed by sender, fake-payment-proof and QR checks. Signals fail soft: if Groq or the database is down, the result is computed from what remains.",
      "Evaluation: 93.5% scam recall at a 1.4% false-positive rate on the held-out evaluation set.",
    ],
    flow: [
      "Input",
      "Normalize & extract",
      "Parallel checks",
      "LangGraph agent",
      "Weighted scoring",
      "Verdict",
    ],
  },
  {
    slug: "applyai",
    title: "ApplyAI",
    year: 2026,
    description: "AI agent that automates the job application workflow.",
    tags: [
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "FastAPI",
      "LangGraph",
      "LangChain",
      "Groq",
      "Playwright",
      "SQLAlchemy",
      "Alembic",
    ],
    liveUrl: "https://job-application-ai-agent-nine.vercel.app",
    githubUrl: "https://github.com/UkatoSpeaks/job-application-ai-agent",
    image: "/projects/applyai.webp",
    accentColor: "#3b82f6",
    featured: true,
    status: "live",
    category: "AI Agents",
    problem:
      "Tailoring a resume and cover letter to every job posting is slow, repetitive work that is easy to do badly.",
    approach: [
      "LangGraph state graph: parse resume, extract the job page, parse the job, match, tailor the resume, generate the cover letter.",
      "Conditional routing: a job URL goes through a Playwright page extractor first, and a match score under 70 routes to resume tailoring before the cover letter.",
      "Tailored resumes and cover letters are validated and retried within the graph. Generation runs on Groq (openai/gpt-oss-20b) through langchain-groq.",
      "FastAPI backend with SQLAlchemy and Alembic; PyMuPDF reads resumes and ReportLab exports PDFs. Next.js App Router frontend calls it through a client service layer.",
    ],
    flow: [
      "Resume + job",
      "Parse resume",
      "Parse job",
      "Match",
      "Tailor resume",
      "Cover letter",
    ],
  },
  {
    slug: "debugly",
    title: "Debugly",
    year: 2026,
    description:
      "AI-native debugging tool that turns stack traces, console logs and runtime errors into code fixes.",
    tags: [
      "Next.js",
      "TypeScript",
      "Firebase",
      "Groq",
      "Gemini",
      "Transformers.js",
      "Dexie",
    ],
    liveUrl: "https://debugly-h3x4.vercel.app/",
    githubUrl: "https://github.com/UkatoSpeaks/Debugly",
    image: "/projects/debugly.webp",
    accentColor: "#f59e0b",
    featured: true,
    status: "live",
    category: "Dev Tools",
    problem:
      "Stack traces, console logs and runtime errors say where code broke, rarely why. Finding the root cause is the slow part.",
    approach: [
      "An API route sends the error trace plus related source files to the LLM in JSON mode and returns a structured result: what broke, why, fix steps, a code patch, prevention and severity.",
      "Model routing: Groq by default (llama-3.1-8b-instant) through its OpenAI-compatible API, or Gemini with the user's own key.",
      "Workspace indexing runs in the browser: code is chunked, embedded with all-MiniLM-L6-v2 via Transformers.js, stored in IndexedDB (Dexie) and searched by cosine similarity.",
      "Analyses are saved to Firestore. The repo also holds a CLI and a VS Code extension, and the API accepts token auth.",
    ],
  },
  {
    slug: "tacticlens",
    title: "TacticLens",
    year: 2026,
    description:
      "Football tactical analysis: pressing/PPDA, passing networks, defensive block height, K-Means team style archetypes and AI scouting reports.",
    tags: [
      "FastAPI",
      "PostgreSQL",
      "Next.js",
      "pandas",
      "scikit-learn",
      "Groq",
    ],
    liveUrl: "LIVE_URL_TODO",
    githubUrl: "GITHUB_URL_TODO",
    image: "IMAGE_TODO",
    accentColor: "#22c55e",
    featured: false,
    status: "building",
    category: "ML",
    problem:
      "Match data says what happened, not how a team plays. TacticLens turns it into build-up style, defensive shape and comparable team profiles.",
    approach: [
      "Understat data is processed with pandas into tactical metrics: build-up style, passing networks, defensive block height and PPDA.",
      "K-Means groups teams into style archetypes, and KNN returns the most similar teams.",
      "Groq generates scouting reports from the computed metrics.",
      "FastAPI + PostgreSQL backend serves a Next.js frontend.",
    ],
  },
  {
    slug: "zenflow",
    title: "ZenFlow",
    year: 2026,
    description:
      "Focus timer, website blocker and deep-work tracking in one place.",
    tags: [
      "Next.js",
      "TypeScript",
      "Firebase",
      "Zustand",
      "Recharts",
      "Chrome Extension (MV3)",
    ],
    liveUrl: "https://zen-flow-dusky.vercel.app/",
    githubUrl: "https://github.com/UkatoSpeaks/ZenFlow",
    image: "/projects/zenflow.webp",
    accentColor: "#8b5cf6",
    featured: false,
    status: "live",
    category: "Full Stack",
    problem:
      "Staying focused usually means juggling a timer, a site blocker and a log of what got done.",
    approach: [
      "Next.js app with API routes for sessions, blocker, analytics, settings and streaks. Routes verify Firebase ID tokens with firebase-admin and store data in Firestore.",
      "Timer and settings state live in Zustand stores with timer persistence.",
      "A Chrome Manifest V3 extension blocks sites with declarativeNetRequest dynamic rules and ends focus sessions with chrome.alarms.",
      "A content script syncs the blocked-site list and focus state from the web app into the extension's storage.",
    ],
  },
  {
    slug: "gigacorp-ai-support",
    title: "GigaCorp AI Support",
    year: 2026,
    description:
      "RAG customer-support agent that answers from company documents and remembers the conversation.",
    tags: ["LangChain", "Mistral AI", "ChromaDB", "FastAPI", "Streamlit"],
    liveUrl: "https://owqmmwdpszehh77vybjqpe.streamlit.app/",
    githubUrl: "https://github.com/UkatoSpeaks/Customer-Rag-",
    image: "/projects/gigacorp-ai-support.webp",
    accentColor: "#06b6d4",
    featured: true,
    status: "shipped",
    category: "RAG",
    problem:
      "Support answers need to come from the company's own documents and stay consistent across a multi-turn conversation.",
    approach: [
      "A PDF knowledge base is loaded with PyPDF, split into 500-character chunks with 100 overlap, embedded with Mistral embeddings (mistral-embed) and stored in ChromaDB.",
      "Follow-up questions are rewritten into standalone queries using the conversation history before retrieval.",
      "The top 3 chunks are retrieved and passed to Mistral Small through a LangChain chain that answers only from the retrieved context, with source citations.",
      "Per-session conversation memory supports follow-ups. FastAPI exposes the API; Streamlit provides the chat UI.",
    ],
    flow: [
      "User query",
      "Mistral embeddings",
      "ChromaDB retrieve",
      "Mistral Small + session history",
      "Answer",
    ],
  },

  // Earlier projects, kept for their case-study pages.
  {
    slug: "researchpilot",
    title: "ResearchPilot",
    year: 2026,
    description:
      "Autonomous research agent that plans steps, runs tools, recovers from failures and returns a structured report.",
    tags: ["LangGraph", "LangChain", "Groq", "Tavily", "Typer"],
    liveUrl: "LIVE_URL_TODO",
    githubUrl: "https://github.com/UkatoSpeaks/research-agent-assignment",
    image: "IMAGE_TODO",
    accentColor: "#ec4899",
    featured: false,
    status: "shipped",
    category: "AI Agents",
    problem:
      "A research goal takes several tool calls, and any of them can fail. The agent has to plan the steps, check each result and recover without losing the run.",
    approach: [
      "LangGraph graph over one typed state: a Planner turns the goal into a structured execution plan, and an Executor runs each step's tool.",
      "Three tools: Tavily web search, a page fetcher (httpx + BeautifulSoup) and a calculator built on a restricted AST evaluator instead of eval.",
      "A Validator checks every tool result. Failures route to a Recovery node that logs the event and retries the step, capped at 2 retries.",
      "A Reporter writes the final report as JSON or Markdown using only what the tool results contain. Planner and Reporter run on Groq (openai/gpt-oss-120b) with structured output; it runs as a CLI.",
    ],
    flow: ["Query", "Planner", "Executor", "Validator", "Recovery", "Reporter"],
  },
  {
    slug: "code-reviewer-agent",
    title: "Code Reviewer Agent",
    year: 2026,
    description: "LLM agent workflow for automated code review.",
    tags: ["LangGraph", "LangChain", "Mistral AI", "FastAPI", "PyGithub"],
    liveUrl: "LIVE_URL_TODO",
    githubUrl: "https://github.com/UkatoSpeaks/Code-Reviewer-Agent",
    image: "IMAGE_TODO",
    accentColor: "#f97316",
    featured: false,
    status: "building",
    category: "AI Agents",
    problem:
      "Manual code review is slow, and routine issues take attention away from the changes that need it.",
    approach: [
      "A FastAPI webhook verifies GitHub's HMAC-SHA256 signature and triggers when a pull request is opened, updated or reopened.",
      "The PR diff is fetched and fanned out in a LangGraph graph to three parallel agents: bugs, security and code quality.",
      "An aggregator node removes duplicate and weak findings and writes the final summary. All nodes use Mistral Small (mistral-small-latest) with structured output.",
      "The final review is posted back to the pull request through the GitHub API.",
    ],
    flow: [
      "PR webhook",
      "Fetch diff",
      "Bug / Security / Quality agents",
      "Aggregator",
      "PR review",
    ],
  },
  {
    slug: "football-scouting-agent",
    title: "Football Scouting Agent",
    year: 2026,
    description:
      "Finds statistically similar players and playing-style clusters across Europe's top five leagues.",
    tags: [
      "Python",
      "pandas",
      "NumPy",
      "scikit-learn",
      "Plotly",
      "Matplotlib",
      "Streamlit",
      "Joblib",
    ],
    liveUrl: "LIVE_URL_TODO",
    githubUrl: "https://github.com/UkatoSpeaks/Football-Scouting-Agent",
    image: "IMAGE_TODO",
    accentColor: "#10b981",
    featured: false,
    status: "shipped",
    category: "ML",
    problem:
      "Scouting often starts with one question: who else can do what this player does? This answers it from season statistics, across leagues.",
    approach: [
      "Offline pipeline over 2024-25 FBref season data (via Kaggle): cleaning, a 450-minute eligibility filter, per-90 rates and smoothed efficiency ratios.",
      "Each position group (GK, DEF, MID, FWD) has its own feature list, log1p on skewed counts and its own StandardScaler.",
      "Cosine similarity within a position group ranks similar players. K-Means per group finds style clusters, with K chosen by silhouette and seed stability (adjusted Rand index).",
      "PCA projects each group to 2-D for visualisation only. The Streamlit dashboard reads saved outputs and never retrains.",
    ],
    flow: [
      "Raw data",
      "Clean",
      "Per-90 features",
      "Scale",
      "Cosine similarity + K-Means",
      "PCA",
      "Dashboard",
    ],
  },
  {
    slug: "leetlens",
    title: "LeetLens",
    year: 2026,
    description: "Analyzes DSA problem-solving patterns to surface weak topics.",
    tags: ["FastAPI", "SQLAlchemy", "PostgreSQL", "Alembic", "httpx"],
    liveUrl: "LIVE_URL_TODO",
    githubUrl: "https://github.com/UkatoSpeaks/LeetLens",
    image: "IMAGE_TODO",
    accentColor: "#eab308",
    featured: false,
    status: "building",
    category: "Dev Tools",
    problem:
      "A solved-problem count does not show which topics are actually weak.",
    approach: [
      "An async httpx client pulls profile and problem data from LeetCode's GraphQL API.",
      "Topic performance is scored per topic from solved problems weighted by difficulty (Easy 1, Medium 2, Hard 3).",
      "Topics are classified as weak, average or strong by score threshold, and the weakest are surfaced.",
      "FastAPI backend with JWT auth, SQLAlchemy models and Alembic migrations.",
    ],
  },
];

/** Labels on the projects page and the case-study pages. */
export const projectLabels = {
  back: "Back",
  live: "Live",
  code: "GitHub",
  problem: "Problem",
  approach: "How it works",
  flow: "Flow",
  next: "Next project",
  status: {
    live: "Live",
    building: "In progress",
    shipped: "Shipped",
  } satisfies Record<ProjectStatus, string>,
};

// Most recent first.
export const experience: Experience[] = [
  {
    role: "AI Engineer & Full-Stack Developer",
    company: "Independent Builder",
    start: "2026",
    end: "Present",
    summary:
      "Building AI products on my own, from the agent and model logic through to the web app.",
    // A title that is also a project title links to that project's page.
    points: [
      {
        title: "Kavach",
        detail:
          "Built a real-time scam detection platform for Indian users that checks UPI IDs and links for fraud. FastAPI backend on Render, Next.js frontend on Vercel, Groq for LLM analysis, Supabase for data.",
      },
      {
        title: "ApplyAI",
        detail:
          "Built an AI agent that automates repetitive parts of the job application workflow, from parsing listings to preparing applications.",
      },
      {
        title: "Debugly",
        detail:
          "Built an AI-native debugging tool that takes stack traces, console logs and runtime errors and returns targeted code fixes.",
      },
      {
        title: "TacticLens",
        detail:
          "Built a football tactical analysis app on Understat data: pressing (PPDA), passing networks, defensive block height, K-Means style archetypes and AI-generated scouting reports.",
      },
    ],
  },
  {
    role: "AI Engineer Intern",
    company: "Tsole Technologies",
    location: "Remote",
    start: "Apr 2026",
    end: "Jun 2026",
    summary:
      "Worked on backend services, LLM agent workflows and retrieval pipelines.",
    points: [
      {
        title: "Backend Services",
        detail:
          "Built and maintained FastAPI services backed by PostgreSQL for AI-driven features.",
      },
      {
        title: "Agent Workflows",
        detail:
          "Designed multi-step agent workflows with LangGraph and LangChain, handling tool calls and state across steps.",
      },
      {
        title: "RAG Pipelines",
        detail:
          "Built retrieval-augmented generation pipelines with ChromaDB for grounded answers over internal documents.",
      },
    ],
  },
];

export const stats: Stat[] = [
  { value: "6+", label: "Projects shipped" },
  { value: "AI+Web", label: "Stack focus" },
  {
    value: String(projects.filter((p) => p.featured).length),
    label: "Featured projects",
  },
];

// Shown after `stats`. The value is this year's GitHub contributions, the same
// number as under the heatmap.
export const contributionsStat: ContributionsStat = {
  label: "Contributions in",
  fallback: { value: "1", label: "Internship" },
};

/** Label of the tab that shows every group. */
export const techStackAll = "All";

export const techStack: TechGroup[] = [
  {
    category: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "C++"],
  },
  { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "FastAPI", "REST APIs"] },
  { category: "Databases", items: ["PostgreSQL", "Supabase", "ChromaDB"] },
  {
    category: "AI/ML",
    items: [
      "LangChain",
      "LangGraph",
      "RAG",
      "Groq",
      "scikit-learn",
      "pandas",
      "Hugging Face",
      "Vector Embeddings",
    ],
  },
  { category: "DevOps", items: ["Git", "Vercel", "Render"] },
];

// Title and artist are read from the file name of the download; the file has no tags.
export const nowPlaying: NowPlaying = {
  label: "Now Playing",
  title: "The Guys Cool w/ Everybody",
  artist: "dmassaiii",
  audioSrc: "/audio/track.mp3",
  empty: { title: "Nothing playing", artist: "—" },
};

export const github: GitHub = {
  username: "UkatoSpeaks",
  less: "Less",
  more: "More",
  error: "Contributions could not be loaded right now.",
};

export const palette = {
  label: "Command palette",
  placeholder: "Search sections, projects, links…",
  empty: "No results",
  groups: {
    sections: "Sections",
    projects: "Projects",
    links: "Links",
    actions: "Actions",
  },
  copyEmail: "Copy email",
  copied: "Copied",
  toggleTheme: "Toggle theme",
};

export const notFound = {
  title: "Lost in the shadows.",
  text: "This page does not exist, or it has moved.",
  back: "Back home",
};

export const footer: Footer = {
  credit: "Designed & Developed by",
  rights: "All rights reserved.",
};
