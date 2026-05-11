import { ChevronLeft, Pencil, Trash2 } from 'lucide-react'
import type { Experiment } from '../types'
import { StatusBadge } from './StatusBadge'
import { OutcomeChart } from './OutcomeChart'
import { InterventionsList } from './InterventionsList'
import { DecisionBlock } from './DecisionBlock'

interface ExperimentDetailProps {
  experiment: Experiment | null
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  /** On mobile, lets the user return to the list. */
  onBack?: () => void
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

export function ExperimentDetail({
  experiment,
  onEdit,
  onDelete,
  onBack,
}: ExperimentDetailProps) {
  if (!experiment) {
    return (
      <div className="flex h-full items-center justify-center p-12">
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Select an experiment from the list to see its details.
        </p>
      </div>
    )
  }

  const handleDelete = () => {
    if (!onDelete) return
    if (window.confirm(`Delete "${experiment.title}"? This cannot be undone.`)) {
      onDelete(experiment.id)
    }
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <header className="border-b border-stone-200 dark:border-stone-800 px-5 sm:px-8 py-5 sm:py-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="lg:hidden inline-flex items-center gap-1 mb-2 text-xs text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-50"
              >
                <ChevronLeft size={14} />
                All experiments
              </button>
            )}
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={experiment.status} size="md" />
              <span className="text-xs font-mono text-stone-500 dark:text-stone-400">
                {formatDate(experiment.startDate)} → {formatDate(experiment.endDate)}
              </span>
            </div>
            <h1 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
              {experiment.title}
            </h1>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => onEdit?.(experiment.id)}
              aria-label="Edit experiment"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <Pencil size={15} />
            </button>
            <button
              type="button"
              onClick={handleDelete}
              aria-label="Delete experiment"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-stone-600 dark:text-stone-400 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      </header>

      <div className="px-5 sm:px-8 py-6 sm:py-8 space-y-8">
        {/* Hypothesis & summary */}
        <section>
          <h3 className="text-[10px] font-medium uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
            Hypothesis
          </h3>
          <p className="mt-2 text-base sm:text-lg text-stone-900 dark:text-stone-50 leading-relaxed">
            {experiment.hypothesis}
          </p>
          {experiment.summary && (
            <p className="mt-3 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              {experiment.summary}
            </p>
          )}
        </section>

        {/* Interventions */}
        <section>
          <h3 className="text-[10px] font-medium uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400 mb-3">
            Interventions · {experiment.interventions.length}
          </h3>
          <InterventionsList interventions={experiment.interventions} />
        </section>

        {/* Outcome chart */}
        <section>
          <h3 className="text-[10px] font-medium uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400 mb-3">
            Outcome
          </h3>
          <OutcomeChart experiment={experiment} />
        </section>

        {/* Decision */}
        <section>
          <h3 className="text-[10px] font-medium uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400 mb-3">
            Decision
          </h3>
          <DecisionBlock decision={experiment.decision} />
        </section>
      </div>
    </div>
  )
}
