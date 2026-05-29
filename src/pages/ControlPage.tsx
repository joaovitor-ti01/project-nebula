import { motion } from "framer-motion";
import { C } from "../constants/theme";
import { DEBRIS_FIELD } from "../constants/debris";
import { statusColor, riskColor } from "../utils/colors";
import { Panel } from "../components/ui/Panel";
import { PanelInner } from "../components/ui/PanelInner";
import { SLabel } from "../components/ui/SLabel";
import { Tag } from "../components/ui/Tag";
import { OrbitronText } from "../components/ui/OrbitronText";
import { PulseDot } from "../components/ui/PulseDot";
import { OrbitalCanvas } from "../components/canvas/OrbitalCanvas";
import { TelemetryChart } from "../components/ui/TelemetryChart";

export function ControlPage({ sats, telHistory, debris, onSelectSat }: any) {
  const nominal  = sats.filter((s: any) => s.status === "NOMINAL").length;
  const critRisk = debris.find((d: any) => d.risk > 80);
  return (
    <div style={{ padding: "66px 20px 32px", maxWidth: 1280, margin: "0 auto" }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 24 }}>
          <div>
            <OrbitronText size={11} color={C.textLo} style={{ letterSpacing: "0.3em", fontSize: 10, display: "block", marginBottom: 6, fontWeight: 200 }}>
              AUTONOMOUS ORBITAL INTELLIGENCE — YEAR 2084
            </OrbitronText>
            <OrbitronText size={42} color={C.blue}>PROJECT NEBULA</OrbitronText>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: C.textLo, marginBottom: 4 }}>MISSION ELAPSED TIME</div>
            <OrbitronText size={22} color={C.cyan}>847:12:33</OrbitronText>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 12, marginBottom: 20 }}>
          {[
            { l: "ACTIVE SATELLITES", v: `${nominal}/5`,             c: C.green },
            { l: "DEBRIS TRACKED",    v: "247",                       c: C.blue },
            { l: "COLLISION RISK",    v: `${critRisk?.risk ?? 0}%`,   c: critRisk ? C.red : C.green },
            { l: "ORBITAL COVERAGE",  v: "94.7%",                     c: C.cyan },
            { l: "AI CORRECTIONS",    v: "1,284",                     c: C.purple2 },
            { l: "UPLINK STATUS",     v: "OPTIMAL",                   c: C.green },
          ].map(m => (
            <Panel key={m.l} style={{ padding: "14px 18px" }}>
              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 8, color: C.textLo, letterSpacing: "0.2em", marginBottom: 6 }}>{m.l}</div>
              <OrbitronText size={24} color={m.c}>{m.v}</OrbitronText>
            </Panel>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 16, marginBottom: 16 }}>
          <Panel glow style={{ height: 400 }}>
            <div style={{ padding: "14px 18px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <SLabel>ORBITAL VISUALIZATION</SLabel>
              <Tag>LIVE</Tag>
            </div>
            <div style={{ height: 340 }}><OrbitalCanvas sats={sats} debris={debris} /></div>
          </Panel>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Panel>
              <PanelInner>
                <SLabel>CONSTELLATION STATUS</SLabel>
                {sats.map((sat: any) => (
                  <div key={sat.id} onClick={() => onSelectSat(sat)}
                    style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: `1px solid ${C.dim}`, cursor: "pointer" }}>
                    <PulseDot color={statusColor(sat.status)} size={7} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 11, fontWeight: 700, color: C.text, letterSpacing: "0.06em" }}>{sat.name}</div>
                      <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 8, color: C.textLo }}>{sat.id} — {sat.role} — {sat.alt}km ALT</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 }}>
                      <Tag color={statusColor(sat.status)}>{sat.status}</Tag>
                      <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 8, color: C.textLo }}>SIG {sat.signal}%</div>
                    </div>
                  </div>
                ))}
              </PanelInner>
            </Panel>
            <Panel>
              <PanelInner>
                <SLabel color={C.red}>DEBRIS PROXIMITY ALERTS</SLabel>
                {DEBRIS_FIELD.slice(0, 3).map(d => (
                  <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <div style={{ width: 4, height: 32, background: riskColor(d.risk), borderRadius: 1, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 10, color: riskColor(d.risk) }}>{d.id}</span>
                        <span style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 12, fontWeight: 700, color: riskColor(d.risk) }}>{d.risk}% RISK</span>
                      </div>
                      <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 8, color: C.textLo }}>{d.dist}km — {d.vel}km/s — {d.type}</div>
                    </div>
                  </div>
                ))}
              </PanelInner>
            </Panel>
          </div>
        </div>
        <Panel>
          <PanelInner>
            <SLabel>FLEET TELEMETRY — REAL TIME</SLabel>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 16 }}>
              <TelemetryChart data={telHistory} dataKey="battery"    color={C.green}   label="BATTERY AVG" />
              <TelemetryChart data={telHistory} dataKey="signal"     color={C.blue}    label="SIGNAL STRENGTH" />
              <TelemetryChart data={telHistory} dataKey="propulsion" color={C.purple2} label="PROPULSION" />
              <TelemetryChart data={telHistory} dataKey="coverage"   color={C.cyan}    label="ORBITAL COVERAGE" />
            </div>
          </PanelInner>
        </Panel>
      </motion.div>
    </div>
  );
}