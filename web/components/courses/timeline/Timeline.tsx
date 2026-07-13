import { CheckCircle, Clock, FileText, Icon, Video } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Panel } from '../course-detail/panel/Panel'
import { useTimelinesByCourseId } from '@/hooks/timelines/useTimelinesByCourseId'
import { formatDate } from '@/lib/date/formatToDD/MM/YYYY'
import { Card } from '../../ui/card'
import { ContentType } from '@/types/contentType'
import { useState } from 'react'
import { TimelineDialog } from './timelineDialog/TimelineDialog'
import { Content } from '@/types/content'

interface TimelineProps {
  courseId?: string
  contents?: Content[]
}

export const Timeline = ({ courseId, contents }: TimelineProps) => {
  const { timelines, loading, error } = useTimelinesByCourseId(courseId)
  const [openModal, setOpenModal] = useState(false)

  const handleOpenCreateModal = () => {
    setOpenModal(true)
  }

  const handleCloseCreateModal = () => {
    setOpenModal(false)
  }

  return (
    <Panel
      title="Cronograma"
      className="flex min-h-0 flex-1 flex-col"
      openModal={handleOpenCreateModal}
    >
      <TimelineDialog isOpen={openModal} onClose={handleCloseCreateModal} contents={contents} />
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
                    className={cn(
                      'size-5',
                      item?.is_done ? 'text-primary' : 'text-muted-foreground',
                    )}
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
                    <span className="text-muted-foreground shrink-0 text-xl font-medium whitespace-nowrap">
                      {date}
                    </span>
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
    </Panel>
  )
}
