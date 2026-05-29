import { motion } from "framer-motion";
import { C } from "../../constants/theme";
import { TABS } from "../../constants/satellites";
import { OrbitronText } from "../ui/OrbitronText";
import { AlertBar } from "./AlertBar";
import { useClock } from "../../hooks/useClock";

interface NavProps { active: string; setActive: (t: string) => void; }

export function Nav({ active, setActive }: NavProps) {
  const time = useClock();
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 54,
      background: "rgba(2,4,8,.97)", borderBottom: `1px solid ${C.border}`,
      display: "flex", alignItems: "center", padding: "0 20px", gap: 14,
      backdropFilter: "blur(20px)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <motion.div animate={{ opacity: [1, .3, 1] }} transition={{ repeat: Infinity, duration: 2.4 }}
          style={{ width: 6, height: 6, borderRadius: "50%", background: C.blue, boxShadow: `0 0 8px ${C.blue}` }} />
        <OrbitronText size={13} color={C.blue} style={{ letterSpacing: "0.2em" }}>NEBULA</OrbitronText>
      </div>
      <div style={{ display: "flex", gap: 2 }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setActive(t)} style={{
            background: active === t ? `${C.blue}12` : "transparent",
            border: "none", borderBottom: active === t ? `2px solid ${C.blue}` : "2px solid transparent",
            color: active === t ? C.blue : C.textLo,
            fontFamily: "'Share Tech Mono',monospace", fontSize: 9, letterSpacing: "0.18em",
            padding: "8px 11px", cursor: "pointer", whiteSpace: "nowrap", transition: "all .2s",
          }}>{t}</button>
        ))}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}><AlertBar /></div>
      <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: C.textLo, letterSpacing: "0.1em", flexShrink: 0 }}>
        {time.toUTCString().slice(17, 25)} UTC
      </div>
    </nav>
  );
}