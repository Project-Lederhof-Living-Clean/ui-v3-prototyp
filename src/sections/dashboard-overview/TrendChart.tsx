import { useState } from 'react'
import type { TrendPoint } from './types'

interface TrendChartProps {
  points: TrendPoint[]
}

const formatNumber = (n: number) => n.toLocaleString('en-US')
const shortDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

export function TrendChart({ points }: TrendChartProps) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)

  if (!points.length) return null

  const max = Math.max(...points.map(p => p.count))
  const min = Math.min(...points.map(p => p.count))
  const visualMin = Math.max(0, Math.floor(min * 0.85))
  const range = max - visualMin || 1

  return (
    <section className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6 sm:p-8">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
            How we're trending
          </h2>
          <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
            Daily detected litter, last {points.length} days
          </p>
        </div>
        <div className="text-right text-xs text-stone-500 dark:text-stone-400 font-mono tabular-nums">
          <div>peak {formatNumber(max)}</div>
          <div>low {formatNumber(min)}</div>
        </div>
      </div>

      <div className="relative h-48 sm:h-56" onMouseLeave={() => setHoverIdx(null)}>
        <div className="absolute inset-0 flex items-end gap-[2px] sm:gap-1">
          {points.map((p, i) => {
            const heightPct = ((p.count - visualMin) / range) * 100
            const isActive = hoverIdx === i
            const isLast = i === points.length - 1
            return (
              <button
                key={p.date}
                type="button"
                onMouseEnter={() => setHoverIdx(i)}
                onFocus={() => setHoverIdx(i)}
                aria-label={`${shortDate(p.date)}: ${formatNumber(p.count)} items`}
                className="group relative flex-1 h-full flex items-end"
              >
                <span
                  className={
                    'w-full rounded-t-md transition-all ' +
                    (isLast
                      ? 'bg-blue-600 dark:bg-blue-400'
                      : isActive
                        ? 'bg-stone-700 dark:bg-stone-200'
                        : 'bg-stone-300 dark:bg-stone-700 group-hover:bg-stone-400 dark:group-hover:bg-stone-600')
                  }
                  style={{ height: `${Math.max(heightPct, 2)}%` }}
                />
              </button>
            )
          })}
        </div>

        {hoverIdx !== null && (
          <div
            className="pointer-events-none absolute -top-2 -translate-y-full px-3 py-2 rounded-lg bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 text-xs whitespace-nowrap shadow-lg"
            style={{
              left: `${((hoverIdx + 0.5) / points.length) * 100}%`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div className="font-mono tabular-nums font-semibold">
              {formatNumber(points[hoverIdx].count)}
            </div>
            <div className="text-[10px] opacity-70">{shortDate(points[hoverIdx].date)}</div>
          </div>
        )}
      </div>

      <div className="mt-3 flex justify-between text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">
        <span>{shortDate(points[0].date)}</span>
        <span>{shortDate(points[Math.floor(points.length / 2)].date)}</span>
        <span>{shortDate(points[points.length - 1].date)}</span>
      </div>
    </section>
  )
}
