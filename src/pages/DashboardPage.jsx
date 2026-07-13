import { Server, Radio, Smartphone, Zap, TrendingUp, Activity, Timer } from 'lucide-react'

/* ─── Animated topology link ─────────────────────────── */
function FlowLink({ label, color = '#7c6aff' }) {
  return (
    <div className="flex flex-col items-center gap-2 shrink-0">
      <div className="relative flex items-center w-12 sm:w-[88px]">
        {/* Track line with gradient */}
        <div
          className="w-full"
          style={{
            height: '2px',
            background: `linear-gradient(90deg, ${color}22, ${color}66, ${color}22)`,
            borderRadius: '1px',
          }}
        />
        {/* Flowing dot */}
        <div
          className="flow-dot"
          style={{ background: color, boxShadow: `0 0 10px 3px ${color}66` }}
        />
      </div>
      <span
        className="hidden sm:inline-block text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full"
        style={{
          color: `${color}99`,
          background: `${color}0d`,
          border: `1px solid ${color}22`,
          letterSpacing: '0.1em',
        }}
      >
        {label}
      </span>
    </div>
  )
}

/* ─── Premium Topology node card ──────────────────────── */
function TopologyNode({ icon: Icon, label, subtitle, status, accentColor, glowColor }) {
  const alive = status === 'online'
  return (
    <div
      className="flex flex-col items-center gap-3 p-5 rounded-2xl card-hover transition-all duration-300 relative overflow-hidden"
      style={{
        background: alive
          ? `linear-gradient(145deg, rgba(14,16,26,0.9) 0%, rgba(10,12,20,0.95) 100%)`
          : 'linear-gradient(145deg, rgba(12,14,22,0.8) 0%, rgba(9,10,17,0.85) 100%)',
        border: `1px solid ${alive ? `${accentColor}30` : 'rgba(255,255,255,0.05)'}`,
        boxShadow: alive
          ? `0 0 40px ${glowColor}, 0 8px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)`
          : '0 4px 16px rgba(0,0,0,0.3)',
        minWidth: '130px',
      }}
    >
      {/* Inner glow when alive */}
      {alive && (
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${accentColor}0d 0%, transparent 70%)` }}
        />
      )}

      {/* Icon ring */}
      <div className="relative z-10">
        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 ${alive ? 'node-pulse' : ''}`}
          style={{
            background: alive
              ? `radial-gradient(circle at 30% 30%, ${accentColor}2a 0%, ${accentColor}0f 100%)`
              : 'rgba(18,20,30,0.8)',
            border: `1px solid ${alive ? `${accentColor}40` : 'rgba(255,255,255,0.05)'}`,
          }}
        >
          <Icon
            className="w-6 h-6 transition-all"
            style={{ color: alive ? accentColor : '#334155' }}
          />
        </div>
        {alive && (
          <div
            className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2"
            style={{
              background: 'var(--neon)',
              borderColor: '#07080c',
              boxShadow: '0 0 10px rgba(0,232,92,0.8)',
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />
        )}
      </div>

      {/* Info */}
      <div className="text-center z-10 relative">
        <div className={`text-[13px] font-bold tracking-tight ${alive ? 'text-slate-100' : 'text-slate-500'}`}
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {label}
        </div>
        <div className="text-[10px] text-slate-500 font-mono mt-0.5 truncate max-w-[120px] font-semibold">
          {subtitle}
        </div>
        <div
          className="mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest"
          style={{
            background: alive ? 'rgba(0,232,92,0.1)' : 'rgba(30,35,50,0.7)',
            color: alive ? 'var(--neon)' : '#475569',
            border: `1px solid ${alive ? 'rgba(0,232,92,0.25)' : 'rgba(255,255,255,0.05)'}`,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: alive ? 'var(--neon)' : '#475569' }}
          />
          {status}
        </div>
      </div>
    </div>
  )
}

/* ─── Premium KPI stat card ───────────────────────────── */
function KpiCard({ icon: Icon, label, value, accentColor, glowColor, trend }) {
  return (
    <div
      className="stat-card p-5 group cursor-default"
      style={{ '--hover-glow': glowColor }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
      />

      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center relative"
          style={{
            background: `${accentColor}12`,
            border: `1px solid ${accentColor}28`,
            boxShadow: `0 0 20px ${accentColor}12`,
          }}
        >
          <Icon className="w-5 h-5" style={{ color: accentColor }} />
        </div>
        <div
          className="flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded-lg"
          style={{ color: '#64748b', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
        >
          <TrendingUp className="w-2.5 h-2.5" />
          {trend}
        </div>
      </div>

      <div
        className="text-[30px] font-extrabold font-mono tabular-nums leading-none"
        style={{ color: accentColor, letterSpacing: '-0.02em', fontFamily: "'JetBrains Mono', monospace" }}
      >
        {value}
      </div>
      <div className="text-[12.5px] text-slate-400 mt-2 font-semibold tracking-wide">{label}</div>

      {/* Bottom shimmer bar on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}55, transparent)` }}
      />
    </div>
  )
}

export default function DashboardPage() {
  const nodes = [
    {
      icon: Server,
      label: 'Hnnoix Core Core',
      subtitle: '127.0.0.5:38412',
      status: 'offline',
      accentColor: '#fb923c',
      glowColor: 'rgba(251,146,60,0.12)',
    },
    {
      icon: Radio,
      label: 'Hnnoix gNB',
      subtitle: 'NR-ARFCN 641272',
      status: 'offline',
      accentColor: '#0094ff',
      glowColor: 'rgba(0,148,255,0.12)',
    },
    {
      icon: Smartphone,
      label: 'nrUE Handset',
      subtitle: 'IMSI 001010000000001',
      status: 'offline',
      accentColor: '#a78bfa',
      glowColor: 'rgba(167,139,250,0.12)',
    },
  ]

  const kpis = [
    {
      icon: Activity,
      label: 'Signal Quality (RSRP)',
      value: '—',
      accentColor: '#00e85c',
      glowColor: 'rgba(0,232,92,0.15)',
      trend: 'N/A',
    },
    {
      icon: TrendingUp,
      label: 'Data Throughput',
      value: '—',
      accentColor: '#0094ff',
      glowColor: 'rgba(0,148,255,0.15)',
      trend: 'N/A',
    },
    {
      icon: Timer,
      label: 'Round-Trip Latency',
      value: '—',
      accentColor: '#7c6aff',
      glowColor: 'rgba(124,106,255,0.15)',
      trend: 'N/A',
    },
  ]

  return (
    <div className="p-6 space-y-5 animate-fade-in">

      {/* ── Premium Network Topology Card ─────────── */}
      <div
        className="rounded-2xl p-6 relative overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, rgba(12,14,22,0.88) 0%, rgba(9,10,17,0.92) 100%)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04)',
        }}
      >
        {/* Radial glow background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 110%, rgba(124,106,255,0.07) 0%, transparent 70%)' }}
        />
        {/* Grid overlay */}
        <div className="absolute inset-0 grid-bg-dense opacity-40 pointer-events-none" />

        {/* Header */}
        <div className="flex items-center gap-3 mb-7 relative z-10">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(0,232,92,0.1)', border: '1px solid rgba(0,232,92,0.22)', boxShadow: '0 0 16px rgba(0,232,92,0.15)' }}
          >
            <Zap className="w-4.5 h-4.5" style={{ color: 'var(--neon)', width: '18px', height: '18px' }} />
          </div>
          <div>
            <h2
              className="text-[15px] font-bold text-slate-100 tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Network Topology
            </h2>
            <p className="text-[11.5px] text-slate-400 font-mono font-semibold">Loopback / RF-SIM mode</p>
          </div>
          <div
            className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-lg"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
            <span className="text-[10px] text-slate-600 font-mono">All Systems Offline</span>
          </div>
        </div>

        {/* Topology diagram */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3 flex-wrap py-4 relative z-10">
          <TopologyNode {...nodes[0]} />
          <div className="rotate-90 sm:rotate-0 my-4 sm:my-0"><FlowLink label="N2 / NGAP" color="#fb923c" /></div>
          <TopologyNode {...nodes[1]} />
          <div className="rotate-90 sm:rotate-0 my-4 sm:my-0"><FlowLink label="Uu / RF-SIM" color="#0094ff" /></div>
          <TopologyNode {...nodes[2]} />
        </div>

        {/* Empty state hint */}
        <div
          className="flex items-center justify-center gap-2 mt-4 relative z-10"
        >
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: '#475569' }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
            </svg>
            Start the network from the control panel to see live topology
          </div>
        </div>
      </div>

      {/* ── Premium KPI Cards ──────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {kpis.map(kpi => <KpiCard key={kpi.label} {...kpi} />)}
      </div>
    </div>
  )
}
