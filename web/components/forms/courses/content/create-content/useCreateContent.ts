import { useCreateContentMutation } from '@/hooks/contents/useCreateContentMutation'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import { ContentType } from '@/types/contentType'

interface CreateContentFormValues {
  name: string
  description: string
  type: ContentType
  url: string
}

interface CreateContentProps {
  courseId?: string
  handleClose: () => void
}

export const useCreateContent = ({ courseId, handleClose }: CreateContentProps) => {
  const { createContent } = useCreateContentMutation(courseId)

  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
      type: ContentType.PDF,
      url: '',
    } as CreateContentFormValues,

    validators: {
      onSubmitAsync: async ({ value }) => {
        try {
          const response = await createContent({
            variables: {
              data: {
                name: value.name,
                description: value.description,
                type: value.type,
                url: value.url,
                courseId: Number(courseId),
              },
            },
          })

          if (response?.data) {
            handleClose()
            form.reset()
            toast.success('Conteúdo criado com sucesso')
          }
        } catch (error) {
          console.error(error)
          toast.error('Erro ao criar conteúdo')
        }
      },
    },
  })

  return form
}
