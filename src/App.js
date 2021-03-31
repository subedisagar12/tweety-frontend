import { useContext, useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components Import
import {
  RegisterUser,
  LoginUser,
  HomePage,
  Navbar,
  Followers,
  Following,
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
        <Navbar />
        <Switch>
          <Route path="/" exact>
            {isLoggedIn ? (
              <HomePage loggedUser={loggedUser} />
            ) : (
              <LoginUser setIsLoggedIn={setIsLoggedIn} />
            )}
          </Route>

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
          <Route path="/:user_id/following" exact>
            <Following />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
