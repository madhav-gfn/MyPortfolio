/**
 * Local project overrides
 * ------------------------
 * The Projects page pulls repos live from the GitHub API. The GitHub "About"
 * description now wins by default (see Projects.jsx). This file's main job is
 * to supply the nicer `displayTitle` and the modal's `features` list; the
 * `description` here is only a FALLBACK, used if a repo's GitHub "About" field
 * is ever empty again.
 *
 * Keys must match the GitHub repo name EXACTLY (case-insensitive match is
 * applied by getProjectOverride). Every field is optional:
 *
 *   displayTitle : nicer human title shown on the card/modal (repo name stays
 *                  the technical key used for thumbnails & preview/project.json)
 *   description  : overrides the GitHub "About" text (wins when present)
 *   techStack    : overrides the auto-detected languages (array of strings)
 *   features     : "Key Features" list shown in the modal — array of strings,
 *                  OR array of { name, description } objects. Used as a
 *                  fallback when the repo has no preview/project.json.
 *
 * ⚠️ Entries marked `TODO: verify` are best-effort drafts inferred from the
 *    repo name/language — please refine the wording to match reality.
 */

const projectOverrides = {
  // ---- Confirmed from About.jsx / resume ----
  'Basic-AI-Based-CRM': {
    displayTitle: 'AI-Native CRM with Campaign Automation',
    description:
      'An AI-native CRM built around a 6-model PostgreSQL schema (Prisma ORM). It features a chunked message-dispatch pipeline (50 messages/batch via Promise.allSettled) and a serializable webhook processor with status-rank guards that keep out-of-order delivery events consistent, plus AI-generated campaign insights.',
    techStack: ['TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Next.js', 'Google Gemini 2.0'],
    features: [
      'Chunked dispatch pipeline (50 msg/batch)',
      'Webhook processor with status-rank guards',
      'AI-powered campaign insights',
      '6-model normalized PostgreSQL schema',
    ],
  },

  'GameLog': {
    displayTitle: 'GamesLog — Social Gaming Tracker',
    description:
      'A social gaming tracker backed by a normalized PostgreSQL database (11 models, 18 strategic indexes). Multi-join feed queries are optimized through the Prisma ORM to keep social features under 200ms, with AI-assisted recommendations.',
    techStack: ['JavaScript', 'Node.js', 'PostgreSQL', 'Prisma', 'RESTful API', 'Groq', 'Llama 3.3-70b'],
    features: [
      '11-model normalized schema',
      '18 strategic indexes',
      'Sub-200ms multi-join feed queries',
    ],
  },

  'TTGEngine': {
    displayTitle: 'JSON-Driven Educational Game Engine',
    description:
      'A zero-code educational game engine driven by Zod-validated JSON configs. Pluggable renderers enable 12+ distinct game types without ever modifying the engine core, backed by an AI generation pipeline that scales to 1000+ submissions/second.',
    techStack: ['TypeScript', 'React', 'Express', 'SQLite', 'Zod'],
    features: [
      '12+ game types via JSON config',
      '1000+ submissions/second',
      'AI generation pipeline',
      'Zod-validated, engine-core-agnostic renderers',
    ],
  },

  // ---- Already described on GitHub (kept / lightly polished) ----
  'Lsystem_generator': {
    displayTitle: 'L-Systems & IFS Studio',
    description:
      'A procedural art generator for fractal and organic patterns using L-systems and Iterated Function Systems. It supports stochastic grammars and advanced turtle graphics for nature-inspired structures, producing customizable high-quality vector and raster output.',
    techStack: ['JavaScript', 'Canvas', 'Procedural Generation'],
    features: [
      'L-system & IFS pattern generation',
      'Stochastic grammar support',
      'Advanced turtle graphics',
      'Vector & raster export',
    ],
  },

  'Linux-Fleet-Management_System': {
    displayTitle: 'Linux Fleet Management System',
    description:
      'A local Linux fleet management and monitoring lab. Nodes are provisioned and controlled over SSH, with metrics collected by Prometheus and visualized in Grafana dashboards for real-time observability.',
    techStack: ['Python', 'SSH', 'Prometheus', 'Grafana', 'Linux'],
    features: [
      'SSH-based fleet control',
      'Prometheus metrics collection',
      'Grafana observability dashboards',
    ],
  },

  'Movie-Recommendation': {
    displayTitle: 'Movie Recommendation & Manager',
    description:
      'A movie recommendation, wishlist, and database manager written in C — recommends titles and lets users curate and manage their watchlist through an efficient console-based data manager.',
    techStack: ['C', 'Data Structures'],
    features: ['Recommendation engine', 'Wishlist management', 'Local movie database'],
  },

  // ---- Best-effort drafts — TODO: verify wording ----
  'AI_code_reviewer_git': {
    displayTitle: 'AI Code Reviewer',
    description:
      'An AI-powered code review tool that analyzes Git diffs and automatically surfaces issues, suggestions, and improvements to speed up pull-request review.', // TODO: verify
    features: ['Git diff analysis', 'Automated review suggestions'],
  },

  'Calandly-Assignment-ScalarAI': {
    displayTitle: 'Calendly-Style Scheduler',
    description:
      'A Calendly-style meeting scheduler built as an assignment — handles availability, slot booking, and coordination between participants.', // TODO: verify
    features: ['Availability management', 'Slot booking flow'],
  },

  'Secret_saucers': {
    displayTitle: 'Intelligent Candidate Discovery & Ranking',
    description:
      'A heavily optimized candidate-ranking pipeline that screens 100,000 resumes against a job description in under 45 seconds on CPU, combining baseline pruning, deep semantic context, and a behavioral scorecard to avoid the keyword-matching trap.',
    techStack: ['Python', 'NLP', 'Semantic Search'],
    features: [
      'Screens 100k resumes in <45s on CPU',
      '4-stage funnel architecture',
      'Semantic + behavioral scoring',
    ],
  },

  'annclassification': {
    displayTitle: 'ANN Classification',
    description:
      'An artificial neural network classification project exploring model training, evaluation, and inference in a Jupyter-notebook workflow.', // TODO: verify
    techStack: ['Python', 'Jupyter', 'Neural Networks'],
  },

  'UnityMiniProject': {
    displayTitle: 'Unity Mini Project',
    description:
      'A Unity mini-game built in C#, exploring core gameplay mechanics and interactive systems.', // TODO: verify
    techStack: ['C#', 'Unity'],
  },

  'Price_tracker': {
    displayTitle: 'Monte Carlo Options Pricer',
    description:
      'A European options pricer in C++17 offering both Monte Carlo simulation (geometric Brownian motion) and the Black-Scholes closed form, with analytical Greeks, confidence intervals, and an implied-volatility solver — zero external dependencies, exposed to Python via pybind11.',
    techStack: ['C++17', 'pybind11', 'Python', 'Quant Finance'],
    features: [
      'Monte Carlo & Black-Scholes pricing',
      'Analytical Greeks & confidence intervals',
      'Implied-volatility solver',
      'Python bindings via pybind11',
    ],
  },

  'CineNeon': {
    displayTitle: 'CineNeon',
    description:
      'A neon-themed movie browsing app built with Flutter/Dart for discovering and exploring films.', // TODO: verify
    techStack: ['Dart', 'Flutter'],
  },
};

/**
 * Case-insensitive lookup so a key of "gamelog" still matches repo "GameLog".
 */
export const getProjectOverride = (repoName) => {
  if (!repoName) return null;
  if (projectOverrides[repoName]) return projectOverrides[repoName];
  const lower = repoName.toLowerCase();
  const key = Object.keys(projectOverrides).find((k) => k.toLowerCase() === lower);
  return key ? projectOverrides[key] : null;
};

export default projectOverrides;
