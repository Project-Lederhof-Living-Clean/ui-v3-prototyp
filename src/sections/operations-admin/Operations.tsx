import { useMemo, useState } from 'react'
import { ArrowUpDown, Plus } from 'lucide-react'
import type {
  Operation,
  OperationsProps,
} from './types'
import { OperationsFilters, type FiltersState } from './OperationsFilters'
import { OperationRow } from './OperationRow'

type SortKey = 'date' | 'duration' | 'items'
type SortDir = 'asc' | 'desc'

const formatNumber = (n: number) => n.toLocaleString('en-US')

export function Operations({
  summary,
  operations,
  onScheduleOperation,
  onEditOperation,
  onFiltersChange,
}: OperationsProps) {
  const [filters, setFilters] = useState<FiltersState>({ statuses: [], types: [] })
  const [sortKey, setSortKey] = useState<SortKey>('date')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  const visibleOperations = useMemo(() => {
    const filtered = operations.filter(op => {
      if (filters.statuses.length > 0 && !filters.statuses.includes(op.status)) return false
      if (filters.types.length > 0 && !filters.types.includes(op.type)) return false
      return true
    })
    const sorted = [...filtered].sort((a, b) => {
      let cmp = 0
      switch (sortKey) {
        case 'date':
          cmp = new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          break
        case 'duration':
          cmp = a.durationHours - b.durationHours
          break
        case 'items':
          cmp = a.itemsCollected.total - b.itemsCollected.total
          break
      }
      return sortDir === 'asc' ? cmp : -cmp
    })
    return sorted
  }, [operations, filters, sortKey, sortDir])

  const handleFilters = (next: FiltersState) => {
    setFilters(next)
    onFiltersChange?.({ statuses: next.statuses, types: next.types })
  }

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  return (
    <div className="min-h-full bg-stone-50 dark:bg-stone-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-8 sm:py-10 space-y-8">
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
              Admin · Operations
            </p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
              Cleaning log
            </h1>
          </div>
          <button
            type="button"
            onClick={onScheduleOperation}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white text-sm font-semibold shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-stone-50 dark:focus:ring-offset-stone-950"
          >
            <Plus size={16} />
            Schedule operation
          </button>
        </header>

        {/* Headline summary */}
        <section className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-8 sm:p-10">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
            {summary.periodLabel}
          </p>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-6xl sm:text-7xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 tabular-nums">
              {formatNumber(summary.value)}
            </span>
            <span className="text-base sm:text-lg text-stone-600 dark:text-stone-300">
              {summary.label}
            </span>
          </div>
        </section>

        {/* Filters */}
        <OperationsFilters state={filters} onChange={handleFilters} />

        {/* Table */}
        <section className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/60">
                <tr>
                  <ColumnHeader
                    label="Operation"
                    sortable
                    isActive={sortKey === 'date'}
                    direction={sortDir}
                    onClick={() => toggleSort('date')}
                    className="pl-6"
                  />
                  <ColumnHeader
                    label="Duration"
                    sortable
                    isActive={sortKey === 'duration'}
                    direction={sortDir}
                    onClick={() => toggleSort('duration')}
                  />
                  <ColumnHeader
                    label="Items collected"
                    sortable
                    isActive={sortKey === 'items'}
                    direction={sortDir}
                    onClick={() => toggleSort('items')}
                  />
                  <ColumnHeader label="Status" />
                  <ColumnHeader label="" className="pr-6" />
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                {visibleOperations.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-16 text-center text-sm text-stone-500 dark:text-stone-400">
                      No operations match the current filters.
                    </td>
                  </tr>
                ) : (
                  visibleOperations.map((op: Operation) => (
                    <OperationRow
                      key={op.id}
                      operation={op}
                      onEdit={onEditOperation ? () => onEditOperation(op.id) : undefined}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="border-t border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/60 px-6 py-3 text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center justify-between">
            <span>
              {visibleOperations.length} of {operations.length} operations
            </span>
            <span className="hidden sm:flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-500" />
              Long-term operation
            </span>
          </div>
        </section>
      </div>
    </div>
  )
}

interface ColumnHeaderProps {
  label: string
  sortable?: boolean
  isActive?: boolean
  direction?: SortDir
  onClick?: () => void
  className?: string
}

function ColumnHeader({
  label,
  sortable,
  isActive,
  direction,
  onClick,
  className = '',
}: ColumnHeaderProps) {
  if (!sortable) {
    return (
      <th
        className={`text-left px-4 py-3 text-[10px] font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 ${className}`}
      >
        {label}
      </th>
    )
  }
  return (
    <th
      className={`text-left px-4 py-3 ${className}`}
    >
      <button
        type="button"
        onClick={onClick}
        className={
          'inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider transition-colors ' +
          (isActive
            ? 'text-stone-900 dark:text-stone-50'
            : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200')
        }
      >
        {label}
        <ArrowUpDown
          size={11}
          className={
            'transition-transform ' +
            (isActive && direction === 'asc' ? 'rotate-180' : '')
          }
        />
      </button>
    </th>
  )
}
