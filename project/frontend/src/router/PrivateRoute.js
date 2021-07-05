import { useAuth } from '../contexts/AuthContext';

import {
    Route,
    Redirect,
    
} from "react-router-dom";
  
// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
    const auth = useAuth();
    
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/sign-in",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
}

export default PrivateRoute;