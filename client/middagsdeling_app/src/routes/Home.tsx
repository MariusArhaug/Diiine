import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Home() {

    let { path } = useRouteMatch();

    return (
        <div>
            <Navbar />
            <div className="MainContainer">
                <Switch>
                    <Route path="/dinners">
                        Dinner list
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
                </Switch>
            </div>
        </div>
    )
}