import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAccountData, IUserData } from "../api/types/user";
import { RootState } from ".";

export interface UserState {
  user: IUserData,
  token: string | null,
  account: IAccountData | null
}

const initialState: UserState = {
  user: {},
  token: null,
  account: null
}

export const userState = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserData>) => {
      state.user = { ...action.payload }
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      let tokenVal = action.payload
      state.token = action.payload
      if (tokenVal !== null) {
        localStorage.setItem('authToken', tokenVal)
      } else {
        localStorage.removeItem('authToken')
      }
    },
    setAccount: (state, action: PayloadAction<IAccountData | null>) => {
      state.account = action.payload !== null ? { ...action.payload } : null
    }
  }
})

export const { setUser, setToken, setAccount } = userState.actions

export const selectUser = (state: RootState) => state.user.user
export const selectToken = (state: RootState) => state.user.token
export const selectAccount = (state: RootState) => state.user.account

export default userState.reducer