"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const HeroCanvas = dynamic(() => import("../3d/HeroCanvas"), {
  ssr: false,
  loading: () => <div className="absolute inset-0" style={{ background: "var(--black)" }} />,
});

const ROLES = [
  "AI & Machine Learning Systems",
  "Distributed Systems",
  "Cloud Engineering",
  "Software Engineering",
  "Cybersecurity",
];

function DataStream({ index }: { index: number }) {
  const chars = "01アイウエオカキクケコ∑∫∂∇λμΩ".split("");
  const col = useRef(Math.floor(Math.random() * 100));
  const delay = useRef(Math.random() * 8);
  const speed = useRef(Math.random() * 3 + 4);
  const chars2 = Array.from({ length: 20 }, () => chars[Math.floor(Math.random() * chars.length)]);

  return (
    <div
      className="absolute top-0 font-mono text-xs pointer-events-none select-none"
      style={{
        left: `${col.current}%`,
        color: "var(--cyan)",
        opacity: 0.07,
        animation: `data-stream ${speed.current}s linear ${delay.current}s infinite`,
        writingMode: "vertical-rl",
        letterSpacing: "0.1em",
      }}
    >
      {chars2.join("")}
    </div>
  );
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 200);
    const iv = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(iv);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-pattern"
    >
      {/* Data streams */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {Array.from({ length: 18 }).map((_, i) => (
          <DataStream key={i} index={i} />
        ))}
      </div>

      {/* 3D canvas */}
      <HeroCanvas />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 50%, transparent 0%, rgba(5,5,5,0.6) 60%, var(--black) 100%)",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 120% 100% at 50% 0%, transparent 50%, rgba(5,5,5,0.8) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-20 section-container text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* Status badge */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 font-mono text-xs"
            style={{
              background: "rgba(0,212,255,0.06)",
              border: "1px solid rgba(0,212,255,0.2)",
              color: "var(--cyan)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: "var(--emerald)",
                boxShadow: "0 0 6px var(--emerald)",
                animation: "pulse-glow 2s ease-in-out infinite",
              }}
            />
            Available for opportunities · Nigeria
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              className="font-display font-extrabold leading-none mb-2"
              style={{ fontSize: "clamp(2rem, 6vw, 5.5rem)", letterSpacing: "-0.02em" }}
            >
              <span style={{ color: "var(--white)" }}>Owolabi </span>
              <span className="text-gradient-cyan">Oluwashijibomi</span>
            </h1>
            <h1
              className="font-display font-extrabold leading-none mb-6"
              style={{ fontSize: "clamp(1.5rem, 4vw, 4rem)", letterSpacing: "-0.02em", color: "var(--gray-400)" }}
            >
              Jeremiah
            </h1>
          </motion.div>

          {/* Titles */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="font-mono text-sm mb-8 tracking-widest uppercase"
            style={{ color: "var(--gray-400)", letterSpacing: "0.15em" }}
          >
            Computer Scientist &nbsp;·&nbsp; AI Systems Engineer &nbsp;·&nbsp; Cloud Engineer
          </motion.p>

          {/* Animated role */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="h-10 flex items-center justify-center mb-12"
          >
            <span className="font-mono text-sm mr-2" style={{ color: "var(--gray-600)" }}>
              &gt;_
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="font-mono text-base"
                style={{ color: "var(--cyan)" }}
              >
                {ROLES[roleIndex]}
              </motion.span>
            </AnimatePresence>
            <span
              className="ml-1 inline-block w-0.5 h-5"
              style={{
                background: "var(--cyan)",
                animation: "pulse-glow 1s step-end infinite",
              }}
            />
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#projects"
              className="group relative px-7 py-3 rounded-full font-mono text-sm font-bold overflow-hidden transition-all duration-300"
              style={{
                background: "var(--cyan)",
                color: "var(--black)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 40px rgba(0,212,255,0.5)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "none";
              }}
            >
              View Projects →
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener"
              className="px-7 py-3 rounded-full font-mono text-sm transition-all duration-300"
              style={{
                border: "1px solid rgba(255,255,255,0.15)",
                color: "var(--white)",
                background: "rgba(255,255,255,0.04)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              }}
            >
              ↓ Resume
            </a>

            <a
              href="#contact"
              className="px-7 py-3 rounded-full font-mono text-sm transition-all duration-300"
              style={{
                border: "1px solid rgba(124,58,237,0.4)",
                color: "var(--purple-bright)",
                background: "rgba(124,58,237,0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--purple-bright)";
                e.currentTarget.style.background = "rgba(124,58,237,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)";
                e.currentTarget.style.background = "rgba(124,58,237,0.06)";
              }}
            >
              Contact Me
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs" style={{ color: "var(--gray-600)", letterSpacing: "0.2em" }}>
          SCROLL
        </span>
        <div
          className="w-px h-10"
          style={{
            background: "linear-gradient(to bottom, var(--cyan), transparent)",
            animation: "float 2s ease-in-out infinite",
          }}
        />
      </motion.div>
    </section>
  );
}
