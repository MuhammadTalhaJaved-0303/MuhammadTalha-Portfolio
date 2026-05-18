export interface SocialLink {
  label: string;
  href: string;
  display: string;
}

export interface Product {
  name: string;
  tagline: string;
  description: string;
  url: string;
}

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  highlights?: string[];
  tech: string[];
  tag: string;
  year: string;
  featured?: boolean;
  href?: string;
}

export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface EducationItem {
  title: string;
  org: string;
  date: string;
  highlight?: string;
  icon: "grad" | "cert";
}

export const profile = {
  name: "Muhammad Talha Javed",
  initials: "MTJ",
  role: "AI Engineer & Python Developer",
  tagline:
    "Research-driven Computer Engineer building intelligent systems and AI applications.",
  bio: "Recent UET Lahore graduate focused on machine learning, data quality, and scalable AI infrastructure. I ship production systems with FastAPI, LangChain, and AWS.",
  location: "Lahore, Pakistan",
  timezone: "Asia/Karachi",
  email: "mtalhajavedrao@gmail.com",
  available: true,
  currentlyLearning: "RAG systems & LangGraph agents",
  nowPlaying: {
    title: "Lofi Coding Vol. 4",
    artist: "Late Night Engineering",
  },
  funFact:
    "I build LLM systems by day and tinker with deep learning research papers by night.",
  socials: [
    { label: "GitHub", href: "https://github.com/MuhammadTalhaJaved-0303", display: "GitHub" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/muhammad-talha-javed-861216246/", display: "LinkedIn" },
    { label: "WhatsApp", href: "https://wa.me/923701422152", display: "WhatsApp" },
  ] satisfies SocialLink[],
  stats: {
    cgpa: "3.25",
    projects: "5+",
    certifications: "2",
    yearsCoding: "3+",
    githubRepos: "20+",
    githubCommits: "500+",
  },
};

export const techStack: string[] = [
  "Python", "FastAPI", "LangChain", "PyTorch",
  "AWS", "Docker", "PostgreSQL", "Redis",
  "ChromaDB", "Pandas", "scikit-learn", "Next.js",
];

export const products: Product[] = [
  {
    name: "aivico",
    tagline: "AI that teaches. Teachers that care. Parents that see.",
    description:
      "AI-powered learning platform for Pakistani students — bilingual (English/Urdu) tutoring with adaptive practice, smart flashcards, and parent dashboards.",
    url: "https://aivico.ai",
  },
  {
    name: "skill2success",
    tagline: "Pakistan's premier STEAM provider.",
    description:
      "STEAM education platform teaching AI, coding, and robotics to students across Pakistan.",
    url: "https://www.skill2success.com",
  },
];

export const projects: Project[] = [
  {
    title: "Aivico",
    subtitle: "Bilingual AI Tutor — EdTech",
    description:
      "AI-powered learning platform for Pakistani students. Personal AI tutor available 24/7 in English and Urdu, with adaptive practice, spaced-repetition flashcards, and parent dashboards.",
    highlights: [
      "24/7 bilingual (English / Urdu) AI tutor with natural-language Q&A",
      "Adaptive practice + smart flashcards driven by mastery signals",
      "Knowledge mapping across subjects · gamified XP, streaks, badges",
      "Parent dashboard for real-time progress and engagement",
    ],
    tech: ["Next.js", "Python", "LangChain", "OpenAI", "PostgreSQL", "Vercel"],
    tag: "Live Product",
    year: "2026",
    featured: true,
    href: "https://aivico.ai",
  },
  {
    title: "Skill2Success",
    subtitle: "STEAM · AI · Robotics — EdTech",
    description:
      "Pakistan's premier STEAM education platform — teaching AI, coding, and robotics to students through structured programs, interactive curriculum, and instructor-led tracks.",
    tech: ["Next.js", "TypeScript", "React", "Tailwind", "Vercel"],
    tag: "Live Product",
    year: "2026",
    href: "https://www.skill2success.com",
  },
  {
    title: "AI LangChain Backend",
    subtitle: "Production-Ready Multi-User Conversational AI Platform",
    description:
      "Enterprise-grade AI backend with FastAPI and LangChain. Auto-scaling AWS infrastructure handling 200+ concurrent users with complete multi-user isolation.",
    highlights: [
      "Auto-scaling AWS (1–20 EC2 instances) with ALB & CloudFormation",
      "Multi-LLM integration with contextual memory & rate limiting",
      "90%+ test coverage with comprehensive monitoring",
    ],
    tech: ["FastAPI", "LangChain", "Gemini AI", "AWS", "PostgreSQL", "Redis", "Docker"],
    tag: "Enterprise",
    year: "2025",
  },
  {
    title: "Enterprise RAG System",
    subtitle: "AI-Powered Document Intelligence",
    description:
      "High-performance FastAPI backend with ChromaDB vector store. Supports 1000+ RPM and 300+ concurrent users.",
    tech: ["FastAPI", "ChromaDB", "Ollama", "AWS EC2", "Docker"],
    tag: "Enterprise",
    year: "2025",
  },
  {
    title: "AI News Automation Agent",
    subtitle: "Upwork Project — 5-Star Review",
    description:
      "AI-powered news automation using Python, Tkinter, and Crew AI. Delivered with excellent client feedback.",
    tech: ["Python", "Crew AI", "Tkinter", "OOP"],
    tag: "Client Work",
    year: "2025",
  },
  {
    title: "Multi-Personality AI Chatbot",
    subtitle: "Live on Streamlit Cloud",
    description:
      "Advanced chatbot with personality-based conversations, multi-model support, and CrewAI agent system.",
    tech: ["Streamlit", "CrewAI", "Groq API", "Gemini", "LangChain"],
    tag: "Deployed",
    year: "2025",
  },
];

export const experience: ExperienceEntry[] = [
  {
    role: "AI Engineer Intern",
    company: "SEE BIZ PVT LTD",
    location: "Lahore, Pakistan",
    period: "May 2025 — Sep 2025",
    bullets: [
      "Preprocessed datasets (2K+ rows) with Pandas and NumPy for model-ready data",
      "Performed EDA with Matplotlib and Seaborn, improving feature selection",
      "Built ML models (Linear, Logistic, Random Forest) achieving 80%+ accuracy",
      "Evaluated models using scikit-learn metrics for optimal algorithm selection",
    ],
  },
];

export const skills: SkillGroup[] = [
  { title: "Programming",    items: ["Python", "SQL", "C++", "RDBMS"] },
  { title: "Data Science",   items: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "EDA"] },
  { title: "Machine Learning", items: ["Regression", "Classification", "SVM", "Random Forest", "K-Means"] },
  { title: "AI & Automation", items: ["Crew AI", "RAG", "LangChain", "N8N", "Make", "Zapier"] },
  { title: "Web Development", items: ["HTML", "CSS", "JavaScript", "Next.js"] },
];

export const education: EducationItem[] = [
  { title: "B.S. Computer Engineering", org: "UET Lahore", date: "Sep 2025", highlight: "CGPA: 3.25 / 4.0", icon: "grad" },
  { title: "CrewAI Multi-Agent System", org: "DeepLearning.AI",  date: "Jun 2025", icon: "cert" },
  { title: "Intro to RDBMS",            org: "IBM · Coursera",   date: "Dec 2023", icon: "cert" },
];

export const navLinks = [
  { label: "About",      href: "#about" },
  { label: "Work",       href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills",     href: "#skills" },
  { label: "Contact",    href: "#contact" },
];
