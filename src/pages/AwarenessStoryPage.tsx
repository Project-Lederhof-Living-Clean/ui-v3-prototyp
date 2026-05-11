import { useNavigate } from 'react-router-dom'
import { AwarenessStory } from '../sections/awareness-story'
import type { Story } from '../sections/awareness-story/types'
import sampleData from '../sections/awareness-story/sample-data.json'

const story = (sampleData as { story: unknown }).story as Story

export function AwarenessStoryPage() {
  const navigate = useNavigate()

  if (!story.slides.length) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-stone-50 dark:bg-stone-950 text-stone-600 dark:text-stone-400 text-sm">
        Story not available yet.
      </div>
    )
  }

  return (
    <AwarenessStory
      story={story}
      onCtaClick={(href) => navigate(href)}
    />
  )
}
