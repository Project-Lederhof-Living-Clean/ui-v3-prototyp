import { ArrowRight, CircleHelp, ScaleIcon, ThumbsDown, ThumbsUp, type LucideIcon } from 'lucide-react'
import type { Decision, DecisionVerdict } from './types'

interface DecisionBlockProps {
  decision: Decision | null
}

const verdictMeta: Record<DecisionVerdict, { label: string; icon: LucideIcon; tone: string }> = {
  keep: {
    label: 'Keep',
    icon: ThumbsUp,
    tone: 'bg-lime-100 text-lime-800 dark:bg-lime-900/40 dark:text-lime-300 ring-lime-200 dark:ring-lime-800',
  },
  kill: {
    label: 'Kill',
    icon: ThumbsDown,
    tone: 'bg-stone-200 text-stone-800 dark:bg-stone-800 dark:text-stone-200 ring-stone-300 dark:ring-stone-700',
  },
  scale: {
    label: 'Scale',
    icon: ScaleIcon,
    tone: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 ring-blue-200 dark:ring-blue-800',
  },
  undecided: {
    label: 'Undecided',
    icon: CircleHelp,
    tone: 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300 ring-stone-200 dark:ring-stone-700',
  },
}

export function DecisionBlock({ decision }: DecisionBlockProps) {
  if (!decision) {
    return (
      <div className="rounded-2xl border border-dashed border-stone-300 dark:border-stone-700 p-6">
        <p className="text-sm text-stone-500 dark:text-stone-400">
          No decision yet. The verdict and recommended next action will appear here once the experiment concludes.
        </p>
      </div>
    )
  }
  const meta = verdictMeta[decision.verdict]
  const Icon = meta.icon

  return (
    <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6">
      <div className="flex items-center gap-3">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ring-inset ${meta.tone}`}
        >
          <Icon size={13} strokeWidth={2.5} />
          {meta.label}
        </span>
        <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-50">Decision</h4>
      </div>

      <p className="mt-4 text-base text-stone-700 dark:text-stone-300 leading-relaxed">
        {decision.rationale}
      </p>

      <div className="mt-5 flex items-start gap-2 rounded-xl bg-stone-50 dark:bg-stone-800/60 p-4">
        <ArrowRight size={16} className="mt-0.5 shrink-0 text-blue-600 dark:text-blue-400" />
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
            Next action
          </p>
          <p className="mt-1 text-sm text-stone-900 dark:text-stone-50 leading-relaxed">
            {decision.action}
          </p>
        </div>
      </div>
    </div>
  )
}
