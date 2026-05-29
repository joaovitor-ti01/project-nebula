export interface Satellite {
  id: string;
  name: string;
  alt: number;
  inc: number;
  status: "NOMINAL" | "DEGRADED" | "CRITICAL" | "OFFLINE";
  battery: number;
  temp: number;
  signal: number;
  propulsion: number;
  role: string;
}