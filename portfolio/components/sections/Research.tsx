"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface ResearchTopic {
  title: string;
  description: string;
  icon: string;
  color: string;
}

const ICONS: Record<string, string> = {
  network: "⬡",
  cloud: "◈",
  brain: "◉",
  cpu: "▣",
  shield: "◆",
  globe: "○",
  zap: "⚡",
  layers: "▤",
};

export default function Research({ research }: { research: ResearchTopic[] }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="research" ref={ref} className="py-32 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 50% at 50% 50%, rgba(0,212,255,0.03) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <p className="font-mono text-xs mb-3" style={{ color: "var(--cyan)", letterSpacing: "0.2em" }}>
            05 / RESEARCH
          </p>
          <h2
            className="font-display font-extrabold mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.02em", color: "var(--white)" }}
          >
            Research Interests
          </h2>
          <p className="text-sm max-w-xl" style={{ color: "var(--gray-400)" }}>
            The frontier problems I think about most — where theory meets large-scale systems.
          </p>
        </motion.div>

        {/* Lab header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4 mb-12 p-4 rounded-xl"
          style={{
            background: "rgba(0,212,255,0.04)",
            border: "1px solid rgba(0,212,255,0.1)",
          }}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: "var(--emerald)", boxShadow: "0 0 6px var(--emerald)" }}
          />
          <span className="font-mono text-xs" style={{ color: "var(--gray-400)" }}>
            OOJ Research Lab · Actively exploring ·{" "}
            <span style={{ color: "var(--cyan)" }}>8 active interests</span>
          </span>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          {research.map((topic, i) => (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06 + 0.2, duration: 0.6 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative rounded-2xl p-6 overflow-hidden transition-all duration-300"
              style={{
                background:
                  hoveredIndex === i
                    ? `linear-gradient(135deg, ${topic.color}12, rgba(5,5,5,0.8))`
                    : "rgba(255,255,255,0.02)",
                border: `1px solid ${hoveredIndex === i ? `${topic.color}30` : "rgba(255,255,255,0.05)"}`,
                transform: hoveredIndex === i ? "translateY(-4px)" : "none",
                boxShadow: hoveredIndex === i ? `0 20px 60px ${topic.color}10` : "none",
              }}
            >
              {/* Icon */}
              <div
                className="text-2xl mb-4 transition-transform duration-300"
                style={{
                  color: topic.color,
                  filter: hoveredIndex === i ? `drop-shadow(0 0 8px ${topic.color})` : "none",
                  transform: hoveredIndex === i ? "scale(1.1)" : "scale(1)",
                  display: "inline-block",
                }}
              >
                {ICONS[topic.icon] || "◉"}
              </div>

              <h3
                className="font-display font-bold mb-2 text-sm"
                style={{ color: hoveredIndex === i ? "var(--white)" : "var(--gray-300)" }}
              >
                {topic.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--gray-500)" }}>
                {topic.description}
              </p>

              {/* Corner accent */}
              {hoveredIndex === i && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute bottom-0 right-0 w-16 h-16 rounded-tl-3xl"
                  style={{ background: `radial-gradient(circle at bottom right, ${topic.color}15, transparent)` }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center font-mono text-xs"
          style={{ color: "var(--gray-600)" }}
        >
          Interested in collaboration or research opportunities?{" "}
          <a href="#contact" style={{ color: "var(--cyan)" }}>
            Let&apos;s connect →
          </a>
        </motion.p>
      </div>
    </section>
  );
}
