import { useState, useEffect } from 'react'
import { FileCode2, Save, RefreshCw, UserCheck, AlertTriangle, Check } from 'lucide-react'

// Mock Data
const MOCK_CONFIGS = {
  ue: `uicc0 = {
  imsi = "001010000000001";
  key = "00000000000000000000000000000001";
  opc= "00000000000000000000000000000001";
  dnn= "default";
  nssai_sst=1;
};`,
  gnb: `Active_gNBs = ( "gNB-HNX");
Asn1_verbosity = "none";

gNBs = (
  {
    gNB_ID    =  0xe00;
    gNB_name  =  "gNB-HNX";
    tracking_area_code  =  1;
    plmn_list = (
      { mcc = 001; mnc = 01; mnc_length = 2; snssaiList = ({ sst = 1; }) }
    );
    nr_cellid = 12345678L;
    min_rxtxtime = 6;
  }
);`,
  amf: `amf:
  sbi:
    server:
      no_tls: true
      cacert: /etc/hnnoixcore/tls/ca.crt
      key: /etc/hnnoixcore/tls/amf.key
      cert: /etc/hnnoixcore/tls/amf.crt
  ngap:
    server:
      - address: 127.0.0.5
  metrics:
    server:
      - address: 127.0.0.5
        port: 9090
  guami:
    - plmn_id:
        mcc: 001
        mnc: 01
      amf_id:
        region: 2
        set: 1`
}

function EditorPanel({ title, value, onChange, accentColor }) {
  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden h-full"
      style={{
        background: 'rgba(8,9,14,0.95)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 4px 40px rgba(0,0,0,0.5)',
      }}
    >
      <div
        className="flex items-center gap-2 px-4 py-3 shrink-0"
        style={{
          background: 'linear-gradient(90deg, rgba(16,18,28,0.98) 0%, rgba(12,14,22,0.98) 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          borderTop: `2px solid ${accentColor}`
        }}
      >
        <FileCode2 className="w-4 h-4" style={{ color: accentColor }} />
        <span className="text-[13px] font-bold text-slate-200 tracking-wide">{title}</span>
      </div>
      <div className="flex-1 p-0 relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          className="w-full h-full p-4 bg-transparent text-slate-300 font-mono text-[12px] leading-relaxed resize-none focus:outline-none custom-scrollbar"
          style={{ 
            color: '#c2c9d6',
            lineHeight: '1.6'
          }}
        />
      </div>
    </div>
  )
}

export default function ConfigPage() {
  const [configs, setConfigs] = useState({ ue: '', gnb: '', amf: '' })
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)

  // Mock fetch on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setConfigs(MOCK_CONFIGS)
      setLoading(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  const handleApply = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2200)
  }

  const handleReset = () => {
    setLoading(true)
    setTimeout(() => {
      setConfigs(MOCK_CONFIGS)
      setLoading(false)
    }, 400)
  }

  return (
    <div className="flex flex-col h-full animate-fade-in relative">
      <div className="p-6 flex-1 flex flex-col gap-5 overflow-y-auto pb-32">
        {/* ── Premium Page header ───────────────────────── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2
                className="text-[24px] font-extrabold text-slate-100 tracking-tight leading-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Network Configuration
              </h2>
              <span
                className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(124,106,255,0.1)', border: '1px solid rgba(124,106,255,0.25)', color: '#a09aff' }}
              >
                RAW EDIT
              </span>
            </div>
            <p className="text-[13.5px] text-slate-400 font-medium">
              Directly modify configuration files for the UE, gNB, and AMF.
            </p>
          </div>
        </div>

        {/* ── Premium Warning banner ────────────────────── */}
        <div
          className="flex items-center gap-3 px-4 py-3.5 rounded-xl shrink-0"
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
            <p className="text-[12px] text-amber-400 font-bold">Advanced Editor Mode</p>
            <p className="text-[11px] text-amber-600 font-medium mt-0.5">
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
        className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0"
        style={{
          background: 'rgba(12,14,22,0.85)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 -10px 40px rgba(0,0,0,0.3)',
        }}
      >
        <button
          onClick={handleReset}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-bold transition-all duration-200 active:scale-95 w-full sm:w-auto"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#64748b',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
          onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reload from Server
        </button>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold transition-all duration-200 active:scale-95 w-full sm:w-auto"
            style={{
              background: 'rgba(124,106,255,0.1)',
              border: '1px solid rgba(124,106,255,0.3)',
              color: '#a09aff',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,106,255,0.15)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(124,106,255,0.1)' }}
          >
            <UserCheck className="w-4 h-4" />
            Set Subscriber
          </button>

          <button
            onClick={handleApply}
            className="btn-shimmer flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-[13px] font-bold transition-all duration-200 active:scale-95 w-full sm:w-auto"
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
              : <><Save  className="w-4 h-4" /> Update Config Files</>
            }
          </button>
        </div>
      </div>
    </div>
  )
}
