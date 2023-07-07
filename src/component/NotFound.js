import React from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

const NotFound = () => {
  return (
    <Container className="text-center">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">
        <Button variant="primary">Go Back to Home</Button>
      </Link>
    </Container>
  );
};

export default NotFound;
