export type SlideType = 'title' | 'stat' | 'breakdown' | 'cta'

export interface Figure {
  value: number
  unit?: string
  caption?: string
}

export interface BreakdownItem {
  label: string
  count: number
  description?: string
}

export interface StoryCta {
  label: string
  href: string
}

interface SlideBase {
  id: string
  headline: string
  supportingText?: string
  durationMs?: number
}

export interface TitleSlide extends SlideBase {
  type: 'title'
}

export interface StatSlide extends SlideBase {
  type: 'stat'
  figure: Figure
}

export interface BreakdownSlide extends SlideBase {
  type: 'breakdown'
  items: BreakdownItem[]
}

export interface CtaSlide extends SlideBase {
  type: 'cta'
  cta: StoryCta
}

export type Slide = TitleSlide | StatSlide | BreakdownSlide | CtaSlide

export interface Story {
  autoplay: boolean
  defaultDurationMs: number
  slides: Slide[]
}

export interface AwarenessStoryProps {
  story: Story
  /** Fired when the visitor clicks the closing CTA. */
  onCtaClick?: (href: string) => void
  /** Fired each time the visitor advances to a new slide (manually or via autoplay). */
  onSlideChange?: (slideId: string, index: number) => void
  /** Fired when the visitor reaches the end of the story without exiting via the CTA. */
  onComplete?: () => void
}
