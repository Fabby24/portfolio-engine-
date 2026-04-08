import { motion } from "framer-motion";
import { ArrowDown, Download, Mail, Github, Linkedin } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30 dark:opacity-50" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-primary/10 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 left-1/6 w-96 h-96 rounded-full bg-accent/10 blur-3xl animate-float" style={{ animationDelay: "3s" }} />

      <div className="section-container relative z-10 pt-20">
        <div className="max-w-3xl">
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
            className="text-4xl sm:text-5xl lg:text-7xl font-bold font-display leading-tight"
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
      </div>

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
