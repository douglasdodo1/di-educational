import { Panel } from '../panel/Panel'
import { sections } from '../../utils'
import { AttendenceDialog } from './attendence-dialog/AttendenceDialog'
import { AttendenceCardList } from './attendence-card-list/AttendenceCardList'
import { AttendenceCardSkeleton } from './attendence-skeleton-list/AttendenceCardSkeleton'
import { useViewModel } from './useViewModel'

interface AttendeceSectionProps {
  courseId?: string
}

export function AttendanceSection({ courseId }: AttendeceSectionProps) {
  const {
    attendences,
    loading,
    openDialog,
    editingItem,
    isLoading,
    setIsLoadingEdit,
    handleOpenCreateDialog,
    handleOpenEditDialog,
    handleCloseDialog,
    handleDeleteAttendence,
  } = useViewModel({ courseId })

  return (
    <Panel
      title={sections[2].label}
      className="flex min-h-0 flex-1 flex-col"
      openModal={handleOpenCreateDialog}
    >
      <AttendenceDialog
        courseId={courseId}
        editingItem={editingItem}
        isOpen={openDialog}
        onClose={handleCloseDialog}
        setIsLoadingEdit={setIsLoadingEdit}
      />
      {loading ? (
        <AttendenceCardSkeleton />
      ) : (
        <AttendenceCardList
          attendences={attendences}
          handleOpenEditDialog={handleOpenEditDialog}
          onDelete={handleDeleteAttendence}
          isLoading={isLoading}
        />
      )}
    </Panel>
  )
}
