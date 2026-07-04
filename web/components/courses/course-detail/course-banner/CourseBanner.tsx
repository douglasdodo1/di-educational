import { Course } from '@/types/course'
import { CheckCircle2, Clock, BookOpen, PencilLine } from 'lucide-react'
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import { CourseDetailHeaderSkeleton } from './CourseBannerSkeleton'
import { Button } from '@/components/ui/button'

interface CourseDetailHeaderProps {
  course?: Course
  loading: boolean
  error?: unknown
}

export const CourseBanner = ({ course, loading }: CourseDetailHeaderProps) => {
  if (loading) {
    return <CourseDetailHeaderSkeleton />
  }

  return (
    <header className="border-border bg-card relative overflow-hidden rounded-2xl border">
      <div className="relative h-24 w-full">
        <Image
          src={course?.image || '/default-course.png'}
          alt={`Capa do curso ${course?.name}`}
          fill
          className="object-cover"
        />
        <div className="absolute right-5 bottom-4 left-5 text-white">
          <h1 className="font-heading mt-2 text-2xl font-semibold tracking-tight text-balance">
            {course?.name}
          </h1>
        </div>
      </div>
      <div className="text-muted-foreground flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-4 text-sm">
        <div className="flex flex-1 gap-x-6">
          <span className="flex items-center gap-1.5">
            <BookOpen className="size-4" />
            {course?.contents.length} aulas
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-4" />
            {course?.hours}h de conteúdo
          </span>
        </div>

        <div className="flex gap-2">
          <Button className="text-primary-foreground bg-primary">
            <PencilLine className="size-4" />
            Editar
          </Button>
        </div>
      </div>
    </header>
  )
}
