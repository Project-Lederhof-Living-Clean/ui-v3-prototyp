# Awareness Story

## Overview

The Awareness Story is a standalone, slide-by-slide narrative that confronts visitors with the factual scale of littering on the Lederhof and ends by handing them off to the Take Action section. The tone is stark and factual — clean typography, hard numbers, minimal decoration — so the data does the emotional work.

This section renders **outside** the application shell (full viewport).

## User Flows

- A visitor enters the Awareness Story and sees a title slide that auto-advances after a short pause.
- The visitor watches the story play through automatically, slide by slide, with a clear pause control and skip-forward / skip-back affordances.
- The visitor pauses on any slide they want to dwell on, then resumes.
- The story builds the scale of the problem — anchored on the headline fact "total litter items per week" — across a small set of factual slides.
- The story ends on a CTA slide that sends the visitor to the Take Action section.

## Design Decisions

- **Stark + factual aesthetic.** Big display numbers, restrained typography, no illustrations or stock imagery; primary blue used sparingly for emphasis.
- **Auto-advance with override.** Visible progress bar across the top ticks down each slide's duration; pause/skip controls always reachable.
- **Keyboard-first.** Space toggles play/pause; left/right navigate.
- **Out of scope.** Humorous illustrations, social sharing, branching narrative, video/audio.

## Data Shapes

**Entities:** `Story`, `Slide` (union of `TitleSlide` | `StatSlide` | `BreakdownSlide` | `CtaSlide`), `Figure`, `BreakdownItem`, `StoryCta`.

**From global entities:** Built from `LitterEvent`, `Hotspot`, and `CleaningOperation` aggregations curated into `AwarenessStory` records.

## Visual Reference

See `awareness-story.png` (light) and `awareness-story-dark.png` (dark) for the target UI design.

## Components Provided

- `AwarenessStory` — Top-level controller. Manages playback, keyboard, and slide transitions.
- `Slides` — Renders the active slide (delegates to per-type sub-renderers internally).
- `SlideProgress` — Top progress bar showing position in the story.
- `StoryControls` — Pause/play, previous, next.

## Callback Props

| Callback | Triggered When |
|----------|---------------|
| `onCtaClick(href)` | Visitor clicks the closing CTA on the final slide |
| `onSlideChange(slideId, index)` | Visitor advances to a new slide (manual or autoplay) |
| `onComplete()` | Visitor reaches the last slide without exiting via the CTA |
