import { HashRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Sparkles, HandHeart, ClipboardList, FlaskConical } from 'lucide-react'
import { AppShell, type NavGroup } from './shell'
import { DashboardPage } from './pages/DashboardPage'
import { TakeActionPage } from './pages/TakeActionPage'
import { OperationsPage } from './pages/OperationsPage'
import { ExperimentsPage } from './pages/ExperimentsPage'
import { AwarenessStoryPage } from './pages/AwarenessStoryPage'
import { PlaceholderPage } from './pages/PlaceholderPage'

function ShellRoutes() {
  const location = useLocation()
  const navigate = useNavigate()
  const pathname = location.pathname

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

  return (
    <AppShell navigationGroups={navigationGroups} onNavigate={(href) => navigate(href)}>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/take-action" element={<TakeActionPage />} />
        <Route path="/admin/operations" element={<OperationsPage />} />
        <Route path="/admin/experiments" element={<ExperimentsPage />} />
        <Route path="*" element={<PlaceholderPage title="Not found" />} />
      </Routes>
    </AppShell>
  )
}

export function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Awareness Story is standalone — full-viewport, no shell */}
        <Route path="/awareness" element={<AwarenessStoryPage />} />
        <Route path="*" element={<ShellRoutes />} />
      </Routes>
    </HashRouter>
  )
}
