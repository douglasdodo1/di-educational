import { useFrequencies } from '@/hooks/frequencies/useFrequencies'
import { useSetFrequencyMutation } from '@/hooks/frequencies/useSetFrequencyMutation'
import { useSetAllFrequencies } from '@/hooks/frequencies/useSetAllFrequencies'
import { useParams, useRouter } from 'next/navigation'

export const useViewModel = () => {
  const router = useRouter()
  const params = useParams()

  const id = parseInt(params.id as string)

  const { frequencies, loading, error } = useFrequencies({ attendenceId: id })
  const [setFrequency] = useSetFrequencyMutation()
  const [setAllFrequencies] = useSetAllFrequencies()

  const onBack = () => {
    router.back()
  }

  const onAllPresent = async () => {
    try {
      await setAllFrequencies({
        variables: {
          attendenceId: id,
          isPresent: true,
        },
      })
    } catch (err) {
      console.error('Erro ao marcar todos como presentes', err)
    }
  }

  const onAllAbsent = async () => {
    try {
      await setAllFrequencies({
        variables: {
          attendenceId: id,
          isPresent: false,
        },
      })
    } catch (err) {
      console.error('Erro ao marcar todos como ausentes', err)
    }
  }

  const onToggle = async (frequencyId: string, currentStatus: boolean) => {
    try {
      await setFrequency({
        variables: {
          frequencyId: parseInt(frequencyId),
          isPresent: !currentStatus,
        },
      })
    } catch (err) {
      console.error('Erro ao alterar frequência', err)
    }
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
