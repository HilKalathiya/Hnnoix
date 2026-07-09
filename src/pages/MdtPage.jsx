import { BarChart3, Construction, Info } from 'lucide-react'

// Mock ring buffer preview (64-entry conceptual display)
const MOCK_RSRP = Array.from({ length: 64 }, (_, i) => {
  const base  = -95
  const drift = Math.sin(i * 0.3) * 8 + (Math.random() - 0.5) * 4
  return Math.round(base + drift)
})

function RsrpBar({ value }) {
  const norm  = Math.max(0, Math.min(100, (value + 140) / 80 * 100))
  const color = value > -100
    ? 'bg-neon-400'
    : value > -110
    ? 'bg-amber-400'
    : 'bg-danger-400'
  return (
    <div className="flex flex-col items-center gap-0.5 flex-1">
      <div className="relative w-full flex flex-col justify-end" style={{ height: '60px' }}>
        <div
          className={`w-full ${color} rounded-sm transition-all duration-300 opacity-80 hover:opacity-100`}
          style={{ height: `${norm}%` }}
          title={`${value} dBm`}
        />
      </div>
    </div>
  )
}

export default function MdtPage() {
  return (
    <div className="p-6 space-y-5 animate-fade-in">
      <div className="flex items-center gap-3 mb-2">
        <BarChart3 className="w-5 h-5 text-red-400" />
        <div>
          <h2 className="text-base font-semibold text-slate-100">MDT — Minimization of Drive Tests</h2>
          <p className="text-xs text-slate-500">Ring buffer telemetry · 64-entry RSRP history</p>
        </div>
        <div className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-400/10 border border-amber-400/20">
          <Construction className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-xs text-amber-400 font-semibold">Mock Preview</span>
        </div>
      </div>

      {/* Ring buffer chart */}
      <div className="glass rounded-2xl p-5 border border-white/5">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-semibold text-slate-200">RSRP Ring Buffer (64 entries)</div>
          <div className="flex items-center gap-3 text-[10px] font-mono">
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-neon-400" /><span className="text-slate-500">&gt; -100 dBm</span></div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-amber-400" /><span className="text-slate-500">-110 – -100</span></div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-danger-400" /><span className="text-slate-500">&lt; -110 dBm</span></div>
          </div>
        </div>
        <div className="flex items-end gap-px w-full">
          {MOCK_RSRP.map((v, i) => <RsrpBar key={i} value={v} />)}
        </div>
        <div className="flex justify-between text-[9px] font-mono text-slate-700 mt-1">
          <span>Entry 1 (oldest)</span>
          <span>Entry 64 (newest)</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Min RSRP',  value: `${Math.min(...MOCK_RSRP)} dBm`, cls: 'text-danger-400' },
          { label: 'Max RSRP',  value: `${Math.max(...MOCK_RSRP)} dBm`, cls: 'text-neon-400'   },
          { label: 'Avg RSRP',  value: `${(MOCK_RSRP.reduce((a,b) => a+b, 0) / MOCK_RSRP.length).toFixed(1)} dBm`, cls: 'text-slate-300' },
          { label: 'Low Events',value: `${MOCK_RSRP.filter(v => v < -105).length}`, cls: 'text-amber-400' },
        ].map(({ label, value, cls }) => (
          <div key={label} className="glass rounded-xl p-4 border border-white/5 card-hover">
            <div className="text-xs text-slate-500 mb-1">{label}</div>
            <div className={`text-lg font-bold font-mono ${cls}`}>{value}</div>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-2 p-3 rounded-lg bg-signal-400/5 border border-signal-400/15">
        <Info className="w-4 h-4 text-signal-400 mt-0.5 shrink-0" />
        <p className="text-xs text-slate-400">
          In live mode, this page will render the 64-entry MDT ring buffer updated in real-time via WebSocket,
          with RSRP drop event markers and reason codes (periodic / low_rsrp) from the Duranta nrUE MDT module.
        </p>
      </div>
    </div>
  )
}
