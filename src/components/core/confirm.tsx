import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { useEffect, useState } from "react"

interface IProps {
  title: string,
  text: string,
  opened: boolean,
  onChange?: CallableFunction
}

const Confirm: React.FC<IProps> = (props) => {
  const [open, setOpen] = useState(false);
  const { title, text, opened, onChange } = props

  const handleClose = (answer: boolean) => {
    if (onChange !== undefined) {
      onChange(answer)
    }
    setOpen(false);
  };

  useEffect(() => {
    setOpen(opened)
  }, [opened])

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} autoFocus>No</Button>
          <Button onClick={() => handleClose(true)} color="error">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Confirm