import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import logo_white from "../media/logo_white.svg";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";

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
      width: "100%",
    },
    logo: {
      height: "35px",
      padding: "10px",
    },
    profile: {
      marginLeft: "auto",
    },
  })
);

export default function ButtonAppBar() {
  const classes = useStyles();
  const auth = useAuth();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.navbar}>
      <img src={logo_white} className={classes.logo} alt="logo" />
      {auth.user && (
        <Container maxWidth="lg">
          <div className={classes.navigation}>
            <Tabs value={value} onChange={handleChange}
              TabIndicatorProps={{
                style: {
                  height: 3,
                  background: "#cf340d",
                },
              }}
            >
              <Tab component={RouterLink} to="/dinners" label="Dinners" />
              <Tab component={RouterLink} to="/my_dinners" label="New dinner" />
              <Tab component={RouterLink} to="/chat" label="Chat" />
              {auth.user.isAdmin ? <Tab component={RouterLink} to="/admin" label="Admin" /> : null}
            </Tabs>
            <IconButton
              component={RouterLink}
              to="/profile"
              className={classes.profile}
              color="inherit"
              aria-label="menu"
            >
              {
                // We need to check whether someone is logged on to then take them to login page or show profile page
              }
              <AccountCircle />
            </IconButton>
          </div>
        </Container>
      )}
    </div>
  );
}
