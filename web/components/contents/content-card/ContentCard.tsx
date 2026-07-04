import { Card } from '@/components/ui/card'
import { ImageIcon } from 'lucide-react'
import { ContentSkeleton } from '../content-viewer/ContentSkeleton'
import { LessonContent } from '../lesson-content/LessonContent'
import { Content } from '@/types/content'

interface ContentCardProps {
  content?: Content
  loading: boolean
}

export const ContentCard = ({ content, loading }: ContentCardProps) => {
  const Icon = ImageIcon

  if (loading) {
    return <ContentSkeleton />
  }

  return (
    <Card className="flex w-full flex-col p-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="bg-primary/10 text-primary flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium">
          <Icon className="size-3.5" />
          {content?.name}
        </span>
        <span className="text-muted-foreground text-xs">{content?.description}</span>
      </div>

      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight text-balance">
          {content?.name}
        </h2>
        <p className="text-muted-foreground mt-1 text-sm leading-relaxed text-pretty">
          {content?.description}
        </p>
      </div>

      <div className="flex h-150 w-full justify-center bg-black">
        <LessonContent content={content} />
      </div>
    </Card>
  )
}
