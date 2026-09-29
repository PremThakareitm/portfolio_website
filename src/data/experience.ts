export type Experience = {
  org: string;
  role: string;
  period: string;
  location: string;
  detail?: string;
  highlights?: string[];
};

export const experience: Experience[] = [
  {
    org: "Edufu Technologies Pvt. Ltd. (CampusPe)",
    role: "Full-Stack Developer Intern",
    period: "06/2025 – Present",
    location: "Remote (Bangalore)",
    detail:
      "Contributing across frontend, backend, database, and deployment on an AI-powered placement platform serving 800+ VTU-enrolled students.",
    highlights: [
      "Engineered an AI-driven job application automation workflow with Playwright, Node.js, and LLM-based processing.",
      "Created Auto-Apply flows with Playwright and Ollama — handling dynamic pages, forms, navigation, and contextual automation.",
      "Supported CampusPe's full-stack platform for 800+ VTU students across frontend, backend, and application functionality.",
      "Managed deployments on AWS and Microsoft Azure, and maintained CI/CD with GitHub Actions.",
      "Reviewed UI/UX, suggested usability improvements, and collaborated with developers and designers.",
    ],
  },
  {
    org: "Lets Upgrade",
    role: "Software Development & Engineering Intern",
    period: "12/2023 – 01/2024",
    location: "Mumbai, Maharashtra",
    detail:
      "Built responsive interfaces and worked with UI/UX teams on usability, accessibility, and web visibility.",
    highlights: [
      "Developed responsive web interfaces and interactive components focused on usability and engagement.",
      "Translated design requirements into user-friendly experiences with the UI/UX team.",
      "Contributed technical approaches in cross-functional product discussions.",
    ],
  },
];

export const education = [
  {
    org: "ITM Skills University",
    role: "B.Tech, Computer Science & Engineering — 9.3 CGPA",
    period: "08/2023 – 2027",
    location: "Navi Mumbai, India",
  },
  {
    org: "Nashik Cambridge School — CBSE",
    role: "Higher Secondary Certificate (12th) — 73%",
    period: "2022 – 2023",
    location: "Nashik, India",
  },
  {
    org: "Nashik Cambridge School — CBSE",
    role: "Secondary School Certificate (10th) — 87.6%",
    period: "2020 – 2021",
    location: "Nashik, India",
  },
];

export const certifications = [
  "AWS Knowledge: Cloud Essentials",
  "HackerRank SQL (Basic)",
  "HackerRank CSS (Basic)",
];

export const languages = ["English", "Hindi", "Marathi"];

export const interests = [
  "Ideathons",
  "Hackathons",
  "Technology events",
  "Emerging technologies",
  "Continuous learning",
  "Movies",
];
