import React, { useCallback, useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Rating, { IconContainerProps } from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import client from '../feathers-client';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import { User } from '../types';
import Alert from '@material-ui/lab/Alert';
import CheckIcon from '@material-ui/icons/Check';
import swal from 'sweetalert';
import '../styles/App.css';




const StyledRating = withStyles({
    iconFilled: {
        color: '#ff6d75',
    },
    iconHover: {
        color: '#ff3d47',
    },
})(Rating);

export default function CustomizedRatings(props: User) {

    const [state, setState] = useState<{
        rated_of: number;
        rating_value: number;
        description: string;
    }>({
        rated_of: props.user_id,
        rating_value: 2.5,
        description: "",
    })

    // const [alert, setAlert] = useState(0)

    // const userId = 1;

    // useEffect(() => {
    //     client.service("rating")
    //         .get(userId)
    //         .then((res: any) => {
    //             setRating(res);
    //         })
    // })

    const handleRatingChange = (event: any): void => {
        setState({...state, rating_value: event.target.value})
    }

    const handleCommentChange = (event: any): void => {
        setState({...state, description: event.target.value})
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        console.log(state);

        const rating = await client.service('rating').create(state)
          .catch((e: Error) => {
            console.log('couldn\'t post rating', e)
          });
        swal({
            title: 'Good job!',
            text: 'You have now sucessfully rated this user!',
            icon: 'success',
            buttons: {
                confirm: {
                    text: "Nice!",
                    className: "buttonStyle"
                }
            }
        });
    }
          
    

    return (
        <div>
            <form method='POST' onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="legend">Give user rating</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Rating
                            name="rating"
                            onChange={handleRatingChange}
                            precision={0.5}
                            emptyIcon={<StarBorderIcon fontSize="inherit" />}
                        />
                    </Grid>
                    
                    <Grid item xs={12}>
                        <TextField
                            id='comment'
                            label='Type user comment'
                            className='form-field'
                            type='comment'
                            name='comment'
                            style={{width: "100%"}}
                            onChange={handleCommentChange}
                            multiline
                            rowsMax={4}
                            variant="outlined"
                            rows = {2}

                            />
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Button type='submit' variant="contained" color="primary" style={{width: "100%"}}>
                            Give rating
                        </Button>
                    </Grid>
                    
                </Grid>
            </form>
        </div>
    );
}

