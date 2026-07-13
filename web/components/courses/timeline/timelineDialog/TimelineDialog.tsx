import { CreateTimelineForm } from '@/components/forms/courses/createtimeline/CreateTimelineForm'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Content } from '@/types/content'

interface TimelineDialogProps {
  isOpen: boolean
  onClose: () => void
  courseId?: string
  contents?: Content[]
}

export const TimelineDialog = ({ isOpen, onClose, courseId, contents }: TimelineDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Adicionar cronograma</DialogTitle>
        <CreateTimelineForm courseId={courseId} handleClose={onClose} contents={contents} />
      </DialogContent>
    </Dialog>
  )
}
