export type DeltaDirection = 'up' | 'down' | 'flat'

export type InterventionStatus = 'running' | 'paused' | 'ended'

export interface HeadlineStat {
  date: string
  count: number
  label: string
  deltaVsYesterday: number
  deltaDirection: DeltaDirection
  sparkline: number[]
}

export interface TrendPoint {
  date: string
  count: number
}

export interface Intervention {
  id: string
  title: string
  description: string
  startDate: string
  status: InterventionStatus
}

export interface HeroCta {
  label: string
  href: string
}

export interface DashboardOverviewProps {
  headlineStat: HeadlineStat
  trend: TrendPoint[]
  activeInterventions: Intervention[]
  heroCta: HeroCta
  /** Fired when the visitor clicks the hero CTA. */
  onHeroCtaClick?: (href: string) => void
  /** Fired when the visitor clicks an active intervention card to learn more. */
  onInterventionSelect?: (interventionId: string) => void
}
