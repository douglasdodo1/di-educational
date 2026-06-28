import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Course } from '@/types/course'
import { sections } from '../utils'
import { OverviewSection } from '../overview-section/OverviewSection'
import { CourseActivitiesSection } from '../course-activities-section/CourseActivitiesSection'
import { AttendanceSection } from '../attendance-section/AttendanceSection'
import { ScheduleSection } from '../schedule-section/ScheduleSection'

interface CourseTabsProps {
  course: Course
}

export const CourseTabs = ({ course }: CourseTabsProps) => {
  return (
    <Tabs defaultValue="visao-geral" className="flex flex-col gap-6">
      <TabsList className="border-border bg-card flex h-auto w-full justify-start gap-1 overflow-x-auto rounded-xl border p-1">
        {sections.map((s) => (
          <TabsTrigger
            key={s.id}
            value={s.id}
            className="data-active:bg-primary data-active:text-primary-foreground text-muted-foreground hover:bg-secondary hover:text-foreground dark:data-active:bg-primary dark:data-active:text-primary-foreground flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors data-active:shadow-sm"
          >
            <s.icon className="size-[18px]" />
            {s.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="visao-geral">
        <OverviewSection course={course} />
      </TabsContent>
      <TabsContent value="frequencia">
        <AttendanceSection records={[]} />
      </TabsContent>
      <TabsContent value="atividades">
        <CourseActivitiesSection activities={[]} />
      </TabsContent>
      <TabsContent value="cronograma">
        <ScheduleSection items={[]} />
      </TabsContent>
    </Tabs>
  )
}
