# Living Clean — Complete Implementation Instructions

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

## Testing

Each section includes a `tests.md` file with UI behavior test specs. These are **framework-agnostic** — adapt them to your testing setup.

**For each section:**
1. Read `product-plan/sections/[section-id]/tests.md`
2. Write tests for key user flows (success and failure paths)
3. Implement the feature to make tests pass
4. Refactor while keeping tests green

---

# Living Clean — Product Overview

## Summary

Living Clean transforms the Lederhof from a neglected, littered square into a living, self-regulating public space. It turns litter and cleaning data into a citizen-facing awareness experience that motivates cleaner behavior, while giving the city an admin layer to run operations and compare interventions.

**Core problems addressed:**

- Littering at the Lederhof has no visible cost — citizens don't see the scale.
- Bins and cleaning crews alone don't shift behavior.
- The city can't tell which interventions actually work.
- Detection, cleaning logs, and experiments live in silos.

**Key features:**

- Public dashboard with a current cleanliness snapshot and trend at a glance.
- Awareness stories that turn raw litter data into emotionally resonant, shareable visuals.
- Take-action prompts that convert awareness into concrete citizen commitments.
- Admin operations log for cleaning crews — what was cleaned, where, when, how much.
- Intervention experiments view to compare the effect of different campaigns and design changes.
- Hotspot detection that surfaces the most problematic spots on the square over time.

## Planned Sections

1. **Dashboard Overview** — Public-facing landing view with a cleanliness snapshot, recent trend, and entry points into the awareness story and take-action flows.
2. **Awareness Story** — Slide-by-slide narrative that confronts visitors with the factual scale of littering on the Lederhof and ends with a CTA into Take Action.
3. **Take Action** — Citizen-facing prompts to commit to small actions, report litter, and join community initiatives that strengthen personal responsibility.
4. **Operations (Admin)** — Internal log of cleaning operations — when and where crews cleaned, what was collected, and how effort maps to outcomes.
5. **Experiments (Admin)** — Side-by-side comparison of interventions (campaigns, signage, design changes) to evaluate which measures actually reduce littering.

## Product Entities

- **LitterEvent** — A single detected piece of litter (type, location, time).
- **Hotspot** — A recurring high-litter zone derived from clusters of LitterEvents.
- **CleaningOperation** — A logged cleaning action by a crew — where, when, how long, what was collected.
- **Intervention** — A specific measure tried on the square (campaign, signage, design change, bin placement) with defined start/end.
- **Experiment** — A structured comparison of one or more Interventions against a baseline, with a hypothesis and outcome.
- **AwarenessStory** — A curated narrative shown to citizens, built from real data.
- **CitizenAction** — A commitment or report made by a visitor.

**Relationships:**

- Hotspot has many LitterEvents.
- CleaningOperation targets Hotspots and resolves LitterEvents.
- Experiment has many Interventions; evaluated against LitterEvents and CleaningOperations within its time window.
- AwarenessStory is built from LitterEvents, Hotspots, and CleaningOperations.
- CitizenAction is triggered by an AwarenessStory and may reference a Hotspot.

## Design System

**Colors:**
- Primary: `blue` (Tailwind)
- Secondary: `lime` (Tailwind)
- Neutral: `stone` (Tailwind)

**Typography:**
- Heading: DM Sans
- Body: DM Sans
- Mono: IBM Plex Mono

## Implementation Sequence

Build this product in milestones:

1. **Shell** — Set up design tokens and the sidebar-driven application shell.
2. **Dashboard Overview** — Public landing screen with headline stat, trend, active interventions, and Take Action CTA.
3. **Awareness Story** — Standalone full-viewport slide narrative (no shell).
4. **Take Action** — Three inspirational suggestion cards inside the shell.
5. **Operations (Admin)** — Sortable, filterable cleaning operations log with scheduling.
6. **Experiments (Admin)** — Two-pane experiment list and detail view with outcome chart and decision block.

Each milestone has a dedicated instruction document in `product-plan/instructions/`.


---

# Milestone 1: Shell

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** None

---


## Goal

Set up the design tokens and application shell — the persistent chrome that wraps all sections except the standalone Awareness Story.

## What to Implement

### 1. Design Tokens

Configure your styling system with the Living Clean tokens:

- See `product-plan/design-system/tokens.css` for CSS custom properties.
- See `product-plan/design-system/tailwind-colors.md` for Tailwind palette choices (Tailwind v4 — no `tailwind.config.js`).
- See `product-plan/design-system/fonts.md` for the Google Fonts setup (DM Sans + IBM Plex Mono).

Apply these globally so every section inherits them.

### 2. Application Shell

Copy the shell components from `product-plan/shell/components/` to your project:

- `AppShell.tsx` — Main layout wrapper with sidebar, mobile top bar, and content slot.
- `MainNav.tsx` — Two-group navigation (Public / Admin) with icons, active state, and admin badges.
- `index.ts` — Barrel export.

Install the dependency:

```bash
npm install lucide-react
```

**Wire Up Navigation:**

Provide `navigationGroups` like the following, with icons of your choice from `lucide-react`:

```typescript
import { LayoutDashboard, Sparkles, HandHeart, ClipboardList, FlaskConical } from 'lucide-react'

const navigationGroups: NavGroup[] = [
  {
    label: 'Public',
    items: [
      { label: 'Dashboard', href: '/', icon: LayoutDashboard, isActive: pathname === '/' },
      { label: 'Awareness', href: '/awareness', icon: Sparkles, isActive: pathname === '/awareness' },
      { label: 'Take Action', href: '/take-action', icon: HandHeart, isActive: pathname === '/take-action' },
    ],
  },
  {
    label: 'Admin',
    items: [
      { label: 'Operations', href: '/admin/operations', icon: ClipboardList, badge: 'ADMIN', isActive: pathname.startsWith('/admin/operations') },
      { label: 'Experiments', href: '/admin/experiments', icon: FlaskConical, badge: 'ADMIN', isActive: pathname.startsWith('/admin/experiments') },
    ],
  },
]
```

Pass `onNavigate={(href) => router.push(href)}` (or your router equivalent).

**No User Menu:**

Living Clean intentionally has no user menu, avatar, or logout. Admin distinction is communicated via the `ADMIN` badge.

**Awareness Story exception:**

The Awareness Story section is **standalone, full-viewport** — render its route OUTSIDE the `<AppShell>`. Every other route renders inside the shell.

## Files to Reference

- `product-plan/design-system/` — Design tokens (CSS, Tailwind colors, fonts).
- `product-plan/shell/README.md` — Shell design intent and props reference.
- `product-plan/shell/components/` — Shell React components.

## Done When

- [ ] Tailwind v4 is configured with DM Sans + IBM Plex Mono and palette utilities work.
- [ ] `<AppShell>` renders with the Public / Admin nav groups.
- [ ] Active nav item is visually distinct on the current route.
- [ ] Mobile (<768px) shows hamburger top bar with drawer sidebar.
- [ ] Admin badge renders on Operations and Experiments items.
- [ ] Awareness Story route renders without the shell.
- [ ] Light and dark mode both render cleanly.

---

# Milestone 2: Dashboard Overview

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Shell) complete

---


## Goal

Implement the Dashboard Overview — the public landing screen telling visitors how the Lederhof is doing today.

## Overview

The Dashboard Overview is the first thing a visitor sees. A single headline number ("X pieces of litter detected on the Lederhof today") with an inline 14-day sparkline anchors the page; a 30-day trend chart shows the longer arc; a list of currently-running interventions shows visible city effort; and a single hero CTA pushes the visitor toward Take Action.

**Key Functionality:**
- Display today's headline stat (count + delta vs. yesterday + sparkline).
- Show a 30-day trend chart (bar chart) of daily detected litter.
- List 2–5 currently active interventions with title, description, and start date.
- Single hero CTA "Take Action" routes to the Take Action section.
- Optional intervention click for future drill-down.

## Components Provided

Copy from `product-plan/sections/dashboard-overview/components/`:

- `DashboardOverview` — Top-level screen.
- `HeadlineStat` — Big number + delta + inline sparkline.
- `Sparkline` — Inline 14-day sparkline.
- `TrendChart` — 30-day bar chart with min/max labels.
- `InterventionCard` — One running intervention card.

## Props Reference

See `types.ts` for full definitions. Key shapes:

```typescript
interface DashboardOverviewProps {
  headlineStat: HeadlineStat
  trend: TrendPoint[]
  activeInterventions: Intervention[]
  heroCta: HeroCta
  onHeroCtaClick?: (href: string) => void
  onInterventionSelect?: (interventionId: string) => void
}
```

**Callback props:**

| Callback | Triggered When |
|----------|---------------|
| `onHeroCtaClick` | Visitor clicks the "Take Action" hero button |
| `onInterventionSelect` | Visitor clicks an active intervention card |

## Expected User Flows

### Flow 1: Read today's snapshot at a glance

1. Visitor opens `/` — the dashboard renders inside the shell.
2. Visitor reads the headline number, label, and delta vs. yesterday.
3. Visitor sees the 14-day sparkline alongside the number.
4. **Outcome:** Visitor leaves with an immediate sense of how the square is doing.

### Flow 2: Click "Take Action"

1. Visitor scrolls past the headline stat.
2. Visitor clicks the prominent "Take Action" button.
3. **Outcome:** Router navigates to `/take-action`.

### Flow 3: Inspect a running intervention

1. Visitor sees the "What we're trying right now" block listing active interventions.
2. Visitor clicks a card to learn more.
3. **Outcome:** Your app reacts to `onInterventionSelect` — could open a detail page, modal, or be a no-op for now.

## Empty States

- **No active interventions:** Show a calm hint in the "What we're trying right now" block (e.g., "No interventions running right now"). Keep the heading and surrounding layout.
- **No trend data:** Render the trend chart's container with a neutral hint ("Not enough data yet"). Do not crash on an empty array.
- **First-time experience:** The dashboard is public — no first-run flow is needed beyond graceful empty handling.

## Testing

See `product-plan/sections/dashboard-overview/tests.md` for UI behavior test specs.

## Files to Reference

- `product-plan/sections/dashboard-overview/README.md`
- `product-plan/sections/dashboard-overview/tests.md`
- `product-plan/sections/dashboard-overview/components/`
- `product-plan/sections/dashboard-overview/types.ts`
- `product-plan/sections/dashboard-overview/sample-data.json`
- `product-plan/sections/dashboard-overview/dashboard-overview.png` (light) and `dashboard-overview-dark.png` (dark)

## Done When

- [ ] Dashboard renders inside the shell on `/`.
- [ ] Real data drives the headline stat, trend, and interventions.
- [ ] Hero CTA routes to `/take-action`.
- [ ] Empty states render cleanly.
- [ ] Responsive on mobile.
- [ ] Light + dark mode both match the screenshots.

---

# Milestone 3: Awareness Story

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Shell) complete

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

---

# Milestone 4: Take Action

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Shell) complete

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

---

# Milestone 5: Operations (Admin)

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Shell) complete

---


## Goal

Implement the Operations admin tool — the cleaning operations log with sortable, filterable rows and scheduling.

## Overview

Admins land on a single headline number (items collected this period) followed by a unified table of operations. Status pills distinguish scheduled, in-progress, and completed work in the same view. Long-term operations show a date range; single-session ops show one date.

**Key Functionality:**
- Headline summary: items collected in selected period.
- Sortable, filterable table of all operations (any status, any type).
- Filters: date range, status multi-select, type toggle.
- Schedule new operation (single-session or long-term).
- Click a row to open an edit panel pre-filled with data; save returns to the table.
- Items breakdown shown as compact category chips per row.

## Components Provided

Copy from `product-plan/sections/operations-admin/components/`:

- `Operations` — Top-level screen.
- `OperationsFilters` — Date range, status multi-select, type toggle.
- `OperationRow` — Single row in the table.
- `ItemsBreakdownChips` — Category breakdown chips.
- `StatusPill` — Status indicator.

## Props Reference

```typescript
interface OperationsProps {
  summary: OperationsSummary
  operations: Operation[]
  onScheduleOperation?: () => void
  onEditOperation?: (operationId: string) => void
  onSaveOperation?: (operation: Operation) => void
  onFiltersChange?: (filters: { dateFrom?: string; dateTo?: string; statuses?: OperationStatus[]; types?: OperationType[] }) => void
}
```

**Callback props:**

| Callback | Triggered When |
|----------|---------------|
| `onScheduleOperation` | Admin clicks "Schedule operation" |
| `onEditOperation` | Admin clicks a row to open the edit panel |
| `onSaveOperation` | Admin saves edits in the panel |
| `onFiltersChange` | Filters change; re-fetch the filtered list |

## Expected User Flows

### Flow 1: Find an operation by date and status

1. Admin opens `/admin/operations`.
2. Admin sets date range to `Apr 2026` and status to `completed`.
3. **Outcome:** `onFiltersChange` fires; the table renders filtered rows.

### Flow 2: Edit an operation

1. Admin clicks a row.
2. Edit panel opens pre-filled with the operation's data.
3. Admin updates `notes`, clicks Save.
4. **Outcome:** `onSaveOperation(updated)` fires; panel closes; table reflects the updated row.

### Flow 3: Schedule a new long-term operation

1. Admin clicks "Schedule operation".
2. **Outcome:** `onScheduleOperation` fires; your app opens a creation form (or modal) for the admin to fill out a date or date range.

## Empty States

- **No operations yet:** Show heading "No operations yet" with helper text and the `Schedule operation` CTA prominent.
- **Filtered to nothing:** Show "No operations match these filters" with a `Clear filters` action.
- **Operation with 0 items collected:** Render row cleanly (`0 items`, no chips).

## Testing

See `product-plan/sections/operations-admin/tests.md` for UI behavior test specs (sort, filter, edit, schedule, empty states).

## Files to Reference

- `product-plan/sections/operations-admin/README.md`
- `product-plan/sections/operations-admin/tests.md`
- `product-plan/sections/operations-admin/components/`
- `product-plan/sections/operations-admin/types.ts`
- `product-plan/sections/operations-admin/sample-data.json`
- `product-plan/sections/operations-admin/operations.png` (light) and `operations-dark.png` (dark)

## Done When

- [ ] `/admin/operations` renders inside the shell.
- [ ] Headline summary renders at the top.
- [ ] Table is sortable by date, duration, items collected.
- [ ] All filters fire `onFiltersChange` correctly.
- [ ] Schedule button fires `onScheduleOperation`.
- [ ] Row click opens edit panel; save fires `onSaveOperation`.
- [ ] Status pills use stone / blue / lime correctly.
- [ ] Empty states render cleanly.
- [ ] Mobile responsive (table collapses to stacked rows).
- [ ] Light + dark mode match the screenshots.

---

# Milestone 6: Experiments (Admin)

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Shell) complete

---


## Goal

Implement the Experiments admin tool — a two-pane interface where the city designs, runs, compares, and decides on interventions.

## Overview

A list of experiments lives on the left; the active experiment's details — hypothesis, interventions, outcome chart, and decision — live on the right. Status (`planned` / `running` / `concluded`) is communicated through color (stone / blue / lime).

**Key Functionality:**
- Browse experiments grouped/filterable by status.
- Drill into detail view: hypothesis, summary, interventions list (with baseline marked), outcome chart, decision block.
- Outcome chart overlays a series per intervention plus a baseline line in neutral stone.
- Decision block shows verdict (keep / kill / scale / undecided), rationale, and recommended next action.
- Create, edit, delete experiments.

## Components Provided

Copy from `product-plan/sections/experiments-admin/components/`:

- `Experiments` — Top-level two-pane screen.
- `ExperimentList` / `ExperimentListItem` — Left pane.
- `ExperimentDetail` — Right pane.
- `InterventionsList` — Interventions for the active experiment.
- `OutcomeChart` — Time-series overlay.
- `DecisionBlock` — Verdict + rationale + action.
- `StatusBadge` — Status indicator.

## Props Reference

```typescript
interface ExperimentsProps {
  experiments: Experiment[]
  selectedExperimentId?: string
  onSelectExperiment?: (experimentId: string) => void
  onCreateExperiment?: () => void
  onEditExperiment?: (experimentId: string) => void
  onSaveExperiment?: (experiment: Experiment) => void
  onDeleteExperiment?: (experimentId: string) => void
}
```

**Callback props:**

| Callback | Triggered When |
|----------|---------------|
| `onSelectExperiment` | Admin clicks an experiment in the list |
| `onCreateExperiment` | Admin clicks "New experiment" |
| `onEditExperiment` | Admin clicks edit on the active experiment |
| `onSaveExperiment` | Admin saves edits |
| `onDeleteExperiment` | Admin confirms deletion |

## Expected User Flows

### Flow 1: Browse and inspect

1. Admin opens `/admin/experiments`.
2. List on the left shows experiments with status badges.
3. Admin clicks an experiment.
4. **Outcome:** `onSelectExperiment` fires; detail pane renders the active experiment.

### Flow 2: Read outcome and decision

1. Admin reads hypothesis and summary.
2. Admin scrolls to outcome chart, hovers over points to read exact values per intervention.
3. Admin reads decision block — verdict pill, rationale, action.
4. **Outcome:** Admin understands what was tested and what to do next.

### Flow 3: Create / Edit / Delete

1. Admin clicks "New experiment" → `onCreateExperiment` fires.
2. Admin clicks edit on a detail header → `onEditExperiment` fires; your form opens.
3. Admin saves → `onSaveExperiment(updated)` fires.
4. Admin clicks delete → confirmation modal → confirm → `onDeleteExperiment(id)` fires.

## Empty States

- **No experiments yet:** List pane shows `No experiments yet`. Detail pane prompts the admin to create the first one. `New experiment` button is prominent.
- **No interventions in active experiment:** Interventions list shows `No interventions defined`. Outcome chart shows a neutral empty hint.
- **Decision pending (running experiment):** Decision block shows `Decision pending` rather than a verdict pill.

## Testing

See `product-plan/sections/experiments-admin/tests.md` for UI behavior test specs.

## Files to Reference

- `product-plan/sections/experiments-admin/README.md`
- `product-plan/sections/experiments-admin/tests.md`
- `product-plan/sections/experiments-admin/components/`
- `product-plan/sections/experiments-admin/types.ts`
- `product-plan/sections/experiments-admin/sample-data.json`
- `product-plan/sections/experiments-admin/experiments.png` (light) and `experiments-dark.png` (dark)

## Done When

- [ ] `/admin/experiments` renders inside the shell with two-pane layout on desktop.
- [ ] Status badges use stone (planned), blue (running), lime (concluded).
- [ ] Outcome chart renders a baseline line plus a series per intervention with a legend.
- [ ] Decision block shows verdict, rationale, action — or a "pending" hint when null.
- [ ] Create, edit, delete callbacks all fire correctly.
- [ ] Delete requires confirmation; dismissing does NOT call `onDeleteExperiment`.
- [ ] Empty states render cleanly.
- [ ] Mobile collapses to single-column with list-then-detail navigation.
- [ ] Light + dark mode match the screenshots.
