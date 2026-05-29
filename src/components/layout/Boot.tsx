import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BOOT_LINES } from "../../constants/satellite";
import { C } from "../../constants/theme";
import { Particles } from "./Particles";
import { Panel } from "../ui/Panel";
import { PanelInner } from "../ui/PanelInner";
import { OrbitronText } from "../ui/OrbitronText";

interface BootProps { onDone: () => void; }

export function Boot({ onDone }: BootProps) {
  const [shown, setShown] = useState<typeof BOOT_LINES>([]);
  const [done,  setDone]  = useState(false);

  useEffect(() => {
    BOOT_LINES.forEach((l, i) => {
      setTimeout(() => {
        setShown(prev => [...prev, l]);
        if (i === BOOT_LINES.length - 1) {
          setTimeout(() => setDone(true), 400);
          setTimeout(onDone, 900);
        }
      }, l.delay);
    });
  }, [onDone]);

  return (
    <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.8 }} style={{
      position: "fixed", inset: 0, zIndex: 999, background: C.bg,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <Particles />
      <div style={{ position: "relative", zIndex: 10, width: "min(640px,90vw)" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <OrbitronText size={22} color={C.blue}>PROJECT NEBULA</OrbitronText>
          <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: C.textLo, letterSpacing: "0.3em", marginTop: 6 }}>
            AUTONOMOUS ORBITAL INTELLIGENCE SYSTEM
          </div>
        </div>
        <Panel glow>
          <PanelInner>
            {shown.map((l, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}
                style={{
                  fontFamily: "'Share Tech Mono',monospace", fontSize: 11, marginBottom: 7, letterSpacing: "0.1em",
                  color: l.primary ? C.blue : l.highlight ? C.cyan : "#3a5570",
                  textShadow: l.primary ? `0 0 10px ${C.blue}` : "none",
                }}>
                {l.text}
              </motion.div>
            ))}
            {done && (
              <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }}
                style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: C.blue, marginTop: 8, letterSpacing: "0.2em" }}>
                ▶ ENTERING MISSION CONTROL...
              </motion.div>
            )}
          </PanelInner>
        </Panel>
      </div>
    </motion.div>
  );
}