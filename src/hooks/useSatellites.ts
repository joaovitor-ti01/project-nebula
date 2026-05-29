import { useState, useEffect } from "react";
import type { Satellite } from "../types/satellite";
import { INITIAL_SATS } from "../constants/satellite";
import { clamp, rand } from "../utils/math";

export function useSatellites(active: boolean) {
  const [sats, setSats] = useState<Satellite[]>(INITIAL_SATS);

  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => {
      setSats(prev =>
        prev.map(s => ({
          ...s,
          signal:  clamp(s.signal  + rand(-2, 2)),
          battery: clamp(s.battery + (s.battery > 15 ? rand(-0.5, 0.3) : rand(-0.1, 0.6))),
        }))
      );
    }, 2500);
    return () => clearInterval(t);
  }, [active]);

  return { sats };
}