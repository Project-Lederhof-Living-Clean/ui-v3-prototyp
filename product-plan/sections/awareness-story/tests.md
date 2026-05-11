# Test Specs: Awareness Story

These test specs are **framework-agnostic**. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, React Testing Library, etc.).

## Overview

Tests verify slide rendering, autoplay, manual navigation, keyboard controls, and the closing CTA hand-off.

---

## User Flow Tests

### Flow 1: Story autoplays from start to finish

#### Success Path

**Setup:**
- `story.autoplay = true`, `story.defaultDurationMs = 4000`.
- 4 slides: title → stat → breakdown → cta.
- Spies on `onSlideChange` and `onComplete`.
- Use fake/mock timers to advance the clock.

**Steps:**
1. Render `<AwarenessStory story={...} ... />`.
2. Advance timers slide-by-slide (4 × 4000ms).

**Expected Results:**
- [ ] First slide visible immediately on mount with the title slide's headline.
- [ ] Progress bar grows over the duration of each slide (width transitions toward 100%).
- [ ] After each duration, the next slide's headline is visible.
- [ ] `onSlideChange` is called with each slide's `id` and zero-based index, in order.
- [ ] After the CTA slide, autoplay does not advance further.

### Flow 2: Pause and resume

**Setup:** Same as Flow 1.

**Steps:**
1. While first slide is showing, click the pause button (or press Space).
2. Advance timers by 10000ms.

**Expected Results:**
- [ ] After pause, no further `onSlideChange` calls fire.
- [ ] Progress bar stops moving.
- [ ] Pause button updates to a play icon (or `aria-label="Play"`).
- [ ] Pressing Space again (or clicking play) resumes — `onSlideChange` resumes firing on the original schedule.

### Flow 3: Skip forward and backward

**Steps:**
1. From slide 1, click the next button (or press Right Arrow).
2. From the now-current slide, click the previous button (or press Left Arrow).

**Expected Results:**
- [ ] Next moves to slide 2; `onSlideChange` fires once with slide 2's id.
- [ ] Previous moves back to slide 1; `onSlideChange` fires once with slide 1's id.
- [ ] On the first slide, the previous button is disabled or a no-op.
- [ ] On the last (CTA) slide, the next button is disabled or a no-op.

### Flow 4: Click the closing CTA

**Setup:** Navigate to the CTA slide. CTA has `label: 'Take Action'`, `href: '/take-action'`.

**Steps:**
1. Visitor clicks the button labelled `Take Action`.

**Expected Results:**
- [ ] `onCtaClick` is called once with `'/take-action'`.

### Flow 5: Reach end without clicking CTA

**Steps:** Autoplay runs to completion; visitor never clicks the CTA, but the story sits on the CTA slide for a full duration.

**Expected Results:**
- [ ] `onComplete` is called once.
- [ ] The CTA slide remains visible (does not loop or unmount).

---

## Empty State Tests

### Empty story

**Setup:** `story.slides = []`.

**Expected Results:**
- [ ] No crash; render an empty hint or nothing renders inside the viewport (graceful degradation).
- [ ] No `onSlideChange` calls fire.

### Single-slide story

**Setup:** `story.slides = [titleSlideOnly]`, `autoplay: true`.

**Expected Results:**
- [ ] Title slide renders; progress bar still ticks.
- [ ] After duration, autoplay stops on the same slide; `onComplete` fires.
- [ ] Both prev and next controls are disabled.

---

## Component Interaction Tests

### Slide rendering by type

- [ ] **TitleSlide:** Renders headline + supporting text; no figure, no list, no CTA.
- [ ] **StatSlide:** Renders the figure value prominently with `unit` and `caption` if present.
- [ ] **BreakdownSlide:** Renders one row per `items` entry showing label and count.
- [ ] **CtaSlide:** Renders headline + a primary button using `cta.label` (blue background).

### SlideProgress

- [ ] Renders one segment per slide.
- [ ] The current segment fills based on elapsed time; previous segments are 100%; future segments are 0%.

### StoryControls

- [ ] Three buttons: previous, play/pause, next.
- [ ] All have visible focus rings and accessible labels.

---

## Edge Cases

- [ ] Per-slide `durationMs` overrides `defaultDurationMs`.
- [ ] Mobile viewport (<768px): figure value scales down; controls remain reachable; breakdown stacks vertically.
- [ ] Light/dark mode switch mid-story does not interrupt playback.
- [ ] Rapid Right/Left presses don't fire stale `onSlideChange` events for skipped slides.

---

## Accessibility Checks

- [ ] Pause and navigation buttons have accessible labels (`Pause`, `Previous slide`, `Next slide`).
- [ ] Space toggles play/pause; Left and Right arrow keys navigate (verify globally on the story container, not just when buttons are focused).
- [ ] Slides use heading semantics (`h1` or `h2`) for the slide headline.
- [ ] Progress bar has `role="progressbar"` with `aria-valuenow`.

---

## Sample Test Data

```typescript
import type { Story } from './types'

const mockStory: Story = {
  autoplay: true,
  defaultDurationMs: 4000,
  slides: [
    { id: 'title', type: 'title', headline: 'A week of litter on the Lederhof' },
    {
      id: 'weekly-total',
      type: 'stat',
      headline: 'Pieces of litter collected last week',
      figure: { value: 1842, unit: 'items', caption: 'across 7 days of monitoring' },
    },
    {
      id: 'breakdown',
      type: 'breakdown',
      headline: 'What we're picking up',
      items: [
        { label: 'Cigarette butts', count: 712 },
        { label: 'Food packaging', count: 433 },
      ],
    },
    {
      id: 'cta',
      type: 'cta',
      headline: 'Now your turn.',
      cta: { label: 'Take Action', href: '/take-action' },
    },
  ],
}
```
