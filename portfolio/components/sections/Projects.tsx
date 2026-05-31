"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

interface Project {
  id: string;
  featured: boolean;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  category: string;
  tags: string[];
  features: string[];
  github: string;
  demo: string;
  color: string;
  status: string;
}

const CATEGORIES = [
  "All",
  "Web Development Projects",
  "AI/ML Projects",
];

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string; dot: string }> = {
    Production: { bg: "rgba(16,185,129,0.1)", text: "#10b981", dot: "#10b981" },
    "In Progress": { bg: "rgba(245,158,11,0.1)", text: "#f59e0b", dot: "#f59e0b" },
    Complete: { bg: "rgba(0,212,255,0.1)", text: "#00d4ff", dot: "#00d4ff" },
  };
  const c = colors[status] || colors.Complete;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-xs"
      style={{ background: c.bg, color: c.text }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: c.dot, boxShadow: `0 0 4px ${c.dot}` }}
      />
      {status}
    </span>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-3xl overflow-hidden mb-8"
      style={{ border: "1px solid rgba(0,212,255,0.15)" }}
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 70% 50%, ${project.color}12 0%, transparent 60%), var(--gray-900)`,
        }}
      />

      {/* Scan line decoration */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
      />

      <div className="relative z-10 grid lg:grid-cols-2 gap-0">
        {/* Left: info */}
        <div className="p-10 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-5">
            <span
              className="font-mono text-xs px-2.5 py-1 rounded-full"
              style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}30` }}
            >
              FEATURED PROJECT
            </span>
            <StatusBadge status={project.status} />
          </div>

          <h3
            className="font-display font-extrabold mb-2"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.02em", color: "var(--white)" }}
          >
            {project.title}
          </h3>
          <p className="font-mono text-sm mb-5" style={{ color: project.color }}>
            {project.subtitle}
          </p>
          <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--gray-400)" }}>
            {project.longDescription}
          </p>

          {/* Features */}
          <div className="space-y-2 mb-8">
            {project.features.map((f) => (
              <div key={f} className="flex items-center gap-2.5">
                <div className="w-1 h-1 rounded-full" style={{ background: project.color }} />
                <span className="font-mono text-xs" style={{ color: "var(--gray-300)" }}>
                  {f}
                </span>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs px-2.5 py-1 rounded-md"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--gray-400)" }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-sm transition-all"
              style={{ background: project.color, color: "var(--black)", fontWeight: 700 }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              GitHub ↗
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-sm transition-all"
                style={{ border: `1px solid ${project.color}40`, color: project.color }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = project.color; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${project.color}40`; }}
              >
                Live Demo →
              </a>
            )}
          </div>
        </div>

        {/* Right: visual */}
        <div className="relative p-8 flex items-center justify-center min-h-[400px]">
          {/* Holographic screen mockup */}
          <div className="w-full max-w-sm relative">
            <div
              className="rounded-2xl overflow-hidden p-4"
              style={{
                background: "rgba(0,0,0,0.6)",
                border: `1px solid ${project.color}30`,
                boxShadow: `0 0 60px ${project.color}15`,
              }}
            >
              {/* Fake terminal */}
              <div className="flex gap-1.5 mb-4">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ef4444" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#f59e0b" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#10b981" }} />
              </div>
              <div className="space-y-2 font-mono text-xs" style={{ color: "var(--gray-400)" }}>
                <div>
                  <span style={{ color: project.color }}>$ </span>
                  <span>semantic-search --query "ML optimization"</span>
                </div>
                <div style={{ color: "var(--gray-600)" }}>→ Indexing 2,840 documents...</div>
                <div style={{ color: "var(--emerald)" }}>✓ Found 12 relevant results (94ms)</div>
                <div>
                  <span style={{ color: project.color }}>$ </span>
                  <span>ai-chat --context course-materials</span>
                </div>
                <div style={{ color: "var(--gray-600)" }}>→ RAG pipeline initialized</div>
                <div style={{ color: project.color }}>◉ Ready · 1,200 active users</div>
              </div>
            </div>

            {/* Floating metrics */}
            {[
              { label: "Semantic Search", value: "94ms avg", color: "#10b981", pos: "-top-4 -right-4" },
              { label: "Accuracy", value: "96.2%", color: project.color, pos: "-bottom-4 -left-4" },
            ].map((m) => (
              <motion.div
                key={m.label}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: Math.random() }}
                className={`absolute ${m.pos} px-3 py-1.5 rounded-xl font-mono text-xs`}
                style={{
                  background: "rgba(5,5,5,0.9)",
                  border: `1px solid ${m.color}30`,
                  color: m.color,
                }}
              >
                <div style={{ color: "var(--gray-500)", fontSize: "0.6rem", marginBottom: 1 }}>{m.label}</div>
                {m.value}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      className="holo-card rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        borderColor: hovered ? `${project.color}30` : "rgba(255,255,255,0.06)",
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? `0 20px 60px ${project.color}10` : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Color bar */}
      <div className="h-px" style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }} />

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-mono text-xs font-bold"
            style={{
              background: `${project.color}12`,
              border: `1px solid ${project.color}25`,
              color: project.color,
            }}
          >
            {project.title.slice(0, 2).toUpperCase()}
          </div>
          <StatusBadge status={project.status} />
        </div>

        <h3 className="font-display font-bold mb-1" style={{ color: "var(--white)", fontSize: "1.1rem" }}>
          {project.title}
        </h3>
        <p className="font-mono text-xs mb-3" style={{ color: project.color }}>
          {project.subtitle}
        </p>
        <p className="text-xs leading-relaxed mb-5" style={{ color: "var(--gray-400)" }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-2 py-0.5 rounded"
              style={{ background: "rgba(255,255,255,0.04)", color: "var(--gray-500)" }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener"
            className="font-mono text-xs transition-colors"
            style={{ color: "var(--gray-400)" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = project.color; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--gray-400)"; }}
          >
            GitHub ↗
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener"
              className="font-mono text-xs transition-colors"
              style={{ color: "var(--gray-400)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = project.color; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--gray-400)"; }}
            >
              Demo ↗
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const featured = projects.find((p) => p.featured);
  const others = projects.filter((p) => !p.featured);
  const filtered = activeCategory === "All"
    ? others
    : others.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" ref={ref} className="py-32 relative">
      {/* BG accent */}
      <div
        className="absolute -right-64 top-1/3 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)" }}
      />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="font-mono text-xs mb-3" style={{ color: "var(--cyan)", letterSpacing: "0.2em" }}>
            03 / PROJECTS
          </p>
          <h2
            className="font-display font-extrabold mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.02em", color: "var(--white)" }}
          >
            Things I&apos;ve Built
          </h2>
          <p className="text-sm max-w-xl" style={{ color: "var(--gray-400)" }}>
            From distributed consensus algorithms to AI-powered learning platforms — systems built to last.
          </p>
        </motion.div>

        {/* Featured */}
        {featured && <FeaturedProject project={featured} />}

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-3 py-1 rounded-full font-mono text-xs transition-all duration-200"
              style={{
                background: activeCategory === cat ? "rgba(0,212,255,0.12)" : "transparent",
                border: `1px solid ${activeCategory === cat ? "var(--cyan)" : "rgba(255,255,255,0.1)"}`,
                color: activeCategory === cat ? "var(--cyan)" : "var(--gray-400)",
              }}
            >
              {cat === "All" ? "All" : cat.replace(" Projects", "")}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 xl:grid-cols-3 gap-5"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
