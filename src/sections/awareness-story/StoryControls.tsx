import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'

interface StoryControlsProps {
  isPlaying: boolean
  canGoBack: boolean
  canGoForward: boolean
  onPrev: () => void
  onTogglePlay: () => void
  onNext: () => void
}

export function StoryControls({
  isPlaying,
  canGoBack,
  canGoForward,
  onPrev,
  onTogglePlay,
  onNext,
}: StoryControlsProps) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      <button
        type="button"
        onClick={onPrev}
        disabled={!canGoBack}
        aria-label="Previous slide"
        className="p-3 rounded-full text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        type="button"
        onClick={onTogglePlay}
        aria-label={isPlaying ? 'Pause story' : 'Play story'}
        className="p-3.5 rounded-full bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors"
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={!canGoForward}
        aria-label="Next slide"
        className="p-3 rounded-full text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight size={22} />
      </button>
    </div>
  )
}
