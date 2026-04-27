import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Msg = { role: "user" | "assistant"; content: string };

const quickQuestions = [
  "Why should we hire Fabian?",
  "What are his top skills?",
  "Tell me about EduBursary",
  "Can he build software for me?",
];

// ─── KNOWLEDGE BASE ───────────────────────────────────────────────────────────
const KB = {
  personal: {
    name: "Fabian Mutune Musau",
    location: "Nyeri, Kenya",
    phone: "0768 810 226",
    email: "musaufabian7@gmail.com",
    github: "https://github.com/Fabby24",
    linkedin: "https://www.linkedin.com/in/fabian-musau/",
    portfolio: "https://portfolio-engine-eta.vercel.app/",
    status: "Available for opportunities",
    summary:
      "Full-Stack Developer from Kenya specializing in React, Node.js & Python. He crafts education tech, business systems, and automation tools that create real-world impact across Africa.",
  },

  freelance: {
    available: true,
    description:
      "Yes! Fabian takes on freelance and contract projects. He has delivered web solutions for local clients and is open to new projects.",
    pricing: {
      note: "Pricing depends on the scope, complexity, and timeline of the project. Fabian doesn't have fixed public rates — he discusses each project individually.",
      ranges: [
        { type: "Simple landing page / portfolio site", range: "Ksh 5,000 – 15,000" },
        { type: "Business website with contact/forms", range: "Ksh 15,000 – 40,000" },
        { type: "Full web app (e.g. booking, billing system)", range: "Ksh 50,000 – 150,000+" },
        { type: "Custom platform (e.g. EduBursary-level)", range: "Quoted on discussion" },
      ],
      cta: `These are rough estimates. For an accurate quote, reach Fabian at **musaufabian7@gmail.com** or **0768 810 226** — he'll discuss your needs and give you a fair price.`,
    },
    canBuild: [
      "Personal portfolio websites",
      "Business websites and landing pages",
      "Booking and reservation systems",
      "Billing and invoicing systems",
      "Education platforms",
      "WiFi / network monitoring dashboards",
      "REST APIs and backend systems",
      "Mobile-first responsive web apps",
      "SMS notification systems (Africa's Talking API)",
      "Admin dashboards and data management tools",
    ],
    process: [
      "1. **Discovery** — Fabian listens to your needs, goals, and budget",
      "2. **Proposal** — He writes a clear scope of work and timeline",
      "3. **Design** — Wireframes or mockups for approval",
      "4. **Development** — Iterative builds with regular updates",
      "5. **Delivery** — Deployment, handover, and post-launch support",
    ],
  },

  education: {
    degree: "Bachelor of Science in Computer Science",
    university: "Karatina University, Kenya",
    duration: "2023 – 2027 (currently studying)",
    coursework: ["Data Structures", "Algorithms", "Database Systems", "Software Engineering"],
  },

  skills: {
    advanced: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "Git & GitHub", "REST APIs"],
    proficient: ["Python", "Django", "Linux", "Shell Scripting", "MySQL"],
    familiar: ["MongoDB", "PHP", "Flask", "Supabase"],
    frontend: ["React.js", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"],
    backend: ["Django", "Node.js", "Express.js", "Flask"],
    databases: ["MySQL", "Supabase", "MongoDB"],
    tools: ["Git", "GitHub", "Vercel", "Netlify", "VS Code"],
    concepts: ["REST APIs", "System Design", "Database Design", "Responsive UI", "Debugging", "CI/CD"],
  },

  projects: [
    {
      title: "EduBursary System",
      keywords: ["edubursary", "bursary", "scholarship", "student funding", "education platform"],
      status: "Active",
      github: "https://github.com/Fabby24/Edu-Bursary",
      tech: ["Django", "Python", "MySQL", "Tailwind CSS"],
      problem: "Students in Kenya struggle to access bursary funding due to fragmented, paper-based processes.",
      solution:
        "Full-stack web app with role-based access for students, reviewers, and administrators. Secure authentication, structured relational database models, and queue-based processing.",
      impact: "Reduced application processing time by **70%**, serving **500+ students** in the pilot phase.",
      role: "Lead Developer — system design, backend architecture, database modelling",
    },
    {
      title: "SecureLab WiFi Access Control",
      keywords: ["securelab", "wifi", "network security", "unauthorized device", "sms alert", "device monitoring"],
      status: "Completed",
      github: "https://github.com/Fabby24/karatina-wifi-secure",
      live: "https://karatina-wifi-secure.vercel.app/",
      tech: ["React", "Tailwind CSS", "Supabase", "SMS API"],
      problem: "Unauthorized devices on shared WiFi created security vulnerabilities and bandwidth misuse.",
      solution:
        "Real-time monitoring with event-based triggers, Supabase device tracking, instant SMS alerts, and an admin dashboard.",
      impact: "Enabled real-time network visibility and reduced response time to unauthorized access.",
      role: "Full-Stack Developer — API integration, SMS alerts, database (team of 4)",
    },
    {
      title: "DJ Booking & Portfolio Platform",
      keywords: ["dj", "djmellow", "beats", "music booking", "audio platform", "dj platform"],
      status: "Maintained",
      github: "https://github.com/Fabby24/djmellow-Platform",
      tech: ["React", "Node.js", "Express.js", "MongoDB", "Africa's Talking API", "Python"],
      problem: "Creative professionals needed a modern platform to showcase their work and manage client bookings.",
      solution:
        "Full-stack platform with high-performance audio, mobile-first UI, and Python backend for booking requests and client communication.",
      impact: "Centralized digital presence for the DJ's brand and services.",
      role: "Full-Stack Developer — frontend, backend, audio integration",
    },
    {
      title: "Dynamic Billing & Space Reservation",
      keywords: ["billing", "space reservation", "stripe", "payment", "invoice", "billing system"],
      status: "Completed",
      github: "https://github.com/Fabby24/Dynamic-and-billing-system",
      tech: ["React", "Python", "Flask", "MongoDB", "Stripe API"],
      problem: "Businesses managing shared spaces lacked a unified billing and reservation system.",
      solution:
        "Modular architecture with a rule-based pricing engine, calendar system, optimistic locking for concurrent bookings, and Stripe payment integration.",
      impact: "Automated billing for **3 business locations**, eliminating manual invoicing errors.",
      role: "Full-Stack Developer — pricing engine, payment integration, system architecture",
    },
  ],

  experience: [
    {
      role: "Web Development Community Lead",
      org: "Innovation Club, Karatina University",
      duration: "October 2025 – Present",
      highlights: [
        "Led and mentored **50+ students** from basic HTML to advanced JavaScript frameworks",
        "Coordinated development of web solutions for campus events",
        "Improved engagement through structured, project-based learning",
      ],
    },
    {
      role: "Freelance Web Developer",
      org: "Independent",
      duration: "Ongoing",
      highlights: [
        "Delivered web solutions for local clients focusing on performance and usability",
        "Created System Requirements Specifications (SRS) to align solutions with business needs",
        "Built responsive and SEO-friendly web applications",
      ],
    },
    {
      role: "Hackathon Participant",
      org: "Dedan Kimathi University",
      duration: "2024",
      highlights: ["Collaborated in cross-functional teams to build solutions under tight deadlines"],
    },
  ],

  certifications: [
    { name: "Full-Stack Web Development", issuer: "PLP Academy", year: "2024" },
    { name: "Python for Data Science", issuer: "Coursera", year: "2023" },
    { name: "JavaScript Algorithms & Data Structures", issuer: "freeCodeCamp", year: "2023" },
  ],

  mindset: {
    problemSolving: "Maps user journeys and defines success metrics before writing a single line of code.",
    systemDesign: "Designs APIs contract-first, picks databases by access patterns, and plans every component for failure.",
    debugging: "Treats debugging as detective work — reproducing issues methodically, questioning assumptions, validating with data.",
    learning: "Believes the best growth comes from failure. Past mistakes drove his commitment to CI/CD and testing.",
  },

  whyHire: [
    "4 production projects with measurable real-world impact",
    "Full-stack capable — React frontend to Python/Node backend to database and deployment",
    "Mentored 50+ student developers — leadership that scales",
    "Available immediately for new opportunities",
    "Deep understanding of African tech challenges and context",
    "Delivered 70% faster bursary processing and eliminated manual billing errors in real projects",
    "Comfortable solo or in teams (led a 4-person project)",
    "Passionate about education tech and social impact through software",
  ],
};

// ─── INTENT ENGINE ────────────────────────────────────────────────────────────
type Intent = { patterns: RegExp[]; response: () => string };

const intents: Intent[] = [
  // Greetings
  {
    patterns: [/^(hi|hello|hey|good\s*(morning|afternoon|evening)|sup|howdy)\b/],
    response: () =>
      `Hi there! 👋 I'm Fabian's portfolio assistant. Ask me about his skills, projects, experience, freelance work, or how to get in touch. What would you like to know?`,
  },

  // Thanks
  {
    patterns: [/thank|thanks|cheers|appreciate/],
    response: () =>
      `You're welcome! Feel free to ask anything else, or contact Fabian directly at **${KB.personal.email}**.`,
  },

  // What can you do
  {
    patterns: [/who are you|what (can|do) you|about (this )?bot|what is this/],
    response: () =>
      `I'm Fabian Musau's personal portfolio assistant 🤖\n\nI can tell you about:\n- His **skills & tech stack**\n- His **projects** (EduBursary, SecureLab, DJ Platform, Billing System)\n- His **experience & leadership**\n- **Freelance work & pricing**\n- **Why you should hire him**\n- **How to contact him**\n\nWhat would you like to know?`,
  },

  // ── FREELANCE & CUSTOM SOFTWARE ──────────────────────────────────────────────

  // Can he build software / app / website for me
  {
    patterns: [
      /can (he|fabian|you).*(build|create|make|develop|design)/,
      /build.*(for me|for us|my|our|a)/,
      /hire him (to|for)/,
      /need.*(developer|dev|website|app|software|system)/,
      /looking for.*(developer|dev|someone to build)/,
      /available (for|to).*(build|freelance|project|work)/,
    ],
    response: () => {
      const list = KB.freelance.canBuild.map((i) => `- ${i}`).join("\n");
      return `Absolutely! ✅ Fabian is available for freelance and contract projects.\n\nHere's what he can build for you:\n${list}\n\n📩 To get started, reach him at **${KB.personal.email}** or **${KB.personal.phone}** — he'll discuss your idea and put together a proposal.`;
    },
  },

  // How much does he charge / pricing / cost / rate / quote
  {
    patterns: [
      /how much.*(charge|cost|price|rate|fee|quote)/,
      /(charge|cost|price|rate|fee|quote).*(project|website|app|software|portfolio|system)/,
      /what.*(rate|fee|price|charge)/,
      /pricing|hourly rate|per (project|hour|day)/,
      /how much (for|to build|to create|to develop)/,
      /budget.*project|project.*budget/,
    ],
    response: () => {
      const ranges = KB.freelance.pricing.ranges
        .map((r) => `- **${r.type}:** ${r.range}`)
        .join("\n");
      return `💰 Fabian's pricing depends on scope, complexity, and timeline. Here are rough estimates:\n\n${ranges}\n\n${KB.freelance.pricing.cta}`;
    },
  },

  // How much for a portfolio specifically
  {
    patterns: [
      /portfolio.*(cost|charge|price|build|how much)/,
      /how much.*(portfolio|personal site|personal website)/,
      /(build|create|make).*(portfolio|personal site)/,
    ],
    response: () =>
      `A personal portfolio website like Fabian's own typically costs around **Ksh 10,000 – 25,000** depending on features:\n\n- Basic (static, no backend): ~Ksh 5,000 – 10,000\n- With animations & dark mode: ~Ksh 10,000 – 20,000\n- With AI chatbot, blog, or CMS: ~Ksh 20,000 – 40,000\n\n📩 Get an exact quote: **${KB.personal.email}** or **${KB.personal.phone}**`,
  },

  // How does he work / process
  {
    patterns: [
      /how.*(work|process|approach|deliver|develop|build)/,
      /work(ing)? process|development process|workflow/,
    ],
    response: () => {
      const steps = KB.freelance.process.join("\n");
      return `Here's how Fabian approaches a freelance project:\n\n${steps}\n\n📩 Ready to start? Reach him at **${KB.personal.email}**`;
    },
  },

  // Contact
  {
    patterns: [/contact|reach|email|phone|call|get in touch|connect with/],
    response: () =>
      `Here's how to reach Fabian:\n\n📧 **Email:** ${KB.personal.email}\n📞 **Phone:** ${KB.personal.phone}\n🔗 **LinkedIn:** ${KB.personal.linkedin}\n🐙 **GitHub:** ${KB.personal.github}\n\nHe's **${KB.personal.status}** and responsive to new opportunities!`,
  },

  // Why hire
  {
    patterns: [/why (hire|should|choose|pick)|good (candidate|developer|fit)|worth hiring|best candidate|recommend/],
    response: () => {
      const points = KB.whyHire.map((p) => `- ${p}`).join("\n");
      return `Here's why Fabian stands out:\n\n${points}\n\n💬 Want more detail? Ask about any specific project or skill!`;
    },
  },

  // EduBursary
  {
    patterns: [/edubursary|bursary|scholarship|student.?fund/],
    response: () => {
      const p = KB.projects[0];
      return `**${p.title}** _(${p.status})_\n\n🔧 **Tech:** ${p.tech.join(", ")}\n\n📌 **Problem:** ${p.problem}\n\n💡 **Solution:** ${p.solution}\n\n📈 **Impact:** ${p.impact}\n\n👤 **Role:** ${p.role}\n\n🔗 [View on GitHub](${p.github})`;
    },
  },

  // SecureLab
  {
    patterns: [/securelab|wifi.*secur|network security|unauthorized device|sms alert/],
    response: () => {
      const p = KB.projects[1];
      return `**${p.title}** _(${p.status})_\n\n🔧 **Tech:** ${p.tech.join(", ")}\n\n📌 **Problem:** ${p.problem}\n\n💡 **Solution:** ${p.solution}\n\n📈 **Impact:** ${p.impact}\n\n👤 **Role:** ${p.role}\n\n🔗 [GitHub](${p.github}) • [Live Demo](${p.live!})`;
    },
  },

  // DJ Platform
  {
    patterns: [/\bdj\b|djmellow|beats.*book|music platform/],
    response: () => {
      const p = KB.projects[2];
      return `**${p.title}** _(${p.status})_\n\n🔧 **Tech:** ${p.tech.join(", ")}\n\n📌 **Problem:** ${p.problem}\n\n💡 **Solution:** ${p.solution}\n\n📈 **Impact:** ${p.impact}\n\n👤 **Role:** ${p.role}\n\n🔗 [View on GitHub](${p.github})`;
    },
  },

  // Billing
  {
    patterns: [/billing|space.?reserv|stripe|invoice.*system/],
    response: () => {
      const p = KB.projects[3];
      return `**${p.title}** _(${p.status})_\n\n🔧 **Tech:** ${p.tech.join(", ")}\n\n📌 **Problem:** ${p.problem}\n\n💡 **Solution:** ${p.solution}\n\n📈 **Impact:** ${p.impact}\n\n👤 **Role:** ${p.role}\n\n🔗 [View on GitHub](${p.github})`;
    },
  },

  // All projects
  {
    patterns: [/project|what.*(built|made|created)|show.*work|portfolio work/],
    response: () => {
      const list = KB.projects.map((p) => `- **${p.title}** _(${p.status})_ — ${p.tech.slice(0, 3).join(", ")}`).join("\n");
      return `Fabian has built **${KB.projects.length} major projects**:\n\n${list}\n\nAsk me about any one of them for the full case study! 👆`;
    },
  },

  // React
  { patterns: [/\breact(\.?js)?\b/], response: () => `React is one of Fabian's **advanced** skills — used across all 4 major projects. He's strong in hooks, context API, state management, and performance optimization.` },

  // Python
  { patterns: [/\bpython\b/], response: () => `Fabian is **proficient in Python**, using it for backend development with Django and Flask, automation scripts, and data processing. It's the backbone of EduBursary.` },

  // Node / Express
  { patterns: [/node\.?js|express\.?js/], response: () => `Fabian has **advanced** Node.js and Express.js skills — used to build scalable REST APIs for the DJ Booking Platform and Dynamic Billing System.` },

  // TypeScript
  { patterns: [/typescript|\bts\b/], response: () => `TypeScript is an **advanced** skill for Fabian. He uses it across projects for type-safe development, reducing runtime errors and improving code quality.` },

  // Skills general
  {
    patterns: [/skill|tech.?stack|technology|framework|what.*(know|use)|expertise|proficien/],
    response: () =>
      `Fabian's tech stack:\n\n**Frontend:** ${KB.skills.frontend.join(", ")}\n\n**Backend:** ${KB.skills.backend.join(", ")}\n\n**Databases:** ${KB.skills.databases.join(", ")}\n\n**Tools:** ${KB.skills.tools.join(", ")}\n\n**Advanced:** ${KB.skills.advanced.join(", ")}\n\n**Proficient:** ${KB.skills.proficient.join(", ")}`,
  },

  // Experience / leadership
  {
    patterns: [/experience|work history|job|career|role|position|leadership|lead/],
    response: () => {
      const list = KB.experience.map((e) => `**${e.role}** @ ${e.org} _(${e.duration})_\n${e.highlights.map((h) => `  - ${h}`).join("\n")}`).join("\n\n");
      return `Fabian's experience:\n\n${list}`;
    },
  },

  // Mentorship
  {
    patterns: [/mentor|teach|student|innovation club|community lead/],
    response: () => {
      const e = KB.experience[0];
      return `Fabian is the **${e.role}** at Karatina University (${e.duration}).\n\n${e.highlights.map((h) => `- ${h}`).join("\n")}\n\nHe's passionate about growing Kenya's tech community.`;
    },
  },

  // Education
  {
    patterns: [/educat|university|degree|study|school|karatina|academic|course/],
    response: () => `Fabian is studying **${KB.education.degree}** at **${KB.education.university}** (${KB.education.duration}).\n\nRelevant coursework: ${KB.education.coursework.join(", ")}.`,
  },

  // Certifications
  {
    patterns: [/certif|plp|freecodecamp|coursera|credential|achievement/],
    response: () => {
      const list = KB.certifications.map((c) => `- **${c.name}** — ${c.issuer} (${c.year})`).join("\n");
      return `Fabian's certifications:\n\n${list}`;
    },
  },

  // Location
  { patterns: [/where|locat|based|country|kenya|nairobi|nyeri|remote/], response: () => `Fabian is based in **${KB.personal.location}**. He builds solutions focused on African real-world impact and is open to remote opportunities globally.` },

  // Availability
  { patterns: [/available|open to|opportunit|looking for work/], response: () => `Fabian is currently **${KB.personal.status}** 🟢\n\nReach him at **${KB.personal.email}** or connect on [LinkedIn](${KB.personal.linkedin}).` },

  // Mindset
  {
    patterns: [/think|approach|philosophy|mindset|debug|system design|problem.?solv/],
    response: () =>
      `How Fabian thinks as a developer:\n\n🧠 **Problem Solving:** ${KB.mindset.problemSolving}\n\n🏗️ **System Design:** ${KB.mindset.systemDesign}\n\n🔍 **Debugging:** ${KB.mindset.debugging}\n\n📚 **Learning:** ${KB.mindset.learning}`,
  },

  // GitHub
  { patterns: [/github|repo|open.?source/], response: () => `Fabian's GitHub: [github.com/Fabby24](${KB.personal.github})\n\nHe has 26+ public repos across Python, JavaScript, TypeScript, React and more.` },

  // LinkedIn
  { patterns: [/linkedin|professional.?network/], response: () => `Connect with Fabian on LinkedIn: [linkedin.com/in/fabian-musau](${KB.personal.linkedin})` },

  // Who is Fabian / summary
  {
    patterns: [/who is|tell me about|about fabian|introduce|summary|overview|background/],
    response: () =>
      `**${KB.personal.name}** is a ${KB.personal.summary}\n\nCurrently studying **${KB.education.degree}** at ${KB.education.university} while building production software and mentoring developers.\n\n📍 ${KB.personal.location} | ${KB.personal.status}`,
  },
];

// ─── FUZZY FALLBACK — scans KB for any relevant keyword ──────────────────────
function fuzzySearch(input: string): string | null {
  const q = input.toLowerCase();

  // Check project keywords
  for (const p of KB.projects) {
    if (p.keywords.some((k) => q.includes(k))) {
      return `**${p.title}** _(${p.status})_\n\n🔧 **Tech:** ${p.tech.join(", ")}\n\n📌 **Problem:** ${p.problem}\n\n💡 **Solution:** ${p.solution}\n\n📈 **Impact:** ${p.impact}\n\n👤 **Role:** ${p.role}\n\n🔗 [View on GitHub](${p.github})`;
    }
  }

  // Check skill keywords
  const allSkills = [...KB.skills.advanced, ...KB.skills.proficient, ...KB.skills.familiar,
    ...KB.skills.frontend, ...KB.skills.backend, ...KB.skills.databases, ...KB.skills.tools];
  const matchedSkill = allSkills.find((s) => q.includes(s.toLowerCase()));
  if (matchedSkill) {
    const level = KB.skills.advanced.includes(matchedSkill) ? "Advanced"
      : KB.skills.proficient.includes(matchedSkill) ? "Proficient" : "Familiar";
    return `Fabian knows **${matchedSkill}** at a **${level}** level. It's part of his ${
      KB.skills.frontend.includes(matchedSkill) ? "frontend" :
      KB.skills.backend.includes(matchedSkill) ? "backend" :
      KB.skills.databases.includes(matchedSkill) ? "database" : "tools"
    } stack.\n\nWant to know more about his full tech stack or a specific project where he used it?`;
  }

  // Check if question sounds like a pricing / service question
  if (/cost|price|charge|fee|rate|quote|cheap|afford|budget|ksh|usd|\$/.test(q)) {
    const ranges = KB.freelance.pricing.ranges.map((r) => `- **${r.type}:** ${r.range}`).join("\n");
    return `Fabian's pricing depends on scope and complexity. Rough estimates:\n\n${ranges}\n\n${KB.freelance.pricing.cta}`;
  }

  // Check if question sounds like a "can he build X" question
  if (/(build|create|make|develop|design).*(for me|for us|my|a|an|the)|(my|our|a).*(website|app|system|platform|software|tool)/.test(q)) {
    const list = KB.freelance.canBuild.map((i) => `- ${i}`).join("\n");
    return `Fabian is available for freelance projects! Here's what he can build:\n\n${list}\n\n📩 **${KB.personal.email}** | 📞 **${KB.personal.phone}**`;
  }

  return null;
}

// ─── MAIN RESPONSE FUNCTION ───────────────────────────────────────────────────
function getResponse(input: string): string {
  const q = input.toLowerCase().trim();

  // 1. Try exact intent matching first
  for (const intent of intents) {
    if (intent.patterns.some((p) => p.test(q))) {
      return intent.response();
    }
  }

  // 2. Try fuzzy KB search
  const fuzzy = fuzzySearch(q);
  if (fuzzy) return fuzzy;

  // 3. Smart fallback with context hints
  return `I'm not sure I have specific info on that — but here's what I can help with:\n\n- **"Can Fabian build [something] for me?"** — Yes! Ask me what he can build\n- **"How much does he charge?"** — I have rough pricing info\n- **"Tell me about EduBursary / SecureLab / DJ Platform / Billing System"**\n- **"What are his skills?"** or **"Why hire Fabian?"**\n\nOr reach Fabian directly at **${KB.personal.email}** 📩`;
}

function simulateThink(): Promise<void> {
  return new Promise((res) => setTimeout(res, 400 + Math.random() * 500));
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    setMessages((prev) => [...prev, { role: "user", content: text.trim() }]);
    setInput("");
    setLoading(true);
    await simulateThink();
    setMessages((prev) => [...prev, { role: "assistant", content: getResponse(text) }]);
    setLoading(false);
  };

  return (
    <>
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

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[70vh] rounded-2xl border border-border bg-card shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-border flex items-center gap-2" style={{ background: "var(--gradient-warm)" }}>
              <Sparkles size={18} className="text-primary-foreground" />
              <div>
                <p className="text-sm font-semibold text-primary-foreground">Ask My Portfolio</p>
                <p className="text-xs text-primary-foreground/70">Ask anything about Fabian</p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Hi! Ask me anything about Fabian's experience, skills, projects, or freelance work.</p>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.map((q) => (
                      <button key={q} onClick={() => sendMessage(q)} className="text-xs px-3 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors">
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-br-md" : "bg-muted text-foreground rounded-bl-md"}`}>
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
            <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="p-3 border-t border-border flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Fabian..."
                className="flex-1 px-3 py-2 rounded-xl bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                disabled={loading}
              />
              <button type="submit" disabled={loading || !input.trim()} className="p-2 rounded-xl text-primary-foreground disabled:opacity-40" style={{ background: "var(--gradient-warm)" }}>
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}