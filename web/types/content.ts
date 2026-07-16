import { ContentType } from './contentType'

export type ContentModel = {
  id: number
  name: string
  description: string
  type: ContentType
  url: string
  courseId: number
}
