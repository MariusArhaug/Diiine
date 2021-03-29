import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import client from "../../feathers-client";
import CompleteAction from '../../components/CompleteAction';
import { useState } from 'react';
import swal from 'sweetalert';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  })
);

export default function DeleteButton(props: { type: string; id: number }) {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);
  const formattedString = props.type === 'dinners' ? 'Dinner' : 'User';
  const handleDelete = () => {
    client.service(props.type)
      .remove(props.id)
      .then(() => {
        swal({
          title: `${formattedString} deleted!`,
          text: `You deleted ${formattedString}: with user ID: ${props.id}`,
          icon: 'success',
          buttons: {
            confirm: {
              text: 'Done',
              className: 'buttonStyle'
            }
          }
        })
      })
      .catch((e: any) => {
        console.log(e);
        swal({
          title: 'Error',
          text: 'Something went wrong!',
          icon: 'error',
          buttons: {
            confirm: {
              text: 'try again',
              className: 'buttonStyle errorStyle'
            }
          }
        })
      });
  }

  const handleClick = (bool: boolean) => {
    if (bool) handleDelete();
    const tempVisible = !visible;
    setVisible(tempVisible);
  }

  return (
    <div className={classes.root} onClick={() => handleClick(false)}>
      <IconButton aria-label="delete">
        <DeleteIcon style={{ fill: "000000" }} />
      </IconButton>
      {visible ? <CompleteAction handleClick={(value: boolean) => handleClick(value)} /> : null}
    </div>
  );
}
