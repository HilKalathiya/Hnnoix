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
  Activity,
  Wifi,
} from 'lucide-react'

const primaryNav = [
  {
    to: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    description: 'Live topology map',
    color: 'text-neon-400',
    accent: '#00e85c',
    glow: 'rgba(0,232,92,0.25)',
  },
  {
    to: '/logs',
    label: 'Live Logs',
    icon: ScrollText,
    description: 'Real-time log stream',
    color: 'text-signal-400',
    accent: '#0094ff',
    glow: 'rgba(0,148,255,0.25)',
  },
  {
    to: '/config',
    label: 'Configuration',
    icon: Settings2,
    description: 'Network parameters',
    color: 'text-violet-400',
    accent: '#7c6aff',
    glow: 'rgba(124,106,255,0.25)',
  },
]

const moduleNav = [
  /*
  // Hidden for demo
  {
    to: '/son',
    label: 'SON',
    icon: Radio,
    description: 'Self-organizing network',
    color: 'text-purple-400',
    accent: '#c084fc',
    glow: 'rgba(192,132,252,0.25)',
  },
  {
    to: '/mdt',
    label: 'MDT',
    icon: BarChart3,
    description: 'Drive test minimization',
    color: 'text-amber-400',
    accent: '#f59e0b',
    glow: 'rgba(251,191,36,0.25)',
  },
  */
]

const bottomNav = [
  {
    to: '/settings',
    label: 'Settings',
    icon: Settings,
    description: 'App preferences',
    color: 'text-slate-400',
    accent: '#64748b',
    glow: 'rgba(148,163,184,0.15)',
  },
]

const networkStatus = [
  { label: 'Core',  status: 'offline', hint: '127.0.0.5' },
  { label: 'gNB',   status: 'offline', hint: 'NR-ARFCN'  },
  { label: 'nrUE',  status: 'offline', hint: 'IMSI:001'  },
]

const STATUS_STYLES = {
  online:  { dot: '#00e85c',  shadow: '0 0 8px 2px rgba(0,232,92,0.55)',    label: 'text-neon-400',  bg: 'rgba(0,232,92,0.06)'    },
  offline: { dot: '#2e3347',  shadow: 'none',                                label: 'text-slate-600', bg: 'rgba(30,35,52,0.3)'     },
  warning: { dot: '#f59e0b',  shadow: '0 0 8px 2px rgba(245,158,11,0.55)',  label: 'text-amber-400', bg: 'rgba(245,158,11,0.06)'  },
  error:   { dot: '#ff4d6d',  shadow: '0 0 8px 2px rgba(255,77,109,0.55)',  label: 'text-red-400',   bg: 'rgba(255,77,109,0.06)'  },
}

function StatusDot({ status }) {
  const s = STATUS_STYLES[status] ?? STATUS_STYLES.offline
  return (
    <span
      className="inline-block w-2 h-2 rounded-full shrink-0"
      style={{ background: s.dot, boxShadow: s.shadow }}
    />
  )
}

// Premium SVG logo for sidebar
function SidebarLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sbLogoG1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00e85c" />
          <stop offset="100%" stopColor="#7c6aff" />
        </linearGradient>
        <linearGradient id="sbLogoG2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c6aff" />
          <stop offset="100%" stopColor="#0094ff" />
        </linearGradient>
      </defs>
      <rect width="36" height="36" rx="10" fill="url(#sbLogoG1)" opacity="0.15" />
      <rect width="36" height="36" rx="10" stroke="url(#sbLogoG1)" strokeWidth="1" fill="none" opacity="0.4" />
      {/* Signal tower */}
      <line x1="18" y1="8" x2="18" y2="26" stroke="url(#sbLogoG1)" strokeWidth="2" strokeLinecap="round" />
      <line x1="13" y1="22" x2="23" y2="22" stroke="url(#sbLogoG1)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Signal arcs */}
      <path d="M10 16 Q10 10 18 10 Q26 10 26 16" stroke="url(#sbLogoG2)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M6 20 Q6 8 18 8 Q30 8 30 20" stroke="url(#sbLogoG2)" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5" />
      {/* Beacon */}
      <circle cx="18" cy="8" r="2.5" fill="url(#sbLogoG1)" />
      {/* Base */}
      <path d="M14 26 L12 30 L24 30 L22 26" stroke="url(#sbLogoG1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

function NavSection({ items, collapsed, label }) {
  return (
    <div className="mb-1">
      {!collapsed && label && (
        <div className="px-4 pt-3 pb-1.5">
          <p className="text-[10px] uppercase tracking-[0.16em] text-slate-700 font-bold">
            {label}
          </p>
        </div>
      )}
      {collapsed && label && <div className="h-3" />}
      <ul className="space-y-0.5 px-2">
        {items.map(({ to, label: itemLabel, icon: Icon, description, color, accent, glow }) => (
          <li key={to}>
            <NavLink
              to={to}
              end
              data-accent={accent}
              className={({ isActive }) =>
                `sidebar-link flex items-center gap-3 px-2.5 py-2.5 rounded-xl
                 transition-all duration-150 group relative
                 ${isActive
                   ? 'is-active text-slate-100'
                   : 'text-slate-500 hover:text-slate-200'
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
                    <span className="truncate animate-fade-in font-medium">{itemLabel}</span>
                  )}

                  {/* Active glow dot */}
                  {isActive && !collapsed && (
                    <span
                      className="ml-auto w-1.5 h-1.5 rounded-full shrink-0"
                      style={{
                        background: accent,
                        boxShadow: `0 0 8px 2px ${glow}`,
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
                      style={{ background: 'rgba(12,14,22,0.97)', backdropFilter: 'blur(16px)' }}
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

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  return (
    <aside
      className={`glass-sidebar flex flex-col z-40 transition-all duration-300 ease-in-out shrink-0
                  fixed inset-y-0 left-0 lg:relative
                  ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      style={{ width: collapsed ? '64px' : '248px' }}
    >
      {/* ── LOGO AREA ───────────────────────────────── */}
      <div className="flex items-center h-[58px] px-3 border-b border-white/[0.05] shrink-0">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {/* Premium logo mark */}
          <div className="relative flex-shrink-0">
            <SidebarLogo />
            <span
              className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#07080c]"
              style={{
                background: 'var(--neon)',
                boxShadow: '0 0 8px rgba(0,232,92,0.8)',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            />
          </div>

          {/* Wordmark */}
          {!collapsed && (
            <div className="min-w-0 animate-fade-in">
              <div
                className="text-[15px] font-extrabold leading-tight brand-gradient tracking-tight"
                style={{ fontFamily: "'Syne', sans-serif", letterSpacing: '-0.02em' }}
              >
                Hnnoix
              </div>
              <div className="text-[10.5px] text-slate-500 leading-tight font-mono tracking-wide font-semibold">
                Hnnoix Core GUI
              </div>
            </div>
          )}
        </div>

        {/* Collapse toggle (Desktop) */}
        <button
          onClick={onToggle}
          className="hidden lg:flex flex-shrink-0 w-7 h-7 rounded-lg items-center justify-center
                     text-slate-600 hover:text-slate-300 hover:bg-white/[0.07] transition-all duration-150"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed
            ? <ChevronRight className="w-4 h-4" />
            : <ChevronLeft  className="w-4 h-4" />}
        </button>

        {/* Close toggle (Mobile) */}
        <button
          onClick={onMobileClose}
          className="lg:hidden flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center
                     text-slate-600 hover:text-slate-300 hover:bg-white/[0.07] transition-all duration-150"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* ── NAVIGATION ──────────────────────────────── */}
      <nav className="flex-1 py-2 overflow-y-auto overflow-x-hidden">
        <NavSection items={primaryNav} collapsed={collapsed} label="Main" />

        {/* Divider */}
        {!collapsed && (
          <div className="mx-4 my-1" style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />
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
              <span className="text-[10px] uppercase tracking-[0.16em] text-slate-700 font-bold">
                Network Status
              </span>
            </div>
            <div className="space-y-1.5">
              {networkStatus.map(({ label, status }) => {
                const s = STATUS_STYLES[status] ?? STATUS_STYLES.offline
                return (
                  <div
                    key={label}
                    className="flex items-center justify-between px-2.5 py-2 rounded-lg transition-colors"
                    style={{ background: s.bg, border: '1px solid rgba(255,255,255,0.04)' }}
                  >
                    <div className="flex items-center gap-2">
                      <StatusDot status={status} />
                      <span className="text-[12px] text-slate-400 font-mono font-medium tracking-wide">{label}</span>
                    </div>
                    <span className={`text-[10px] capitalize font-bold ${s.label} uppercase tracking-wider`}>
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
