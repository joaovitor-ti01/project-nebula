export const clamp = (v: number, a = 0, b = 100): number =>
  Math.max(a, Math.min(b, v));

export const rand = (a: number, b: number): number =>
  Math.random() * (b - a) + a;
