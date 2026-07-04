import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Course } from '@/types/course'
import { sections } from '../utils'
import { ContentSection } from '../content-section/ContentSection'
import { CourseActivitiesSection } from '../course-activities-section/CourseActivitiesSection'
import { AttendanceSection } from '../attendance-section/AttendanceSection'
import { ScheduleSection } from '../schedule-section/ScheduleSection'

interface CourseTabsProps {
  course?: Course
  loading: boolean
  error?: unknown
}

export const CourseTabs = ({ course, loading }: CourseTabsProps) => {
  return (
    <Tabs defaultValue="conteudo" className="flex min-h-0 flex-1 flex-col gap-6">
      <TabsList className="border-border bg-card flex h-auto w-full shrink-0 justify-start gap-1 overflow-x-auto rounded-xl border p-1">
        {sections.map((s) => (
          <TabsTrigger
            key={s.id}
            value={s.id}
            className="data-active:bg-primary data-active:text-primary-foreground text-muted-foreground hover:bg-secondary hover:text-foreground dark:data-active:bg-primary dark:data-active:text-primary-foreground flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors data-active:shadow-sm"
          >
            <s.icon className="size-4.5" />
            {s.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="conteudo" className="flex min-h-0 flex-1 flex-col">
        <ContentSection course={course} loading={loading} />
      </TabsContent>
      <TabsContent value="frequencia" className="flex min-h-0 flex-1 flex-col">
        <AttendanceSection courseId={course?.id} />
      </TabsContent>
      <TabsContent value="atividades" className="flex min-h-0 flex-1 flex-col">
        <CourseActivitiesSection activities={[]} />
      </TabsContent>
      <TabsContent value="cronograma" className="flex min-h-0 flex-1 flex-col">
        <ScheduleSection items={[]} />
      </TabsContent>
    </Tabs>
  )
}
