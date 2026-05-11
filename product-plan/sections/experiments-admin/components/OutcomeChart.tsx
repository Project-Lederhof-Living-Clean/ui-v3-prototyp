import { useState } from 'react'
import type {
  Experiment,
  ExperimentIntervention,
  SeriesPoint,
} from '../types'

interface OutcomeChartProps {
  experiment: Experiment
}

interface RenderableSeries {
  intervention: ExperimentIntervention
  points: SeriesPoint[]
  colorClass: string
  isBaseline: boolean
}

const variantPalette = [
  'text-blue-600 dark:text-blue-400',
  'text-lime-600 dark:text-lime-400',
  'text-orange-600 dark:text-orange-400',
  'text-fuchsia-600 dark:text-fuchsia-400',
]

const formatNumber = (n: number) => n.toLocaleString('en-US')
const shortDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

export function OutcomeChart({ experiment }: OutcomeChartProps) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)

  // Build aligned series with colors
  let variantIdx = 0
  const series: RenderableSeries[] = experiment.interventions.map(iv => {
    const points = experiment.outcomeSeries[iv.id] ?? []
    const isBaseline = iv.isBaseline
    const colorClass = isBaseline
      ? 'text-stone-400 dark:text-stone-500'
      : variantPalette[variantIdx++ % variantPalette.length]
    return { intervention: iv, points, colorClass, isBaseline }
  })

  const allPoints = series.flatMap(s => s.points)
  const hasData = allPoints.length > 0

  if (!hasData) {
    return (
      <div className="rounded-2xl border border-dashed border-stone-300 dark:border-stone-700 p-10 text-center">
        <p className="text-sm text-stone-500 dark:text-stone-400">
          No outcome data yet — this experiment hasn't started collecting measurements.
        </p>
      </div>
    )
  }

  // X-axis: union of all dates, sorted
  const allDates = Array.from(new Set(allPoints.map(p => p.date))).sort()
  const dateIndex = new Map(allDates.map((d, i) => [d, i]))
  const xCount = allDates.length

  // Y-axis bounds
  const values = allPoints.map(p => p.value)
  const max = Math.max(...values)
  const min = Math.min(...values)
  const yPad = (max - min) * 0.1 || 1
  const yMin = Math.max(0, Math.floor(min - yPad))
  const yMax = Math.ceil(max + yPad)

  const width = 720
  const height = 280
  const padL = 48
  const padR = 16
  const padT = 16
  const padB = 36
  const innerW = width - padL - padR
  const innerH = height - padT - padB

  const xFor = (date: string) => {
    const idx = dateIndex.get(date) ?? 0
    if (xCount <= 1) return padL + innerW / 2
    return padL + (idx / (xCount - 1)) * innerW
  }
  const yFor = (val: number) => padT + innerH - ((val - yMin) / (yMax - yMin || 1)) * innerH

  const yTicks = 4
  const tickValues = Array.from({ length: yTicks + 1 }, (_, i) =>
    Math.round(yMin + ((yMax - yMin) * i) / yTicks),
  )

  const hoveredDate = hoverIdx !== null ? allDates[hoverIdx] : null

  return (
    <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-4 sm:p-6">
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-50">
            Outcome
          </h4>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            {experiment.metric.label}
          </p>
        </div>
        <div className="hidden sm:flex flex-wrap items-center gap-x-4 gap-y-1 justify-end">
          {series.map(s => (
            <div key={s.intervention.id} className="inline-flex items-center gap-1.5 text-xs">
              <span
                className={`inline-block h-2 w-4 rounded-full ${s.colorClass.replace('text-', 'bg-')} ${s.isBaseline ? 'opacity-70' : ''}`}
                style={s.isBaseline ? { backgroundImage: 'repeating-linear-gradient(90deg, currentColor 0 4px, transparent 4px 7px)' } : undefined}
              />
              <span className="text-stone-600 dark:text-stone-400">
                {s.intervention.name}
                {s.isBaseline ? ' · baseline' : ''}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full min-w-[480px] h-auto"
          onMouseLeave={() => setHoverIdx(null)}
          role="img"
          aria-label={`Outcome chart for ${experiment.title}`}
        >
          {/* y-axis grid + labels */}
          {tickValues.map(v => {
            const y = yFor(v)
            return (
              <g key={v}>
                <line
                  x1={padL}
                  x2={width - padR}
                  y1={y}
                  y2={y}
                  className="stroke-stone-200 dark:stroke-stone-800"
                  strokeDasharray="2 4"
                />
                <text
                  x={padL - 8}
                  y={y}
                  textAnchor="end"
                  dominantBaseline="middle"
                  className="fill-stone-500 dark:fill-stone-400 text-[10px] font-mono tabular-nums"
                >
                  {formatNumber(v)}
                </text>
              </g>
            )
          })}

          {/* x-axis labels — show start, mid, end */}
          {[0, Math.floor(xCount / 2), xCount - 1].map(i => {
            const d = allDates[i]
            if (!d) return null
            return (
              <text
                key={d}
                x={xFor(d)}
                y={height - padB + 18}
                textAnchor="middle"
                className="fill-stone-500 dark:fill-stone-400 text-[10px] font-mono uppercase tracking-wider"
              >
                {shortDate(d)}
              </text>
            )
          })}

          {/* hover guide */}
          {hoveredDate && (
            <line
              x1={xFor(hoveredDate)}
              x2={xFor(hoveredDate)}
              y1={padT}
              y2={padT + innerH}
              className="stroke-stone-300 dark:stroke-stone-700"
              strokeDasharray="2 3"
            />
          )}

          {/* series */}
          {series.map(s => {
            if (s.points.length === 0) return null
            const path = s.points
              .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xFor(p.date)} ${yFor(p.value)}`)
              .join(' ')
            return (
              <g key={s.intervention.id} className={s.colorClass}>
                <path
                  d={path}
                  fill="none"
                  strokeWidth={s.isBaseline ? 1.5 : 2.5}
                  strokeDasharray={s.isBaseline ? '5 4' : undefined}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="currentColor"
                />
                {s.points.map(p => (
                  <circle
                    key={`${s.intervention.id}-${p.date}`}
                    cx={xFor(p.date)}
                    cy={yFor(p.value)}
                    r={hoveredDate === p.date ? 4 : 2.5}
                    fill="currentColor"
                  />
                ))}
              </g>
            )
          })}

          {/* hover hit zones */}
          {allDates.map((d, i) => {
            const x = xFor(d)
            const w = innerW / Math.max(xCount - 1, 1)
            return (
              <rect
                key={d}
                x={x - w / 2}
                y={padT}
                width={w}
                height={innerH}
                fill="transparent"
                onMouseEnter={() => setHoverIdx(i)}
                style={{ cursor: 'crosshair' }}
              />
            )
          })}
        </svg>
      </div>

      {/* Hover readout below chart */}
      {hoveredDate && (
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
          <span className="font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">
            {shortDate(hoveredDate)}
          </span>
          {series.map(s => {
            const p = s.points.find(pt => pt.date === hoveredDate)
            if (!p) return null
            return (
              <span key={s.intervention.id} className="inline-flex items-center gap-1.5">
                <span className={`inline-block h-2 w-2 rounded-full ${s.colorClass.replace('text-', 'bg-')}`} />
                <span className="text-stone-600 dark:text-stone-400">{s.intervention.name}:</span>
                <span className="font-mono tabular-nums font-semibold text-stone-900 dark:text-stone-50">
                  {formatNumber(p.value)}
                </span>
              </span>
            )
          })}
        </div>
      )}
    </div>
  )
}
