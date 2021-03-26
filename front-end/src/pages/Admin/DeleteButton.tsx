import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import client from '../../feathers-client';
import swal from 'sweetalert';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);


export default function DeleteButton(props: { type: number, id: number }) {
  const classes = useStyles();

  const type = props.type === 0 ? 'users' : 'dinners';

  const handleClick = (): void => {
    console.log(props.id)
    client.service(type).remove(props.id)
    swal({
      title: 'Good Admin!',
      text: 'You have now deleted this user!',
      icon: 'success',
      buttons: {
        confirm: {
          text: "Nice!",
          className: "buttonStyle",
        }
      }
    });
  }

  return (
    <div className={classes.root}>
      <IconButton aria-label="delete">
        <DeleteIcon style={{ fill: "#512D38" }} onClick={handleClick} />
      </IconButton>
    </div>
  );
}