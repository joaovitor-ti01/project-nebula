import { motion } from "framer-motion";
import { C } from "../../constants/theme";
import { clamp } from "../../utils/math";

interface MetricBarProps { label: string; value: number; color?: string; max?: number; }

export function MetricBar({ label, value, color = C.blue, max = 100 }: MetricBarProps) {
  const pct = clamp((value / max) * 100);
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
        <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: C.textLo, letterSpacing: "0.12em" }}>{label}</span>
        <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color }}>{value}{max === 100 ? "%" : ""}</span>
      </div>
      <div style={{ height: 3, background: C.dim, borderRadius: 2, overflow: "hidden" }}>
        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ height: "100%", background: color, boxShadow: `0 0 6px ${color}`, borderRadius: 2 }} />
      </div>
    </div>
  );
}