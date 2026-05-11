import { ArrowRight } from 'lucide-react'
import type { DashboardOverviewProps } from './types'
import { HeadlineStatBlock } from './HeadlineStat'
import { TrendChart } from './TrendChart'
import { InterventionCard } from './InterventionCard'

export function DashboardOverview({
  headlineStat,
  trend,
  activeInterventions,
  heroCta,
  onHeroCtaClick,
  onInterventionSelect,
}: DashboardOverviewProps) {
  return (
    <div className="min-h-full bg-stone-50 dark:bg-stone-950">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10 py-8 sm:py-12 space-y-6 sm:space-y-8">
        {/* Page intro */}
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-700 dark:text-blue-400">
              Lederhof · Living Clean
            </p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
              How clean is the square today?
            </h1>
          </div>
        </header>

        <HeadlineStatBlock stat={headlineStat} />

        {/* Hero CTA */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => onHeroCtaClick?.(heroCta.href)}
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white text-sm font-semibold shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-stone-50 dark:focus:ring-offset-stone-950"
          >
            {heroCta.label}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        <TrendChart points={trend} />

        {/* Active interventions */}
        <section>
          <div className="flex items-baseline justify-between mb-4 px-1">
            <h2 className="text-xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
              What we're trying right now
            </h2>
            <span className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">
              {activeInterventions.length} active
            </span>
          </div>

          {activeInterventions.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-stone-300 dark:border-stone-700 p-8 text-center text-sm text-stone-500 dark:text-stone-400">
              No active interventions on the square right now.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeInterventions.map(intervention => (
                <InterventionCard
                  key={intervention.id}
                  intervention={intervention}
                  onSelect={
                    onInterventionSelect
                      ? () => onInterventionSelect(intervention.id)
                      : undefined
                  }
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
