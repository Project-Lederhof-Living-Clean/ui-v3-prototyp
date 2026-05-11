# Living Clean — UI v3 Prototype

Vite + React + TypeScript + Tailwind v4 frontend prototype for the Lederhof "Living Clean" project.

## Live site

Published to GitHub Pages from the `gh-pages` branch on every push to `main`:
<https://project-lederhof-living-clean.github.io/ui-v3-prototyp/>

## Local development

```bash
bun install
bun run dev
```

## Build / preview

```bash
bun run build      # outputs ./dist
bun run preview    # serves ./dist locally
```

## Structure

- `src/shell/` — `AppShell`, `MainNav`, dark-mode hook
- `src/pages/` — section pages (placeholders until each milestone lands)
- `product-plan/` — design intent, tokens, sample data, component sources

## Deployment

`.github/workflows/deploy-pages.yml` builds on every push to `main` and force-pushes `dist/` to the `gh-pages` branch. One-time setup: in repo Settings → Pages, set Source = `gh-pages` branch / `/ (root)`.
