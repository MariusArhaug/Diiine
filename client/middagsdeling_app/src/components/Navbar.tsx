import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import logo_white from '../media/logo_white.svg';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        navbar: {
            padding: "0 25vw",
            backgroundColor: "#1d3557",
            color: "white",
        },
        navigation: {
            display: "flex",
            alignItems: "center",
        },
        logo: {
            height: "35px",
            padding: "10px"
        },
        profile: {
            marginLeft: "auto",
        },
    }),
);

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.navbar}>
            <img src={logo_white} className={classes.logo}/>
            <div className={classes.navigation}>
                <Tabs>
                    <Tab label="Dinners" />
                    <Tab label="My Dinners" />
                    <Tab label="Chats" />
                </Tabs>
                
                <IconButton className={classes.profile} color="inherit" aria-label="menu">
                    <AccountCircle />
                </IconButton>
            </div>
        </div>
    );
}
