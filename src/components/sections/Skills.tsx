import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Code2, Server, GitBranch, Database, Globe, Terminal,
  Flame, Container, FileCode, Wifi, Braces, Layers,
  MonitorSmartphone, ArrowRight, ChevronDown
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Proficiency = "Advanced" | "Proficient" | "Familiar";
type Category = "Frontend" | "Backend" | "Tools";

type Skill = {
  name: string;
  icon: LucideIcon;
  category: Category;
  proficiency: Proficiency;
  description: string;
  usedIn: string[];
  strengths: string[];
};

const skills: Skill[] = [
  {
    name: "React", icon: Code2, category: "Frontend", proficiency: "Advanced",
    description: "Built dynamic, scalable frontend applications with reusable component architectures and complex state management.",
    usedIn: ["EduBursary System", "Bulk SMS Platform", "Billing & Reservation", "SecureLab WiFi"],
    strengths: ["State Management", "Hooks & Context", "Performance Optimization"],
  },
  {
    name: "TypeScript", icon: FileCode, category: "Frontend", proficiency: "Advanced",
    description: "Used across all projects for type-safe development, reducing runtime errors and improving DX.",
    usedIn: ["EduBursary System", "Bulk SMS Platform", "SecureLab WiFi"],
    strengths: ["Type Safety", "Generics", "Interface Design"],
  },
  {
    name: "Tailwind CSS", icon: Layers, category: "Frontend", proficiency: "Advanced",
    description: "Crafted responsive, utility-first interfaces with custom design systems and dark mode support.",
    usedIn: ["EduBursary System", "Bulk SMS Platform", "Billing & Reservation", "SecureLab WiFi"],
    strengths: ["Responsive Design", "Design Systems", "Dark Mode"],
  },
  {
    name: "Node.js", icon: Server, category: "Backend", proficiency: "Advanced",
    description: "Built scalable REST APIs and real-time backend services powering multiple production applications.",
    usedIn: ["EduBursary System", "Bulk SMS Platform", "Billing & Reservation"],
    strengths: ["REST APIs", "Real-time Systems", "Middleware"],
  },
  {
    name: "Python", icon: Terminal, category: "Backend", proficiency: "Proficient",
    description: "Developed automation scripts, data processing pipelines, and backend utilities.",
    usedIn: ["EduBursary System"],
    strengths: ["Automation", "Data Processing", "Scripting"],
  },
  {
    name: "Express.js", icon: Braces, category: "Backend", proficiency: "Advanced",
    description: "Architected RESTful API layers with authentication, validation, and error handling middleware.",
    usedIn: ["Bulk SMS Platform", "Billing & Reservation"],
    strengths: ["Routing", "Middleware", "Error Handling"],
  },
  
  {
    name: "MongoDB", icon: Database, category: "Backend", proficiency: "Familiar",
    description: "Used for flexible document storage in projects requiring dynamic data models.",
    usedIn: ["Billing & Reservation"],
    strengths: ["Document Storage", "Aggregation", "Flexible Schemas"],
  },
  {
    name: "Git & GitHub", icon: GitBranch, category: "Tools", proficiency: "Advanced",
    description: "Managed version control workflows, code reviews, and CI/CD pipelines for team collaboration.",
    usedIn: ["EduBursary System", "Bulk SMS Platform", "SecureLab WiFi"],
    strengths: ["Branching Strategies", "Code Reviews", "CI/CD"],
  },
  {
    name: "REST APIs", icon: Globe, category: "Tools", proficiency: "Advanced",
    description: "Designed and consumed RESTful APIs with proper authentication, rate limiting, and documentation.",
    usedIn: ["EduBursary System", "Bulk SMS Platform", "Billing & Reservation", "SecureLab WiFi"],
    strengths: ["API Design", "Authentication", "Documentation"],
  },
  {
    name: "Linux", icon: Terminal, category: "Tools", proficiency: "Proficient",
    description: "Comfortable with server administration, shell scripting, and deployment on Linux environments.",
    usedIn: ["Bulk SMS Platform", "SecureLab WiFi"],
    strengths: ["Shell Scripting", "Server Admin", "Deployment"],
  },
  
];

const categories = ["All", "Frontend", "Backend", "Tools"] as const;

const proficiencyStyles: Record<Proficiency, string> = {
  Advanced: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Proficient: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Familiar: "bg-amber-500/15 text-amber-400 border-amber-500/30",
};

/* ─── Skill Card ─── */
function SkillCard({ skill, index, inView }: { skill: Skill; index: number; inView: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = skill.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      onClick={() => setExpanded((p) => !p)}
      className="card-elevated p-5 cursor-pointer group transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_24px_-6px_hsl(var(--primary)/0.25)]"
    >
      <motion.div layout="position" className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary/10 text-primary shrink-0">
          <Icon size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-foreground text-sm">{skill.name}</h3>
        </div>
        <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border shrink-0 ${proficiencyStyles[skill.proficiency]}`}>
          {skill.proficiency}
        </span>
        <ChevronDown
          size={14}
          className={`text-muted-foreground transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
        />
      </motion.div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-3 border-t border-border/50 mt-4">
              <p className="text-sm text-muted-foreground leading-relaxed">{skill.description}</p>

              <div>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Used In</span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {skill.usedIn.map((project) => (
                    <a
                      key={project}
                      href="#projects"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium"
                    >
                      {project}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Strengths</span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {skill.strengths.map((s) => (
                    <span key={s} className="text-[11px] px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Tech Stack Flow ─── */
const flowNodes = [
  { name: "React", icon: Code2, role: "Frontend UI", projects: "All 4 Projects" },
  { name: "Node/Express", icon: Server, role: "API Layer", projects: "Dynamic Billing" },
  { name: "Supabase", icon: Database, role: "Database & Auth", projects: "Billing system, SecureLab" },
  { name: "SMS API", icon: Wifi, role: "Notifications", projects: "Dj Booking platform, SecureLab" },
];

function TechStackFlow({ inView }: { inView: boolean }) {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-20"
    >
      <div className="text-center mb-10">
        <span className="text-sm font-semibold uppercase tracking-widest text-primary">Architecture</span>
        <h3 className="font-display text-2xl sm:text-3xl font-bold mt-2 text-foreground">
          My Tech Stack <span className="gradient-text">in Action</span>
        </h3>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0">
        {flowNodes.map((node, i) => {
          const Icon = node.icon;
          const isHovered = hoveredNode === i;
          return (
            <div key={node.name} className="flex items-center flex-col sm:flex-row">
              <motion.div
                onHoverStart={() => setHoveredNode(i)}
                onHoverEnd={() => setHoveredNode(null)}
                whileHover={{ scale: 1.05 }}
                className={`relative card-elevated p-5 w-40 text-center transition-all duration-300 ${
                  isHovered ? "border-primary/50 shadow-[0_0_30px_-8px_hsl(var(--primary)/0.35)]" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-xl mx-auto flex items-center justify-center bg-primary/10 text-primary mb-2">
                  <Icon size={20} />
                </div>
                <p className="font-display font-semibold text-sm text-foreground">{node.name}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{node.role}</p>

                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] px-2.5 py-1 rounded-full bg-primary text-primary-foreground font-medium"
                    >
                      {node.projects}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {i < flowNodes.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.15 }}
                  className="text-primary/50 mx-2 my-2 sm:my-0 rotate-90 sm:rotate-0"
                >
                  <ArrowRight size={20} />
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ─── Main Section ─── */
export default function Skills() {
  const [active, setActive] = useState<string>("All");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const filtered = active === "All" ? skills : skills.filter((s) => s.category === active);

  return (
    <section id="skills" className="py-24 lg:py-32 bg-muted/30">
      <div className="section-container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">Skills & Expertise</span>
          <h2 className="section-title mt-3">Technologies I <span className="gradient-text">work with</span></h2>
          <p className="section-subtitle mx-auto mt-4">Not just tools I know — here's what I've built with them.</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                active === cat
                  ? "text-primary-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {active === cat && (
                <motion.span
                  layoutId="activeFilter"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "var(--gradient-warm)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} inView={inView} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Tech Stack Flow */}
        <TechStackFlow inView={inView} />
      </div>
    </section>
  );
}
