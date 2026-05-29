import { useEffect, useRef } from "react";
import { C } from "../../constants/theme";
import { riskColor } from "../../utils/colors";
import { clamp } from "../../utils/math";

export function RadarCanvas({ debris }: { debris: any[] }) {
  const ref   = useRef<HTMLCanvasElement>(null);
  const sweep = useRef(0);

  useEffect(() => {
    const c = ref.current; if (!c) return;
    let id: number;
    const draw = () => {
      const W = c.offsetWidth, H = c.offsetHeight;
      c.width = W; c.height = H;
      const ctx = c.getContext("2d")!;
      const cx = W / 2, cy = H / 2, r = Math.min(W, H) / 2 - 8;
      ctx.clearRect(0, 0, W, H);
      [.25, .5, .75, 1].forEach(f => {
        ctx.beginPath(); ctx.arc(cx, cy, r * f, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(0,170,255,.12)"; ctx.lineWidth = 0.5; ctx.stroke();
      });
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) {
        ctx.beginPath(); ctx.moveTo(cx, cy);
        ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
        ctx.strokeStyle = "rgba(0,170,255,.06)"; ctx.lineWidth = 0.5; ctx.stroke();
      }
      sweep.current += 0.03;
      ctx.save();
      ctx.translate(cx, cy); ctx.rotate(sweep.current);
      const g = ctx.createLinearGradient(0, 0, r, 0);
      g.addColorStop(0, "rgba(0,170,255,.5)"); g.addColorStop(1, "rgba(0,170,255,0)");
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, r, -Math.PI / 6, 0);
      ctx.closePath(); ctx.fillStyle = g; ctx.fill();
      ctx.restore();
      debris.forEach(d => {
        const a = (d.id.charCodeAt(3) * 97 + sweep.current * 0.1) % (Math.PI * 2);
        const dr = r * clamp(d.dist / 120);
        const x = cx + dr * Math.cos(a), y = cy + dr * Math.sin(a);
        const col = riskColor(d.risk);
        ctx.shadowBlur = d.risk > 75 ? 10 : 4; ctx.shadowColor = col;
        ctx.beginPath(); ctx.arc(x, y, d.risk > 75 ? 4 : 2.5, 0, Math.PI * 2);
        ctx.fillStyle = col; ctx.fill(); ctx.shadowBlur = 0;
      });
      ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = C.blue; ctx.fill();
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(id);
  }, [debris]);

  return <canvas ref={ref} style={{ width: "100%", height: "100%" }} />;
}