import type { Satellite } from "../types/satellite";

export const INITIAL_SATS: Satellite[] = [
  { id: "NEB-01", name: "NEBULA PRIME",    alt: 420, inc: 51.6, status: "NOMINAL",  battery: 94, temp: -12, signal: 98, propulsion: 91, role: "VIGILÂNCIA" },
  { id: "NEB-02", name: "NEBULA SENTINEL", alt: 550, inc: 97.8, status: "NOMINAL",  battery: 87, temp: -8,  signal: 94, propulsion: 88, role: "TELEMETRIA" },
  { id: "NEB-03", name: "NEBULA GHOST",    alt: 720, inc: 28.5, status: "DEGRADED", battery: 41, temp: -31, signal: 34, propulsion: 52, role: "RETRANSMISSÃO COMMS" },
  { id: "NEB-04", name: "NEBULA APEX",     alt: 380, inc: 65.0, status: "NOMINAL",  battery: 96, temp: -5,  signal: 99, propulsion: 95, role: "NAVEGAÇÃO" },
  { id: "NEB-05", name: "NEBULA VEIL",     alt: 860, inc: 45.2, status: "CRITICAL", battery: 12, temp: -67, signal: 11, propulsion: 8,  role: "MONITORIZAÇÃO DETRITOS" },
];

export const BOOT_LINES = [
  { text: "SISTEMA DE INTELIGÊNCIA ORBITAL NEBULA v4.7.2", delay: 0 },
  { text: "A inicializar rede de antenas de espaço profundo...", delay: 300 },
  { text: "A carregar dados da constelação de satélites...",   delay: 600 },
  { text: "A ligar motor preditivo de IA...",                  delay: 900 },
  { text: "A calibrar sensores de deteção de detritos...",     delay: 1200 },
  { text: "A sincronizar grelha de comunicação laser...",       delay: 1500 },
  { text: "A executar modelos de trajetória orbital...",        delay: 1800 },
  { text: "Todos os sistemas nominais. Missão ativa.",         delay: 2100, highlight: true },
  { text: "▶  PROJETO NEBULA ONLINE",                          delay: 2500, primary: true },
];

export const TABS = ["CONTROLO", "TELEMETRIA", "DETRITOS", "MOTOR IA", "COMUNICAÇÃO LASER", "INFORMAÇÃO"] as const;