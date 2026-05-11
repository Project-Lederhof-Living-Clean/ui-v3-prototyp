import { useState } from 'react'
import { Experiments } from '../sections/experiments-admin'
import type { Experiment } from '../sections/experiments-admin/types'
import sampleData from '../sections/experiments-admin/sample-data.json'
import { Toast } from '../shell'

const experiments = (sampleData as unknown as { experiments: Experiment[] }).experiments

const findTitle = (id: string) => experiments.find(e => e.id === id)?.title ?? id

export function ExperimentsPage() {
  const [toast, setToast] = useState<string | null>(null)

  return (
    <>
      <Experiments
        experiments={experiments}
        onCreateExperiment={() => setToast('New experiment form — not implemented in this prototype.')}
        onEditExperiment={(id) => setToast(`Editing "${findTitle(id)}" — form not implemented yet.`)}
        onDeleteExperiment={(id) => setToast(`Deleted "${findTitle(id)}" (demo — not persisted).`)}
      />
      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
    </>
  )
}
