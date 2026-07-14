import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useNetwork } from '../../context/NetworkContext'
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

const INITIAL_NETWORK_STATUS = [
  { id: 'core', label: 'Core',  status: 'offline', hint: '127.0.0.5' },
  { id: 'gnb',  label: 'gNB',   status: 'offline', hint: 'NR-ARFCN'  },
  { id: 'ue',   label: 'nrUE',  status: 'offline', hint: 'IMSI:001'  },
]

const STATUS_STYLES = {
  online:     { dot: 'bg-emerald-500 dark:bg-emerald-500', shadow: 'shadow-[0_0_10px_rgba(16,185,129,0.5)]', label: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  connecting: { dot: 'bg-amber-500 dark:bg-amber-500', shadow: 'shadow-[0_0_10px_rgba(245,158,11,0.5)]', label: 'text-amber-500', bg: 'bg-amber-500/10' },
  offline:    { dot: 'bg-rose-500 dark:bg-rose-600', shadow: 'shadow-[0_0_10px_rgba(244,63,94,0.5)]', label: 'text-rose-500', bg: 'bg-rose-500/10' },
  warning:    { dot: 'bg-amber-500 dark:bg-amber-500', shadow: 'shadow-[0_0_10px_rgba(245,158,11,0.5)]', label: 'text-amber-500', bg: 'bg-amber-500/10' },
  error:      { dot: 'bg-rose-500 dark:bg-rose-600', shadow: 'shadow-[0_0_10px_rgba(244,63,94,0.5)]', label: 'text-rose-500', bg: 'bg-rose-500/10' },
}

function StatusDot({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.offline
  const isPulsing = status === 'online' || status === 'connecting'
  return (
    <span className="relative flex h-2 w-2 mr-1">
      {isPulsing && <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${s.dot}`}></span>}
      <span className={`relative inline-flex rounded-full h-2 w-2 ${s.dot} ${s.shadow}`}></span>
    </span>
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
          <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400 font-bold">
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
                `sidebar-link flex items-center gap-3 px-2.5 py-2.5 rounded-lg
                 transition-all duration-150 group relative
                 ${isActive
                   ? 'bg-slate-100 dark:bg-slate-800'
                   : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                 }`
              }
              title={collapsed ? itemLabel : undefined}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`shrink-0 transition-colors duration-200 ${isActive ? color : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'}`}
                    style={{ width: '18px', height: '18px' }}
                  />
                  {!collapsed && (
                    <span className={`text-[13px] tracking-tight font-semibold transition-colors duration-200
                          ${isActive 
                            ? 'text-slate-900 dark:text-white' 
                            : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
                      {itemLabel}
                    </span>
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
                                  border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl"
                    >
                      <div className="tracking-tight font-semibold text-slate-900 dark:text-white text-[13px]">{itemLabel}</div>
                      <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">{description}</div>
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

function normaliseStatus(raw) {
  if (!raw) return 'offline'
  const s = String(raw).toLowerCase()
  if (s === 'running' || s === 'online') return 'online'
  if (s === 'starting' || s === 'connecting' || s === 'loading') return 'connecting'
  return 'offline'
}

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  const { coreStatus = 'offline', gnbStatus = 'offline', ueStatus = 'offline' } = useNetwork() || {}

  const networkStatus = [
    { id: 'core', label: 'Core',  status: coreStatus, hint: '127.0.0.5' },
    { id: 'gnb',  label: 'gNB',   status: gnbStatus,  hint: 'NR-ARFCN'  },
    { id: 'ue',   label: 'nrUE',  status: ueStatus,   hint: 'IMSI:001'  },
  ]

  return (
    <aside
      className={`flex flex-col z-40 transition-all duration-300 ease-in-out shrink-0
                  fixed inset-y-0 left-0 lg:relative bg-white/70 backdrop-blur-md border-r border-slate-200/80 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]
                  dark:bg-slate-900 dark:border-slate-800 dark:shadow-xl
                  ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      style={{ width: collapsed ? '64px' : '248px' }}
    >
      {/* ── LOGO AREA ───────────────────────────────── */}
      <div className="flex items-center h-[58px] px-3 border-b border-slate-200 dark:border-slate-800 shrink-0">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <img src="/logo.jpeg" alt="Hnnoix Logo" className="w-10 h-10 object-contain shrink-0 drop-shadow-sm" />
          <div className={`flex flex-col min-w-0 transition-opacity duration-300 ${collapsed ? 'opacity-0 lg:hidden' : 'opacity-100'}`}>
            <span className="tracking-tight font-semibold text-[20px] dark:text-white text-slate-900">
              Hnnoix
            </span>
            <span className="text-[10px] tracking-tight font-semibold text-slate-500 dark:text-slate-400 uppercase pl-1">
              5G Core
            </span>
          </div>
        </div>

        {/* Collapse toggle (Desktop) */}
        <button
          onClick={onToggle}
          className="hidden lg:flex flex-shrink-0 w-7 h-7 rounded-lg items-center justify-center
                     text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-150"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed
            ? <ChevronRight className="w-4-4" />
            : <ChevronLeft  className="w-4-4" />}
        </button>

        {/* Close toggle (Mobile) */}
        <button
          onClick={onMobileClose}
          className="lg:hidden flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center
                     text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-150"
        >
          <ChevronLeft className="w-4-4" />
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
      <div className="border-t border-slate-200 dark:border-slate-800 p-3 shrink-0">
        {!collapsed ? (
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <Activity className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span className="text-[10px] uppercase tracking-tight text-slate-500 dark:text-slate-400 font-semibold">
                Network Status
              </span>
            </div>
            <div className="space-y-1.5">
              {networkStatus.map((n) => {
                const status = n.status
                const label = n.label
                const s = STATUS_STYLES[status] ?? STATUS_STYLES.offline
                return (
                  <div
                    key={label}
                    className="flex items-center justify-between px-2.5 py-2 rounded-lg transition-all duration-300 bg-white hover:bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-800 hover:-translate-y-0.5 shadow-sm dark:shadow-xl"
                  >
                    <span className="text-[11.5px] tracking-tight font-semibold text-slate-900 dark:text-white">{label}</span>
                    <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${s.bg} ${s.label}`}>
                      <StatusDot status={status} />
                      {status}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-1">
            {networkStatus.map((n) => {
              const status = n.status
              return (
                <div key={n.label} title={`${n.label}: ${status}`}>
                  <StatusDot status={status} />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </aside>
  )
}
