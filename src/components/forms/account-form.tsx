import { AccountType, AccountTypeLabels } from "@/api/types/general"
import { AccountData, AccountDataForm } from "@/api/types/user"
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"

interface IProps {
  accountData?: AccountData,
  onChange?: CallableFunction
}

const AccountForm: React.FC<IProps> = (props: IProps) => {
  const [formData, setFormData] = useState<AccountDataForm>({})
  const { accountData, onChange } = props

  const setInput = (event: any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const addAccount = () => {
    if (onChange !== undefined) {
      onChange(formData)
    }
  }

  useEffect(() => {
    if (accountData !== undefined) {
      setFormData({ ...accountData })
    }
  }, [accountData])

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
          {accountData === undefined ? 'Create' : 'Edit'} Account
        </Typography>
        <TextField
          name="name"
          label="Name"
          style={{ width: '100%', marginTop: '15px' }}
          onChange={setInput}
          value={formData.name}
        />
        <FormControl fullWidth>
          <InputLabel id="account-type-label">Type</InputLabel>
          <Select
            labelId="account-type-label"
            value={formData.type}
            onChange={setInput}
            label="Type"
          >
            {Object.values(AccountType).map((item: AccountType) => {
              return (
                <MenuItem value={item}>{AccountTypeLabels[item]}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </div>
      <div>
        <Button variant="outlined" onClick={addAccount}>
          {accountData === undefined ? 'Create' : 'Save'}
        </Button>
      </div>
    </div>
  )
}

export default AccountForm