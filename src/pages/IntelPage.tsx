import { motion } from "framer-motion";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { C } from "../constants/theme";
import { AI_EVENTS } from "../constants/events";
import { Panel } from "../components/ui/Panel";
import { PanelInner } from "../components/ui/PanelInner";
import { SLabel } from "../components/ui/SLabel";
import { OrbitronText } from "../components/ui/OrbitronText";

export function IntelPage({ sats, telHistory }: any) {
  return (
    <div style={{ padding: "66px 20px 32px", maxWidth: 1100, margin: "0 auto" }}>
      <SLabel>RESUMO DA INTELIGÊNCIA DA MISSÃO</SLabel>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Panel>
          <PanelInner>
            <SLabel>REGISTO DA MISSÃO</SLabel>
            {AI_EVENTS.map((ev, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * .06 }}
                style={{ display: "flex", gap: 10, padding: "9px 0", borderBottom: `1px solid ${C.dim}`, alignItems: "flex-start" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: ev.sev === "critical" ? C.red : ev.sev === "warn" ? C.orange : C.blue, flexShrink: 0, marginTop: 3 }} />
                <div>
                  <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 10, color: ev.sev === "critical" ? C.red : ev.sev === "warn" ? C.orange : C.blue, lineHeight: 1.5 }}>{ev.msg}</div>
                  <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 8, color: C.textLo, marginTop: 2 }}>{ev.time} UTC</div>
                </div>
              </motion.div>
            ))}
          </PanelInner>
        </Panel>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Panel glow accent={C.blue}>
            <PanelInner>
              <SLabel>INTEGRIDADE DA FROTA AO LONGO DO TEMPO</SLabel>
              <div style={{ height: 180 }}>
                <ResponsiveContainer>
                  <LineChart data={telHistory}>
                    <XAxis dataKey="t" hide />
                    <YAxis domain={[0, 100]} hide />
                    <Tooltip contentStyle={{ background: C.bg2, border: `1px solid ${C.border}`, fontFamily: "monospace", fontSize: 10, color: C.text }} />
                    <Line type="monotone" dataKey="battery"    stroke={C.green}   strokeWidth={1.5} dot={false} name="Bateria"    isAnimationActive={false} />
                    <Line type="monotone" dataKey="signal"     stroke={C.blue}    strokeWidth={1.5} dot={false} name="Sinal"     isAnimationActive={false} />
                    <Line type="monotone" dataKey="propulsion" stroke={C.purple2} strokeWidth={1.5} dot={false} name="Propulsão" isAnimationActive={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </PanelInner>
          </Panel>
          <Panel>
            <PanelInner>
              <SLabel color={C.purple2}>ARQUITETURA</SLabel>
              {[
                ["MOTOR ORBITAL",       "Simulação e correção de trajetória"],
                ["DETEÇÃO DE DETRITOS",     "Varredura de radar + pontuação de risco por ML"],
                ["MOTOR PREDITIVO DE IA", "Análise de integridade e previsão de falhas"],
                ["SISTEMA DE CORREÇÃO",    "Gestão autónoma de propulsores"],
                ["REDE DE COMUNICAÇÃO LASER",      "Links óticos intersatelitais"],
                ["INTERFACE DE CONTROLO DA MISSÃO",   "Painel cinematográfico em tempo real"],
              ].map(([name, desc]) => (
                <div key={name} style={{ padding: "8px 0", borderBottom: `1px solid ${C.dim}` }}>
                  <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 10, color: C.blue, letterSpacing: "0.1em", marginBottom: 2 }}>{name}</div>
                  <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: C.textLo }}>{desc}</div>
                </div>
              ))}
            </PanelInner>
          </Panel>
        </div>
      </div>
    </div>
  );
}