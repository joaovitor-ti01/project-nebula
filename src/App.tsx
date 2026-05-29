import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { C } from "./constants/theme";
import { DEBRIS_FIELD } from "./constants/debris";
import { useSatellites } from "./hooks/useSatellites";
import { useTelemetryHistory } from "./hooks/useTelemetryHistory";
import { FontLoader } from "./components/layout/FontLoader";
import { Particles } from "./components/layout/Particles";
import { Scanlines } from "./components/layout/Scanlines";
import { Boot } from "./components/layout/Boot";
import { Nav } from "./components/layout/Nav";
import { ControlPage } from "./pages/ControlPage";
import { TelemetryPage } from "./pages/TelemetryPage";
import { DebrisPage } from "./pages/DebrisPage";
import { AIEnginePage } from "./pages/AIEnginePage";
import { LaserCommPage } from "./pages/LaserCommPage";
import { IntelPage } from "./pages/IntelPage";

export default function App() {
  const [booted,      setBooted]   = useState(false);
  const [tab,         setTab]      = useState("CONTROL");
  const [selectedSat, setSelected] = useState<any>(null);

  const { sats }       = useSatellites(booted);
  const { telHistory } = useTelemetryHistory(booted);

  // Mantendo o callback isolado para performance
  const handleBoot = useCallback(() => setBooted(true), []);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, overflowX: "hidden", fontFamily: "'Share Tech Mono',monospace" }}>
      <style>{`
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: ${C.bg2}; }
        ::-webkit-scrollbar-thumb { background: ${C.muted}; }
        * { box-sizing: border-box; }
      `}</style>
      <FontLoader />
      <Particles />
      <Scanlines />
      <AnimatePresence>
        {!booted && <Boot onDone={handleBoot} />}
      </AnimatePresence>
      {booted && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          {/* O componente Nav recebe o estado da aba atual */}
          <Nav active={tab} setActive={setTab} />
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .3 }}>
              {/* As checagens abaixo precisam usar os IDs exatos em inglês para não quebrar a navegação */}
              {tab === "CONTROLO"    && <ControlPage   sats={sats} telHistory={telHistory} debris={DEBRIS_FIELD} onSelectSat={(s: any) => { setSelected(s); setTab("TELEMETRY"); }} />}
              {tab === "TELEMETRIA"  && <TelemetryPage sats={sats} selectedSat={selectedSat} onSelectSat={setSelected} />}
              {tab === "DETRITOS"     && <DebrisPage    debris={DEBRIS_FIELD} />}
              {tab === "MOTOR IA"  && <AIEnginePage  sats={sats} />}
              {tab === "COMUNICAÇÃO LASER" && <LaserCommPage sats={sats} />}
              {tab === "INFORMAÇÃO"      && <IntelPage     sats={sats} telHistory={telHistory} />}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}