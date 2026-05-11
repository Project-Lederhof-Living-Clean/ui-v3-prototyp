import { useEffect, useRef, useState } from 'react'
import type {
  AwarenessStoryProps,
  Slide,
} from '../types'
import { SlideProgress } from './SlideProgress'
import { StoryControls } from './StoryControls'
import {
  BreakdownSlideView,
  CtaSlideView,
  StatSlideView,
  TitleSlideView,
} from './Slides'

const TICK_MS = 60

export function AwarenessStory({
  story,
  onCtaClick,
  onSlideChange,
  onComplete,
}: AwarenessStoryProps) {
  const [index, setIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(story.autoplay)
  const [elapsed, setElapsed] = useState(0)
  const completedRef = useRef(false)

  const total = story.slides.length
  const slide = story.slides[index]
  const slideDuration = slide?.durationMs ?? story.defaultDurationMs

  // Notify on slide change
  useEffect(() => {
    if (slide) onSlideChange?.(slide.id, index)
    setElapsed(0)
  }, [index, slide, onSlideChange])

  // Auto-advance ticker
  useEffect(() => {
    if (!isPlaying) return
    const t = setInterval(() => {
      setElapsed(prev => {
        const next = prev + TICK_MS
        if (next >= slideDuration) {
          if (index < total - 1) {
            setIndex(i => i + 1)
            return 0
          }
          if (!completedRef.current) {
            completedRef.current = true
            onComplete?.()
          }
          setIsPlaying(false)
          return slideDuration
        }
        return next
      })
    }, TICK_MS)
    return () => clearInterval(t)
  }, [isPlaying, slideDuration, index, total, onComplete])

  // Keyboard controls
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault()
        setIsPlaying(p => !p)
      } else if (e.key === 'ArrowRight') {
        if (index < total - 1) {
          completedRef.current = false
          setIndex(i => i + 1)
        }
      } else if (e.key === 'ArrowLeft') {
        if (index > 0) {
          completedRef.current = false
          setIndex(i => i - 1)
        }
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [index, total])

  const goPrev = () => {
    if (index > 0) {
      completedRef.current = false
      setIndex(i => i - 1)
    }
  }
  const goNext = () => {
    if (index < total - 1) {
      completedRef.current = false
      setIndex(i => i + 1)
    }
  }
  const togglePlay = () => {
    if (index === total - 1 && !isPlaying) {
      // Restart from the beginning if we're at the end
      completedRef.current = false
      setIndex(0)
    }
    setIsPlaying(p => !p)
  }

  if (!slide) return null

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100">
      <header className="pt-6 pb-4">
        <SlideProgress
          count={total}
          currentIndex={index}
          progress={Math.min(elapsed / slideDuration, 1)}
        />
        <div className="flex items-center justify-between max-w-3xl mx-auto px-6 mt-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-stone-500 dark:text-stone-400">
            Living Clean
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 tabular-nums">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-12 sm:py-20">
        <SlideRenderer slide={slide} onCtaClick={onCtaClick} />
      </main>

      <footer className="pb-8 pt-4">
        <StoryControls
          isPlaying={isPlaying}
          canGoBack={index > 0}
          canGoForward={index < total - 1}
          onPrev={goPrev}
          onTogglePlay={togglePlay}
          onNext={goNext}
        />
        <p className="mt-3 text-center text-[10px] font-mono uppercase tracking-wider text-stone-400 dark:text-stone-500">
          Space to pause · ← → to navigate
        </p>
      </footer>
    </div>
  )
}

function SlideRenderer({
  slide,
  onCtaClick,
}: {
  slide: Slide
  onCtaClick?: (href: string) => void
}) {
  switch (slide.type) {
    case 'title':
      return <TitleSlideView slide={slide} />
    case 'stat':
      return <StatSlideView slide={slide} />
    case 'breakdown':
      return <BreakdownSlideView slide={slide} />
    case 'cta':
      return <CtaSlideView slide={slide} onCtaClick={onCtaClick} />
  }
}
