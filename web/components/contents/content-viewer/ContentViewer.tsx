import { Class } from '@/types/contents'
import { NavigationMenu } from '../navigation-menu/NavigationMenu'
import { ContentCard } from '../content-card/ContentCard'

interface ContentViewerProps {
  lesson?: Class
  loading: boolean
  onBack: () => void
}

export const ContentViewer = ({ lesson, loading, onBack }: ContentViewerProps) => {
  return (
    <section className="flex flex-col gap-4">
      <NavigationMenu onBack={onBack} />
      <ContentCard lesson={lesson} loading={loading} />
    </section>
  )
}
