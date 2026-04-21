import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ChevronDown, ChevronUp, Zap, Play } from "lucide-react";
import projectEdubursary from "@/assets/project-edubursary.jpg";
import projectBilling from "@/assets/project-billing.jpg";
import projectSms from "@/assets/project-sms.jpg";
import projectSecurelab from "@/assets/project-securelab.jpg";

type Project = {
  title: string;
  status: "Active" | "Completed" | "Maintained";
  screenshot: string;
  problem: string;
  goal: string;
  approach: string;
  techStack: string[];
  challenges: string;
  solution: string;
  impact: string;
  github?: string;
  live?: string;
  teamSize?: number;
  role?: string;
};

const projects: Project[] = [
  {
    title: "EduBursary System",
    status: "Active",
    screenshot: projectEdubursary,
    problem: "Students in Kenya struggle to access and apply for bursary funding due to fragmented, paper-based processes.",
    goal: "Create a digital platform that streamlines bursary applications, reviews, and fund disbursement.",
    approach: "Built a full-stack web app with role-based access for students, reviewers, and administrators.",
    techStack: ["Python", "Python Templates", "MYSQL", "Tailwind CSS"],
    challenges: "Handling concurrent applications, document uploads, and ensuring data integrity across multiple reviewers.",
    solution: "Implemented queue-based processing, optimistic UI updates, and transactional database operations.",
    impact: "Reduced application processing time by 70%, serving 500+ students in the pilot phase.",
    github: "https://github.com/Fabby24/Edu-Bursary",
    live: "https://github.com/Fabby24/Edu-Bursary",
  },
  {
    title: "Dynamic Billing & Space Reservation",
    status: "Completed",
    screenshot: projectBilling,
    problem: "Businesses managing shared spaces lacked a unified system for billing and reservations.",
    goal: "Build a dynamic billing engine with real-time space availability and booking management.",
    approach: "Designed a modular architecture with a pricing engine, calendar system, and payment integration.",
    techStack: ["React", "Python", "Flask", "MongoDB", "Stripe API"],
    challenges: "Complex pricing rules, timezone handling, and race conditions in concurrent bookings.",
    solution: "Implemented a rule-based pricing engine with optimistic locking for reservation conflicts.",
    impact: "Automated billing for 3 business locations, eliminating manual invoicing errors.",
    github: "https://github.com/Fabby24/Dynamic-and-billing-system",
    live: "https://github.com/Fabby24/Dynamic-and-billing-system",
  },
  {
    title: "DJ Booking & Portfolio Platform",
    status: "Maintained",
    screenshot: projectSms,
    problem: "Creative professionals needed a modern platform to showcase their work and manage client bookings efficiently without relying on multiple tools..",
    goal: "Build a full-stack platform that allows a professional DJ to Showcase their brand and portfolio",
    approach: "Built backend logic in Python to handle booking requests and client communication.",
    techStack: ["React", "Node.js", "Express.js", "MongoDB", "Africa's Talking API", "python"],
    challenges: "Handling real-time booking requests efficiently, Ensuring smooth audio performance without affecting page speed",
    solution: "Batch processing with retry logic, webhook-based delivery receipts, and paginated contact imports.",
    impact: "Provided a centralized digital presence for the DJ’s brand and services.",
    github: "https://github.com/Fabby24/djmellow-Platform",
    live: "https://github.com/Fabby24/djmellow-Platform",
  },
  {
    title: "SecureLab WiFi Access Control",
    status: "Completed",
    screenshot: projectSecurelab,
    teamSize: 4,
    role: "Full-Stack Developer (API Integration, SMS Alerts, Database)",
    problem: "Unauthorized devices connecting to shared WiFi networks created security vulnerabilities, bandwidth misuse, and lack of visibility for administrators.",
    goal: "Build a system that detects new devices, identifies unauthorized connections, sends instant SMS alerts, and provides a monitoring dashboard.",
    approach: "Designed a real-time monitoring system integrating network detection logic with a web dashboard and SMS notification system.",
    techStack: ["React", "Tailwind CSS", "Supabase", "SMS API"],
    challenges: "Handling real-time device detection reliably, avoiding duplicate alerts, integrating SMS efficiently, and synchronizing frontend with backend events.",
    solution: "Implemented structured device tracking with Supabase, event-based triggers for new connections, optimized alert logic, and a clean monitoring dashboard.",
    impact: "Enabled real-time network visibility, improved security awareness, and reduced response time to unauthorized access.",
    github: "https://github.com/Fabby24/karatina-wifi-secure",
    live: "https://karatina-wifi-secure.vercel.app/",
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
      {/* Screenshot */}
      <div className="relative overflow-hidden h-48">
        <img
          src={project.screenshot}
          alt={`${project.title} screenshot`}
          loading="lazy"
          width={1280}
          height={720}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent" />
        <div className="absolute top-3 right-3 flex gap-2">
          {project.teamSize && (
            <span className="text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm bg-purple-500/10 text-purple-600 dark:text-purple-400">
              👥 Team of {project.teamSize}
            </span>
          )}
          <span className={`text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm ${statusColors[project.status]}`}>
            <Zap size={10} className="inline mr-1" />
            {project.status}
          </span>
        </div>
      </div>

      {/* Header */}
      <div className="p-6 pb-4">
        <h3 className="font-display text-xl font-bold text-foreground">{project.title}</h3>
        {project.role && (
          <p className="text-xs font-medium text-accent mt-1">{project.role}</p>
        )}
        <p className="text-sm text-muted-foreground mt-2">{project.problem}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.techStack.map((tech) => (
            <span key={tech} className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
              {tech}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-3 mt-5">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2 text-sm !px-4 !py-2"
            >
              <Play size={14} /> Live Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline flex items-center gap-2 text-sm !px-4 !py-2"
            >
              <Github size={14} /> View Code
            </a>
          )}
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
      <div className="px-6 py-4 border-t border-border/50 flex items-center justify-center">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm font-medium text-primary hover:text-accent transition-colors flex items-center gap-1"
        >
          {expanded ? "Hide" : "View"} Case Study
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
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
