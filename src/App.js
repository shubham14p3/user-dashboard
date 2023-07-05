import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Dashboard from "./component/Dashboard";
import ViewUser from "./component/ViewUser";
import CreateUser from "./component/CreateUser";
import Login from "./component/Login";
import Modal from "./component/Modal";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleLogin = (username, password) => {
    // Check if username and password match the credentials
    if (username === "admin" && password === "pass123") {
      setLoggedIn(true);
    } else {
      setModalMessage("Invalid Username or password, Please try again.");
      setModalOpen(true);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setModalMessage("Logout successful.");
    setModalOpen(true);
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {loggedIn ? (
            <Redirect to="/dashboard" />
          ) : (
            <Login handleLogin={handleLogin} />
          )}
        </Route>
        <Route path="/dashboard">
          {loggedIn ? (
            <Dashboard handleLogout={handleLogout}>
              <Switch>
                <Route exact path="/dashboard/view-user" component={ViewUser} />
                <Route
                  exact
                  path="/dashboard/create-user"
                  component={CreateUser}
                />
              </Switch>
            </Dashboard>
          ) : (
            <Redirect to="/" />
          )}
        </Route>
      </Switch>
      {modalOpen && (
        <Modal message={modalMessage} onClose={() => setModalOpen(false)} />
      )}
    </Router>
  );
};

export default App;
