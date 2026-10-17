import { useState, useEffect, useRef } from "react";
import type { Theme } from "../types";

interface NavbarProps {
  T: Theme;
  onToggleDark: () => void;
}

export function Navbar({ T, onToggleDark }: NavbarProps) {
  const scroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 clamp(16px, 4vw, 36px)",
        background: scrolled ? `${T.bg}f2` : `${T.bg}cc`,
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderBottom: `1px solid ${scrolled ? T.border : "transparent"}`,
        zIndex: 1000,
        transition: "background .3s, border-color .3s",
      }}
    >
      {/* Logo / Name */}
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
        <span
          style={{
            fontFamily: "'Orbitron','Courier New',monospace",
            fontWeight: 900,
            fontSize: isMobile ? 13 : 15,
            color: T.accent,
            letterSpacing: 3,
          }}
        >
          D·A·Y·O
        </span>
        {!isMobile && (
          <span style={{ fontSize: 9, color: T.muted, letterSpacing: 1.5, marginTop: 1 }}>
            Oludayo Oluboyede
          </span>
        )}
      </div>

      {/* Desktop Nav */}
      {!isMobile && (
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {["about", "skills", "projects", "contact"].map((s) => (
            <a
              key={s}
              onClick={() => scroll(s)}
              style={{
                color: T.muted,
                fontSize: 11,
                letterSpacing: 2,
                textTransform: "uppercase",
                cursor: "pointer",
                textDecoration: "none",
                fontWeight: 700,
                transition: "color .25s",
                position: "relative",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = T.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = T.muted)}
            >
              {s}
            </a>
          ))}
          <button
            onClick={onToggleDark}
            aria-label="Toggle colour scheme"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: `1px solid ${T.border}`,
              background: T.surface,
              color: T.text,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15,
              transition: "all .3s",
              flexShrink: 0,
            }}
          >
            {T.dark ? "🌞" : "🌙"}
          </button>
        </div>
      )}

      {/* Mobile Controls */}
      {isMobile && (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={onToggleDark}
            aria-label="Toggle colour scheme"
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: `1px solid ${T.border}`,
              background: T.surface,
              color: T.text,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
            }}
          >
            {T.dark ? "🌞" : "🌙"}
          </button>
          <div
            onClick={() => setOpen((o) => !o)}
            style={{
              fontSize: 20,
              cursor: "pointer",
              color: T.text,
              userSelect: "none",
              padding: "4px 6px",
            }}
          >
            {open ? "✕" : "☰"}
          </div>
        </div>
      )}

      {/* Mobile Dropdown */}
      {isMobile && open && (
        <div
          ref={menuRef}
          style={{
            position: "absolute",
            top: 64,
            right: 16,
            left: 16,
            background: T.dark ? "#0d1117" : "#ffffff",
            border: `1px solid ${T.border}`,
            borderRadius: 14,
            padding: "18px 22px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            boxShadow: `0 16px 48px rgba(0,0,0,0.3), 0 0 0 1px ${T.accent}22`,
          }}
        >
          {["about", "skills", "projects", "contact"].map((s) => (
            <a
              key={s}
              onClick={() => scroll(s)}
              style={{
                color: T.muted,
                fontSize: 13,
                letterSpacing: 2,
                textTransform: "uppercase",
                cursor: "pointer",
                textDecoration: "none",
                fontWeight: 700,
                padding: "10px 0",
                borderBottom: `1px solid ${T.border}44`,
                transition: "color .2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = T.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = T.muted)}
            >
              {s}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}