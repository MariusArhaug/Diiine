import React from 'react';
import ListComponent from '../components/ListComponent';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { DoneOutlineRounded } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            margin: 'auto',
            maxWidth: 500,
        },
        image: {
            width: 128,
            height: 128,
        },
        img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
        },
    }),
);

export type Dinner = {
    name: string;
    description: string;
}

const dinner1: Dinner = {
    name: "test",
    description: "desc"
}
const dinner2: Dinner = {
    name: "test2",
    description: "desc2"
}
const dinner3: Dinner = {
    name: "test3",
    description: "desc3"
}

const dinners: Dinner[] = [dinner1, dinner2, dinner3];

export default function ComplexGrid() {
    const classes = useStyles();

    /* Avatar: use userInfo 
       Text_primary: Use name of dinner
       Text_secondary: Where Ali Connors is placed, use userName
       Text_tertiary: Short description of the dinner, what to have etc. Implement in ListComponent
      */

    return (
        <div className={classes.root}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Grid container spacing={3} direction="column" justify="space-evenly" alignItems="stretch">
                        {dinners.map(dinner => (
                            <Grid item>
                                <ListComponent {...dinner} />
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </Grid>
        </div>
        // <List className={classes.root}>
        //   <ListItem alignItems="flex-start">
        //     <ListItemAvatar>
        //       <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> 
        //     </ListItemAvatar>
        //     <ListItemText
        //       primary= "dinner.getName()"
        //       secondary={
        //         <React.Fragment>
        //           <Typography
        //             component="span"
        //             variant="body2"
        //             className={classes.inline}
        //             color="textPrimary"
        //           >
        //             Ali Connors
        //           </Typography>
        //           {" — I'll be in your neighborhood doing errands this…"}
        //         </React.Fragment>
        //       }
        //     />
        //   </ListItem>
        //   <Divider variant="inset" component="li" />
        //   <ListItem alignItems="flex-start">
        //     <ListItemAvatar>
        //       <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        //     </ListItemAvatar>
        //     <ListItemText
        //       primary="Summer BBQ"
        //       secondary={
        //         <React.Fragment>
        //           <Typography
        //             component="span"
        //             variant="body2"
        //             className={classes.inline}
        //             color="textPrimary"
        //           >
        //             to Scott, Alex, Jennifer
        //           </Typography>
        //           {" — Wish I could come, but I'm out of town this…"}
        //         </React.Fragment>
        //       }
        //     />
        //   </ListItem>
        //   <Divider variant="inset" component="li" />
        //   <ListItem alignItems="flex-start">
        //     <ListItemAvatar>
        //       <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        //     </ListItemAvatar>
        //     <ListItemText
        //       primary="Oui Oui"
        //       secondary={
        //         <React.Fragment>
        //           <Typography
        //             component="span"
        //             variant="body2"
        //             className={classes.inline}
        //             color="textPrimary"
        //           >
        //             Sandra Adams
        //           </Typography>
        //           {' — Do you have Paris recommendations? Have you ever…'}
        //         </React.Fragment>
        //       }
        //     />
        //   </ListItem>
        // </List>
    );
}