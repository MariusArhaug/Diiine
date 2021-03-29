import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { useState } from 'react';

export default function CompleteAction(props: any) {

  const [visible, setVisible] = useState(true);

  const handleClick = (bool: boolean) => {
    const innerVisible = !visible
    props.handleClick(bool)
    setVisible(innerVisible);
  }

  return (
    <Dialog open={visible} onClose={() => handleClick(false)} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Confirm</DialogTitle>
      <DialogContent>
        Do you want to complete following action?
          </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClick(true)} color="primary" variant="outlined">
          Confirm
        </Button>
        <Button onClick={() => handleClick(false)} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}
