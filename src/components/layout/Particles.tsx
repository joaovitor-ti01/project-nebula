import { useEffect, useRef } from "react";
import { rand } from "../../utils/math";

export function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    const pts = Array.from({ length: 180 }, () => ({
      x: rand(0, window.innerWidth), y: rand(0, window.innerHeight),
      vx: rand(-0.15, 0.15), vy: rand(-0.15, 0.15),
      r: rand(0.3, 1.8), a: rand(0.04, 0.35),
      color: Math.random() > 0.7 ? [0,170,255] : Math.random() > 0.5 ? [124,58,237] : [0,229,255],
    }));
    let id: number;
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = c.width;  if (p.x > c.width)  p.x = 0;
        if (p.y < 0) p.y = c.height; if (p.y > c.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.join(",")},${p.a})`; ctx.fill();
      });
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}