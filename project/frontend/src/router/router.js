import React, { useEffect } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import MainNavigation from '../components/layout/navigation/MainNavigation';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Account from '../pages/Account';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';
import PrivateRoute from './PrivateRoute';
import Answers from '../pages/Answers';
import { useAuth } from '../contexts/AuthContext';
import UserQuestions from '../pages/UserQuestions';
import NewQuestion from '../pages/NewQuestion';
import Edit from '../pages/Edit';
export default function Router() {
  const auth = useAuth();
  useEffect(() => {
    auth.me();
  }, []);

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
          <Route path='/users/profile/:id'>
            <Profile />
          </Route>
          <Route path='/users/questions/:userId'>
            <UserQuestions />
          </Route>
          <Route path='/answers/:questionId'>
            <Answers />
          </Route>
          <Route path='/edit/:postId'>
            <Edit />
          </Route>
          <PrivateRoute path='/ask'>
            <NewQuestion />
          </PrivateRoute>
          <PrivateRoute path='/account'>
            <Account />
          </PrivateRoute>

          <Route path='*' component={NotFound}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
