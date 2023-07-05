import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const CreateUser = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form validation and create user logic here
    // Display success message in a modal or popup
    // Redirect to the view user page
  };

  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            required
          />
        </label>
        {/* Add other input fields for Last Name, Email, and Birth Date */}
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateUser;
