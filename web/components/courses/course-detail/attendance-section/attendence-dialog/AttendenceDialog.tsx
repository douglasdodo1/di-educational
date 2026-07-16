import { CreateAttendenceForm } from '@/components/forms/courses/attendence/create-attendence/CreateAttendenceForm'
import { UpdateAttendenceForm } from '@/components/forms/courses/attendence/update-attendence/updateAttendenceForm'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { AttendenceModel } from '@/types/attendence'

interface AttendenceDialogProps {
  courseId?: string
  editingItem?: AttendenceModel
  isOpen: boolean
  onClose: () => void
}

export const AttendenceDialog = ({
  courseId,
  editingItem,
  isOpen,
  onClose,
}: AttendenceDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>{editingItem ? 'Editar Ata' : 'Adicionar Ata'}</DialogTitle>
        {editingItem ? (
          <UpdateAttendenceForm editingItem={editingItem} handleClose={onClose} />
        ) : (
          <CreateAttendenceForm courseId={courseId} handleClose={onClose} />
        )}
      </DialogContent>
    </Dialog>
  )
}
