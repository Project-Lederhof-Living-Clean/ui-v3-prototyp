# Take Action

## Overview

The Take Action section gives a citizen three concrete, low-effort behaviors they could adopt to keep the Lederhof living and clean. The cards are inspirational only — no submissions, no signups, no tracking — the goal is simply to plant an idea the visitor takes with them when they leave the screen.

## User Flows

- A visitor arrives from the Dashboard CTA or the Awareness Story closing CTA.
- The visitor reads a short intro that frames why these small acts matter.
- The visitor scans three suggested commitments displayed side by side.
- The visitor leaves with one of the suggestions in mind — no form submission, no confirmation, no further interaction.

## Design Decisions

- **No buttons, no forms, no completion state.** Cards are read-only; the page should not feel like a form.
- **Restrained styling.** Stone neutrals for surfaces; blue used only as accent (icon or thin top border); lime reserved for one card to draw the eye.
- **Generous whitespace.** Three cards side-by-side on desktop, stacked on mobile.
- **Out of scope.** Pledge submission, reporting forms, community signups, share buttons, social proof counts, confirmation states.

## Data Shapes

**Entities:** `Intro`, `Suggestion`.

**From global entities:** Conceptually a small set of curated content; can be hard-coded or driven by the `CitizenAction` framework if the implementation supports it.

## Visual Reference

See `take-action.png` (light) and `take-action-dark.png` (dark) for the target UI design.

## Components Provided

- `TakeAction` — Top-level screen with intro and suggestion grid.
- `SuggestionCard` — Single suggestion card (icon + title + description).

## Callback Props

None. The Take Action section is intentionally read-only — no callbacks are exposed.
