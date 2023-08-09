export interface IUserData {
  id?: number,
  name?: string,
  email?: string,
  password?: string
}

export interface IAuthData {
  email: string,
  password: string
}

export interface ITokenData {
  token: string
}

export interface IUserResponse extends IUserData {
  email_verified_at: string | null,
  created_at: string
}

export interface IAuthResponse {
  user: IUserResponse,
  token: ITokenData
}

export interface IAccountData {
  id: number,
  name: string,
  type: string,
  user_id: number,
  api_token: string | null
}

export interface IAccountResponse {
  data: IAccountData[]
}