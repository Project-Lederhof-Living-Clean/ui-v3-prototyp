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
