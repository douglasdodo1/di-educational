'use client'
import { CourseBanner } from '@/components/courses/course-detail/course-banner/CourseBanner'
import { CourseTabs } from '@/components/courses/course-detail/course-tabs/CourseTabs'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useViewModel } from './useViewModel'

export default function Course() {
  const { course, loading, error, handleBack } = useViewModel()

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6">
      <Button onClick={handleBack} variant="outline" className="flex w-fit shrink-0 cursor-pointer">
        <ArrowLeft className="size-4" />
        <p className="text-sm font-medium">Voltar para meus cursos</p>
      </Button>

      <CourseBanner course={course} loading={loading} error={error} />
      <CourseTabs course={course} loading={loading} error={error} />
    </div>
  )
}
