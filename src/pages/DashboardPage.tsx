import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardOverview } from '../sections/dashboard-overview'
import type { DashboardOverviewProps, Intervention } from '../sections/dashboard-overview/types'
import sampleData from '../sections/dashboard-overview/sample-data.json'
import { Toast } from '../shell'

const data = sampleData as unknown as Omit<DashboardOverviewProps, 'onHeroCtaClick' | 'onInterventionSelect'>

export function DashboardPage() {
  const navigate = useNavigate()
  const [toast, setToast] = useState<string | null>(null)

  const handleInterventionSelect = (id: string) => {
    const found = data.activeInterventions.find((i: Intervention) => i.id === id)
    setToast(found ? `Opening "${found.title}" — detail view coming soon.` : `Intervention ${id} — detail view coming soon.`)
  }

  return (
    <>
      <DashboardOverview
        headlineStat={data.headlineStat}
        trend={data.trend}
        activeInterventions={data.activeInterventions}
        heroCta={data.heroCta}
        onHeroCtaClick={(href) => navigate(href)}
        onInterventionSelect={handleInterventionSelect}
      />
      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
    </>
  )
}
