import { useEffect, useRef, useState, useCallback } from 'react'
import {
  Play, Pause, Trash2, Download, Filter,
  ChevronDown, Search, AlignJustify, Hash,
} from 'lucide-react'
import { generateLogEntry, generateStartupBatch } from '../../utils/mockLogGenerator'

// ─── Config ────────────────────────────────────────────────
const STREAM_INTERVAL_MS = 280
const MAX_LOG_LINES      = 2000
const BATCH_SIZE         = 1

// ─── Level badge styles ───────────────────────────────────
const LEVEL_STYLE = {
  INFO: { bg: 'rgba(100,116,139,0.15)', color: '#64748b',  dot: '#64748b'  },
  WARN: { bg: 'rgba(245,158,11,0.12)',  color: '#f59e0b',  dot: '#f59e0b'  },
  MDT:  { bg: 'rgba(248,113,113,0.12)', color: '#f87171',  dot: '#f87171'  },
  SYS:  { bg: 'rgba(0,148,255,0.12)',   color: '#0094ff',  dot: '#0094ff'  },
}

// ─── Tag filter config ────────────────────────────────────
const TAG_FILTERS = [
  { tag: 'ALL',      color: '#7c6aff', dot: true  },
  { tag: '[NGAP]',   color: '#3db0ff', dot: true  },
  { tag: '[NR_RRC]', color: '#00e85c', dot: true  },
  { tag: '[NAS]',    color: '#a78bfa', dot: true  },
  { tag: '[GTPU]',   color: '#fbbf24', dot: true  },
  { tag: '[MDT]',    color: '#f87171', dot: true  },
  { tag: '[TUN]',    color: '#34d399', dot: true  },
  { tag: '[AMF]',    color: '#38bdf8', dot: true  },
  { tag: '[SMF]',    color: '#fb923c', dot: true  },
  { tag: '[PHY]',    color: '#c084fc', dot: true  },
  { tag: '[MAC]',    color: '#e879f9', dot: true  },
  { tag: '[SYS]',    color: '#94a3b8', dot: true  },
]

// ─── Single log line ─────────────────────────────────────
function LogLine({ entry, showIndex }) {
  const lvl = LEVEL_STYLE[entry.level] ?? LEVEL_STYLE.INFO
  return (
    <div
      className="flex items-start gap-2 px-4 py-[4px] font-mono text-[12px] leading-relaxed
                 hover:bg-white/[0.03] transition-colors group"
    >
      {showIndex && (
        <span className="w-9 text-right text-slate-800 shrink-0 select-none tabular-nums group-hover:text-slate-600 transition-colors text-[11px]">
          {entry.id}
        </span>
      )}

      {/* Timestamp */}
      <span className="text-slate-700 shrink-0 tabular-nums text-[11px]">{entry.ts}</span>

      {/* Level badge */}
      <span
        className="inline-flex items-center gap-1 px-1.5 py-px rounded-md text-[10px] font-bold uppercase shrink-0"
        style={{ background: lvl.bg, color: lvl.color }}
      >
        <span className="w-1 h-1 rounded-full shrink-0" style={{ background: lvl.dot }} />
        {entry.level}
      </span>

      {/* Tag */}
      <span className={`shrink-0 font-semibold text-[12px] ${entry.cls}`}>{entry.tag}</span>

      {/* Message */}
      <span className="text-slate-400 break-all text-[12px]">{entry.msg}</span>
    </div>
  )
}

// ─── Stats card ───────────────────────────────────────────
function StatCard({ label, value, accent, icon: Icon }) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.01] cursor-default relative overflow-hidden"
      style={{
        background: 'rgba(14,16,26,0.8)',
        border: `1px solid ${accent}20`,
        boxShadow: `inset 3px 0 0 ${accent}`,
      }}
    >
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: `${accent}15` }}
      >
        <Icon className="w-4 h-4" style={{ color: accent }} />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] text-slate-600 font-semibold leading-tight">{label}</div>
        <div className="text-[20px] font-bold font-mono tabular-nums leading-tight" style={{ color: accent }}>{value}</div>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────
export default function LogViewer() {
  const [logs,       setLogs]       = useState([])

  const streamRef    = useRef(null)

  // Boot sequence
  useEffect(() => {
    setLogs(generateStartupBatch())
  }, [])

  // Live stream always runs. Panes can choose to freeze their view.
  useEffect(() => {
    streamRef.current = setInterval(() => {
      const newEntries = Array.from({ length: BATCH_SIZE }, generateLogEntry)
      setLogs(prev => {
        const combined = [...prev, ...newEntries]
        return combined.length > MAX_LOG_LINES
          ? combined.slice(combined.length - MAX_LOG_LINES)
          : combined
      })
    }, STREAM_INTERVAL_MS)
    return () => clearInterval(streamRef.current)
  }, [])

  const handleScroll = useCallback((e, setAutoScrollState) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target
    setAutoScrollState(scrollHeight - scrollTop - clientHeight < 40)
  }, [])

  const stats = {
    total: logs.length,
    warn:  logs.filter(l => l.level === 'WARN').length,
    mdt:   logs.filter(l => l.level === 'MDT').length,
    sys:   logs.filter(l => l.level === 'SYS').length,
  }

  const gnbLogs = logs.filter(l => l.panel === 'gNB')
  const ueLogs  = logs.filter(l => l.panel === 'nrUE')

  return (
    <div className="flex flex-col h-full p-4 gap-3 animate-fade-in">
      {/* ── Stats strip ──────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 shrink-0">
        <StatCard label="Total Lines" value={stats.total} accent="#7c6aff" icon={AlignJustify} />
        <StatCard label="Warnings"    value={stats.warn}  accent="#f59e0b" icon={AlignJustify} />
        <StatCard label="MDT Events"  value={stats.mdt}   accent="#f87171" icon={AlignJustify} />
        <StatCard label="System"      value={stats.sys}   accent="#0094ff" icon={AlignJustify} />
      </div>

      {/* ── Dual Pane Terminal Windows ───────────────────────────── */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
        <LogPane
          title="gNB Base Station Logs"
          baseLogs={gnbLogs}
          handleScroll={handleScroll}
          clearLogs={() => setLogs(prev => prev.filter(l => l.panel !== 'gNB'))}
        />
        <LogPane
          title="nrUE Handset Logs"
          baseLogs={ueLogs}
          handleScroll={handleScroll}
          clearLogs={() => setLogs(prev => prev.filter(l => l.panel !== 'nrUE'))}
        />
      </div>
    </div>
  )
}

function LogPane({ title, baseLogs, clearLogs, handleScroll }) {
  const [autoScroll, setAutoScroll] = useState(true)
  const [streaming, setStreaming]   = useState(true)
  const [frozenLogs, setFrozenLogs] = useState([])
  const [filterTag, setFilterTag]   = useState('ALL')
  const [search, setSearch]         = useState('')
  const [showIndex, setShowIndex]   = useState(true)

  const bottomRef = useRef(null)

  // Freeze logs when paused
  useEffect(() => {
    if (!streaming) setFrozenLogs(baseLogs)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streaming])

  const activeLogs = streaming ? baseLogs : frozenLogs

  // Apply filters
  const logs = activeLogs.filter(entry => {
    const tagMatch    = filterTag === 'ALL' || entry.tag === filterTag
    const searchMatch = search === '' ||
      entry.msg.toLowerCase().includes(search.toLowerCase()) ||
      entry.tag.toLowerCase().includes(search.toLowerCase())
    return tagMatch && searchMatch
  })

  // Per-tag counts
  const tagCounts = TAG_FILTERS.reduce((acc, { tag }) => {
    acc[tag] = tag === 'ALL' ? activeLogs.length : activeLogs.filter(l => l.tag === tag).length
    return acc
  }, {})

  const totalCount = activeLogs.length

  const downloadLogs = () => {
    const text = logs.map(l => `${l.ts} ${l.level.padEnd(4)} ${l.tag} ${l.msg}`).join('\n')
    const blob = new Blob([text], { type: 'text/plain' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = `hnnoix_${title.replace(/\s+/g, '_').toLowerCase()}_${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  useEffect(() => {
    if (autoScroll && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [logs, autoScroll])

  return (
    <div
      className="flex-1 flex flex-col rounded-2xl overflow-hidden min-h-0"
      style={{
        background: 'rgba(8,9,14,0.95)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 4px 40px rgba(0,0,0,0.5)',
      }}
    >
      {/* ── Chrome bar ───────────────────────────────── */}
      <div
        className="flex items-center gap-2 px-4 py-2.5 shrink-0 overflow-x-auto custom-scrollbar"
        style={{
          background: 'linear-gradient(90deg, rgba(16,18,28,0.98) 0%, rgba(12,14,22,0.98) 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* macOS dots */}
        <div className="hidden sm:flex gap-1.5 shrink-0">
          <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57', boxShadow: '0 0 6px rgba(255,95,87,0.5)' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e', boxShadow: '0 0 6px rgba(254,188,46,0.5)' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#28c840', boxShadow: '0 0 6px rgba(40,200,64,0.5)' }} />
        </div>

        {/* Terminal label */}
        <div className="flex items-center gap-2 sm:ml-2 shrink-0">
          <AlignJustify className="w-3.5 h-3.5 text-slate-700" />
          <span className="text-[12px] font-mono text-slate-500 font-medium truncate max-w-[100px] sm:max-w-none">{title}</span>
          {streaming
            ? <span className="flex items-center gap-1 text-[10px] font-mono" style={{ color: 'var(--neon)' }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--neon)', boxShadow: '0 0 5px var(--neon)' }} />
                LIVE
              </span>
            : <span className="flex items-center gap-1 text-[10px] font-mono text-amber-500">
                ⏸ PAUSED
              </span>
          }
        </div>

        <div className="flex-1" />

        {/* Search */}
        <div className="relative hidden xl:flex items-center shrink-0">
          <Search className="absolute left-2.5 w-3 h-3 text-slate-700 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search logs…"
            className="pl-7 pr-3 py-1.5 rounded-lg text-[11px] font-mono text-slate-400
                       placeholder-slate-700 focus:outline-none w-32 transition-all"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            onFocus={e => (e.target.style.borderColor = 'rgba(124,106,255,0.4)')}
            onBlur={e  => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
          />
        </div>

        {/* Line numbers toggle */}
        <button
          onClick={() => setShowIndex(v => !v)}
          title="Toggle line numbers"
          className="hidden sm:flex items-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-mono font-semibold transition-all shrink-0"
          style={showIndex
            ? { background: 'rgba(0,148,255,0.12)', border: '1px solid rgba(0,148,255,0.3)', color: '#0094ff' }
            : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#475569' }
          }
        >
          <Hash className="w-3 h-3" />
        </button>

        {/* Jump to bottom */}
        <button
          onClick={() => { setAutoScroll(true); bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }}
          title="Jump to bottom"
          className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-[10px] transition-all shrink-0"
          style={autoScroll
            ? { background: 'rgba(0,232,92,0.1)', border: '1px solid rgba(0,232,92,0.3)', color: 'var(--neon)' }
            : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#475569' }
          }
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </button>

        {/* Download */}
        <button
          onClick={downloadLogs}
          title="Download visible logs"
          className="px-2 py-1.5 rounded-lg text-[10px] transition-all shrink-0"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#475569' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#94a3b8')}
          onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
        >
          <Download className="w-3.5 h-3.5" />
        </button>

        {/* Clear */}
        <button
          onClick={clearLogs}
          title="Clear logs"
          className="px-2 py-1.5 rounded-lg text-[10px] transition-all shrink-0"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#475569' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#ff4d6d'; e.currentTarget.style.borderColor = 'rgba(255,77,109,0.3)' }}
          onMouseLeave={e => { e.currentTarget.style.color = '#475569'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>

        {/* Pause / Resume */}
        <button
          onClick={() => setStreaming(v => !v)}
          title={streaming ? 'Pause stream' : 'Resume stream'}
          className="flex items-center gap-1.5 px-2 lg:px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all shrink-0"
          style={streaming
            ? { background: 'rgba(0,232,92,0.1)', border: '1px solid rgba(0,232,92,0.35)', color: 'var(--neon)' }
            : { background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.35)', color: '#f59e0b' }
          }
        >
          {streaming
            ? <><Pause className="w-3 h-3" /> <span className="hidden sm:inline">Pause</span></>
            : <><Play  className="w-3 h-3" /> <span className="hidden sm:inline">Resume</span></>
          }
        </button>
      </div>

      {/* ── Tag filter bar ────────────────────────────── */}
      <div
        className="flex items-center gap-1.5 px-4 py-2 overflow-x-auto shrink-0 custom-scrollbar"
        style={{
          background: 'rgba(10,11,18,0.9)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <Filter className="w-3 h-3 text-slate-700 shrink-0 mr-0.5" />

        {TAG_FILTERS.map(({ tag, color }) => {
          const isActive = filterTag === tag
          const count = tagCounts[tag] ?? 0
          return (
            <button
              key={tag}
              onClick={() => setFilterTag(tag)}
              className={`filter-pill ${isActive ? 'filter-pill-active' : ''}`}
              style={isActive ? { borderColor: `${color}55`, background: `${color}12`, color } : {}}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: isActive ? color : '#334155' }}
              />
              {tag.replace(/\[|\]/g, '')}
              {count > 0 && (
                <span
                  className="ml-0.5 px-1 py-px rounded text-[8px] font-bold tabular-nums"
                  style={isActive
                    ? { background: `${color}22`, color }
                    : { background: 'rgba(255,255,255,0.06)', color: '#475569' }
                  }
                >
                  {count}
                </span>
              )}
            </button>
          )
        })}

        <div className="ml-auto text-[10px] font-mono text-slate-700 shrink-0 tabular-nums">
          {logs.length}/{totalCount}
        </div>
      </div>

      {/* ── Log output area ────────────────────────────── */}
      <div
        onScroll={e => handleScroll(e, setAutoScroll)}
        className="terminal-scroll flex-1 overflow-y-auto overflow-x-auto relative scanlines"
        style={{ background: '#060709' }}
      >
        <div className="py-1 min-w-max w-full">
          {logs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 gap-2">
              <span className="text-3xl opacity-30">📡</span>
              <span className="text-slate-700 font-mono text-xs">No logs match the current filter.</span>
            </div>
          ) : (
            logs.map(entry => (
              <LogLine key={entry.id} entry={entry} showIndex={showIndex} />
            ))
          )}

          {/* Cursor line */}
          <div className="px-4 py-1 font-mono text-xs" style={{ color: 'rgba(0,232,92,0.4)' }}>
            {streaming
              ? <span className="terminal-cursor" />
              : <span className="text-amber-600">⏸ Stream paused — click Resume to continue</span>
            }
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  )
}
