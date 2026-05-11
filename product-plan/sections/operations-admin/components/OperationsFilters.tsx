import { Calendar } from 'lucide-react'
import type {
  OperationStatus,
  OperationType,
} from '../types'

export interface FiltersState {
  statuses: OperationStatus[]
  types: OperationType[]
}

interface OperationsFiltersProps {
  state: FiltersState
  onChange: (next: FiltersState) => void
}

const statusOptions: { value: OperationStatus; label: string }[] = [
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'completed', label: 'Completed' },
]

const typeOptions: { value: OperationType; label: string }[] = [
  { value: 'single-session', label: 'Single-session' },
  { value: 'long-term', label: 'Long-term' },
]

export function OperationsFilters({ state, onChange }: OperationsFiltersProps) {
  const toggleStatus = (s: OperationStatus) => {
    onChange({
      ...state,
      statuses: state.statuses.includes(s)
        ? state.statuses.filter(x => x !== s)
        : [...state.statuses, s],
    })
  }
  const toggleType = (t: OperationType) => {
    onChange({
      ...state,
      types: state.types.includes(t)
        ? state.types.filter(x => x !== t)
        : [...state.types, t],
    })
  }

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      <button
        type="button"
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
      >
        <Calendar size={14} />
        Last 30 days
      </button>

      <div className="h-6 w-px bg-stone-200 dark:bg-stone-800" aria-hidden />

      <span className="text-[10px] font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
        Status
      </span>
      <div className="flex flex-wrap gap-1.5">
        {statusOptions.map(opt => {
          const active = state.statuses.includes(opt.value)
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggleStatus(opt.value)}
              className={
                'px-2.5 py-1 rounded-md text-xs font-medium transition-colors ' +
                (active
                  ? 'bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900'
                  : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700')
              }
            >
              {opt.label}
            </button>
          )
        })}
      </div>

      <div className="h-6 w-px bg-stone-200 dark:bg-stone-800" aria-hidden />

      <span className="text-[10px] font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
        Type
      </span>
      <div className="flex flex-wrap gap-1.5">
        {typeOptions.map(opt => {
          const active = state.types.includes(opt.value)
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggleType(opt.value)}
              className={
                'px-2.5 py-1 rounded-md text-xs font-medium transition-colors ' +
                (active
                  ? 'bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900'
                  : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700')
              }
            >
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
