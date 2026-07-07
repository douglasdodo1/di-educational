import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { Frequency } from '@/types/frequency'
import { FrequencySkeleton } from './FrequencySkeleton'

interface FrequencyListProps {
  frequencies?: Frequency[]
  isLoading?: boolean
  onToggle: (studentId: string) => void
}

export const FrequencyList = ({ frequencies, isLoading, onToggle }: FrequencyListProps) => {
  if (isLoading) {
    return <FrequencySkeleton />
  }

  return (
    <ul className="divide-border border-border flex flex-col divide-y overflow-hidden rounded-xl border">
      {frequencies?.map((f) => {
        return (
          <li key={f.id} className="flex items-center justify-between gap-4 px-4 py-3">
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  'flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold',
                  f.is_present
                    ? 'bg-success/10 text-success'
                    : 'bg-destructive/10 text-destructive',
                )}
              >
                {f.student?.user?.first_name || 'U'}
              </span>
              <p className="text-sm font-medium">
                {f.student?.user?.first_name + ' ' + f.student?.user?.last_name ||
                  'Usuário Desconhecido'}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span
                className={cn(
                  'hidden rounded-full px-3 py-1 text-xs font-medium sm:inline-block',
                  f.is_present
                    ? 'bg-success/10 text-success'
                    : 'bg-destructive/10 text-destructive',
                )}
              >
                {f.is_present ? 'Presente' : 'Falta'}
              </span>
              <Switch
                checked={f.is_present}
                onCheckedChange={() => onToggle(String(f.student?.id || ''))}
                aria-label={`${f.is_present ? 'Marcar falta' : 'Marcar presenca'} para ${f.student?.user?.first_name || ''}`}
                className={cn(
                  'relative h-6 w-11 rounded-full transition-colors',
                  f.is_present ? 'bg-success' : 'bg-destructive',
                )}
              >
                <span
                  className={cn(
                    'absolute top-0.5 size-5 rounded-full bg-white shadow transition-all',
                    f.is_present ? 'left-[22px]' : 'left-0.5',
                  )}
                />
              </Switch>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
