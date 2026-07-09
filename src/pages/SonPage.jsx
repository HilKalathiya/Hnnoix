import { Radio, Construction } from 'lucide-react'

export default function SonPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-5 animate-fade-in p-6">
      <div className="w-16 h-16 rounded-2xl bg-signal-400/10 border border-signal-400/20 flex items-center justify-center">
        <Radio className="w-8 h-8 text-signal-400" />
      </div>
      <div className="text-center">
        <h2 className="text-lg font-semibold text-slate-200">SON Module</h2>
        <p className="text-sm text-slate-500 mt-1 max-w-sm">
          Self-Organizing Network analytics — automatic optimization of coverage, capacity,
          and handover parameters. Coming in a future sprint.
        </p>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-400/10 border border-amber-400/20">
        <Construction className="w-4 h-4 text-amber-400" />
        <span className="text-xs text-amber-400 font-semibold">Under Construction</span>
      </div>
    </div>
  )
}
