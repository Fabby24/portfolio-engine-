import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Users, Lightbulb, Target } from "lucide-react";

const highlights = [
  { icon: Code2, label: "3+ Years Experience", desc: "Building production systems" },
  { icon: Users, label: "Developer Mentor", desc: "Leading & teaching dev teams" },
  { icon: Lightbulb, label: "Problem Solver", desc: "Real-world African tech challenges" },
  { icon: Target, label: "Impact Driven", desc: "Software that serves communities" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 lg:py-32 bg-background">
      <div className="section-container" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">About Me</span>
            <h2 className="section-title mt-3">
              Crafting <span className="gradient-text">digital solutions</span> from Nairobi to the world.
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm Fabian Musau, a full-stack developer based in Kenya with a deep passion for
                building technology that matters. My journey started with curiosity about how
                software can transform education and business processes across Africa.
              </p>
              <p>
                Today, I specialize in creating scalable web applications using React, Node.js, and
                Python. From education bursary platforms to dynamic billing systems, I focus on
                solutions that have tangible impact on real users.
              </p>
              <p>
                Beyond code, I lead development teams and mentor aspiring developers. I believe in
                sharing knowledge and building a stronger tech ecosystem in Kenya and across the continent.
              </p>
            </div>
          </motion.div>

          {/* Right - Highlight cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="card-elevated p-6 group hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="text-primary" size={24} />
                </div>
                <h3 className="font-display font-semibold text-foreground">{item.label}</h3>
                <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
