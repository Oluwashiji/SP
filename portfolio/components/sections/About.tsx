"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AboutData {
  headline: string;
  paragraphs: string[];
  university: string;
  degree: string;
  stats: { value: string; label: string }[];
}

const TIMELINE = [
  { year: "2021", event: "Enrolled at Lead City University · Computer Science", color: "#00d4ff" },
  { year: "2022", event: "Started IT Support role · Lead City University ICT Center", color: "#7c3aed" },
  { year: "2022", event: "Began freelancing · Full-Stack Development", color: "#10b981" },
  { year: "2023", event: "Internship · Graphics Packaging International", color: "#f59e0b" },
  { year: "2024", event: "Deep dive into AI Systems & Distributed Computing", color: "#a855f7" },
  { year: "2025", event: "Building LECTURE-LINK · AI-Enhanced Learning Portal", color: "#00d4ff" },
];

function StatCard({ value, label, index }: { value: string; label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
      className="holo-card rounded-2xl p-5 text-center"
    >
      <div
        className="font-display font-extrabold mb-1"
        style={{ fontSize: "2rem", color: "var(--cyan)" }}
      >
        {value}
      </div>
      <div className="font-mono text-xs" style={{ color: "var(--gray-400)" }}>
        {label}
      </div>
    </motion.div>
  );
}

function TimelineItem({
  year,
  event,
  color,
  index,
}: {
  year: string;
  event: string;
  color: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex gap-5 items-start"
    >
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-3 h-3 rounded-full mt-0.5"
          style={{ background: color, boxShadow: `0 0 10px ${color}` }}
        />
        {index < TIMELINE.length - 1 && (
          <div
            className="w-px flex-1 mt-2"
            style={{ background: `linear-gradient(to bottom, ${color}44, transparent)`, minHeight: 40 }}
          />
        )}
      </div>
      <div className="pb-6">
        <span className="font-mono text-xs mr-3" style={{ color: color }}>
          {year}
        </span>
        <span className="text-sm" style={{ color: "var(--gray-300)" }}>
          {event}
        </span>
      </div>
    </motion.div>
  );
}

export default function About({ data }: { data: AboutData }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-32 relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute -left-64 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="font-mono text-xs mb-3" style={{ color: "var(--cyan)", letterSpacing: "0.2em" }}>
            01 / ABOUT
          </p>
          <h2
            className="font-display font-extrabold leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.02em" }}
          >
            {data.headline.split(",").map((part, i) => (
              <span key={i}>
                {i === 0 ? (
                  <span style={{ color: "var(--white)" }}>{part},</span>
                ) : (
                  <span className="text-gradient-cyan">{part}</span>
                )}
              </span>
            ))}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left: bio + stats */}
          <div>
            <div className="space-y-5 mb-12">
              {data.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.15 + 0.2, duration: 0.7 }}
                  className="text-base leading-relaxed"
                  style={{ color: "var(--gray-300)" }}
                >
                  {p}
                </motion.p>
              ))}
            </div>

            {/* University badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="holo-card rounded-2xl p-5 mb-10 flex items-center gap-4"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0"
                style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)", color: "var(--cyan)" }}
              >
                🎓
              </div>
              <div>
                <div className="font-display font-bold text-sm" style={{ color: "var(--white)" }}>
                  {data.university}
                </div>
                <div className="font-mono text-xs" style={{ color: "var(--gray-400)" }}>
                  {data.degree}
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {data.stats.map((s, i) => (
                <StatCard key={s.label} {...s} index={i} />
              ))}
            </div>
          </div>

          {/* Right: timeline */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="font-mono text-xs mb-8"
              style={{ color: "var(--gray-600)", letterSpacing: "0.15em" }}
            >
              TIMELINE
            </motion.p>
            <div>
              {TIMELINE.map((item, i) => (
                <TimelineItem key={i} {...item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
