import { C } from "../constants/theme";
import { statusColor } from "../utils/colors";
import { clamp } from "../utils/math";
import { Panel } from "../components/ui/Panel";
import { PanelInner } from "../components/ui/PanelInner";
import { SLabel } from "../components/ui/SLabel";
import { Tag } from "../components/ui/Tag";
import { OrbitronText } from "../components/ui/OrbitronText";
import { MetricBar } from "../components/ui/MetricBar";

export function TelemetryPage({ sats, selectedSat, onSelectSat }: any) {
  const sat = selectedSat ?? sats[0];
  return (
    <div style={{ padding: "66px 20px 32px", maxWidth: 1100, margin: "0 auto" }}>
      <SLabel>SATELLITE TELEMETRY SYSTEM</SLabel>
      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {sats.map((s: any) => (
            <div key={s.id} style={{ cursor: "pointer" }} onClick={() => onSelectSat(s)}>
              <Panel glow={s.id === sat.id} accent={statusColor(s.status)} style={{ padding: "12px 16px" }}>
                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 8, color: statusColor(s.status), letterSpacing: "0.15em", marginBottom: 4 }}>{s.id}</div>
                <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 4 }}>{s.name}</div>
                <Tag color={statusColor(s.status)}>{s.status}</Tag>
              </Panel>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Panel glow accent={statusColor(sat.status)}>
            <PanelInner>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div>
                  <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: C.textLo, marginBottom: 4 }}>{sat.id} / {sat.role}</div>
                  <OrbitronText size={28} color={statusColor(sat.status)}>{sat.name}</OrbitronText>
                </div>
                <Tag color={statusColor(sat.status)}>{sat.status}</Tag>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
                {[
                  ["ALTITUDE",    `${sat.alt} km`, C.blue],
                  ["INCLINATION", `${sat.inc}°`,   C.cyan],
                  ["TEMPERATURE", `${sat.temp}°C`, sat.temp < -40 ? C.blue : C.text],
                  ["SIGNAL",      `${sat.signal}%`, statusColor(sat.status)],
                ].map(([l, v, c]) => (
                  <div key={l} style={{ padding: "12px", background: C.dim, borderRadius: 2 }}>
                    <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 8, color: C.textLo, marginBottom: 6 }}>{l}</div>
                    <OrbitronText size={20} color={c as string}>{v}</OrbitronText>
                  </div>
                ))}
              </div>
              <SLabel>SUBSYSTEM HEALTH</SLabel>
              <MetricBar label="BATTERY"    value={sat.battery}    color={sat.battery < 30 ? C.red : C.green} />
              <MetricBar label="PROPULSION" value={sat.propulsion} color={sat.propulsion < 50 ? C.orange : C.blue} />
              <MetricBar label="SIGNAL STR" value={sat.signal}     color={C.cyan} />
              <MetricBar label="THERMAL"    value={clamp(100 + sat.temp * 0.8)} color={C.purple2} />
            </PanelInner>
          </Panel>
          <Panel>
            <PanelInner>
              <SLabel color={C.purple2}>AI HEALTH PREDICTION — NEXT 72H</SLabel>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
                {[
                  { label: "FAILURE PROBABILITY", val: sat.status === "CRITICAL" ? "87%" : sat.status === "DEGRADED" ? "34%" : "4%",  c: sat.status === "CRITICAL" ? C.red : sat.status === "DEGRADED" ? C.orange : C.green },
                  { label: "ORBITAL STABILITY",   val: sat.status === "CRITICAL" ? "LOW" : "HIGH",             c: sat.status === "CRITICAL" ? C.red : C.green },
                  { label: "RECOMMENDED ACTION",  val: sat.status === "CRITICAL" ? "CORRECTION BURN" : "NOMINAL", c: C.blue },
                ].map(p => (
                  <div key={p.label} style={{ padding: "12px", background: C.dim, borderRadius: 2 }}>
                    <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 8, color: C.textLo, marginBottom: 6 }}>{p.label}</div>
                    <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 14, fontWeight: 700, color: p.c }}>{p.val}</div>
                  </div>
                ))}
              </div>
            </PanelInner>
          </Panel>
        </div>
      </div>
    </div>
  );
}