# Test Specs: Take Action

These test specs are **framework-agnostic**. Adapt them to your testing setup.

## Overview

The Take Action section is intentionally read-only. Tests verify the intro and suggestion cards render correctly across viewports and that the page does not introduce any submit/confirmation behavior.

---

## User Flow Tests

### Flow 1: Read the intro and three suggestions

#### Success Path

**Setup:**
- `intro = { headline: 'Three small things you can do today', subhead: 'Each one keeps the Lederhof a little more living.' }`
- `suggestions` array of 3 entries.

**Steps:**
1. Render `<TakeAction intro={...} suggestions={...} />`.

**Expected Results:**
- [ ] Intro headline is visible as the dominant heading on the page.
- [ ] Intro subhead is visible directly below the headline.
- [ ] Three `SuggestionCard`s render in a horizontal row on desktop (≥768px).
- [ ] Each card shows its icon, title, and description.
- [ ] No buttons, form fields, or submit affordances appear anywhere in the section.

---

## Empty State Tests

### Empty suggestions list

**Setup:** `suggestions: []`.

**Expected Results:**
- [ ] Intro still renders.
- [ ] Page does not crash; either no cards render, or a low-key empty hint is shown.

### Fewer than 3 suggestions

**Setup:** `suggestions: [oneSuggestion, twoSuggestion]`.

**Expected Results:**
- [ ] Two cards render side by side, with layout that does not visually stretch them awkwardly to fill the row.

---

## Component Interaction Tests

### SuggestionCard

- [ ] Title, description, and icon are visible.
- [ ] Card is **not** clickable as a button — no `onClick` triggers any callback (the component does not accept one).
- [ ] One designated card uses lime as the accent color; the others use blue.

---

## Edge Cases

- [ ] Mobile viewport (<768px): cards stack vertically with full width.
- [ ] Very long descriptions wrap; cards maintain consistent height-or-not depending on layout choice (verify no overflow clipping).
- [ ] Both light and dark modes render the cards with sufficient contrast.

---

## Accessibility Checks

- [ ] Intro headline uses `h1` (or appropriate heading level for its position in the page).
- [ ] Card titles use a heading element (e.g., `h3`).
- [ ] Icons have `aria-hidden="true"` if purely decorative; otherwise meaningful labels.
- [ ] Cards are NOT focusable via Tab (they are not interactive — keyboard users should not get stuck on them).

---

## Sample Test Data

```typescript
import type { TakeActionProps } from './types'

const mockProps: TakeActionProps = {
  intro: {
    headline: 'Three small things you can do today',
    subhead: 'Each one keeps the Lederhof a little more living.',
  },
  suggestions: [
    { id: 'a', title: 'Carry it home', description: 'If a bin is full, take your trash with you.', icon: 'backpack' },
    { id: 'b', title: 'Pick up one piece', description: 'See litter? Bin it on your way past.', icon: 'sparkles' },
    { id: 'c', title: 'Tell a friend', description: 'Bring someone next time.', icon: 'message-circle' },
  ],
}
```
