import { Server, Radio, Smartphone, Zap, TrendingUp, Activity, Timer } from 'lucide-react'

/* ─── Animated topology link ─────────────────────────── */
function FlowLink({ label, color = '#7c6aff' }) {
  return (
    <div className="flex flex-col items-center gap-1.5 shrink-0">
      <div className="relative flex items-center" style={{ width: '80px' }}>
        {/* Track line */}
        <div
          className="w-full h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${color}55, transparent)` }}
        />
        {/* Flowing dot */}
        <div
          className="flow-dot"
          style={{ background: color, boxShadow: `0 0 8px 2px ${color}88` }}
        />
      </div>
      <span className="text-[9px] font-mono uppercase tracking-wider"
            style={{ color: `${color}88` }}>
        {label}
      </span>
    </div>
  )
}

/* ─── Topology node card ──────────────────────────────── */
function TopologyNode({ icon: Icon, label, subtitle, status, accentColor, glowColor }) {
  const alive = status === 'online'
  return (
    <div
      className="flex flex-col items-center gap-3 p-5 rounded-2xl card-hover transition-all duration-300"
      style={{
        background: 'rgba(14, 16, 26, 0.8)',
        border: `1px solid ${alive ? `${accentColor}30` : 'rgba(255,255,255,0.06)'}`,
        boxShadow: alive ? `0 0 30px ${glowColor}` : 'none',
      }}
    >
      {/* Icon ring */}
      <div className="relative">
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${alive ? 'node-pulse' : ''}`}
          style={{
            background: alive
              ? `radial-gradient(circle at 30% 30%, ${accentColor}30 0%, ${accentColor}10 100%)`
              : 'rgba(20,22,32,0.8)',
            border: `1px solid ${alive ? `${accentColor}40` : 'rgba(255,255,255,0.06)'}`,
          }}
        >
          <Icon
            className="w-7 h-7 transition-all"
            style={{ color: alive ? accentColor : '#334155' }}
          />
        </div>
        {alive && (
          <div
            className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 animate-pulse"
            style={{
              background: 'var(--neon)',
              borderColor: '#07080c',
              boxShadow: '0 0 8px rgba(0,232,92,0.7)',
            }}
          />
        )}
      </div>

      {/* Info */}
      <div className="text-center">
        <div className={`text-[14px] font-bold tracking-tight ${alive ? 'text-slate-100' : 'text-slate-500'}`}>
          {label}
        </div>
        <div className="text-[11px] text-slate-700 font-mono mt-0.5 truncate max-w-[130px]">
          {subtitle}
        </div>
        <div
          className="mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
          style={{
            background: alive ? 'rgba(0,232,92,0.1)' : 'rgba(30,35,50,0.8)',
            color: alive ? 'var(--neon)' : '#475569',
            border: `1px solid ${alive ? 'rgba(0,232,92,0.25)' : 'rgba(255,255,255,0.06)'}`,
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

/* ─── KPI stat card ───────────────────────────────────── */
function KpiCard({ icon: Icon, label, value, accentColor, glowColor, trend }) {
  return (
    <div
      className="stat-card p-4 group cursor-default"
      style={{ '--hover-glow': glowColor }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-[14px]"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
      />

      <div className="flex items-start justify-between mb-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{
            background: `${accentColor}15`,
            border: `1px solid ${accentColor}30`,
            boxShadow: `0 0 16px ${accentColor}15`,
          }}
        >
          <Icon className="w-4 h-4" style={{ color: accentColor }} />
        </div>
        <div
          className="flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 rounded-md"
          style={{ color: '#64748b', background: 'rgba(255,255,255,0.03)' }}
        >
          <TrendingUp className="w-2.5 h-2.5" />
          {trend}
        </div>
      </div>

      <div className="text-[28px] font-bold font-mono tabular-nums" style={{ color: accentColor }}>
        {value}
      </div>
      <div className="text-[12px] text-slate-500 mt-1 font-semibold">{label}</div>

      {/* Bottom shimmer bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px rounded-b-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}60, transparent)` }}
      />
    </div>
  )
}

export default function DashboardPage() {
  const nodes = [
    {
      icon: Server,
      label: 'Open5GS Core',
      subtitle: '127.0.0.5:38412',
      status: 'offline',
      accentColor: '#fb923c',
      glowColor: 'rgba(251,146,60,0.1)',
    },
    {
      icon: Radio,
      label: 'Duranta gNB',
      subtitle: 'NR-ARFCN 641272',
      status: 'offline',
      accentColor: '#0094ff',
      glowColor: 'rgba(0,148,255,0.1)',
    },
    {
      icon: Smartphone,
      label: 'nrUE Handset',
      subtitle: 'IMSI 001010000000001',
      status: 'offline',
      accentColor: '#a78bfa',
      glowColor: 'rgba(167,139,250,0.1)',
    },
  ]

  const kpis = [
    {
      icon: Activity,
      label: 'Signal Quality',
      value: '—',
      accentColor: '#00e85c',
      glowColor: 'rgba(0,232,92,0.15)',
      trend: 'N/A',
    },
    {
      icon: TrendingUp,
      label: 'Throughput',
      value: '—',
      accentColor: '#0094ff',
      glowColor: 'rgba(0,148,255,0.15)',
      trend: 'N/A',
    },
    {
      icon: Timer,
      label: 'Latency',
      value: '—',
      accentColor: '#7c6aff',
      glowColor: 'rgba(124,106,255,0.15)',
      trend: 'N/A',
    },
  ]

  return (
    <div className="p-6 space-y-5 animate-fade-in">

      {/* ── Network Topology Card ──────────────────── */}
      <div
        className="rounded-2xl p-6 relative overflow-hidden"
        style={{
          background: 'rgba(12, 14, 22, 0.85)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 4px 40px rgba(0,0,0,0.4)',
        }}
      >
        {/* Radial glow background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(124,106,255,0.06) 0%, transparent 70%)',
          }}
        />

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(0,232,92,0.12)', border: '1px solid rgba(0,232,92,0.25)' }}
          >
            <Zap className="w-4 h-4" style={{ color: 'var(--neon)' }} />
          </div>
          <div>
            <h2 className="text-[14px] font-bold text-slate-100 tracking-tight">Network Topology</h2>
            <p className="text-[11px] text-slate-600 font-mono">Loopback / RF-SIM mode</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5 px-2 py-1 rounded-md"
               style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
            <span className="text-[10px] text-slate-600 font-mono">All offline</span>
          </div>
        </div>

        {/* Topology diagram */}
        <div className="flex items-center justify-center gap-2 flex-wrap py-4 relative z-10">
          <TopologyNode {...nodes[0]} />
          <FlowLink label="N2 / NGAP" color="#fb923c" />
          <TopologyNode {...nodes[1]} />
          <FlowLink label="Uu / RF-SIM" color="#0094ff" />
          <TopologyNode {...nodes[2]} />
        </div>

        <p className="text-center text-[12px] text-slate-700 mt-2 relative z-10 font-medium">
          Start the network from the control panel to see live topology.
        </p>
      </div>

      {/* ── KPI Cards ─────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {kpis.map(kpi => <KpiCard key={kpi.label} {...kpi} />)}
      </div>
    </div>
  )
}
