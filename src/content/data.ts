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
  year: number;
  status: "live" | "building" | "shipped";
  oneLiner: string;
  problem: string;
  approach: string[];
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  category: "AI Agents" | "RAG" | "Full Stack" | "ML" | "Dev Tools";
  flow?: string[];
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
    email: "chaudharyanurag801@gmail.com",
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

export const projects: Project[] = [
  {
    slug: "kavach",
    name: "Kavach",
    year: 2026,
    status: "live",
    oneLiner:
      "Scam detector for India: checks messages, links, UPI IDs, QR codes and screenshots, then explains the verdict.",
    problem:
      "Fraud in India arrives dressed as routine messages: KYC updates, UPI collect requests, lookalike links. A spam filter cannot tell an annoying promotion from an actual scam. v1 covers UPI and link fraud.",
    approach: [
      "Input is normalized and URLs, UPI IDs, phones and amounts are extracted. Rules, URL intel (redirect expansion, RDAP domain age), UPI checks, community reputation and a TF-IDF + logistic regression classifier then run in parallel.",
      "The verdict comes from weighted scoring of deterministic signals. A LangGraph agent on Groq (gpt-oss-120b, falling back to gpt-oss-20b) only writes the English/Hindi explanation, so a jailbreak or hallucination cannot flip a verdict.",
      "The classifier is trained in scikit-learn, exported to JSON and run with numpy so the API fits Render's 512 MB free tier. Entity masking and character n-grams keep it robust to leetspeak and misspellings.",
      "Screenshots go through Groq vision OCR with a RapidOCR fallback, followed by sender, fake-payment-proof and QR checks. Signals fail soft: if Groq or the database is down, the result is computed from what remains.",
      "Evaluation: 93.5% scam recall at a 1.4% false-positive rate on the held-out evaluation set.",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "FastAPI",
      "LangGraph",
      "Groq",
      "scikit-learn",
      "Supabase Postgres",
      "pgvector",
      "Render",
      "Vercel",
    ],
    liveUrl: "https://kavach-mu-blush.vercel.app",
    repoUrl: "https://github.com/UkatoSpeaks/Kavach",
    featured: true,
    category: "AI Agents",
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
    name: "ApplyAI",
    year: 2026,
    status: "live",
    oneLiner:
      "Job-application co-pilot: scores a resume against a posting, flags skill gaps, drafts tailored bullets and cover letters.",
    problem:
      "Tailoring a resume and cover letter to every job posting is slow, repetitive work that is easy to do badly.",
    approach: [
      "LangGraph state graph: parse resume, extract the job page, parse the job, match, tailor the resume, generate the cover letter.",
      "Conditional routing: a job URL goes through a Playwright page extractor first, and a match score under 70 routes to resume tailoring before the cover letter.",
      "Tailored resumes and cover letters are validated and retried within the graph. Generation runs on Groq (openai/gpt-oss-20b) through langchain-groq.",
      "FastAPI backend with SQLAlchemy and Alembic; PyMuPDF reads resumes and ReportLab exports PDFs. Next.js App Router frontend calls it through a client service layer.",
    ],
    stack: [
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
    repoUrl: "https://github.com/UkatoSpeaks/job-application-ai-agent",
    featured: true,
    category: "AI Agents",
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
    slug: "researchpilot",
    name: "ResearchPilot",
    year: 2026,
    status: "shipped",
    oneLiner:
      "Autonomous research agent that plans steps, runs tools, recovers from failures and returns a structured report.",
    problem:
      "A research goal takes several tool calls, and any of them can fail. The agent has to plan the steps, check each result and recover without losing the run.",
    approach: [
      "LangGraph graph over one typed state: a Planner turns the goal into a structured execution plan, and an Executor runs each step's tool.",
      "Three tools: Tavily web search, a page fetcher (httpx + BeautifulSoup) and a calculator built on a restricted AST evaluator instead of eval.",
      "A Validator checks every tool result. Failures route to a Recovery node that logs the event and retries the step, capped at 2 retries.",
      "A Reporter writes the final report as JSON or Markdown using only what the tool results contain. Planner and Reporter run on Groq (openai/gpt-oss-120b) with structured output; it runs as a CLI.",
    ],
    stack: ["LangGraph", "LangChain", "Groq", "Tavily", "Typer"],
    repoUrl: "https://github.com/UkatoSpeaks/research-agent-assignment",
    featured: false,
    category: "AI Agents",
    flow: ["Query", "Planner", "Executor", "Validator", "Recovery", "Reporter"],
  },
  {
    slug: "tacticlens",
    name: "TacticLens",
    year: 2026,
    status: "building",
    oneLiner:
      "Tactical intelligence for La Liga: team styles, passing networks, pressing metrics and generated scouting reports.",
    problem:
      "Match data says what happened, not how a team plays. TacticLens turns it into build-up style, defensive shape and comparable team profiles.",
    approach: [
      "Understat data is processed with pandas into tactical metrics: build-up style, passing networks, defensive block height and PPDA.",
      "K-Means groups teams into style archetypes, and KNN returns the most similar teams.",
      "Groq generates scouting reports from the computed metrics.",
      "FastAPI + PostgreSQL backend serves a Next.js frontend.",
    ],
    stack: [
      "Python",
      "pandas",
      "scikit-learn",
      "FastAPI",
      "PostgreSQL",
      "Groq",
      "Next.js",
    ],
    featured: false,
    category: "ML",
  },
  {
    slug: "gigacorp-ai-support",
    name: "GigaCorp AI Support",
    year: 2026,
    status: "shipped",
    oneLiner:
      "RAG customer-support agent that answers from company documents and remembers the conversation.",
    problem:
      "Support answers need to come from the company's own documents and stay consistent across a multi-turn conversation.",
    approach: [
      "A PDF knowledge base is loaded with PyPDF, split into 500-character chunks with 100 overlap, embedded with Mistral embeddings (mistral-embed) and stored in ChromaDB.",
      "Follow-up questions are rewritten into standalone queries using the conversation history before retrieval.",
      "The top 3 chunks are retrieved and passed to Mistral Small through a LangChain chain that answers only from the retrieved context, with source citations.",
      "Per-session conversation memory supports follow-ups. FastAPI exposes the API; Streamlit provides the chat UI.",
    ],
    stack: [
      "LangChain",
      "Mistral AI",
      "ChromaDB",
      "FastAPI",
      "Streamlit",
    ],
    liveUrl: "https://owqmmwdpszehh77vybjqpe.streamlit.app/",
    repoUrl: "https://github.com/UkatoSpeaks/Customer-Rag-",
    featured: true,
    category: "RAG",
    flow: [
      "User query",
      "Mistral embeddings",
      "ChromaDB retrieve",
      "Mistral Small + session history",
      "Answer",
    ],
  },
  {
    slug: "debugly",
    name: "Debugly",
    year: 2026,
    status: "live",
    oneLiner:
      "AI-native debugger: paste a stack trace or runtime error, get the root cause and a code fix.",
    problem:
      "Stack traces, console logs and runtime errors say where code broke, rarely why. Finding the root cause is the slow part.",
    approach: [
      "An API route sends the error trace plus related source files to the LLM in JSON mode and returns a structured result: what broke, why, fix steps, a code patch, prevention and severity.",
      "Model routing: Groq by default (llama-3.1-8b-instant) through its OpenAI-compatible API, or Gemini with the user's own key.",
      "Workspace indexing runs in the browser: code is chunked, embedded with all-MiniLM-L6-v2 via Transformers.js, stored in IndexedDB (Dexie) and searched by cosine similarity.",
      "Analyses are saved to Firestore. The repo also holds a CLI and a VS Code extension, and the API accepts token auth.",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Firebase",
      "Groq",
      "Gemini",
      "Transformers.js",
      "Dexie",
    ],
    liveUrl: "https://debugly-h3x4.vercel.app/",
    repoUrl: "https://github.com/UkatoSpeaks/Debugly",
    featured: true,
    category: "Dev Tools",
  },
  {
    slug: "code-reviewer-agent",
    name: "Code Reviewer Agent",
    year: 2026,
    status: "building",
    oneLiner: "LLM agent workflow for automated code review.",
    problem:
      "Manual code review is slow, and routine issues take attention away from the changes that need it.",
    approach: [
      "A FastAPI webhook verifies GitHub's HMAC-SHA256 signature and triggers when a pull request is opened, updated or reopened.",
      "The PR diff is fetched and fanned out in a LangGraph graph to three parallel agents: bugs, security and code quality.",
      "An aggregator node removes duplicate and weak findings and writes the final summary. All nodes use Mistral Small (mistral-small-latest) with structured output.",
      "The final review is posted back to the pull request through the GitHub API.",
    ],
    stack: ["LangGraph", "LangChain", "Mistral AI", "FastAPI", "PyGithub"],
    repoUrl: "https://github.com/UkatoSpeaks/Code-Reviewer-Agent",
    featured: false,
    category: "AI Agents",
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
    name: "Football Scouting Agent",
    year: 2026,
    status: "shipped",
    oneLiner:
      "Finds statistically similar players and playing-style clusters across Europe's top five leagues.",
    problem:
      "Scouting often starts with one question: who else can do what this player does? This answers it from season statistics, across leagues.",
    approach: [
      "Offline pipeline over 2024-25 FBref season data (via Kaggle): cleaning, a 450-minute eligibility filter, per-90 rates and smoothed efficiency ratios.",
      "Each position group (GK, DEF, MID, FWD) has its own feature list, log1p on skewed counts and its own StandardScaler.",
      "Cosine similarity within a position group ranks similar players. K-Means per group finds style clusters, with K chosen by silhouette and seed stability (adjusted Rand index).",
      "PCA projects each group to 2-D for visualisation only. The Streamlit dashboard reads saved outputs and never retrains.",
    ],
    stack: [
      "Python",
      "pandas",
      "NumPy",
      "scikit-learn",
      "Plotly",
      "Matplotlib",
      "Streamlit",
      "Joblib",
    ],
    repoUrl: "https://github.com/UkatoSpeaks/Football-Scouting-Agent",
    featured: false,
    category: "ML",
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
    slug: "zenflow",
    name: "ZenFlow",
    year: 2026,
    status: "live",
    oneLiner: "Focus timer, website blocker and deep-work tracking in one place.",
    problem:
      "Staying focused usually means juggling a timer, a site blocker and a log of what got done.",
    approach: [
      "Next.js app with API routes for sessions, blocker, analytics, settings and streaks. Routes verify Firebase ID tokens with firebase-admin and store data in Firestore.",
      "Timer and settings state live in Zustand stores with timer persistence.",
      "A Chrome Manifest V3 extension blocks sites with declarativeNetRequest dynamic rules and ends focus sessions with chrome.alarms.",
      "A content script syncs the blocked-site list and focus state from the web app into the extension's storage.",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Firebase",
      "Zustand",
      "Recharts",
      "Chrome Extension (MV3)",
    ],
    liveUrl: "https://zen-flow-dusky.vercel.app/",
    repoUrl: "https://github.com/UkatoSpeaks/ZenFlow",
    featured: false,
    category: "Full Stack",
  },
  {
    slug: "leetlens",
    name: "LeetLens",
    year: 2026,
    status: "building",
    oneLiner:
      "Analyzes DSA problem-solving patterns to surface weak topics.",
    problem:
      "A solved-problem count does not show which topics are actually weak.",
    approach: [
      "An async httpx client pulls profile and problem data from LeetCode's GraphQL API.",
      "Topic performance is scored per topic from solved problems weighted by difficulty (Easy 1, Medium 2, Hard 3).",
      "Topics are classified as weak, average or strong by score threshold, and the weakest are surfaced.",
      "FastAPI backend with JWT auth, SQLAlchemy models and Alembic migrations.",
    ],
    stack: ["FastAPI", "SQLAlchemy", "PostgreSQL", "Alembic", "httpx"],
    repoUrl: "https://github.com/UkatoSpeaks/LeetLens",
    featured: false,
    category: "Dev Tools",
  },
];
