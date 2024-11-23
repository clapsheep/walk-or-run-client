export type AuthCredentials = {
  userEmail: string
  userPassword: string
}

export type AuthResponse = {
  message: string
  access_token?: string
  refresh_token?: string
}

export type AuthError = {
  message: string
  status: number
}

export type TokenPayload = {
  userId: string
  userEmail: string
  userRole: string
}
