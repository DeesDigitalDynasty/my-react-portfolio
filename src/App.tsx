import { useState, useEffect } from "react";
import { createTheme } from "./utils/theme";
import { Navbar }   from "./components/Navbar";
import { Hero }     from "./sections/Hero";
import { About }    from "./sections/About";
import { Skills }   from "./sections/Skills";
import { Projects } from "./sections/Projects";
import { Contact }  from "./sections/Contact";
import { Footer }   from "./sections/Footer";

export default function App() {
  const [dark, setDark] = useState(true);
  const [vis, setVis]   = useState<Record<string, boolean>>({});
  const T = createTheme(dark);

  useEffect(() => {
    const ob = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setVis(v => ({ ...v, [e.target.getAttribute("data-s")!]: true })); }),
      { threshold: 0.07, rootMargin: "0px 0px -30px 0px" }
    );
    document.querySelectorAll("[data-s]").forEach(el => ob.observe(el));
    return () => ob.disconnect();
  }, []);

  return (
    <div style={{ background: T.bg, color: T.text, minHeight: "100vh", overflowX: "hidden" }}>
      <Navbar T={T} onToggleDark={() => setDark(d => !d)} />
      <Hero     T={T} />

<div data-s="ab">
        <About T={T} visible={vis.ab ?? true} />
      </div>

      <div data-s="sk">
        <Skills T={T} vis={vis} />
      </div>

      <div data-s="pr">
        <Projects T={T} visible={vis.pr ?? true} />
      </div>

      <div data-s="ct">
        <Contact T={T} visible={vis.ct ?? true} />
      </div>
      
      <Footer   T={T} />
    </div>
  );
}