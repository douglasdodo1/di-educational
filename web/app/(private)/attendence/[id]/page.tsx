'use client'

import { AttendenHeader } from '@/components/attendences/attendence-header/AttendenHeader'
import { FrequencyList } from '@/components/attendences/frequency-list/FrequencyList'
import { NavigationMenu } from '@/components/contents/navigation-menu/NavigationMenu'
import { Card } from '@/components/ui/card'
import { useViewModel } from './useViewModel'

export default function Attendence() {
  const {
    onBack,
    onAllPresent,
    onAllAbsent,
    onToggle,
    displayDate,
    presentes,
    frequencies,
    loading,
    error,
  } = useViewModel()

  return (
    <div className="flex flex-1 flex-col gap-4">
      <Card className="w-full flex-row justify-between px-4">
        <NavigationMenu onBack={onBack} leftText="voltar para atas" rightText="próxima ata" />
      </Card>

      <Card className="gap-4 rounded-2xl border p-5 sm:p-6">
        <AttendenHeader
          onAllPresent={onAllPresent}
          onAllAbsent={onAllAbsent}
          displayDate={displayDate}
          presentes={presentes}
          total={frequencies?.length || 0}
        />

        <FrequencyList frequencies={frequencies} isLoading={loading} onToggle={onToggle} />
      </Card>
    </div>
  )
}
