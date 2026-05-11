interface SlideProgressProps {
  count: number
  currentIndex: number
  /** 0–1, position within the current slide */
  progress: number
}

export function SlideProgress({ count, currentIndex, progress }: SlideProgressProps) {
  return (
    <div className="flex items-center gap-1.5 w-full max-w-3xl mx-auto px-6">
      {Array.from({ length: count }).map((_, i) => {
        let fill = 0
        if (i < currentIndex) fill = 1
        else if (i === currentIndex) fill = progress
        return (
          <div
            key={i}
            className="flex-1 h-[3px] rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden"
          >
            <div
              className="h-full bg-stone-900 dark:bg-stone-100 transition-[width] duration-100 ease-linear"
              style={{ width: `${fill * 100}%` }}
            />
          </div>
        )
      })}
    </div>
  )
}
