import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { useTimeline } from './useTimeline'
import { Input } from '@/components/ui/input'
import { Content } from '@/types/content'
import { SelectFormContent } from './SelectContent/SelectContent'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

interface CreatetTimelineProps {
  courseId?: string
  handleClose: () => void
  contents?: Content[]
}

export const CreateTimelineForm = ({ courseId, handleClose, contents }: CreatetTimelineProps) => {
  const form = useTimeline({ courseId, handleClose })

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        form.handleSubmit()
      }}
    >
      <FieldGroup>
        <form.Field name="date">
          {(field) => (
            <Field>
              <FieldLabel className="text-base font-medium text-gray-700">Data</FieldLabel>
              <Input
                className="py-5"
                type="date"
                value={field.state.value?.toISOString().split('T')[0]}
                onChange={(e) => field.handleChange(new Date(e.target.value))}
              />
            </Field>
          )}
        </form.Field>
        <form.Field name="contentId">
          {(field) => (
            <Field>
              <FieldLabel>Conteúdo relacionado</FieldLabel>

              <SelectFormContent
                contents={contents}
                value={field.state.value}
                onValueChange={field.handleChange}
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
            {isSubmitting ? <Spinner /> : 'Criar'}
          </Button>
        )}
      </form.Subscribe>
    </form>
  )
}
