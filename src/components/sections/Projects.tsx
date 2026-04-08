import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ChevronDown, ChevronUp, Zap } from "lucide-react";

type Project = {
  title: string;
  status: "Active" | "Completed" | "Maintained";
  problem: string;
  goal: string;
  approach: string;
  techStack: string[];
  challenges: string;
  solution: string;
  impact: string;
  github?: string;
  live?: string;
};

const projects: Project[] = [
  {
    title: "EduBursary System",
    status: "Active",
    problem: "Students in Kenya struggle to access and apply for bursary funding due to fragmented, paper-based processes.",
    goal: "Create a digital platform that streamlines bursary applications, reviews, and fund disbursement.",
    approach: "Built a full-stack web app with role-based access for students, reviewers, and administrators.",
    techStack: ["React", "Node.js", "PostgreSQL", "Tailwind CSS", "Express.js"],
    challenges: "Handling concurrent applications, document uploads, and ensuring data integrity across multiple reviewers.",
    solution: "Implemented queue-based processing, optimistic UI updates, and transactional database operations.",
    impact: "Reduced application processing time by 70%, serving 500+ students in the pilot phase.",
  },
  {
    title: "Dynamic Billing & Space Reservation",
    status: "Completed",
    problem: "Businesses managing shared spaces lacked a unified system for billing and reservations.",
    goal: "Build a dynamic billing engine with real-time space availability and booking management.",
    approach: "Designed a modular architecture with a pricing engine, calendar system, and payment integration.",
    techStack: ["React", "Python", "Flask", "MongoDB", "Stripe API"],
    challenges: "Complex pricing rules, timezone handling, and race conditions in concurrent bookings.",
    solution: "Implemented a rule-based pricing engine with optimistic locking for reservation conflicts.",
    impact: "Automated billing for 3 business locations, eliminating manual invoicing errors.",
  },
  {
    title: "Bulk SMS Web App",
    status: "Maintained",
    problem: "Organizations needed to send mass SMS notifications but lacked an affordable, user-friendly tool.",
    goal: "Create a web-based platform for composing, scheduling, and tracking bulk SMS campaigns.",
    approach: "Integrated with Africa's Talking SMS API, built a contact management system and analytics dashboard.",
    techStack: ["React", "Node.js", "Express.js", "MongoDB", "Africa's Talking API"],
    challenges: "Rate limiting, delivery tracking, and handling large contact lists efficiently.",
    solution: "Batch processing with retry logic, webhook-based delivery receipts, and paginated contact imports.",
    impact: "Enabled 10,000+ messages/month for local organizations with 98% delivery rate.",
  },
];

const statusColors: Record<string, string> = {
  Active: "bg-green-500/10 text-green-600 dark:text-green-400",
  Completed: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Maintained: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="card-elevated overflow-hidden group"
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-display text-xl font-bold text-foreground">{project.title}</h3>
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColors[project.status]}`}>
                <Zap size={10} className="inline mr-1" />
                {project.status}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{project.problem}</p>
          </div>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.techStack.map((tech) => (
            <span key={tech} className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Expandable case study */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-2 space-y-4">
              {[
                { label: "Goal", value: project.goal },
                { label: "Approach", value: project.approach },
                { label: "Challenges", value: project.challenges },
                { label: "Solution", value: project.solution },
                { label: "Impact", value: project.impact },
              ].map((item) => (
                <div key={item.label}>
                  <h4 className="text-sm font-semibold text-primary uppercase tracking-wide">{item.label}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-border/50 flex items-center justify-between">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm font-medium text-primary hover:text-accent transition-colors flex items-center gap-1"
        >
          {expanded ? "Hide" : "View"} Case Study
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        <div className="flex items-center gap-3">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github size={18} />
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 lg:py-32 bg-background">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">Featured Work</span>
          <h2 className="section-title mt-3">Projects as <span className="gradient-text">Case Studies</span></h2>
          <p className="section-subtitle mx-auto mt-4">
            Each project tells a story — from problem to impact. Click to explore the full case study.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
