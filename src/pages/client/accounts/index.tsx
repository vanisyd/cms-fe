import AccountService from "@/api/services/client/account"
import { IAccountData, IAccountResponse } from "@/api/types/user"
import { getRoute } from "@/router"
import { useAppDispatch } from "@/state/hook"
import { setAccount } from "@/state/user"
import { Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const AccountsPage = () => {
  const [accounts, setAccounts] = useState<IAccountData[]>([])
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const getData = () => {
    AccountService.getAccounts((data: IAccountResponse) => {
      setAccounts(data.data)
    })
  }

  const changeAccount = (account: IAccountData) => {
    dispatch(setAccount(account))
    navigate(getRoute('admin.user'))
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: '#fffde7', margin: '15% auto' }}>
        <List>
          {accounts.map((item: IAccountData) => {
            return (
              <ListItem key={item.id}>
                <ListItemButton onClick={() => changeAccount(item)}>
                  <ListItemText primary={item.name} secondary={item.type} />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </Box>
    </>
  )
}

export default AccountsPage