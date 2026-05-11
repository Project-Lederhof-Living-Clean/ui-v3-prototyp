interface SparklineProps {
  values: number[]
  width?: number
  height?: number
  className?: string
}

export function Sparkline({ values, width = 160, height = 44, className }: SparklineProps) {
  if (!values.length) return null

  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const stepX = width / (values.length - 1 || 1)

  const points = values.map((v, i) => {
    const x = i * stepX
    const y = height - ((v - min) / range) * (height - 4) - 2
    return [x, y] as const
  })

  const path = points
    .map(([x, y], i) => (i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`))
    .join(' ')

  const areaPath = `${path} L ${width} ${height} L 0 ${height} Z`

  const lastX = points[points.length - 1][0]
  const lastY = points[points.length - 1][1]

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="sparklineFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.18" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#sparklineFill)" className="text-blue-600 dark:text-blue-400" />
      <path d={path} fill="none" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="stroke-blue-600 dark:stroke-blue-400" />
      <circle cx={lastX} cy={lastY} r={3} className="fill-blue-600 dark:fill-blue-400" />
    </svg>
  )
}
