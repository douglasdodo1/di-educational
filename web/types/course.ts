import { Class } from './classes'

export type Course = {
  id: string
  name: string
  description: string
  category: string
  image: string
  progress: number
  classes: Class[]
  hours: number
}
