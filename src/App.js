import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "./component/Dashboard";
import ViewUser from "./component/ViewUser";
import CreateUser from "./component/CreateUser";
import Login from "./component/Login";
import Modal from "./component/Modal";
import DashboardPage from "./component/DashboardPage";
import users from "./data/users.json";
import NotFound from "./component/NotFound";
import "./App.scss";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [usersList, setUsersList] = useState(users);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Load users list from local storage on component mount
    const storedUsersList = localStorage.getItem("usersList");
    if (storedUsersList) {
      setUsersList(JSON.parse(storedUsersList));
    }
  }, []);

  useEffect(() => {
    // Save users list to local storage whenever new user is added
    localStorage.setItem("usersList", JSON.stringify(usersList));
  }, [usersList]);

  // New useEffect to watch for changes in the users.json file
  useEffect(() => {
    // Update the usersList when the users data changes
    setUsersList(users);
    localStorage.setItem("usersList", JSON.stringify(users));
  }, [users]);

  const handleCreateUser = (newUser) => {
    const updatedUsersList = [...usersList, newUser];
    setUsersList(updatedUsersList);
  };

  const handleLogin = (username, password) => {
    // Checking if username and password are correct
    if (username === "admin" && password === "pass123") {
      setLoggedIn(true);
      setAuthenticated(true); // Successfully login if true credentials
    } else {
      setModalTitle("Warning");
      setModalMessage("Invalid credentials. Please try again.");
      setModalOpen(true);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setAuthenticated(false);
    setModalTitle("Logout");
    setModalMessage("Logout successful.");
    setModalOpen(true); // Opening modal if logout successfully
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/dashboard" /> : <Login handleLogin={handleLogin} />}
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
                <Route exact path="/dashboard/" render={() => <DashboardPage />} />
                <Redirect to="/404" />
                {/* Redirect to the dashboard route if no other routes match */}
              </Switch>
            </Dashboard>
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route path="/404" component={NotFound} /> {/* Render the NotFound component for the 404 page */}
        <Redirect to="/404" /> {/* Redirect to the 404 page for any other undefined pages */}
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
