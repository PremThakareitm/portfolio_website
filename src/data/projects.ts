import { media } from "@/config/media";

export type ProjectStat = { value: string; label: string };

export type Project = {
  slug: string;
  title: string;
  category: string;
  role: string;
  year?: string;
  featured?: boolean;
  technologies: string[];
  description: string;
  overview: string;
  problem: string;
  implementation: string[];
  features: string[];
  architecture: string;
  outcome: string;
  status?: string;
  stats?: ProjectStat[];
  links?: { label: string; href: string }[];
  media: { kind: "video" | "image" | "gradient"; src?: string; tone?: string };
};

export const projects: Project[] = [
  {
    slug: "campuspe",
    title: "CampusPe",
    category: "AI-Powered Placement Platform",
    role: "Full-Stack Developer Intern",
    year: "2025",
    featured: true,
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "AWS",
      "Azure",
      "Playwright",
      "Ollama",
      "OpenAI API",
      "Claude API",
    ],
    description:
      "AI-driven placement management platform connecting students, colleges, and recruiters.",
    overview:
      "CampusPe is the placement platform at Edufu Technologies. It brings students, colleges, and recruiters into one workspace, with AI assisting the parts of the process that are usually manual and slow — resumes, applications, and role-aware workflows.",
    problem:
      "Placement work is scattered across spreadsheets, inboxes, and messaging apps. Students rewrite resumes for every opening while colleges and recruiters lack a shared view of the pipeline.",
    implementation: [
      "Engineered AI-driven job-application automation with Playwright, Node.js, and LLM-based processing.",
      "Built Auto-Apply workflows with Playwright and Ollama for dynamic pages, forms, and navigation.",
      "Contributed across frontend, backend, and database on a platform serving 800+ VTU-enrolled students.",
      "Shipped AI resume generation with OpenAI and Claude APIs inside role-based product flows.",
      "Managed production deployments on AWS and Microsoft Azure with GitHub Actions CI/CD.",
      "Reviewed UI/UX, suggested usability improvements, and implemented with designers and developers.",
    ],
    features: [
      "AI Auto-Apply",
      "AI Resume generation",
      "Role-based workflows",
      "Browser automation",
      "Cloud deployment",
      "CI/CD pipelines",
    ],
    architecture:
      "React.js frontend against an Express.js/Node.js API with MongoDB persistence. Auto-Apply runs Playwright with Ollama for local LLM context. Resume generation calls OpenAI and Claude server-side. Hosting and CI run across AWS and Azure with GitHub Actions.",
    outcome:
      "Ongoing internship: automation, AI resume flow, and cloud delivery on a live platform used by 800+ VTU students.",
    stats: [
      { value: "800+", label: "VTU students on the platform" },
      { value: "Auto-Apply", label: "Playwright + Ollama workflows" },
      { value: "AI Resume", label: "OpenAI and Claude generation" },
      { value: "Multi-cloud", label: "AWS, Azure, GitHub Actions" },
    ],
    media: { kind: "image", src: media.stills.campuspe, tone: "blue" },
  },
  {
    slug: "micekart",
    title: "MICEKart",
    category: "Corporate Travel & Event Management",
    role: "Freelance",
    year: "2024",
    technologies: ["React.js", "PHP", "SEO", "Web Hosting"],
    description:
      "Responsive corporate travel and events platform focused on SEO and mobile-first usability.",
    overview:
      "A corporate travel and event management platform built as a freelance engagement, with search visibility and mobile usability as the primary goals.",
    problem:
      "The business needed a presence that could be found through search and used comfortably on phones, where most enquiries originate.",
    implementation: [
      "Engineered and deployed a responsive, mobile-first travel and events platform.",
      "Implemented on-page SEO structure and metadata.",
      "Handled hosting and deployment configuration.",
    ],
    features: ["Responsive layouts", "SEO structure", "Enquiry-oriented pages"],
    architecture: "React.js frontend with PHP-backed pages on shared web hosting.",
    outcome: "Shipped a responsive, search-oriented platform for the client.",
    media: { kind: "image", src: media.stills.micekart, tone: "slate" },
  },
  {
    slug: "shivai-masale",
    title: "Shivai Masale",
    category: "Business Website",
    role: "Freelance Project",
    technologies: ["React.js", "Tailwind CSS", "JavaScript"],
    description:
      "Responsive spice-brand website focused on SEO, visual presentation, and mobile usability.",
    overview:
      "A product-forward business website for a spice brand, designed around clean visual presentation and fast mobile browsing.",
    problem:
      "The brand needed a credible online presence that presented its products clearly and was discoverable through search.",
    implementation: [
      "Composed a component-driven React front end with Tailwind CSS.",
      "Structured pages and metadata for on-page SEO.",
      "Tuned layouts for small screens first.",
    ],
    features: ["Product presentation", "Responsive layout", "SEO structure"],
    architecture: "Static React.js application styled with Tailwind CSS.",
    outcome: "Delivered a responsive brand website for the client.",
    media: { kind: "image", src: media.stills["shivai-masale"], tone: "warm" },
  },
  {
    slug: "nakoda-overseas",
    title: "Nakoda Overseas",
    category: "SEO-Optimized Company Website",
    role: "Freelance Project",
    technologies: ["React.js", "Tailwind CSS", "JavaScript", "PHP"],
    description:
      "Responsive agricultural export website focused on search visibility and user engagement.",
    overview:
      "A company website for an agricultural export business, built around search visibility and clear communication of product categories.",
    problem:
      "Export enquiries depend on being discoverable for specific product and region terms.",
    implementation: [
      "Built responsive pages for product and company sections.",
      "Implemented SEO-oriented page structure and metadata.",
      "Integrated PHP handling for form submissions.",
    ],
    features: ["Product categories", "Enquiry form", "SEO structure"],
    architecture: "React.js frontend with PHP form handling.",
    outcome: "Website was delivered; it is currently not live.",
    status: "Currently not live.",
    media: { kind: "image", src: media.stills["nakoda-overseas"], tone: "green" },
  },
  {
    slug: "livspace-clone",
    title: "Livspace Clone",
    category: "Interior Design Platform",
    role: "Semester Capstone",
    technologies: ["React.js", "Node.js", "MongoDB", "Postman"],
    description:
      "Full-stack interior design application with product catalogs and quote-request workflows.",
    overview:
      "A semester capstone rebuilding the core flows of an interior design marketplace: browsing catalogs and requesting quotes.",
    problem:
      "The exercise required designing a full-stack application where catalog data and quote requests move cleanly between client and server.",
    implementation: [
      "Built catalog browsing and detail views in React.js.",
      "Implemented Node.js API routes for catalog and quote endpoints.",
      "Modelled catalog and request data in MongoDB.",
      "Verified API behaviour with Postman.",
    ],
    features: ["Product catalog", "Quote requests", "REST API"],
    architecture: "React.js client, Node.js REST API, MongoDB data layer.",
    outcome: "Completed as a graded capstone covering the full stack.",
    media: { kind: "image", src: media.stills["livspace-clone"], tone: "clay" },
  },
  {
    slug: "grabon",
    title: "GrabOn",
    category: "Food Delivery Web Application",
    role: "Team Project",
    technologies: ["React.js", "Firebase", "Figma", "JavaScript", "Node.js", "MongoDB"],
    description:
      "Food delivery web application with real-time product and cart management.",
    overview:
      "A team-built food delivery application covering menu browsing, cart state, and real-time data updates, following a Swiggy-inspired experience.",
    problem:
      "Ordering flows need cart and menu state that stays consistent while multiple users interact with it.",
    implementation: [
      "Designed the interface in Figma before implementation.",
      "Built the React.js client with real-time cart and product state.",
      "Used Firebase for realtime data and MongoDB/Node.js for service endpoints.",
    ],
    features: ["Menu browsing", "Real-time cart", "Design-to-build workflow"],
    architecture:
      "React.js client with Firebase realtime data alongside Node.js and MongoDB services.",
    outcome: "Delivered as a collaborative team project.",
    media: { kind: "image", src: media.stills.grabon, tone: "amber" },
  },
];

export const featuredProject = projects.find((p) => p.featured) ?? projects[0];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
