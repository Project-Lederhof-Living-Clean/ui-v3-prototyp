import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react'
import type { HeadlineStat } from '../types'
import { Sparkline } from './Sparkline'

interface HeadlineStatProps {
  stat: HeadlineStat
}

const formatNumber = (n: number) => n.toLocaleString('en-US')

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

export function HeadlineStatBlock({ stat }: HeadlineStatProps) {
  const isDown = stat.deltaDirection === 'down'
  const isFlat = stat.deltaDirection === 'flat'
  const Icon = isFlat ? Minus : isDown ? ArrowDownRight : ArrowUpRight

  // For litter, "down" is good news. We render down as positive (lime), up as caution (stone).
  const deltaTone = isFlat
    ? 'text-stone-500 dark:text-stone-400'
    : isDown
      ? 'text-lime-700 dark:text-lime-400'
      : 'text-stone-700 dark:text-stone-300'
  const deltaBg = isFlat
    ? 'bg-stone-100 dark:bg-stone-800'
    : isDown
      ? 'bg-lime-100 dark:bg-lime-900/30'
      : 'bg-stone-100 dark:bg-stone-800'

  return (
    <section
      className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-8 sm:p-12"
      aria-labelledby="headline-stat-label"
    >
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
        {formatDate(stat.date)}
      </p>

      <div className="mt-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
        <div>
          <div className="flex items-baseline gap-3">
            <span className="text-7xl sm:text-8xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 tabular-nums">
              {formatNumber(stat.count)}
            </span>
            <span
              className={`inline-flex items-center gap-1 text-sm font-medium px-2.5 py-1 rounded-full ${deltaTone} ${deltaBg}`}
              aria-label={`${isDown ? 'Down' : isFlat ? 'No change' : 'Up'} ${Math.abs(stat.deltaVsYesterday)} vs. yesterday`}
            >
              <Icon size={14} strokeWidth={2.5} />
              {isFlat ? '0' : `${isDown ? '−' : '+'}${formatNumber(Math.abs(stat.deltaVsYesterday))}`}
              <span className="text-stone-500 dark:text-stone-400 font-normal">vs. yesterday</span>
            </span>
          </div>
          <p
            id="headline-stat-label"
            className="mt-3 max-w-md text-base text-stone-600 dark:text-stone-300"
          >
            {stat.label}
          </p>
        </div>

        <div className="lg:pb-2">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400 mb-2">
            Last 14 days
          </p>
          <Sparkline values={stat.sparkline} width={220} height={56} />
        </div>
      </div>
    </section>
  )
}
