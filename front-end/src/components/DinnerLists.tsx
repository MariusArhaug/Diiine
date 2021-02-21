import React from "react";
import Link from "@material-ui/core/Link";
import { Route, Switch, useRouteMatch } from "react-router-dom";
//import DinnerPage from "./DinnersPage";
import {Link as RouterLink} from 'react-router-dom';

export default function DinnerList() {

    let { path, url } = useRouteMatch();

    return (
        <div>
            <h1>Dinners</h1>
            <Link component={RouterLink} to={`dinner/1`}>Test</Link>
        </div>
        
    )
}