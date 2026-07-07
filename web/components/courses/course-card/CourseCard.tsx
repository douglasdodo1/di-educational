import Image from 'next/image'
import { BookOpen, Clock, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '../../ui/card'
import { Label } from '../../ui/label'
import { Course } from '@/types/course'

export function CourseCard({
  course,
  onSelect,
}: {
  course: Course
  onSelect?: (course: any) => void
}) {
  const completed = course.progress === 100
  return (
    <Card
      onClick={() => onSelect?.(course)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect?.(course)
        }
      }}
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
      aria-label={onSelect ? `Abrir curso ${course.name}` : undefined}
      className="min-h-96 cursor-pointer pt-0"
    >
      <div className="relative aspect-[16/10] overflow-hidden px-0">
        <Image
          src={course.image || '/default-course.png'}
          alt={`Capa do curso ${course.name}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Label className="bg-card/90 text-foreground absolute top-3 left-3 rounded-md px-2.5 py-1 text-xs font-semibold shadow-sm backdrop-blur">
          {course.category}
        </Label>
        {completed && (
          <Label className="bg-success text-success-foreground absolute top-3 right-3 flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium">
            <CheckCircle2 className="size-3.5" />
            Concluído
          </Label>
        )}
      </div>
      <CardContent>
        <div className="text-muted-foreground flex items-center gap-4 text-xs">
          <Label className="flex items-center gap-1.5">
            <BookOpen className="size-3.5" />
            {course.classes?.length} aulas
          </Label>
          <Label className="flex items-center gap-1.5">
            <Clock className="size-3.5" />
            {course.hours}h
          </Label>
        </div>

        <h3 className="font-heading mt-2 text-lg leading-snug font-semibold text-balance">
          {course.name}
        </h3>
        <p className="text-muted-foreground mt-1.5 line-clamp-2 text-sm leading-relaxed">
          {course.description}
        </p>

        <div className="mt-auto pt-5">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <Label className="text-foreground font-medium">Progresso</Label>
            <Label className="text-muted-foreground">{course.progress}%</Label>
          </div>
          <div className="bg-secondary h-2 overflow-hidden rounded-full">
            <div
              className={cn('h-full rounded-full', completed ? 'bg-success' : 'bg-primary')}
              style={{ width: `${course.progress}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
