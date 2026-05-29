import { useState, useEffect } from "react";
import type { TelemetryPoint } from "../types/telemetry";
import { clamp, rand } from "../utils/math";

const makeInitial = (): TelemetryPoint[] =>
  Array.from({ length: 20 }, (_, i) => ({
    t: i,
    battery:    80 + rand(-8, 8),
    signal:     85 + rand(-10, 5),
    propulsion: 82 + rand(-12, 8),
    coverage:   90 + rand(-5, 5),
  }));

export function useTelemetryHistory(active: boolean) {
  const [telHistory, setTelHistory] = useState<TelemetryPoint[]>(makeInitial);

  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => {
      setTelHistory(prev => {
        const last = prev[prev.length - 1];
        return [
          ...prev.slice(-39),
          {
            t: last.t + 1,
            battery:    clamp(last.battery    + rand(-2, 2)),
            signal:     clamp(last.signal     + rand(-2, 2)),
            propulsion: clamp(last.propulsion + rand(-2, 2)),
            coverage:   clamp(last.coverage   + rand(-1, 1), 85, 99),
          },
        ];
      });
    }, 2500);
    return () => clearInterval(t);
  }, [active]);

  return { telHistory };
}