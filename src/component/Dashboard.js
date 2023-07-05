import React from "react";
import { Link, Route, Redirect } from "react-router-dom";

const Dashboard = ({ handleLogout, children }) => {
  return (
    <div>
      <div className="navigation">
        <Link to="/dashboard/view-user">View User</Link>
        <Link to="/dashboard/create-user">Create User</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="content">{children}</div>
    </div>
  );
};

export default Dashboard;
