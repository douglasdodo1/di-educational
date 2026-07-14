import { Panel } from '../course-detail/panel/Panel'
import { TimelineDialog } from './timelineDialog/TimelineDialog'
import { Content } from '@/types/content'
import { TimelineSkeletonList } from './TimelineSkeletonList/TimelineSkeletonList'
import { useViewModel } from './useViewModel'
import { TimelineCardList } from './timelineCardList/TimelineCardList'

interface TimelineProps {
  courseId?: string
  contents?: Content[]
}

export const Timeline = ({ courseId, contents }: TimelineProps) => {
  const {
    timelines,
    loading,
    openModal,
    editingItem,
    handleOpenCreateModal,
    handleCloseCreateModal,
    handleOpenEditModal,
    handleChecked,
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
      />
      {loading ? (
        <TimelineSkeletonList />
      ) : (
        <TimelineCardList
          timelines={timelines}
          handleOpenEditModal={handleOpenEditModal}
          handleChecked={handleChecked}
        />
      )}
    </Panel>
  )
}
