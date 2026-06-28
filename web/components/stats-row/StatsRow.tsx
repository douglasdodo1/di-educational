import { BookOpen, Clock, Trophy, Flame } from 'lucide-react'

export const StatsRow = () => {
  const totalLessons = 0
  const completedLessons = 0
  const totalHours = 0
  const completedCourses = 0
  const avgProgress = 0

  const stats = [
    {
      label: 'Progresso médio',
      value: `${avgProgress}%`,
      detail: `${completedLessons} de ${totalLessons} aulas`,
      icon: BookOpen,
    },
    {
      label: 'Horas estudadas',
      value: `${totalHours}h`,
      detail: 'neste semestre',
      icon: Clock,
    },
    {
      label: 'Cursos concluídos',
      value: String(completedCourses),
      detail: `de ${0} matriculados`,
      icon: Trophy,
    },
    {
      label: 'Sequência de estudo',
      value: '12 dias',
      detail: 'mantenha o ritmo',
      icon: Flame,
    },
  ]

  return (
    <section aria-label="Resumo de progresso" className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.label}
            className="border-border bg-card relative flex flex-col gap-3 overflow-hidden rounded-xl border p-4"
          >
            <span aria-hidden className="bg-primary absolute inset-x-0 top-0 h-1" />
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">{stat.label}</span>
              <span className="bg-primary/10 text-primary flex size-8 items-center justify-center rounded-md">
                <Icon className="size-4" />
              </span>
            </div>
            <div>
              <p className="font-heading text-2xl leading-none font-semibold">{stat.value}</p>
              <p className="text-muted-foreground mt-1.5 text-xs">{stat.detail}</p>
            </div>
          </div>
        )
      })}
    </section>
  )
}
