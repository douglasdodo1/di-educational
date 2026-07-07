import { useFrequencies } from '@/hooks/frequencies/useFrequencies'
import { useParams, useRouter } from 'next/navigation'

export const useViewModel = () => {
  const router = useRouter()
  const params = useParams()

  const id = parseInt(params.id as string)

  const { frequencies, loading, error } = useFrequencies({ attendenceId: id })

  const onBack = () => {
    router.back()
  }

  const onAllPresent = () => {
    // Lógica para marcar todos como presentes
  }

  const onAllAbsent = () => {
    // Lógica para marcar todos como ausentes
  }

  const onToggle = (studentId: string) => {
    // Lógica para alternar presença de um aluno
  }

  const formatAttendenceDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR')
  }

  const dateString = frequencies?.[0]?.attendence?.date
  const displayDate = dateString ? formatAttendenceDate(new Date(dateString)) : 'Carregando...'
  const presentes = frequencies?.filter((f) => f.is_present).length || 0

  return {
    onBack,
    onAllPresent,
    onAllAbsent,
    onToggle,
    displayDate,
    presentes,
    frequencies,
    loading,
    error,
  }
}
