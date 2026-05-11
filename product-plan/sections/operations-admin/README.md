# Operations (Admin)

## Overview

Operations is the admin-only log of cleaning operations on the Lederhof. It supports both single-session cleanings and long-term operations that run over several weeks, and lets admins review, edit, and schedule operations from a single sortable, filterable table.

## User Flows

- An admin opens Operations and sees a single headline number at the top — items collected in the current period — followed by the operations table.
- The admin sorts the table by date, duration, or items collected to spot patterns.
- The admin filters the table to scope by date range, status (scheduled / in progress / completed), or operation type (single-session vs. long-term).
- The admin clicks an operation row to open an edit panel and update its details.
- The admin clicks "Schedule operation" to add a new upcoming operation, choosing a single date or a date range for long-term operations.
- The admin reviews upcoming scheduled operations alongside completed ones in the same table, distinguished by status.

## Design Decisions

- **Single table, all states.** Scheduled, in-progress, and completed operations live in the same table — distinguished by a status pill, not by separate views.
- **Long-term vs single-session.** Long-term ops show a date range; single-session ops show a single date. Type-toggle filter scopes the table.
- **Items breakdown inline.** Each row shows the total items prominently, with a compact category breakdown (chips) for context without leaving the row.
- **Edit in panel.** Clicking a row opens an edit panel pre-filled — no full-page navigation.

## Data Shapes

**Entities:** `Operation`, `ItemsCollected`, `ItemsBreakdown`, `OperationsSummary`.

**From global entities:** Each `Operation` corresponds to a `CleaningOperation`. Items breakdown categorizes resolved `LitterEvent`s by type.

## Visual Reference

See `operations.png` (light) and `operations-dark.png` (dark) for the target UI design.

## Components Provided

- `Operations` — Top-level screen: summary number, filters, table, and edit panel state.
- `OperationsFilters` — Date range, status multi-select, and type toggle.
- `OperationRow` — Single row in the operations table.
- `ItemsBreakdownChips` — Compact category breakdown chips (cigarettes, food packaging, etc.).
- `StatusPill` — Visually distinct status indicator (scheduled / in-progress / completed).

## Callback Props

| Callback | Triggered When |
|----------|---------------|
| `onScheduleOperation()` | Admin clicks "Schedule operation" |
| `onEditOperation(operationId)` | Admin clicks a row to open the edit panel |
| `onSaveOperation(operation)` | Admin saves edits in the edit panel |
| `onFiltersChange(filters)` | Filters change; the page should re-fetch the filtered list |
