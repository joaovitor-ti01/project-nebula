import { C } from "../constants/theme";
import { Panel } from "../components/ui/Panel";
import { PanelInner } from "../components/ui/PanelInner";
import { SLabel } from "../components/ui/SLabel";
import { Tag } from "../components/ui/Tag";
import { OrbitronText } from "../components/ui/OrbitronText";
import { PulseDot } from "../components/ui/PulseDot";
import { LaserCommCanvas } from "../components/canvas/LaserCommCanvas";

const LINKS = [
  { a: "NEB-01", b: "NEB-04", bw: "40 Gbps", lat: "1.2ms", status: "ACTIVE",   proto: "OWC-7" },
  { a: "NEB-01", b: "NEB-02", bw: "28 Gbps", lat: "2.1ms", status: "ACTIVE",   proto: "OWC-7" },
  { a: "NEB-02", b: "NEB-04", bw: "35 Gbps", lat: "1.8ms", status: "ACTIVE",   proto: "OWC-7" },
  { a: "NEB-03", b: "NEB-05", bw: "N/A",     lat: "N/A",   status: "DEGRADED", proto: "OWC-7" },
  { a: "NEB-04", b: "NEB-05", bw: "12 Gbps", lat: "4.7ms", status: "PARTIAL",  proto: "OWC-6" },
];

const linkCol = (s: string) => s === "ACTIVE" ? C.cyan : s === "PARTIAL" ? C.orange : C.red;

export function LaserCommPage({ sats }: any) {
  return (
    <div style={{ padding: "66px 20px 32px", maxWidth: 1100, margin: "0 auto" }}>
      <SLabel>LASER OPTICAL COMMUNICATION NETWORK</SLabel>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Panel glow accent={C.cyan} style={{ height: 420 }}>
          <div style={{ padding: "14px 18px 0" }}><SLabel color={C.cyan}>NETWORK TOPOLOGY</SLabel></div>
          <div style={{ height: 360 }}><LaserCommCanvas sats={sats} /></div>
        </Panel>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Panel>
            <PanelInner>
              <SLabel color={C.cyan}>ACTIVE LINKS</SLabel>
              {LINKS.map(l => (
                <div key={`${l.a}-${l.b}`} style={{ padding: "10px 0", borderBottom: `1px solid ${C.dim}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <PulseDot color={linkCol(l.status)} size={6} />
                      <span style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 12, fontWeight: 700, color: C.text, letterSpacing: "0.08em" }}>
                        {l.a} ↔ {l.b}
                      </span>
                    </div>
                    <Tag color={linkCol(l.status)}>{l.status}</Tag>
                  </div>
                  <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 8, color: C.textLo }}>
                    BW: {l.bw} · LAT: {l.lat} · PROTO: {l.proto}
                  </div>
                </div>
              ))}
            </PanelInner>
          </Panel>
          <Panel>
            <PanelInner>
              <SLabel>NETWORK STATS</SLabel>
              {[
                ["TOTAL BANDWIDTH", "83 Gbps", C.cyan],
                ["AVG LATENCY",     "1.8ms",   C.blue],
                ["UPTIME (30D)",    "99.2%",   C.green],
                ["PACKETS SENT",    "8.4B",    C.text],
              ].map(([l, v, c]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${C.dim}` }}>
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