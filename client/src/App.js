import React from 'react';
import './App.css'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Main from './pages/Main/Main';
import User from './pages/User/User';

const App = () => {
  const getSession = () => {
    const id = localStorage.getItem('id');
    if (id) {
      return true;
    }
    return false;
  }
  return (
    <BrowserRouter>
        <Switch>
          <Route path="/" exact render={() => (getSession() ? (<Main/>) : (<Redirect to="/login" />) )} />
          <Route path="/login"  component={Login} />
          <Route path="/register"  component={Register} />
          <Route path="/user/register" component={User}/>
          <Route path="/user/:id/edit"  component={User} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
