/**
 * OrbIcon — Uses Simple Icons CDN for real brand favicons.
 * Non-brand nodes fall back to a clean 2-letter text label.
 */

interface OrbIconProps {
  name: string;
  size?: number;
  color?: string;
  /** node title – used for the fallback text abbreviation */
  title?: string;
}

const CDN = "https://cdn.simpleicons.org";

/** Map of icon token → Simple Icons slug (https://simpleicons.org) */
const ICON_SLUGS: Record<string, string> = {
  react:  "react",
  ts:     "typescript",
  python: "python",
  node:   "nodedotjs",
  css:    "tailwindcss",
};

/** Short abbreviation for non-brand nodes */
const FALLBACK_LABELS: Record<string, string> = {
  chat:  "TIT",   // Talk It Through
  globe: "5L",    // 5 Languages
  code:  "CS",    // CS Student
};

export function OrbIcon({ name, size = 20, color = "#ffffff", title = "" }: OrbIconProps) {
  const slug = ICON_SLUGS[name];

  /* ── Real brand icon via Simple Icons CDN ── */
  if (slug) {
    // Strip # from hex so CDN URL is valid
    const hex = color.replace("#", "");
    return (
      <img
        src={`${CDN}/${slug}/${hex}`}
        alt={title || name}
        width={size}
        height={size}
        draggable={false}
        style={{ display: "block", filter: "none", userSelect: "none" }}
      />
    );
  }

  /* ── Fallback: clean 2-3 letter abbreviation ── */
  const label = FALLBACK_LABELS[name] ?? name.slice(0, 2).toUpperCase();
  return (
    <span
      style={{
        fontFamily: "'Orbitron', 'Courier New', monospace",
        fontWeight: 900,
        fontSize: 9,
        letterSpacing: 0.5,
        color,
        userSelect: "none",
        lineHeight: 1,
      }}
    >
      {label}
    </span>
  );
}
