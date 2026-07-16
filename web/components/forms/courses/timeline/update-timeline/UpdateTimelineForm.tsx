import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { ContentModel } from '@/types/content'
import { SelectFormContent } from '../select-content/SelectContent'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { TimelineModel } from '@/types/timelineModel'
import { useUpdateTimeline } from './useUpdateTimeline'

interface UpdateTimelineFormProps {
  editingItem: TimelineModel
  handleClose: () => void
  contents?: ContentModel[]
}

export const UpdateTimelineForm = ({
  editingItem,
  handleClose,
  contents,
}: UpdateTimelineFormProps) => {
  const form = useUpdateTimeline({ editingItem, handleClose })

  const toInputDateValue = (value: unknown) =>
    value instanceof Date ? value.toISOString().split('T')[0] : ''

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
                value={toInputDateValue(field.state.value)}
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
            {isSubmitting ? <Spinner /> : 'Atualizar'}
          </Button>
        )}
      </form.Subscribe>
    </form>
  )
}
