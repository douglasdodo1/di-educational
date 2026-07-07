'use client'
import { ContentCard } from '@/components/contents/content-card/ContentCard'
import { NavigationMenu } from '@/components/contents/navigation-menu/NavigationMenu'
import { useViewModel } from './useViewModel'

export default function Content() {
  const { content, loading, error, handleBack } = useViewModel()

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {error ? (
        <p>{error.message}</p>
      ) : (
        <section className="flex min-h-0 flex-1 flex-col gap-4">
          <NavigationMenu
            onBack={handleBack}
            leftText="voltar para aulas"
            rightText="proximo conteudo"
          />
          <div className="flex min-h-0 flex-1 overflow-y-auto">
            <ContentCard content={content} loading={loading} />
          </div>
        </section>
      )}
    </div>
  )
}
