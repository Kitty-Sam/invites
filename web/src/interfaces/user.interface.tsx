import { IProfile } from '@/interfaces/profile.interface'

export interface IUser {
  id: number
  goLoginId: string
  email?: string
  userName?: string
  upworkUserId?: string
  upworkProfiles?: IProfile[]
}
