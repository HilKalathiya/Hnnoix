import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Menu, Bell, Cpu, Signal, Globe } from 'lucide-react'

const PAGE_TITLES = {
  '/dashboard': { title: 'Dashboard',     subtitle: 'Live topology & network map' },
  '/logs':      { title: 'Live Logs',     subtitle: 'Real-time streaming terminal output' },
  '/config':    { title: 'Configuration', subtitle: 'Network profile & subscriber parameters' },
  '/son':       { title: 'SON Module',    subtitle: 'Self-organizing network analytics' },
  '/mdt':       { title: 'MDT Module',    subtitle: 'Minimization of drive tests — ring buffer telemetry' },
  '/settings':  { title: 'Settings',      subtitle: 'Application preferences' },
}

const MOCK_STATS = [
  { icon: Signal, label: 'RSRP',    value: '— dBm', accent: 'rgba(0,232,92,0.9)',    glow: 'rgba(0,232,92,0.12)'    },
  { icon: Cpu,    label: 'gNB PID', value: '—',      accent: 'rgba(0,148,255,0.9)',   glow: 'rgba(0,148,255,0.12)'   },
  { icon: Globe,  label: 'UE IPv4', value: '—',      accent: 'rgba(124,106,255,0.9)', glow: 'rgba(124,106,255,0.12)' },
]

function LiveClock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
        style={{ background: 'var(--neon)', boxShadow: '0 0 5px var(--neon)' }}
      />
      <span className="text-[12px] font-mono text-slate-400 tabular-nums tracking-wider">{time} IST</span>
    </div>
  )
}

export default function Navbar({ onMenuToggle }) {
  const { pathname } = useLocation()
  const page = PAGE_TITLES[pathname] ?? { title: 'Duranta GUI', subtitle: '' }
  const [notifCount] = useState(2)

  return (
    <header
      className="flex items-center h-[58px] px-5 border-b border-white/[0.05] z-20 shrink-0 gap-3"
      style={{
        background: 'rgba(9,10,16,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      {/* Hamburger (mobile) */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg
                   text-slate-500 hover:text-slate-200 hover:bg-white/[0.06] transition-all"
      >
        <Menu className="w-4.5 h-4.5" />
      </button>

      {/* Page title */}
      <div className="flex flex-col min-w-0">
        <h1 className="text-[15px] font-bold text-slate-100 leading-tight tracking-tight">
          {page.title}
        </h1>
        <p className="text-[11px] text-slate-600 leading-tight truncate font-medium">{page.subtitle}</p>
      </div>

      <div className="flex-1" />

      {/* Quick stats */}
      <div className="hidden md:flex items-center gap-2">
        {MOCK_STATS.map(({ icon: Icon, label, value, accent, glow }) => (
          <div
            key={label}
            className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-[1.02]"
            style={{ background: glow, border: `1px solid ${accent.replace('0.9', '0.2')}` }}
          >
            <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: accent }} />
            <span className="text-[11px] text-slate-500 font-semibold">{label}</span>
            <span className="text-[12px] font-mono font-bold tabular-nums" style={{ color: accent }}>
              {value}
            </span>
          </div>
        ))}
      </div>

      <div className="w-px h-5 bg-white/[0.08] mx-1 hidden md:block" />

      {/* Live clock */}
      <div className="hidden sm:block">
        <LiveClock />
      </div>

      {/* Notification bell */}
      <button
        className="relative w-9 h-9 flex items-center justify-center rounded-lg
                   text-slate-500 hover:text-slate-200 hover:bg-white/[0.06] transition-all group"
        title="Notifications"
      >
        <Bell className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
        {notifCount > 0 && (
          <span
            className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold"
            style={{ background: 'var(--danger)', color: '#fff', boxShadow: '0 0 6px rgba(255,77,109,0.6)' }}
          >
            {notifCount}
          </span>
        )}
      </button>

      {/* MOCK badge */}
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-lg"
        style={{
          background: 'rgba(245,158,11,0.08)',
          border: '1px solid rgba(245,158,11,0.22)',
          boxShadow: '0 0 12px rgba(245,158,11,0.08)',
        }}
      >
        <span
          className="w-2 h-2 rounded-full animate-pulse shrink-0"
          style={{ background: '#f59e0b', boxShadow: '0 0 5px rgba(245,158,11,0.8)' }}
        />
        <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
          Mock
        </span>
      </div>
    </header>
  )
}
