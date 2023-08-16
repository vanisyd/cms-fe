import { AccountType } from "./general"

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

export type AccountData = {
  id: number,
  name: string,
  type: AccountType,
  user_id: number,
  api_token: string | null
}

export type AccountDataForm = Partial<AccountData>

export interface IAccountResponse {
  data: AccountData[]
}