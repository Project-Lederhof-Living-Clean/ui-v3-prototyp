import type { OperationStatus } from '../types'

interface StatusPillProps {
  status: OperationStatus
}

const styles: Record<OperationStatus, string> = {
  scheduled: 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300 ring-stone-200 dark:ring-stone-700',
  'in-progress': 'bg-blue-50 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 ring-blue-200 dark:ring-blue-800',
  completed: 'bg-lime-100 text-lime-800 dark:bg-lime-900/40 dark:text-lime-300 ring-lime-200 dark:ring-lime-800',
}

const labels: Record<OperationStatus, string> = {
  scheduled: 'Scheduled',
  'in-progress': 'In progress',
  completed: 'Completed',
}

export function StatusPill({ status }: StatusPillProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium ring-1 ring-inset ${styles[status]}`}
    >
      <span
        className={
          'h-1.5 w-1.5 rounded-full ' +
          (status === 'completed'
            ? 'bg-lime-500'
            : status === 'in-progress'
              ? 'bg-blue-500 animate-pulse'
              : 'bg-stone-400')
        }
      />
      {labels[status]}
    </span>
  )
}
