import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CalendarDays, ClipboardCheck, Edit } from 'lucide-react'
import Link from 'next/link'
import { AttendenceModel } from '@/types/attendence'
import { formatDate } from '@/lib/date/formatToDD/MM/YYYY'

interface AttendenceCardListProps {
  attendences?: AttendenceModel[]
  handleOpenEditDialog: (event: React.MouseEvent<HTMLButtonElement>, attendence: AttendenceModel) => void
}

export const AttendenceCardList = ({
  attendences,
  handleOpenEditDialog,
}: AttendenceCardListProps) => {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto">
      {attendences?.map((attendence) => {
        const date = formatDate(attendence.date)
        return (
          <Link key={attendence.id} href={`/attendence/${attendence.id}`}>
            <Card className="hover:bg-muted/50 relative cursor-pointer flex-row items-center gap-4 border p-4">
              <span className="text-primary flex size-10 shrink-0 items-center justify-center rounded-xl">
                <ClipboardCheck className="size-5" />
              </span>
              <div className="flex flex-col gap-2">
                <span className="text-muted-foreground text-lg">Ata do dia</span>
                <span className="flex items-center gap-1.5 text-lg font-medium">
                  <CalendarDays className="text-muted-foreground size-4" />
                  {date}
                </span>
              </div>

              <Button
                onClick={(event) => handleOpenEditDialog(event, attendence)}
                variant="ghost"
                className="absolute top-4 right-4 cursor-pointer"
              >
                <Edit className="text-primary" />
              </Button>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
