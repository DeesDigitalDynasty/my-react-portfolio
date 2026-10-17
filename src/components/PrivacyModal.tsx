import type { Theme } from "../types";

interface PrivacyModalProps {
  T: Theme;
  onClose: () => void;
  projectTitle: string;
}

export function PrivacyModal({ T, onClose, projectTitle }: PrivacyModalProps) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(8px)",
        padding: "20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: T.dark ? "#0d1117" : "#ffffff",
          border: `1px solid ${T.accent}44`,
          borderRadius: 20,
          padding: "40px 36px",
          maxWidth: 440,
          width: "100%",
          textAlign: "center",
          position: "relative",
          boxShadow: `0 0 60px ${T.accent}22, 0 24px 64px rgba(0,0,0,0.4)`,
          animation: "modalIn 0.3s cubic-bezier(.16,1,.3,1)",
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            right: "10%",
            height: 2,
            background: `linear-gradient(90deg, transparent, ${T.accent}, transparent)`,
            borderRadius: 2,
          }}
        />

        {/* Icon */}
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>

        <div
          style={{
            fontSize: 9,
            letterSpacing: 4,
            color: T.accent,
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Private Project
        </div>

        <h3
          style={{
            fontFamily: "'Orbitron','Courier New',monospace",
            fontSize: "clamp(16px,3vw,22px)",
            fontWeight: 700,
            color: T.text,
            marginBottom: 14,
          }}
        >
          {projectTitle}
        </h3>

        <p
          style={{
            color: T.muted,
            fontSize: 14,
            lineHeight: 1.8,
            marginBottom: 28,
          }}
        >
          This project is in{" "}
          <span style={{ color: T.accent, fontWeight: 600 }}>privacy mode</span>
          . Please reach out to the{" "}
          <span style={{ color: T.text, fontWeight: 600 }}>
            admin / developer
          </span>{" "}
          for access or more information.
        </p>

        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => {
              window.open(
                "https://wa.me/2349036267839?text=Hi%20Oludayo%2C%20I%20saw%20your%20portfolio%20and%20I%27d%20like%20to%20learn%20more%20about%20one%20of%20your%20projects.",
                "_blank",
                "noopener,noreferrer"
              );
              onClose();
            }}
            style={{
              padding: "10px 22px",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              cursor: "pointer",
              background: T.accent,
              color: T.dark ? "#010409" : "#fff",
              border: "none",
              fontFamily: "inherit",
              transition: "all .25s",
            }}
            onMouseEnter={(e) =>
              Object.assign(e.currentTarget.style, {
                transform: "translateY(-2px)",
                boxShadow: `0 0 22px ${T.accent}66`,
              })
            }
            onMouseLeave={(e) =>
              Object.assign(e.currentTarget.style, {
                transform: "none",
                boxShadow: "none",
              })
            }
          >
            Contact Developer →
          </button>
          <button
            onClick={onClose}
            style={{
              padding: "10px 22px",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              cursor: "pointer",
              background: "transparent",
              color: T.muted,
              border: `1.5px solid ${T.border}`,
              fontFamily: "inherit",
              transition: "all .25s",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
