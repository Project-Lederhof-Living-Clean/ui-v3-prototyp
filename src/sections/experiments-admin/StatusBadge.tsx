import type { ExperimentStatus } from './types'

interface StatusBadgeProps {
  status: ExperimentStatus
  size?: 'sm' | 'md'
}

const styles: Record<ExperimentStatus, string> = {
  planned: 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300 ring-stone-200 dark:ring-stone-700',
  running: 'bg-blue-50 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 ring-blue-200 dark:ring-blue-800',
  concluded: 'bg-lime-100 text-lime-800 dark:bg-lime-900/40 dark:text-lime-300 ring-lime-200 dark:ring-lime-800',
}

const labels: Record<ExperimentStatus, string> = {
  planned: 'Planned',
  running: 'Running',
  concluded: 'Concluded',
}

const dotColors: Record<ExperimentStatus, string> = {
  planned: 'bg-stone-400',
  running: 'bg-blue-500 animate-pulse',
  concluded: 'bg-lime-500',
}

export function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const sizing = size === 'md' ? 'px-3 py-1 text-xs' : 'px-2 py-0.5 text-[10px]'
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ring-1 ring-inset ${sizing} ${styles[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotColors[status]}`} />
      {labels[status]}
    </span>
  )
}
