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

/* ─── Premium input field ──────────────────────────────── */
function Field({ label, placeholder, value, onChange, type = 'text', mono = false, hint, copyable = false }) {
  const { copied, copy } = useCopy()
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-2">
        <label className="text-[11.5px] font-bold text-slate-300 tracking-[0.08em] uppercase">
          {label}
        </label>
        {hint && (
          <span
            className="text-[10px] font-mono px-1.5 py-0.5 rounded"
            style={{ color: '#475569', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            {hint}
          </span>
        )}
      </div>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value ?? ''}
          onChange={onChange}
          className={`premium-input ${mono ? 'font-mono tracking-wider text-[12px]' : 'font-medium text-[13px]'}`}
          style={{ paddingRight: copyable ? '40px' : '16px' }}
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

/* ─── Premium section card ─────────────────────────────── */
function Section({ icon: Icon, title, subtitle, accentColor, badge, children }) {
  return (
    <div className="section-card">
      {/* Premium gradient section header */}
      <div
        className="flex items-center gap-3 px-6 py-4 relative overflow-hidden"
        style={{
          background: `linear-gradient(90deg, ${accentColor}0a 0%, rgba(255,255,255,0.015) 100%)`,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Accent left border */}
        <div
          className="absolute left-0 top-0 bottom-0 w-0.5"
          style={{ background: `linear-gradient(180deg, ${accentColor} 0%, ${accentColor}44 100%)`, boxShadow: `2px 0 12px ${accentColor}40` }}
        />

        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: `${accentColor}16`,
            border: `1px solid ${accentColor}2e`,
            boxShadow: `0 0 16px ${accentColor}16`,
          }}
        >
          <Icon style={{ color: accentColor, width: '18px', height: '18px' }} />
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className="text-[15px] font-bold text-slate-100 tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {title}
          </h3>
          {subtitle && (
            <p className="text-[11.5px] text-slate-400 font-medium mt-0.5">{subtitle}</p>
          )}
        </div>

        {badge && (
          <span
            className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full shrink-0"
            style={{ background: `${accentColor}12`, border: `1px solid ${accentColor}30`, color: accentColor }}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Fields grid */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
        {children}
      </div>
    </div>
  )
}

/* ─── Page ─────────────────────────────────────────────── */
export default function ConfigPage() {
  const [saved, setSaved] = useState(false)

  const handleApply = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2200)
  }

  return (
    <div className="p-6 space-y-5 animate-fade-in max-w-4xl mx-auto">

      {/* ── Premium Page header ───────────────────────── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2
              className="text-[24px] font-extrabold text-slate-100 tracking-tight leading-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Network Profile
            </h2>
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(124,106,255,0.1)', border: '1px solid rgba(124,106,255,0.25)', color: '#a09aff' }}
            >
              RF-SIM
            </span>
          </div>
          <p className="text-[13.5px] text-slate-400 font-medium">
            Subscriber identity &amp; RAN parameters for your 5G network
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Reset button */}
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-bold transition-all duration-200 active:scale-95"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
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
            className="btn-shimmer flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold transition-all duration-200 active:scale-95"
            style={saved ? {
              background: 'rgba(0,232,92,0.12)',
              border: '1px solid rgba(0,232,92,0.4)',
              color: '#00e85c',
              boxShadow: '0 0 20px rgba(0,232,92,0.2)',
            } : {
              background: 'linear-gradient(135deg, rgba(124,106,255,0.22) 0%, rgba(0,148,255,0.16) 100%)',
              border: '1px solid rgba(124,106,255,0.4)',
              color: '#a9a0ff',
              boxShadow: '0 4px 16px rgba(124,106,255,0.18)',
            }}
          >
            {saved
              ? <><Check className="w-4 h-4" /> Applied!</>
              : <><Save  className="w-4 h-4" /> Apply &amp; Restart</>
            }
          </button>
        </div>
      </div>

      {/* ── Premium Warning banner ────────────────────── */}
      <div
        className="flex items-center gap-3 px-4 py-3.5 rounded-xl"
        style={{
          background: 'linear-gradient(90deg, rgba(245,158,11,0.07) 0%, rgba(245,158,11,0.03) 100%)',
          border: '1px solid rgba(245,158,11,0.2)',
          boxShadow: '0 0 20px rgba(245,158,11,0.05)',
        }}
      >
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)' }}
        >
          <AlertTriangle className="w-4 h-4 text-amber-400" />
        </div>
        <div>
          <p className="text-[12px] text-amber-400 font-bold">Network Restart Required</p>
          <p className="text-[11px] text-amber-600 font-medium mt-0.5">
            Changes will restart the network stack. All active sessions will be terminated.
          </p>
        </div>
      </div>

      {/* ── SIM Credentials ──────────────────────────── */}
      <Section
        icon={Lock}
        title="Subscriber Credentials (SIM)"
        subtitle="USIM identity & authentication keys"
        accentColor="#7c6aff"
        badge="USIM"
      >
        <Field label="IMSI"    placeholder="001010000000001"                   mono copyable hint="15 digits" />
        <Field label="Key (K)" placeholder="00000000000000000000000000000001"  mono copyable hint="128-bit hex" />
        <Field label="OPc"     placeholder="00000000000000000000000000000001"  mono copyable hint="128-bit hex" />
        <Field label="OP"      placeholder="00000000000000000000000000000001"  mono copyable hint="optional" />
      </Section>

      {/* ── PLMN & Core ───────────────────────────────── */}
      <Section
        icon={Globe}
        title="PLMN & Core Parameters"
        subtitle="Mobile country / network code and AMF endpoint"
        accentColor="#0094ff"
        badge="5GC"
      >
        <Field label="MCC"      placeholder="001"       mono copyable hint="3 digits" />
        <Field label="MNC"      placeholder="01"        mono copyable hint="2–3 digits" />
        <Field label="AMF IP"   placeholder="127.0.0.5" mono copyable />
        <Field label="PLMN ID"  placeholder="00101"     mono copyable />
      </Section>

      {/* ── RAN / gNB ─────────────────────────────────── */}
      <Section
        icon={Cpu}
        title="RAN / gNB Parameters"
        subtitle="Radio access network and base station configuration"
        accentColor="#00e85c"
        badge="gNB"
      >
        <Field label="NR-ARFCN"          placeholder="641272" mono copyable hint="FR1 / FR2" />
        <Field label="Bandwidth (PRBs)"  placeholder="106"    mono copyable hint="100 MHz = 66 PRBs" />
        <Field label="gNB ID"            placeholder="0x1"    mono copyable hint="hex" />
        <Field label="TAC"               placeholder="1"      mono copyable hint="tracking area" />
      </Section>

    </div>
  )
}
