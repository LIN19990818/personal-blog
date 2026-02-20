export interface IAdmin {
  id: number
  username: string
  nickname: string
  avatar: string
  createdAt: string
}

export interface ILoginRequest {
  username: string
  password: string
}

export interface ILoginResponse {
  token: string
  expiresIn: number
  admin: IAdmin
}

export interface IAdminUpdateRequest {
  nickname?: string
  avatar?: string
}

export interface IPasswordUpdateRequest {
  oldPassword: string
  newPassword: string
}
