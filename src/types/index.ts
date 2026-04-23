export interface Theme {
  dark: boolean;
  accent: string;
  bg: string;
  surface: string;
  border: string;
  text: string;
  muted: string;
  accentBg: string;
}

export interface OrbItem {
  id: number;
  title: string;
  date: string;
  icon: string;
  color: string;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
  desc: string;
}

export interface Project {
  title: string;
  desc: string;
  tags: string[];
  color: string;
  emoji: string;
}

export interface Skill {
  name: string;
  level: number;
  dc: string; // dark color
  lc: string; // light color
}