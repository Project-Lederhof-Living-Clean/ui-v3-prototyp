import type { ExperimentIntervention } from '../types'

interface InterventionsListProps {
  interventions: ExperimentIntervention[]
}

export function InterventionsList({ interventions }: InterventionsListProps) {
  return (
    <ul className="space-y-2.5">
      {interventions.map(iv => (
        <li
          key={iv.id}
          className="flex items-start gap-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-4"
        >
          <span
            className={
              'mt-1 inline-flex shrink-0 items-center justify-center rounded-md text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 ' +
              (iv.isBaseline
                ? 'bg-stone-200 text-stone-700 dark:bg-stone-700 dark:text-stone-200'
                : 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300')
            }
          >
            {iv.isBaseline ? 'Baseline' : 'Variant'}
          </span>
          <div>
            <p className="text-sm font-medium text-stone-900 dark:text-stone-50">{iv.name}</p>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              {iv.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
