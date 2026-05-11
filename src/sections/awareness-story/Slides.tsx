import { ArrowRight } from 'lucide-react'
import type {
  TitleSlide,
  StatSlide,
  BreakdownSlide,
  CtaSlide,
} from './types'

const formatNumber = (n: number) => n.toLocaleString('en-US')

export function TitleSlideView({ slide }: { slide: TitleSlide }) {
  return (
    <div className="text-center max-w-3xl mx-auto px-6">
      <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.32em] text-blue-700 dark:text-blue-400">
        Lederhof
      </p>
      <h1 className="mt-8 text-6xl sm:text-7xl md:text-8xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
        {slide.headline}
      </h1>
      {slide.supportingText && (
        <p className="mt-8 text-lg sm:text-xl text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl mx-auto">
          {slide.supportingText}
        </p>
      )}
    </div>
  )
}

export function StatSlideView({ slide }: { slide: StatSlide }) {
  return (
    <div className="text-center max-w-4xl mx-auto px-6">
      <h2 className="text-base sm:text-lg font-medium uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
        {slide.headline}
      </h2>
      <div className="mt-10 flex flex-col items-center">
        <span className="text-7xl sm:text-9xl md:text-[12rem] font-semibold tracking-tight text-stone-900 dark:text-stone-50 tabular-nums leading-none">
          {formatNumber(slide.figure.value)}
        </span>
        {slide.figure.unit && (
          <span className="mt-4 text-2xl sm:text-3xl font-medium text-blue-700 dark:text-blue-400">
            {slide.figure.unit}
          </span>
        )}
        {slide.figure.caption && (
          <p className="mt-6 text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-xl">
            {slide.figure.caption}
          </p>
        )}
      </div>
      {slide.supportingText && (
        <p className="mt-10 text-sm text-stone-500 dark:text-stone-400 max-w-md mx-auto leading-relaxed">
          {slide.supportingText}
        </p>
      )}
    </div>
  )
}

export function BreakdownSlideView({ slide }: { slide: BreakdownSlide }) {
  const total = slide.items.reduce((sum, i) => sum + i.count, 0) || 1
  return (
    <div className="max-w-3xl mx-auto px-6 w-full">
      <div className="text-center">
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
          {slide.headline}
        </h2>
        {slide.supportingText && (
          <p className="mt-4 text-base sm:text-lg text-stone-600 dark:text-stone-400">
            {slide.supportingText}
          </p>
        )}
      </div>

      <ul className="mt-10 sm:mt-12 space-y-5 sm:space-y-6">
        {slide.items.map(item => {
          const pct = (item.count / total) * 100
          return (
            <li key={item.label}>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-base sm:text-lg font-medium text-stone-900 dark:text-stone-50">
                  {item.label}
                </span>
                <span className="font-mono tabular-nums text-base sm:text-lg text-stone-900 dark:text-stone-50">
                  {formatNumber(item.count)}
                </span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                <div
                  className="h-full bg-stone-900 dark:bg-stone-100"
                  style={{ width: `${pct}%` }}
                />
              </div>
              {item.description && (
                <p className="mt-2 text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
                  {item.description}
                </p>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function CtaSlideView({
  slide,
  onCtaClick,
}: {
  slide: CtaSlide
  onCtaClick?: (href: string) => void
}) {
  return (
    <div className="text-center max-w-3xl mx-auto px-6">
      <h2 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 leading-tight">
        {slide.headline}
      </h2>
      {slide.supportingText && (
        <p className="mt-6 text-lg sm:text-xl text-stone-600 dark:text-stone-300 max-w-xl mx-auto leading-relaxed">
          {slide.supportingText}
        </p>
      )}
      <button
        type="button"
        onClick={() => onCtaClick?.(slide.cta.href)}
        className="group mt-12 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white text-base font-semibold shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-stone-50 dark:focus:ring-offset-stone-950"
      >
        {slide.cta.label}
        <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  )
}
