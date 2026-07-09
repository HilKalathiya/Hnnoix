import { useState } from 'react'
import { Lock, Globe, Cpu, Copy, Check, RefreshCw, Save, AlertTriangle } from 'lucide-react'

/* ─── Copy-to-clipboard mini hook ────────────────────── */
function useCopy() {
  const [copied, setCopied] = useState(false)
  const copy = (val) => {
    navigator.clipboard?.writeText(val).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }
  return { copied, copy }
}

/* ─── Single input field ──────────────────────────────── */
function Field({ label, placeholder, value, onChange, type = 'text', mono = false, hint, copyable = false }) {
  const { copied, copy } = useCopy()
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-[12px] font-semibold text-slate-400 tracking-wide uppercase">
          {label}
        </label>
        {hint && (
          <span className="text-[10px] text-slate-700 font-mono">{hint}</span>
        )}
      </div>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value ?? ''}
          onChange={onChange}
          className={`w-full px-4 py-3 rounded-xl text-[13px] text-slate-200
                      placeholder-slate-700 focus:outline-none
                      transition-all duration-200
                      ${mono ? 'font-mono tracking-wider' : 'font-medium'}`}
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
          onFocus={e => {
            e.target.style.borderColor = 'rgba(124,106,255,0.45)'
            e.target.style.background  = 'rgba(124,106,255,0.04)'
            e.target.style.boxShadow   = '0 0 0 3px rgba(124,106,255,0.1), 0 0 16px rgba(124,106,255,0.08)'
          }}
          onBlur={e => {
            e.target.style.borderColor = 'rgba(255,255,255,0.08)'
            e.target.style.background  = 'rgba(255,255,255,0.03)'
            e.target.style.boxShadow   = 'none'
          }}
        />
        {copyable && (
          <button
            type="button"
            onClick={() => copy(placeholder)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center
                       rounded-md opacity-0 group-hover:opacity-100 transition-all duration-150"
            style={{ color: copied ? '#00e85c' : '#475569' }}
            title="Copy value"
          >
            {copied
              ? <Check className="w-3.5 h-3.5" />
              : <Copy  className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>
    </div>
  )
}

/* ─── Section card ────────────────────────────────────── */
function Section({ icon: Icon, title, subtitle, accentColor, children }) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(13,15,24,0.85)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 4px 32px rgba(0,0,0,0.35)',
      }}
    >
      {/* Section header */}
      <div
        className="flex items-center gap-3 px-6 py-4"
        style={{
          background: 'rgba(255,255,255,0.02)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: `${accentColor}14`,
            border: `1px solid ${accentColor}30`,
            boxShadow: `0 0 14px ${accentColor}12`,
          }}
        >
          <Icon className="w-4.5 h-4.5" style={{ color: accentColor, width: '18px', height: '18px' }} />
        </div>
        <div>
          <h3
            className="text-[14px] font-bold text-slate-100 tracking-tight"
          >
            {title}
          </h3>
          {subtitle && (
            <p className="text-[11px] text-slate-600 font-medium mt-0.5">{subtitle}</p>
          )}
        </div>

        {/* Top accent line */}
        <div
          className="ml-auto h-px w-12 rounded-full"
          style={{ background: `linear-gradient(90deg, ${accentColor}60, transparent)` }}
        />
      </div>

      {/* Fields grid */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
        {children}
      </div>
    </div>
  )
}

/* ─── Page ────────────────────────────────────────────── */
export default function ConfigPage() {
  const [saved, setSaved] = useState(false)

  const handleApply = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2200)
  }

  return (
    <div className="p-6 space-y-5 animate-fade-in max-w-4xl mx-auto">

      {/* ── Page header ──────────────────────────────── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2
            className="text-[22px] font-bold text-slate-100 tracking-tight leading-tight"
          >
            Network Profile
          </h2>
          <p className="text-[13px] text-slate-500 mt-1 font-medium">
            Subscriber identity & RAN parameters
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Reset button */}
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.09)',
              color: '#64748b',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset
          </button>

          {/* Apply & Restart */}
          <button
            onClick={handleApply}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold transition-all duration-200 active:scale-95"
            style={saved ? {
              background: 'rgba(0,232,92,0.15)',
              border: '1px solid rgba(0,232,92,0.4)',
              color: '#00e85c',
              boxShadow: '0 0 16px rgba(0,232,92,0.2)',
            } : {
              background: 'linear-gradient(135deg, rgba(124,106,255,0.2) 0%, rgba(0,148,255,0.15) 100%)',
              border: '1px solid rgba(124,106,255,0.4)',
              color: '#a9a0ff',
              boxShadow: '0 0 16px rgba(124,106,255,0.15)',
            }}
          >
            {saved
              ? <><Check className="w-4 h-4" /> Applied!</>
              : <><Save  className="w-4 h-4" /> Apply & Restart</>
            }
          </button>
        </div>
      </div>

      {/* ── Warning banner ───────────────────────────── */}
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-xl"
        style={{
          background: 'rgba(245,158,11,0.07)',
          border: '1px solid rgba(245,158,11,0.18)',
        }}
      >
        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
        <p className="text-[12px] text-amber-600 font-medium">
          Changes will restart the network stack. All active sessions will be terminated.
        </p>
      </div>

      {/* ── SIM Credentials ──────────────────────────── */}
      <Section
        icon={Lock}
        title="Subscriber Credentials (SIM)"
        subtitle="USIM identity & authentication keys"
        accentColor="#7c6aff"
      >
        <Field label="IMSI"   placeholder="001010000000001"                   mono copyable hint="15 digits" />
        <Field label="Key (K)" placeholder="00000000000000000000000000000001" mono copyable hint="128-bit hex" />
        <Field label="OPc"    placeholder="00000000000000000000000000000001"  mono copyable hint="128-bit hex" />
        <Field label="OP"     placeholder="00000000000000000000000000000001"  mono copyable hint="optional" />
      </Section>

      {/* ── PLMN & Core ──────────────────────────────── */}
      <Section
        icon={Globe}
        title="PLMN & Core Parameters"
        subtitle="Mobile country / network code and AMF endpoint"
        accentColor="#0094ff"
      >
        <Field label="MCC"      placeholder="001"      mono copyable hint="3 digits" />
        <Field label="MNC"      placeholder="01"       mono copyable hint="2–3 digits" />
        <Field label="AMF IP"   placeholder="127.0.0.5" mono copyable />
        <Field label="PLMN ID"  placeholder="00101"   mono copyable />
      </Section>

      {/* ── RAN / gNB ────────────────────────────────── */}
      <Section
        icon={Cpu}
        title="RAN / gNB Parameters"
        subtitle="Radio access network and base station configuration"
        accentColor="#00e85c"
      >
        <Field label="NR-ARFCN"          placeholder="641272" mono copyable hint="FR1 / FR2" />
        <Field label="Bandwidth (PRBs)"  placeholder="106"    mono copyable hint="100 MHz = 66 PRBs" />
        <Field label="gNB ID"            placeholder="0x1"    mono copyable hint="hex" />
        <Field label="TAC"               placeholder="1"      mono copyable hint="tracking area" />
      </Section>

    </div>
  )
}
