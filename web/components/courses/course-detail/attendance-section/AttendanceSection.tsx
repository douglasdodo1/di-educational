import { cn } from '@/lib/utils'
import { Panel } from '../panel/Panel'
import { AttendanceStatus, attendanceStatusLabels, sections } from '../../utils'
import { useAttendences } from '@/hooks/attendences/useAttendences'
import { Card } from '@/components/ui/card'
import { ClipboardCheck, CalendarDays } from 'lucide-react'
import { formatDate } from '@/lib/date/formatToDD/MM/YYYY'
import Link from 'next/link'

interface AttendeceSectionProps {
  courseId?: string
}

export function AttendanceSection({ courseId }: AttendeceSectionProps) {
  const { attendences, loading, error } = useAttendences(courseId)
  const sectionTitle = sections[2].label

  const total = (attendences?.length || 0).toString()
  const presentes = 5
  const taxa = 0

  return (
    <Panel title={sectionTitle} className="flex min-h-0 flex-1 flex-col">
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto">
        {attendences?.map((attendence) => {
          const date = formatDate(attendence.date)
          return (
            <Link key={attendence.id} href={`/attendence/${attendence.id}`}>
              <Card className="hover:bg-muted/50 cursor-pointer flex-row items-center gap-4 border p-8">
                <span className="text-primary flex size-10 shrink-0 items-center justify-center rounded-xl">
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
            </Link>
          )
        })}
      </div>
    </Panel>
  )
}
