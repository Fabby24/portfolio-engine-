import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

const certs = [
  { title: "Full-Stack Web Development", issuer: "PLP Academy", year: "2024", desc: "Comprehensive program covering React, Node.js, databases, and deployment.", link: "https://plpacademy.powerlearnproject.org" },
  { title: "Python for Data Science", issuer: "Coursera", year: "2023", desc: "Data analysis, visualization, and machine learning fundamentals.", link: "https://coursera.org/verify/example" },
  { title: "JavaScript Algorithms & Data Structures", issuer: "freeCodeCamp", year: "2023", desc: "300+ hours of algorithmic problem-solving and data structure mastery.", link: "https://freecodecamp.org/certification/fabianmusau/javascript-algorithms-and-data-structures" },
];

export default function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="py-24 lg:py-32 bg-muted/30">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">Credentials</span>
          <h2 className="section-title mt-3">Certifications & <span className="gradient-text">Achievements</span></h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card-elevated p-6 group hover:border-primary/30 transition-all duration-300 relative overflow-hidden flex flex-col"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full" />
              <Award className="text-primary mb-4" size={32} />
              <h3 className="font-display font-bold text-foreground text-lg">{cert.title}</h3>
              <p className="text-sm text-primary font-medium mt-1">{cert.issuer} · {cert.year}</p>
              <p className="text-sm text-muted-foreground mt-3 flex-1">{cert.desc}</p>
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-accent transition-colors"
              >
                View Certificate <ExternalLink size={14} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
