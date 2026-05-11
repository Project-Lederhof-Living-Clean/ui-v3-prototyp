# Test Specs: Dashboard Overview

These test specs are **framework-agnostic**. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, React Testing Library, etc.).

## Overview

The Dashboard Overview is the public landing screen. Tests verify that the headline stat, trend chart, active interventions, and hero CTA render correctly and that the CTA + intervention click behavior fire the expected callbacks.

---

## User Flow Tests

### Flow 1: Land on dashboard and read today's number

**Scenario:** A visitor opens the dashboard for a quick cleanliness check.

#### Success Path

**Setup:**
- `headlineStat` with `count: 184`, `deltaVsYesterday: -22`, `deltaDirection: 'down'`, valid 14-point sparkline.
- `trend` array with ~30 daily points.
- `activeInterventions` array with at least 1 entry.

**Steps:**
1. Render `<DashboardOverview ...>` with the props above.
2. Visitor sees the headline stat region.

**Expected Results:**
- [ ] The number `184` is visible as the dominant numeric on the page.
- [ ] The label `pieces of litter detected on the Lederhof today` (or the configured `label`) is visible.
- [ ] The delta chip shows `−22` and the words `vs. yesterday`.
- [ ] An inline sparkline (14 points) renders next to or under the stat.
- [ ] The "Last 14 days" caption is visible alongside the sparkline.

### Flow 2: Click the hero CTA to go to Take Action

#### Success Path

**Setup:**
- Same props as Flow 1; `heroCta = { label: 'Take Action', href: '/take-action' }`.
- A jest/vitest spy is passed for `onHeroCtaClick`.

**Steps:**
1. Visitor clicks the button labelled `Take Action`.

**Expected Results:**
- [ ] `onHeroCtaClick` is called once with the argument `'/take-action'`.

### Flow 3: Click an active intervention card

#### Success Path

**Setup:**
- `activeInterventions[0]` has `id: 'painted-footprints'` and `title: 'Painted footprints to the bins'`.
- A spy is passed for `onInterventionSelect`.

**Steps:**
1. Visitor clicks the intervention card with title `Painted footprints to the bins`.

**Expected Results:**
- [ ] `onInterventionSelect` is called once with `'painted-footprints'`.

---

## Empty State Tests

### Primary Empty State (no active interventions)

**Scenario:** The city has no currently-running interventions.

**Setup:**
- `activeInterventions: []`.

**Expected Results:**
- [ ] The "What we're trying right now" heading is still rendered.
- [ ] An empty hint or zero-state copy is shown in place of cards (e.g., `No interventions running right now`).
- [ ] The hero CTA and trend chart still render normally.

### Trend Empty State

**Scenario:** No trend data yet (system just bootstrapped).

**Setup:**
- `trend: []`.

**Expected Results:**
- [ ] The "How we're trending" card still renders.
- [ ] The chart area shows a neutral empty hint (e.g., `Not enough data yet`) rather than blank space.
- [ ] No JavaScript errors thrown.

---

## Component Interaction Tests

### HeadlineStat

**Renders correctly:**
- [ ] Number is displayed in a visually dominant size (≥ 3rem on desktop).
- [ ] Delta direction icon matches `deltaDirection` (`down` shows a down arrow; `up` shows up).
- [ ] Date label (e.g., `Thursday, May 7`) renders above the count.

### TrendChart

- [ ] Bars render one per `TrendPoint`.
- [ ] `peak` and `low` labels show the max and min values from `trend`.
- [ ] Hovering a bar reveals the exact value and date in a tooltip or aria label.
- [ ] X-axis labels show first, middle, and last dates only (no clutter).

### InterventionCard

- [ ] Title, description, and start date all render.
- [ ] A `running` status indicator is visible.
- [ ] Hover state is visually distinct (e.g., border or background change).

---

## Edge Cases

- [ ] `deltaDirection: 'flat'` renders without an arrow icon and shows `0` or no delta.
- [ ] Very long intervention descriptions wrap; do not overflow the card.
- [ ] Sparkline with all-zero values renders a flat line, not a crash.
- [ ] Five active interventions render in a grid; one renders in a single full-width card.
- [ ] Page is responsive: at <768px, hero stacks single-column and intervention cards stack vertically.

---

## Accessibility Checks

- [ ] Hero CTA is reachable via Tab and activates with Enter/Space.
- [ ] Headline stat region uses `role="region"` or equivalent with an accessible name.
- [ ] Delta indicator has an aria-label like `Down 22 vs. yesterday`.
- [ ] Trend chart bars are keyboard-focusable buttons with descriptive labels (`Apr 8: 268 items`).

---

## Sample Test Data

```typescript
import type { DashboardOverviewProps } from './types'

const mockProps: DashboardOverviewProps = {
  headlineStat: {
    date: '2026-05-07',
    count: 184,
    label: 'pieces of litter detected on the Lederhof today',
    deltaVsYesterday: -22,
    deltaDirection: 'down',
    sparkline: [206, 195, 201, 192, 206, 198, 215, 229, 251, 238, 224, 207, 196, 184],
  },
  trend: [
    { date: '2026-04-08', count: 268 },
    // …29 more
    { date: '2026-05-07', count: 184 },
  ],
  activeInterventions: [
    {
      id: 'painted-footprints',
      title: 'Painted footprints to the bins',
      description: 'Bright lime footprints on the pavement leading visitors to the nearest waste bin.',
      startDate: '2026-04-15',
      status: 'running',
    },
  ],
  heroCta: { label: 'Take Action', href: '/take-action' },
}

// Empty states
const mockNoInterventions = { ...mockProps, activeInterventions: [] }
const mockNoTrend = { ...mockProps, trend: [] }
```
