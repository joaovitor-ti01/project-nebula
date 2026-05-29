import { C } from "../../constants/theme";

export function SLabel({ children, color = C.blue }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{
      fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color, letterSpacing: "0.3em",
      textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8, marginBottom: 14,
    }}>
      <span style={{ width: 14, height: 1, background: color, display: "inline-block" }} />
      {children}
      <span style={{ flex: 1, height: 1, background: C.dim, display: "inline-block" }} />
    </div>
  );
}