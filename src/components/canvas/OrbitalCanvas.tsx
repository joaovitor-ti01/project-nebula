import { useEffect, useRef } from "react";
import { statusColor, riskColor } from "../../utils/colors";

export function OrbitalCanvas({ sats, debris }: { sats: any[]; debris: any[] }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const anglesRef = useRef(sats.map(() => Math.random() * Math.PI * 2));

  useEffect(() => {
    const c = ref.current; if (!c) return;
    let id: number;
    const draw = () => {
      const W = c.offsetWidth, H = c.offsetHeight;
      c.width = W; c.height = H;
      const ctx = c.getContext("2d")!;
      const cx = W / 2, cy = H / 2;
      ctx.clearRect(0, 0, W, H);
      [0.18, 0.28, 0.38, 0.5].forEach(f => {
        ctx.beginPath(); ctx.arc(cx, cy, Math.min(W, H) * f, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(0,80,160,.12)"; ctx.lineWidth = 0.5; ctx.stroke();
      });
      ctx.strokeStyle = "rgba(0,80,160,.08)"; ctx.lineWidth = 0.5;
      [[cx,0,cx,H],[0,cy,W,cy]].forEach(([x1,y1,x2,y2]) => {
        ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
      });
      const eg = ctx.createRadialGradient(cx, cy, 2, cx, cy, 22);
      eg.addColorStop(0, "#0a3060"); eg.addColorStop(1, "#041830");
      ctx.beginPath(); ctx.arc(cx, cy, 22, 0, Math.PI * 2);
      ctx.fillStyle = eg; ctx.fill();
      ctx.strokeStyle = "#00aaff40"; ctx.lineWidth = 1; ctx.stroke();
      debris.forEach(d => {
        const a = (d.id.charCodeAt(3) * 73) % (Math.PI * 2);
        const r = Math.min(W, H) * (0.2 + d.dist / 200);
        const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
        ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = riskColor(d.risk) + "99"; ctx.fill();
      });
      sats.forEach((sat, i) => {
        anglesRef.current[i] += 0.004 + i * 0.001;
        const r = Math.min(W, H) * (0.22 + i * 0.06);
        const x = cx + r * Math.cos(anglesRef.current[i]);
        const y = cy + r * Math.sin(anglesRef.current[i] * 0.6);
        ctx.beginPath(); ctx.ellipse(cx, cy, r, r * 0.6, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `${statusColor(sat.status)}18`; ctx.lineWidth = 0.5; ctx.stroke();
        const col = statusColor(sat.status);
        ctx.shadowBlur = 8; ctx.shadowColor = col;
        ctx.beginPath(); ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = col; ctx.fill(); ctx.shadowBlur = 0;
        ctx.fillStyle = col; ctx.font = "8px 'Share Tech Mono',monospace";
        ctx.fillText(sat.id, x + 6, y + 3);
      });
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(id);
  }, [sats, debris]);

  return <canvas ref={ref} style={{ width: "100%", height: "100%" }} />;
}