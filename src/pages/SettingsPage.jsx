import { useState } from 'react'
import { Settings, Monitor, Bell, Info, ChevronRight } from 'lucide-react'
import { useNetwork } from '../context/NetworkContext'
import { useTheme } from '../context/ThemeContext'

// ─── Premium Toggle Switch ────────────────────────────────
function Toggle({ label, description, checked, onChange, accentColor = '#00e85c' }) {
  return (
    <div
      className="flex items-center justify-between py-3.5 cursor-pointer group transition-all duration-200"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
      onClick={() => onChange(!checked)}
    >
      <div className="flex-1 min-w-0 pr-4">
        <div className="text-[13.5px] tracking-tight font-semibold text-[#171717] dark:text-[#EDEDED] transition-colors">{label}</div>
        {description && (
          <div className="text-[11.5px] text-[#666666] dark:text-[#A1A1AA] font-semibold mt-0.5 transition-colors">{description}</div>
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
      className="rounded-2xl overflow-hidden bg-[#FFFFFF] border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.04)] dark:bg-[#111111] dark:border-white/10 dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-colors"
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-5 py-4 relative bg-black/5 dark:bg-white/5 border-b border-black/5 dark:border-white/10"
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
        className="text-[13.5px] tracking-tight font-semibold text-[#171717] dark:text-[#EDEDED]"
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
    <div className="flex items-center justify-between py-2.5 border-b border-black/5 dark:border-white/5">
      <span className="text-[12.5px] text-[#666666] dark:text-[#A1A1AA] font-mono font-semibold tracking-tight">{label}</span>
      <span className="text-[12.5px] font-mono font-semibold" style={{ color: valueColor || 'inherit' }}>{value}</span>
    </div>
  )
}

export default function SettingsPage() {
  const { darkMode, setDarkMode } = useTheme()
  const [notifications, setNotifications] = useState(true)

  return (
    <div className="p-6 space-y-5 animate-fade-in max-w-2xl mx-auto">

      {/* ── Premium Page header ─────────────────── */}
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/10"
        >
          <Settings className="w-5 h-5 text-[#666666] dark:text-[#A1A1AA]" />
        </div>
        <div>
        <h2
          className="text-[20px] tracking-tight font-semibold text-[#171717] dark:text-[#EDEDED] leading-tight"
        >
          Settings
        </h2>
        <p className="text-[12.5px] text-[#666666] dark:text-[#A1A1AA] font-semibold">Application preferences & display options</p>
      </div>
      </div>

      {/* ── Display Section ─────────────────────── */}
      <SettingSection icon={Monitor} title="Appearance">
        <Toggle 
          label="Dark Mode" 
          description="Use deep space theme" 
          checked={darkMode}
          onChange={setDarkMode}
          accentColor="#7c6aff" 
        />
        <Toggle 
          label="Animations" 
          description="Enable glow and flow effects" 
          checked={true}
          onChange={() => {}}
        />
      </SettingSection>

      {/* ── Notifications Section ───────────────── */}
      <SettingSection icon={Bell} title="Alerts & Notifications">
        <Toggle 
          label="System Alerts" 
          description="Notify on critical failures" 
          checked={notifications}
          onChange={setNotifications}
          accentColor="#ff4d6d" 
        />
      </SettingSection>

      {/* ── About Section ───────────────────────── */}
      <div
        className="rounded-2xl overflow-hidden bg-[#FFFFFF] border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.04)] dark:bg-[#111111] dark:border-white/10 dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-colors"
      >
        <div
          className="flex items-center gap-3 px-5 py-4 relative bg-black/5 dark:bg-white/5 border-b border-black/5 dark:border-white/10"
        >
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#666666] dark:bg-[#A1A1AA]" />
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/10">
            <Info className="w-4 h-4 text-[#666666] dark:text-[#A1A1AA]" />
          </div>
          <span className="text-[13px] tracking-tight font-semibold text-[#171717] dark:text-[#EDEDED]">About</span>

          {/* Version badge */}
          <span
            className="ml-auto text-[10px] font-semibold tracking-tight px-2.5 py-1 rounded-md bg-[#60A5FA]/10 text-[#60A5FA] border border-[#60A5FA]/20"
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
          <InfoRow label="Mode"             value="LIVE (Connected)"       valueColor="#00e85c" />
        </div>

        {/* View Docs link */}
        <div className="px-5 pb-4 pt-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-200 bg-transparent border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-[#171717] dark:text-[#EDEDED]"
          >
            <span className="text-[12px] font-semibold tracking-tight">View Documentation</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
