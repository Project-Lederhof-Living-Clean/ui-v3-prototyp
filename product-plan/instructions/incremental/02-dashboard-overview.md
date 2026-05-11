# Milestone 2: Dashboard Overview

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
