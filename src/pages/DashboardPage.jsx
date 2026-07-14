import { useState, useEffect } from 'react'
import { Server, Radio, Smartphone, Zap, TrendingUp, Activity, Timer, Play, Square } from 'lucide-react'
import { useNetwork } from '../context/NetworkContext'

// ─── Status colour palette ───────────────────────────────
// gnb / ue: 'offline' | 'connecting' | 'online'
// core:     'offline' | 'online'
const STATUS_COLOR = {
  online:     { dot: 'bg-emerald-500 dark:bg-emerald-500', shadow: 'shadow-[0_0_12px_rgba(16,185,129,0.35)] dark:shadow-[0_0_10px_rgba(16,185,129,0.5)]', label: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', accent: '#10b981', glow: 'rgba(16,185,129,0.4)' },
  connecting: { dot: 'bg-amber-500 dark:bg-amber-500', shadow: 'shadow-[0_0_12px_rgba(245,158,11,0.35)] dark:shadow-[0_0_10px_rgba(245,158,11,0.5)]', label: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20', accent: '#f59e0b', glow: 'rgba(245,158,11,0.4)' },
  offline:    { dot: 'bg-rose-500 dark:bg-rose-600', shadow: 'shadow-[0_0_12px_rgba(244,63,94,0.35)] dark:shadow-[0_0_10px_rgba(244,63,94,0.5)]', label: 'text-rose-500', bg: 'bg-rose-500/10', border: 'border-rose-500/20', accent: '#f43f5e', glow: 'rgba(244,63,94,0.4)' },
}

/* ─── Animated topology link ─────────────────────────── */
function FlowLink({ label, color = '#7c6aff' }) {
  return (
    <div className="flex flex-col items-center gap-2 shrink-0">
      <div className="relative flex items-center w-12 sm:w-[88px]">
        <div className="w-full" style={{ height: '2px', background: `linear-gradient(90deg, ${color}22, ${color}66, ${color}22)`, borderRadius: '1px' }} />
        <div className="flow-dot" style={{ background: color, boxShadow: `0 0 10px 3px ${color}66` }} />
      </div>
      <span
        className="hidden sm:inline-block text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full"
        style={{ color: `${color}99`, background: `${color}0d`, border: `1px solid ${color}22`, letterSpacing: '0.1em' }}
      >
        {label}
      </span>
    </div>
  )
}

/* ─── Node card + inline controls ────────────────────── */
function TopologyNode({ icon: Icon, label, subtitle, status, accentColor, glowColor, nodeKey, onAction, showControls }) {
  const sc = STATUS_COLOR[status] ?? STATUS_COLOR.offline
  const alive = status === 'online'
  const connecting = status === 'connecting'

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Node card */}
      <div
        className="flex flex-col items-center gap-3 p-5 rounded-xl transition-all duration-300 relative overflow-hidden bg-gradient-to-b from-white to-slate-50 border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:bg-none dark:bg-slate-900 dark:border-slate-800 dark:shadow-xl hover:-translate-y-1"
        style={{
          boxShadow: `0 0 20px ${sc.glow}`,
          minWidth: '130px',
        }}
      >
        <div className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${sc.accent}0d 0%, transparent 70%)` }} />

        <div className="relative z-10">
          <div
            className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 ${alive ? 'node-pulse' : ''}`}
            style={{
              background: `radial-gradient(circle at 30% 30%, ${sc.accent}2a 0%, ${sc.accent}0f 100%)`,
              border: `1px solid ${sc.accent}40`,
            }}
          >
            <Icon className="w-6 h-6 transition-all" style={{ color: sc.accent }} />
          </div>
          {alive && (
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2"
              style={{ background: 'var(--neon)', borderColor: '#07080c', boxShadow: '0 0 10px rgba(0,232,92,0.8)', animation: 'pulse 2s ease-in-out infinite' }} />
          )}
          {connecting && (
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2"
              style={{ background: '#f59e0b', borderColor: '#07080c', boxShadow: '0 0 10px rgba(245,158,11,0.8)', animation: 'pulse 1s ease-in-out infinite' }} />
          )}
        </div>

        <div className="text-center z-10 relative">
          <div className="text-[13px] tracking-tight font-semibold transition-colors text-slate-900 dark:text-white">
            {label}
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5 truncate max-w-[120px] font-semibold transition-colors">{subtitle}</div>
          <div
            className={`mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${sc.bg} ${sc.label} border ${sc.border}`}
          >
            <span className="relative flex h-1.5 w-1.5">
              {alive || connecting ? <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${sc.dot}`}></span> : null}
              <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${sc.dot} ${sc.shadow}`}></span>
            </span>
            {status}
          </div>
        </div>
      </div>

      {/* Inline controls (gNB & UE only) */}
      {showControls && onAction && (
        <div className="flex gap-1.5">
          <button
            onClick={() => onAction(nodeKey, 'start')}
            disabled={status === 'online' || status === 'connecting'}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold disabled:opacity-40 transition-all duration-200 bg-slate-900 text-white hover:bg-black dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            <Play className="w-3 h-3" /> Start
          </button>
          <button
            onClick={() => onAction(nodeKey, 'stop')}
            disabled={status === 'offline'}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold disabled:opacity-40 transition-all duration-200 bg-transparent border border-slate-200 text-slate-900 hover:bg-slate-100 dark:border-slate-800 dark:text-white dark:hover:bg-slate-800"
          >
            <Square className="w-3 h-3" /> Stop
          </button>
        </div>
      )}
    </div>
  )
}

/* ─── KPI stat card ──────────────────────────────────── */
function KpiCard({ icon: Icon, label, value, unit, accentColor, glowColor, trend }) {
  const displayValue = value !== null ? String(value) : '—'
  return (
    <div className="p-5 group cursor-default transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] rounded-xl relative overflow-hidden bg-white border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md dark:bg-slate-900 dark:border-slate-800 dark:shadow-xl dark:hover:shadow-2xl">
      <div className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }} />

      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center relative"
          style={{ background: `${accentColor}12`, border: `1px solid ${accentColor}28`, boxShadow: `0 0 20px ${accentColor}12` }}>
          <Icon className="w-5 h-5" style={{ color: accentColor }} />
        </div>
        <div className="flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded-lg"
          style={{ color: '#64748b', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <TrendingUp className="w-2.5 h-2.5" />
          {trend}
        </div>
      </div>

      <div className="flex items-baseline gap-1">
        <div className="text-[30px] font-extrabold font-mono tabular-nums leading-none text-slate-800 dark:text-white"
          style={{ letterSpacing: '-0.02em', fontFamily: "'JetBrains Mono', monospace" }}>
          {displayValue}
        </div>
        {unit && value !== null && (
          <span className="text-[13px] font-mono font-semibold" style={{ color: accentColor + 'aa' }}>{unit}</span>
        )}
      </div>
      <div className="text-[12.5px] text-slate-500 dark:text-slate-400 mt-2 font-semibold tracking-wide">{label}</div>

      <div className="absolute bottom-0 left-0 right-0 h-px rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}55, transparent)` }} />
    </div>
  )
}

// ─── Map raw backend status to UI 3-state ──────────────
// Backend returns 'running' / 'stopped' / 'starting' etc.
// We normalise to: 'online' | 'connecting' | 'offline'
function normaliseStatus(raw) {
  if (!raw) return 'offline'
  const s = String(raw).toLowerCase()
  if (s === 'running' || s === 'online') return 'online'
  if (s === 'starting' || s === 'connecting' || s === 'loading') return 'connecting'
  return 'offline'
}

export default function DashboardPage() {
  const { rsrp, latency, throughput, coreStatus, setCoreStatus } = useNetwork()

  const [gnbStatus, setGnbStatus] = useState('offline')
  const [ueStatus,  setUeStatus]  = useState('offline')

  const fetchStatus = async () => {
    try {
      const [rg, ru] = await Promise.all([
        fetch('/api/binary/gnb/status').then(r => r.json()),
        fetch('/api/binary/ue/status').then(r => r.json()),
      ])
      if (rg.success) setGnbStatus(normaliseStatus(rg.status))
      if (ru.success) setUeStatus(normaliseStatus(ru.status))
    } catch (e) { console.error(e) }
  }

  useEffect(() => {
    fetchStatus()
    const int = setInterval(fetchStatus, 3000)
    return () => clearInterval(int)
  }, [])

  const handleAction = async (node, action) => {
    if (node === 'core') {
      // Core has no API, mock the status change immediately (no connecting state)
      setCoreStatus(action === 'start' ? 'online' : 'offline')
      return
    }

    // Optimistically set connecting while waiting
    if (action === 'start') {
      if (node === 'gnb') setGnbStatus('connecting')
      else setUeStatus('connecting')
    }
    try {
      await fetch(`/api/binary/${node}/${action}`)
      fetchStatus()
    } catch (e) { console.error(e) }
  }

  const anyOnline = gnbStatus === 'online' || ueStatus === 'online' || coreStatus === 'online'

  const kpis = [
    {
      icon: Activity,
      label: 'Signal Quality (RSRP)',
      value: rsrp,
      unit: 'dBm',
      accentColor: '#00e85c',
      glowColor: 'rgba(0,232,92,0.15)',
      trend: rsrp !== null ? (rsrp > -90 ? '▲ Good' : rsrp > -105 ? '◆ Fair' : '▼ Poor') : 'N/A',
    },
    {
      icon: TrendingUp,
      label: 'Data Throughput',
      value: throughput,
      unit: null,
      accentColor: '#0094ff',
      glowColor: 'rgba(0,148,255,0.15)',
      trend: throughput ? 'LIVE' : 'N/A',
    },
    {
      icon: Timer,
      label: 'Round-Trip Latency',
      value: latency,
      unit: 'ms',
      accentColor: '#7c6aff',
      glowColor: 'rgba(124,106,255,0.15)',
      trend: latency !== null ? (latency < 30 ? '▲ Low' : latency < 80 ? '◆ Mid' : '▼ High') : 'N/A',
    },
  ]

  return (
    <div className="p-6 space-y-5 animate-fade-in">

      {/* ── Network Topology Card ─────────── */}
      <div
        className="rounded-xl p-6 relative overflow-hidden bg-white border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:bg-slate-900 dark:border-slate-800 dark:shadow-xl transition-all duration-300"
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 110%, rgba(124,106,255,0.07) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 grid-bg-dense opacity-40 pointer-events-none" />

        {/* Header */}
        <div className="flex items-center gap-3 mb-7 relative z-10">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(0,232,92,0.1)', border: '1px solid rgba(0,232,92,0.22)', boxShadow: '0 0 16px rgba(0,232,92,0.15)' }}>
            <Zap style={{ color: 'var(--neon)', width: '18px', height: '18px' }} />
          </div>
          <div>
            <h2 className="text-[15px] tracking-tight font-semibold text-slate-900 dark:text-white transition-colors">
              Network Topology
            </h2>
            <p className="text-[11.5px] text-slate-500 dark:text-slate-400 font-mono font-semibold transition-colors">Loopback / RF-SIM mode</p>
          </div>
          <div className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors">
            <span className="relative flex h-1.5 w-1.5">
              {anyOnline && <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-emerald-500"></span>}
              <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${anyOnline ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-slate-400'}`}></span>
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono transition-colors">
              {anyOnline ? 'System Active' : 'All Systems Offline'}
            </span>
          </div>
        </div>

        {/* Topology diagram – controls sit beneath each node */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-3 flex-wrap py-4 relative z-10">
          {/* Core */}
          <TopologyNode
            icon={Server}
            label="Hnnoix Core"
            subtitle="127.0.0.5:38412"
            status={coreStatus}
            accentColor="#fb923c"
            glowColor="rgba(251,146,60,0.12)"
            nodeKey="core"
            onAction={handleAction}
            showControls={true}
          />

          <div className="rotate-90 sm:rotate-0 my-2 sm:my-0"><FlowLink label="N2 / NGAP" color="#fb923c" /></div>

          {/* gNB */}
          <TopologyNode
            icon={Radio}
            label="Hnnoix gNB"
            subtitle="NR-ARFCN 641272"
            status={gnbStatus}
            accentColor="#0094ff"
            glowColor="rgba(0,148,255,0.12)"
            nodeKey="gnb"
            onAction={handleAction}
            showControls={true}
          />

          <div className="rotate-90 sm:rotate-0 my-2 sm:my-0"><FlowLink label="Uu / RF-SIM" color="#0094ff" /></div>

          {/* nrUE */}
          <TopologyNode
            icon={Smartphone}
            label="nrUE Handset"
            subtitle="IMSI 001010000000001"
            status={ueStatus}
            accentColor="#a78bfa"
            glowColor="rgba(167,139,250,0.12)"
            nodeKey="ue"
            onAction={handleAction}
            showControls={true}
          />
        </div>
      </div>

      {/* ── KPI Cards ──────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {kpis.map(kpi => <KpiCard key={kpi.label} {...kpi} />)}
      </div>
    </div>
  )
}
