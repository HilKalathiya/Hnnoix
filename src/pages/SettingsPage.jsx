import { Settings, Monitor, Palette, Bell, Info } from 'lucide-react'

function Toggle({ label, description, defaultChecked = false }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
      <div>
        <div className="text-sm text-slate-300 font-medium">{label}</div>
        {description && <div className="text-xs text-slate-600 mt-0.5">{description}</div>}
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" defaultChecked={defaultChecked} className="sr-only peer" />
        <div className="w-9 h-5 bg-carbon-700 rounded-full peer
                        peer-checked:bg-neon-400/80 transition-colors
                        after:content-[''] after:absolute after:top-0.5 after:left-0.5
                        after:bg-white after:rounded-full after:w-4 after:h-4
                        after:transition-transform peer-checked:after:translate-x-4" />
      </label>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-5 animate-fade-in">
      <div className="flex items-center gap-2 mb-2">
        <Settings className="w-5 h-5 text-slate-400" />
        <h2 className="text-base font-semibold text-slate-100">Application Settings</h2>
      </div>

      <div className="glass rounded-2xl p-5 border border-white/5 space-y-0">
        <div className="flex items-center gap-2 pb-3 border-b border-white/5 mb-1">
          <Monitor className="w-4 h-4 text-signal-400" />
          <span className="text-sm font-semibold text-slate-300">Display</span>
        </div>
        <Toggle label="Dark Mode"           description="Telecom console theme" defaultChecked />
        <Toggle label="Compact Layout"      description="Reduce padding & spacing" />
        <Toggle label="Show Line Numbers"   description="In log viewer" defaultChecked />
        <Toggle label="CRT Scanline Effect" description="Subtle scanline overlay on terminal" defaultChecked />
      </div>

      <div className="glass rounded-2xl p-5 border border-white/5 space-y-0">
        <div className="flex items-center gap-2 pb-3 border-b border-white/5 mb-1">
          <Bell className="w-4 h-4 text-signal-400" />
          <span className="text-sm font-semibold text-slate-300">Notifications</span>
        </div>
        <Toggle label="RSRP Drop Alerts"  description="Trigger on MDT low-RSRP events" defaultChecked />
        <Toggle label="Registration Events" description="NAS Registration Accept / Reject" defaultChecked />
        <Toggle label="Sound Alerts"       description="Audio ping on critical events" />
      </div>

      <div className="glass rounded-2xl p-5 border border-white/5">
        <div className="flex items-center gap-2 pb-3 border-b border-white/5 mb-4">
          <Info className="w-4 h-4 text-signal-400" />
          <span className="text-sm font-semibold text-slate-300">About</span>
        </div>
        <div className="space-y-1.5 text-xs font-mono text-slate-500">
          <div className="flex justify-between"><span>App Version</span><span className="text-slate-400">0.1.0-alpha</span></div>
          <div className="flex justify-between"><span>Stack</span><span className="text-slate-400">React + Vite + TailwindCSS</span></div>
          <div className="flex justify-between"><span>Backend Target</span><span className="text-slate-400">FastAPI / Express</span></div>
          <div className="flex justify-between"><span>5G Stack</span><span className="text-slate-400">Duranta gNB + Open5GS</span></div>
          <div className="flex justify-between"><span>Mode</span><span className="text-amber-400">MOCK (no backend)</span></div>
        </div>
      </div>
    </div>
  )
}
