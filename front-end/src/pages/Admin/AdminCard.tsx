import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { User } from '../../types';
import DeleteButton from './DeleteButton'
import '../../styles/App.css';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(0),
      margin: 'auto',
      maxWidth: 500,
      backgroundColor: '#ffffff',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#fafafa'
      }
    },
  }));

export default function AdminCard(user: User) {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={1} justify="space-between" xs={12}>
          <Grid item xs={2}>
            <Typography variant='caption' color='textSecondary' className='userInfo' align='center'>
              ID: {user.user_id}
            </Typography>
          </Grid>
          <Grid item xs={4} >
            <Typography variant='body2' className='userInfo' align='center'>
              {user.name}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant='body2' className='userInfo' align='center'>
              {user.email}
            </Typography>
          </Grid>
          <Grid item xs={2} className='deleteButton'>
            <DeleteButton {...{ type: 'users', id: user.user_id }} />
          </Grid>
        </Grid>
      </Paper>
    </div >
  );
}
