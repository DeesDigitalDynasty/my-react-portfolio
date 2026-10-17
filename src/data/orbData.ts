import type { OrbItem } from "../types";

export const ORB: OrbItem[] = [
  { id:1, title:"React / Next.js", date:"2022–Now", icon:"react",  color:"#61dafb", relatedIds:[2,7], status:"completed",  energy:88, desc:"Building dynamic UIs with React hooks, Next.js SSR, and component design patterns. My primary frontend framework." },
  { id:2, title:"TypeScript",      date:"2023–Now", icon:"ts",     color:"#3178c6", relatedIds:[1,3], status:"completed",  energy:82, desc:"Type-safe JavaScript across all major projects. Strong understanding of generics, utility types, and strict configs." },
  { id:3, title:"Talk It Through", date:"Apr 2025", icon:"chat",   color:"#00f5ff", relatedIds:[2,5], status:"in-progress",energy:75, desc:"AI emotional support app deployed on Vercel. Uses OpenRouter API for conversations. Supabase auth coming next." },
  { id:4, title:"Python",          date:"2023–Now", icon:"python", color:"#ffd43b", relatedIds:[8,2], status:"completed",  energy:80, desc:"Python for data tools, CLI scripts, and testing. CSE 111 coursework with pytest, CSV processing, and file I/O." },
  { id:5, title:"Node.js",         date:"2023–Now", icon:"node",   color:"#68a063", relatedIds:[3,7], status:"completed",  energy:78, desc:"Server-side JavaScript, REST APIs, and Vercel serverless functions powering backend logic." },
  { id:6, title:"5 Languages",     date:"Born with it",icon:"globe",color:"#ff6b9d",relatedIds:[4,8],status:"completed",  energy:95, desc:"EN · FR · ES · PT · YO — I write software for everyone. Multilingualism shapes how I think about UX." },
  { id:7, title:"CSS / Tailwind",  date:"2022–Now", icon:"css",    color:"#38bdf8", relatedIds:[1,5], status:"completed",  energy:90, desc:"Utility-first CSS for rapid UI. Paired with shadcn/ui for accessible, reusable, beautiful component libraries." },
  { id:8, title:"CS Student",      date:"2024–Now", icon:"code",   color:"#a78bfa", relatedIds:[4,6], status:"in-progress",energy:70, desc:"Currently enrolled in CSE 111. Focused on algorithms, data structures, and software engineering fundamentals." },
];