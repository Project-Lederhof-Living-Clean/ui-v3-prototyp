import { Plus } from 'lucide-react'
import type { Experiment, ExperimentStatus } from './types'
import { ExperimentListItem } from './ExperimentListItem'

interface ExperimentListProps {
  experiments: Experiment[]
  selectedId?: string
  onSelect: (id: string) => void
  onCreate?: () => void
}

const groupOrder: ExperimentStatus[] = ['running', 'planned', 'concluded']
const groupLabels: Record<ExperimentStatus, string> = {
  running: 'Running',
  planned: 'Planned',
  concluded: 'Concluded',
}

export function ExperimentList({
  experiments,
  selectedId,
  onSelect,
  onCreate,
}: ExperimentListProps) {
  const grouped = groupOrder
    .map(status => ({
      status,
      items: experiments.filter(e => e.status === status),
    }))
    .filter(g => g.items.length > 0)

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
            Admin · Experiments
          </p>
          <h2 className="mt-1 text-base font-semibold tracking-tight text-stone-900 dark:text-stone-50">
            All experiments
          </h2>
        </div>
        <button
          type="button"
          onClick={onCreate}
          aria-label="New experiment"
          className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-stone-50 dark:focus:ring-offset-stone-950"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {grouped.length === 0 ? (
          <div className="p-6 text-sm text-stone-500 dark:text-stone-400">
            No experiments yet.
          </div>
        ) : (
          grouped.map(group => (
            <div key={group.status} className="py-2">
              <p className="px-4 pt-3 pb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
                {groupLabels[group.status]} · {group.items.length}
              </p>
              <ul className="divide-y divide-stone-100 dark:divide-stone-800/60">
                {group.items.map(exp => (
                  <li key={exp.id}>
                    <ExperimentListItem
                      experiment={exp}
                      isSelected={selectedId === exp.id}
                      onSelect={() => onSelect(exp.id)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
