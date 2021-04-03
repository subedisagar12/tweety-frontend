import { useContext, useEffect, useState } from "react";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components Import
import {
  RegisterUser,
  LoginUser,
  HomePage,
  Navbar,
  Followers,
  Following,
  UserDashboard,
} from "./components/ComponentsImport";
import { LoggedInUserContext } from "./API/URL";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useContext(LoggedInUserContext);

  useEffect(() => {
    loggedUser ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [loggedUser]);

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} />

        <Switch>
          <Route path="/:user_id/followers" exact>
            {isLoggedIn ? (
              <HomePage loggedUser={loggedUser} />
            ) : (
              <LoginUser setIsLoggedIn={setIsLoggedIn} />
            )}
          </Route>

          <Route path="/:user_id/following" exact>
            {isLoggedIn ? (
              <HomePage loggedUser={loggedUser} />
            ) : (
              <LoginUser setIsLoggedIn={setIsLoggedIn} />
            )}
          </Route>
          {/* Route for user Registration */}
          <Route path="/user/register" exact>
            <RegisterUser />
          </Route>

          {/* <Route
            path="/:user_id/followers"
            exact
            component={() => <Followers isLoggedIn={isLoggedIn} />}
          /> */}

          <Route path="/user/:user_id" exact>
            <UserDashboard />
          </Route>

          <Route path="/">
            {isLoggedIn ? (
              <HomePage loggedUser={loggedUser} />
            ) : (
              <LoginUser setIsLoggedIn={setIsLoggedIn} />
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
