import { Pencil } from 'lucide-react'
import type { Operation } from './types'
import { StatusPill } from './StatusPill'
import { ItemsBreakdownChips } from './ItemsBreakdownChips'

interface OperationRowProps {
  operation: Operation
  onEdit?: () => void
}

const formatNumber = (n: number) => n.toLocaleString('en-US')

const formatDate = (iso: string) => {
  const d = new Date(iso)
  const hasTime = iso.includes('T')
  const date = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  if (!hasTime) return date
  const time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
  return `${date} · ${time}`
}

const dateRange = (op: Operation) => {
  if (op.type === 'long-term') {
    const start = new Date(op.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    const end = new Date(op.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    return `${start} → ${end}`
  }
  return formatDate(op.startDate)
}

const formatDuration = (hours: number) => {
  if (hours === 0) return '—'
  if (hours < 1) return `${Math.round(hours * 60)}m`
  if (hours < 24) return `${hours}h`
  return `${hours.toLocaleString('en-US')}h`
}

export function OperationRow({ operation, onEdit }: OperationRowProps) {
  return (
    <tr
      onClick={onEdit}
      className="group cursor-pointer transition-colors hover:bg-stone-50 dark:hover:bg-stone-900/60"
    >
      <td className="py-4 pl-6 pr-4 align-top">
        <div className="flex items-start gap-2">
          <span
            className={
              'mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ' +
              (operation.type === 'long-term' ? 'bg-blue-500' : 'bg-stone-300 dark:bg-stone-600')
            }
            title={operation.type === 'long-term' ? 'Long-term operation' : 'Single-session'}
            aria-hidden
          />
          <div className="min-w-0">
            <p className="text-sm font-medium text-stone-900 dark:text-stone-50 leading-tight">
              {operation.title}
            </p>
            <p className="mt-0.5 text-xs font-mono text-stone-500 dark:text-stone-400">
              {dateRange(operation)}
            </p>
            {operation.notes && (
              <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 line-clamp-1 max-w-md">
                {operation.notes}
              </p>
            )}
          </div>
        </div>
      </td>
      <td className="py-4 px-4 align-top">
        <span className="inline-block text-sm font-mono tabular-nums text-stone-700 dark:text-stone-300">
          {formatDuration(operation.durationHours)}
        </span>
      </td>
      <td className="py-4 px-4 align-top">
        <div>
          <p className="text-sm font-semibold tabular-nums text-stone-900 dark:text-stone-50">
            {formatNumber(operation.itemsCollected.total)}
          </p>
          <div className="mt-1.5">
            <ItemsBreakdownChips items={operation.itemsCollected} />
          </div>
        </div>
      </td>
      <td className="py-4 px-4 align-top">
        <StatusPill status={operation.status} />
      </td>
      <td className="py-4 pr-6 pl-4 align-top text-right">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onEdit?.()
          }}
          aria-label={`Edit ${operation.title}`}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-stone-500 dark:text-stone-400 opacity-0 group-hover:opacity-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-opacity focus:opacity-100"
        >
          <Pencil size={15} />
        </button>
      </td>
    </tr>
  )
}
