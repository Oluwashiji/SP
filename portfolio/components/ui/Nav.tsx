"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Research", href: "#research" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { threshold: 0.3 }
    );
    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "nav-blur" : "bg-transparent"
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a
              href="#"
              className="font-display font-bold text-lg tracking-tight"
              style={{ color: "var(--cyan)" }}
            >
              <span style={{ color: "var(--white)" }}>OOJ</span>
              <span style={{ color: "var(--cyan)" }}>.</span>
            </a>

            {/* Desktop nav */}
            <ul className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="relative px-3 py-1.5 text-sm font-mono transition-colors duration-200"
                    style={{
                      color: active === href ? "var(--cyan)" : "var(--gray-400)",
                    }}
                  >
                    {active === href && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full"
                        style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)" }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener"
              className="hidden md:flex items-center gap-2 px-4 py-1.5 text-sm font-mono rounded-full transition-all duration-200"
              style={{
                border: "1px solid rgba(0,212,255,0.3)",
                color: "var(--cyan)",
                background: "rgba(0,212,255,0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0,212,255,0.15)";
                e.currentTarget.style.borderColor = "var(--cyan)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(0,212,255,0.06)";
                e.currentTarget.style.borderColor = "rgba(0,212,255,0.3)";
              }}
            >
              Resume ↗
            </a>

            {/* Mobile toggle */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block w-5 h-px transition-all duration-300"
                  style={{
                    background: "var(--cyan)",
                    transform:
                      menuOpen && i === 0
                        ? "rotate(45deg) translate(3px, 3px)"
                        : menuOpen && i === 2
                        ? "rotate(-45deg) translate(3px, -3px)"
                        : menuOpen && i === 1
                        ? "scaleX(0)"
                        : "none",
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 nav-blur md:hidden"
          >
            <ul className="flex flex-col py-4">
              {NAV_ITEMS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="block px-6 py-3 font-mono text-sm transition-colors"
                    style={{ color: active === href ? "var(--cyan)" : "var(--gray-300)" }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
