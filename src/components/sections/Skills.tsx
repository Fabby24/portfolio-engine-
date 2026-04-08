import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

type Skill = { name: string; level: number; category: string };

const skills: Skill[] = [
  { name: "React", level: 92, category: "Frontend" },
  { name: "TypeScript", level: 88, category: "Frontend" },
  { name: "Tailwind CSS", level: 95, category: "Frontend" },
  { name: "Next.js", level: 80, category: "Frontend" },
  { name: "Node.js", level: 90, category: "Backend" },
  { name: "Python", level: 85, category: "Backend" },
  { name: "Express.js", level: 88, category: "Backend" },
  { name: "PostgreSQL", level: 82, category: "Backend" },
  { name: "MongoDB", level: 78, category: "Backend" },
  { name: "Git & GitHub", level: 90, category: "Tools" },
  { name: "Docker", level: 72, category: "Tools" },
  { name: "REST APIs", level: 92, category: "Tools" },
  { name: "Linux", level: 75, category: "Tools" },
  { name: "Firebase", level: 78, category: "Tools" },
];

const categories = ["All", "Frontend", "Backend", "Tools"];

export default function Skills() {
  const [active, setActive] = useState("All");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const filtered = active === "All" ? skills : skills.filter((s) => s.category === active);

  return (
    <section id="skills" className="py-24 lg:py-32 bg-muted/30">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">Skills & Expertise</span>
          <h2 className="section-title mt-3">Technologies I <span className="gradient-text">work with</span></h2>
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
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                active === cat
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-card text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skill cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((skill, i) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="card-elevated p-5 group hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display font-semibold text-foreground">{skill.name}</h3>
                <span className="text-sm font-bold text-primary">{skill.level}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.05, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ background: "var(--gradient-warm)" }}
                />
              </div>
              <span className="text-xs text-muted-foreground mt-2 block">{skill.category}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
