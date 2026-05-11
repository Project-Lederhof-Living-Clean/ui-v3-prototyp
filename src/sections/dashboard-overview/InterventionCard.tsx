import type { Intervention } from './types'

interface InterventionCardProps {
  intervention: Intervention
  onSelect?: () => void
}

const formatStartDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const daysSince = (iso: string) => {
  const ms = Date.now() - new Date(iso).getTime()
  return Math.max(0, Math.floor(ms / 86_400_000))
}

const statusStyles: Record<Intervention['status'], string> = {
  running: 'bg-lime-100 text-lime-800 dark:bg-lime-900/40 dark:text-lime-300',
  paused: 'bg-stone-200 text-stone-700 dark:bg-stone-800 dark:text-stone-300',
  ended: 'bg-stone-200 text-stone-600 dark:bg-stone-800 dark:text-stone-400',
}

export function InterventionCard({ intervention, onSelect }: InterventionCardProps) {
  const isInteractive = Boolean(onSelect)

  const Wrapper = isInteractive ? 'button' : 'div'
  return (
    <Wrapper
      type={isInteractive ? 'button' : undefined}
      onClick={onSelect}
      className={
        'block w-full text-left rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 transition-colors ' +
        (isInteractive
          ? 'hover:border-stone-300 dark:hover:border-stone-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
          : '')
      }
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-stone-900 dark:text-stone-50 leading-snug">
          {intervention.title}
        </h3>
        <span
          className={`shrink-0 text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full ${statusStyles[intervention.status]}`}
        >
          {intervention.status}
        </span>
      </div>
      <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
        {intervention.description}
      </p>
      <div className="mt-4 flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">
        <span>Started {formatStartDate(intervention.startDate)}</span>
        <span aria-hidden>·</span>
        <span>day {daysSince(intervention.startDate) + 1}</span>
      </div>
    </Wrapper>
  )
}
