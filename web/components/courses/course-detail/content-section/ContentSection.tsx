import { Course } from '@/types/course'
import { Panel } from '../panel/Panel'
import { ContentSectionSkeleton } from './ContentSectionSkeleton'
import { sections } from '../../utils'
import { ContentDialog } from './content-dialog/ContentDialog'
import { ContentCardList } from './content-card-list/ContentCardList'
import { useViewModel } from './useViewmodel'

interface OverviewSectionProps {
  course?: Course
  loading: boolean
}

export function ContentSection({ course, loading }: OverviewSectionProps) {
  const {
    contents,
    open,
    editingItem,
    isLoading,
    setIsLoadingEdit,
    handleDeleteContent,
    handleOpenDialog,
    handleCloseDialog,
    handleEditContent,
  } = useViewModel(course)

  const sectionTitle = sections[0].label

  if (loading) {
    return (
      <Panel title={sectionTitle}>
        <ContentSectionSkeleton />
      </Panel>
    )
  }

  return (
    <Panel
      title={sectionTitle}
      className="flex min-h-0 flex-1 flex-col"
      openModal={handleOpenDialog}
    >
      <ContentDialog
        courseId={course?.id}
        editingItem={editingItem}
        isOpen={open}
        setIsLoadingEdit={setIsLoadingEdit}
        onClose={handleCloseDialog}
      />
      <ContentCardList
        contents={contents}
        onEdit={handleEditContent}
        onDelete={handleDeleteContent}
        isLoading={isLoading}
      />
    </Panel>
  )
}
