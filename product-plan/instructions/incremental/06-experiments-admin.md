# Milestone 6: Experiments (Admin)

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
