import { User } from 'services/auth/types'

export interface AuthState {
  user: User | null
  token: string | null
  refresh: string | null
}
