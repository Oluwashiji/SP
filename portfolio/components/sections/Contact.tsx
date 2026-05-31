"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";

const GlobeCanvas = dynamic(() => import("../3d/GlobeCanvas"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

interface PersonalInfo {
  email: string;
  phone: string;
  github: string;
  linkedin: string;
}

const SOCIAL_ICONS: Record<string, string> = {
  email: "✉",
  phone: "☎",
  github: "⌥",
  linkedin: "in",
};

export default function Contact({ personal }: { personal: PersonalInfo }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("sent");
  };

  const socials = [
    { key: "github", label: "GitHub", href: personal.github, color: "#e8e8f0" },
    { key: "linkedin", label: "LinkedIn", href: personal.linkedin, color: "#0077b5" },
    { key: "email", label: personal.email, href: `mailto:${personal.email}`, color: "#00d4ff" },
    { key: "phone", label: personal.phone, href: `tel:${personal.phone}`, color: "#10b981" },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="py-32 relative overflow-hidden"
      style={{ background: "var(--gray-950)" }}
    >
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--cyan), var(--purple), transparent)" }}
      />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-mono text-xs mb-3" style={{ color: "var(--cyan)", letterSpacing: "0.2em" }}>
            06 / CONTACT
          </p>
          <h2
            className="font-display font-extrabold mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.02em", color: "var(--white)" }}
          >
            Let&apos;s Build Something
          </h2>
          <p className="text-base max-w-lg mx-auto leading-relaxed" style={{ color: "var(--gray-400)" }}>
            Open to internships, research collaborations, and interesting engineering problems. Say hello.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            {status === "sent" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="holo-card rounded-2xl p-12 text-center"
              >
                <div className="text-5xl mb-5">✓</div>
                <h3 className="font-display font-bold text-2xl mb-3" style={{ color: "var(--white)" }}>
                  Message Sent
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--gray-400)" }}>
                  I&apos;ll get back to you soon. Let&apos;s build something great.
                </p>
              </motion.div>
            ) : (
              <div className="holo-card rounded-2xl p-8 space-y-6">
                {["name", "email", "message"].map((field) => (
                  <div key={field}>
                    <label
                      className="block font-mono text-xs mb-2.5"
                      style={{ color: "var(--gray-500)", letterSpacing: "0.12em" }}
                    >
                      {field.toUpperCase()}
                    </label>
                    {field === "message" ? (
                      <textarea
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell me about your project..."
                        className="w-full rounded-xl px-4 py-3 text-sm font-mono resize-none transition-all duration-200"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "var(--white)",
                          outline: "none",
                          lineHeight: "1.7",
                        }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.4)"; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                      />
                    ) : (
                      <input
                        type={field === "email" ? "email" : "text"}
                        value={form[field as "name" | "email"]}
                        onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                        placeholder={field === "email" ? "you@example.com" : "Your name"}
                        className="w-full rounded-xl px-4 py-3 text-sm font-mono transition-all duration-200"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "var(--white)",
                          outline: "none",
                        }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.4)"; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                      />
                    )}
                  </div>
                ))}

                <button
                  onClick={handleSubmit}
                  disabled={status === "sending"}
                  className="w-full py-3.5 rounded-xl font-mono text-sm font-bold transition-all duration-200"
                  style={{
                    background: status === "sending" ? "rgba(0,212,255,0.3)" : "var(--cyan)",
                    color: "var(--black)",
                  }}
                  onMouseEnter={(e) => {
                    if (status !== "sending") e.currentTarget.style.boxShadow = "0 0 30px rgba(0,212,255,0.4)";
                  }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
                >
                  {status === "sending" ? "Sending..." : "Send Message →"}
                </button>
              </div>
            )}

            {/* Social links */}
            <div className="flex flex-wrap gap-3 mt-6">
              {socials.map(({ key, label, href, color }) => (
                <a
                  key={key}
                  href={href}
                  target={key !== "phone" ? "_blank" : undefined}
                  rel={key !== "phone" ? "noopener" : undefined}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "var(--gray-400)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = color;
                    e.currentTarget.style.borderColor = `${color}40`;
                    e.currentTarget.style.background = `${color}08`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--gray-400)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  }}
                >
                  <span style={{ fontSize: "0.65rem" }}>{SOCIAL_ICONS[key]}</span>
                  {label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: globe */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="relative h-[480px]"
          >
            <GlobeCanvas />
            <div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full font-mono text-xs whitespace-nowrap"
              style={{
                background: "rgba(5,5,5,0.8)",
                border: "1px solid rgba(0,212,255,0.2)",
                color: "var(--cyan)",
              }}
            >
              📍 Nigeria · Open to Remote
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}