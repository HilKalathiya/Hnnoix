import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  ScrollText,
  Settings2,
  Radio,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Activity,
} from 'lucide-react'

const primaryNav = [
  {
    to: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    description: 'Live topology map',
    color: 'text-neon-400',
    glow: 'rgba(0,232,92,0.25)',
  },
  {
    to: '/logs',
    label: 'Live Logs',
    icon: ScrollText,
    description: 'Real-time log stream',
    color: 'text-signal-400',
    glow: 'rgba(0,148,255,0.25)',
  },
  {
    to: '/config',
    label: 'Configuration',
    icon: Settings2,
    description: 'Network parameters',
    color: 'text-violet-400',
    glow: 'rgba(124,106,255,0.25)',
  },
]

const moduleNav = [
  {
    to: '/son',
    label: 'SON',
    icon: Radio,
    description: 'Self-organizing network',
    color: 'text-purple-400',
    glow: 'rgba(192,132,252,0.25)',
  },
  {
    to: '/mdt',
    label: 'MDT',
    icon: BarChart3,
    description: 'Drive test minimization',
    color: 'text-amber-400',
    glow: 'rgba(251,191,36,0.25)',
  },
]

const bottomNav = [
  {
    to: '/settings',
    label: 'Settings',
    icon: Settings,
    description: 'App preferences',
    color: 'text-slate-400',
    glow: 'rgba(148,163,184,0.15)',
  },
]

const networkStatus = [
  { label: 'Core',  status: 'offline', hint: '127.0.0.5' },
  { label: 'gNB',   status: 'offline', hint: 'NR-ARFCN'  },
  { label: 'nrUE',  status: 'offline', hint: 'IMSI:001'  },
]

const STATUS_STYLES = {
  online:  { dot: 'bg-neon-400',   shadow: '0 0 8px 2px rgba(0,232,92,0.55)',    label: 'text-neon-400',  bg: 'bg-neon-400/8'   },
  offline: { dot: 'bg-slate-700',  shadow: 'none',                                label: 'text-slate-600', bg: 'bg-slate-800/30' },
  warning: { dot: 'bg-amber-400',  shadow: '0 0 8px 2px rgba(245,158,11,0.55)',  label: 'text-amber-400', bg: 'bg-amber-400/8'  },
  error:   { dot: 'bg-red-400',    shadow: '0 0 8px 2px rgba(248,113,113,0.55)', label: 'text-red-400',   bg: 'bg-red-400/8'    },
}

function StatusDot({ status }) {
  const s = STATUS_STYLES[status] ?? STATUS_STYLES.offline
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full shrink-0 ${s.dot}`}
      style={{ boxShadow: s.shadow }}
    />
  )
}

function NavSection({ items, collapsed, label }) {
  return (
    <div className="mb-1">
      {!collapsed && label && (
        <div className="px-4 pt-3 pb-1.5">
          <p className="text-[10px] uppercase tracking-[0.14em] text-slate-700 font-bold">
            {label}
          </p>
        </div>
      )}
      {collapsed && label && <div className="h-3" />}
      <ul className="space-y-0.5 px-2">
        {items.map(({ to, label: itemLabel, icon: Icon, description, color, glow }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `sidebar-link flex items-center gap-3 px-2.5 py-2.5 rounded-xl
                 transition-all duration-200 group relative
                 ${isActive
                   ? 'active bg-gradient-to-r from-violet-500/12 to-signal-500/5 text-slate-100'
                   : 'text-slate-500 hover:text-slate-200 hover:bg-white/[0.04]'
                 }`
              }
              title={collapsed ? itemLabel : undefined}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`shrink-0 transition-colors duration-200 ${isActive ? color : 'text-slate-600 group-hover:text-slate-400'}`}
                    style={{ width: '18px', height: '18px' }}
                  />
                  {!collapsed && (
                    <span className="truncate animate-fade-in">{itemLabel}</span>
                  )}

                  {/* Active indicator dot */}
                  {isActive && !collapsed && (
                    <span
                      className="ml-auto w-1.5 h-1.5 rounded-full shrink-0"
                      style={{
                        background: glow.replace('0.25', '1'),
                        boxShadow: `0 0 6px 2px ${glow}`,
                      }}
                    />
                  )}

                  {/* Collapsed tooltip */}
                  {collapsed && (
                    <div
                      className="tooltip-arrow absolute left-full ml-3 px-3 py-2 rounded-lg
                                  text-xs whitespace-nowrap opacity-0 group-hover:opacity-100
                                  pointer-events-none transition-all duration-150 z-50
                                  border border-white/10"
                      style={{ background: 'rgba(14,16,24,0.97)', backdropFilter: 'blur(12px)' }}
                    >
                      <div className="font-semibold text-slate-200 text-[13px]">{itemLabel}</div>
                      <div className="text-slate-500 text-[11px] mt-0.5">{description}</div>
                    </div>
                  )}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Sidebar({ collapsed, onToggle }) {
  return (
    <aside
      className="glass-sidebar flex flex-col z-30 transition-all duration-300 ease-in-out relative shrink-0"
      style={{ width: collapsed ? '64px' : '248px' }}
    >
      {/* ── LOGO AREA ───────────────────────────────── */}
      <div className="flex items-center h-[58px] px-3 border-b border-white/[0.05] shrink-0">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {/* Icon mark */}
          <div className="relative flex-shrink-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(0,232,92,0.9) 0%, rgba(124,106,255,0.9) 100%)',
                boxShadow: '0 0 18px rgba(124,106,255,0.4), 0 2px 8px rgba(0,0,0,0.5)',
              }}
            >
              <Wifi className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span
              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#07080c]"
              style={{
                background: 'var(--neon)',
                boxShadow: '0 0 6px rgba(0,232,92,0.7)',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            />
          </div>

          {/* Wordmark */}
          {!collapsed && (
            <div className="min-w-0 animate-fade-in">
              <div className="text-[15px] font-bold leading-tight brand-gradient tracking-tight">
                Duranta
              </div>
              <div className="text-[11px] text-slate-600 leading-tight font-mono tracking-wide">
                Open5GS GUI
              </div>
            </div>
          )}
        </div>

        {/* Collapse toggle */}
        <button
          onClick={onToggle}
          className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center
                     text-slate-600 hover:text-slate-300 hover:bg-white/[0.06] transition-all duration-150"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed
            ? <ChevronRight className="w-4 h-4" />
            : <ChevronLeft  className="w-4 h-4" />}
        </button>
      </div>

      {/* ── NAVIGATION ──────────────────────────────── */}
      <nav className="flex-1 py-2 overflow-y-auto overflow-x-hidden">
        <NavSection items={primaryNav} collapsed={collapsed} label="Main" />

        {/* Divider */}
        {!collapsed && (
          <div className="mx-3 my-1 border-t border-white/[0.05]" />
        )}

        <NavSection items={moduleNav} collapsed={collapsed} label="Modules" />
      </nav>

      {/* ── BOTTOM NAV ──────────────────────────────── */}
      <div className="px-2 pb-2">
        <NavSection items={bottomNav} collapsed={collapsed} />
      </div>

      {/* ── NETWORK STATUS PANEL ────────────────────── */}
      <div className="border-t border-white/[0.05] p-3 shrink-0">
        {!collapsed ? (
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <Activity className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-[10px] uppercase tracking-[0.14em] text-slate-700 font-bold">
                Network Status
              </span>
            </div>
            <div className="space-y-1.5">
              {networkStatus.map(({ label, status }) => {
                const s = STATUS_STYLES[status] ?? STATUS_STYLES.offline
                return (
                  <div
                    key={label}
                    className={`flex items-center justify-between px-2.5 py-2 rounded-lg ${s.bg} transition-colors`}
                  >
                    <div className="flex items-center gap-2">
                      <StatusDot status={status} />
                      <span className="text-[12px] text-slate-400 font-mono font-medium tracking-wide">{label}</span>
                    </div>
                    <span className={`text-[11px] capitalize font-semibold ${s.label}`}>
                      {status}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-1">
            {networkStatus.map(({ label, status }) => (
              <div key={label} title={`${label}: ${status}`}>
                <StatusDot status={status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  )
}
