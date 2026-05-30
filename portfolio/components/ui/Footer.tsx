"use client";
import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative py-10 overflow-hidden"
      style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
    >
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-display font-bold" style={{ color: "var(--white)" }}>
              OOJ
            </span>
            <span style={{ color: "var(--cyan)" }}>.</span>
            <p className="font-mono text-xs mt-1" style={{ color: "var(--gray-600)" }}>
              Building serious systems since {year - 3}.
            </p>
          </div>

          <div className="font-mono text-xs" style={{ color: "var(--gray-600)" }}>
            Designed & built by{" "}
            <span style={{ color: "var(--cyan)" }}>Owolabi Oluwashijibomi Jeremiah</span>
            {" "}· {year}
          </div>

          <div className="flex items-center gap-2">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--emerald)", boxShadow: "0 0 4px var(--emerald)" }}
            />
            <span className="font-mono text-xs" style={{ color: "var(--gray-600)" }}>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
