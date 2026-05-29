import type { Satellite } from "../types/satellite";

export const INITIAL_SATS: Satellite[] = [
  { id: "NEB-01", name: "NEBULA PRIME",    alt: 420, inc: 51.6, status: "NOMINAL",  battery: 94, temp: -12, signal: 98, propulsion: 91, role: "SURVEILLANCE" },
  { id: "NEB-02", name: "NEBULA SENTINEL", alt: 550, inc: 97.8, status: "NOMINAL",  battery: 87, temp: -8,  signal: 94, propulsion: 88, role: "TELEMETRY" },
  { id: "NEB-03", name: "NEBULA GHOST",    alt: 720, inc: 28.5, status: "DEGRADED", battery: 41, temp: -31, signal: 34, propulsion: 52, role: "COMMS RELAY" },
  { id: "NEB-04", name: "NEBULA APEX",     alt: 380, inc: 65.0, status: "NOMINAL",  battery: 96, temp: -5,  signal: 99, propulsion: 95, role: "NAVIGATION" },
  { id: "NEB-05", name: "NEBULA VEIL",     alt: 860, inc: 45.2, status: "CRITICAL", battery: 12, temp: -67, signal: 11, propulsion: 8,  role: "DEBRIS WATCH" },
];

export const BOOT_LINES = [
  { text: "NEBULA ORBITAL INTELLIGENCE SYSTEM v4.7.2", delay: 0 },
  { text: "Initializing deep-space array network...",  delay: 300 },
  { text: "Loading satellite constellation data...",   delay: 600 },
  { text: "Connecting AI predictive engine...",        delay: 900 },
  { text: "Calibrating debris detection sensors...",   delay: 1200 },
  { text: "Synchronizing laser comm grid...",          delay: 1500 },
  { text: "Running orbital trajectory models...",      delay: 1800 },
  { text: "All systems nominal. Mission active.",      delay: 2100, highlight: true },
  { text: "▶  PROJECT NEBULA ONLINE",                  delay: 2500, primary: true },
];

export const TABS = ["CONTROL", "TELEMETRY", "DEBRIS", "AI ENGINE", "LASER COMM", "INTEL"] as const;