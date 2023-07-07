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
import NotFound from "./component/NotFound"; // Import the custom NotFound component
import "./App.css";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [usersList, setUsersList] = useState(users);
  const [authenticated, setAuthenticated] = useState(false); // New state variable

  const handleCreateUser = (newUser) => {
    const updatedUsersList = [...usersList, newUser];
    setUsersList(updatedUsersList);
  };

  const handleLogin = (username, password) => {
    // Check if username and password match the credentials
    if (username === "admin" && password === "pass123") {
      setLoggedIn(true);
      setAuthenticated(true); // Set authenticated to true
    } else {
      setModalTitle("Warning");
      setModalMessage("Invalid credentials. Please try again.");
      setModalOpen(true);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setAuthenticated(false); // Set authenticated to false
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
                {/* Add more routes for the dashboard if needed */}
                <Redirect to="/dashboard" />{" "}
                {/* Redirect to the default dashboard route if no other routes match */}
              </Switch>
            </Dashboard>
          ) : (
            <Redirect to="/404" />
          )}
        </Route>
        <Route path="/404" component={NotFound} />{" "}
        {/* Render the NotFound component for the 404 page */}
        <Redirect to="/404" />{" "}
        {/* Redirect to the 404 page for any other undefined routes */}
      </Switch>
      {modalOpen && (
        <Modal
          message={modalMessage}
          onClose={() => setModalOpen(false)}
          title={modalTitle}
        />
      )}
    </Router>
  );
};

export default App;
