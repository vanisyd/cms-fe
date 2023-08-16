import AccountService from "@/api/services/client/account"
import { AccountTypeLabels } from "@/api/types/general"
import { AccountData, IAccountResponse } from "@/api/types/user"
import Confirm from "@/components/core/confirm"
import SideMenu from "@/components/core/side-menu"
import AccountForm from "@/components/forms/account-form"
import useFiltering from "@/hooks/useFiltering"
import { useAppDispatch } from "@/state/hook"
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import { useEffect, useState } from "react"

const AccountsPage = () => {
  const [accounts, setAccounts] = useState<AccountData[]>([])
  const dispatch = useAppDispatch()
  const filtering = useFiltering()
  const [dialogOpened, setDialogOpened] = useState<boolean>(false)
  const [selAccountData, setSelAccountData] = useState<AccountData | null>(null)
  const [menuOpened, setMenuOpened] = useState<boolean>(false)

  const getData = () => {
    AccountService.getAccounts((data: IAccountResponse) => {
      setAccounts(data.data)
    })
  }

  const createAccount = () => {
    setSelAccountData(null)
    setMenuOpened(true)
  }

  const confirmed = (isConfirmed: boolean) => {
    if (isConfirmed && selAccountData?.id !== undefined) {

    }
    setSelAccountData(null)
    setDialogOpened(false)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '1rem',
        }}
      >
        <TextField
          id="filter"
          label="Name"
          style={{ width: '30rem' }}
          onChange={filtering.updateFilter}
        />
        <Button
          variant="contained"
          style={{ width: '10rem' }}
          color="success"
          onClick={() => createAccount()}
        >
          Create
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((item: AccountData) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{AccountTypeLabels[item.type]}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <SideMenu closed={() => setMenuOpened(false)} isOpen={menuOpened} children={
        <AccountForm accountData={selAccountData ?? undefined} />
      } />
      <Confirm
        title={"Delete account"}
        text={"Are you sure you want to delete this account?"}
        opened={dialogOpened}
        onChange={confirmed}
      />
    </>
  )
}

export default AccountsPage