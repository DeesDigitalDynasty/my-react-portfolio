import type { Theme } from "../types";

export function createTheme(dark: boolean): Theme {
  return {
    dark,
    accent:    dark ? "#00f5ff" : "#1d4ed8",
    bg:        dark ? "#010409" : "#f8fafc",
    surface:   dark ? "#0d1117" : "#ffffff",
    border:    dark ? "#1a2232" : "#e2e8f0",
    text:      dark ? "#e8edf3" : "#0f172a",
    muted:     dark ? "#8894a4" : "#475569",
    accentBg:  dark ? "#00f5ff13" : "#1d4ed80d",
  };
}