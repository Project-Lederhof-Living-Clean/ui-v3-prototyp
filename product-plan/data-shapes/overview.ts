// =============================================================================
// UI Data Shapes — Combined Reference
//
// These types define the data that UI components expect to receive as props.
// They are a frontend contract, not a database schema. How you model, store,
// and fetch this data is an implementation decision.
// =============================================================================

// -----------------------------------------------------------------------------
// From: sections/dashboard-overview
// -----------------------------------------------------------------------------

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

// -----------------------------------------------------------------------------
// From: sections/awareness-story
// -----------------------------------------------------------------------------

export type SlideType = 'title' | 'stat' | 'breakdown' | 'cta'

export interface Figure {
  value: number
  unit?: string
  caption?: string
}

export interface BreakdownItem {
  label: string
  count: number
  description?: string
}

export interface StoryCta {
  label: string
  href: string
}

interface SlideBase {
  id: string
  headline: string
  supportingText?: string
  durationMs?: number
}

export interface TitleSlide extends SlideBase {
  type: 'title'
}

export interface StatSlide extends SlideBase {
  type: 'stat'
  figure: Figure
}

export interface BreakdownSlide extends SlideBase {
  type: 'breakdown'
  items: BreakdownItem[]
}

export interface CtaSlide extends SlideBase {
  type: 'cta'
  cta: StoryCta
}

export type Slide = TitleSlide | StatSlide | BreakdownSlide | CtaSlide

export interface Story {
  autoplay: boolean
  defaultDurationMs: number
  slides: Slide[]
}

// -----------------------------------------------------------------------------
// From: sections/take-action
// -----------------------------------------------------------------------------

export interface Intro {
  headline: string
  subhead: string
}

export interface Suggestion {
  id: string
  title: string
  description: string
  icon: string
}

// -----------------------------------------------------------------------------
// From: sections/operations-admin
// -----------------------------------------------------------------------------

export type OperationType = 'single-session' | 'long-term'
export type OperationStatus = 'scheduled' | 'in-progress' | 'completed'

export interface ItemsBreakdown {
  cigarettes: number
  foodPackaging: number
  generalWaste: number
  paraphernalia: number
}

export interface ItemsCollected {
  total: number
  breakdown: ItemsBreakdown
}

export interface Operation {
  id: string
  title: string
  type: OperationType
  startDate: string
  endDate: string
  durationHours: number
  itemsCollected: ItemsCollected
  status: OperationStatus
  notes: string
}

export interface OperationsSummary {
  value: number
  label: string
  periodLabel: string
}

// -----------------------------------------------------------------------------
// From: sections/experiments-admin
// -----------------------------------------------------------------------------

export type ExperimentStatus = 'planned' | 'running' | 'concluded'
export type DecisionVerdict = 'keep' | 'kill' | 'scale' | 'undecided'

export interface Metric {
  label: string
  unit: string
}

export interface ExperimentIntervention {
  id: string
  name: string
  description: string
  isBaseline: boolean
}

export interface SeriesPoint {
  date: string
  value: number
}

export type OutcomeSeries = Record<string, SeriesPoint[]>

export interface Decision {
  verdict: DecisionVerdict
  rationale: string
  action: string
}

export interface Experiment {
  id: string
  title: string
  status: ExperimentStatus
  startDate: string
  endDate: string
  hypothesis: string
  summary: string
  metric: Metric
  interventions: ExperimentIntervention[]
  outcomeSeries: OutcomeSeries
  decision: Decision | null
}
