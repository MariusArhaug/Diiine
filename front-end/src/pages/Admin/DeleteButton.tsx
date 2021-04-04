import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import client from "../../feathers-client";
import CompleteAction from '../../components/CompleteAction';
import { useState } from 'react';
import { SuccessAlert, ErrorAlert } from '../../hooks/Alerts'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  })
);

function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function DeleteButton(props: { type: string; id: number }) {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);
  const handleDelete = () => {
    client.service(props.type)
      .remove(props.id)
      .then(() => {
        SuccessAlert(`${capitalize(props.type)} deleted!`, `You deleted ${capitalize(props.type)}: with user ID: ${props.id}`, 'Done')
      })
      .catch((e: any) => {
        console.log(e);
        ErrorAlert('Error!', e.message, 'try again')
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
