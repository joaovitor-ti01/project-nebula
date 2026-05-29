import { motion } from "framer-motion";
import { C } from "../../constants/theme";

export function PulseDot({ color = C.green, size = 8 }: { color?: string; size?: number }) {
  return (
    <motion.div animate={{ scale: [1, 1.4, 1], opacity: [1, .5, 1] }} transition={{ repeat: Infinity, duration: 2 }}
      style={{ width: size, height: size, borderRadius: "50%", background: color, boxShadow: `0 0 ${size}px ${color}`, flexShrink: 0 }} />
  );
}