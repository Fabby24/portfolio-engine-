import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Download, Mail, Github, Linkedin } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import developerPhoto from "@/assets/developer-photo.jpg";

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with parallax */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30 dark:opacity-50" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      </motion.div>

      {/* Floating orbs with parallax */}
      <motion.div style={{ y: orb1Y }} className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-primary/10 blur-3xl animate-float" />
      <motion.div style={{ y: orb2Y }} className="absolute bottom-1/4 left-1/6 w-96 h-96 rounded-full bg-accent/10 blur-3xl animate-float" />

      <motion.div style={{ opacity: contentOpacity }} className="section-container relative z-10 pt-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left column - text content */}
          <div className="flex-1 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-glow" />
              <span className="text-sm font-medium text-primary-foreground/80 dark:text-primary">Available for opportunities</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display leading-tight"
            >
              <span className="text-primary-foreground dark:text-foreground">I build </span>
              <span className="gradient-text">scalable systems</span>
              <br />
              <span className="text-primary-foreground dark:text-foreground">that solve </span>
              <span className="gradient-text">real problems.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-primary-foreground/70 dark:text-muted-foreground max-w-2xl leading-relaxed"
            >
              Full-Stack Developer from Kenya specializing in React, Node.js & Python.
              I craft education tech, business systems, and automation tools that create
              real-world impact across Africa.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <a href="#projects" className="btn-primary flex items-center gap-2">
                View Projects <ArrowDown size={18} />
              </a>
              <a href="#contact" className="btn-outline border-primary-foreground/30 text-primary-foreground dark:border-primary dark:text-primary flex items-center gap-2">
                <Mail size={18} /> Contact Me
              </a>
              <a href="/Fabian_Musau_CV.pdf" download className="btn-outline border-primary-foreground/30 text-primary-foreground dark:border-primary dark:text-primary flex items-center gap-2">
                <Download size={18} /> Download CV
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex items-center gap-4"
            >
              <a href="https://github.com/fabianmusau" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-primary-foreground/10 dark:bg-muted hover:bg-primary/20 transition-all text-primary-foreground dark:text-foreground">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com/in/fabianmusau" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-primary-foreground/10 dark:bg-muted hover:bg-primary/20 transition-all text-primary-foreground dark:text-foreground">
                <Linkedin size={20} />
              </a>
              <span className="ml-4 text-sm text-primary-foreground/50 dark:text-muted-foreground">Nairobi, Kenya 🇰🇪</span>
            </motion.div>
          </div>

          {/* Right column - developer photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex-shrink-0"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full blur-3xl opacity-30" style={{ background: "var(--gradient-warm)" }} />

            {/* Gradient ring */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full p-1" style={{ background: "var(--gradient-warm)" }}>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full rounded-full overflow-hidden border-4 border-background"
              >
                <img
                  src={developerPhoto}
                  alt="Fabian Musau - Full Stack Developer"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            {/* Decorative dots */}
            <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-primary/40 animate-pulse" />
            <div className="absolute -bottom-2 -left-2 w-5 h-5 rounded-full bg-accent/50 animate-pulse" style={{ animationDelay: "1s" }} />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-primary-foreground/40 dark:text-muted-foreground">
          <ArrowDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}
