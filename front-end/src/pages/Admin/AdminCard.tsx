import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { sizing } from '@material-ui/system';
import { User } from '../../types';
import DeleteButton from './DeleteButton'


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

const AdminCard = (props: User) => {

  const classes = useStyles();

/*  {props.isAdmin &&
            <Grid item>
              <Typography variant='h6' className='userInfo'>
                USER IS ADMIN
              </Typography>
            </Grid>
          }
          HVORFOR FUNKER IKKE DETTE, HVORFOR FÅR JEG NOE SOM LIGNER PÅ EN POTENS AV isAdmin?
          */
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={1} justify="space-between">
          <Grid item xs>
            <Typography variant='caption' color='textSecondary' className= 'userInfo' align = 'center'>
              {props.user_id}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography variant='h6' className='userInfo' align = 'center'>
              {props.name}
            </Typography>  
          </Grid>
          <Grid item xs>          
            <Typography variant = 'body2' className = 'userInfo' align = 'center'>
              {props.email}
            </Typography>
          </Grid>
          <Grid item xs>
            <DeleteButton {...{type: 0, id: props.user_id}}/>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default AdminCard;