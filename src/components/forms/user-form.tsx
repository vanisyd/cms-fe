import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react"
import { IUserData } from "../../api/types/admin/user"

interface IProps {
  userData?: IUserData,
  onChange?: CallableFunction
}

const UserForm: React.FC<IProps> = (props) => {
  const [formData, setFormData] = useState<IUserData>({})
  const { userData, onChange } = props

  const setInput = (event: any) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value
    })
  }

  const addUser = () => {
    if (onChange !== undefined) {
      onChange(formData)
    }
  }

  useEffect(() => {
    if (userData !== undefined) {
      setFormData({ ...userData })
    }
  }, [userData])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '.5rem'
        }}
      >
        <Typography variant="h5" gutterBottom>
          {userData === undefined ? 'Create' : 'Edit'} User
        </Typography>
        <TextField
          id="name"
          label="Name"
          style={{ width: '100%', marginTop: '15px' }}
          onChange={setInput}
          value={formData.name}
        />
        <TextField
          id="email"
          label="Email"
          style={{ width: '100%' }}
          onChange={setInput}
          value={formData.email}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          style={{ width: '100%' }}
          onChange={setInput}
          value={formData.password}
        />
      </div>
      <div>
        <Button variant="outlined" onClick={addUser}>
          {userData === undefined ? 'Create' : 'Save'}
        </Button>
      </div>
    </div>
  )
}

export default UserForm