import { useState, useEffect } from "react";
import { User } from '../../types';
import client from '../../feathers-client'
import { Grid } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import AdminCard from './AdminCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
  }),
);
export default function Admin() {

  const classes = useStyles();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    client.service('users')
      .find({})
      .then((res: any) => {
        const users: User[] = res.data;
        setUsers([...users]);
      })
      .catch((e: Error) => { console.log('error', e) })
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3} direction='column' justify='space-evenly' alignItems='stretch'>
        {users.length && users!.map((user: User) => (
          <Grid item key={user.user_id}>
            <AdminCard {...user} key={user.user_id} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
