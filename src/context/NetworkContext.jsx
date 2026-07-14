import { createContext, useContext, useState, useEffect, useRef } from 'react'

const NetworkContext = createContext(null)

export function NetworkProvider({ children }) {
  // ── Metrics parsed from WS logs ───────────────────────
  const [rsrp, setRsrp]       = useState(null)   // number | null
  const [latency, setLatency] = useState(null)   // number | null
  const [throughput, setThroughput] = useState(null) // string | null
  const [coreStatus, setCoreStatus] = useState('offline')

  // ── WS log stream – shared single connection ──────────
  const wsRef = useRef(null)
  const [logs, setLogs] = useState([])

  const MAX_LOGS = 2000
  let logCounter = useRef(1)

  useEffect(() => {
    let ws
    const connect = () => {
      ws = new WebSocket('ws://127.0.0.1:3000')
      wsRef.current = ws

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          if (data.type !== 'log') return

          const raw = data.message || ''

          // ── Metric Extraction ─────────────────────────
          // RSRP: "serving_RSRP=-95 dBm" or "RSRP: -95"
          const rsrpMatch = raw.match(/serving_RSRP=(-?\d+)\s*dBm/i)
            || raw.match(/RSRP[:\s=]+(-?\d+)/i)
          if (rsrpMatch) setRsrp(Number(rsrpMatch[1]))

          // Latency: "time=18 ms" or "rtt min/avg/max"
          const latMatch = raw.match(/time[=\s]+([\d.]+)\s*ms/i)
          if (latMatch) setLatency(Number(latMatch[1]))

          // Throughput: "DL: 12.3 Mbps" or "throughput=8.4 Mbps"
          const tputMatch = raw.match(/(?:DL|throughput)[:\s=]+([\d.]+)\s*(Mbps|kbps)/i)
          if (tputMatch) setThroughput(`${tputMatch[1]} ${tputMatch[2]}`)

          // ── Parse into log entries ────────────────────
          const lines = raw.split('\n').filter(l => l.trim())
          const newEntries = lines.map(line => {
            let level = 'INFO', tag = '[SYS]', cls = 'log-system'
            const lower = line.toLowerCase()
            if (lower.includes('error') || lower.includes('fail') || lower.includes('warn')) level = 'WARN'
            else if (line.includes('MDT')) level = 'MDT'

            const tagMatch = line.match(/\[([A-Z_]+)\]/)
            if (tagMatch) {
              tag = tagMatch[0]
              if (tag === '[NGAP]') cls = 'text-[#3db0ff]'
              else if (tag === '[NR_RRC]') cls = 'text-[#00e85c]'
              else if (tag === '[NAS]') cls = 'text-[#a78bfa]'
            }

            const now = new Date()
            const ts = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')}.${now.getMilliseconds().toString().padStart(3,'0')}`

            let panel = 'gNB'
            if (data.process === 'ue' || data.process === 'nrUE') panel = 'nrUE'
            else if (data.process === 'gnb') panel = 'gNB'

            return { id: logCounter.current++, ts, level, tag, cls, msg: line, panel }
          })

          setLogs(prev => {
            const combined = [...prev, ...newEntries]
            return combined.length > MAX_LOGS ? combined.slice(combined.length - MAX_LOGS) : combined
          })
        } catch (e) {
          console.error('WS parse error', e)
        }
      }

      ws.onerror = () => console.warn('WS error – will reconnect')
      ws.onclose = () => {
        setTimeout(connect, 3000)
      }
    }

    connect()
    return () => { if (ws) ws.close() }
  }, [])

  return (
    <NetworkContext.Provider value={{ logs, setLogs, rsrp, latency, throughput, coreStatus, setCoreStatus }}>
      {children}
    </NetworkContext.Provider>
  )
}

export const useNetwork = () => useContext(NetworkContext)
