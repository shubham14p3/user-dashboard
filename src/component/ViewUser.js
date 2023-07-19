import React from "react";
import { Table } from "react-bootstrap";
const ViewUser = ({ users }) => {
  return (
    <div>
      <h2>View User</h2>
      <Table striped bordered hover respoive>
        <thead>
          <tr className="table-primary">
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Birth Date</th>
          </tr>
        </thead>
        <tbody className="table-light">
          {users && users.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.birthDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default ViewUser;
