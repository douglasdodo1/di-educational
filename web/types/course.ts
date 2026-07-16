import { ContentModel } from './content'

export type Course = {
  id: string
  name: string
  description: string
  category: string
  image: string
  progress: number
  contents: ContentModel[]
  hours: number
}
