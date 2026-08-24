import { Calendar, Goal, Trash2 } from 'lucide-react'

import { Button } from '@/components/shared/Button'
import type { SimulationRecord } from '@/hooks/useSimulationStorage'

interface HistoryCardProps {
  simulation: SimulationRecord
  onView: (id: string) => void
  onDelete: (id: string) => void
}

export function HistoryCard({ simulation, onView, onDelete }: HistoryCardProps) {
  const date = new Date(simulation.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  return (
    <div className="bg-card flex flex-col justify-between rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
      <div>
        <div className="mb-3 flex items-center gap-2">
          <Goal size={16} className="text-primary" />
          <span className="text-primary text-xs font-semibold tracking-widest uppercase">
            Meta
          </span>
        </div>
        <h3 className="text-foreground mb-1 text-lg font-semibold">
          {simulation.goalName}
        </h3>
        <p className="text-muted-foreground mb-4 text-sm">
          {simulation.goalAmount} em {simulation.goalDeadline} meses
        </p>
        <div className="text-muted-foreground mb-6 flex items-center gap-1.5 text-xs">
          <Calendar size={14} />
          {date}
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          variant="primary"
          className="flex-1 justify-center"
          onClick={() => onView(simulation.id)}
        >
          Ver detalhes
        </Button>
        <Button
          variant="ghost"
          aria-label="Excluir simulação"
          icon={Trash2}
          onClick={() => onDelete(simulation.id)}
          className="text-red-500 hover:opacity-100"
        />
      </div>
    </div>
  )
}
