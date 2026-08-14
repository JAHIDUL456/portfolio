export type Screen = {
  src: string;
  label: string;
  title: string;
  description: string;
};

export type Transition = "vertical" | "horizontal" | "depth";

export type Project = {
  id: string;
  index: string;
  type: "mobile" | "web";
  name: string;
  category: string;
  tagline: string;
  description: string;
  /** Editing the technology list is safe — these describe the stack type. */
  technologies: string[];
  transition: Transition;
  screens: Screen[];
};

export const projects: Project[] = [
  {
    id: "farmer-ai",
    index: "01",
    type: "mobile",
    name: "Farmer AI",
    category: "RAG System",
    tagline: "An AI companion for farmers, in their language.",
    description:
      "A multilingual assistant that helps farmers monitor crops, get expert guidance, and talk to AI in Bangla, Banglish, or English.",
    technologies: [
      "Python",
      "Qdrant vector database",
      "FastAPI",
      "LLM",
      "Redis",
      "Docker",
      "GraphQL",
    ],
    transition: "vertical",
    screens: [
      {
        src: "/projects/project-01/01-dashboard.png",
        label: "Dashboard",
        title: "Farm Overview",
        description: "Crops, conditions, and alerts at a glance.",
      },
      {
        src: "/projects/project-01/02-crop-library.png",
        label: "Library",
        title: "Crop Library",
        description: "Disease and variety references in your pocket.",
      },
      {
        src: "/projects/project-01/03-english-chat.png",
        label: "Chat",
        title: "English Chat",
        description: "Ask the AI expert in plain English.",
      },
      {
        src: "/projects/project-01/04-banglish-chat.png",
        label: "Chat",
        title: "Banglish Chat",
        description: "Natural mixed-language conversations.",
      },
      {
        src: "/projects/project-01/05-bengali-chat.png",
        label: "Chat",
        title: "Bengali Chat",
        description: "Full Bangla support for every farmer.",
      },
    ],
  },
  {
    id: "rizik-ai",
    index: "02",
    type: "mobile",
    name: "Rizik Ai",
    category: "Mobile Application",
    tagline: "Run the store from your phone.",
    description:
      "An intelligent commerce companion — track inventory, scan to sell, and act on AI-driven restock insights.",
    technologies: [
      "Flutter",
      "Python",
      "FastAPI",
      "SQLite",
      "Redis",
      "LLM",
      "Ai Agent",
    ],
    transition: "horizontal",
    screens: [
      {
        src: "/projects/project-02/01-dashboard.png",
        label: "Dashboard",
        title: "Store at a Glance",
        description: "Sales, stock, and alerts in one calm view.",
      },
      {
        src: "/projects/project-02/02-inventory.png",
        label: "Inventory",
        title: "Inventory",
        description: "Browse and manage every product.",
      },
      {
        src: "/projects/project-02/03-scan-sell.png",
        label: "Checkout",
        title: "Scan & Sell",
        description: "Ring up items in seconds with the camera.",
      },
      {
        src: "/projects/project-02/04-restock.png",
        label: "Restock",
        title: "Smart Restock",
        description: "Know exactly what to reorder, and when.",
      },
      {
        src: "/projects/project-02/05-ai-insights.png",
        label: "Insights",
        title: "AI Insights",
        description: "Trends and recommendations from your data.",
      },
    ],
  },
  {
    id: "docai",
    index: "03",
    type: "web",
    name: "DocAi",
    category: "Web Application",
    tagline: "Your documents, understood.",
    description:
      "Document intelligence that reads, reasons, and answers across your enterprise with retrieval-augmented grounding.",
    technologies: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "Qdrant",
      "LLM",
    ],
    transition: "depth",
    screens: [
      {
        src: "/projects/project-03/01-dashboard.png",
        label: "Dashboard",
        title: "Enterprise Dashboard",
        description: "Unified intelligence across all your documents.",
      },
      {
        src: "/projects/project-03/02-rag-insights.png",
        label: "Insights",
        title: "RAG Insights",
        description: "Grounded patterns and signals in your files.",
      },
      {
        src: "/projects/project-03/03-smart-chat.png",
        label: "Chat",
        title: "Smart Chat",
        description: "Ask anything and get sourced answers.",
      },
    ],
  },
];
