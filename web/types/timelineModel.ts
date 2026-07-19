import { ContentModel } from './content'

export type TimelineModel = {
  id: number
  is_done: boolean
  date: Date
  contentId: number
  content?: ContentModel | null
}
