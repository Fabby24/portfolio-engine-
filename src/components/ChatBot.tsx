import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Brain } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Msg = { role: "user" | "assistant"; content: string };

const quickQuestions = [
  "Why should we hire Fabian?",
  "How does he handle pressure?",
  "Can he build software for me?",
  "How much does he charge?",
];

// ─── KNOWLEDGE BASE ────────────────────────────────────────────────────────────
const KB = {
  personal: {
    name: "Fabian Mutune Musau",
    location: "Nyeri, Kenya",
    phone: "0768 810 226",
    email: "musaufabian7@gmail.com",
    github: "https://github.com/Fabby24",
    linkedin: "https://www.linkedin.com/in/fabian-musau/",
    status: "Available for opportunities",
    summary:
      "Full-Stack Developer from Kenya specializing in React, Node.js & Python. He crafts education tech, business systems, and automation tools that create real-world impact across Africa.",
  },
  freelance: {
    canBuild: [
      "Personal portfolio websites",
      "Business websites and landing pages",
      "Booking and reservation systems",
      "Billing and invoicing systems",
      "Education platforms",
      "WiFi / network monitoring dashboards",
      "REST APIs and backend systems",
      "Mobile-first responsive web apps",
      "SMS notification systems",
      "Admin dashboards and data management tools",
    ],
    pricing: [
      { type: "Simple landing page / portfolio site", range: "Ksh 5,000 – 15,000" },
      { type: "Business website with contact/forms", range: "Ksh 15,000 – 40,000" },
      { type: "Full web app (booking, billing system)", range: "Ksh 50,000 – 150,000+" },
      { type: "Custom platform (EduBursary-level)", range: "Quoted on discussion" },
    ],
    process: [
      "**Discovery** — Listens to your needs, goals, and budget",
      "**Proposal** — Clear scope of work and timeline",
      "**Design** — Wireframes or mockups for approval",
      "**Development** — Iterative builds with regular updates",
      "**Delivery** — Deployment, handover, and post-launch support",
    ],
  },
  projects: [
    {
      title: "EduBursary System", status: "Active",
      github: "https://github.com/Fabby24/Edu-Bursary",
      tech: ["Django", "Python", "MySQL", "Tailwind CSS"],
      problem: "Students in Kenya struggle to access bursary funding due to fragmented, paper-based processes.",
      solution: "Full-stack web app with role-based access for students, reviewers, and administrators. Secure authentication, relational database models, and queue-based processing.",
      impact: "Reduced application processing time by **70%**, serving **500+ students** in the pilot phase.",
      role: "Lead Developer — system design, backend architecture, database modelling",
    },
    {
      title: "SecureLab WiFi Access Control", status: "Completed",
      github: "https://github.com/Fabby24/karatina-wifi-secure",
      live: "https://karatina-wifi-secure.vercel.app/",
      tech: ["React", "Tailwind CSS", "Supabase", "SMS API"],
      problem: "Unauthorized devices on shared WiFi created security vulnerabilities and bandwidth misuse.",
      solution: "Real-time monitoring with event-based triggers, Supabase device tracking, SMS alerts, and an admin dashboard.",
      impact: "Enabled real-time network visibility and reduced response time to unauthorized access.",
      role: "Full-Stack Developer — API integration, SMS alerts, database (team of 4)",
    },
    {
      title: "DJ Booking & Portfolio Platform", status: "Maintained",
      github: "https://github.com/Fabby24/djmellow-Platform",
      tech: ["React", "Node.js", "Express.js", "MongoDB", "Africa's Talking API", "Python"],
      problem: "Creative professionals needed a modern platform to showcase work and manage client bookings.",
      solution: "Full-stack platform with audio features, mobile-first UI, and Python backend for bookings.",
      impact: "Centralized digital presence for the DJ's brand and services.",
      role: "Full-Stack Developer — frontend, backend, audio integration",
    },
    {
      title: "Dynamic Billing & Space Reservation", status: "Completed",
      github: "https://github.com/Fabby24/Dynamic-and-billing-system",
      tech: ["React", "Python", "Flask", "MongoDB", "Stripe API"],
      problem: "Businesses managing shared spaces lacked a unified billing and reservation system.",
      solution: "Modular architecture with rule-based pricing engine, calendar, optimistic locking, and Stripe.",
      impact: "Automated billing for **3 business locations**, eliminating manual invoicing errors.",
      role: "Full-Stack Developer — pricing engine, payment integration, system architecture",
    },
  ],
  skills: {
    advanced: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "Git", "REST APIs"],
    proficient: ["Python", "Django", "MySQL", "Linux"],
    familiar: ["MongoDB", "PHP", "Flask", "Supabase"],
    frontend: ["React.js", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"],
    backend: ["Django", "Node.js", "Express.js", "Flask"],
    databases: ["MySQL", "Supabase", "MongoDB"],
    tools: ["Git", "GitHub", "Vercel", "Netlify", "VS Code"],
  },
  education: {
    degree: "Bachelor of Science in Computer Science",
    university: "Karatina University, Kenya",
    duration: "2023 – 2027",
    coursework: ["Data Structures", "Algorithms", "Database Systems", "Software Engineering"],
  },
  certifications: [
    { name: "Full-Stack Web Development", issuer: "PLP Academy", year: "2024" },
    { name: "Python for Data Science", issuer: "Coursera", year: "2023" },
    { name: "JavaScript Algorithms & Data Structures", issuer: "freeCodeCamp", year: "2023" },
  ],
  whyHire: [
    "4 production projects with measurable real-world impact",
    "Full-stack capable — React frontend to Python/Node backend to deployment",
    "Mentored **50+ student developers**",
    "Available immediately for new opportunities",
    "Deep understanding of African tech challenges",
    "70% faster bursary processing and eliminated billing errors in real projects",
    "Comfortable solo or in teams (led a 4-person project)",
    "Passionate about education tech and social impact",
  ],
};

// ─── INTENT DEFINITIONS ────────────────────────────────────────────────────────
// Each intent has training phrases — the more varied, the smarter the matching
const INTENTS = [
  {
    tag: "greeting",
    examples: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening",
      "what's up", "howdy", "greetings", "hey there", "hi there", "morning", "afternoon"],
    respond: () =>
      `Hi there! 👋 I'm Fabian's AI portfolio assistant.\n\nI understand natural language — ask me anything like:\n- *"How does he handle pressure?"*\n- *"Can he build an app for me?"*\n- *"What makes him a good hire?"*\n\nWhat would you like to know?`,
  },
  {
    tag: "who_is_fabian",
    examples: ["who is fabian", "tell me about fabian", "introduce fabian",
      "give me an overview", "what does fabian do", "describe fabian",
      "fabian background", "about him", "who are you", "fabian summary",
      "what kind of developer is fabian", "fabian profile"],
    respond: () =>
      `**${KB.personal.name}** is a ${KB.personal.summary}\n\nCurrently studying **${KB.education.degree}** at ${KB.education.university} while shipping production software and mentoring 50+ developers.\n\n📍 ${KB.personal.location} | ${KB.personal.status}`,
  },
  {
    tag: "pressure_stress",
    examples: [
      "how does he handle pressure", "how does fabian work under pressure",
      "how does he handle stress", "can he work under tight deadlines",
      "how does he cope with stress", "is he good under pressure",
      "how does he manage stressful situations", "what happens when things go wrong",
      "how does he react to challenges", "does he work well under pressure",
      "how does he deal with problems", "fabian stress management",
      "can he handle high pressure", "how does he handle difficult situations",
      "does he panic under pressure", "how does he perform under stress",
      "is he calm under pressure", "how does he handle crises",
      "is he good with deadlines", "what does he do when projects go wrong",
    ],
    respond: () =>
      `Fabian thrives under pressure — here's how:\n\n🧠 **Stays methodical** — Breaks problems into smaller steps rather than panicking. Proven at hackathons (Dedan Kimathi University) building full solutions under tight deadlines.\n\n🔍 **Debugs with logic** — Treats issues as detective work: reproduce, hypothesize, narrow scope, fix. No random guessing.\n\n🏗️ **Plans for failure upfront** — On EduBursary, he designed for concurrent users and edge cases before launch. On the Billing System, he handled race conditions proactively.\n\n👥 **Communicates in teams** — In SecureLab (team of 4), he coordinated API integration and SMS alerts while keeping everyone aligned.\n\n📚 **Recovers fast** — His best growth came from failed projects. That mindset means he bounces back quickly and never repeats the same mistake.\n\n**Bottom line:** pressure sharpens his focus rather than breaking it.`,
  },
  {
    tag: "work_style",
    examples: [
      "what is his work style", "how does he work", "is he a team player",
      "does he work well in teams", "how does he collaborate", "is fabian independent",
      "how does he approach work", "his personality at work", "how does he communicate",
      "is he organized", "does he meet deadlines", "is he reliable",
      "how does fabian deliver projects", "is he a good communicator",
      "how does he manage his time", "what is he like to work with",
    ],
    respond: () =>
      `Fabian's work style:\n\n⚙️ **Systems thinker** — Designs before coding. APIs contract-first, databases chosen by access patterns.\n\n🤝 **Team player & solo capable** — Led a 4-person team (SecureLab) and built EduBursary as sole lead. Adapts to both.\n\n🎯 **Impact-focused** — Measures success by real outcomes: 70% faster processing, eliminated billing errors — not just "it ships."\n\n📣 **Clear communicator** — Leading 50+ students built strong communication habits.\n\n🔄 **Iterative** — Delivers in stages, reviews, and improves. No big-bang releases.`,
  },
  {
    tag: "strengths",
    examples: [
      "what are his strengths", "what is fabian good at", "his best qualities",
      "what makes him stand out", "what is he exceptionally good at",
      "his strong points", "fabian best traits", "what does he excel at",
      "what are his superpowers", "what is he great at",
    ],
    respond: () =>
      `Fabian's key strengths:\n\n🚀 **Full-stack depth** — Ships complete systems end-to-end, not just one layer.\n\n🧩 **Problem decomposition** — Breaks complex problems into clean, manageable solutions.\n\n👨‍🏫 **Leadership** — Mentored 50+ student developers. Communicates technical ideas clearly.\n\n📐 **System design** — Thinks about scalability, failure, and maintainability from day one.\n\n🌍 **African tech context** — Understands local constraints (mobile-first users, SMS notifications, low-bandwidth environments) that most developers outside the region miss.`,
  },
  {
    tag: "weaknesses",
    examples: [
      "what are his weaknesses", "what is fabian bad at", "any weaknesses",
      "what does he struggle with", "areas for improvement", "what can he improve",
      "his weak points", "what is he not good at", "any limitations",
      "where does he need to grow",
    ],
    respond: () =>
      `Fabian is transparent about areas he's still growing in:\n\n📱 **Mobile development** — Focus has been web-based; native iOS/Android is not yet in his stack.\n\n☁️ **Cloud infrastructure** — Deploys to Vercel/Netlify well, but advanced AWS/GCP/Azure architecture is still developing.\n\n🧪 **Automated testing** — Actively improving his testing discipline after past projects taught him the cost of skipping it.\n\nThe good news: his learning track record — from beginner to shipping 4 production systems — shows he picks things up fast.`,
  },
  {
    tag: "passion",
    examples: [
      "what is he passionate about", "what drives fabian", "what motivates him",
      "why does he code", "what does he care about", "his interests",
      "what excites him", "fabian passion", "what does he love doing",
      "why did he become a developer", "what inspired him",
    ],
    respond: () =>
      `Fabian is driven by technology that solves real African problems:\n\n🎓 **Education access** — EduBursary came from seeing students miss opportunities due to broken bursary processes.\n\n🔐 **Security** — Built SecureLab because campus networks were genuinely vulnerable.\n\n🌍 **Growing African tech** — Mentors 50+ students because he wants to build the next generation of African developers.\n\n💡 He believes software should create tangible impact, not just ship features.`,
  },
  {
    tag: "why_hire",
    examples: [
      "why should we hire fabian", "why hire him", "reasons to hire fabian",
      "why is fabian a good candidate", "convince me to hire fabian",
      "sell me on fabian", "is fabian worth hiring", "why choose fabian",
      "what value does fabian bring", "make a case for fabian",
      "what makes him a good developer", "is he a good hire",
      "give me reasons to hire him", "why fabian over other developers",
    ],
    respond: () => {
      const pts = KB.whyHire.map((p) => `- ${p}`).join("\n");
      return `Here's why Fabian stands out:\n\n${pts}\n\n💬 Want specifics? Ask about any project or skill!`;
    },
  },
  {
    tag: "can_build",
    examples: [
      "can he build software for me", "can fabian build an app",
      "can he create a website for me", "can he develop a system",
      "i need a website built", "i need a developer",
      "can he work on my project", "i want to hire him for a project",
      "build me an app", "i need a web app", "is he available for freelance",
      "does he take freelance projects", "can i hire him",
      "looking for a developer", "i need someone to build my software",
      "can he develop my idea", "i have a project idea",
      "i need a web developer", "can he make me a website",
    ],
    respond: () => {
      const list = KB.freelance.canBuild.map((i) => `- ${i}`).join("\n");
      return `Absolutely! ✅ Fabian is available for freelance and contract projects.\n\nHe can build:\n${list}\n\n📩 **${KB.personal.email}** | 📞 **${KB.personal.phone}**\n\nReach out with your idea and he'll put together a proposal!`;
    },
  },
  {
    tag: "pricing",
    examples: [
      "how much does he charge", "what are his rates", "how much for a website",
      "how much does it cost", "what is his fee", "give me a quote",
      "how much for a web app", "pricing", "how much for a portfolio",
      "how much to build a system", "what is the cost",
      "how much does a project cost", "budget for a project",
      "how much for a booking system", "how much for an app",
      "what does he charge per hour", "per project cost",
      "how much for a personal website", "development cost",
      "can i afford him", "is he expensive", "is he affordable",
    ],
    respond: () => {
      const ranges = KB.freelance.pricing.map((r) => `- **${r.type}:** ${r.range}`).join("\n");
      return `💰 Fabian's pricing depends on scope and complexity:\n\n${ranges}\n\n📩 For an exact quote: **${KB.personal.email}** or **${KB.personal.phone}** — he'll discuss your needs and give a fair price.`;
    },
  },
  {
    tag: "process",
    examples: [
      "what is his development process", "how does he build projects",
      "how does he work with clients", "what is the workflow",
      "how does a project start", "how long does it take",
      "what happens after i contact him", "his freelance process",
      "how does he deliver", "what is his approach to projects",
    ],
    respond: () => {
      const steps = KB.freelance.process.map((s, i) => `${i + 1}. ${s}`).join("\n");
      return `Here's how Fabian works with clients:\n\n${steps}\n\n📩 Ready to start? **${KB.personal.email}**`;
    },
  },
  {
    tag: "skills",
    examples: [
      "what are his skills", "what technologies does he know",
      "what is his tech stack", "what languages does he use",
      "what frameworks does he know", "what tools does he use",
      "what can he code in", "does he know react", "what programming languages",
      "his technical skills", "what is he proficient in",
      "does he know python", "does he know nodejs", "does he know typescript",
    ],
    respond: () =>
      `Fabian's tech stack:\n\n**Frontend:** ${KB.skills.frontend.join(", ")}\n\n**Backend:** ${KB.skills.backend.join(", ")}\n\n**Databases:** ${KB.skills.databases.join(", ")}\n\n**Tools:** ${KB.skills.tools.join(", ")}\n\n**Advanced:** ${KB.skills.advanced.join(", ")}\n\n**Proficient:** ${KB.skills.proficient.join(", ")}`,
  },
  {
    tag: "projects",
    examples: [
      "what projects has he built", "tell me about his projects",
      "show me his work", "what has he built", "his portfolio projects",
      "list his projects", "his github projects", "what apps has he made",
      "show me his portfolio", "what systems has he built",
    ],
    respond: () => {
      const list = KB.projects.map((p) => `- **${p.title}** _(${p.status})_ — ${p.tech.slice(0, 3).join(", ")}`).join("\n");
      return `Fabian has built **${KB.projects.length} major projects**:\n\n${list}\n\nAsk me about any of them for the full case study! 👆`;
    },
  },
  {
    tag: "edubursary",
    examples: ["tell me about edubursary", "what is edubursary", "edubursary project",
      "bursary system", "scholarship platform", "student funding app", "education platform"],
    respond: () => {
      const p = KB.projects[0];
      return `**${p.title}** _(${p.status})_\n\n🔧 **Tech:** ${p.tech.join(", ")}\n\n📌 **Problem:** ${p.problem}\n\n💡 **Solution:** ${p.solution}\n\n📈 **Impact:** ${p.impact}\n\n👤 **Role:** ${p.role}\n\n🔗 [View on GitHub](${p.github})`;
    },
  },
  {
    tag: "securelab",
    examples: ["tell me about securelab", "wifi access control project",
      "network monitoring system", "unauthorized device detection",
      "securelab project", "wifi security project", "karatina wifi"],
    respond: () => {
      const p = KB.projects[1];
      return `**${p.title}** _(${p.status})_\n\n🔧 **Tech:** ${p.tech.join(", ")}\n\n📌 **Problem:** ${p.problem}\n\n💡 **Solution:** ${p.solution}\n\n📈 **Impact:** ${p.impact}\n\n👤 **Role:** ${p.role}\n\n🔗 [GitHub](${p.github}) • [Live Demo](${p.live!})`;
    },
  },
  {
    tag: "dj_platform",
    examples: ["tell me about the dj platform", "dj booking platform",
      "beats and bookings", "djmellow project", "music booking system", "dj portfolio"],
    respond: () => {
      const p = KB.projects[2];
      return `**${p.title}** _(${p.status})_\n\n🔧 **Tech:** ${p.tech.join(", ")}\n\n📌 **Problem:** ${p.problem}\n\n💡 **Solution:** ${p.solution}\n\n📈 **Impact:** ${p.impact}\n\n👤 **Role:** ${p.role}\n\n🔗 [View on GitHub](${p.github})`;
    },
  },
  {
    tag: "billing_system",
    examples: ["tell me about the billing system", "dynamic billing project",
      "space reservation system", "billing and reservation app", "stripe payment project"],
    respond: () => {
      const p = KB.projects[3];
      return `**${p.title}** _(${p.status})_\n\n🔧 **Tech:** ${p.tech.join(", ")}\n\n📌 **Problem:** ${p.problem}\n\n💡 **Solution:** ${p.solution}\n\n📈 **Impact:** ${p.impact}\n\n👤 **Role:** ${p.role}\n\n🔗 [View on GitHub](${p.github})`;
    },
  },
  {
    tag: "education",
    examples: ["where did he study", "what is his education", "what degree does he have",
      "karatina university", "his university", "where does he go to school",
      "his academic background", "what is he studying"],
    respond: () =>
      `Fabian is studying **${KB.education.degree}** at **${KB.education.university}** (${KB.education.duration}).\n\nRelevant coursework: ${KB.education.coursework.join(", ")}.`,
  },
  {
    tag: "certifications",
    examples: ["what certifications does he have", "his credentials", "plp academy",
      "freecodecamp certification", "coursera", "his certificates", "online courses"],
    respond: () => {
      const list = KB.certifications.map((c) => `- **${c.name}** — ${c.issuer} (${c.year})`).join("\n");
      return `Fabian's certifications:\n\n${list}`;
    },
  },
  {
    tag: "experience",
    examples: ["what is his experience", "his work history", "has he worked before",
      "what roles has he held", "his professional experience", "has he led teams",
      "leadership experience", "mentoring experience", "does he have real experience"],
    respond: () =>
      `${KB.personal.summary}\n\n**Web Development Community Lead** @ Innovation Club, Karatina University _(Oct 2025 – Present)_\n  - Led and mentored **50+ students**\n  - Coordinated campus web development projects\n\n**Freelance Web Developer** _(Ongoing)_\n  - Delivered solutions for local clients\n  - Built responsive and SEO-friendly web apps\n\n**Hackathon Participant** @ Dedan Kimathi University _(2024)_\n  - Built solutions in cross-functional teams under tight deadlines`,
  },
  {
    tag: "contact",
    examples: ["how do i contact fabian", "how can i reach him", "what is his email",
      "his phone number", "how to get in touch", "his linkedin", "his github",
      "contact details", "how do i hire him", "where can i find him"],
    respond: () =>
      `Here's how to reach Fabian:\n\n📧 **Email:** ${KB.personal.email}\n📞 **Phone:** ${KB.personal.phone}\n🔗 **LinkedIn:** ${KB.personal.linkedin}\n🐙 **GitHub:** ${KB.personal.github}\n\nHe's **${KB.personal.status}** and excited about new opportunities!`,
  },
  {
    tag: "availability",
    examples: ["is he available", "is fabian available for hire", "can i hire him now",
      "is he open to work", "is he looking for a job", "when can he start",
      "is he currently employed", "is he free for projects"],
    respond: () =>
      `Yes! Fabian is currently **${KB.personal.status}** 🟢\n\nReach him at **${KB.personal.email}** or connect on [LinkedIn](${KB.personal.linkedin}).`,
  },
  {
    tag: "location",
    examples: ["where is fabian located", "where does he live", "is he in kenya",
      "is he remote", "can he work remotely", "his location", "where is he based"],
    respond: () =>
      `Fabian is based in **${KB.personal.location}**. He builds solutions focused on African real-world impact and is open to **remote opportunities** globally.`,
  },
  {
    tag: "thanks",
    examples: ["thank you", "thanks", "cheers", "appreciate it",
      "that's helpful", "great thanks", "awesome thanks", "perfect thanks"],
    respond: () =>
      `You're welcome! Feel free to ask anything else, or contact Fabian at **${KB.personal.email}** 📩`,
  },
];

// ─── PURE-TS SEMANTIC ENGINE (no external deps, instant) ──────────────────────

// Stop words to ignore
const STOP_WORDS = new Set([
  "a","an","the","is","it","in","on","at","to","for","of","and","or","but",
  "he","she","they","we","i","you","me","him","her","us","them","his","their",
  "this","that","these","those","be","are","was","were","has","have","had",
  "do","does","did","will","would","could","should","may","might","can",
  "what","how","why","when","where","who","which","with","about","any",
  "does","just","like","also","very","so","if","then","than","there",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));
}

function buildTFIDF(corpus: string[][]): { vocab: string[]; idf: Map<string, number>; vectors: Map<string, number>[] } {
  // Build vocab
  const vocabSet = new Set<string>();
  corpus.forEach((doc) => doc.forEach((w) => vocabSet.add(w)));
  const vocab = Array.from(vocabSet);

  // IDF: log(N / df)
  const N = corpus.length;
  const idf = new Map<string, number>();
  for (const term of vocab) {
    const df = corpus.filter((doc) => doc.includes(term)).length;
    idf.set(term, Math.log((N + 1) / (df + 1)) + 1);
  }

  // TF-IDF vectors per document
  const vectors = corpus.map((doc) => {
    const tf = new Map<string, number>();
    doc.forEach((w) => tf.set(w, (tf.get(w) ?? 0) + 1));
    const vec = new Map<string, number>();
    for (const [term, count] of tf) {
      vec.set(term, (count / doc.length) * (idf.get(term) ?? 1));
    }
    return vec;
  });

  return { vocab, idf, vectors };
}

function cosineSimilarity(a: Map<string, number>, b: Map<string, number>): number {
  let dot = 0, normA = 0, normB = 0;
  for (const [term, val] of a) {
    dot += val * (b.get(term) ?? 0);
    normA += val * val;
  }
  for (const val of b.values()) normB += val * val;
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

function queryToVec(tokens: string[], idf: Map<string, number>): Map<string, number> {
  const tf = new Map<string, number>();
  tokens.forEach((w) => tf.set(w, (tf.get(w) ?? 0) + 1));
  const vec = new Map<string, number>();
  for (const [term, count] of tf) {
    const idfVal = idf.get(term);
    if (idfVal !== undefined) {
      vec.set(term, (count / tokens.length) * idfVal);
    }
  }
  return vec;
}

// ─── PRE-BUILD SEARCH INDEX (runs once at module load — ~1ms) ─────────────────
const intentDocs = INTENTS.map((intent) =>
  intent.examples.map(tokenize).flat()
);

const { idf, vectors } = buildTFIDF(intentDocs);

function semanticMatch(query: string): string {
  const tokens = tokenize(query);
  if (tokens.length === 0) return INTENTS[0].respond(); // greeting fallback

  const qVec = queryToVec(tokens, idf);

  let bestScore = -1;
  let bestIdx = -1;

  for (let i = 0; i < vectors.length; i++) {
    const score = cosineSimilarity(qVec, vectors[i]);
    if (score > bestScore) {
      bestScore = score;
      bestIdx = i;
    }
  }

  // Bonus: check for direct keyword overlap with intent examples
  let bonusIdx = -1;
  let bonusScore = 0;
  for (let i = 0; i < INTENTS.length; i++) {
    const allWords = INTENTS[i].examples.join(" ").toLowerCase();
    const overlap = tokens.filter((t) => allWords.includes(t)).length;
    const bonusVal = overlap / (tokens.length + 1);
    if (bonusVal > bonusScore) {
      bonusScore = bonusVal;
      bonusIdx = i;
    }
  }

  // Blend TF-IDF and keyword overlap
  const finalIdx = bonusScore > 0.4 ? bonusIdx : bestScore > 0.05 ? bestIdx : -1;

  if (finalIdx === -1 || (bestScore < 0.03 && bonusScore < 0.15)) {
    return `I'm not sure about that specific question. Try asking:\n\n- *"How does he handle pressure?"*\n- *"Why should we hire Fabian?"*\n- *"Can he build an app for me?"*\n- *"How much does he charge?"*\n- *"Tell me about EduBursary"*\n\nOr contact Fabian directly at **${KB.personal.email}** 📩`;
  }

  return INTENTS[finalIdx].respond();
}

// ─── COMPONENT ─────────────────────────────────────────────────────────────────
export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Build index verification (runs once)
  const ready = useMemo(() => idf.size > 0, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    setMessages((prev) => [...prev, { role: "user", content: text.trim() }]);
    setInput("");
    setLoading(true);
    // Small delay for natural feel
    await new Promise((r) => setTimeout(r, 300 + Math.random() * 400));
    setMessages((prev) => [...prev, { role: "assistant", content: semanticMatch(text) }]);
    setLoading(false);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-primary-foreground shadow-lg"
        style={{ background: "var(--gradient-warm)" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={22} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[70vh] rounded-2xl border border-border bg-card shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-border flex items-center gap-2" style={{ background: "var(--gradient-warm)" }}>
              <Brain size={18} className="text-primary-foreground" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-primary-foreground">Ask My Portfolio</p>
                <p className="text-xs text-primary-foreground/70">Smart AI • Understands natural language</p>
              </div>
              {ready && (
                <span className="text-[10px] font-medium text-emerald-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Ready
                </span>
              )}
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Hi! Ask me anything about Fabian in your own words — I understand natural language.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="text-xs px-3 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md"
                  }`}>
                    {msg.role === "assistant" ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none [&>p]:m-0 [&>ul]:m-0">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
              className="p-3 border-t border-border flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about Fabian…"
                className="flex-1 px-3 py-2 rounded-xl bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2 rounded-xl text-primary-foreground disabled:opacity-40"
                style={{ background: "var(--gradient-warm)" }}
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}