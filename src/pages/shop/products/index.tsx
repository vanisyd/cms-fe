import { IResponseMeta } from "@/api/types/core"
import { IProductData } from "@/api/types/shop"
import Confirm from "@/components/core/confirm"
import SideMenu from "@/components/core/side-menu"
import useFiltering from "@/hooks/useFiltering"
import { Button, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import { useState } from "react"

const ProductsPage = () => {
  const [productsData, setProductsData] = useState<IProductData[]>([])
  const [selProductData, setSelProductData] = useState<IProductData | null>(null)
  const [menuOpened, setMenuOpened] = useState<boolean>(false)
  const [productsMeta, setProductsMeta] = useState<IResponseMeta>()
  const [dialogOpened, setDialogOpened] = useState<boolean>(false)
  const filtering = useFiltering()

  const createProduct = () => {
    setSelProductData(null)
    setMenuOpened(true)
  }

  const editProduct = (item: IProductData) => {
    setSelProductData(item)
    setMenuOpened(true)
  }

  const deleteProduct = (item: IProductData) => {
    setSelProductData(item)
    setDialogOpened(true)
  }

  const confirmed = (isConfirmed: boolean) => {
    if (isConfirmed && selProductData?.id !== undefined) {

    }
    setSelProductData(null)
    setDialogOpened(false)
  }

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
          onClick={() => createProduct()}
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
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsData.map((item: IProductData, index: number) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
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
                      onClick={() => editProduct(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => deleteProduct(item)}
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
          count={productsMeta?.last_page}
          shape="rounded"
          onChange={filtering.pageChanged}
        />
      </div>
      <SideMenu closed={() => setMenuOpened(false)} isOpen={menuOpened} children={<></>} />
      <Confirm
        title={"Delete product"}
        text={"Are you sure you want to delete this product?"}
        opened={dialogOpened}
        onChange={confirmed}
      />
    </>
  )
}

export default ProductsPage