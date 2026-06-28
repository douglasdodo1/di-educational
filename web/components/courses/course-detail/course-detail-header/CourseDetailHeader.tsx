import { Course } from '@/types/course'
import { CheckCircle2, Clock, BookOpen } from 'lucide-react'
import Image from 'next/image'
import { Label } from '@/components/ui/label'

interface CourseDetailHeaderProps {
  course: Course
}

export const CourseDetailHeader = ({ course }: CourseDetailHeaderProps) => {
  return (
    <header className="border-border bg-card relative overflow-hidden rounded-2xl border">
      <div className="relative h-36 w-full sm:h-44">
        <Image
          src={course.image || '/default-course.png'}
          alt={`Capa do curso ${course.name}`}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/85 to-blue-900/20" />
        <div className="absolute right-5 bottom-4 left-5 text-white">
          <Label className="text-foreground rounded-md bg-white/95 px-2.5 py-1 text-xs font-semibold">
            {course.category}
          </Label>
          <h1 className="font-heading mt-2 text-2xl font-semibold tracking-tight text-balance">
            {course.name}
          </h1>
        </div>
      </div>
      <div className="text-muted-foreground flex flex-wrap items-center gap-x-6 gap-y-2 px-5 py-4 text-sm">
        <span className="flex items-center gap-1.5">
          <BookOpen className="size-4" />
          {course.classes.length} aulas
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="size-4" />
          {course.hours}h de conteúdo
        </span>
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="size-4" />
          {/* {course.completedLessons} de {course.lessons} concluídas */}
        </span>
      </div>
    </header>
  )
}
