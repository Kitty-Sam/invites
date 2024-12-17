import { IUser } from '@/interfaces/user.interface'

export interface IProfile {
  id: number
  title: string
  valueProposition: string
  interviews: string[]
  upworkUsers: IUser[]
}
