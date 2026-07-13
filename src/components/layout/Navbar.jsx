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
  { icon: Signal, label: 'RSRP',    value: '— dBm', accent: '#00e85c',   glow: 'rgba(0,232,92,0.1)'    },
  { icon: Cpu,    label: 'gNB PID', value: '—',      accent: '#0094ff',   glow: 'rgba(0,148,255,0.1)'   },
  { icon: Globe,  label: 'UE IPv4', value: '—',      accent: '#7c6aff',   glow: 'rgba(124,106,255,0.1)' },
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
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ background: 'var(--neon)', boxShadow: '0 0 6px var(--neon)', animation: 'pulse 2s ease-in-out infinite' }}
      />
      <span className="text-[12px] font-mono text-slate-400 tabular-nums tracking-wider">{time} IST</span>
    </div>
  )
}

export default function Navbar({ onMenuToggle }) {
  const { pathname } = useLocation()
  const page = PAGE_TITLES[pathname] ?? { title: 'Hnnoix GUI', subtitle: '' }
  const [notifCount] = useState(2)

  return (
    <header
      className="flex items-center h-[58px] px-5 border-b z-20 shrink-0 gap-3 relative"
      style={{
        background: 'rgba(8,9,15,0.94)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderColor: 'rgba(255,255,255,0.05)',
      }}
    >
      {/* Premium top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(124,106,255,0.35), rgba(0,232,92,0.2), transparent)' }}
      />

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
        <h1
          className="text-[16px] font-bold text-slate-100 leading-tight tracking-tight"
          style={{ fontFamily: "'Syne', sans-serif", letterSpacing: '-0.02em' }}
        >
          {page.title}
        </h1>
        <p className="text-[11.5px] text-slate-400 leading-tight truncate font-semibold">{page.subtitle}</p>
      </div>

      <div className="flex-1" />

      {/* Quick stats */}
      <div className="hidden md:flex items-center gap-2">
        {MOCK_STATS.map(({ icon: Icon, label, value, accent, glow }) => (
          <div
            key={label}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200 hover:scale-[1.03]"
            style={{
              background: glow,
              border: `1px solid ${accent}25`,
              cursor: 'default',
            }}
          >
            <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: accent }} />
            <span className="text-[10px] text-slate-600 font-semibold uppercase tracking-wider">{label}</span>
            <span className="text-[12px] font-mono font-bold tabular-nums" style={{ color: accent }}>
              {value}
            </span>
          </div>
        ))}
      </div>

      <div className="w-px h-5 mx-1 hidden md:block" style={{ background: 'rgba(255,255,255,0.07)' }} />

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
            style={{ background: 'var(--danger)', color: '#fff', boxShadow: '0 0 8px rgba(255,77,109,0.6)' }}
          >
            {notifCount}
          </span>
        )}
      </button>

      {/* MOCK badge */}
      <div
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
        style={{
          background: 'rgba(245,158,11,0.08)',
          border: '1px solid rgba(245,158,11,0.2)',
          boxShadow: '0 0 14px rgba(245,158,11,0.08)',
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ background: '#f59e0b', boxShadow: '0 0 6px rgba(245,158,11,0.9)', animation: 'pulse 2s ease-in-out infinite' }}
        />
        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
          Mock
        </span>
      </div>
    </header>
  )
}
