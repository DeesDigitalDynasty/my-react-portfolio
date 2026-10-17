interface OrbIconProps {
  name: string;
  size?: number;
  color?: string;
  title?: string;
}

export function OrbIcon({ name, size = 18, color = "currentColor", title = "" }: OrbIconProps) {
  switch (name) {
    case "react":
      return (
        <svg width={size} height={size} viewBox="-11.5 -10.23174 23 20.46348" fill="none">
          <title>{title || "React"}</title>
          <circle cx="0" cy="0" r="2.05" fill={color} />
          <g stroke={color} strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );

    case "ts":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <title>{title || "TypeScript"}</title>
          <rect x="2" y="2" width="20" height="20" rx="4" stroke={color} strokeWidth="1.5" />
          <path d="M7 8h6M10 8v8" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          <path
            d="M17.5 9.5c-.8-.7-1.8-.7-2.3-.2-.6.5-.4 1.3.2 1.7l1.2.8c.8.6 1.1 1.5.4 2.2-.7.8-2 .7-2.8-.2"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case "python":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
          <title>{title || "Python"}</title>
          <path d="M11.9 2c-3.7 0-3.5 1.6-3.5 1.6l.01 1.7h3.6v.5H6.8S4 5.5 4 9.2c0 3.7 2.4 3.6 2.4 3.6h1.5v-2.1s-.1-2.4 2.4-2.4h4.1s2.3.1 2.3-2.3V4.2S17 2 11.9 2zm-1.8 1.1a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4zM12.1 22c3.7 0 3.5-1.6 3.5-1.6l-.01-1.7H12v-.5h5.2s2.8.3 2.8-3.4c0-3.7-2.4-3.6-2.4-3.6h-1.5v2.1s.1 2.4-2.4 2.4H9.6s-2.3-.1-2.3 2.3v1.8s-.3 2.2 4.8 2.2zm1.8-1.1a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4z" />
        </svg>
      );

    case "node":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <title>{title || "Node.js"}</title>
          <path d="M12 2L3 7.5v9L12 22l9-5.5v-9L12 2z" />
          <path d="M12 22V12" />
          <path d="M21 7.5L12 12 3 7.5" />
        </svg>
      );

    case "css":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <title>{title || "CSS / Tailwind"}</title>
          <path
            d="M6.5 14.5c1-2.5 3-3.5 5.5-2.5 1.5.6 2.5 1.7 3.5 1.7 2 0 3-1.5 3.5-3.5-1 2.5-3 3.5-5.5 2.5-1.5-.6-2.5-1.7-3.5-1.7-2 0-3 1.5-3.5 3.5z"
            fill={color}
          />
          <path
            d="M2.5 9c1-2.5 3-3.5 5.5-2.5 1.5.6 2.5 1.7 3.5 1.7 2 0 3-1.5 3.5-3.5-1 2.5-3 3.5-5.5 2.5-1.5-.6-2.5-1.7-3.5-1.7-2 0-3 1.5-3.5 3.5z"
            fill={color}
          />
        </svg>
      );

    case "chat":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <title>{title || "Talk It Through"}</title>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <circle cx="8" cy="10" r="1" fill={color} />
          <circle cx="12" cy="10" r="1" fill={color} />
          <circle cx="16" cy="10" r="1" fill={color} />
        </svg>
      );

    case "globe":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <title>{title || "5 Languages"}</title>
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );

    case "code":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <title>{title || "Software Development Student"}</title>
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
          <line x1="14" y1="4" x2="10" y2="20" />
        </svg>
      );

    default:
      return (
        <span
          style={{
            fontFamily: "'Orbitron', 'Courier New', monospace",
            fontWeight: 900,
            fontSize: 9,
            letterSpacing: 0.5,
            color,
          }}
        >
          {name.slice(0, 2).toUpperCase()}
        </span>
      );
  }
}
