import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { HistoryCard } from '@/components/features/SimulationHistory/Card'
import { PageHero } from '@/components/shared/PageHero'
import {
  type SimulationRecord,
  useSimulationStorage,
} from '@/hooks/useSimulationStorage'

export function SimulationHistoryPage() {
  const navigate = useNavigate()
  const { getAllSimulations, deleteSimulation } = useSimulationStorage()
  const [simulations, setSimulations] = useState<SimulationRecord[]>(() =>
    getAllSimulations(),
  )

  const handleView = (id: string) => {
    void navigate(`/resultado/${id}`)
  }

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      'Tem certeza que deseja excluir esta simulação? Essa ação não pode ser desfeita.',
    )

    if (!confirmed) return

    deleteSimulation(id)
    setSimulations((prev) => prev.filter((sim) => sim.id !== id))
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <PageHero
        title="Histórico de simulações"
        subtitle="Reveja suas simulações anteriores ou exclua as que não precisa mais."
      />

      {simulations.length === 0 ? (
        <div className="bg-card rounded-2xl p-10 text-center shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
          <p className="text-muted-foreground text-sm">
            Você ainda não fez nenhuma simulação.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {simulations.map((simulation) => (
            <HistoryCard
              key={simulation.id}
              simulation={simulation}
              onView={handleView}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </main>
  )
}