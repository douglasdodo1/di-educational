import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Content } from '@/types/content'

interface SelectFormContentProps {
  contents?: Content[]
  value?: string
  onValueChange: (value: string) => void
}

export const SelectFormContent = ({ contents, value, onValueChange }: SelectFormContentProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full cursor-pointer">
        <SelectValue placeholder="Selecione um conteúdo relacionado" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {contents?.map((content) => (
            <SelectItem className="cursor-pointer" key={content.id} value={content.id.toString()}>
              {content.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
