export function Scanlines() {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none",
      background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,10,30,.04) 2px,rgba(0,10,30,.04) 4px)",
    }} />
  );
}