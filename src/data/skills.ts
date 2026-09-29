export type SkillCluster = { label: string; items: string[] };

export const skills: SkillCluster[] = [
  { label: "Programming", items: ["Python", "C++", "JavaScript"] },
  { label: "Frontend", items: ["HTML", "CSS", "React.js", "Tailwind CSS", "Flutter"] },
  {
    label: "Backend & APIs",
    items: ["Node.js", "Express.js", "PHP", "RESTful APIs", "Webhooks"],
  },
  {
    label: "AI & Automation",
    items: ["OpenAI API", "Claude API", "Ollama", "LLMs", "Playwright", "Browser Automation"],
  },
  {
    label: "Cloud & DevOps",
    items: ["AWS", "Microsoft Azure", "GitHub", "GitHub Actions", "Bunny.net", "Web Hosting"],
  },
  { label: "Databases", items: ["MongoDB", "SQL", "Firebase"] },
  { label: "Testing & QA", items: ["Selenium", "Cypress", "Jenkins", "JMeter", "STQA"] },
  { label: "Tools & Product", items: ["Figma", "SEO"] },
];
