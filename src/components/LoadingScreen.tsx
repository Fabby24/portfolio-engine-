import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute w-64 h-64 rounded-full blur-3xl opacity-30"
        style={{ background: "var(--gradient-warm)" }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Logo */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10"
      >
        <span className="font-display text-6xl font-bold">
          <span className="gradient-text">FM</span>
          <span className="text-foreground">.</span>
        </span>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="mt-8 h-0.5 rounded-full bg-border overflow-hidden w-48 relative z-10"
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: "var(--gradient-warm)" }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-4 text-sm text-muted-foreground tracking-widest uppercase relative z-10"
      >
        Building the future
      </motion.p>
    </motion.div>
  );
}
