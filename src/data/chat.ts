export type ChatTurn = { role: "bot" | "user"; text: string };

type Entry = { keys: string[]; answer: string };

const knowledge: Entry[] = [
  {
    keys: ["campuspe", "campus pe", "placement", "auto-apply", "auto apply", "edufu"],
    answer:
      "CampusPe is Prem's featured work at Edufu Technologies, where he's a Full-Stack Developer Intern (June 2025–present, remote Bangalore). It's an AI placement platform for 800+ VTU students, with Auto-Apply (Playwright + Ollama), AI resume generation (OpenAI and Claude), and deploys on AWS and Azure. Open Work → CampusPe for the full room.",
  },
  {
    keys: ["micekart", "mice kart", "travel", "event"],
    answer:
      "MICEKart is a freelance corporate travel and events platform. Prem built it with React.js, PHP, SEO, and web hosting, focused on mobile-first layouts and search visibility.",
  },
  {
    keys: ["shivai", "masale", "spice"],
    answer:
      "Shivai Masale is a freelance brand website for a spice business. Prem designed it in React.js, Tailwind CSS, and JavaScript, with SEO and a mobile-first layout.",
  },
  {
    keys: ["nakoda", "export", "agriculture"],
    answer:
      "Nakoda Overseas is a freelance agricultural-export site (React, Tailwind, JavaScript, PHP) built for search visibility. It was delivered and is currently not live.",
  },
  {
    keys: ["livspace", "interior"],
    answer:
      "The Livspace Clone is Prem's semester capstone: a full-stack interior design app with catalogs and quote requests, using React.js, Node.js, MongoDB, and Postman.",
  },
  {
    keys: ["grabon", "grab on", "food", "delivery", "swiggy"],
    answer:
      "GrabOn is a team food-delivery web app (React, Firebase, Figma, Node, MongoDB) with real-time cart and menu, following a Swiggy-style flow.",
  },
  {
    keys: ["who is prem", "who are you", "about prem", "tell me about", "yourself", "intro"],
    answer:
      "Prem Thakare is a full-stack developer focused on AI automation, LLMs, and cloud. He's a Full-Stack Developer Intern at CampusPe (Edufu) since June 2025, and a B.Tech CSE student at ITM Skills University (9.3 CGPA, 2023–2027, Navi Mumbai). Open to internships, freelance, and collaborations.",
  },
  {
    keys: ["what do you do", "role", "work as", "profession", "developer"],
    answer:
      "Prem builds full-stack products: React and Node on the web, Playwright and Ollama for browser automation, OpenAI/Claude for LLM features, and AWS/Azure with GitHub Actions for delivery.",
  },
  {
    keys: ["experience", "intern", "job", "lets upgrade", "career", "work history"],
    answer:
      "Two internships: (1) Full-Stack Developer Intern at Edufu / CampusPe, June 2025–present, Remote Bangalore — Auto-Apply, AI resumes, AWS/Azure. (2) Software Development & Engineering Intern at Lets Upgrade, Dec 2023–Jan 2024, Mumbai — responsive UI and design-to-build work.",
  },
  {
    keys: ["skill", "stack", "technolog", "react", "node", "playwright", "ollama", "aws", "azure", "toolkit"],
    answer:
      "Languages: Python, C++, JavaScript. Frontend: React.js, Tailwind, Flutter. Backend: Node.js, Express, PHP, REST, webhooks. AI: OpenAI, Claude, Ollama, Playwright. Cloud: AWS, Azure, GitHub Actions, Bunny.net. Data: MongoDB, SQL, Firebase. Testing: Selenium, Cypress, Jenkins, JMeter.",
  },
  {
    keys: ["project", "portfolio", "built", "shipped"],
    answer:
      "Selected work: CampusPe (AI placement), MICEKart (travel/events), Shivai Masale (brand site), Nakoda Overseas (export site, not live), Livspace Clone (capstone), GrabOn (food delivery). The Work page has a room for each.",
  },
  {
    keys: ["education", "college", "university", "cgpa", "itm", "school", "study", "degree", "graduate"],
    answer:
      "B.Tech Computer Science & Engineering at ITM Skills University, Navi Mumbai, Aug 2023–2027, 9.3 CGPA. 12th CBSE 73% (2022–23) and 10th 87.6% (2020–21) at Nashik Cambridge School.",
  },
  {
    keys: ["certif", "aws knowledge", "hackerrank"],
    answer:
      "Certifications: AWS Knowledge: Cloud Essentials, HackerRank SQL (Basic), and HackerRank CSS (Basic).",
  },
  {
    keys: ["language", "hindi", "marathi", "english"],
    answer: "Prem works in English, Hindi, and Marathi.",
  },
  {
    keys: ["resume", "cv", "download", "pdf"],
    answer:
      "Use Preview resume or Download resume on Home, About, or Contact. Direct file: /resume/Prem-Thakare.pdf.",
  },
  {
    keys: ["contact", "email", "phone", "linkedin", "hire", "freelance", "reach", "message"],
    answer:
      "Email premthakare96680@gmail.com, phone +91 9156621088, LinkedIn linkedin.com/in/premthakare/, GitHub github.com/PremThakareitm. The Contact page has a form that goes to his inbox. He's open to internships, freelance, and collaborations.",
  },
  {
    keys: ["github", "repo", "code", "open source"],
    answer:
      "GitHub: github.com/PremThakareitm. About shows live public stats and recent repositories.",
  },
  {
    keys: ["where", "location", "based", "live", "mumbai", "nashik", "bangalore"],
    answer:
      "Prem is in India (Remote). CampusPe is remote Bangalore. University is in Navi Mumbai. Schooling was in Nashik. Contact location is listed as Remote · India.",
  },
  {
    keys: ["available", "opportunit", "open to", "hiring", "looking"],
    answer:
      "Yes — open to internships, freelance, and collaborations. Best reach: the Contact form or premthakare96680@gmail.com.",
  },
  {
    keys: ["hello", "hi ", "hey", "good morning", "good evening", "namaste"],
    answer:
      "Hello. Ask about Prem's work, CampusPe, skills, education, resume, or how to get in touch. You can type or use the microphone — replies stay in this chat, with no spoken playback.",
  },
  {
    keys: ["sound", "music", "audio", "tune", "microphone", "mic", "talk"],
    answer:
      "The speaker in the header plays a soft looping score you can turn on or off. Chat never speaks replies. The mic only listens so you can ask by voice; the answer appears as text.",
  },
];

const fallback =
  "I don't have a precise match for that. Try: Who is Prem? What is CampusPe? What are his skills? How do I contact him? Or name a project like MICEKart or GrabOn.";

export const suggestedPrompts = [
  "Who is Prem?",
  "What's CampusPe?",
  "How do I contact him?",
  "Show skills",
];

function normalize(input: string) {
  return ` ${input.toLowerCase().replace(/[^a-z0-9+]+/g, " ").trim()} `;
}

export function answerQuestion(input: string) {
  const q = normalize(input);
  if (!q.trim()) return fallback;

  let best: { score: number; answer: string } = { score: 0, answer: fallback };
  for (const entry of knowledge) {
    let score = 0;
    for (const key of entry.keys) {
      const needle = ` ${key} `;
      if (q.includes(needle) || q.includes(key)) {
        score += Math.max(2, key.length);
      }
    }
    if (score > best.score) best = { score, answer: entry.answer };
  }
  return best.score >= 3 ? best.answer : fallback;
}
