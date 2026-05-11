# Application Shell

## Overview

The Living Clean shell is a sidebar-driven layout that frames both the citizen-facing awareness experience and the city's admin tools in a single coherent app. The sidebar groups navigation into a **Public** area (Dashboard, Awareness Story, Take Action) and an **Admin** area (Operations, Experiments).

There is no user menu — the app is designed to be used without authentication chrome, keeping the citizen surface as open as a public website. Admin distinction is communicated through nav grouping and a small `ADMIN` badge, not through identity UI.

## Navigation Structure

### Public
- **Dashboard** → Dashboard Overview
- **Awareness** → Awareness Story
- **Take Action** → Take Action

### Admin (badged)
- **Operations** → Operations
- **Experiments** → Experiments

## Layout

- **Sidebar** on the left, 240px wide on desktop, persistent and always visible.
- **Brand mark** "Living Clean" pinned to the top of the sidebar.
- **Two grouped nav lists** — Public, then Admin — separated by a thin divider and a small group label.
- **Content area** fills the remaining width; section screens render here without their own navigation chrome.

## Responsive Behavior

- **Desktop (≥1024px):** Sidebar persistent at 240px, content fills the rest.
- **Tablet (768–1023px):** Sidebar collapses to a 64px icon-only rail; group labels become tooltips. *(See "Notes" — the provided components currently render full-width sidebar on lg+ and a drawer below; you may extend with a tablet rail.)*
- **Mobile (<768px):** Sidebar hidden behind a hamburger top bar; opens as a left drawer with backdrop.

## Components Provided

- `AppShell` — Outer layout wrapper. Renders the sidebar, mobile top bar, drawer, and content slot.
- `MainNav` — Renders nav groups (Public / Admin) with icons, active state, and optional badges.

The Awareness Story section renders **outside** the shell — it's a full-viewport experience. All other sections render inside `<AppShell>{children}</AppShell>`.

## Props Reference

```typescript
import type { LucideIcon } from 'lucide-react'

interface NavItem {
  label: string
  href: string
  icon: LucideIcon
  isActive?: boolean
  badge?: string  // e.g., "ADMIN"
}

interface NavGroup {
  label: string  // e.g., "Public" or "Admin"
  items: NavItem[]
}

interface AppShellProps {
  children: React.ReactNode
  navigationGroups: NavGroup[]
  onNavigate?: (href: string) => void
}
```

Wire `onNavigate` to your router (e.g., `useNavigate()` from React Router) and compute `isActive` based on the current route.

## Visual Reference

See the section screenshots — every shell-rendered section shows the sidebar in context.

## Notes

- The components depend on `lucide-react` for icons. Install: `npm i lucide-react`.
- Active nav uses `bg-blue-600 text-white`; admin badge uses `bg-lime-200 text-lime-900` (and dark variants).
- No user menu, no auth chrome — intentional.
