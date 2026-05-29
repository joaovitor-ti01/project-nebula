import { C } from "../constants/theme";
import type { Satellite } from "../types/satellite";

export const statusColor = (status: Satellite["status"]): string =>
  ({ NOMINAL: C.green, DEGRADED: C.orange, CRITICAL: C.red, OFFLINE: "#555" }[status] ?? C.muted);

export const riskColor = (risk: number): string =>
  risk > 75 ? C.red : risk > 50 ? C.orange : risk > 25 ? C.yellow : C.green;