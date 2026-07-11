import { Button } from '@/components/ui/button'
import { CheckCircle2, UserCheck, UserX } from 'lucide-react'

interface AttendenHeaderProps {
  onAllPresent: () => void
  onAllAbsent: () => void
  displayDate: string
  presentes: number
  total: number
}

export const AttendenHeader = ({
  onAllPresent,
  onAllAbsent,
  displayDate,
  presentes,
  total,
}: AttendenHeaderProps) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="font-heading text-lg font-semibold">Ata de {displayDate}</h3>
        <p className="text-muted-foreground mt-0.5 flex items-center gap-1.5 text-sm">
          <CheckCircle2 className="text-success size-4" />
          {presentes} de {total} alunos presentes
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          onClick={onAllPresent}
          className="cursor-pointer gap-2 bg-transparent"
        >
          <UserCheck className="text-success size-4" />
          Todos presentes
        </Button>
        <Button
          variant="outline"
          onClick={onAllAbsent}
          className="cursor-pointer gap-2 bg-transparent"
        >
          <UserX className="text-destructive size-4" />
          Todos ausentes
        </Button>
      </div>
    </div>
  )
}
