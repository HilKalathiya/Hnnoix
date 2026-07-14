import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Menu, Cpu, Signal, Globe } from 'lucide-react'
import { useNetwork } from '../../context/NetworkContext'

const PAGE_TITLES = {
  '/dashboard': { title: 'Dashboard',     subtitle: 'Live topology & network map' },
  '/logs':      { title: 'Live Logs',     subtitle: 'Real-time streaming terminal output' },
  '/config':    { title: 'Configuration', subtitle: 'Network profile & subscriber parameters' },
  '/son':       { title: 'SON Module',    subtitle: 'Self-organizing network analytics' },
  '/mdt':       { title: 'MDT Module',    subtitle: 'Minimization of drive tests — ring buffer telemetry' },
  '/settings':  { title: 'Settings',      subtitle: 'Application preferences' },
}

function LiveClock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-xl">
      <span className="relative flex h-1.5 w-1.5 mr-1 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-emerald-500"></span>
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
      </span>
      <span className="text-[12px] font-mono text-slate-500 dark:text-slate-400 tabular-nums tracking-wider">{time} IST</span>
    </div>
  )
}

export default function Navbar({ onMenuToggle }) {
  const { pathname } = useLocation()
  const page = PAGE_TITLES[pathname] ?? { title: 'Hnnoix GUI', subtitle: '' }
  const { rsrp } = useNetwork()

  // Fetch gnb PID and UE IP from status endpoints
  const [gnbPid, setGnbPid] = useState('—')
  const [ueIp,   setUeIp]   = useState('—')

  useEffect(() => {
    const poll = async () => {
      try {
        const [rg, ru] = await Promise.all([
          fetch('/api/binary/gnb/status').then(r => r.json()),
          fetch('/api/binary/ue/status').then(r => r.json()),
        ])
        if (rg.success && rg.pid)  setGnbPid(String(rg.pid))
        if (ru.success && ru.ip)   setUeIp(ru.ip)
      } catch {}
    }
    poll()
    const id = setInterval(poll, 5000)
    return () => clearInterval(id)
  }, [])

  const stats = [
    { icon: Signal, label: 'RSRP',    value: rsrp !== null ? `${rsrp} dBm` : '— dBm', accent: '#00e85c', glow: 'rgba(0,232,92,0.1)'    },
    { icon: Cpu,    label: 'gNB PID', value: gnbPid,                                    accent: '#0094ff', glow: 'rgba(0,148,255,0.1)'   },
    { icon: Globe,  label: 'UE IPv4', value: ueIp,                                      accent: '#7c6aff', glow: 'rgba(124,106,255,0.1)' },
  ]

  return (
    <header
      className="flex items-center h-[58px] px-5 z-20 shrink-0 gap-3 relative bg-white/70 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-all duration-300 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] dark:shadow-xl"
    >
      {/* Premium top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(124,106,255,0.35), rgba(0,232,92,0.2), transparent)' }} />

      {/* Hamburger (mobile) */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
      >
        <Menu className="w-4.5 h-4.5" style={{ width: '18px', height: '18px' }} />
      </button>

      {/* Page title */}
      <div className="flex flex-col min-w-0">
        <h1 className="text-[16px] tracking-tight font-semibold text-slate-900 dark:text-white leading-tight transition-colors">
          {page.title}
        </h1>
        <p className="text-[11.5px] text-slate-500 dark:text-slate-400 leading-tight truncate font-semibold transition-colors">{page.subtitle}</p>
      </div>

      <div className="flex-1" />

      {/* Quick stats – live values */}
      <div className="hidden md:flex items-center gap-2">
        {stats.map(({ icon: Icon, label, value, accent }) => (
          <div
            key={label}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:-translate-y-0.5 shadow-sm dark:shadow-xl cursor-default"
          >
            <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: accent }} />
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">{label}</span>
            <span className="text-[12px] font-mono font-semibold tracking-tight tabular-nums" style={{ color: accent }}>{value}</span>
          </div>
        ))}
      </div>

      <div className="w-px h-5 mx-1 hidden md:block bg-slate-200 dark:bg-slate-800" />

      {/* Live clock */}
      <div className="hidden sm:block">
        <LiveClock />
      </div>
    </header>
  )
}
