import type { LucideIcon } from "lucide-react";
import {
  Atom,
  BarChart3,
  Binary,
  Braces,
  Brain,
  Boxes,
  Code,
  Code2,
  Container,
  Cpu,
  Database,
  FileCode2,
  FileText,
  Github,
  Globe,
  Layers,
  Palette,
  Presentation,
  Scissors,
  Search,
  Server,
  Share2,
  Sparkles,
  Waypoints,
  Wind,
  Workflow,
} from "lucide-react";

export type EducationItem = {
  level: "school" | "college";
  school: string;
  degree: string;
  field?: string;
  period: string;
  location: string;
  score?: string;
  note?: string;
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  stack: string[];
};

export type SkillGroup = {
  label: string;
  items: { name: string; icon: LucideIcon }[];
};

export const education: EducationItem[] = [
  {
    level: "school",
    school: "National Ideal School",
    degree: "Secondary School",
    field: "Science",
    period: "2016 – 2017",
    location: "Dhaka, Bangladesh",
    score: "GPA 5.00",
  },
  {
    level: "school",
    school: "National Ideal College",
    degree: "Higher Secondary",
    field: "Science",
    period: "2017 – 2019",
    location: "Dhaka, Bangladesh",
    score: "GPA 5.00",
  },
  {
    level: "college",
    school: "RUET",
    degree: "B.Sc. — Electronics & Telecommunication Engineering",
    period: "2020 – 2025",
    location: "Bangladesh",
    score: "CGPA 3.60 / 4.00",
    note: "6th in Department · 7th Sem 3.92 · 8th Sem 3.97",
  },
];

export const experiences: ExperienceItem[] = [
  {
    company: "Aunkur Ai",
    role: "Full Stack Software Engineer",
    period: "10/2025 – Present",
    location: "Gulshan, Dhaka",
    summary:
      "Building a full-stack agriculture platform — from farmer onboarding to harvest — with RAG and LLM agents for weather-aware crop, fertilizer, and treatment insights.",
    stack: ["React.js", "Python", "FastAPI", "RAG", "AI Agent", "TypeScript", "Node.js", "GraphQL", "MS SQL"],
  },
  {
    company: "Deep Mind Labs Ai",
    role: "Software Engineer (Front-End)",
    period: "07/2025 – 10/2025",
    location: "Uttara, Dhaka",
    summary:
      "Shipped responsive, production front-ends with React, Next.js, and Tailwind, focused on clean design and cross-browser performance.",
    stack: ["React.js", "TypeScript", "Next.js", "Tailwind CSS", "JavaScript", "CSS", "HTML"],
  },
  {
    company: "Outlier",
    role: "Front-End Developer (AI Training)",
    period: "11/2024 – 05/2025",
    location: "Remote",
    summary:
      "Built responsive, user-friendly interfaces with React, Tailwind, and HTML for real-world AI-training projects.",
    stack: ["React.js", "Next.js", "Tailwind CSS", "JavaScript", "HTML"],
  },
  {
    company: "CodeSoft",
    role: "Web Developer (Intern)",
    period: "08/2024 – 11/2024",
    location: "India",
    summary:
      "Completed a web development internship building responsive, accessible websites with HTML and CSS.",
    stack: ["HTML", "CSS"],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    label: "Machine Learning & AI",
    items: [
      { name: "RAG Systems", icon: Workflow },
      { name: "LLMs", icon: Sparkles },
      { name: "Embeddings", icon: Boxes },
      { name: "Vector Databases", icon: Database },
      { name: "Semantic Search", icon: Search },
      { name: "Redis", icon: Layers },
      { name: "Docker", icon: Container },
    ],
  },
  {
    label: "Web Development",
    items: [
      { name: "Next.js", icon: Globe },
      { name: "React", icon: Atom },
      { name: "Tailwind CSS", icon: Wind },
      { name: "TypeScript", icon: Code2 },
      { name: "JavaScript", icon: FileCode2 },
      { name: "Node.js", icon: Server },
      { name: "GraphQL", icon: Share2 },
      { name: "Express", icon: Waypoints },
    ],
  },
  {
    label: "Languages & Data",
    items: [
      { name: "Python", icon: Code },
      { name: "C / C++", icon: Binary },
      { name: "SQL", icon: Database },
      { name: "Data Analysis", icon: BarChart3 },
      { name: "GitHub", icon: Github },
    ],
  },
  {
    label: "Foundations",
    items: [
      { name: "HTML", icon: Braces },
      { name: "CSS", icon: Palette },
      { name: "AI / ML", icon: Brain },
      { name: "Systems", icon: Cpu },
      { name: "Word / PPT", icon: Presentation },
      { name: "Docs", icon: FileText },
    ],
  },
];

export const phases = [
  { key: "school", label: "School", tag: "Education" },
  { key: "college", label: "College", tag: "Education" },
  { key: "skills", label: "Skills", tag: "Capabilities" },
  { key: "office", label: "Office", tag: "Experience" },
] as const;

export type PhaseKey = (typeof phases)[number]["key"];
