export type LabEntry = {
  title: string;
  category: string;
  state: "EXPERIMENT" | "IN PROGRESS" | "PROTOTYPE";
  note: string;
};

export const lab: LabEntry[] = [
  {
    title: "Auto-Apply agents",
    category: "Browser automation",
    state: "IN PROGRESS",
    note: "Playwright plus Ollama for contextual form filling, navigation, and recovery on dynamic career pages.",
  },
  {
    title: "Resume intelligence",
    category: "AI experiments",
    state: "EXPERIMENT",
    note: "Prompt structures for turning unstructured career notes into structured, reviewable resume sections.",
  },
  {
    title: "Local LLM routing",
    category: "Machine Learning",
    state: "EXPERIMENT",
    note: "When a task should stay on Ollama versus call OpenAI or Claude — latency, cost, and quality notes.",
  },
  {
    title: "Ambient interface studies",
    category: "Creative coding",
    state: "PROTOTYPE",
    note: "Motion, depth, and glass studies — the groundwork for this site's cinematic rooms.",
  },
  {
    title: "Deployment ergonomics",
    category: "Cloud & DevOps",
    state: "IN PROGRESS",
    note: "GitHub Actions pipelines tuned for small teams shipping to AWS and Azure.",
  },
  {
    title: "Layout system sketches",
    category: "Frontend experiments",
    state: "PROTOTYPE",
    note: "Asymmetric grid systems that keep hierarchy intact from 320px to ultrawide.",
  },
];
