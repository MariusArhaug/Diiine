import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../../styles';
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, TextField } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import GroupIcon from '@material-ui/icons/Group';
import EventIcon from '@material-ui/icons/Event';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import { useHistory, useLocation } from 'react-router-dom';
import { Dinner, User } from '../../types';
import client from '../../feathers-client';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import { useAuth } from '../../hooks/use-auth';
import DeleteIcon from '@material-ui/icons/Delete';
import swal from 'sweetalert';
import NewRating from '../../components/NewRating';
import AverageRating from '../../components/AverageRating'


export default function DinnerInfo() {

  const classes = useStyles();
  const auth = useAuth();

  const location: { state: { dinner: Dinner, dinner_owner: User } } = useLocation();
  const [state, setState] = useState<{ owner: User | null, dinner: Dinner | null }>({
    owner: null,
    dinner: null,
  });

  const [isAttending, setAttending] = useState(false);

  useEffect(() => {
    const dinnerInfo: Dinner = location.state.dinner;
    const userInfo: User = location.state.dinner_owner;

    setState({ dinner: dinnerInfo, owner: userInfo })
    client.service('attendingdinners')
      .find({
        query: {
          user_id: userInfo.user_id,
          dinners_id: dinnerInfo.dinners_id
        }
      })
      .then((res: any) => {
        setAttending(res.total > 0);
      })
    setAttending(dinnerInfo.user_id === userInfo.user_id)
  }, [location.state.dinner, location.state.dinner_owner])


  console.log(state)


  const [open, setOpen] = useState(false);
  const user: User = useAuth().user;

  const handleJoinDinner = () => {
    const data = {
      dinners_id: state!.dinner!.dinners_id,
      user_id: user.user_id,
    }

    client.service('attendingdinners').create(data).then(() => {
      swal({
        title: 'Hurray!',
        text: 'You have now joined the dinner!',
        icon: 'success',
        buttons: {
          confirm: {
            text: "Nice!",
            className: "buttonStyle"
          }
        }
      });
      setAttending(true);
    });
  }

  const handleLeaveDinner = () => {
    client.service('attendingdinners').find({
      query: {
        dinners_id: state!.dinner!.dinners_id,
        user_id: user.user_id,
      }
    }).then((res: any) => {
      const row: { user_id: number, dinners_id: number, secondary_pk: number } = res.data[0];
      client.service('attendingdinners')
        .remove(row.secondary_pk)
        .then(() => {
          swal({
            title: 'Left dinner!',
            text: 'You have now left the dinner!',
            icon: 'success',
            buttons: {
              confirm: {
                text: "Done",
                className: "buttonStyle"
              }
            }
          });
          setAttending(false);
        }).catch((e: Error) => console.log(e));
    }).catch((e: Error) => console.log(e));
    ;
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (state.dinner) {
      state.dinner.expenses = Number.parseFloat(event.target.value);
    }
  }


  const handleDeleteClick = () => {
    console.log("deleted")
    client.service('dinners').remove(state!.dinner!.dinners_id)
      .then()
      .catch((e: Error) => {
        console.log('couldn\'t delete dinner', e);
      });
  }
  const history = useHistory();
  const handleEditClick = () => {
    history.push('/editdinner/' + state!.dinner!.dinners_id);
  }

  return (
    <div className={classes.spacer}>
      <Paper className={classes.spacer} style={{ textAlign: "left" }}>
        {state.dinner && state.owner &&
          <Grid container spacing={3} direction="row" alignItems="stretch">
            {/*---------------HEADER IMG-------------------------*/}
            <Grid item xs={12}>
              <Paper className={classes.dinnerImage} style={
                {
                  backgroundImage: "URL('https://image.freepik.com/free-photo/thanksgiving-celebration_53876-73751.jpg')",
                  backgroundSize: "cover"
                }} />
            </Grid>
            <Grid item xs={12} container justify="space-between" alignItems="center">
              <Grid item container justify='flex-end'>
                {state.owner.user_id === user.user_id || user.isAdmin ? <Button onClick={handleEditClick}>Edit</Button> : <p />}
                {state.owner.user_id === user.user_id || user.isAdmin ? <IconButton onClick={handleDeleteClick} aria-label="delete"><DeleteIcon style={{ fill: "#512D38" }} /></IconButton> : <p />}
              </Grid>
              <Grid xs item style={{ textAlign: "left" }}>
                <Typography variant="caption" color="textSecondary">
                  {state.dinner.address}
                </Typography>
                {/*---------------DINNER NAME ETC-------------------------*/}
                <Typography variant="h4">{state.dinner.title}</Typography>
                <Grid item container spacing={1} justify="flex-start">
                  {state.dinner.tags.split(',').map(a => (
                    <Grid item>
                      <Chip size="small" label={a} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              {/*---------------DATE / PRIVATE DINNER-------------------------*/}
              <Grid xs item container alignItems="center" justify="flex-end">
                <Grid item container spacing={1} alignItems="center" justify="flex-end">
                  <Grid item>
                    <Typography variant="subtitle2">
                      {state.dinner.isOpen ? "Open dinner" : "Private dinner"}
                    </Typography>
                  </Grid>
                  <Grid item>
                    {state.dinner.isOpen ? <LockOpenIcon /> : <LockOutlinedIcon />}
                  </Grid>
                </Grid>
                <Grid item container spacing={1} alignItems="center" justify="flex-end">
                  <Grid item>
                    <Typography variant="subtitle2">
                      {state.dinner.date}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <EventIcon />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} container>
              <Paper className={classes.container} style={{ width: "100%" }}>
                <Grid item xs={12} container justify="space-between" alignItems="center">
                  <Grid item xs spacing={1} container alignItems="center">
                    <Grid item>
                      <Typography>
                        Host: {state.owner.name}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <AverageRating {...state.owner} />
                    </Grid>
                  </Grid>
                  <Grid item>
                    {isAttending ?
                      <Button variant="outlined" onClick={handleLeaveDinner}>Leave dinner</Button> :
                      <Button variant="outlined" onClick={handleJoinDinner}>Join dinner</Button>
                    }
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            {/*-------------------------DETAILS-------------------------*/}
            <Grid item xs={12} md={6}>
              <Paper className={classes.container}>
                <Typography variant="h6" className={classes.textIcon}>Details</Typography>

                <Grid container spacing={1} alignItems="center" justify="flex-start">
                  <Grid item><GroupIcon /></Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      Number of attendants: {state.dinner.attendants}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={1} alignItems="center" justify="flex-start">
                  <Grid item><LocalHospitalIcon /></Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      Allergens: {state.dinner.allergens.split(',').join(', ')}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center" justify="flex-start">
                  <Grid item><CreditCardIcon /></Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      Total expenses: {state.dinner.isDivided ? "" : "None, enjoy a free meal"}
                      {state.dinner.expenses > 0 ? state.dinner.expenses + " kr" : "None yet, check back later for updates"}
                    </Typography>
                  </Grid>
                  <Grid item>
                    {state.dinner.user_id === auth.user.user_id ? <Button variant="outlined" onClick={handleOpen}>
                      Edit expenses
                  </Button> : null}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            {/*------------------------------DESCRIPTION--------------------- */}
            <Grid item xs={12} md={6}>
              <Paper className={classes.container}>
                <Typography variant="h6">Description</Typography>
                <Typography variant="body1">{state.dinner.description}</Typography>
              </Paper>
            </Grid>
            {/*------------------------------Rating--------------------- */}
            <Grid item xs={12}>
              <Paper className={classes.container}>
                <Typography variant="h6">Rating</Typography>
                <br />
                <Grid item xs>
                  <NewRating {...state.owner} />
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        }
      </Paper>
      <form method='POST' onSubmit={handleSubmit}>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edit expenses</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="expenses"
              name="expenses"
              label="Expenses (kr)"
              type="number"
              className='form-field'
              fullWidth
              onChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" onClick={handleClose} color="primary" variant="outlined">
              Confirm
            </Button>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  )
}