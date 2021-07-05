import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import MainNavigation from '../components/layout/navigation/MainNavigation';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Account from '../pages/Account';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';
import PrivateRoute from './PrivateRoute';
import {useAuth} from "../contexts/AuthContext";
export default function Router() {
  const auth = useAuth();
  
  return (
    <BrowserRouter>
      <div>
      
        <MainNavigation />
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/sign-in'>
            <SignIn />
          </Route>
          <Route path='/sign-up'>
            <SignUp />
          </Route>
          <Route path='/user/profile/:id'>
            <Profile />
          </Route>
          <PrivateRoute path='/account'>
            <Account />
          </PrivateRoute>
          <Route path="*" component={NotFound}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
