import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../../styles';
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, TextField } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import GroupIcon from '@material-ui/icons/Group';
import EventIcon from '@material-ui/icons/Event';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import { useHistory, useParams } from 'react-router-dom';
import { Dinner, User } from '../../types';
import client from '../../feathers-client';
import Rating from '@material-ui/lab/Rating';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import { useAuth } from '../../hooks/use-auth';
import DeleteIcon from '@material-ui/icons/Delete';
//import Button from '@material-ui/core/Button';

// {dinnerId, name, address, type, allergens, attendants, date}: DinnerProps

export default function DinnerInfo() {

  const classes = useStyles();
  const auth = useAuth();
  let { dinnerId }: { dinnerId: string } = useParams();
  const [ratingValue, setRatingValue] = useState(0);

  const [state, setState] = useState<{ owner: User | null, dinner: Dinner | null }>({
    owner: null,
    dinner: null
  });

  const [open, setOpen] = useState(false);
  const user: User = useAuth().user;

  const handleJoinDinner = () => {
    const data = {
      dinners_id: parseInt(dinnerId, 10)
    }
    client.service('attendingdinners').create(data)
    alert("You have now joined the dinner!");
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    /* if (state.dinner) {
      let data = {
        expenses: state.dinner.expenses
      }
      client.service('dinners').patch(state.dinner.dinners_id, data)
      .then()
      .catch((e: Error) => {
        console.log(e);
      })
    } */
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (state.dinner) {
      state.dinner.expenses = Number.parseFloat(event.target.value);
    }
  }

  useEffect(() => {
    let dinner: Dinner;
    client.service('dinners')
      .get(dinnerId)
      .then((resDinner: Dinner) => {
        dinner = resDinner;
        client.service('users')
          .get(dinner.user_id)
          .then((resOwner: User) => {
            setState({ dinner: resDinner, owner: resOwner })
          })
      })
      .catch((e: Error) => { console.log('error', e); })
  }, [dinnerId]);

  console.log(state)

  const history = useHistory();

  const handleDeleteClick = () => {
    console.log("deleted")
    client.service('dinners').remove(dinnerId)
      .then()
      .catch((e: Error) => {
        console.log('couldn\'t delete dinner', e);
      });
  }

  const handleEditClick = () => {
    history.push('/editdinner/' + state.dinner!.dinners_id);
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
                      <Rating
                        name="simple-controlled"
                        value={4}
                        readOnly
                      />
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" onClick={handleJoinDinner}>
                      Join dinner
                    </Button>
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