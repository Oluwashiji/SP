"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";

const SkillsCanvas = dynamic(() => import("../3d/SkillsCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="font-mono text-xs" style={{ color: "var(--cyan)" }}>
        Loading constellation...
      </div>
    </div>
  ),
});

interface Skill {
  name: string;
  category: string;
  level: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  Languages: "#00d4ff",
  Frontend: "#a855f7",
  Backend: "#10b981",
  Database: "#f59e0b",
  Cloud: "#3388ff",
  DevOps: "#06b6d4",
  Systems: "#ec4899",
  AI: "#7c3aed",
  Security: "#ef4444",
};

function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const color = CATEGORY_COLORS[skill.category] || "#00d4ff";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.04, duration: 0.5 }}
      className="group"
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-mono text-xs" style={{ color: "var(--gray-300)" }}>
          {skill.name}
        </span>
        <span className="font-mono text-xs" style={{ color: color }}>
          {skill.level}%
        </span>
      </div>
      <div
        className="h-px w-full rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ delay: index * 0.04 + 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills({ skills }: { skills: Skill[] }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(skills.map((s) => s.category)));
  const filtered = activeCategory ? skills.filter((s) => s.category === activeCategory) : skills;

  return (
    <section
      id="skills"
      ref={ref}
      className="py-32 relative overflow-hidden"
      style={{ background: "var(--gray-950)" }}
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />

      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="font-mono text-xs mb-3" style={{ color: "var(--cyan)", letterSpacing: "0.2em" }}>
            02 / SKILLS
          </p>
          <h2
            className="font-display font-extrabold mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.02em", color: "var(--white)" }}
          >
            The Stack I Build With
          </h2>
          <p className="text-sm max-w-xl" style={{ color: "var(--gray-400)" }}>
            18+ technologies across the full engineering spectrum — from neural networks to network protocols.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          <button
            onClick={() => setActiveCategory(null)}
            className="px-3 py-1 rounded-full font-mono text-xs transition-all duration-200"
            style={{
              background: !activeCategory ? "rgba(0,212,255,0.12)" : "transparent",
              border: `1px solid ${!activeCategory ? "var(--cyan)" : "rgba(255,255,255,0.1)"}`,
              color: !activeCategory ? "var(--cyan)" : "var(--gray-400)",
            }}
          >
            All
          </button>
          {categories.map((cat) => {
            const color = CATEGORY_COLORS[cat] || "#00d4ff";
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(active ? null : cat)}
                className="px-3 py-1 rounded-full font-mono text-xs transition-all duration-200"
                style={{
                  background: active ? `${color}18` : "transparent",
                  border: `1px solid ${active ? color : "rgba(255,255,255,0.1)"}`,
                  color: active ? color : "var(--gray-400)",
                }}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: skill bars */}
          <div className="space-y-4">
            {filtered.map((skill, i) => (
              <SkillBar key={skill.name} skill={skill} index={i} />
            ))}
          </div>

          {/* Right: 3D constellation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative h-[500px] rounded-3xl overflow-hidden"
            style={{ border: "1px solid rgba(0,212,255,0.08)" }}
          >
            {/* Corner decorations */}
            {[
              "top-3 left-3",
              "top-3 right-3",
              "bottom-3 left-3",
              "bottom-3 right-3",
            ].map((pos) => (
              <div
                key={pos}
                className={`absolute ${pos} w-3 h-3`}
                style={{
                  borderTop: pos.includes("top") ? "1px solid var(--cyan)" : "none",
                  borderBottom: pos.includes("bottom") ? "1px solid var(--cyan)" : "none",
                  borderLeft: pos.includes("left") ? "1px solid var(--cyan)" : "none",
                  borderRight: pos.includes("right") ? "1px solid var(--cyan)" : "none",
                  opacity: 0.4,
                }}
              />
            ))}
            <SkillsCanvas skills={filtered} />
            <div
              className="absolute bottom-4 left-0 right-0 text-center font-mono text-xs"
              style={{ color: "var(--gray-600)" }}
            >
              drag to rotate · hover nodes
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
