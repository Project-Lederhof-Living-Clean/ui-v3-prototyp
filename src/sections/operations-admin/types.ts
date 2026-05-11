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

export interface OperationsProps {
  summary: OperationsSummary
  operations: Operation[]
  /** Fired when the admin clicks "Schedule operation" to create a new operation. */
  onScheduleOperation?: () => void
  /** Fired when the admin clicks an operation row to edit it. */
  onEditOperation?: (operationId: string) => void
  /** Fired when the admin saves edits to an operation. */
  onSaveOperation?: (operation: Operation) => void
  /** Fired when filters change. The page re-renders with the filtered list. */
  onFiltersChange?: (filters: {
    dateFrom?: string
    dateTo?: string
    statuses?: OperationStatus[]
    types?: OperationType[]
  }) => void
}
