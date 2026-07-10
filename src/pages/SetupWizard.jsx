import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

// ─── API Base URL ────────────────────────────────────────────────────────────
// Swap this for your actual backend URL, e.g. "http://localhost:3000"
const API_BASE = ''

// ─── DEV MOCK ────────────────────────────────────────────────────────────────
// Set to true to simulate API success without a running backend.
// Set to false (or remove) when your real backend is live.
const DEV_MOCK = true

// ─── Safe JSON fetcher ───────────────────────────────────────────────────────
async function safeFetch(url) {
  const res = await fetch(url)
  const contentType = res.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) {
    throw new Error(
      `Server returned HTTP ${res.status} — expected JSON but got HTML.\n` +
      `Is your backend running at "${API_BASE || window.location.origin}"?`
    )
  }
  const data = await res.json()
  return data
}

// ─── Step constants ──────────────────────────────────────────────────────────
const STEP = {
  WELCOME: 'welcome',
  CLONE:   'clone',
  BUILD:   'build',
}

// ─── Premium SVG Logo Mark ───────────────────────────────────────────────────
function LogoMark({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c6aff" />
          <stop offset="100%" stopColor="#0094ff" />
        </linearGradient>
        <linearGradient id="logoGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00e85c" />
          <stop offset="100%" stopColor="#0094ff" />
        </linearGradient>
        <radialGradient id="logoGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(124,106,255,0.3)" />
          <stop offset="100%" stopColor="rgba(124,106,255,0)" />
        </radialGradient>
      </defs>
      {/* Outer ring */}
      <circle cx="40" cy="40" r="38" stroke="url(#logoGrad1)" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.5" />
      {/* Middle ring */}
      <circle cx="40" cy="40" r="30" stroke="url(#logoGrad2)" strokeWidth="1" opacity="0.3" />
      {/* Signal waves left */}
      <path d="M18 40 Q22 32 18 24" stroke="url(#logoGrad1)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M12 40 Q18 28 12 16" stroke="url(#logoGrad1)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />
      {/* Signal waves right */}
      <path d="M62 40 Q58 32 62 24" stroke="url(#logoGrad2)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M68 40 Q62 28 68 16" stroke="url(#logoGrad2)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />
      {/* Antenna tower */}
      <line x1="40" y1="20" x2="40" y2="60" stroke="url(#logoGrad1)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="32" y1="50" x2="48" y2="50" stroke="url(#logoGrad1)" strokeWidth="2" strokeLinecap="round" />
      <line x1="34" y1="44" x2="46" y2="44" stroke="url(#logoGrad2)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Top beacon */}
      <circle cx="40" cy="20" r="4" fill="url(#logoGrad2)" />
      <circle cx="40" cy="20" r="7" stroke="url(#logoGrad2)" strokeWidth="1" opacity="0.4" />
      {/* Base */}
      <path d="M30 60 L28 66 L52 66 L50 60" stroke="url(#logoGrad1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

// ─── Premium Particle Canvas ─────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let W = canvas.width  = window.innerWidth
    let H = canvas.height = window.innerHeight
    let animId

    const onResize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    const count = 90
    const particles = Array.from({ length: count }, () => ({
      x:     Math.random() * W,
      y:     Math.random() * H,
      r:     Math.random() * 1.6 + 0.3,
      vx:    (Math.random() - 0.5) * 0.22,
      vy:    (Math.random() - 0.5) * 0.22,
      color: ['rgba(0,232,92,', 'rgba(0,148,255,', 'rgba(124,106,255,', 'rgba(0,212,255,'][Math.floor(Math.random() * 4)],
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.1
            ctx.strokeStyle = `rgba(124,106,255,${alpha})`
            ctx.lineWidth = 0.7
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color + '0.6)'
        ctx.fill()
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0)  p.x = W
        if (p.x > W)  p.x = 0
        if (p.y < 0)  p.y = H
        if (p.y > H)  p.y = 0
      })

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}

// ─── Premium Spinner ─────────────────────────────────────────────────────────
function Spinner({ color = '#00e85c' }) {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-14 h-14">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: `2px solid rgba(255,255,255,0.04)`,
          }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            borderTop: `2px solid ${color}`,
            borderRight: `2px solid ${color}44`,
            animation: 'spin 0.75s linear infinite',
            boxShadow: `0 0 18px ${color}44`,
          }}
        />
        <div
          className="absolute inset-2 rounded-full"
          style={{
            borderBottom: `1.5px solid ${color}33`,
            animation: 'spin 1.5s linear infinite reverse',
          }}
        />
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ color }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: color, boxShadow: `0 0 6px ${color}` }}
          />
        </div>
      </div>
    </div>
  )
}

// ─── Premium Step Indicator ──────────────────────────────────────────────────
function StepDots({ step }) {
  const steps  = [STEP.WELCOME, STEP.CLONE, STEP.BUILD]
  const labels = ['Welcome', 'Clone', 'Build']
  const idx    = steps.indexOf(step)
  return (
    <div className="flex items-center gap-2 mb-10">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className="transition-all duration-500 rounded-full flex items-center justify-center text-[10px] font-bold font-mono"
              style={{
                width:       i <= idx ? 30 : 24,
                height:      i <= idx ? 30 : 24,
                background:  i < idx
                  ? 'linear-gradient(135deg,#00e85c,#00c94d)'
                  : i === idx
                    ? 'linear-gradient(135deg,#7c6aff,#0094ff)'
                    : 'rgba(255,255,255,0.04)',
                border:      i === idx
                  ? '1.5px solid rgba(124,106,255,0.7)'
                  : i < idx
                    ? '1.5px solid rgba(0,232,92,0.5)'
                    : '1.5px solid rgba(255,255,255,0.08)',
                boxShadow:   i === idx
                  ? '0 0 16px rgba(124,106,255,0.6)'
                  : i < idx
                    ? '0 0 12px rgba(0,232,92,0.5)'
                    : 'none',
                color:       i <= idx ? '#fff' : 'rgba(255,255,255,0.25)',
              }}
            >
              {i < idx ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              ) : i + 1}
            </div>
            {idx === i && (
              <span className="text-[9px] font-mono font-semibold tracking-widest uppercase" style={{ color: '#7c6aff' }}>
                {labels[i]}
              </span>
            )}
          </div>
          {i < steps.length - 1 && (
            <div
              className="transition-all duration-700 mb-4"
              style={{
                width: 40,
                height: 1.5,
                background: i < idx
                  ? 'linear-gradient(90deg,#00e85c,#7c6aff)'
                  : 'rgba(255,255,255,0.06)',
                boxShadow: i < idx ? '0 0 8px rgba(0,232,92,0.4)' : 'none',
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Premium Terminal Log Line ────────────────────────────────────────────────
function TermLine({ text, color = '#64748b', delay = 0 }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  return (
    <div
      className="font-mono text-xs flex items-start gap-2 transition-all duration-400"
      style={{
        color,
        opacity:   visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-10px)',
      }}
    >
      <span style={{ color: 'rgba(124,106,255,0.5)', marginTop: 1, flexShrink: 0 }}>$</span>
      <span style={{ lineHeight: 1.6 }}>{text}</span>
    </div>
  )
}

// ─── Premium Terminal Window ─────────────────────────────────────────────────
function TerminalWindow({ title, children }) {
  return (
    <div
      className="w-full rounded-xl text-left scanlines relative overflow-hidden"
      style={{
        background: 'rgba(4,5,8,0.85)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)',
      }}
    >
      {/* Mac-style title bar */}
      <div
        className="flex items-center gap-2 px-4 py-2.5 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}
      >
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#febc2e' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
        <span className="font-mono text-[10px] text-slate-600 ml-2 flex-1 text-center">{title}</span>
      </div>
      <div className="p-4 space-y-1.5">{children}</div>
    </div>
  )
}

// ─── WELCOME STEP ─────────────────────────────────────────────────────────────
function WelcomeStep({ onBegin }) {
  const lines = [
    { text: 'system --check-dependencies',  color: '#94a3b8', delay: 200  },
    { text: 'docker --version 24.0.6',       color: '#3db0ff', delay: 700  },
    { text: 'cmake --version 3.26.4',        color: '#3db0ff', delay: 1100 },
    { text: 'Initializing Duranta setup…',   color: '#00e85c', delay: 1600 },
  ]

  return (
    <div className="flex flex-col items-center text-center" style={{ animation: 'wizardFadeSlide 0.5s ease-out both' }}>
      {/* Premium Logo */}
      <div className="relative mb-5">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center relative"
          style={{
            background: 'linear-gradient(135deg, rgba(124,106,255,0.15) 0%, rgba(0,148,255,0.1) 100%)',
            border: '1px solid rgba(124,106,255,0.3)',
            boxShadow: '0 0 40px rgba(124,106,255,0.2), inset 0 1px 0 rgba(255,255,255,0.08)',
          }}
        >
          <LogoMark size={52} />
        </div>
        {/* Animated rings */}
        <div className="absolute inset-0 rounded-2xl" style={{ border: '1.5px solid rgba(0,232,92,0.2)', animation: 'wizardRing 3s ease-in-out infinite' }} />
        <div className="absolute -inset-2 rounded-3xl" style={{ border: '1px solid rgba(124,106,255,0.1)', animation: 'wizardRing2 4s ease-in-out infinite' }} />
      </div>

      {/* Status Badge */}
      <div
        className="flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5 font-mono text-xs font-bold tracking-widest uppercase"
        style={{
          background:  'rgba(0,232,92,0.08)',
          border:      '1px solid rgba(0,232,92,0.2)',
          color:       '#00e85c',
          letterSpacing: '0.16em',
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00e85c', boxShadow: '0 0 8px #00e85c', display: 'inline-block', animation: 'pulse 2s ease infinite' }} />
        System Initialization
      </div>

      {/* Title */}
      <h1
        className="text-[32px] font-extrabold mb-1.5 leading-tight"
        style={{ fontFamily: "'Syne', sans-serif", letterSpacing: '-0.035em' }}
      >
        <span className="brand-gradient">Duranta</span>
        <span style={{ color: '#dce4ff' }}> + Open5GS</span>
      </h1>
      <p
        className="text-[15px] font-bold mb-1"
        style={{
          background: 'linear-gradient(90deg,#a09aff,#3db0ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontFamily: "'Syne', sans-serif",
        }}
      >
        5G Network Orchestrator
      </p>

      {/* Description */}
      <p
        className="text-[14px] leading-relaxed max-w-sm mt-3 mb-7 font-medium"
        style={{ color: '#94a3c8', lineHeight: 1.75 }}
      >
        This wizard clones the OpenAirInterface repository and compiles the required RAN binaries before launching the dashboard.
        Requires internet access and may take several minutes.
      </p>

      {/* Terminal preview */}
      <div className="w-full max-w-sm mb-8">
        <TerminalWindow title="duranta — bash">
          {lines.map((l, i) => <TermLine key={i} {...l} />)}
          <div className="font-mono text-xs text-neon-400 terminal-cursor mt-1">&nbsp;</div>
        </TerminalWindow>
      </div>

      {/* CTA Button */}
      <button
        id="begin-setup-btn"
        onClick={onBegin}
        className="btn-shimmer relative group px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 active:scale-95"
        style={{
          background: 'linear-gradient(135deg, #7c6aff 0%, #0094ff 100%)',
          boxShadow: '0 4px 28px rgba(124,106,255,0.45), 0 1px 0 rgba(255,255,255,0.12) inset',
          color: '#fff',
          letterSpacing: '-0.01em',
        }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 36px rgba(124,106,255,0.6), 0 1px 0 rgba(255,255,255,0.12) inset'; e.currentTarget.style.transform = 'translateY(-1px)' }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 28px rgba(124,106,255,0.45), 0 1px 0 rgba(255,255,255,0.12) inset'; e.currentTarget.style.transform = '' }}
      >
        <span className="relative z-10 flex items-center gap-2.5">
          Begin System Setup
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </button>

      <p className="text-slate-600 text-xs font-mono mt-4">
        Estimated setup time: ~5–10 minutes
      </p>
    </div>
  )
}

// ─── CLONE STEP ───────────────────────────────────────────────────────────────
function CloneStep({ onProceed }) {
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const runClone = async () => {
    setStatus('loading')
    setErrorMsg('')

    if (DEV_MOCK) {
      await new Promise(r => setTimeout(r, 2400))
      setStatus('success')
      return
    }

    try {
      const data = await safeFetch(`${API_BASE}/api/setup`)
      setStatus(data.success ? 'success' : 'error')
      if (!data.success) setErrorMsg(data.message || 'Repository clone failed. Check backend logs.')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'Network error — could not reach the server.')
    }
  }

  useEffect(() => { runClone() }, [])

  const logLines = [
    { text: `git clone https://github.com/duranta-project/openairinterface5g`, color: '#3db0ff', delay: 0   },
    { text: 'Resolving deltas: 100% (18432/18432)', color: '#94a3b8', delay: 500 },
    { text: 'Receiving objects: 100% (124563/124563)', color: '#94a3b8', delay: 1000 },
    { text: 'Checking connectivity…', color: '#94a3b8', delay: 1600 },
  ]

  return (
    <div className="flex flex-col items-center text-center" style={{ animation: 'wizardFadeSlide 0.4s ease-out both' }}>
      <StepDots step={STEP.CLONE} />

      {/* Status area */}
      <div className="mb-6 w-full">
        {status === 'loading' && (
          <div className="flex flex-col items-center">
            <Spinner color="#0094ff" />
            <p className="mt-4 font-semibold text-slate-200 text-base">Cloning OpenAirInterface Repository…</p>
            <p className="text-slate-500 text-sm mt-1">Fetching from GitHub. Please wait.</p>
          </div>
        )}
        {status === 'success' && (
          <div className="animate-fade-in flex flex-col items-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
              style={{ background: 'rgba(0,232,92,0.1)', border: '1.5px solid rgba(0,232,92,0.4)', boxShadow: '0 0 32px rgba(0,232,92,0.3)' }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00e85c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <p className="font-bold text-neon-400 text-lg">Repository Cloned Successfully</p>
            <p className="text-slate-500 text-sm mt-1">openairinterface5g is ready on disk.</p>
          </div>
        )}
        {status === 'error' && (
          <div className="animate-fade-in flex flex-col items-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
              style={{ background: 'rgba(255,77,109,0.1)', border: '1.5px solid rgba(255,77,109,0.4)', boxShadow: '0 0 32px rgba(255,77,109,0.3)' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff4d6d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </div>
            <p className="font-bold text-danger-400 text-lg">Failed to Clone Repository</p>
            {errorMsg && <p className="text-slate-500 text-xs mt-1 max-w-xs">{errorMsg}</p>}
          </div>
        )}
      </div>

      {/* Terminal log */}
      <div className="w-full max-w-md mb-8">
        <TerminalWindow title="duranta — git">
          {logLines.map((l, i) => <TermLine key={i} {...l} />)}
          {status === 'success' && <TermLine text="Done. Repository cloned successfully." color="#00e85c" delay={0} />}
          {status === 'error'   && <TermLine text={`error: ${errorMsg}`} color="#ff4d6d" delay={0} />}
          {status === 'loading' && <div className="font-mono text-xs text-neon-400 terminal-cursor mt-1">&nbsp;</div>}
        </TerminalWindow>
      </div>

      {/* Actions */}
      {status === 'success' && (
        <button
          id="proceed-to-build-btn"
          onClick={onProceed}
          className="btn-shimmer relative px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #00e85c 0%, #00c94d 100%)',
            boxShadow: '0 4px 28px rgba(0,232,92,0.4)',
            color: '#07080c',
            letterSpacing: '-0.01em',
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 36px rgba(0,232,92,0.6)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 28px rgba(0,232,92,0.4)'; e.currentTarget.style.transform = '' }}
        >
          <span className="flex items-center gap-2.5">
            Proceed to Build
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </button>
      )}
      {status === 'error' && (
        <button
          id="retry-clone-btn"
          onClick={runClone}
          className="px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 active:scale-95"
          style={{
            background: 'rgba(255,77,109,0.1)',
            border: '1.5px solid rgba(255,77,109,0.4)',
            color: '#ff4d6d',
            boxShadow: '0 0 20px rgba(255,77,109,0.15)',
          }}
        >
          <span className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 4v6h-6M1 20v-6h6" /><path d="M3.51 9a9 9 0 0114.13-3.36L23 10M1 14l5.36 4.36A9 9 0 0020.49 15" />
            </svg>
            Retry Clone
          </span>
        </button>
      )}
    </div>
  )
}

// ─── BUILD STEP ───────────────────────────────────────────────────────────────
function BuildStep({ onLaunch }) {
  const [status, setStatus]     = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [progress, setProgress] = useState(0)

  const runBuild = async () => {
    setStatus('loading')
    setErrorMsg('')
    setProgress(0)

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 88) { clearInterval(interval); return prev }
        return prev + Math.random() * 2.8
      })
    }, 500)

    if (DEV_MOCK) {
      await new Promise(r => setTimeout(r, 3800))
      clearInterval(interval)
      setProgress(100)
      setStatus('success')
      return
    }

    try {
      const data = await safeFetch(`${API_BASE}/api/build`)
      clearInterval(interval)
      if (data.success) {
        setProgress(100)
        setStatus('success')
      } else {
        setProgress(0)
        setStatus('error')
        setErrorMsg(data.message || 'Compilation failed. Check backend logs.')
      }
    } catch (err) {
      clearInterval(interval)
      setProgress(0)
      setStatus('error')
      setErrorMsg(err.message || 'Network error — could not reach the server.')
    }
  }

  useEffect(() => { runBuild() }, [])

  const buildLogLines = [
    { text: 'cmake .. -DCMAKE_BUILD_TYPE=Release',         color: '#3db0ff', delay: 0    },
    { text: 'make -j$(nproc) nr-softmodem nr-uesoftmodem', color: '#94a3b8', delay: 500  },
    { text: 'Compiling gNB (nr-softmodem)…',               color: '#94a3b8', delay: 1100 },
    { text: 'Compiling nrUE (nr-uesoftmodem)…',            color: '#94a3b8', delay: 1700 },
    { text: 'Linking Phase 1 binaries…',                   color: '#a78bfa', delay: 2400 },
  ]

  return (
    <div className="flex flex-col items-center text-center" style={{ animation: 'wizardFadeSlide 0.4s ease-out both' }}>
      <StepDots step={STEP.BUILD} />

      {/* Status area */}
      <div className="mb-5 w-full">
        {status === 'loading' && (
          <div className="flex flex-col items-center">
            <Spinner color="#7c6aff" />
            <p className="mt-4 font-semibold text-slate-200 text-base">Compiling RAN Binaries (gNB & nrUE)…</p>
            <p className="text-slate-500 text-sm mt-1">This may take several minutes. Do not close this window.</p>
          </div>
        )}
        {status === 'success' && (
          <div className="animate-fade-in flex flex-col items-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
              style={{ background: 'rgba(0,232,92,0.1)', border: '1.5px solid rgba(0,232,92,0.4)', boxShadow: '0 0 32px rgba(0,232,92,0.35)' }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00e85c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <p className="font-bold text-neon-400 text-lg">Build Complete</p>
            <p className="text-slate-500 text-sm mt-1">All Phase 1 binaries compiled and ready.</p>
          </div>
        )}
        {status === 'error' && (
          <div className="animate-fade-in flex flex-col items-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
              style={{ background: 'rgba(255,77,109,0.1)', border: '1.5px solid rgba(255,77,109,0.4)', boxShadow: '0 0 32px rgba(255,77,109,0.3)' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff4d6d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </div>
            <p className="font-bold text-danger-400 text-lg">Build Failed</p>
            {errorMsg && <p className="text-slate-500 text-xs mt-1 max-w-xs">{errorMsg}</p>}
          </div>
        )}
      </div>

      {/* Progress bar */}
      {(status === 'loading' || status === 'success') && (
        <div className="w-full max-w-md mb-5">
          <div className="flex justify-between text-xs font-mono text-slate-500 mb-2">
            <span>Compilation Progress</span>
            <span style={{ color: status === 'success' ? '#00e85c' : '#7c6aff' }}>
              {Math.round(progress)}%
            </span>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${progress}%`,
                background: status === 'success'
                  ? 'linear-gradient(90deg,#00e85c,#00c94d)'
                  : 'linear-gradient(90deg,#7c6aff,#0094ff)',
                boxShadow: status === 'success'
                  ? '0 0 12px rgba(0,232,92,0.6)'
                  : '0 0 12px rgba(124,106,255,0.6)',
              }}
            />
          </div>
        </div>
      )}

      {/* Terminal log */}
      <div className="w-full max-w-md mb-8">
        <TerminalWindow title="duranta — make">
          {buildLogLines.map((l, i) => <TermLine key={i} {...l} />)}
          {status === 'success' && <TermLine text="Build succeeded — all Phase 1 binaries are ready." color="#00e85c" delay={0} />}
          {status === 'error'   && <TermLine text={`make: error: ${errorMsg}`} color="#ff4d6d" delay={0} />}
          {status === 'loading' && <div className="font-mono text-xs text-violet-400 terminal-cursor mt-1">&nbsp;</div>}
        </TerminalWindow>
      </div>

      {/* Actions */}
      {status === 'success' && (
        <button
          id="launch-dashboard-btn"
          onClick={onLaunch}
          className="btn-shimmer relative px-10 py-4 rounded-xl font-bold text-sm transition-all duration-200 active:scale-95"
          style={{
            background: 'linear-gradient(135deg,#00e85c,#7c6aff)',
            boxShadow: '0 6px 36px rgba(124,106,255,0.5), 0 4px 20px rgba(0,232,92,0.3)',
            color: '#fff',
            letterSpacing: '-0.01em',
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 48px rgba(124,106,255,0.65), 0 4px 24px rgba(0,232,92,0.4)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 6px 36px rgba(124,106,255,0.5), 0 4px 20px rgba(0,232,92,0.3)'; e.currentTarget.style.transform = '' }}
        >
          <span className="relative z-10 flex items-center gap-2.5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 006 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
              <path d="M9 18h6M10 22h4" />
            </svg>
            Launch Dashboard
          </span>
        </button>
      )}
      {status === 'error' && (
        <button
          id="retry-build-btn"
          onClick={runBuild}
          className="px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 active:scale-95"
          style={{
            background: 'rgba(255,77,109,0.1)',
            border: '1.5px solid rgba(255,77,109,0.4)',
            color: '#ff4d6d',
            boxShadow: '0 0 20px rgba(255,77,109,0.15)',
          }}
        >
          <span className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 4v6h-6M1 20v-6h6" /><path d="M3.51 9a9 9 0 0114.13-3.36L23 10M1 14l5.36 4.36A9 9 0 0020.49 15" />
            </svg>
            Retry Build
          </span>
        </button>
      )}
    </div>
  )
}

// ─── ROOT SETUP WIZARD ────────────────────────────────────────────────────────
export default function SetupWizard() {
  const [step, setStep] = useState(STEP.WELCOME)
  const navigate = useNavigate()

  const stepLabel = {
    [STEP.WELCOME]: 'Welcome',
    [STEP.CLONE]:   'Clone Repository',
    [STEP.BUILD]:   'Compile Binaries',
  }

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#07080c' }}
    >
      {/* Glow orbs */}
      <div className="wizard-orb" style={{ width: 600, height: 600, top: '50%', left: '50%', transform: 'translate(-50%, -65%)', background: 'radial-gradient(circle, rgba(124,106,255,0.08) 0%, transparent 70%)', animation: 'orbFloat 8s ease-in-out infinite' }} />
      <div className="wizard-orb" style={{ width: 400, height: 400, bottom: '10%', left: '10%', background: 'radial-gradient(circle, rgba(0,232,92,0.05) 0%, transparent 70%)', animation: 'orbPulse 5s ease-in-out infinite' }} />
      <div className="wizard-orb" style={{ width: 300, height: 300, top: '5%', right: '5%', background: 'radial-gradient(circle, rgba(0,148,255,0.06) 0%, transparent 70%)', animation: 'orbPulse 7s ease-in-out infinite reverse' }} />

      {/* Particle network */}
      <ParticleCanvas />

      {/* Grid background */}
      <div className="fixed inset-0 grid-bg opacity-30 pointer-events-none" style={{ zIndex: 1 }} />

      {/* Top glow line */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ width: 900, height: 1, zIndex: 2, boxShadow: '0 0 140px 50px rgba(124,106,255,0.15)' }}
      />

      {/* Card */}
      <div
        className="relative w-full mx-4 rounded-2xl p-8 md:p-10 overflow-hidden noise-overlay"
        style={{
          maxWidth: 580,
          zIndex: 10,
          background: 'linear-gradient(145deg, rgba(12,13,22,0.9) 0%, rgba(8,9,16,0.95) 100%)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.75), 0 0 0 1px rgba(124,106,255,0.1), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        {/* Corner accents */}
        <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none" style={{ background: 'radial-gradient(circle at 100% 0%, rgba(124,106,255,0.1) 0%, transparent 65%)', borderRadius: '0 16px 0 0' }} />
        <div className="absolute bottom-0 left-0 w-48 h-48 pointer-events-none" style={{ background: 'radial-gradient(circle at 0% 100%, rgba(0,232,92,0.06) 0%, transparent 65%)' }} />

        {/* Card header */}
        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: 'var(--neon)', boxShadow: '0 0 8px var(--neon)', animation: 'pulse 2s ease-in-out infinite' }}
            />
            <span className="font-mono text-xs font-bold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '0.16em' }}>
              DURANTA SETUP
            </span>
          </div>
          <span
            className="font-mono text-xs px-3 py-1.5 rounded-lg font-semibold"
            style={{
              background: 'rgba(124,106,255,0.1)',
              border: '1px solid rgba(124,106,255,0.25)',
              color: '#a09aff',
            }}
          >
            {stepLabel[step]}
          </span>
        </div>

        {/* Step content */}
        <div className="relative z-10">
          {step === STEP.WELCOME && <WelcomeStep onBegin={() => setStep(STEP.CLONE)} />}
          {step === STEP.CLONE   && <CloneStep   onProceed={() => setStep(STEP.BUILD)} />}
          {step === STEP.BUILD   && <BuildStep   onLaunch={() => navigate('/dashboard', { replace: true })} />}
        </div>
      </div>

      {/* Footer */}
      <p
        className="relative mt-5 font-mono text-[11px] text-center"
        style={{ color: 'rgba(255,255,255,0.12)', zIndex: 10 }}
      >
        Duranta 5G Network Orchestrator &nbsp;·&nbsp; System Initialization v1.0
        {DEV_MOCK && (
          <span className="ml-2 px-1.5 py-0.5 rounded text-amber-500" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)' }}>
            MOCK MODE
          </span>
        )}
      </p>
    </div>
  )
}
