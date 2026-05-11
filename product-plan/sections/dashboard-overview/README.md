# Dashboard Overview

## Overview

The Dashboard Overview is the public landing screen for Living Clean. It tells a visitor in a single glance how the Lederhof is doing today — leading with a headline stat and a short trend — and pulls the visitor toward concrete action via a single prominent CTA.

## User Flows

- A visitor lands on the Dashboard and sees the headline stat ("X pieces of litter detected on the Lederhof today") with an inline sparkline.
- The visitor scrolls to a trend-over-time chart that shows how the square's cleanliness has changed over the last weeks.
- The visitor reads the Active Interventions block to understand what the city is currently trying.
- The visitor clicks the single hero CTA "Take Action" and is sent to the Take Action section.

## Design Decisions

- **One CTA, no clutter.** Only "Take Action" — no per-event drilling, no date-range filters, no auth.
- **Stones, not alarming reds.** Delta indicator stays neutral so the page never reads as crisis communication.
- **Sparkline + trend chart.** Inline sparkline gives instant context next to the headline; the larger trend chart below offers shape over the last 30 days.
- **Active interventions surfaced.** Visitors see what the city is actively trying — building trust through visible effort.

## Data Shapes

**Entities:** `HeadlineStat`, `TrendPoint`, `Intervention`, `HeroCta`.

**From global entities:** Drawn from `LitterEvent` aggregations (today's total, deltas, sparkline) and `Intervention`/`Experiment` records (currently running).

## Visual Reference

See `dashboard-overview.png` (light) and `dashboard-overview-dark.png` (dark) for the target UI design.

## Components Provided

- `DashboardOverview` — Top-level screen composing all parts together.
- `HeadlineStat` — Big number + delta + inline sparkline + label card.
- `Sparkline` — Inline 14-day sparkline.
- `TrendChart` — Bar chart of daily detected litter, last ~30 days.
- `InterventionCard` — Single active intervention card.

## Callback Props

| Callback | Triggered When |
|----------|---------------|
| `onHeroCtaClick(href)` | Visitor clicks the "Take Action" hero button |
| `onInterventionSelect(interventionId)` | Visitor clicks an active intervention card |
