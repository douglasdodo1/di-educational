import { LayoutGrid, CalendarCheck, ClipboardList, CalendarRange } from 'lucide-react'

export type SectionId = 'conteudo' | 'frequencia' | 'atividades' | 'cronograma'

export const sections: { id: SectionId; label: string; icon: typeof LayoutGrid }[] = [
  { id: 'conteudo', label: 'Conteúdo', icon: LayoutGrid },
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
