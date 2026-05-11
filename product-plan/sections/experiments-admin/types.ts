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

export interface ExperimentsProps {
  experiments: Experiment[]
  /** Currently selected experiment id; if undefined the first experiment is shown. */
  selectedExperimentId?: string
  /** Fired when the admin selects an experiment from the list. */
  onSelectExperiment?: (experimentId: string) => void
  /** Fired when the admin clicks "New experiment". */
  onCreateExperiment?: () => void
  /** Fired when the admin clicks edit on the active experiment. */
  onEditExperiment?: (experimentId: string) => void
  /** Fired when the admin saves edits to an experiment. */
  onSaveExperiment?: (experiment: Experiment) => void
  /** Fired when the admin confirms deletion of an experiment. */
  onDeleteExperiment?: (experimentId: string) => void
}
