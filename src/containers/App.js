import React from 'react'
import { useSelector } from "react-redux";
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import {history} from "../utils/history"
import "../asset/style/style.scss"
import Login from "./authentication/Login"
import Registration from "./user/Registration"
import Dashboard from "./Dashboard"
import Profile from './user/Profile';
import MyPositionFavourite from './seekers/MyPositionFavourite';
import ViewJobs from './jobs/ViewJobs';
import CreateEditJobs from './recruiters/CreateEditJobs';

  function App() {

    const PrivateRoute = ({ component: Component, auth, ...rest }) => (
      <Route {...rest} render={props => auth === true
        ? <Component auth={auth} {...props} />
        : <Redirect to={{ pathname: '/login' }} />
      }
      />
    )
    const authState = useSelector(state => state.auth.loggedIn)

    return (
      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/registration" component={Registration} />
          <PrivateRoute path="/" exact component={Dashboard} auth={authState} />
          <PrivateRoute path="/profile" exact component={Profile} auth={authState} />
          <PrivateRoute path="/favourite" exact component={MyPositionFavourite} auth={authState} />
          <PrivateRoute path="/jobs/:id" exact component={ViewJobs} auth={authState} />
          <PrivateRoute path="/createeditjobs/:id?" exact component={CreateEditJobs} auth={authState} />

          <Redirect from="*" to="/" />
        </Switch>
      </Router>

    );
  }

  export default App;
