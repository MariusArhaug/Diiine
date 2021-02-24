import { Container } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import DinnerList from '../components/DinnerList';
import DinnerPage from '../components/Dinner';
import Navbar from '../components/Navbar';

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
                        My dinners
                    </Route>
                    <Route path="/chat">
                        Chat
                    </Route>
                    <Route path="/profile">
                        Profile
                    </Route>
                    <Route path="/dinner/:dinnerId">
                        <DinnerPage />
                    </Route>
                </Switch>
            </Container>
        </div>
    )
}