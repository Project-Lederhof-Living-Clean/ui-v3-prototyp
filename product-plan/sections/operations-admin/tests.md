# Test Specs: Operations (Admin)

These test specs are **framework-agnostic**. Adapt them to your testing setup.

## Overview

Tests verify the headline summary, filters, sortable rows, status differentiation, and the edit/schedule callback wiring.

---

## User Flow Tests

### Flow 1: Admin opens Operations and sees the summary + table

#### Success Path

**Setup:**
- `summary = { value: 4218, label: 'items collected', periodLabel: 'this month' }`
- `operations` array with 3 entries: one `scheduled`, one `in-progress`, one `completed`.

**Steps:**
1. Render `<Operations summary={...} operations={...} ... />`.

**Expected Results:**
- [ ] The number `4218` renders as the visual centerpiece at the top of the page.
- [ ] The label `items collected` and period label `this month` are both visible near the number.
- [ ] The table renders three rows, one per operation, in the order provided.
- [ ] Each row shows: date (or date range), duration, items total + chips, status pill.
- [ ] A primary `Schedule operation` button is visible in the page header.

### Flow 2: Schedule a new operation

**Steps:**
1. Admin clicks the `Schedule operation` button.

**Expected Results:**
- [ ] `onScheduleOperation` is called once with no arguments.

### Flow 3: Edit an existing operation

**Setup:**
- `operations[0].id = 'op-001'`.

**Steps:**
1. Admin clicks the row for `op-001`.

**Expected Results:**
- [ ] `onEditOperation` is called once with `'op-001'`.

### Flow 4: Save edits to an operation

**Setup:** Edit panel is open with `op-001` pre-filled.

**Steps:**
1. Admin changes `notes` to `'Extra crew added'`.
2. Admin clicks Save.

**Expected Results:**
- [ ] `onSaveOperation` is called once with the full updated `Operation` object including `notes: 'Extra crew added'`.
- [ ] Form validation prevents save when required fields are blank (e.g., dates).

### Flow 5: Filter the table

**Steps:**
1. Admin opens the status filter and selects only `completed`.

**Expected Results:**
- [ ] `onFiltersChange` is called with `{ statuses: ['completed'] }`.

**Steps (continued):**
2. Admin sets a date range from `2026-04-01` to `2026-04-30`.

**Expected Results:**
- [ ] `onFiltersChange` is called with `{ statuses: ['completed'], dateFrom: '2026-04-01', dateTo: '2026-04-30' }` (cumulative state).

### Flow 6: Sort the table

**Steps:**
1. Admin clicks the `Items collected` column header.

**Expected Results:**
- [ ] Rows reorder by `itemsCollected.total` descending; clicking again reverses to ascending.
- [ ] The sort indicator on the column header updates to show direction.

---

## Empty State Tests

### Empty operations list

**Setup:** `operations: []`, `summary.value = 0`.

**Expected Results:**
- [ ] Summary still renders with `0`.
- [ ] An empty table state appears: heading like `No operations yet`, helper text, and a `Schedule operation` CTA.
- [ ] Filters remain visible but disabled or with neutral state.

### Filtered to nothing

**Setup:** Operations exist but the active filter excludes them all.

**Expected Results:**
- [ ] An empty hint appears in place of rows: `No operations match these filters`.
- [ ] A `Clear filters` action is available and calls `onFiltersChange({})` when clicked.

---

## Component Interaction Tests

### OperationRow

- [ ] Long-term operation shows a date range (`Apr 1 → Apr 30`).
- [ ] Single-session operation shows a single date (`Apr 22`).
- [ ] Items total is dominant; breakdown chips render in a compact secondary line.
- [ ] Hover state highlights the entire row.

### StatusPill

- [ ] `scheduled` uses neutral stones.
- [ ] `in-progress` uses primary blue.
- [ ] `completed` uses lime secondary.
- [ ] Status text matches the value (`Scheduled`, `In progress`, `Completed`).

### ItemsBreakdownChips

- [ ] Renders one chip per non-zero category.
- [ ] Categories with `0` are hidden, not rendered as zero chips.
- [ ] Chip labels match category names (Cigarettes, Food packaging, General waste, Paraphernalia).

### OperationsFilters

- [ ] Date range picker accepts both empty (no filter) and a valid range.
- [ ] Type toggle is mutually exclusive: `single-session`, `long-term`, or both.

---

## Edge Cases

- [ ] Operation with `itemsCollected.total = 0` renders cleanly (e.g., `0 items` and no chips).
- [ ] Long notes wrap inside the edit panel, do not overflow.
- [ ] 100+ operations: table scrolls within its container without breaking page layout.
- [ ] Mobile (<768px): table collapses to stacked cards; filters live behind an "Filters" toggle.
- [ ] Saving an operation with `endDate < startDate` shows a validation error, does not call `onSaveOperation`.

---

## Accessibility Checks

- [ ] Table uses `<table>` semantics with `<th>` headers.
- [ ] Sortable column headers expose `aria-sort` (`ascending` / `descending` / `none`).
- [ ] Status pills convey meaning via text, not color alone (visible label).
- [ ] Edit panel traps focus when open; Escape closes it.

---

## Sample Test Data

```typescript
import type { OperationsProps } from './types'

const mockProps: OperationsProps = {
  summary: { value: 4218, label: 'items collected', periodLabel: 'this month' },
  operations: [
    {
      id: 'op-001',
      title: 'Saturday morning sweep',
      type: 'single-session',
      startDate: '2026-04-22',
      endDate: '2026-04-22',
      durationHours: 2,
      itemsCollected: {
        total: 412,
        breakdown: { cigarettes: 220, foodPackaging: 110, generalWaste: 75, paraphernalia: 7 },
      },
      status: 'completed',
      notes: 'Standard volunteer sweep.',
    },
    // …
  ],
}

const mockEmpty = { ...mockProps, operations: [], summary: { ...mockProps.summary, value: 0 } }
```
