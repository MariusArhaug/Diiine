import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../../styles';
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, TextField } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import GroupIcon from '@material-ui/icons/Group';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import { useHistory, useLocation } from 'react-router-dom';
import { Dinner } from '../../types';
import client from '../../feathers-client';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import { useAuth } from '../../hooks/use-auth';
import RatingDOM from '@material-ui/lab/Rating';
import RatingContainer from '../../components/RatingContainer';
import DeleteButton from '../Admin/DeleteButton';
import { SuccessAlert, ErrorAlert } from '../../hooks/Alerts';
import ShowAttendants from './ShowAttendants';
import Modal from '@material-ui/core/Modal';

export default function DinnerInfo() {
  const { state: { dinnerFromLocation } }: { state: { dinnerFromLocation: Dinner } } = useLocation();
  const classes = useStyles();
  const auth = useAuth();

  const [dinner] = useState<Dinner>(dinnerFromLocation);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isAttending, setAttending] = useState(dinner.attendants.some((attend) => attend.user_id === auth.user.user_id));


  const handleJoinDinner = () => {
    const data = {
      dinners_id: dinner!.dinners_id,
      user_id: auth.user.user_id,
    }
    client.service('attendingdinners')
      .create(data)
      .then(() => {
        SuccessAlert('Hurray', 'You have now joined the dinner!', 'Nice!')
        setAttending(true);
      })
      .catch((e: Error) => {
        ErrorAlert('Error!', e.message, 'Understand');
      });
  }

  const handleLeaveDinner = () => {
    client.service('attendingdinners').find({
      query: {
        dinners_id: dinner!.dinners_id,
        user_id: auth.user.user_id,
      }
    }).then((res: any) => {
      const row: { user_id: number, dinners_id: number, secondary_pk: number } = res.data[0];
      client.service('attendingdinners')
        .remove(row.secondary_pk)
        .then(() => {
          SuccessAlert('Left dinner!', 'You have now left the dinner!', 'Done');
          setAttending(false);
        }).catch((e: Error) => console.log(e));
    }).catch((e: Error) => console.log(e));
  }

  const history = useHistory();
  const handleEditClick = () => {
    history.push({
      pathname: `/editdinner/${dinner.dinners_id}`,
      state: {
        dinnerFromLocation: dinner,
      }
    })
  }

  return (
    <div className={classes.spacer}>
      <Paper className={classes.spacer} style={{ textAlign: "left" }}>
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
              {dinner.owner.user_id === auth.user.user_id || auth.user.isAdmin ? <Button onClick={handleEditClick}>Edit</Button> : <p />}
              {dinner.owner.user_id === auth.user.user_id || auth.user.isAdmin ? <DeleteButton {...{ type: 'dinners', id: dinner.dinners_id }} /> : <p />}
            </Grid>
            <Grid xs item style={{ textAlign: "left", marginBottom: "1.5rem" }}>
              <Typography variant="caption" color="textSecondary">
                {dinner.address}
              </Typography>
              {/*---------------DINNER NAME ETC-------------------------*/}
              <Typography variant="h4">{dinner.title}</Typography>
              <Grid item container spacing={1} justify="flex-start">
                {dinner.tags.split(',').map(a => (
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
                    {dinner.isOpen ? "Open dinner" : "Private dinner"}
                  </Typography>
                </Grid>
                <Grid item>
                  {dinner.isOpen ? <LockOpenIcon /> : <LockOutlinedIcon />}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} container>
              <Paper className={classes.container} style={{ width: "100%" }}>
                <Grid item xs={12} container justify="space-between" alignItems="center">
                  <Grid item xs spacing={1} container alignItems="center">
                    <Grid item>
                      <Typography>
                        Host: {dinner.owner.name}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <RatingDOM
                        name="rating_value"
                        precision={0.1}
                        value={dinner.owner.avg_rating}
                        readOnly
                      />
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
          </Grid>
          {/*-------------------------DETAILS-------------------------*/}
          <Grid item xs={12} md={6}>
            <Paper className={classes.container}>
              <Typography variant="h6" className={classes.textIcon}>Details</Typography>
              <Grid container spacing={1} alignItems="center" justify="flex-start">
                <Grid item><GroupIcon /></Grid>
                <Grid item>
                  <Typography variant="subtitle1">
                    Number of attendants: {dinner.attendants.length}
                  </Typography>
                </Grid>
                <Grid item>
                  {dinner.attendants.length > 0 ? (
                    <Grid item>
                      <Button onClick={() => setOpenModal(true)} variant="outlined">Show attendants</Button>
                      <Modal open={openModal} onClose={() => setOpenModal(false)} >
                        <ShowAttendants {...dinner} />
                      </Modal>
                    </Grid>)
                    : null}
                </Grid>
                <Grid container spacing={1} alignItems="center" justify="flex-start">
                  <Grid item><LocalHospitalIcon /></Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      Allergens: {dinner.allergens.split(',').join(', ')}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container spacing={1} alignItems="center" justify="flex-start">
                <Grid item><CreditCardIcon /></Grid>
                <Grid item>
                  <Typography variant="subtitle1">
                    Total expenses: {dinner.isDivided ? "" : "None, enjoy a free meal"}
                    {dinner.isDivided && dinner.expenses === 0 ? "None yet, check back later for updates" : ""}
                    {dinner.expenses > 0 ? dinner.expenses + " kr" : ""}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          {/*------------------------------DESCRIPTION--------------------- */}
          <Grid item xs={12} md={6}>
            <Paper className={classes.container}>
              <Typography variant="h6">Description</Typography>
              <Typography variant="body1">{dinner.description}</Typography>
            </Paper>
          </Grid>
          {/*------------------------------Rating--------------------- */}
          <Grid item xs={12}>
            <Paper className={classes.container}>
              <Typography variant="h6">Rating</Typography>
              <br />
              <Grid item xs>
                <RatingContainer {...dinner.owner} />
              </Grid>
            </Paper>
          </Grid>
        </Grid >
      </Paper >
    </div >
  )
}