# Milestone 4: Take Action

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

Implement the Take Action section — three inspirational suggestion cards that give a citizen concrete, low-effort behaviors. No buttons, no forms, no completion state.

## Overview

Visitors arrive from the Dashboard CTA or the closing CTA of the Awareness Story. They read a brief intro and three suggestion cards, then leave with one of the suggestions in mind. The page is intentionally read-only — the goal is to plant an idea, not capture a submission.

**Key Functionality:**
- Brief intro headline + subhead.
- Three suggestion cards displayed side-by-side on desktop, stacked on mobile.
- Each card has icon + title + description. No buttons, no inputs.
- One card uses lime accent to draw the eye; others use blue accent.

## Components Provided

Copy from `product-plan/sections/take-action/components/`:

- `TakeAction` — Top-level screen with intro and grid.
- `SuggestionCard` — A single card.

## Props Reference

```typescript
interface TakeActionProps {
  intro: Intro
  suggestions: Suggestion[]
}
```

**Callback props:** None — Take Action is intentionally read-only.

## Expected User Flows

### Flow 1: Read and leave

1. Visitor lands on `/take-action` from Dashboard or Awareness Story.
2. Visitor reads the intro.
3. Visitor scans three suggestion cards.
4. **Outcome:** Visitor closes the tab (or navigates elsewhere via the shell). No data captured, no completion state.

## Empty States

- **No suggestions (`suggestions: []`):** Render the intro alone with a quiet placeholder, or omit the grid. Do not crash.
- **Fewer than 3 suggestions:** Render however many exist; do not pad with empty cards.

## Testing

See `product-plan/sections/take-action/tests.md` for UI behavior test specs.

## Files to Reference

- `product-plan/sections/take-action/README.md`
- `product-plan/sections/take-action/tests.md`
- `product-plan/sections/take-action/components/`
- `product-plan/sections/take-action/types.ts`
- `product-plan/sections/take-action/sample-data.json`
- `product-plan/sections/take-action/take-action.png` (light) and `take-action-dark.png` (dark)

## Done When

- [ ] Take Action renders inside the shell on `/take-action`.
- [ ] Intro headline and subhead render at the top.
- [ ] Three suggestion cards render side-by-side on desktop, stacked on mobile.
- [ ] One card uses lime accent; others use blue.
- [ ] No buttons, forms, or completion state appear.
- [ ] Light + dark mode match the screenshots.
