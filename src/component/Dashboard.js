import React from "react";
import { Link, Route, Redirect } from "react-router-dom";
import { Nav, NavItem, Button } from "react-bootstrap";

const Dashboard = ({ handleLogout, children }) => {
  return (
    <div>
      <div className="navigation bg-primary">
        <Nav data-bs-theme="dark">
          <NavItem>
            <Link className="nav-link text-light" to="/dashboard/view-user">
              View User
            </Link>
          </NavItem>
          <NavItem>
            <Link className="nav-link text-light" to="/dashboard/create-user">
              Create User
            </Link>
          </NavItem>
        </Nav>
        <Button variant="primary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <div className="content">{children}</div>
    </div>
  );
};

export default Dashboard;
