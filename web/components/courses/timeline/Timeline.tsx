import { Panel } from '../course-detail/panel/Panel'
import { TimelineDialog } from './timelineDialog/TimelineDialog'
import { ContentModel } from '@/types/content'
import { TimelineSkeletonList } from './TimelineSkeletonList/TimelineSkeletonList'
import { useViewModel } from './useViewModel'
import { TimelineCardList } from './timelineCardList/TimelineCardList'

interface TimelineProps {
  courseId?: string
  contents?: ContentModel[]
}

export const Timeline = ({ courseId, contents }: TimelineProps) => {
  const {
    timelines,
    loading,
    openModal,
    editingItem,
    isLoading,
    setIsLoadingEdit,
    handleOpenCreateModal,
    handleCloseCreateModal,
    handleOpenEditModal,
    handleChecked,
    handleDeleteTimeline,
  } = useViewModel({ courseId })

  return (
    <Panel
      title="Cronograma"
      className="flex min-h-0 flex-1 flex-col"
      openModal={handleOpenCreateModal}
    >
      <TimelineDialog
        courseId={courseId}
        isOpen={openModal}
        onClose={handleCloseCreateModal}
        contents={contents}
        editingItem={editingItem}
        setIsLoadingEdit={setIsLoadingEdit}
      />
      {loading ? (
        <TimelineSkeletonList />
      ) : (
        <TimelineCardList
          timelines={timelines}
          handleOpenEditModal={handleOpenEditModal}
          handleChecked={handleChecked}
          onDelete={handleDeleteTimeline}
          isLoading={isLoading}
        />
      )}
    </Panel>
  )
}
