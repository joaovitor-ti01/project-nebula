import { C } from "../../constants/theme";

interface OrbitronTextProps {
  children: React.ReactNode;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}

export function OrbitronText({ children, size = 32, color = C.blue, style = {} }: OrbitronTextProps) {
  return (
    <span style={{
      fontFamily: "'Exo 2',sans-serif", fontSize: size, fontWeight: 900, color,
      letterSpacing: "0.1em", textShadow: `0 0 20px ${color}60`, ...style,
    }}>{children}</span>
  );
}