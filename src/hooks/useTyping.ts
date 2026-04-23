import { useState, useEffect } from "react";

export function useTyping(words: string[]): string {
  const [i, setI]     = useState(0);
  const [ci, setCi]   = useState(0);
  const [del, setDel] = useState(false);
  const [txt, setTxt] = useState("");

  useEffect(() => {
    const w = words[i];
    const id = setTimeout(() => {
      if (!del) {
        setTxt(w.slice(0, ci + 1));
        if (ci + 1 === w.length) setTimeout(() => setDel(true), 2000);
        else setCi(c => c + 1);
      } else {
        setTxt(w.slice(0, ci - 1));
        if (ci <= 1) { setDel(false); setI(x => (x + 1) % words.length); setCi(0); }
        else setCi(c => c - 1);
      }
    }, del ? 48 : 105);
    return () => clearTimeout(id);
  }, [ci, del, i, words]);

  return txt;
}