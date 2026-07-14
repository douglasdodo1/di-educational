import { Content } from './content'

export type TimelineModel = {
  id: number
  is_done: boolean
  date: Date
  content?: Content | null
}
