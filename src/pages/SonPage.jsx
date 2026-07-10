import { Radio } from 'lucide-react'

// Premium SVG for SON page - orbital rings around a signal icon
function SonOrbitalLogo() {
  return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      {/* Orbit ring 1 */}
      <div
        className="orbit-ring-1 absolute"
        style={{
          width: '140px',
          height: '140px',
          borderRadius: '50%',
          border: '1px solid rgba(192,132,252,0.25)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Orbiting dot */}
        <div
          className="absolute"
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#c084fc',
            boxShadow: '0 0 8px rgba(192,132,252,0.8)',
            top: '-3px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
      </div>

      {/* Orbit ring 2 */}
      <div
        className="orbit-ring-2 absolute"
        style={{
          width: '108px',
          height: '108px',
          borderRadius: '50%',
          border: '1px solid rgba(0,148,255,0.2)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Orbiting dot */}
        <div
          className="absolute"
          style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: '#0094ff',
            boxShadow: '0 0 8px rgba(0,148,255,0.8)',
            bottom: '-2.5px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
      </div>

      {/* Orbit ring 3 */}
      <div
        className="orbit-ring-3 absolute"
        style={{
          width: '76px',
          height: '76px',
          borderRadius: '50%',
          border: '1px solid rgba(0,232,92,0.15)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Orbiting dot */}
        <div
          className="absolute"
          style={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: '#00e85c',
            boxShadow: '0 0 6px rgba(0,232,92,0.8)',
            right: '-2px',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        />
      </div>

      {/* Center icon */}
      <div
        className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, rgba(192,132,252,0.15) 0%, rgba(0,148,255,0.1) 100%)',
          border: '1px solid rgba(192,132,252,0.3)',
          boxShadow: '0 0 32px rgba(192,132,252,0.2)',
        }}
      >
        <Radio className="w-8 h-8" style={{ color: '#c084fc' }} />
      </div>
    </div>
  )
}

const PLANNED_FEATURES = [
  { label: 'Coverage Optimization',   desc: 'Automatic antenna tilt & power control' },
  { label: 'Handover Tuning',          desc: 'ML-driven A3/A5 event threshold optimization' },
  { label: 'Load Balancing',           desc: 'Intelligent UE redistribution across cells' },
  { label: 'Interference Management', desc: 'ICIC and eICIC for coexistence' },
]

export default function SonPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full gap-8 animate-fade-in p-8">

      {/* Orbital logo animation */}
      <SonOrbitalLogo />

      {/* Text */}
      <div className="text-center max-w-sm">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-[10px] font-bold uppercase tracking-widest"
          style={{ background: 'rgba(192,132,252,0.1)', border: '1px solid rgba(192,132,252,0.25)', color: '#c084fc' }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#c084fc', boxShadow: '0 0 6px #c084fc', display: 'inline-block' }} />
          Self-Organizing Network
        </div>
        <h2
          className="text-[26px] font-extrabold text-slate-100 tracking-tight mb-2"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          SON Module
        </h2>
        <p className="text-[14px] text-slate-400 leading-relaxed font-medium">
          Automatic optimization of coverage, capacity, and handover parameters using
          real-time telemetry from the Duranta gNB and nrUE. <em className="text-slate-200 not-italic font-semibold">Coming in a future sprint.</em>
        </p>
      </div>

      {/* Planned features */}
      <div
        className="w-full max-w-sm rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, rgba(12,14,22,0.88) 0%, rgba(9,10,17,0.9) 100%)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        <div className="px-5 py-3.5 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(192,132,252,0.05)' }}>
          <p
            className="text-[11px] font-bold text-slate-300 uppercase tracking-widest"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Planned Features
          </p>
        </div>
        <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
          {PLANNED_FEATURES.map(({ label, desc }) => (
            <div key={label} className="flex items-center gap-3 px-5 py-3.5">
              {/* Lock icon */}
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: 'rgba(192,132,252,0.08)', border: '1px solid rgba(192,132,252,0.18)' }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              </div>
              <div>
                <div className="text-[13px] font-semibold text-slate-200">{label}</div>
                <div className="text-[11.5px] text-slate-500 mt-0.5 font-medium">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Under construction badge */}
      <div
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl"
        style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', boxShadow: '0 0 20px rgba(245,158,11,0.06)' }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.91 8.84L8.56 2.23a1.93 1.93 0 00-1.81 0L3.1 4.13a2.12 2.12 0 00-.05 3.69l12.22 6.93a2 2 0 001.94 0L21 12.51a2.12 2.12 0 00-.09-3.67z" />
          <path d="M3.09 8.84L5.45 10.1" /><path d="M20.91 15.16l-2.36-1.26" />
          <path d="M8.56 21.77l-4.25-2.41A1.93 1.93 0 013.1 17.64v-2.28" />
          <path d="M20.91 15.16v2.28a2.12 2.12 0 01-1.2 1.72l-4.25 2.41a1.93 1.93 0 01-1.81 0" />
        </svg>
        <span className="text-[11px] text-amber-400 font-bold uppercase tracking-widest">Under Construction</span>
      </div>
    </div>
  )
}
