import { Container } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import DinnerPage from '../pages/Dinners/Dinners';
import Navbar from '../components/Navbar';
import MyDinners from '../pages/Dinners/CreateDinner';
import Profile from '../components/Profile';
import Admin from '../components/Admin';

export default function Home() {

    let { path } = useRouteMatch();

    return (
        <div>
            <Navbar />
            <Container maxWidth="lg" className="MainContainer">
                <Switch>
                    <Route path="/dinners">
                        <DinnerPage />
                    </Route>
                    <Route path="/admin">
                        <Admin />
                    </Route>
                    <Route path="/my_dinners">
                        <MyDinners />
                    </Route>
                    <Route path="/chat">
                        Chat
                    </Route>
                    <Route path="/profile">
                        <Profile />
                    </Route>
                    <Route path="/dinner/:dinnerId">
                        <DinnerPage />
                    </Route>
                </Switch>
            </Container>
        </div>
    )
}