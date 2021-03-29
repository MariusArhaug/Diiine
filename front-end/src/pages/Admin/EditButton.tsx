import React, { useCallback } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import { Dinner, User } from '../../types';
import { Link as RouterLink, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
      color: '#512D38'
    },
  }),
);

export default function EditButton(props: Dinner | User) {
  const history = useHistory();

  let path = ''
  if (props as Dinner) path = `/editdinner/${(props as Dinner).dinners_id}`;
  else path = `/edituser/${(props as User).user_id}`;
  const handleClick = useCallback(() => history.push(path), [path, history]);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button classes={{ root: classes.root }} onClick={handleClick}>Edit</Button>
    </div>
  );
}