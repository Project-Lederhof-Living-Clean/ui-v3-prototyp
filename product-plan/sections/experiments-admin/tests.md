# Test Specs: Experiments (Admin)

These test specs are **framework-agnostic**. Adapt them to your testing setup.

## Overview

Tests verify the two-pane experience, status differentiation, outcome chart legend/baseline, decision block, and create/edit/delete callback wiring.

---

## User Flow Tests

### Flow 1: Browse and select an experiment

#### Success Path

**Setup:**
- `experiments` array of 3 entries: one `running`, one `concluded`, one `planned`.
- No `selectedExperimentId` provided (default to first).
- Spy on `onSelectExperiment`.

**Steps:**
1. Render `<Experiments experiments={...} ... />`.
2. Admin clicks the second experiment in the list.

**Expected Results:**
- [ ] First experiment is shown as selected on initial render (its title appears in the detail pane).
- [ ] Each list item shows: title, status badge, date range.
- [ ] Status badges use distinct colors: stone for planned, blue for running, lime for concluded.
- [ ] Clicking the second experiment fires `onSelectExperiment` with that experiment's id.

### Flow 2: Read experiment detail

**Setup:** Selected experiment has hypothesis, summary, 3 interventions (1 baseline + 2 treatments), outcome series for each, and a `keep` decision.

**Expected Results:**
- [ ] Detail pane top: experiment title, status pill, date range, one-line hypothesis.
- [ ] Hypothesis & summary block visible.
- [ ] Interventions list shows all 3 with the baseline marked (e.g., a `Baseline` tag).
- [ ] Outcome chart renders a line per intervention plus a baseline line in neutral stone.
- [ ] Chart legend lists all interventions including baseline.
- [ ] Decision block shows verdict pill (`Keep`), rationale text, and recommended action text.

### Flow 3: Create a new experiment

**Steps:**
1. Admin clicks the `New experiment` button in the page header.

**Expected Results:**
- [ ] `onCreateExperiment` is called once with no arguments.

### Flow 4: Edit an experiment

**Steps:**
1. Admin clicks the edit icon in the detail pane header.

**Expected Results:**
- [ ] `onEditExperiment` is called once with the active experiment's id.

**Steps (continued):**
2. Admin opens an edit form, changes hypothesis to `'Reframed signage reduces cigarette litter by 20%'`, clicks Save.

**Expected Results:**
- [ ] `onSaveExperiment` is called once with the full updated `Experiment` object including the new hypothesis.

### Flow 5: Delete an experiment

**Steps:**
1. Admin clicks the delete icon in the detail pane header.
2. A confirmation dialog appears.
3. Admin confirms.

**Expected Results:**
- [ ] No callback fires when the dialog opens.
- [ ] `onDeleteExperiment` is called once with the experiment's id only after the admin confirms.
- [ ] Dismissing the dialog without confirming does NOT call `onDeleteExperiment`.

---

## Empty State Tests

### No experiments yet

**Setup:** `experiments: []`.

**Expected Results:**
- [ ] List pane shows an empty hint: `No experiments yet`.
- [ ] Detail pane shows guidance: `Create your first experiment to start comparing interventions.`
- [ ] `New experiment` button is visible and functional.

### Experiment with no decision yet

**Setup:** Selected experiment has `decision: null` and `status: 'running'`.

**Expected Results:**
- [ ] Decision block renders an explanatory state: `Decision pending` or `No decision yet — experiment is still running`.
- [ ] Verdict pill is not shown, or shown as `Undecided` with neutral styling.

### Experiment with no interventions

**Setup:** Selected experiment has `interventions: []`.

**Expected Results:**
- [ ] Interventions list shows an empty hint: `No interventions defined`.
- [ ] Outcome chart renders an empty state (e.g., `No data to compare yet`) without crashing.

---

## Component Interaction Tests

### ExperimentList

- [ ] Renders one item per experiment.
- [ ] Active item has a visually distinct treatment (border, background, or both).
- [ ] List is keyboard-navigable: Up/Down arrows move selection; Enter activates.

### OutcomeChart

- [ ] Renders one series line per `interventionId` in `outcomeSeries`.
- [ ] Baseline line uses neutral stone, distinguishable from intervention lines.
- [ ] Hovering a point reveals exact value, date, and intervention name.
- [ ] Legend chips can be clicked to toggle series visibility (if implemented; verify no crash if so).

### DecisionBlock

- [ ] Verdict pill colors: `keep` (lime), `scale` (blue), `kill` (stone with strikethrough or red accent — verify against design), `undecided` (neutral stone).
- [ ] Rationale and action are visible when present.

### StatusBadge

- [ ] `planned` → stone styling + label `Planned`.
- [ ] `running` → blue styling + label `Running`.
- [ ] `concluded` → lime styling + label `Concluded`.

---

## Edge Cases

- [ ] Deleting the currently selected experiment auto-selects the next one in the list (or shows the empty detail pane if it was the last).
- [ ] Saving an experiment with `endDate < startDate` shows a validation error, does not call `onSaveExperiment`.
- [ ] A `concluded` experiment with no decision still renders without crash; consider showing a warning prompt in the UI.
- [ ] Mobile (<768px): list and detail are sequential views; a back affordance returns from detail to list.
- [ ] OutcomeChart with sparse data (single point per intervention) renders dots, not crash on missing line.

---

## Accessibility Checks

- [ ] List items are buttons with `aria-current="true"` for the selected one.
- [ ] Chart series include text labels in legend; do not rely on color alone.
- [ ] Delete confirmation dialog is a real modal: traps focus, Escape closes, `aria-modal="true"`.
- [ ] Status badges include text labels (not color-only).

---

## Sample Test Data

```typescript
import type { ExperimentsProps } from './types'

const mockProps: ExperimentsProps = {
  experiments: [
    {
      id: 'exp-001',
      title: 'Reframed signage at north gate',
      status: 'running',
      startDate: '2026-05-01',
      endDate: '2026-06-15',
      hypothesis: 'Friendly signage reduces cigarette litter at the entrance.',
      summary: 'Replaced "no littering" sign with a thank-you illustration.',
      metric: { label: 'Cigarette butts per day', unit: 'items' },
      interventions: [
        { id: 'baseline', name: 'Old signage', description: 'No-littering sign.', isBaseline: true },
        { id: 'reframe', name: 'Friendly signage', description: 'Thank-you illustration.', isBaseline: false },
      ],
      outcomeSeries: {
        baseline: [{ date: '2026-05-01', value: 84 }, { date: '2026-05-07', value: 79 }],
        reframe: [{ date: '2026-05-01', value: 84 }, { date: '2026-05-07', value: 61 }],
      },
      decision: null,
    },
  ],
}

const mockEmpty: ExperimentsProps = { experiments: [] }
```
