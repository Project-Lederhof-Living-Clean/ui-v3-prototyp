import type { Experiment } from './types'
import { StatusBadge } from './StatusBadge'

interface ExperimentListItemProps {
  experiment: Experiment
  isSelected: boolean
  onSelect: () => void
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

export function ExperimentListItem({
  experiment,
  isSelected,
  onSelect,
}: ExperimentListItemProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={
        'group relative w-full text-left px-4 py-4 transition-colors border-l-2 ' +
        (isSelected
          ? 'bg-stone-100 dark:bg-stone-800/60 border-blue-600 dark:border-blue-400'
          : 'border-transparent hover:bg-stone-50 dark:hover:bg-stone-900')
      }
    >
      <div className="flex items-start justify-between gap-3">
        <p
          className={
            'text-sm font-medium leading-snug ' +
            (isSelected
              ? 'text-stone-900 dark:text-stone-50'
              : 'text-stone-800 dark:text-stone-200')
          }
        >
          {experiment.title}
        </p>
        <StatusBadge status={experiment.status} />
      </div>
      <p className="mt-2 text-[11px] font-mono text-stone-500 dark:text-stone-400 tabular-nums">
        {formatDate(experiment.startDate)} → {formatDate(experiment.endDate)}
      </p>
    </button>
  )
}
