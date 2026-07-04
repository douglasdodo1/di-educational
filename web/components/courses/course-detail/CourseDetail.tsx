import { ArrowLeft } from 'lucide-react'
import { Course } from '@/types/course'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { CourseBanner } from './course-banner/CourseBanner'
import { CourseTabs } from './course-tabs/CourseTabs'

export function CourseDetail({ course, onBack }: { course: Course; onBack: () => void }) {
  return (
    <div className="flex flex-col gap-6">
      <Button onClick={onBack} variant="ghost" className="flex w-fit cursor-pointer">
        <ArrowLeft className="size-4" />
        <p className="text-sm font-medium">Voltar para meus cursos</p>
      </Button>

      <CourseBanner course={course} />
      <CourseTabs course={course} />
    </div>
  )
}
