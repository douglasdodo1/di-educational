import { ContentType } from './contentType'

export type Content = {
  id: number
  name: string
  description: string
  type: ContentType
  url: string
}
