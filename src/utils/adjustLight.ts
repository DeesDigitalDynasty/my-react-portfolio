const map: Record<string, string> = {
  "#61dafb": "#0369a1",
  "#3178c6": "#1e3a8a",
  "#00f5ff": "#0369a1",
  "#ffd43b": "#92400e",
  "#68a063": "#166534",
  "#ff6b9d": "#9d174d",
  "#38bdf8": "#075985",
  "#a78bfa": "#5b21b6",
};

export function adjustLight(color: string): string {
  return map[color] ?? color;
}