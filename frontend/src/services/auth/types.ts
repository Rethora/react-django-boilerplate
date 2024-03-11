export interface Credentials {
  username: string
  password: string
}

export interface User {
  username: string
  email: string
  is_staff: boolean
}

export interface TokenResponse {
  access: string
  refresh: string
}

export interface TokenObtainResponse extends TokenResponse {
  user: User
}
