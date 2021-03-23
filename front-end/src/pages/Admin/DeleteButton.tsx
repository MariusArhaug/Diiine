import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import client from '../../feathers-client';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

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
        <DeleteIcon style={{fill: "#512D38"}}/>
      </IconButton>
    </div>
    );
}