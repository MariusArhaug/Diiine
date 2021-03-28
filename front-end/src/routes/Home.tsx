import { Container } from '@material-ui/core';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import DinnerList from '../pages/Dinners/DinnerList';
import DinnerInfo from '../pages/Dinners/DinnerInfo';
import MyDinners from '../pages/Dinners/CreateDinner';
import Profile from '../pages/User/Profile';
import Admin from '../pages/Admin/Admin';
import { useAuth } from '../hooks/use-auth';
import Chat from '../pages/Chat/Chat';

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
            <Chat />
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
            <DinnerInfo />
          </Route>
        </Switch>
      </Container>
    </div>
  )
}