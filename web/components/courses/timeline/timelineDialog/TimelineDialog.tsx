import { CreateTimelineForm } from '@/components/forms/courses/timeline/create-timeline/CreateTimelineForm'
import { UpdateTimelineForm } from '@/components/forms/courses/timeline/update-timeline/UpdateTimelineForm'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { ContentModel } from '@/types/content'
import { TimelineModel } from '@/types/timelineModel'

interface TimelineDialogProps {
  isOpen: boolean
  onClose: () => void
  courseId?: string
  contents?: ContentModel[]
  editingItem?: TimelineModel
  setIsLoadingEdit: (isLoading: boolean) => void
}

export const TimelineDialog = ({
  isOpen,
  onClose,
  courseId,
  contents,
  editingItem,
  setIsLoadingEdit,
}: TimelineDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>{editingItem ? 'Editar cronograma' : 'Adicionar cronograma'}</DialogTitle>
        {editingItem ? (
          <UpdateTimelineForm
            editingItem={editingItem}
            handleClose={onClose}
            contents={contents}
            setIsLoadingEdit={setIsLoadingEdit}
          />
        ) : (
          <CreateTimelineForm courseId={courseId} handleClose={onClose} contents={contents} />
        )}
      </DialogContent>
    </Dialog>
  )
}
