import { C } from "../../constants/theme";

export function Tag({ children, color = C.blue }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{
      fontFamily: "'Share Tech Mono',monospace", fontSize: 9, letterSpacing: "0.18em",
      color, border: `1px solid ${color}40`, borderRadius: 2, padding: "2px 7px",
      textTransform: "uppercase",
    }}>{children}</span>
  );
}