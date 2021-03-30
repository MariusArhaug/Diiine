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
    <Dialog open={visible} onClose={() => handleClick(true)} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Attendants</DialogTitle>
      <DialogActions>
        <Button onClick={() => handleClick(true)} color="primary" variant="outlined">
          Exit
        </Button>
      </DialogActions>
    </Dialog>
  )
}