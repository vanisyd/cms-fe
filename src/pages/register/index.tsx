import { Button, TextField } from "@mui/material"
import { useState } from "react"
import { IAuthResponse, IUserData } from "@/api/types/user"
import AuthService from "@/api/services/client/auth"
import { useAppDispatch } from "@/state/hook"
import { setToken, setUser } from "@/state/user"
import { useNavigate } from "react-router-dom"
import { getRoute } from "@/router"

const RegisterPage = () => {
  const [formData, setFormData] = useState<IUserData>({})
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const setInput = (event: any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const Register = () => {
    AuthService.register(formData, (response: IAuthResponse) => {
      dispatch(setUser(response.user))
      dispatch(setToken(response.token.token))
      navigate(getRoute('admin.user'))
    })
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          margin: '15vh auto',
          width: '40rem',
          padding: '1rem'
        }}
      >
        <TextField
          name="name"
          label="Name"
          value={formData.name}
          onChange={setInput}
          required
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={setInput}
          required
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={setInput}
          required
        />
        <Button
          style={{
            width: '15%'
          }}
          variant="outlined"
          onClick={Register}
        >Sign up</Button>
      </div>
    </div>
  )
}

export default RegisterPage