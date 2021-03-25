import { useContext, useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components Import
import {
  RegisterUser,
  LoginUser,
  HomePage,
  Navbar,
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

          {/* Route for user Registration */}
          <Route path="/user/register" exact>
            <RegisterUser />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
