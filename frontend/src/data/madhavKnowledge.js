/**
 * "Ask Madhav" knowledge base
 * ---------------------------
 * A lightweight, dependency-free intent matcher that answers questions about
 * Madhav from his résumé data. No API key, no backend — runs entirely client
 * side. getMadhavReply(text) returns { text, links?, chips? } where:
 *   - text : the reply string
 *   - links: optional [{ label, href? , to?, download? }] rendered as buttons
 *   - chips: optional follow-up suggestion strings
 *
 * To extend: add an intent to INTENTS with keywords + an answer, or edit the
 * facts below. Matching is keyword-score based with a graceful fallback.
 */

export const RESUME_URL = '/Madhav_Mishra_Resume.pdf';

export const GREETING = {
  text: "Hi! I'm Madhav's assistant 👋 Ask me about his skills, projects, experience, or how to get in touch.",
  chips: ['What are your skills?', 'Show me your projects', 'Work experience', 'How can I contact you?'],
};

export const INITIAL_SUGGESTIONS = [
  'What tech do you work with?',
  'Tell me about your best project',
  'Are you available for work?',
  'Download résumé',
];

const CONTACT_LINKS = [
  { label: 'Email', href: 'mailto:madhavmishra763@gmail.com' },
  { label: 'Contact page', to: '/contact' },
  { label: 'GitHub', href: 'https://github.com/madhav-gfn' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/madhav-gfn' },
];

const PROJECTS = [
  {
    name: 'TeacherJi — AI Learning Platform',
    keywords: ['teacherji', 'teacher ji', 'tutor', 'ncert', 'learning', 'education platform', 'rag tutor'],
    blurb:
      'A retrieval-augmented, 3-agent tutoring system over NCERT textbooks (FAISS + LangGraph). It handles concept delivery, quiz generation, and adaptive feedback with sub-200ms Groq inference, deployed on Render & Vercel.',
    tech: ['FastAPI', 'React', 'LangGraph', 'Groq', 'FAISS', 'PostgreSQL', 'Redis'],
  },
  {
    name: 'RAG-Powered Local Code Review Engine',
    keywords: ['code review', 'rag engine', 'onnx', 'tree-sitter', 'treesitter', 'llama', 'local rag', 'code reviewer'],
    blurb:
      'A fully local RAG pipeline: Tree-sitter parses code into function/class units, a Qwen2.5-Coder ONNX model embeds them, and a FAISS HNSW index retrieves context. Grammar-constrained (GBNF) decoding guarantees valid JSON for deterministic severity scoring.',
    tech: ['C++20', 'ONNX', 'FAISS', 'llama.cpp', 'Tree-sitter', 'SQLite'],
  },
  {
    name: 'AI-Native CRM with Campaign Automation',
    keywords: ['crm', 'campaign', 'automation', 'gemini', 'moda', 'marketing', 'webhook'],
    blurb:
      'A 6-model PostgreSQL/Prisma CRM with a chunked dispatch pipeline and serializable webhook processor. Google Gemini 2.0 Flash powers NL-to-filter segmentation, a RAG Campaign Copilot, and post-campaign insights across a SENT→DELIVERED→OPENED→CLICKED funnel.',
    tech: ['TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Next.js 16', 'Google Gemini 2.0'],
  },
  {
    name: 'JSON-Driven Educational Game Engine',
    keywords: ['game engine', 'json engine', 'zod', 'zero-code', 'ttg', 'games', 'game platform'],
    blurb:
      'A zero-code game engine with Zod-validated JSON configs enabling 12+ game types via pluggable renderers — plus an AI pipeline that turns prompts into valid configs, and a leaderboard API handling 1000+ submissions/second.',
    tech: ['TypeScript', 'React', 'Express', 'SQLite', 'Zod'],
  },
];

const SKILLS = {
  Languages: ['C++', 'Python', 'TypeScript', 'JavaScript', 'C', 'C#'],
  'Systems, Web & Backend': ['RESTful APIs', 'Node.js', 'Express.js', 'React', 'Tailwind CSS', 'Zustand', 'FastAPI', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQL', 'Next.js', 'Prisma'],
  'AI & LLM': ['LangGraph', 'AI Agents', 'RAG (FAISS)', 'Groq API', 'LangChain', 'Hugging Face', 'Agentic Workflows'],
  'Cloud & Infra': ['Google Cloud', 'Oracle Cloud', 'Prometheus', 'Grafana', 'VirtualBox'],
  'Dev Tools': ['Git', 'GitHub', 'Postman', 'Jira', 'Agile/Scrum'],
};

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9+#\s]/g, ' ').replace(/\s+/g, ' ').trim();

// Detailed reply for a single project, reused by the pre-check and the
// generic projects intent.
const projectDetail = (p) => ({
  text: `${p.name}\n\n${p.blurb}\n\nTech: ${p.tech.join(', ')}.`,
  chips: ['Other projects', 'Contact'],
  links: [{ label: 'View all projects', to: '/projects' }],
});

const findProject = (input) => PROJECTS.find((p) => p.keywords.some((k) => input.includes(k)));

// Ordered list of intents. Each keyword hit adds to the score; highest wins.
const INTENTS = [
  {
    id: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'yo', 'namaste', 'sup', 'greetings', 'good morning', 'good evening'],
    answer: () => ({
      text: "Hey there! 👋 I can tell you about Madhav's skills, projects, experience, education, or how to reach him. What would you like to know?",
      chips: ['Skills', 'Projects', 'Experience', 'Contact'],
    }),
  },
  {
    id: 'about',
    keywords: ['who are you', 'who is madhav', 'yourself', 'introduce', 'bio', 'about him', 'about madhav'],
    answer: () => ({
      text: "Madhav Mishra is a Full-Stack Developer and AI/LLM Engineer, and a CS undergrad (HCI & Gaming Technology) at IIIT Nagpur. He builds scalable distributed systems and AI-powered applications — from agentic tutoring platforms to local RAG code reviewers.",
      chips: ['His projects', 'His skills', 'Education', 'Résumé'],
    }),
  },
  {
    id: 'skills',
    keywords: ['skill', 'tech', 'technology', 'stack', 'language', 'programming', 'framework', 'tools', 'know', 'expertise', 'proficient', 'backend', 'frontend', 'database', 'ai', 'llm', 'cloud'],
    answer: (input) => {
      // Sub-answers for specific categories
      if (/\b(ai|llm|ml|agent|rag|langchain|langgraph)\b/.test(input))
        return { text: `On the AI/LLM side: ${SKILLS['AI & LLM'].join(', ')}.`, chips: ['Backend skills', 'Show AI projects'] };
      if (/\b(backend|server|api|database|db|sql)\b/.test(input))
        return { text: `Backend & web: ${SKILLS['Systems, Web & Backend'].join(', ')}.`, chips: ['AI skills', 'Languages'] };
      if (/\b(cloud|devops|infra|deploy|prometheus|grafana)\b/.test(input))
        return { text: `Cloud & infra: ${SKILLS['Cloud & Infra'].join(', ')}.`, chips: ['Backend skills', 'Dev tools'] };
      if (/\b(language|languages)\b/.test(input))
        return { text: `Languages: ${SKILLS.Languages.join(', ')}.`, chips: ['Backend skills', 'AI skills'] };
      return {
        text:
          "Madhav works across the full stack:\n" +
          `• Languages: ${SKILLS.Languages.join(', ')}\n` +
          `• Web & Backend: ${SKILLS['Systems, Web & Backend'].slice(0, 8).join(', ')}…\n` +
          `• AI & LLM: ${SKILLS['AI & LLM'].join(', ')}\n` +
          `• Cloud & Infra: ${SKILLS['Cloud & Infra'].join(', ')}`,
        chips: ['AI/LLM details', 'Backend details', 'Show projects'],
      };
    },
  },
  {
    id: 'projects',
    keywords: ['project', 'projects', 'built', 'build', 'made', 'work on', 'portfolio', 'best project', 'proud', 'showcase', 'app', 'application'],
    answer: (input) => {
      const specific = findProject(input);
      if (specific) return projectDetail(specific);
      return {
        text:
          "Here are some highlights:\n" +
          PROJECTS.map((p, i) => `${i + 1}. ${p.name}`).join('\n') +
          "\n\nAsk about any one for details, or browse them all.",
        chips: PROJECTS.slice(0, 3).map((p) => p.name.split(' — ')[0].split(' with ')[0]),
        links: [{ label: 'View all projects', to: '/projects' }],
      };
    },
  },
  {
    id: 'experience',
    keywords: ['experience', 'job', 'work experience', 'intern', 'internship', 'freelance', 'henwic', 'employment', 'company', 'worked'],
    answer: () => ({
      text:
        "Freelance Full-Stack Developer — Product Engineering at Henwic Biomedics (Remote, May–June 2026).\n\nHe built an interactive biomedical product marketing site with React, TypeScript, and WebGL shaders — scroll animations, particle effects, and lead-capture via EmailJS + Google Analytics.",
      chips: ['His projects', 'His skills', 'Résumé'],
    }),
  },
  {
    id: 'education',
    keywords: ['education', 'college', 'university', 'degree', 'study', 'studied', 'gpa', 'iiit', 'student', 'graduate', 'btech', 'b.tech', 'coursework'],
    answer: () => ({
      text:
        "B.Tech in Computer Science & Engineering (HCI & Gaming Technology) at IIIT Nagpur, 2023–2027, GPA 7.93.\n\nCoursework spans DSA, OS, DBMS, OOP, Algorithm Design, HCI, Software Engineering, Computer Vision, and Computer Graphics.",
      chips: ['Achievements', 'Skills', 'Projects'],
    }),
  },
  {
    id: 'achievements',
    keywords: ['achievement', 'award', 'won', 'win', 'hackathon', 'prize', 'rank', 'competition', 'game jam', 'designathon'],
    answer: () => ({
      text:
        "🏆 A few wins:\n• 1st place / 20+ teams — TECHNEX'25 Game Jam, IIT BHU (deception-driven tower defense)\n• 1st prize / 30+ teams — Tantarfiesta'25 Designathon (emotion-based journaling app)\n• 3rd Runner-Up — Exergy Case Study Challenge, IIT Kanpur",
      chips: ['Projects', 'Certifications'],
    }),
  },
  {
    id: 'certifications',
    keywords: ['certification', 'certificate', 'certified', 'course', 'oracle', 'nvidia', 'cuda', 'credential'],
    answer: () => ({
      text:
        "📜 Certifications:\n• NVIDIA — Fundamentals of Accelerated Computing with CUDA Python (Apr 2026)\n• Complete Generative AI with LangChain & HuggingFace (Jan–Apr 2026)\n• Oracle Cloud Infrastructure 2025 Certified Foundations Associate (Nov 2025)",
      chips: ['Skills', 'Achievements'],
    }),
  },
  {
    id: 'contact',
    keywords: ['contact', 'email', 'reach', 'hire', 'connect', 'phone', 'call', 'message', 'get in touch', 'linkedin', 'github', 'social', 'talk'],
    answer: () => ({
      text: "You can reach Madhav at madhavmishra763@gmail.com or +91-9536068062. He's also on GitHub and LinkedIn — pick whatever's easiest:",
      links: CONTACT_LINKS,
      chips: ['Are you available?', 'Résumé'],
    }),
  },
  {
    id: 'availability',
    keywords: ['available', 'availability', 'hiring', 'freelance', 'open to', 'opportunity', 'opportunities', 'looking for', 'work with'],
    answer: () => ({
      text: "Yes — Madhav is currently open to freelance projects and full-time opportunities, especially around backend systems, AI/LLM apps, and cloud infrastructure. The best next step is to reach out:",
      links: [{ label: 'Get in touch', to: '/contact' }, { label: 'Email', href: 'mailto:madhavmishra763@gmail.com' }],
      chips: ['His skills', 'His projects'],
    }),
  },
  {
    id: 'resume',
    keywords: ['resume', 'résumé', 'cv', 'download', 'pdf'],
    answer: () => ({
      text: "Here's Madhav's résumé — you can download the full PDF:",
      links: [{ label: 'Download résumé (PDF)', href: RESUME_URL, download: true }, { label: 'About page', to: '/about' }],
    }),
  },
  {
    id: 'location',
    keywords: ['location', 'where', 'based', 'city', 'country', 'from', 'live', 'nagpur', 'india', 'remote'],
    answer: () => ({
      text: "Madhav is based in Nagpur, Maharashtra, India — and works remotely with teams anywhere.",
      chips: ['Are you available?', 'Contact'],
    }),
  },
  {
    id: 'interests',
    keywords: ['interest', 'interests', 'passion', 'like', 'enjoy', 'hobby', 'hobbies', 'love'],
    answer: () => ({
      text: "Madhav is into software development, scalable systems, HCI, AI/LLM engineering, and performance optimization — plus a soft spot for game design (ask about the Game of Life easter egg 💀).",
      chips: ['Projects', 'Skills'],
    }),
  },
  {
    id: 'thanks',
    keywords: ['thanks', 'thank you', 'thx', 'ty', 'appreciate', 'cool', 'nice', 'awesome', 'great'],
    answer: () => ({ text: "Anytime! 😄 Anything else you'd like to know about Madhav?", chips: ['Projects', 'Skills', 'Contact'] }),
  },
  {
    id: 'bye',
    keywords: ['bye', 'goodbye', 'see you', 'later', 'cya', 'gtg'],
    answer: () => ({ text: "Take care! 👋 Feel free to reach out to Madhav anytime.", links: [{ label: 'Contact', to: '/contact' }] }),
  },
];

const FALLBACK = {
  text:
    "I'm not totally sure about that one 🤔 — I know about Madhav's skills, projects, experience, education, achievements, and how to contact him. Try one of these, or email him directly:",
  chips: ['Skills', 'Projects', 'Experience', 'Contact'],
};

export function getMadhavReply(rawInput) {
  const input = norm(rawInput || '');
  if (!input) return FALLBACK;

  // Specific project names win outright ("tell me about the code review project").
  const specificProject = findProject(input);
  if (specificProject) return projectDetail(specificProject);

  const tokens = new Set(input.split(' '));

  // Word-boundary-ish keyword hit test to avoid false positives like the
  // keyword "yo" matching inside "you", or "hi" inside "architecture".
  const hits = (kw) => {
    if (kw.includes(' ')) return input.includes(kw); // multi-word phrase
    if (kw.length < 4) return tokens.has(kw); // short → exact token only
    for (const t of tokens) if (t.includes(kw)) return true; // stem match (project → projects)
    return false;
  };

  let best = null;
  let bestScore = 0;

  for (const intent of INTENTS) {
    let score = 0;
    for (const kw of intent.keywords) {
      if (hits(kw)) score += kw.includes(' ') ? 3 : 1; // phrases weigh more
    }
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  }

  if (!best || bestScore === 0) return FALLBACK;
  return best.answer(input);
}
