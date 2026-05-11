import { useState } from 'react'
import { Operations } from '../sections/operations-admin'
import type { OperationsProps } from '../sections/operations-admin/types'
import sampleData from '../sections/operations-admin/sample-data.json'
import { Toast } from '../shell'

const data = sampleData as unknown as Pick<OperationsProps, 'summary' | 'operations'>

export function OperationsPage() {
  const [toast, setToast] = useState<string | null>(null)

  return (
    <>
      <Operations
        summary={data.summary}
        operations={data.operations}
        onScheduleOperation={() => setToast('New operation form — not implemented in this prototype.')}
        onEditOperation={(id) => {
          const op = data.operations.find(o => o.id === id)
          setToast(op ? `Editing "${op.title}" — form not implemented yet.` : `Editing ${id} — form not implemented yet.`)
        }}
      />
      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
    </>
  )
}
