import { CreateContentForm } from '@/components/forms/courses/content/create-content/CreateContentForm'
import { UpdateContentForm } from '@/components/forms/courses/content/update-content/UpdateContentForm'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { ContentModel } from '@/types/content'

interface ContentDialogProps {
  courseId?: string
  editingItem?: ContentModel
  isOpen: boolean
  onClose: () => void
}

export const ContentDialog = ({ courseId, editingItem, isOpen, onClose }: ContentDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>{editingItem ? 'Editar Conteúdo' : 'Adicionar Conteúdo'}</DialogTitle>
        {editingItem ? (
          <UpdateContentForm editingItem={editingItem} handleClose={onClose} />
        ) : (
          <CreateContentForm courseId={courseId} handleClose={onClose} />
        )}
      </DialogContent>
    </Dialog>
  )
}
