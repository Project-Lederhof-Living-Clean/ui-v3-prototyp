# Milestone 1: Shell

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** None

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

Set up the design tokens and application shell — the persistent chrome that wraps all sections except the standalone Awareness Story.

## What to Implement

### 1. Design Tokens

Configure your styling system with the Living Clean tokens:

- See `product-plan/design-system/tokens.css` for CSS custom properties.
- See `product-plan/design-system/tailwind-colors.md` for Tailwind palette choices (Tailwind v4 — no `tailwind.config.js`).
- See `product-plan/design-system/fonts.md` for the Google Fonts setup (DM Sans + IBM Plex Mono).

Apply these globally so every section inherits them.

### 2. Application Shell

Copy the shell components from `product-plan/shell/components/` to your project:

- `AppShell.tsx` — Main layout wrapper with sidebar, mobile top bar, and content slot.
- `MainNav.tsx` — Two-group navigation (Public / Admin) with icons, active state, and admin badges.
- `index.ts` — Barrel export.

Install the dependency:

```bash
npm install lucide-react
```

**Wire Up Navigation:**

Provide `navigationGroups` like the following, with icons of your choice from `lucide-react`:

```typescript
import { LayoutDashboard, Sparkles, HandHeart, ClipboardList, FlaskConical } from 'lucide-react'

const navigationGroups: NavGroup[] = [
  {
    label: 'Public',
    items: [
      { label: 'Dashboard', href: '/', icon: LayoutDashboard, isActive: pathname === '/' },
      { label: 'Awareness', href: '/awareness', icon: Sparkles, isActive: pathname === '/awareness' },
      { label: 'Take Action', href: '/take-action', icon: HandHeart, isActive: pathname === '/take-action' },
    ],
  },
  {
    label: 'Admin',
    items: [
      { label: 'Operations', href: '/admin/operations', icon: ClipboardList, badge: 'ADMIN', isActive: pathname.startsWith('/admin/operations') },
      { label: 'Experiments', href: '/admin/experiments', icon: FlaskConical, badge: 'ADMIN', isActive: pathname.startsWith('/admin/experiments') },
    ],
  },
]
```

Pass `onNavigate={(href) => router.push(href)}` (or your router equivalent).

**No User Menu:**

Living Clean intentionally has no user menu, avatar, or logout. Admin distinction is communicated via the `ADMIN` badge.

**Awareness Story exception:**

The Awareness Story section is **standalone, full-viewport** — render its route OUTSIDE the `<AppShell>`. Every other route renders inside the shell.

## Files to Reference

- `product-plan/design-system/` — Design tokens (CSS, Tailwind colors, fonts).
- `product-plan/shell/README.md` — Shell design intent and props reference.
- `product-plan/shell/components/` — Shell React components.

## Done When

- [ ] Tailwind v4 is configured with DM Sans + IBM Plex Mono and palette utilities work.
- [ ] `<AppShell>` renders with the Public / Admin nav groups.
- [ ] Active nav item is visually distinct on the current route.
- [ ] Mobile (<768px) shows hamburger top bar with drawer sidebar.
- [ ] Admin badge renders on Operations and Experiments items.
- [ ] Awareness Story route renders without the shell.
- [ ] Light and dark mode both render cleanly.
