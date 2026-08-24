import type { SimulationFormData } from '@/data/simulation'
import type { InsightData } from '@/services/aiService'

const LOCAL_STORAGE_KEY = 'simulation-data'

export type SimulationRecord = SimulationFormData & {
  id: string
  createdAt: string
  insight?: InsightData
}

export const useSimulationStorage = () => {
  const getAll = (): SimulationRecord[] => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    return storage ? (JSON.parse(storage) as SimulationRecord[]) : []
  }

  const saveFormData = (formData: SimulationFormData) => {
    const record: SimulationRecord = {
      ...formData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify([...getAll(), record]),
    )

    return record.id
  }

  const getFormData = (id: string): SimulationRecord | null => {
    return getAll().find((record) => record.id === id) ?? null
  }

  const getAllSimulations = (): SimulationRecord[] => {
    return getAll().sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
  }

  const deleteSimulation = (id: string) => {
    const filtered = getAll().filter((record) => record.id !== id)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered))
  }

  const updateSimulation = (id: string, data: SimulationRecord) => {
    const updated = getAll().map((record) =>
      record.id === id ? { ...data } : record,
    )
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
  }

  return {
    saveFormData,
    getFormData,
    getAllSimulations,
    deleteSimulation,
    updateSimulation,
  }
}