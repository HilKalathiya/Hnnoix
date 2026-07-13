import { useState } from 'react'
import { Settings, Monitor, Bell, Info, ChevronRight } from 'lucide-react'

// ─── Premium Toggle Switch ────────────────────────────────
function Toggle({ label, description, defaultChecked = false, accentColor = '#00e85c' }) {
  const [checked, setChecked] = useState(defaultChecked)
  return (
    <div
      className="flex items-center justify-between py-3.5 cursor-pointer group transition-all duration-200"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
      onClick={() => setChecked(c => !c)}
    >
      <div className="flex-1 min-w-0 pr-4">
        <div className="text-[13.5px] text-slate-200 font-semibold group-hover:text-slate-100 transition-colors">{label}</div>
        {description && (
          <div className="text-[11.5px] text-slate-500 mt-0.5 group-hover:text-slate-400 transition-colors">{description}</div>
        )}
      </div>
      {/* Premium toggle */}
      <div
        className="relative shrink-0 transition-all duration-300"
        style={{
          width: '44px',
          height: '24px',
          borderRadius: '99px',
          background: checked
            ? `linear-gradient(90deg, ${accentColor}30, ${accentColor}50)`
            : 'rgba(30,35,52,0.8)',
          border: `1px solid ${checked ? `${accentColor}55` : 'rgba(255,255,255,0.08)'}`,
          boxShadow: checked ? `0 0 14px ${accentColor}30` : 'none',
        }}
      >
        <div
          className="absolute transition-all duration-300"
          style={{
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            top: '2px',
            left: checked ? '22px' : '2px',
            background: checked ? accentColor : '#475569',
            boxShadow: checked ? `0 2px 8px ${accentColor}55` : '0 1px 4px rgba(0,0,0,0.5)',
          }}
        />
      </div>
    </div>
  )
}

// ─── Premium Section Card ────────────────────────────────
function SettingSection({ icon: Icon, title, accentColor, children }) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, rgba(14,16,26,0.88) 0%, rgba(10,12,19,0.92) 100%)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-5 py-4 relative"
        style={{
          background: `linear-gradient(90deg, ${accentColor}08 0%, rgba(255,255,255,0.01) 100%)`,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Accent left border */}
        <div
          className="absolute left-0 top-0 bottom-0 w-0.5"
          style={{ background: `linear-gradient(180deg, ${accentColor} 0%, ${accentColor}44 100%)` }}
        />
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `${accentColor}14`, border: `1px solid ${accentColor}28` }}
        >
          <Icon className="w-4 h-4" style={{ color: accentColor }} />
        </div>
        <span
        className="text-[13.5px] font-bold text-slate-200"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {title}
      </span>
      </div>
      {/* Content */}
      <div className="px-5 pb-1">
        {children}
      </div>
    </div>
  )
}

// ─── Info row ─────────────────────────────────────────────
function InfoRow({ label, value, valueColor }) {
  return (
    <div className="flex items-center justify-between py-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <span className="text-[12.5px] text-slate-400 font-mono font-semibold">{label}</span>
      <span className="text-[12.5px] font-mono font-bold" style={{ color: valueColor || '#a0aec8' }}>{value}</span>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-5 animate-fade-in max-w-2xl mx-auto">

      {/* ── Premium Page header ─────────────────── */}
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(100,116,139,0.1)', border: '1px solid rgba(100,116,139,0.2)', boxShadow: '0 0 16px rgba(100,116,139,0.1)' }}
        >
          <Settings className="w-5 h-5 text-slate-400" />
        </div>
        <div>
        <h2
          className="text-[20px] font-extrabold text-slate-100 tracking-tight"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Settings
        </h2>
        <p className="text-[12.5px] text-slate-400 font-medium">Application preferences & display options</p>
      </div>
      </div>

      {/* ── Display Section ─────────────────────── */}
      <SettingSection icon={Monitor} title="Display" accentColor="#0094ff">
        <Toggle label="Dark Mode"           description="Telecom console theme"                defaultChecked accentColor="#0094ff" />
        <Toggle label="Compact Layout"      description="Reduce padding & spacing"             accentColor="#0094ff" />
        <Toggle label="Show Line Numbers"   description="Line numbers in log viewer"           defaultChecked accentColor="#0094ff" />
        <Toggle label="CRT Scanline Effect" description="Subtle scanline overlay on terminal"  defaultChecked accentColor="#0094ff" />
      </SettingSection>

      {/* ── Notifications Section ───────────────── */}
      <SettingSection icon={Bell} title="Notifications" accentColor="#7c6aff">
        <Toggle label="RSRP Drop Alerts"    description="Trigger on MDT low-RSRP events"        defaultChecked accentColor="#7c6aff" />
        <Toggle label="Registration Events" description="NAS Registration Accept / Reject"       defaultChecked accentColor="#7c6aff" />
        <Toggle label="Sound Alerts"        description="Audio ping on critical events"          accentColor="#7c6aff" />
      </SettingSection>

      {/* ── About Section ───────────────────────── */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, rgba(14,16,26,0.88) 0%, rgba(10,12,19,0.92) 100%)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)',
        }}
      >
        <div
          className="flex items-center gap-3 px-5 py-4 relative"
          style={{
            background: 'linear-gradient(90deg, rgba(100,116,139,0.06) 0%, rgba(255,255,255,0.01) 100%)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: 'linear-gradient(180deg, #64748b 0%, #64748b44 100%)' }} />
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(100,116,139,0.12)', border: '1px solid rgba(100,116,139,0.24)' }}>
            <Info className="w-4 h-4 text-slate-500" />
          </div>
          <span className="text-[13px] font-bold text-slate-200">About</span>

          {/* Version badge */}
          <span
            className="ml-auto text-[10px] font-bold px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(124,106,255,0.1)', border: '1px solid rgba(124,106,255,0.25)', color: '#a09aff' }}
          >
            v0.1.0-alpha
          </span>
        </div>

        <div className="px-5 py-1">
          <InfoRow label="App Version"      value="0.1.0-alpha"           valueColor="#a09aff" />
          <InfoRow label="Framework"        value="React 18 + Vite 5"     />
          <InfoRow label="Styling"          value="Tailwind CSS v3"        />
          <InfoRow label="Backend Target"   value="FastAPI / Express"      />
          <InfoRow label="5G Stack"         value="Hnnoix gNB + Hnnoix Core"  />
          <InfoRow label="Mode"             value="MOCK (no backend)"      valueColor="#f59e0b" />
        </div>

        {/* View Docs link */}
        <div className="px-5 pb-4 pt-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', color: '#64748b' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,106,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(124,106,255,0.25)'; e.currentTarget.style.color = '#a09aff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = '#64748b' }}
          >
            <span className="text-[12px] font-semibold">View Documentation</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
