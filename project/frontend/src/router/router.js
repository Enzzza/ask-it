import React from 'react';
import { Switch, Route, BrowserRouter,Link } from 'react-router-dom';
import MainNavigation from '../components/layout/navigation/MainNavigation';
import Home from '../pages/Home';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Account from '../pages/Account';
import PrivateRoute from './PrivateRoute';
import {useAuth} from "../contexts/AuthContext";
export default function Router() {
  const auth = useAuth();
  console.log("User is:",auth.user);
  
  return (
    <BrowserRouter>
      <div>
      
        <MainNavigation />
        {/* <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/account">account</Link>
          </li>
        </ul> */}
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/sign-in'>
            <Signin />
          </Route>
          <Route path='/sign-up'>
            <Signup />
          </Route>
          <PrivateRoute path='/account'>
            <Account />
          </PrivateRoute>
          <Route path="*" component={() => "404 NOT FOUND"}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
