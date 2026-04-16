import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const terminalLines = [
  { text: "$ initializing portfolio...", delay: 0 },
  { text: "✓ Loading components", delay: 300 },
  { text: "✓ Fetching GitHub data", delay: 600 },
  { text: "✓ Mounting sections", delay: 900 },
  { text: "✓ Compiling assets", delay: 1200 },
  { text: "✓ Ready — welcome to Dev Fabby Portfolio.", delay: 1500 },
];

export default function LoadingScreen() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    terminalLines.forEach((line, i) => {
      setTimeout(() => setVisibleLines(i + 1), line.delay);
    });
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[hsl(220,25%,6%)]"
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
        className="relative z-10 mb-6"
      >
        <span className="font-display text-6xl font-bold">
          <span className="gradient-text">FM</span>
          <span className="text-[hsl(220,15%,92%)]">.</span>
        </span>
      </motion.div>

      {/* Terminal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="relative z-10 w-[90vw] max-w-md rounded-lg border border-[hsl(220,20%,18%)] bg-[hsl(220,25%,8%)] overflow-hidden shadow-2xl"
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[hsl(220,25%,10%)] border-b border-[hsl(220,20%,18%)]">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs text-[hsl(220,10%,55%)] font-mono">fm@portfolio:~</span>
        </div>

        {/* Terminal body */}
        <div className="p-4 font-mono text-sm space-y-1.5 min-h-[180px]">
          {terminalLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={i < visibleLines ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.2 }}
              className={`${
                i === 0
                  ? "text-[hsl(28,90%,55%)]"
                  : i === terminalLines.length - 1
                  ? "text-green-400 font-semibold"
                  : "text-[hsl(220,10%,55%)]"
              }`}
            >
              {line.text}
            </motion.div>
          ))}

          {/* Blinking cursor */}
          {visibleLines < terminalLines.length && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="inline-block w-2 h-4 bg-[hsl(28,90%,55%)]"
            />
          )}
        </div>
      </motion.div>

      {/* Progress bar */}
      <motion.div className="mt-6 h-0.5 rounded-full bg-[hsl(220,20%,18%)] overflow-hidden w-48 relative z-10">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "var(--gradient-warm)" }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}
