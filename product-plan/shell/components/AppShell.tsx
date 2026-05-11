import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { MainNav, type NavGroup } from './MainNav'

export interface AppShellProps {
  children: React.ReactNode
  navigationGroups: NavGroup[]
  onNavigate?: (href: string) => void
}

export function AppShell({ children, navigationGroups, onNavigate }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-[DM_Sans,sans-serif]">
      {/* Mobile top bar */}
      <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between h-14 px-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50/90 dark:bg-stone-950/90 backdrop-blur">
        <span className="font-semibold tracking-tight">Living Clean</span>
        <button
          aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
          onClick={() => setMobileOpen(o => !o)}
          className="p-2 rounded-md hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <div className="flex">
        {/* Sidebar (desktop + tablet) */}
        <aside className="hidden lg:flex flex-col w-60 shrink-0 h-screen sticky top-0 border-r border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
          <div className="h-16 flex items-center px-6 border-b border-stone-200 dark:border-stone-800">
            <span className="text-lg font-semibold tracking-tight">Living Clean</span>
          </div>
          <MainNav groups={navigationGroups} onNavigate={onNavigate} />
        </aside>

        {/* Mobile drawer */}
        {mobileOpen && (
          <>
            <div
              className="lg:hidden fixed inset-0 z-30 bg-stone-950/40"
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />
            <aside className="lg:hidden fixed inset-y-0 left-0 z-40 w-64 flex flex-col bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800">
              <div className="h-14 flex items-center px-6 border-b border-stone-200 dark:border-stone-800">
                <span className="text-lg font-semibold tracking-tight">Living Clean</span>
              </div>
              <MainNav
                groups={navigationGroups}
                onNavigate={(href) => {
                  setMobileOpen(false)
                  onNavigate?.(href)
                }}
              />
            </aside>
          </>
        )}

        {/* Content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  )
}
