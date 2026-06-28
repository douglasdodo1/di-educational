import { cn } from '@/lib/utils'
import { CheckCircle2, CircleDot, Circle } from 'lucide-react'
import { Panel } from '../panel/Panel'

const scheduleIcon = {
  concluida: CheckCircle2,
  proxima: CircleDot,
  futura: Circle,
} as const

const scheduleIconStyle = {
  concluida: 'text-success',
  proxima: 'text-warning',
  futura: 'text-muted-foreground',
} as const

interface ScheduleItem {
  id: string
  date: string
  title: string
  description: string
  state: 'concluida' | 'proxima' | 'futura'
}

interface ScheduleSectionProps {
  items: ScheduleItem[]
}

export function ScheduleSection({ items }: ScheduleSectionProps) {
  return (
    <Panel title="Cronograma">
      <ol className="border-border relative flex flex-col gap-6 border-l pl-6">
        {items.map((item) => {
          const Icon = scheduleIcon[item.state]
          return (
            <li key={item.id} className="relative">
              <span className="bg-background absolute -left-[31px] flex size-6 items-center justify-center rounded-full">
                <Icon className={cn('size-5', scheduleIconStyle[item.state])} />
              </span>
              <div className="border-border bg-card rounded-2xl border p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-heading font-semibold">{item.title}</p>
                  <span className="text-muted-foreground shrink-0 text-xs font-medium">
                    {item.date}
                  </span>
                </div>
                <p className="text-muted-foreground mt-1 text-sm">{item.description}</p>
                {item.state === 'proxima' && (
                  <span className="bg-warning/10 text-warning mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium">
                    Próxima aula
                  </span>
                )}
              </div>
            </li>
          )
        })}
        {items.length === 0 && (
          <li className="text-muted-foreground text-sm">Cronograma ainda não publicado.</li>
        )}
      </ol>
    </Panel>
  )
}
