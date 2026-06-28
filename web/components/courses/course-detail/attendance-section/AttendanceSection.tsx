import { cn } from '@/lib/utils'
import { Panel } from '../panel/Panel'
import { AttendanceStatus, attendanceStatusLabels } from '../utils'

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

interface AttendanceSectionProps {
  records: AttendanceRecord[]
}

export function AttendanceSection({ records }: AttendanceSectionProps) {
  const total = records.length
  const presentes = records.filter((r) => r.status === 'presente').length
  const taxa = total > 0 ? Math.round((presentes / total) * 100) : 0

  return (
    <Panel title="Frequência">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Stat label="Taxa de presença" value={`${taxa}%`} />
        <Stat label="Aulas registradas" value={String(total)} />
        <Stat label="Faltas" value={String(records.filter((r) => r.status === 'falta').length)} />
      </div>
      <ul className="divide-border border-border bg-card flex flex-col divide-y overflow-hidden rounded-2xl border">
        {records.map((r) => (
          <li key={r.id} className="flex items-center justify-between gap-4 px-5 py-4">
            <div className="flex items-center gap-4">
              <span className="bg-secondary text-foreground flex size-11 shrink-0 flex-col items-center justify-center rounded-lg text-xs leading-tight font-semibold">
                {r.date.split(' ').map((part, i) => (
                  <span key={i}>{part}</span>
                ))}
              </span>
              <p className="text-sm font-medium">{r.topic}</p>
            </div>
            <span
              className={cn(
                'shrink-0 rounded-full px-3 py-1 text-xs font-medium',
                attendanceStyles[r.status],
              )}
            >
              {attendanceStatusLabels[r.status]}
            </span>
          </li>
        ))}
        {records.length === 0 && (
          <li className="text-muted-foreground px-5 py-10 text-center text-sm">
            Nenhum registro de frequência disponível.
          </li>
        )}
      </ul>
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
