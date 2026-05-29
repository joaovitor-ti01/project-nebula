import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { C } from "../../constants/theme";

export function TelemetryChart({ data, dataKey, color, label }: any) {
  return (
    <div>
      <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: C.textLo, letterSpacing: "0.12em", marginBottom: 4 }}>{label}</div>
      <div style={{ height: 60 }}>
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`g-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={color} stopOpacity={0.25} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="t" hide />
            <YAxis domain={[0, 100]} hide />
            <Tooltip contentStyle={{ background: C.bg2, border: `1px solid ${C.border}`, color, fontFamily: "monospace", fontSize: 10 }}
              formatter={(v: number) => [`${Math.round(v)}%`, label]} />
            <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={1.5} fill={`url(#g-${dataKey})`} dot={false} isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}