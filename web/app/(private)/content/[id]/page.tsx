'use client'
import { ContentCard } from '@/components/contents/content-card/ContentCard'
import { NavigationMenu } from '@/components/contents/navigation-menu/NavigationMenu'
import { useViewModel } from './useViewModel'

export default function Content() {
  const { content, loading, error, handleBack } = useViewModel()

  return (
    <div>
      {error ? (
        <p>{error.message}</p>
      ) : (
        <section className="flex flex-col gap-4">
          <NavigationMenu onBack={handleBack} />
          <ContentCard content={content} loading={loading} />
        </section>
      )}
    </div>
  )
}
