import { Student } from './user'

export interface Frequency {
  id: string
  is_present: boolean
  attendence?: {
    date: string
  }
  student: Student
}
