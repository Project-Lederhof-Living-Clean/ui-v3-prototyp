import type { ItemsCollected } from '../types'

interface ItemsBreakdownChipsProps {
  items: ItemsCollected
}

const labels: Record<keyof ItemsCollected['breakdown'], string> = {
  cigarettes: 'Cig',
  foodPackaging: 'Food',
  generalWaste: 'Waste',
  paraphernalia: 'Para',
}

export function ItemsBreakdownChips({ items }: ItemsBreakdownChipsProps) {
  const total = items.total
  const entries = (Object.keys(items.breakdown) as Array<keyof ItemsCollected['breakdown']>)
    .map(key => ({ key, count: items.breakdown[key] }))
    .filter(entry => entry.count > 0)

  if (total === 0 || entries.length === 0) {
    return <span className="text-xs text-stone-400 dark:text-stone-500">—</span>
  }

  return (
    <div className="flex flex-wrap gap-1">
      {entries.map(({ key, count }) => (
        <span
          key={key}
          className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono tabular-nums bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
          title={`${labels[key]}: ${count.toLocaleString('en-US')}`}
        >
          <span className="text-stone-500 dark:text-stone-400">{labels[key]}</span>
          <span className="font-semibold">{count.toLocaleString('en-US')}</span>
        </span>
      ))}
    </div>
  )
}
