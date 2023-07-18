import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUserData } from "../api/types/admin/user";
import { RootState } from ".";

export interface UserState {
  user: IUserData,
  token: string | null
}

const initialState: UserState = {
  user: {},
  token: null
}

export const userState = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserData>) => {
      console.log(action.payload)
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
    }
  }
})

export const { setUser, setToken } = userState.actions

export const selectUser = (state: RootState) => state.user.user
export const selectToken = (state: RootState) => state.user.token

export default userState.reducer