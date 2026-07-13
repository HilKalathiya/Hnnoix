import { BarChart3, Info, Wifi } from 'lucide-react'

// Mock ring buffer preview (64-entry conceptual display)
const MOCK_RSRP = Array.from({ length: 64 }, (_, i) => {
  const base  = -95
  const drift = Math.sin(i * 0.3) * 10 + (Math.random() - 0.5) * 5
  return Math.round(base + drift)
})

const MIN_RSRP = Math.min(...MOCK_RSRP)
const MAX_RSRP = Math.max(...MOCK_RSRP)
const AVG_RSRP = (MOCK_RSRP.reduce((a, b) => a + b, 0) / MOCK_RSRP.length).toFixed(1)
const LOW_EVENTS = MOCK_RSRP.filter(v => v < -105).length

function RsrpBar({ value, index }) {
  const norm  = Math.max(0, Math.min(100, (value + 140) / 80 * 100))
  const isGood = value > -100
  const isWarn = value > -110 && value <= -100
  const isBad  = value <= -110
  const barClass = isGood ? 'rsrp-bar-good' : isWarn ? 'rsrp-bar-warn' : 'rsrp-bar-bad'

  return (
    <div className="flex flex-col items-center gap-0.5 flex-1 group cursor-default" title={`Entry ${index + 1}: ${value} dBm`}>
      <div className="relative w-full flex flex-col justify-end" style={{ height: '72px' }}>
        <div
          className={`w-full ${barClass} rounded-t transition-all duration-300 opacity-80 group-hover:opacity-100 group-hover:scale-y-105`}
          style={{ height: `${norm}%`, transformOrigin: 'bottom', minHeight: '2px' }}
        />
        {/* Glow top */}
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ background: isGood ? '#00e85c' : isWarn ? '#f59e0b' : '#ff4d6d', boxShadow: `0 0 4px ${isGood ? '#00e85c' : isWarn ? '#f59e0b' : '#ff4d6d'}`, top: `${100 - norm}%` }}
        />
      </div>
    </div>
  )
}

export default function MdtPage() {
  const stats = [
    { label: 'Min RSRP',   value: `${MIN_RSRP} dBm`,  color: '#ff4d6d', accent: 'rgba(255,77,109,0.12)',   border: 'rgba(255,77,109,0.25)'   },
    { label: 'Max RSRP',   value: `${MAX_RSRP} dBm`,  color: '#00e85c', accent: 'rgba(0,232,92,0.12)',     border: 'rgba(0,232,92,0.25)'     },
    { label: 'Avg RSRP',   value: `${AVG_RSRP} dBm`,  color: '#e2e8f0', accent: 'rgba(255,255,255,0.06)',  border: 'rgba(255,255,255,0.1)'   },
    { label: 'Low Events', value: `${LOW_EVENTS}`,     color: '#f59e0b', accent: 'rgba(245,158,11,0.1)',    border: 'rgba(245,158,11,0.25)'   },
  ]

  return (
    <div className="p-6 space-y-5 animate-fade-in">

      {/* ── Premium Page Header ──────────────────── */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(248,113,113,0.12)', border: '1px solid rgba(248,113,113,0.25)', boxShadow: '0 0 16px rgba(248,113,113,0.15)' }}
          >
            <BarChart3 className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h2
              className="text-[19px] font-extrabold text-slate-100 tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              MDT Module
            </h2>
            <p className="text-[12.5px] text-slate-400 font-medium">Minimization of Drive Tests — 64-entry RSRP ring buffer telemetry</p>
          </div>
        </div>
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg shrink-0"
          style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" style={{ boxShadow: '0 0 6px rgba(245,158,11,0.8)', animation: 'pulse 2s ease infinite' }} />
          <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">Mock Preview</span>
        </div>
      </div>

      {/* ── Premium Ring Buffer Chart ────────────── */}
      <div
        className="rounded-2xl p-6 relative overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, rgba(12,14,22,0.88) 0%, rgba(9,10,17,0.92) 100%)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
        }}
      >
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(248,113,113,0.05) 0%, transparent 70%)' }} />

        <div className="flex items-center justify-between mb-5 relative z-10">
          <div>
          <div
            className="text-[14px] font-bold text-slate-200"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            RSRP Ring Buffer
          </div>
          <div className="text-[11.5px] text-slate-500 font-mono mt-0.5 font-semibold">64 samples · 3GPP TS 36.805</div>
        </div>
          <div className="flex items-center gap-3 text-[10px] font-mono">
            {[
              { color: '#00e85c', label: '> −100 dBm', cls: 'rsrp-bar-good' },
              { color: '#f59e0b', label: '−110 to −100', cls: 'rsrp-bar-warn' },
              { color: '#ff4d6d', label: '< −110 dBm', cls: 'rsrp-bar-bad' },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: color, boxShadow: `0 0 4px ${color}66` }} />
                <span className="text-slate-500">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart area */}
        <div
          className="relative rounded-xl p-4"
          style={{ background: 'rgba(4,5,8,0.7)', border: '1px solid rgba(255,255,255,0.05)' }}
        >
          {/* Y-axis guide lines */}
          {[-80, -95, -110].map((v, i) => (
            <div
              key={v}
              className="absolute left-4 right-4 flex items-center gap-2 pointer-events-none"
              style={{ top: `${[8, 42, 76][i]}%` }}
            >
              <span className="text-[9px] font-mono text-slate-700 shrink-0">{v} dBm</span>
              <div className="flex-1 border-t border-dashed" style={{ borderColor: 'rgba(255,255,255,0.04)' }} />
            </div>
          ))}
          <div className="flex items-end gap-px w-full relative z-10" style={{ height: '72px' }}>
            {MOCK_RSRP.map((v, i) => <RsrpBar key={i} value={v} index={i} />)}
          </div>
          <div className="flex justify-between text-[9px] font-mono text-slate-700 mt-2">
            <span>Entry 1 (oldest)</span>
            <span>Entry 64 (newest)</span>
          </div>
        </div>
      </div>

      {/* ── Premium Stats Grid ───────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map(({ label, value, color, accent, border }) => (
          <div
            key={label}
            className="rounded-xl p-4 card-hover"
            style={{ background: accent, border: `1px solid ${border}`, boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
          >
            <div
            className="text-[10.5px] text-slate-400 mb-2 font-bold uppercase tracking-widest"
          >
            {label}
          </div>
          <div
            className="text-[21px] font-extrabold font-mono"
            style={{ color, letterSpacing: '-0.02em', fontFamily: "'JetBrains Mono', monospace" }}
          >
            {value}
          </div>
          </div>
        ))}
      </div>

      {/* ── Premium Info Banner ──────────────────── */}
      <div
        className="flex items-start gap-3 p-4 rounded-xl"
        style={{
          background: 'rgba(0,148,255,0.06)',
          border: '1px solid rgba(0,148,255,0.18)',
        }}
      >
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
          style={{ background: 'rgba(0,148,255,0.12)', border: '1px solid rgba(0,148,255,0.25)' }}
        >
          <Info className="w-4 h-4 text-signal-400" />
        </div>
        <div>
          <p className="text-[12px] text-signal-400 font-bold mb-0.5">Live Mode Behavior</p>
          <p className="text-[12px] text-slate-400 leading-relaxed">
            In live mode, this page renders the 64-entry MDT ring buffer updated in real-time via WebSocket,
            with RSRP drop event markers and reason codes (<code className="font-mono text-slate-300 text-[11px]">periodic</code> / <code className="font-mono text-slate-300 text-[11px]">low_rsrp</code>) from the Hnnoix nrUE MDT module.
          </p>
        </div>
      </div>
    </div>
  )
}
