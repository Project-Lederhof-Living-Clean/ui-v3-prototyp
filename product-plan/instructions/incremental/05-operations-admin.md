# Milestone 5: Operations (Admin)

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
