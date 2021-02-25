import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import logo_white from '../media/logo_white.svg';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        navbar: {
            padding: "0",
            backgroundColor: "#e76f51",
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

    let { url } = useRouteMatch();

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className={classes.navbar}>
            <img src={logo_white} className={classes.logo} />
            <Container maxWidth="lg">
                <div className={classes.navigation}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab component={RouterLink} to="/dinners" label="Dinners" />
                        <Tab component={RouterLink} to="/my_dinners" label="New dinner" />
                        {/* <Tab component={RouterLink} to="/chat" label="Chats" /> */}
                        <Tab component={RouterLink} to="/login" label="Login" />
                        <Tab component={RouterLink} to="/admin" label="Admin" />
                    </Tabs>

                    <IconButton component={RouterLink} to="/profile" className={classes.profile} color="inherit" aria-label="menu">
                        {// We need to check whether someone is logged on to then take them to login page or show profile page
                        }
                        <AccountCircle />
                    </IconButton>
                </div>
            </Container>
            
        </div>
    );
}
