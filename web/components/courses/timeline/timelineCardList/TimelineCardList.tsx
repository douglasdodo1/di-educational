import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { formatDate } from '@/lib/date/formatToDD/MM/YYYY'
import { cn } from '@/lib/utils'
import { ContentType } from '@/types/contentType'
import { CheckCircle, Clock, Edit, FileText, Trash2, Video } from 'lucide-react'
import { TimelineModel } from '@/types/timelineModel'

interface TimelineCardListProps {
  timelines?: TimelineModel[]
  handleOpenEditModal: (item: TimelineModel) => void
  handleChecked: (id: number, is_done: boolean) => Promise<void>
  onDelete: (event: React.MouseEvent<HTMLButtonElement>, id: number) => void
  isLoading: boolean
}

export const TimelineCardList = ({
  timelines,
  handleOpenEditModal,
  handleChecked,
  onDelete,
  isLoading,
}: TimelineCardListProps) => {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-2">
      <ol className="border-border relative flex flex-col gap-6 border-l pl-6">
        {timelines?.map((item) => {
          const IconExternal = item?.is_done ? CheckCircle : Clock
          const IconCard = item?.content?.type === ContentType.VIDEO ? Video : FileText
          const date = formatDate(item?.date)
          const name = item?.content?.name || 'Conteúdo indisponível'
          const description = item?.content?.description || 'Descrição indisponível'

          return (
            <li key={item.id} className="relative">
              <span className="bg-background absolute -left-[31px] flex size-6 items-center justify-center rounded-full">
                <IconExternal
                  className={cn('size-5', item?.is_done ? 'text-primary' : 'text-muted-foreground')}
                />
              </span>
              <Card
                className={cn(
                  'flex-row items-start gap-4 p-6',
                  item?.is_done ? 'bg-success/10' : 'bg-accent/10',
                )}
              >
                <IconCard className="text-muted-foreground mt-1 size-5 shrink-0" />
                <div className="flex flex-1 items-start justify-between gap-4">
                  <div className="flex flex-col gap-1 text-left">
                    <p className="font-heading font-semibold">{name}</p>
                    <p className="text-muted-foreground text-sm">{description}</p>
                  </div>
                  <div className="flex flex-row items-center gap-4">
                    <span className="text-muted-foreground shrink-0 text-xl font-medium whitespace-nowrap">
                      {date}
                    </span>
                    <div className="flex flex-row items-center gap-2">
                      <Button
                        variant="ghost"
                        onClick={() => handleOpenEditModal(item)}
                        className="cursor-pointer"
                        disabled={isLoading}
                      >
                        <Edit className="text-primary" />
                      </Button>
                      <Button
                        variant="ghost"
                        className="text-destructive cursor-pointer"
                        disabled={isLoading}
                        onClick={(event) => onDelete(event, item.id)}
                      >
                        <Trash2 />
                      </Button>
                      <Checkbox
                        className="cursor-pointer"
                        checked={item?.is_done}
                        onCheckedChange={(checked) => handleChecked(item?.id, !!checked)}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </li>
          )
        })}
        {timelines?.length === 0 && (
          <li className="text-muted-foreground text-sm">Cronograma ainda não publicado.</li>
        )}
      </ol>
    </div>
  )
}
