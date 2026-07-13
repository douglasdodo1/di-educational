import { LayoutGrid, CalendarCheck, ClipboardList, CalendarRange, Users } from 'lucide-react'

export type SectionId = 'conteudo' | 'membros' | 'frequencia' | 'atividades' | 'cronograma'
export type SectionLabel = 'Conteúdo' | 'Membros' | 'Frequência' | 'Atividades' | 'Cronograma'

export const sections: { id: SectionId; label: SectionLabel; icon: typeof LayoutGrid }[] = [
  { id: 'conteudo', label: 'Conteúdo', icon: LayoutGrid },
  // { id: 'membros', label: 'Membros', icon: Users },
  { id: 'frequencia', label: 'Frequência', icon: CalendarCheck },
  { id: 'atividades', label: 'Atividades', icon: ClipboardList },
  { id: 'cronograma', label: 'Cronograma', icon: CalendarRange },
]

export type AttendanceStatus = 'presente' | 'falta' | 'justificada'

export const attendanceStatusLabels: Record<AttendanceStatus, string> = {
  presente: 'Presente',
  falta: 'Falta',
  justificada: 'Justificada',
}

export const activityTypeLabels: Record<string, string> = {
  prova: 'Prova',
  trabalho: 'Trabalho',
  exercicio: 'Exercício',
}

export const ADD_LABELS: Record<string, string> = {
  Conteúdo: 'Adicionar conteúdo',
  Atividades: 'Adicionar atividade',
  Frequência: 'Adicionar frequência',
  Cronograma: 'Adicionar cronograma',
}
