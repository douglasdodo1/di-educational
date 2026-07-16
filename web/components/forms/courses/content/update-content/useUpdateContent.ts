import { useUpdateContentMutation } from '@/hooks/contents/useUpdateContentMutation'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import { ContentType } from '@/types/contentType'
import { ContentModel } from '@/types/content'

interface UpdateContentFormValues {
  name: string
  description: string
  type: ContentType
  url: string
}

interface UpdateContentProps {
  editingItem: ContentModel
  handleClose: () => void
}

export const useUpdateContent = ({ editingItem, handleClose }: UpdateContentProps) => {
  const { updateContent } = useUpdateContentMutation()

  const form = useForm({
    defaultValues: {
      name: editingItem?.name ?? '',
      description: editingItem?.description ?? '',
      type: editingItem?.type ?? ContentType.PDF,
      url: editingItem?.url ?? '',
    } as UpdateContentFormValues,

    validators: {
      onSubmitAsync: async ({ value }) => {
        try {
          const response = await updateContent({
            variables: {
              data: {
                id: editingItem.id,
                name: value.name,
                description: value.description,
                type: value.type,
                url: value.url,
              },
            },
          })

          if (response?.data) {
            handleClose()
            form.reset()
            toast.success('Conteúdo atualizado com sucesso')
          }
        } catch (error) {
          console.error(error)
          toast.error('Erro ao atualizar conteúdo')
        }
      },
    },
  })

  return form
}
