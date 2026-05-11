import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  label: string
  href: string
  icon: LucideIcon
  isActive?: boolean
  badge?: string
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

interface MainNavProps {
  groups: NavGroup[]
  onNavigate?: (href: string) => void
}

export function MainNav({ groups, onNavigate }: MainNavProps) {
  return (
    <nav className="flex-1 overflow-y-auto py-4">
      {groups.map((group, gi) => (
        <div key={group.label} className={gi > 0 ? 'mt-6 pt-6 border-t border-stone-200 dark:border-stone-800' : ''}>
          <div className="px-6 mb-2 text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
            {group.label}
          </div>
          <ul className="px-3 space-y-1">
            {group.items.map(item => {
              const Icon = item.icon
              return (
                <li key={item.href}>
                  <button
                    onClick={() => onNavigate?.(item.href)}
                    className={
                      'w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ' +
                      (item.isActive
                        ? 'bg-blue-600 text-white dark:bg-blue-500'
                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800')
                    }
                  >
                    <Icon size={18} className="shrink-0" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span
                        className={
                          'text-[10px] font-semibold px-1.5 py-0.5 rounded ' +
                          (item.isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-lime-200 text-lime-900 dark:bg-lime-900/40 dark:text-lime-300')
                        }
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}
