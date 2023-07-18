import { Button, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import UserService from "../../../api/services/admin/user"
import { IUserData } from "../../../api/types/admin/user"
import { IPaginatedResponse, IResponseMeta } from "../../../api/types/core"
import Confirm from "../../../components/core/confirm"
import SideMenu from "../../../components/core/side-menu"
import UserForm from "../../../components/forms/user-form"
import useFiltering from "../../../hooks/useFiltering"

const UsersPage = () => {
  const [usersData, setUsersData] = useState<IUserData[]>([])
  const [menuOpened, setMenuOpened] = useState<boolean>(false)
  const [selUserData, setSelUserData] = useState<IUserData | null>(null)
  const [usersMeta, setUsersMeta] = useState<IResponseMeta>()
  const [dialogOpened, setDialogOpened] = useState<boolean>(false)
  const filtering = useFiltering()

  const getData = () => {
    UserService.getAll((data: IPaginatedResponse<IUserData>) => {
      setUsersData(data.data)
      setUsersMeta(data.meta)
    }, filtering.filter)
  }

  const editUser = (index: number) => {
    setSelUserData(usersData[index])
    setMenuOpened(true)
  }

  const deleteUser = (index: number) => {
    setSelUserData(usersData[index])
    setDialogOpened(true)
  }

  const createUser = () => {
    setSelUserData(null)
    setMenuOpened(true)
  }

  const userChanged = (data: IUserData) => {
    if (selUserData?.id !== undefined) {
      UserService.update(data, () => {
        getData()
      })
    } else {
      UserService.create(data, () => {
        getData()
      })
    }

    setMenuOpened(false)
  }

  const confirmed = (isConfirmed: boolean) => {
    if (isConfirmed && selUserData?.id !== undefined) {
      UserService.delete(selUserData.id, () => {
        getData()
      })
    }
    setSelUserData(null)
    setDialogOpened(false)
  }

  useEffect(() => {
    getData()
  }, [filtering.filter])

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '1rem',
        }}
      >
        <TextField
          id="filter"
          label="Name/email"
          style={{ width: '30rem' }}
          onChange={filtering.updateFilter}
        />
        <Button
          variant="contained"
          style={{ width: '10rem' }}
          color="success"
          onClick={() => createUser()}
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
              <TableCell>Email</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersData.map((item: IUserData, index: number) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: '1rem',
                      paddingRight: '2rem'
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={() => editUser(index)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => deleteUser(index)}
                      color="error"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          padding: '1rem'
        }}
      >
        <Pagination
          count={usersMeta?.last_page}
          shape="rounded"
          onChange={filtering.pageChanged}
        />
      </div>
      <SideMenu closed={() => setMenuOpened(false)} isOpen={menuOpened} children={
        <UserForm userData={selUserData ?? undefined} onChange={userChanged} />
      } />
      <Confirm
        title={"Delete user"}
        text={"Are you sure you want to delete this user?"}
        opened={dialogOpened}
        onChange={confirmed}
      />
    </div>
  )
}

export default UsersPage