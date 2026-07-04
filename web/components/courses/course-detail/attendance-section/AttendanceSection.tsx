import { cn } from '@/lib/utils'
import { Panel } from '../panel/Panel'
import { AttendanceStatus, attendanceStatusLabels } from '../utils'
import { useAttendences } from '@/hooks/attendences/useAttendences'
import { Card } from '@/components/ui/card'
import { ClipboardCheck, CalendarDays } from 'lucide-react'
import { formatDate } from '@/lib/date/formatToDD/MM/YYYY'

const attendanceStyles: Record<AttendanceStatus, string> = {
  presente: 'bg-success/10 text-success',
  falta: 'bg-destructive/10 text-destructive',
  justificada: 'bg-warning/10 text-warning',
}

interface AttendanceRecord {
  id: string
  date: string
  topic: string
  status: AttendanceStatus
}

interface AttendeceSectionProps {
  courseId?: string
}

export function AttendanceSection({ courseId }: AttendeceSectionProps) {
  const { attendences, loading, error } = useAttendences(courseId)

  const total = (attendences?.length || 0).toString()
  const presentes = 5
  const taxa = 0

  return (
    <Panel title="Frequência">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Stat label="Total de atas" value={total} />
        <Stat label="Aulas registradas" value={String(total)} />
      </div>

      <div className="flex flex-col gap-3">
        {attendences?.map((attendence) => {
          const date = formatDate(attendence.date)
          return (
            <Card
              key={attendence.id}
              className="border-border bg-card flex-row items-center gap-4 rounded-2xl border p-4"
            >
              <span className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl">
                <ClipboardCheck className="size-5" />
              </span>
              <div className="flex flex-col">
                <span className="text-muted-foreground text-xs">Ata do dia</span>
                <span className="flex items-center gap-1.5 text-sm font-medium">
                  <CalendarDays className="text-muted-foreground size-3.5" />
                  {date}
                </span>
              </div>
            </Card>
          )
        })}
      </div>
    </Panel>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-border bg-card flex flex-col gap-1 rounded-2xl border p-4">
      <span className="font-heading text-2xl font-semibold">{value}</span>
      <span className="text-muted-foreground text-xs">{label}</span>
    </div>
  )
}
