import { Container } from '@material-ui/core';
import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import DinnerList from '../components/DinnerList';
import DinnerPage from '../components/DinnerPage';
import MyDinners from '../components/CreateDinner';
import Profile from '../components/Profile';
import Admin from '../components/Admin';
import ChatPrototype from '../components/ChatPrototype';
import { useAuth } from '../hooks/use-auth';

export default function Home() {

    const auth = useAuth();
    let { path } = useRouteMatch();

    if (!auth.user) {
        return <Redirect to="/login" />
    }

    return (
        <div>
            <Container maxWidth="lg" className="MainContainer">
                <Switch>
                    <Route path="/chat">
                        <ChatPrototype />
                    </Route>
                    <Route path="/dinners">
                        <DinnerList />
                    </Route>
                    <Route path="/admin">
                        <Admin />
                    </Route>
                    <Route path="/my_dinners">
                        <MyDinners />
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