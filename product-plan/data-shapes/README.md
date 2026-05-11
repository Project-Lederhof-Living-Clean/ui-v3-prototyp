# UI Data Shapes

These types define the shape of data that the UI components expect to receive as props. They represent the **frontend contract** — what the components need to render correctly.

How you model, store, and fetch this data on the backend is an implementation decision. You may combine, split, or extend these types to fit your architecture.

## Entities

- **HeadlineStat / TrendPoint / Intervention (dashboard)** — Today's count, deltas, sparkline, and active interventions list (used in: dashboard-overview).
- **Story / Slide / Figure / BreakdownItem (awareness)** — Slide-by-slide narrative content (used in: awareness-story).
- **Suggestion / Intro (take-action)** — Inspirational suggestion cards (used in: take-action).
- **Operation / ItemsCollected / OperationsSummary (operations)** — Cleaning operations log entries with items breakdown (used in: operations-admin).
- **Experiment / ExperimentIntervention / Decision / OutcomeSeries (experiments)** — Experiment metadata, interventions, time-series outcomes, and verdict (used in: experiments-admin).

## Per-Section Types

Each section includes its own `types.ts` with the full interface definitions:

- `sections/dashboard-overview/types.ts`
- `sections/awareness-story/types.ts`
- `sections/take-action/types.ts`
- `sections/operations-admin/types.ts`
- `sections/experiments-admin/types.ts`

## Combined Reference

See `overview.ts` for all entity types aggregated in one file.
