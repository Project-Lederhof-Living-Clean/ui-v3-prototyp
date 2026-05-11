import { useState } from 'react'
import type { ExperimentsProps } from '../types'
import { ExperimentList } from './ExperimentList'
import { ExperimentDetail } from './ExperimentDetail'

export function Experiments({
  experiments,
  selectedExperimentId,
  onSelectExperiment,
  onCreateExperiment,
  onEditExperiment,
  onDeleteExperiment,
}: ExperimentsProps) {
  const [internalId, setInternalId] = useState<string | undefined>(
    selectedExperimentId ?? experiments[0]?.id,
  )
  const [mobileView, setMobileView] = useState<'list' | 'detail'>('list')

  const activeId = selectedExperimentId ?? internalId
  const active = experiments.find(e => e.id === activeId) ?? null

  const handleSelect = (id: string) => {
    setInternalId(id)
    setMobileView('detail')
    onSelectExperiment?.(id)
  }

  return (
    <div className="h-full min-h-screen bg-stone-50 dark:bg-stone-950">
      <div className="lg:grid lg:grid-cols-[340px_1fr] h-full min-h-screen">
        {/* List pane */}
        <aside
          className={
            'border-r border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 ' +
            'lg:block ' +
            (mobileView === 'list' ? 'block' : 'hidden')
          }
        >
          <ExperimentList
            experiments={experiments}
            selectedId={activeId}
            onSelect={handleSelect}
            onCreate={onCreateExperiment}
          />
        </aside>

        {/* Detail pane */}
        <section
          className={
            'lg:block ' + (mobileView === 'detail' ? 'block' : 'hidden')
          }
        >
          <ExperimentDetail
            experiment={active}
            onEdit={onEditExperiment}
            onDelete={onDeleteExperiment}
            onBack={() => setMobileView('list')}
          />
        </section>
      </div>
    </div>
  )
}
