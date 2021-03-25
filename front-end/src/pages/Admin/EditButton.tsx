import React, { useCallback } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import { Dinner } from '../../types';
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

export default function EditButton(props: Dinner) {
  const history = useHistory();
  const handleOnClick = useCallback(() => history.push('/editdinner/' + props.dinners_id), [history]);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button classes={{root: classes.root}} onClick={handleOnClick}>Edit</Button>
    </div>
  );
}