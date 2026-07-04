import { Course } from '@/types/course'
import { Panel } from '../panel/Panel'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { contentIcon } from './utils'
import { ContentSectionSkeleton } from './ContentSectionSkeleton'

interface OverviewSectionProps {
  course?: Course
  loading: boolean
}

export function ContentSection({ course, loading }: OverviewSectionProps) {
  const contents = course?.contents

  if (loading) {
    return (
      <Panel title="Conteúdo">
        <ContentSectionSkeleton />
      </Panel>
    )
  }

  return (
    <Panel title="Conteúdo">
      {contents?.map((content, index) => {
        const Icon = contentIcon(content.type)
        return (
          <Link key={index} href={`/content/${content.id}`} className="block cursor-pointer">
            <Card className="hover:bg-accent/50 flex cursor-pointer flex-row items-center justify-between gap-4 p-6">
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="text-lg font-bold">{content.name}</p>
                <p className="text-md text-muted-foreground">{content.description}</p>
              </div>

              <div className="bg-muted text-muted-foreground flex items-center justify-center rounded-full">
                <Icon className="text-primary" />
              </div>
            </Card>
          </Link>
        )
      })}
    </Panel>
  )
}
