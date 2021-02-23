import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import DinnerList from '../components/DinnerList';
import DinnerPage from '../components/DinnerPage';
import Navbar from '../components/Navbar';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { Link as RouterLink } from 'react-router-dom';
import NewDinner from '../components/newDinner';

export default function Home() {

    let { path } = useRouteMatch();

    return (
        <div>
            <Navbar />
            <Container maxWidth="lg" className="MainContainer">
                <Switch>
                    <Route path="/dinners">
                        <DinnerList />
                    </Route>
                    <Route path="/my_dinners">
                        <br/>
                        <h1>MY DINNERS</h1>
                        <br/>
                        <br/>
                        <h5>Add new dinner</h5>
                        <IconButton component={RouterLink} to='/newdinner' color="inherit" area-label="add">
                            <AddIcon />
                            </IconButton>
                    </Route>
                    <Route path="/chat">
                        Chat
                    </Route>
                    <Route path="/profile">
                        Profile
                    </Route>
                    <Route path="/newdinner">
                        <NewDinner />
                  </Route>
                    <Route path="/dinner/:dinnerId">
                        <DinnerPage />
                    </Route>
                </Switch>
            </Container>
        </div>
    )
}