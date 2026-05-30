"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  "Initializing neural interface...",
  "Loading distributed systems kernel...",
  "Establishing secure connection...",
  "Mounting cloud infrastructure...",
  "Compiling AI subsystems...",
  "Ready.",
];

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        setLines((prev) => [...prev, line]);
        setProgress(Math.round(((i + 1) / BOOT_LINES.length) * 100));
      }, i * 320 + 200);
    });

    const timeout = setTimeout(() => setVisible(false), BOOT_LINES.length * 320 + 600);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "var(--black)" }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 text-center"
          >
            <div
              className="font-display font-extrabold mb-1"
              style={{ fontSize: "3rem", color: "var(--white)", letterSpacing: "-0.03em" }}
            >
              OOJ<span style={{ color: "var(--cyan)" }}>.</span>
            </div>
            <div className="font-mono text-xs" style={{ color: "var(--gray-600)", letterSpacing: "0.2em" }}>
              SYSTEMS ONLINE
            </div>
          </motion.div>

          {/* Boot lines */}
          <div className="w-80 mb-8">
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="font-mono text-xs mb-1.5"
                style={{
                  color: line === "Ready." ? "var(--cyan)" : "var(--gray-600)",
                }}
              >
                <span style={{ color: "var(--gray-700)", marginRight: 8 }}>▶</span>
                {line}
              </motion.div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="w-80">
            <div
              className="h-px w-full rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
                className="h-full"
                style={{ background: "linear-gradient(90deg, var(--cyan), var(--purple))" }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="font-mono text-xs" style={{ color: "var(--gray-700)" }}>
                BOOT
              </span>
              <span className="font-mono text-xs" style={{ color: "var(--cyan)" }}>
                {progress}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
