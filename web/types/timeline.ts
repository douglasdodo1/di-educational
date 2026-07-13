import { Content } from './content'

export type Timeline = {
  id: number
  is_done: boolean
  date: Date
  content?: Content | null
}
