# Milestone 3: Awareness Story

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Shell) complete

---

## About This Handoff

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Product requirements and user flow specifications
- Design system tokens (colors, typography)
- Sample data showing the shape of data components expect
- Test specs focused on user-facing behavior

**Your job:**
- Integrate these components into your application
- Wire up callback props to your routing and business logic
- Replace sample data with real data from your backend
- Implement loading, error, and empty states

The components are props-based — they accept data and fire callbacks. How you architect the backend, data layer, and business logic is up to you.

---

## Goal

Implement the Awareness Story — a standalone, full-viewport, slide-by-slide narrative that confronts visitors with the factual scale of littering on the Lederhof.

**Important:** This section renders **outside the application shell**. Mount the route at `/awareness` (or your equivalent) without wrapping it in `<AppShell>`.

## Overview

A small set of curated slides plays automatically. Big numbers, restrained typography, no illustrations — the data does the emotional work. The story ends on a CTA slide that hands off to Take Action.

**Key Functionality:**
- Auto-advance through slides on a per-slide timer.
- Pause/play, previous, next controls (and keyboard shortcuts: Space, Left, Right).
- Visible top progress bar tracking the current slide's duration.
- Slide types: title, stat (one big number), breakdown (category list), CTA.
- Closing CTA routes to Take Action.

## Components Provided

Copy from `product-plan/sections/awareness-story/components/`:

- `AwarenessStory` — Top-level controller.
- `Slides` — Renders the active slide based on its type.
- `SlideProgress` — Top progress bar.
- `StoryControls` — Pause/play, prev, next.

## Props Reference

```typescript
interface AwarenessStoryProps {
  story: Story
  onCtaClick?: (href: string) => void
  onSlideChange?: (slideId: string, index: number) => void
  onComplete?: () => void
}
```

**Callback props:**

| Callback | Triggered When |
|----------|---------------|
| `onCtaClick` | Visitor clicks the closing CTA on the final slide |
| `onSlideChange` | Visitor advances to a new slide (manual or autoplay) |
| `onComplete` | Visitor reaches the last slide without exiting via the CTA |

## Expected User Flows

### Flow 1: Watch the story play

1. Visitor opens `/awareness`.
2. Title slide renders; auto-advance starts.
3. Slides progress automatically; visitor watches.
4. **Outcome:** Visitor lands on the CTA slide.

### Flow 2: Pause and dwell

1. Visitor presses Space (or clicks pause).
2. Slide remains; progress bar pauses.
3. Visitor presses Space again to resume.
4. **Outcome:** Auto-advance resumes from current position.

### Flow 3: Click "Take Action" at the end

1. Visitor reaches CTA slide.
2. Visitor clicks the "Take Action" button.
3. **Outcome:** Router navigates to `/take-action` (your `onCtaClick` handler).

## Empty States

- **Empty story (`slides: []`):** Render a calm fallback — either nothing, or a "Story not available yet" hint. Do not crash.
- **Single-slide story:** Allow the slide to render and tick to completion; disable both prev/next; fire `onComplete` after duration.

## Testing

See `product-plan/sections/awareness-story/tests.md` for UI behavior test specs (autoplay timers, pause/resume, keyboard, CTA hand-off).

## Files to Reference

- `product-plan/sections/awareness-story/README.md`
- `product-plan/sections/awareness-story/tests.md`
- `product-plan/sections/awareness-story/components/`
- `product-plan/sections/awareness-story/types.ts`
- `product-plan/sections/awareness-story/sample-data.json`
- `product-plan/sections/awareness-story/awareness-story.png` (light) and `awareness-story-dark.png` (dark)

## Done When

- [ ] `/awareness` route renders OUTSIDE the shell (full viewport).
- [ ] Autoplay works with per-slide and default durations.
- [ ] Pause, prev, next all work via buttons AND keyboard (Space, Left, Right).
- [ ] CTA slide button calls `onCtaClick` and routes to Take Action.
- [ ] Light + dark mode match the screenshots.
- [ ] Mobile responsive (typography scales, controls reachable).
