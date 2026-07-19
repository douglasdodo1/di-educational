import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { useUpdateContent } from './useUpdateContent'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ContentType } from '@/types/contentType'
import { ContentModel } from '@/types/content'

interface UpdateContentProps {
  editingItem: ContentModel
  setIsLoadingEdit: (isLoading: boolean) => void
  handleClose: () => void
}

export const UpdateContentForm = ({
  editingItem,
  setIsLoadingEdit,
  handleClose,
}: UpdateContentProps) => {
  const form = useUpdateContent({ editingItem, setIsLoadingEdit, handleClose })

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        form.handleSubmit()
      }}
    >
      <FieldGroup>
        <form.Field name="name">
          {(field) => (
            <Field>
              <FieldLabel className="text-base font-medium text-gray-700">Nome</FieldLabel>
              <Input
                className="py-5"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </Field>
          )}
        </form.Field>

        <form.Field name="description">
          {(field) => (
            <Field>
              <FieldLabel className="text-base font-medium text-gray-700">Descrição</FieldLabel>
              <Input
                className="py-5"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </Field>
          )}
        </form.Field>

        <form.Field name="type">
          {(field) => (
            <Field>
              <FieldLabel className="text-base font-medium text-gray-700">Tipo</FieldLabel>
              <Select
                value={field.state.value}
                onValueChange={(value) => field.handleChange(value as ContentType)}
              >
                <SelectTrigger className="w-full cursor-pointer">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(ContentType).map((type) => (
                    <SelectItem className="cursor-pointer" key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        </form.Field>

        <form.Field name="url">
          {(field) => (
            <Field>
              <FieldLabel className="text-base font-medium text-gray-700">URL</FieldLabel>
              <Input
                className="py-5"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </Field>
          )}
        </form.Field>
      </FieldGroup>

      <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
        {([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="mt-4 w-full cursor-pointer"
          >
            {isSubmitting ? <Spinner /> : 'Atualizar'}
          </Button>
        )}
      </form.Subscribe>
    </form>
  )
}
