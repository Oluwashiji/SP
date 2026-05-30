"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  duration: string;
  description: string;
  highlights: string[];
  type: string;
}

const TYPE_COLORS: Record<string, string> = {
  internship: "#00d4ff",
  "part-time": "#10b981",
  freelance: "#a855f7",
  fulltime: "#f59e0b",
};

const TYPE_LABELS: Record<string, string> = {
  internship: "Internship",
  "part-time": "Part-Time",
  freelance: "Freelance",
  fulltime: "Full-Time",
};

export default function Experience({ experience }: { experience: ExperienceItem[] }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);

  const current = experience[active];
  const color = TYPE_COLORS[current.type] || "#00d4ff";

  return (
    <section
      id="experience"
      ref={ref}
      className="py-32 relative overflow-hidden"
      style={{ background: "var(--gray-950)" }}
    >
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="font-mono text-xs mb-3" style={{ color: "var(--cyan)", letterSpacing: "0.2em" }}>
            04 / EXPERIENCE
          </p>
          <h2
            className="font-display font-extrabold"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.02em", color: "var(--white)" }}
          >
            Where I&apos;ve Worked
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Left: company list */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="flex lg:flex-col gap-3"
          >
            {experience.map((exp, i) => {
              const c = TYPE_COLORS[exp.type] || "#00d4ff";
              return (
                <button
                  key={exp.id}
                  onClick={() => setActive(i)}
                  className="text-left px-4 py-3 rounded-xl transition-all duration-200 flex-1 lg:flex-auto"
                  style={{
                    background: active === i ? `${c}10` : "transparent",
                    border: `1px solid ${active === i ? `${c}30` : "rgba(255,255,255,0.06)"}`,
                  }}
                >
                  <div
                    className="font-display font-semibold text-sm leading-tight"
                    style={{ color: active === i ? c : "var(--gray-400)" }}
                  >
                    {exp.company}
                  </div>
                  <div className="font-mono text-xs mt-0.5" style={{ color: "var(--gray-600)" }}>
                    {exp.period}
                  </div>
                </button>
              );
            })}
          </motion.div>

          {/* Right: detail */}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="holo-card rounded-2xl p-8"
          >
            {/* Top bar */}
            <div
              className="h-px mb-8"
              style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
            />

            <div className="flex flex-wrap items-start gap-3 mb-6">
              <div>
                <h3
                  className="font-display font-bold text-xl"
                  style={{ color: "var(--white)" }}
                >
                  {current.role}
                </h3>
                <p className="font-mono text-sm" style={{ color: color }}>
                  {current.company}
                </p>
              </div>
              <div className="ml-auto flex items-center gap-3">
                <span
                  className="font-mono text-xs px-2.5 py-1 rounded-full"
                  style={{ background: `${color}10`, border: `1px solid ${color}25`, color: color }}
                >
                  {TYPE_LABELS[current.type]}
                </span>
                <span className="font-mono text-xs" style={{ color: "var(--gray-500)" }}>
                  {current.period} · {current.duration}
                </span>
              </div>
            </div>

            <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--gray-400)" }}>
              {current.description}
            </p>

            <div>
              <p className="font-mono text-xs mb-4" style={{ color: "var(--gray-600)", letterSpacing: "0.12em" }}>
                KEY HIGHLIGHTS
              </p>
              <ul className="space-y-3">
                {current.highlights.map((h, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-3"
                  >
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: color, boxShadow: `0 0 4px ${color}` }}
                    />
                    <span className="text-sm" style={{ color: "var(--gray-300)" }}>
                      {h}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
