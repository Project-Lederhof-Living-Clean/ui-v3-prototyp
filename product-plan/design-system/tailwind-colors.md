# Tailwind Color Configuration

Living Clean uses **Tailwind v4** built-in color palettes. No `tailwind.config.js` is required — reference the colors directly in utility classes.

## Color Choices

- **Primary:** `blue` — Used for buttons, hero CTA, active nav state, "running" status, key accents.
- **Secondary:** `lime` — Used for admin badge, "concluded" status, secondary highlights.
- **Neutral:** `stone` — Used for backgrounds, text, borders, dividers.

## Usage Examples

```html
<!-- Primary button -->
<button class="bg-blue-600 hover:bg-blue-700 text-white">Take Action</button>

<!-- Active nav item -->
<button class="bg-blue-600 text-white dark:bg-blue-500">Dashboard</button>

<!-- Admin badge -->
<span class="bg-lime-200 text-lime-900 dark:bg-lime-900/40 dark:text-lime-300">ADMIN</span>

<!-- Concluded status -->
<span class="bg-lime-100 text-lime-800 dark:bg-lime-900/30 dark:text-lime-300">Concluded</span>

<!-- Neutral surface -->
<div class="bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100">…</div>

<!-- Borders -->
<div class="border-stone-200 dark:border-stone-800">…</div>
```

## Dark Mode

All screens are designed light/dark first-class. Use `dark:` variants for every color-bearing utility (background, text, border).

The shell sets the dark class on `html` based on user preference. See `tokens.css` for token definitions.
