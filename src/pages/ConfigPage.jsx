import { useState, useEffect } from 'react'
import { FileCode2, Save, RefreshCw, UserCheck, AlertTriangle, Check } from 'lucide-react'

const API_BASE = ''

function EditorPanel({ title, value, onChange, accentColor }) {
  return (
    <div
      className="flex flex-col rounded-lg overflow-hidden h-full bg-[#F8FAFC] border border-slate-200 shadow-inner dark:bg-[#0A0A0A] dark:border-gray-800 dark:shadow-xl transition-colors"
    >
      <div
        className="flex items-center gap-2 px-4 py-3 shrink-0 bg-slate-100 dark:bg-white/5 border-b border-slate-200 dark:border-gray-800"
        style={{ borderTop: `2px solid ${accentColor}` }}
      >
        <FileCode2 className="w-4 h-4" style={{ color: accentColor }} />
        <span className="text-[13px] tracking-tight font-semibold text-slate-900 dark:text-[#EDEDED]">{title}</span>
      </div>
      <div className="flex-1 p-0 relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          className="w-full h-full p-4 bg-transparent text-slate-700 dark:text-[#EDEDED] font-mono text-[13px] leading-relaxed resize-none focus:outline-none custom-scrollbar transition-colors"
        />
      </div>
    </div>
  )
}

export default function ConfigPage() {
  const [configs, setConfigs] = useState({ ue: '', gnb: '', amf: '' })
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const fetchConfigs = async () => {
    setLoading(true)
    setErrorMsg('')
    try {
      const res = await fetch(`${API_BASE}/api/edit/all`)
      const data = await res.json()
      if (data.success) {
        setConfigs({ ue: data.ue || '', gnb: data.gnb || '', amf: data.amf || '' })
      } else {
        setErrorMsg(data.message || 'Failed to fetch configs.')
      }
    } catch (err) {
      setErrorMsg(err.message || 'Network error.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchConfigs()
  }, [])

  const handleApply = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/edit/all`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(configs)
      })
      const data = await res.json()
      if (data.success) {
        setSaved(true)
        setTimeout(() => setSaved(false), 2200)
      } else {
        alert('Failed to save: ' + (data.message || 'Unknown error') + '\n\nDetails: ' + (data.error || ''))
      }
    } catch (err) {
      alert('Error saving configs: ' + err.message)
    }
  }

  const handleReset = () => {
    fetchConfigs()
  }

  return (
    <div className="flex flex-col h-full animate-fade-in relative">
      <div className="p-6 flex-1 flex flex-col gap-5 overflow-y-auto pb-32">
        {/* ── Premium Page header ───────────────────────── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2
                className="text-[24px] tracking-tight font-semibold text-[#171717] dark:text-[#EDEDED] leading-tight"
              >
                Network Configuration
              </h2>
              <span
                className="text-[10px] font-semibold uppercase tracking-tight px-2 py-0.5 rounded-md bg-[#60A5FA]/10 text-[#60A5FA] border border-[#60A5FA]/20"
              >
                RAW EDIT
              </span>
            </div>
            <p className="text-[13.5px] text-[#666666] dark:text-[#A1A1AA] font-semibold">
              Directly modify configuration files for the UE, gNB, and AMF.
            </p>
          </div>
        </div>

        {/* ── Premium Warning banner ────────────────────── */}
        <div
          className="flex items-center gap-3 px-4 py-3.5 rounded-xl shrink-0 bg-[#FBBF24]/10 border border-[#FBBF24]/20"
        >
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-[#FBBF24]/10 border border-[#FBBF24]/20"
          >
            <AlertTriangle className="w-4 h-4 text-[#FBBF24]" />
          </div>
          <div>
            <p className="text-[12px] text-[#FBBF24] font-semibold tracking-tight">Advanced Editor Mode</p>
            <p className="text-[11px] text-[#FBBF24]/80 font-semibold mt-0.5">
              Syntax errors in these files may prevent the network stack from starting. Changes will require a full network restart.
            </p>
          </div>
        </div>

        {/* ── 3-Column Editors ──────────────────────────── */}
        <div className="flex-1 min-h-[400px]">
          {loading ? (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <RefreshCw className="w-8 h-8 text-slate-500 animate-spin mb-4" />
              <p className="text-slate-400 font-mono text-sm">Fetching configuration files...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 h-full auto-rows-[minmax(300px,1fr)] lg:auto-rows-auto">
              <EditorPanel 
                title="ue.conf" 
                value={configs.ue} 
                onChange={(v) => setConfigs({ ...configs, ue: v })}
                accentColor="#c084fc"
              />
              <EditorPanel 
                title="gnb.conf" 
                value={configs.gnb} 
                onChange={(v) => setConfigs({ ...configs, gnb: v })}
                accentColor="#00e85c"
              />
              <EditorPanel 
                title="amf.yaml" 
                value={configs.amf} 
                onChange={(v) => setConfigs({ ...configs, amf: v })}
                accentColor="#0094ff"
              />
            </div>
          )}
        </div>
      </div>

      {/* ── Sticky Bottom Action Bar ───────────────────── */}
      <div 
        className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 bg-white/80 dark:bg-[#0A0A0A]/80 backdrop-blur-xl border-t border-black/5 dark:border-white/10 transition-colors duration-300 shadow-[0_-8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_-8px_30px_rgb(0,0,0,0.12)]"
      >
        <button
          onClick={handleReset}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-semibold transition-all duration-200 active:scale-95 w-full sm:w-auto bg-transparent border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-[#171717] dark:text-[#EDEDED]"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reload from Server
        </button>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-[12px] font-semibold transition-all duration-200 active:scale-95 w-full sm:w-auto bg-[#171717] text-[#EDEDED] hover:bg-black dark:bg-[#EDEDED] dark:text-[#0A0A0A] dark:hover:bg-white"
          >
            <UserCheck className="w-4 h-4" />
            Set Subscriber
          </button>

          <button
            onClick={handleApply}
            className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-[12px] font-semibold transition-all duration-200 active:scale-95 w-full sm:w-auto ${
              saved 
                ? 'bg-[#32D74B] text-white shadow-[0_0_15px_rgba(50,215,75,0.4)]' 
                : 'bg-[#171717] text-[#EDEDED] hover:bg-black dark:bg-[#EDEDED] dark:text-[#0A0A0A] dark:hover:bg-white'
            }`}
          >
            {saved
              ? <><Check className="w-4 h-4" /> Applied!</>
              : <><Save  className="w-4 h-4" /> Update Config Files</>
            }
          </button>
        </div>
      </div>
    </div>
  )
}
