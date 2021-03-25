import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
<<<<<<< HEAD
import client from '../../feathers-client';
=======
>>>>>>> ffb016bad9ca9814d9c052ea295ccc87b0a36692

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

<<<<<<< HEAD
export default function DeleteButton(props: {type: number, id: number}) {
  const classes = useStyles();

  const type = props.type == 0 ? 'users' : 'dinners';

  const handleOnClick = (): void => {
    console.log(props.id)
    client.service(type).remove(props.id)
  }

  return (
    <div className={classes.root}>
      <IconButton aria-label="delete" size = 'small' onClick={handleOnClick}>
=======
export default function DeleteButton() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton aria-label="delete">
>>>>>>> ffb016bad9ca9814d9c052ea295ccc87b0a36692
        <DeleteIcon style={{fill: "#512D38"}}/>
      </IconButton>
    </div>
    );
}