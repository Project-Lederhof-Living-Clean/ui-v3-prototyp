---
name: github-actions-workflow
description: Create or modify a GitHub Actions workflow for this project. Trigger when the user says "create a workflow", "add a CI job", "add a GitHub Actions workflow", "set up CI for", or asks about automating something with GitHub Actions.
---

# GitHub Actions workflow creation

Project-validated conventions. Apply all of them to every new workflow; never omit without a stated reason.

## Trigger block

```yaml
on:
  pull_request:            # no branches filter — runs for PRs targeting any branch
    paths:
      - "<owned-paths>/**"
      - ".github/workflows/<this-file>.yml"
  push:
    branches: [main]       # full cycle on merge
    paths:
      - "<owned-paths>/**"
      - ".github/workflows/<this-file>.yml"
```

Rules:
- `pull_request` has **no** `branches` filter.
- `push` is always scoped to `branches: [main]`.
- Both events share **identical** `paths` lists.
- Always include the workflow file itself in `paths` so changes to the CI definition re-trigger it.
- Add `workflow_dispatch` only when manual triggering is genuinely needed (e.g. deploy workflows).

## Required top-level fields

```yaml
concurrency:
  group: <workflow-slug>-${{ github.head_ref || github.sha }}
  cancel-in-progress: true

permissions:
  contents: read
  # add only what the job actually uses, e.g.:
  # pull-requests: write   # for PR comments / coverage reports
```

- `cancel-in-progress: true` prevents redundant parallel runs on the same PR.
- `github.head_ref || github.sha` degrades gracefully: `head_ref` is set on PRs, `sha` is used for push-to-main runs.
- `permissions` must be explicit; never rely on the repo-level default.

## Job shell

```yaml
jobs:
  <job-name>:
    runs-on: ubuntu-latest
    timeout-minutes: 15    # adjust to expected runtime; prevents 6-hour hangs
    steps:
      - uses: actions/checkout@v4
```

- Always set `timeout-minutes`. Default is 360 (6 hours).
- Use `ubuntu-latest` unless the job requires a different OS.

## Toolchain: Python (uv)

```yaml
      - name: Install uv
        uses: astral-sh/setup-uv@v4
        with:
          enable-cache: true

      - name: Sync dependencies
        run: uv sync --frozen    # --frozen enforces exact lockfile; no silent upgrades
```

Python source lives in `src/` and `tools/`. Paths to watch:

```yaml
    paths:
      - "src/**"
      - "tools/**"
      - "pyproject.toml"
      - "uv.lock"
      - ".github/workflows/<this-file>.yml"
```

## Toolchain: JavaScript/TypeScript (bun)

```yaml
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest

      - name: Install
        working-directory: web
        run: bun install --frozen-lockfile
```

Frontend source lives in `web/`. Paths to watch:

```yaml
    paths:
      - "web/**"
      - ".github/workflows/<this-file>.yml"
```

## Artifacts

```yaml
      - name: Upload <name>
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: <artifact-name>
          path: <path>
          if-no-files-found: warn
          retention-days: 7      # coverage/build artifacts don't need the 90-day default
```

- Set `retention-days: 7` for transient outputs (coverage, build logs).
- Use `if: always()` so artifacts are available for debugging even on failure.

## Coverage reporting (Python)

```yaml
      - name: Run tests with coverage
        run: |
          uv run pytest \
            --cov \
            --cov-report=term-missing \
            --cov-report=html \
            --cov-report=json \
            --cov-report=xml

      - name: Upload HTML coverage report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: coverage-html
          path: coverage/html/
          if-no-files-found: warn
          retention-days: 7

      - name: Upload JSON coverage report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: coverage-json
          path: coverage/json/coverage.json
          if-no-files-found: warn
          retention-days: 7

      - name: Post coverage summary to PR
        if: always()
        uses: orgoro/coverage@v3.2
        with:
          coverageFile: coverage/xml/coverage.xml
          token: ${{ secrets.GITHUB_TOKEN }}
        continue-on-error: true
```

Requires `permissions: pull-requests: write`.

## Checklist before opening the PR

- [ ] `name:` is descriptive and matches the filename (e.g. `Python Tests & Coverage` / `python-tests.yml`)
- [ ] `concurrency` block present
- [ ] `permissions` block explicit and minimal
- [ ] `timeout-minutes` set on every job
- [ ] `paths` identical between `pull_request` and `push`
- [ ] Workflow file itself is in `paths`
- [ ] `uv sync --frozen` (not bare `uv sync`) for Python jobs
- [ ] `bun install --frozen-lockfile` (not bare `bun install`) for JS jobs
- [ ] All artifact uploads have `retention-days: 7`
- [ ] `pyproject.toml` and `uv.lock` included in paths for Python workflows

## Reference: existing workflows

| File | What it tests | Toolchain |
|---|---|---|
| [`python-tests.yml`](../../../.github/workflows/python-tests.yml) | `src/`, `tools/` — pytest + coverage | uv |
| [`web-ci.yml`](../../../.github/workflows/web-ci.yml) | `web/` — lint, typecheck, test, build | bun |
| [`web-deploy-public.yml`](../../../.github/workflows/web-deploy-public.yml) | Deploys `web/dist` to public mirror via GitHub App | bun |
