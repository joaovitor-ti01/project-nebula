import { C } from "../../constants/theme";

interface PanelProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  glow?: boolean;
  accent?: string;
}

export function Panel({ children, style = {}, glow, accent = C.blue }: PanelProps) {
  return (
    <div style={{
      background: C.panel,
      border: `1px solid ${glow ? accent + "55" : C.border}`,
      borderRadius: 3,
      backdropFilter: "blur(16px)",
      boxShadow: glow ? `0 0 32px ${accent}18,inset 0 0 60px ${accent}06` : "none",
      position: "relative",
      overflow: "hidden",
      ...style,
    }}>
      {glow && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${accent}80,transparent)` }} />}
      {children}
    </div>
  );
}