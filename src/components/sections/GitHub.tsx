import { useState, useEffect, useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Star, GitFork, ExternalLink, Code2 } from "lucide-react";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

const langColors: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  Shell: "#89e051",
};

function ContributionGraph() {
  const weeks = 52;
  const days = 7;
  // Generate deterministic mock data
  const data = useMemo(() => {
    const cells: number[] = [];
    for (let w = 0; w < weeks; w++) {
      for (let d = 0; d < days; d++) {
        const seed = (w * 7 + d) * 2654435761;
        const v = ((seed >>> 0) % 100);
        cells.push(v < 40 ? 0 : v < 60 ? 1 : v < 80 ? 2 : v < 93 ? 3 : 4);
      }
    }
    return cells;
  }, []);

  const intensityClasses = [
    "bg-muted",
    "bg-primary/20",
    "bg-primary/40",
    "bg-primary/60",
    "bg-primary/90",
  ];

  return (
    <div className="overflow-x-auto pb-2">
      <div className="inline-grid gap-[3px]" style={{ gridTemplateRows: `repeat(7, 1fr)`, gridAutoFlow: "column", gridAutoColumns: "12px" }}>
        {data.map((level, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-[2px] ${intensityClasses[level]} transition-colors`}
            title={`${level} contributions`}
          />
        ))}
      </div>
      <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
        <span>Less</span>
        {intensityClasses.map((cls, i) => (
          <div key={i} className={`w-3 h-3 rounded-[2px] ${cls}`} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}

function AnimatedCounter({ value, inView }: { value: number; inView: boolean }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.max(1, Math.ceil(value / 30));
    const id = setInterval(() => {
      start += step;
      if (start >= value) { setDisplay(value); clearInterval(id); }
      else setDisplay(start);
    }, 30);
    return () => clearInterval(id);
  }, [value, inView]);
  return <>{display}</>;
}

export default function GitHubSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/Fabby24/repos?sort=updated&per_page=6")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setRepos(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
  const topLangs = [...new Set(repos.map((r) => r.language).filter(Boolean))].slice(0, 5);

  return (
    <section id="github" className="py-24 lg:py-32">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">Open Source</span>
          <h2 className="section-title mt-3">
            GitHub <span className="gradient-text">Activity</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            My contribution history and latest open-source work.
          </p>
        </motion.div>

        {/* Contribution Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card-elevated p-6 mb-8"
        >
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Github size={16} className="text-primary" /> Contribution Graph
          </h3>
          <ContributionGraph />
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Public Repos", value: repos.length || 26, icon: Code2 },
            { label: "Total Stars", value: totalStars, icon: Star },
            { label: "Languages", value: topLangs.length || 4, icon: Code2 },
            { label: "Total Forks", value: repos.reduce((s, r) => s + r.forks_count, 0), icon: GitFork },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              className="card-elevated p-5 text-center"
            >
              <stat.icon className="mx-auto text-primary mb-2" size={20} />
              <p className="text-2xl font-bold text-foreground font-display">
                <AnimatedCounter value={stat.value} inView={inView} />
              </p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Repos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(loading ? Array.from({ length: 6 }) : repos).map((repo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
            >
              {loading || !repo ? (
                <div className="card-elevated p-5 animate-pulse">
                  <div className="h-4 bg-muted rounded w-3/4 mb-3" />
                  <div className="h-3 bg-muted rounded w-full mb-2" />
                  <div className="h-3 bg-muted rounded w-2/3" />
                </div>
              ) : (
                <a
                  href={(repo as Repo).html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-elevated p-5 block group hover:border-primary/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors truncate flex-1">
                      {(repo as Repo).name}
                    </h4>
                    <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0 ml-2" />
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                    {(repo as Repo).description || "No description"}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    {(repo as Repo).language && (
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: langColors[(repo as Repo).language!] || "#888" }}
                        />
                        {(repo as Repo).language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star size={12} /> {(repo as Repo).stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={12} /> {(repo as Repo).forks_count}
                    </span>
                  </div>
                </a>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <a
            href="https://github.com/Fabby24"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2 text-sm !px-5 !py-2.5"
          >
            <Github size={16} /> View Full Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
}
