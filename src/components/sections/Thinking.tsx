import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Brain, Bug, Layers, BookOpen } from "lucide-react";

const tabs = [
  {
    id: "problem-solving",
    icon: Brain,
    title: "Problem Solving",
    content:
      "I start every project by deeply understanding the problem space. Before writing code, I map out user journeys, identify edge cases, and define success metrics. I believe the best solutions come from asking better questions — not jumping to implementation.",
  },
  {
    id: "system-design",
    icon: Layers,
    title: "System Design",
    content:
      "I think in systems, not features. Every component I build considers scalability, maintainability, and how it fits into the bigger picture. I design APIs contract-first, choose databases based on access patterns, and always plan for what happens when things fail.",
  },
  {
    id: "debugging",
    icon: Bug,
    title: "Debugging Philosophy",
    content:
      "Debugging is detective work. I follow the evidence — reproducing issues methodically, forming hypotheses, and narrowing scope. I've learned that the hardest bugs often come from assumptions, so I question everything and validate with data.",
  },
  {
    id: "lessons",
    icon: BookOpen,
    title: "Lessons from Failure",
    content:
      "My best growth came from failed projects. A billing system that couldn't handle edge cases taught me to design for the unexpected. A rushed deployment that broke production taught me the value of CI/CD and testing. I share these stories because vulnerability builds trust.",
  },
];

export default function Thinking() {
  const [activeTab, setActiveTab] = useState("problem-solving");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const active = tabs.find((t) => t.id === activeTab)!;

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">Mindset</span>
          <h2 className="section-title mt-3">How I <span className="gradient-text">Think</span> as a Developer</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Tab buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-card text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                <tab.icon size={16} />
                {tab.title}
              </button>
            ))}
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="card-elevated p-8 lg:p-10"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <active.icon className="text-primary" size={24} />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">{active.title}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">{active.content}</p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
