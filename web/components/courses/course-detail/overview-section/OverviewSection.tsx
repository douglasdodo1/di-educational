import { cn } from '@/lib/utils'
import { Course } from '@/types/course'
import { Panel } from '../panel/Panel'
import { Label } from '@/components/ui/label'

interface OverviewSectionProps {
  course: Course
}

export function OverviewSection({ course }: OverviewSectionProps) {
  const completed = course.progress === 100
  const classes = course.classes
  return (
    <Panel title="Visão geral">
      {classes.map((cls, index) => (
        <div key={index} className="border-border bg-card rounded-2xl border p-6">
          <div className="flex flex-col gap-2">
            <Label className="text-lg font-bold">{cls.name}</Label>
            <Label className="text-md text-muted-foreground">{cls.description}</Label>
          </div>

          <div className="mt-5">
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <Label>Progresso geral</Label>
              <Label>{course.progress}%</Label>
            </div>
            <div className="bg-secondary h-2.5 overflow-hidden rounded-full">
              <div
                className={cn('h-full rounded-full', completed ? 'bg-success' : 'bg-primary')}
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </Panel>
  )
}
