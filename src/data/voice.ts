export const pageSummaries: Record<string, string> = {
  "/":
    "Welcome to Prem Thakare's portfolio. Prem is a full-stack developer working in AI automation, cloud, and product engineering. Featured work is CampusPe, an AI placement platform serving over eight hundred VTU students. Use the rooms below to explore work, about, lab, and contact. You can also open the chat for a short briefing.",
  "/work":
    "This is the work room. It collects Prem's products and systems: CampusPe, MICEKart, Shivai Masale, Nakoda Overseas, a Livspace clone, and GrabOn. Open any room for the problem, implementation, and outcome.",
  "/about":
    "This is the about room. Prem is a B.Tech CSE student at ITM Skills University with a 9.3 CGPA, currently a full-stack intern at CampusPe. Skills include React, Node, Playwright, Ollama, AWS, and Azure. Resume preview and GitHub are on this page.",
  "/lab":
    "This is the lab. Experiments in progress include Auto-Apply agents with Playwright and Ollama, resume intelligence, local LLM routing, and deployment pipelines.",
  "/contact":
    "This is the contact room. Send Prem a message with the form and it will arrive in his email. You can also preview the resume, or reach him on email, phone, LinkedIn, and GitHub.",
};

export function summaryForPath(pathname: string) {
  if (pathname.startsWith("/work/") && pathname !== "/work/") {
    return "This is a project room. It covers the problem, implementation, architecture, and outcome for one of Prem's products. Use close room to return to all work.";
  }
  return pageSummaries[pathname] ?? pageSummaries["/"];
}
