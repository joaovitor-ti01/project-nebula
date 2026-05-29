import { useEffect, useRef } from "react";
import { C } from "../../constants/theme";
import { statusColor } from "../../utils/colors";

export function LaserCommCanvas({ sats }: { sats: any[] }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const t   = useRef(0);

  useEffect(() => {
    const c = ref.current; if (!c) return;
    let id: number;
    const pts = sats.map((_, i) => {
      const a = (i / sats.length) * Math.PI * 2;
      return { x: 0.5 + 0.35 * Math.cos(a), y: 0.5 + 0.35 * Math.sin(a) };
    });
    const links = [[0,3],[1,3],[0,1],[2,4],[3,4]];
    const draw = () => {
      const W = c.offsetWidth, H = c.offsetHeight;
      c.width = W; c.height = H;
      const ctx = c.getContext("2d")!;
      t.current += 0.02;
      ctx.clearRect(0, 0, W, H);
      links.forEach(([a, b], li) => {
        const p1 = { x: pts[a].x * W, y: pts[a].y * H };
        const p2 = { x: pts[b].x * W, y: pts[b].y * H };
        const active = sats[a].status !== "CRITICAL" && sats[b].status !== "CRITICAL";
        const col = active ? C.cyan : C.muted;
        ctx.strokeStyle = col + "60"; ctx.lineWidth = active ? 0.8 : 0.3; ctx.setLineDash([4, 4]);
        ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
        ctx.setLineDash([]);
        if (active) {
          const phase = (t.current * 0.8 + li * 0.4) % 1;
          const px = p1.x + (p2.x - p1.x) * phase;
          const py = p1.y + (p2.y - p1.y) * phase;
          ctx.shadowBlur = 8; ctx.shadowColor = C.cyan;
          ctx.beginPath(); ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = C.cyan; ctx.fill(); ctx.shadowBlur = 0;
        }
      });
      sats.forEach((sat, i) => {
        const x = pts[i].x * W, y = pts[i].y * H;
        const col = statusColor(sat.status);
        ctx.shadowBlur = 10; ctx.shadowColor = col;
        ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.fillStyle = C.bg2; ctx.fill();
        ctx.strokeStyle = col; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.fillStyle = col; ctx.font = "8px 'Share Tech Mono',monospace";
        ctx.textAlign = "center";
        ctx.fillText(sat.id, x, y + 18);
        ctx.textAlign = "left";
      });
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(id);
  }, [sats]);

  return <canvas ref={ref} style={{ width: "100%", height: "100%" }} />;
}