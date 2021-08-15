import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';

const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Login}></Route>
      <Route path='/dashboard' render={(props) => <Dashboard {...props} />}/>
    </Switch>
  );
}

export default Main;