import type { Theme } from "../types";
import { Gear } from "../components/Gear";

export function About({ T, visible }: { T: Theme; visible: boolean }) {
  const rv: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(28px)",
    transition: "opacity .7s ease, transform .7s cubic-bezier(.16,1,.3,1)",
  };

  return (
    <section
      id="about"
      style={{ padding: "clamp(60px,8vw,80px) clamp(16px,5vw,36px)", borderTop: `1px solid ${T.border}` }}
    >
      <div style={{ maxWidth: 860, margin: "0 auto", ...rv }}>
        <div
          style={{
            fontSize: 9,
            letterSpacing: 4,
            color: T.accent,
            textTransform: "uppercase",
            marginBottom: 6,
          }}
        >
          Welcome to My Digital Dynasty
        </div>
        <h2
          style={{
            fontFamily: "'Orbitron','Courier New',monospace",
            fontSize: "clamp(20px,4vw,34px)",
            fontWeight: 700,
            marginBottom: 42,
            color: T.text,
          }}
        >
          About Me
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "clamp(24px,5vw,56px)",
            alignItems: "center",
          }}
        >
          <div>
            <p style={{ color: T.muted, lineHeight: 1.9, marginBottom: 14, fontSize: 14 }}>
              I'm <span style={{ color: T.text, fontWeight: 600 }}>Oludayo Oluboyede</span> — a
              passionate web developer and CS student based in Ibadan, Nigeria 🇳🇬. I love building
              things that live on the internet, from AI emotional support apps to Python data tools.
            </p>

            <p style={{ color: T.muted, lineHeight: 1.9, marginBottom: 30, fontSize: 14 }}>
              Currently working on{" "}
              <span style={{ color: T.accent, fontWeight: 600 }}>Talk It Through</span> and studying
              CSE 111. I build across five natural language ecosystems.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: 9,
              }}
            >
              {[
                { k: "Languages", v: "English | Spanish | Yoruba" },
                { k: "Focus", v: "Full-Stack Web Dev" },
                { k: "Currently", v: "Building & Studying" },
                { k: "Location", v: "Ibadan, Nigeria" },
              ].map((it) => (
                <div
                  key={it.k}
                  style={{
                    background: T.surface,
                    border: `1px solid ${T.border}`,
                    borderRadius: 9,
                    padding: "11px 15px",
                  }}
                >
                  <div
                    style={{
                      color: T.muted,
                      fontSize: 9,
                      letterSpacing: 1.5,
                      textTransform: "uppercase",
                      marginBottom: 3,
                    }}
                  >
                    {it.k}
                  </div>
                  <div style={{ color: T.text, fontSize: 12, fontWeight: 600 }}>{it.v}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Hide gear on very small screens via conditional */}
          <Gear T={T} />
        </div>
      </div>
    </section>
  );
}