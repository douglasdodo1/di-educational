import { Panel } from '../panel/Panel'
import { activityTypeLabels } from '../utils'

interface Activity {
  id: string
  type: string
  assignedBy: string
  title: string
  dueDate: string
}

interface CourseActivitiesSectionProps {
  activities: Activity[]
}

export function CourseActivitiesSection({ activities }: CourseActivitiesSectionProps) {
  return (
    <Panel title="Atividades do curso" className="flex min-h-0 flex-1 flex-col">
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        <ul className="flex flex-col gap-3">
        {activities.map((a) => (
          <li
            key={a.id}
            className="border-border bg-card flex flex-col gap-2 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="bg-primary/10 text-primary rounded-md px-2 py-0.5 text-xs font-medium">
                  {activityTypeLabels[a.type] || a.type}
                </span>
                <span className="text-muted-foreground text-xs">{a.assignedBy}</span>
              </div>
              <p className="text-sm font-medium">{a.title}</p>
            </div>
            <span className="text-muted-foreground text-xs font-medium">{a.dueDate}</span>
          </li>
        ))}
        {activities.length === 0 && (
          <li className="border-border text-muted-foreground rounded-2xl border border-dashed py-10 text-center text-sm">
            Nenhuma atividade atribuída neste curso.
          </li>
        )}
        </ul>
      </div>
    </Panel>
  )
}
