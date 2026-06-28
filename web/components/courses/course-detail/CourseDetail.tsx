'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  ArrowLeft,
  LayoutGrid,
  CalendarCheck,
  ClipboardList,
  CalendarRange,
  BookOpen,
  Clock,
  CheckCircle2,
  CircleDot,
  Circle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Course } from '@/types/course'

type SectionId = 'visao-geral' | 'frequencia' | 'atividades' | 'cronograma'

const sections: { id: SectionId; label: string; icon: typeof LayoutGrid }[] = [
  { id: 'visao-geral', label: 'Visão geral', icon: LayoutGrid },
  { id: 'frequencia', label: 'Frequência', icon: CalendarCheck },
  { id: 'atividades', label: 'Atividades', icon: ClipboardList },
  { id: 'cronograma', label: 'Cronograma', icon: CalendarRange },
]

export function CourseDetail({ course, onBack }: { course: Course; onBack: () => void }) {
  const [section, setSection] = useState<SectionId>('visao-geral')

  return (
    <div className="flex flex-col gap-6">
      <button
        onClick={onBack}
        className="text-muted-foreground hover:text-foreground flex w-fit items-center gap-2 text-sm font-medium transition-colors"
      >
        <ArrowLeft className="size-4" />
        Voltar para meus cursos
      </button>

      <header className="border-border bg-card relative overflow-hidden rounded-2xl border">
        <div className="relative h-36 w-full sm:h-44">
          <Image
            src={course.image || '/placeholder.svg'}
            alt={`Capa do curso ${course.title}`}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/85 to-blue-900/20" />
          <div className="absolute right-5 bottom-4 left-5 text-white">
            <span className="text-foreground rounded-md bg-white/95 px-2.5 py-1 text-xs font-semibold">
              {course.category}
            </span>
            <h1 className="font-heading mt-2 text-2xl font-semibold tracking-tight text-balance">
              {course.title}
            </h1>
          </div>
        </div>
        <div className="text-muted-foreground flex flex-wrap items-center gap-x-6 gap-y-2 px-5 py-4 text-sm">
          <span className="flex items-center gap-1.5">
            <BookOpen className="size-4" />
            {course.lessons} aulas
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-4" />
            {course.hours}h de conteúdo
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="size-4" />
            {course.completedLessons} de {course.lessons} concluídas
          </span>
        </div>
      </header>

      <nav className="border-border bg-card flex gap-1 overflow-x-auto rounded-xl border p-1">
        {sections.map((s) => {
          const Icon = s.icon
          const isActive = s.id === section
          return (
            <button
              key={s.id}
              onClick={() => setSection(s.id)}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
              )}
            >
              <Icon className="size-[18px]" />
              {s.label}
            </button>
          )
        })}
      </nav>

      {section === 'visao-geral' && <OverviewSection course={course} />}
      {section === 'frequencia' && <AttendanceSection records={detail?.attendance ?? []} />}
      {section === 'atividades' && <CourseActivitiesSection activities={courseActivities} />}
      {section === 'cronograma' && <ScheduleSection items={detail?.schedule ?? []} />}
    </div>
  )
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-heading flex items-center gap-2.5 text-lg font-semibold">
        <span aria-hidden className="bg-primary h-5 w-1.5 rounded-full" />
        {title}
      </h2>
      {children}
    </section>
  )
}

function OverviewSection({ course }: { course: Course }) {
  const completed = course.progress === 100
  return (
    <Panel title="Visão geral">
      <div className="border-border bg-card rounded-2xl border p-6">
        <p className="text-muted-foreground leading-relaxed text-pretty">{course.description}</p>
        <div className="mt-5">
          <div className="mb-1.5 flex items-center justify-between text-sm">
            <span className="font-medium">Progresso geral</span>
            <span className="text-muted-foreground">{course.progress}%</span>
          </div>
          <div className="bg-secondary h-2.5 overflow-hidden rounded-full">
            <div
              className={cn('h-full rounded-full', completed ? 'bg-success' : 'bg-primary')}
              style={{ width: `${course.progress}%` }}
            />
          </div>
        </div>
      </div>
    </Panel>
  )
}

const attendanceStyles: Record<AttendanceStatus, string> = {
  presente: 'bg-success/10 text-success',
  falta: 'bg-destructive/10 text-destructive',
  justificada: 'bg-warning/10 text-warning',
}

function AttendanceSection({
  records,
}: {
  records: { id: string; date: string; topic: string; status: AttendanceStatus }[]
}) {
  const total = records.length
  const presentes = records.filter((r) => r.status === 'presente').length
  const taxa = total > 0 ? Math.round((presentes / total) * 100) : 0

  return (
    <Panel title="Frequência">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Stat label="Taxa de presença" value={`${taxa}%`} />
        <Stat label="Aulas registradas" value={String(total)} />
        <Stat label="Faltas" value={String(records.filter((r) => r.status === 'falta').length)} />
      </div>
      <ul className="divide-border border-border bg-card flex flex-col divide-y overflow-hidden rounded-2xl border">
        {records.map((r) => (
          <li key={r.id} className="flex items-center justify-between gap-4 px-5 py-4">
            <div className="flex items-center gap-4">
              <span className="bg-secondary text-foreground flex size-11 shrink-0 flex-col items-center justify-center rounded-lg text-xs leading-tight font-semibold">
                {r.date.split(' ').map((part, i) => (
                  <span key={i}>{part}</span>
                ))}
              </span>
              <p className="text-sm font-medium">{r.topic}</p>
            </div>
            <span
              className={cn(
                'shrink-0 rounded-full px-3 py-1 text-xs font-medium',
                attendanceStyles[r.status],
              )}
            >
              {attendanceStatusLabels[r.status]}
            </span>
          </li>
        ))}
        {records.length === 0 && (
          <li className="text-muted-foreground px-5 py-10 text-center text-sm">
            Nenhum registro de frequência disponível.
          </li>
        )}
      </ul>
    </Panel>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-border bg-card flex flex-col gap-1 rounded-2xl border p-4">
      <span className="font-heading text-2xl font-semibold">{value}</span>
      <span className="text-muted-foreground text-xs">{label}</span>
    </div>
  )
}

function CourseActivitiesSection({
  activities,
}: {
  activities: typeof import('@/lib/activities').activities
}) {
  return (
    <Panel title="Atividades do curso">
      <ul className="flex flex-col gap-3">
        {activities.map((a) => (
          <li
            key={a.id}
            className="border-border bg-card flex flex-col gap-2 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="bg-primary/10 text-primary rounded-md px-2 py-0.5 text-xs font-medium">
                  {activityTypeLabels[a.type]}
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
    </Panel>
  )
}

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

function ScheduleSection({
  items,
}: {
  items: {
    id: string
    date: string
    title: string
    description: string
    state: 'concluida' | 'proxima' | 'futura'
  }[]
}) {
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
