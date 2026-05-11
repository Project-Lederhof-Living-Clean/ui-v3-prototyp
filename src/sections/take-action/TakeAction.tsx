import type { TakeActionProps } from './types'
import { SuggestionCard } from './SuggestionCard'

export function TakeAction({ intro, suggestions }: TakeActionProps) {
  return (
    <div className="min-h-full bg-stone-50 dark:bg-stone-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 py-12 sm:py-20">
        <header className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-blue-700 dark:text-blue-400">
            Take Action
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 leading-tight">
            {intro.headline}
          </h1>
          <p className="mt-4 text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
            {intro.subhead}
          </p>
        </header>

        {suggestions.length > 0 ? (
          <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {suggestions.map((suggestion, i) => (
              <SuggestionCard key={suggestion.id} suggestion={suggestion} index={i} />
            ))}
          </div>
        ) : (
          <div className="mt-16 rounded-3xl border border-dashed border-stone-300 dark:border-stone-700 p-10 text-center text-sm text-stone-500 dark:text-stone-400">
            No suggestions to show right now.
          </div>
        )}

        <p className="mt-12 sm:mt-16 max-w-xl text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
          These are ideas, not pledges. Living Clean doesn't track who does what — the square does
          that for itself, one quieter Monday morning at a time.
        </p>
      </div>
    </div>
  )
}
