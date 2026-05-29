import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { C } from "../constants/theme";
import { queryNebulaAI } from "../services/nebulaApi";
import { Panel } from "../components/ui/Panel";
import { SLabel } from "../components/ui/SLabel";
import { OrbitronText } from "../components/ui/OrbitronText";
import { PulseDot } from "../components/ui/PulseDot";

export function AIEnginePage({ sats }: any) {
  const [msgs, setMsgs] = useState([
    { role: "ai", text: "MOTOR PREDITIVO DE IA NEBULA — ONLINE\n\nEu sou a inteligência orbital autónoma a bordo do PROJECT NEBULA. Monitorizo a integridade dos satélites, prevejo instabilidades orbitais, calculo riscos de colisão e executo queimas de correção de forma autónoma.\n\nTodos os sistemas nominais. 5 satélites sob supervisão ativa. Pergunte-me qualquer coisa sobre a missão." }
  ]);
  const [input,   setInput]   = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const send = useCallback(async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim(); setInput(""); setLoading(true);
    setMsgs(p => [...p, { role: "user", text: userMsg }]);
    try {
      const history = msgs.map(m => ({ role: m.role === "ai" ? "assistant" : "user", content: m.text })) as any;
      history.push({ role: "user", content: userMsg });
      const reply = await queryNebulaAI(history, sats);
      setMsgs(p => [...p, { role: "ai", text: reply }]);
    } catch {
      setMsgs(p => [...p, { role: "ai", text: "LINK DE COMUNICAÇÃO INTERROMPIDO. Sinal perdido. A tentar nova aquisição..." }]);
    }
    setLoading(false);
  }, [input, loading, msgs, sats]);

  return (
    <div style={{ padding: "66px 20px 32px", maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", height: "calc(100vh - 54px)" }}>
      <SLabel color={C.purple2}>MOTOR PREDITIVO DE IA — CONSCIÊNCIA NEBULA</SLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 14 }}>
        {[
          ["PREVISÕES DE IA REALIZADAS", "1,284", C.purple2],
          ["QUEIMAS DE CORREÇÃO",    "47",    C.blue],
          ["TAXA DE PRECISÃO",       "99.7%", C.green],
        ].map(([l, v, c]) => (
          <Panel key={l} style={{ padding: "10px 14px" }}>
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 8, color: C.textLo, marginBottom: 4 }}>{l}</div>
            <OrbitronText size={20} color={c as string}>{v}</OrbitronText>
          </Panel>
        ))}
      </div>
      <Panel style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }} glow accent={C.purple2}>
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 18px", display: "flex", flexDirection: "column", gap: 14 }}>
          <AnimatePresence initial={false}>
            {msgs.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }}
                style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "88%", padding: "12px 16px", borderRadius: 3,
                  background: m.role === "ai" ? C.dim : `${C.blue}08`,
                  border: `1px solid ${m.role === "ai" ? C.muted : C.blue + "30"}` }}>
                  {m.role === "ai" && (
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                      <PulseDot color={C.purple2} size={5} />
                      <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 8, color: C.purple2, letterSpacing: "0.2em" }}>MOTOR DE IA NEBULA</span>
                    </div>
                  )}
                  <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 11, color: m.role === "ai" ? C.text : "#7aabcc", lineHeight: 1.9, whiteSpace: "pre-line" }}>
                    {m.text}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {loading && (
            <motion.div animate={{ opacity: [.3, 1, .3] }} transition={{ repeat: Infinity, duration: 1.1 }}
              style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: C.purple2, letterSpacing: "0.2em" }}>
              ◈ MOTOR DE IA A PROCESSAR...
            </motion.div>
          )}
          <div ref={endRef} />
        </div>
        <div style={{ padding: "10px 18px 14px", display: "flex", gap: 10 }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Consulte o motor preditivo de IA..."
            style={{ flex: 1, background: "rgba(2,4,8,.9)", border: `1px solid ${C.border}`, borderRadius: 2,
              padding: "10px 14px", fontFamily: "'Share Tech Mono',monospace", fontSize: 11, color: C.text, outline: "none" }} />
          <button onClick={send} disabled={loading} style={{
            background: loading ? C.dim : `${C.purple}cc`, border: "none", borderRadius: 2,
            padding: "10px 18px", fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: "#fff",
            letterSpacing: "0.15em", cursor: loading ? "not-allowed" : "pointer", transition: "all .2s",
            boxShadow: loading ? "none" : `0 0 12px ${C.purple}80`,
          }}>TRANSMITIR</button>
        </div>
      </Panel>
    </div>
  );
}