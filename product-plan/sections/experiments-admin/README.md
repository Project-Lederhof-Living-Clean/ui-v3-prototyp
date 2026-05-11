# Experiments (Admin)

## Overview

Experiments is the admin tool where the city tests, compares, and decides on interventions for the Lederhof. Admins browse a list of running, concluded, and planned experiments, drill into a detail view comparing each experiment's interventions against a baseline, and create or edit experiments with full control.

## User Flows

- An admin opens Experiments and sees a list of all experiments grouped or filterable by status (running, concluded, planned).
- The admin selects an experiment from the list and the detail view loads with its full content.
- The admin reads the hypothesis and short summary to understand what's being tested.
- The admin reviews the list of interventions, including the baseline, with a short description of each.
- The admin reads the outcome chart — a time-series overlay of the experiment's metric for each intervention vs. baseline.
- The admin reads the decision/recommendation block: verdict (keep / kill / scale / undecided), rationale, and next action.
- The admin creates a new experiment via "New experiment".
- The admin edits an existing experiment and saves changes.
- The admin deletes an experiment with a confirmation step.

## Design Decisions

- **Two-pane layout.** List on the left, detail on the right (desktop). Mobile collapses to list-then-detail with a back affordance.
- **Status as visual treatment.** `planned` (stone), `running` (blue), `concluded` (lime).
- **Baseline always visible.** Outcome chart includes a clear baseline line in neutral stone tone with a legend.
- **Decision block is mandatory in concluded experiments.** Forces the city to commit to a verdict and a next action.
- **Out of scope.** Linking back to specific Operations records, public visibility of experiments, statistical-significance computation in the UI.

## Data Shapes

**Entities:** `Experiment`, `ExperimentIntervention`, `Decision`, `Metric`, `OutcomeSeries` (`Record<interventionId, SeriesPoint[]>`).

**From global entities:** Each `Experiment` corresponds to the global `Experiment` entity; `ExperimentIntervention` corresponds to `Intervention`. Outcome series are computed against `LitterEvent` and `CleaningOperation` aggregations within the experiment's date window.

## Visual Reference

See `experiments.png` (light) and `experiments-dark.png` (dark) for the target UI design.

## Components Provided

- `Experiments` — Top-level two-pane screen.
- `ExperimentList` — Left pane: scrollable list of experiments.
- `ExperimentListItem` — Single row in the list.
- `ExperimentDetail` — Right pane: hypothesis, interventions, outcome chart, decision.
- `InterventionsList` — Lists interventions for the active experiment, marking the baseline.
- `OutcomeChart` — Time-series overlay (one line per intervention + baseline).
- `DecisionBlock` — Verdict pill, rationale, and recommended action.
- `StatusBadge` — Visual indicator for experiment status.

## Callback Props

| Callback | Triggered When |
|----------|---------------|
| `onSelectExperiment(id)` | Admin clicks an experiment in the list |
| `onCreateExperiment()` | Admin clicks "New experiment" |
| `onEditExperiment(id)` | Admin clicks edit on the active experiment |
| `onSaveExperiment(experiment)` | Admin saves edits |
| `onDeleteExperiment(id)` | Admin confirms deletion |
