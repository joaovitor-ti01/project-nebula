import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AI_EVENTS } from "../../constants/events";
import { C } from "../../constants/theme";
import { PulseDot } from "../ui/PulseDot";

export function AlertBar() {
  const [idx, setIdx] = useState(0);
  const [vis, setVis] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setVis(false);
      setTimeout(() => { setIdx(i => (i + 1) % AI_EVENTS.length); setVis(true); }, 350);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  const ev  = AI_EVENTS[idx];
  const col = ev.sev === "critical" ? C.red : ev.sev === "warn" ? C.orange : C.blue;

  return (
    <AnimatePresence mode="wait">
      {vis && (
        <motion.div key={idx} initial={{ opacity: 0, y: -3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          style={{ display: "flex", alignItems: "center", gap: 10, padding: "5px 12px",
            background: `${col}10`, border: `1px solid ${col}25`, borderRadius: 2, minWidth: 0, flex: 1 }}>
          <PulseDot color={col} size={5} />
          <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: col, letterSpacing: "0.1em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {ev.msg}
          </span>
          <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 8, color: C.textLo, whiteSpace: "nowrap", marginLeft: "auto" }}>{ev.time}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}