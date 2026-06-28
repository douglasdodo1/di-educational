import { cn } from '@/lib/utils'
import { Course } from '@/types/course'
import { Panel } from '../panel/Panel'

interface OverviewSectionProps {
  course: Course
}

export function OverviewSection({ course }: OverviewSectionProps) {
  const completed = course.progress === 100
  return (
    <Panel title="Visão geral">
      <div className="border-border bg-card rounded-2xl border p-6">
        <p className="text-muted-foreground leading-relaxed text-pretty">{course.description}</p>
        <div className="mt-5">
          <div className="mb-1.5 flex items-center justify-between text-sm">
            <span className="font-medium">Progresso geral</span>
            <span className="text-muted-foreground">{course.progress}%</span>
          </div>
          <div className="bg-secondary h-2.5 overflow-hidden rounded-full">
            <div
              className={cn('h-full rounded-full', completed ? 'bg-success' : 'bg-primary')}
              style={{ width: `${course.progress}%` }}
            />
          </div>
        </div>
      </div>
    </Panel>
  )
}
