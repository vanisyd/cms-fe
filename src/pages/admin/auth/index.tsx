import { Button, TextField } from "@mui/material"
import { useState } from "react"
import AuthService from "../../../api/services/admin/auth"
import { IAuthData, IAuthResponse } from "../../../api/types/user"
import { useAppDispatch } from "../../../state/hook"
import { setToken, setUser } from "../../../state/user"

const AuthPage = () => {
  const [authData, setAuthData] = useState<IAuthData>({
    email: '',
    password: ''
  })

  const dispatch = useAppDispatch()

  const login = () => {
    AuthService.auth(authData, (response: IAuthResponse) => {
      if (response.token) {
        dispatch(setToken(response.token.token))
        dispatch(setUser(response.user))
      }
    })
  }

  const setFormData = (event: any) => {
    setAuthData({
      ...authData,
      [event.target.id]: event.target.value
    })
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        margin: '15vh auto',
        width: '25rem',
        boxShadow: '0 0 2px',
        padding: '5rem',
        borderRadius: '10px'
      }}
    >
      <TextField id="email" label="Email" type="email" onChange={setFormData} required />
      <TextField id="password" label="Password" type="password" onChange={setFormData} required />
      <Button
        style={{ width: '50%' }}
        variant="outlined"
        onClick={() => login()}
      >Sign in</Button>
    </div>
  )
}

export default AuthPage