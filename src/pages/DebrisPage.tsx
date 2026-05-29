import { C } from "../constants/theme";
import { riskColor } from "../utils/colors";
import { Panel } from "../components/ui/Panel";
import { PanelInner } from "../components/ui/PanelInner";
import { SLabel } from "../components/ui/SLabel";
import { OrbitronText } from "../components/ui/OrbitronText";
import { MetricBar } from "../components/ui/MetricBar";
import { RadarCanvas } from "../components/canvas/RadarCanvas";

export function DebrisPage({ debris }: any) {
  return (
    <div style={{ padding: "66px 20px 32px", maxWidth: 1100, margin: "0 auto" }}>
      <SLabel>DEBRIS DETECTION & COLLISION PREDICTION SYSTEM</SLabel>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Panel glow accent={C.red} style={{ height: 420 }}>
          <div style={{ padding: "14px 18px 0" }}><SLabel color={C.red}>ACTIVE RADAR SWEEP</SLabel></div>
          <div style={{ height: 360 }}><RadarCanvas debris={debris} /></div>
        </Panel>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Panel>
            <PanelInner>
              <SLabel color={C.red}>COLLISION THREAT MATRIX</SLabel>
              {debris.map((d: any) => (
                <div key={d.id} style={{ padding: "12px 0", borderBottom: `1px solid ${C.dim}`, display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 3, background: riskColor(d.risk), borderRadius: 2, alignSelf: "stretch" }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 10, color: C.text, letterSpacing: "0.1em" }}>{d.id}</span>
                      <OrbitronText size={16} color={riskColor(d.risk)}>{d.risk}%</OrbitronText>
                    </div>
                    <MetricBar label="" value={d.risk} color={riskColor(d.risk)} />
                    <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 8, color: C.textLo }}>
                      DIST {d.dist}km · VEL {d.vel}km/s · {d.type} · ORIGIN: {d.origin}
                    </div>
                  </div>
                </div>
              ))}
            </PanelInner>
          </Panel>
          <Panel>
            <PanelInner>
              <SLabel>ORBITAL DEBRIS STATISTICS</SLabel>
              {[
                ["TOTAL TRACKED OBJECTS", "18,724", C.blue],
                ["OBJECTS >10CM",         "1,892",  C.cyan],
                ["ACTIVE COLLISION RISKS","12",      C.red],
                ["KESSLER SYNDROME RISK", "34%",     C.orange],
              ].map(([l, v, c]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.dim}` }}>
                  <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: C.textLo }}>{l}</span>
                  <OrbitronText size={14} color={c as string}>{v}</OrbitronText>
                </div>
              ))}
            </PanelInner>
          </Panel>
        </div>
      </div>
    </div>
  );
}