// import type { Theme } from "../types";

// interface NavbarProps {
//   T: Theme;
//   onToggleDark: () => void;
// }

// export function Navbar({ T, onToggleDark }: NavbarProps) {
//   const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });


  
//   return (
//     <nav style={{ position:"fixed", top:0, left:0, right:0, height:56, display:"flex", alignItems:"center",
//       justifyContent:"space-between", padding:"0 36px",
//       background:`${T.bg}ee`, backdropFilter:"blur(14px)",
//       borderBottom:`1px solid ${T.border}55`, zIndex:1000 }}>

//       <div style={{ fontFamily:"'Orbitron','Courier New',monospace", fontWeight:900, fontSize:16, color:T.accent, letterSpacing:3 }}>
//         D·A·Y·O
//       </div>

//       <div style={{ display:"flex", gap:22, alignItems:"center" }}>
//         {["about","skills","projects","contact"].map(s => (
//           <a key={s} onClick={() => scroll(s)}
//             style={{ color:T.muted, fontSize:12, letterSpacing:1.5, textTransform:"uppercase",
//               cursor:"pointer", textDecoration:"none", fontWeight:600, transition:"color .25s" }}
//             onMouseEnter={e => (e.currentTarget.style.color = T.accent)}
//             onMouseLeave={e => (e.currentTarget.style.color = T.muted)}>
//             {s}
//           </a>
//         ))}
//         <button onClick={onToggleDark} aria-label="Toggle colour scheme"
//           style={{ width:34, height:34, borderRadius:"50%", border:`1px solid ${T.border}`,
//             background:T.surface, color:T.text, cursor:"pointer", display:"flex",
//             alignItems:"center", justifyContent:"center", fontSize:15, transition:"all .3s", flexShrink:0 }}>
//           {T.dark ? "☀" : "🌙"}
//         </button>
//       </div>
//     </nav>
//   );
// }



import { useState, useEffect, useRef } from "react";
import type { Theme } from "../types";

interface NavbarProps {
  T: Theme;
  onToggleDark: () => void;
}

export function Navbar({ T, onToggleDark }: NavbarProps) {
  const scroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false); // close menu after click
  };

  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close on outside click
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
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 36px",
        background: `${T.bg}ee`,
        backdropFilter: "blur(14px)",
        borderBottom: `1px solid ${T.border}55`,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          fontFamily: "'Orbitron','Courier New',monospace",
          fontWeight: 900,
          fontSize: 16,
          color: T.accent,
          letterSpacing: 3,
        }}
      >
        D·A·Y·O
      </div>

      {/* Desktop Nav */}
      {!isMobile && (
        <div style={{ display: "flex", gap: 22, alignItems: "center" }}>
          {["about", "skills", "projects", "contact"].map((s) => (
            <a
              key={s}
              onClick={() => scroll(s)}
              style={{
                color: T.muted,
                fontSize: 12,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                cursor: "pointer",
                textDecoration: "none",
                fontWeight: 600,
                transition: "color .25s",
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
              width: 34,
              height: 34,
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

      {/* Mobile Hamburger */}
      {isMobile && (
        <div
          onClick={() => setOpen((o) => !o)}
          style={{
            fontSize: 22,
            cursor: "pointer",
            color: T.text,
            userSelect: "none",
          }}
        >
          ☰
        </div>
      )}

      {/* Mobile Menu */}
      {isMobile && open && (
        <div
          ref={menuRef}
          style={{
            position: "absolute",
            top: 60,
            right: 20,
            background: T.bg,
            border: `1px solid ${T.border}`,
            borderRadius: 10,
            padding: "14px 18px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          }}
        >
          {["about", "skills", "projects", "contact"].map((s) => (
            <a
              key={s}
              onClick={() => scroll(s)}
              style={{
                color: T.muted,
                fontSize: 12,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                cursor: "pointer",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              {s}
            </a>
          ))}

          <button
            onClick={onToggleDark}
            style={{
              marginTop: 6,
              width: 34,
              height: 34,
              borderRadius: "50%",
              border: `1px solid ${T.border}`,
              background: T.surface,
              color: T.text,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15,
            }}
          >
            {T.dark ? "🌞" : "🌙"}
          </button>
        </div>
      )}
    </nav>
  );
}