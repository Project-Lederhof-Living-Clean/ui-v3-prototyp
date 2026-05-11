import { HandHeart, MessageCircle, Sparkles, Trash2, type LucideIcon } from 'lucide-react'
import type { Suggestion } from '../types'

interface SuggestionCardProps {
  suggestion: Suggestion
  /** 0-based position in the list — used to vary the accent treatment subtly across cards. */
  index: number
}

const iconMap: Record<string, LucideIcon> = {
  Trash2,
  HandHeart,
  MessageCircle,
  Sparkles,
}

export function SuggestionCard({ suggestion, index }: SuggestionCardProps) {
  const Icon = iconMap[suggestion.icon] ?? Sparkles
  const isAccented = index === 1 // middle card draws the eye with lime

  const iconWrap = isAccented
    ? 'bg-lime-100 text-lime-800 dark:bg-lime-900/40 dark:text-lime-300'
    : 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'

  const topAccent = isAccented
    ? 'before:bg-lime-400 dark:before:bg-lime-500'
    : 'before:bg-blue-600 dark:before:bg-blue-400'

  return (
    <article
      className={
        'relative flex flex-col rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-7 sm:p-8 ' +
        'overflow-hidden ' +
        'before:absolute before:inset-x-0 before:top-0 before:h-[3px] ' +
        topAccent
      }
    >
      <div
        className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${iconWrap}`}
        aria-hidden
      >
        <Icon size={22} strokeWidth={2} />
      </div>

      <h3 className="mt-6 text-xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
        {suggestion.title}
      </h3>

      <p className="mt-3 text-base leading-relaxed text-stone-600 dark:text-stone-300 flex-1">
        {suggestion.description}
      </p>

      <p className="mt-6 text-[10px] font-mono uppercase tracking-[0.18em] text-stone-400 dark:text-stone-500">
        — Idea {String(index + 1).padStart(2, '0')}
      </p>
    </article>
  )
}
