import { useEffect, useRef, useState, useCallback } from 'react'
import {
  Play, Pause, Trash2, Download, Filter,
  ChevronDown, Search, AlignJustify, Hash,
} from 'lucide-react'

// ─── Config ────────────────────────────────────────────────
const STREAM_INTERVAL_MS = 280
const MAX_LOG_LINES      = 2000
const BATCH_SIZE         = 1

// ─── Level badge styles ───────────────────────────────────
const LEVEL_STYLE = {
  INFO: 'bg-slate-100 dark:bg-transparent text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-transparent',
  WARN: 'bg-amber-50 dark:bg-transparent text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-transparent',
  ERROR: 'bg-rose-50 dark:bg-transparent text-rose-700 dark:text-rose-400 border border-rose-100 dark:border-transparent',
  MDT:  'bg-rose-50 dark:bg-transparent text-rose-700 dark:text-purple-400 border border-rose-100 dark:border-transparent',
}

// ─── Tag filter config ────────────────────────────────────
const TAG_FILTERS = [
  { tag: 'ALL', color: 'text-slate-500' },
  { tag: '[NGAP]', color: 'text-blue-500' },
  { tag: '[NR_RRC]', color: 'text-emerald-500' },
  { tag: '[NAS]', color: 'text-violet-500' },
  { tag: '[GTPU]', color: 'text-amber-500' },
  { tag: '[MDT]', color: 'text-rose-500' },
  { tag: '[TUN]', color: 'text-teal-500' },
  { tag: '[GNB]', color: 'text-sky-500' },
  { tag: '[SYS]', color: 'text-slate-500' },
]

const TAG_COLORS = {
  '[NGAP]': 'bg-indigo-50 dark:bg-transparent text-indigo-700 dark:text-blue-400 border border-indigo-100 dark:border-transparent px-1.5 py-0.5 rounded-md',
  '[NR_RRC]': 'bg-indigo-50 dark:bg-transparent text-indigo-700 dark:text-blue-400 border border-indigo-100 dark:border-transparent px-1.5 py-0.5 rounded-md',
  '[NAS]': 'bg-violet-50 dark:bg-transparent text-violet-700 dark:text-violet-400 border border-violet-100 dark:border-transparent px-1.5 py-0.5 rounded-md',
  '[GTPU]': 'bg-amber-50 dark:bg-transparent text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-transparent px-1.5 py-0.5 rounded-md',
  '[MDT]': 'bg-rose-50 dark:bg-transparent text-rose-700 dark:text-rose-400 border border-rose-100 dark:border-transparent px-1.5 py-0.5 rounded-md',
  '[TUN]': 'bg-emerald-50 dark:bg-transparent text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-transparent px-1.5 py-0.5 rounded-md',
  '[GNB]': 'bg-sky-50 dark:bg-transparent text-sky-700 dark:text-sky-400 border border-sky-100 dark:border-transparent px-1.5 py-0.5 rounded-md',
  '[SYS]': 'bg-slate-100 dark:bg-transparent text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-transparent px-1.5 py-0.5 rounded-md',
}

// ─── Single log line ─────────────────────────────────────
function LogLine({ entry, showIndex }) {
  const lvl = LEVEL_STYLE[entry.level] ?? LEVEL_STYLE.INFO
  return (
    <div
      className="flex items-start gap-2 px-4 py-[4px] font-mono text-[13px] leading-relaxed hover:bg-slate-200/50 dark:hover:bg-white/[0.03] transition-colors group bg-transparent text-slate-700 dark:text-emerald-400"
    >
      {showIndex && (
        <span className="w-9 text-right text-slate-800 shrink-0 select-none tabular-nums group-hover:text-slate-600 transition-colors text-[11px]">
          {entry.id}
        </span>
      )}

      {/* Timestamp */}
      <span className="text-slate-400 dark:text-slate-600 shrink-0 tabular-nums text-[11px]">{entry.ts}</span>

      {/* Level badge */}
      <span
        className={`inline-flex items-center gap-1 px-1.5 py-px rounded-md text-[10px] font-bold uppercase shrink-0 ${lvl}`}
      >
        <span className="w-1 h-1 rounded-full shrink-0" style={{ background: 'currentColor' }} />
        {entry.level}
      </span>

      {/* Tag */}
      <span className={`shrink-0 font-semibold text-[11px] leading-[18px] ${entry.cls}`}>{entry.tag}</span>

      {/* Message */}
      <span className="text-slate-700 dark:text-slate-400 break-all text-[12px] leading-[22px]">{entry.msg}</span>
    </div>
  )
}

// ─── Stats card ───────────────────────────────────────────
function StatCard({ label, value, accent, icon: Icon }) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.01] cursor-default relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-xl"
      style={{
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
        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold leading-tight">{label}</div>
        <div className="text-[20px] font-bold font-mono tabular-nums leading-tight" style={{ color: accent }}>{value}</div>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────
export default function LogViewer() {
  const [logs, setLogs] = useState([])

  // Live stream
  useEffect(() => {
    let ws = new WebSocket('ws://127.0.0.1:3000');
    let logCounter = 1;
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'log') {
          const lines = data.message.split('\\n').filter(l => l.trim().length > 0);
          
          const newEntries = lines.map(line => {
            let level = 'INFO';
            let tag = '[SYS]';
            let cls = 'text-slate-500 dark:text-slate-400';
            
            const lowerLine = line.toLowerCase();
            if (lowerLine.includes('error') || lowerLine.includes('fail') || lowerLine.includes('warn')) {
              level = 'WARN';
            } else if (line.includes('MDT')) {
              level = 'MDT';
            }
            
            const tagMatch = line.match(/\[([A-Z_]+)\]/);
            if (tagMatch) {
              tag = tagMatch[0];
              cls = TAG_COLORS[tag] || 'text-slate-500 dark:text-slate-400';
            }
            
            const now = new Date();
            const ts = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`;
            
            let panel = 'gNB';
            if (data.process === 'ue' || data.process === 'nrUE') panel = 'nrUE';
            else if (data.process) panel = data.process === 'gnb' ? 'gNB' : data.process;
            
            return {
              id: logCounter++,
              ts,
              level,
              tag,
              cls,
              msg: line,
              panel
            };
          });

          setLogs(prev => {
            const combined = [...prev, ...newEntries]
            return combined.length > MAX_LOG_LINES
              ? combined.slice(combined.length - MAX_LOG_LINES)
              : combined
          })
        }
      } catch (err) {
        console.error("Failed to parse websocket message", err)
      }
    };
    
    return () => {
      if (ws) ws.close();
    }
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
    <div className="flex flex-col h-full p-4 gap-3 animate-fade-in bg-slate-50 dark:bg-slate-950">
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
      className="flex-1 flex flex-col rounded-lg overflow-hidden min-h-0 bg-[#F8FAFC] dark:bg-[#0A0A0A] border border-slate-200 dark:border-gray-800 shadow-inner dark:shadow-xl"
    >
      {/* ── Chrome bar ───────────────────────────────── */}
      <div
        className="flex items-center gap-2 px-4 py-2 shrink-0 overflow-x-auto custom-scrollbar bg-slate-100 dark:bg-[#111111] border-b border-slate-200 dark:border-gray-800"
      >
        {/* macOS dots */}
        <div className="hidden sm:flex gap-1.5 shrink-0 mr-2">
          <div className="w-3 h-3 rounded-full bg-[#FF453A]" />
          <div className="w-3 h-3 rounded-full bg-[#FF9F0A]" />
          <div className="w-3 h-3 rounded-full bg-[#32D74B]" />
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
            className="pl-7 pr-3 py-1.5 rounded-lg text-[11px] font-mono text-slate-700 dark:text-slate-400 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800
                       placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none w-32 transition-all focus:border-indigo-400 dark:focus:border-indigo-500"
          />
        </div>

        {/* Line numbers toggle */}
        <button
          onClick={() => setShowIndex(v => !v)}
          title="Toggle line numbers"
          className={`hidden sm:flex items-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-mono font-semibold transition-all shrink-0 ${
            showIndex ? 'bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400'
                      : 'bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
          }`}
        >
          <Hash className="w-3 h-3" />
        </button>

        {/* Jump to bottom */}
        <button
          onClick={() => { setAutoScroll(true); bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }}
          title="Jump to bottom"
          className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-[10px] transition-all shrink-0 ${
            autoScroll ? 'bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                       : 'bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
          }`}
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </button>

        {/* Download */}
        <button
          onClick={downloadLogs}
          title="Download visible logs"
          className="px-2 py-1.5 rounded-lg text-[10px] transition-all shrink-0 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
        >
          <Download className="w-3.5 h-3.5" />
        </button>

        {/* Clear */}
        <button
          onClick={clearLogs}
          title="Clear logs"
          className="px-2 py-1.5 rounded-lg text-[10px] transition-all shrink-0 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-rose-500 hover:border-rose-200 dark:hover:text-rose-400 dark:hover:border-rose-500/30"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>

        {/* Pause / Resume */}
        <button
          onClick={() => setStreaming(v => !v)}
          title={streaming ? 'Pause stream' : 'Resume stream'}
          className={`flex items-center gap-1.5 px-2 lg:px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all shrink-0 ${
            streaming ? 'bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                      : 'bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 text-amber-600 dark:text-amber-500'
          }`}
        >
          {streaming
            ? <><Pause className="w-3 h-3" /> <span className="hidden sm:inline">Pause</span></>
            : <><Play  className="w-3 h-3" /> <span className="hidden sm:inline">Resume</span></>
          }
        </button>
      </div>

      {/* ── Tag filter bar ────────────────────────────── */}
      <div
        className="flex items-center gap-1.5 px-4 py-2 overflow-x-auto shrink-0 custom-scrollbar bg-slate-50 dark:bg-[#0A0A0A] border-b border-slate-200 dark:border-gray-800"
      >
        <Filter className="w-3 h-3 text-slate-500 shrink-0 mr-0.5" />

        {TAG_FILTERS.map(({ tag, color }) => {
          const isActive = filterTag === tag
          const count = tagCounts[tag] ?? 0
          return (
            <button
              key={tag}
              onClick={() => setFilterTag(tag)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all whitespace-nowrap
                          ${isActive
                            ? 'bg-slate-800 dark:bg-white text-white dark:text-slate-900'
                            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: isActive ? 'currentColor' : '#334155' }}
              />
              {tag.replace(/\[|\]/g, '')}
              {count > 0 && (
                <span
                  className="ml-0.5 px-1 py-px rounded text-[8px] font-bold tabular-nums"
                  style={{ background: isActive ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.06)' }}
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
        className="terminal-scroll flex-1 overflow-y-auto overflow-x-auto relative scanlines bg-[#F8FAFC] dark:bg-[#0A0A0A] text-slate-700 dark:text-emerald-400 font-mono text-[13px] leading-relaxed"
      >
        <div className="py-1 min-w-max w-full">
          {logs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 gap-2">
              <span className="text-3xl opacity-30">📡</span>
              <span className="text-slate-500 dark:text-slate-700 font-mono text-xs">No logs match the current filter.</span>
            </div>
          ) : (
            logs.map(entry => (
              <LogLine key={entry.id} entry={entry} showIndex={showIndex} />
            ))
          )}

          {/* Cursor line */}
          <div className="px-4 py-1 font-mono text-xs text-emerald-600 dark:text-emerald-400">
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
