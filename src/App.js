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
import users from "./data/users.json";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [usersList, setUsersList] = useState(users);

  const handleCreateUser = (newUser) => {
    const updatedUsersList = [...usersList, newUser];
    setUsersList(updatedUsersList);
  };

  const handleLogin = (username, password) => {
    // Check if username and password match the credentials
    if (username === "admin" && password === "pass123") {
      setLoggedIn(true);
    } else {
      setModalMessage("Invalid credentials. Please try again.");
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
                <Route
                  exact
                  path="/dashboard/view-user"
                  render={() => <ViewUser users={usersList} />}
                />
                <Route
                  exact
                  path="/dashboard/create-user"
                  render={() => <CreateUser onCreateUser={handleCreateUser} />}
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
