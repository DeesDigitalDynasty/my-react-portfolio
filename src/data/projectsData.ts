import type { Project } from "../types";

export const PROJECTS: Project[] = [
  { title:"Talk It Through",    desc:"AI-powered emotional support app. Real-time conversations via OpenRouter API, deployed on Vercel.", tags:["React","TypeScript","OpenRouter","Vercel"],  color:"#00f5ff", emoji:"💬" },
  { title:"Word Frequency Counter", desc:"Python CLI tool for text analysis with CSV export and a comprehensive pytest test suite.",        tags:["Python","pytest","CSV","CLI"],               color:"#ffd43b", emoji:"📊" },
  { title:"Multilingual UI Kit",desc:"Component library for EN, FR, ES, PT, YO audiences — inclusive by design.",                        tags:["React","i18n","Storybook"],                  color:"#a78bfa", emoji:"🌍" },
];