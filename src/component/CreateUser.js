import React from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container, Row, Col, Form as BootstrapForm, Button } from "react-bootstrap";

const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(3, "Minimum 3 characters")
    .max(10, "Maximum 10 characters")
    .matches(/^[A-Za-z ]*$/, "No special characters or numbers allowed")
    .required("First name is required"),
  lastName: Yup.string()
    .min(3, "Minimum 3 characters")
    .max(10, "Maximum 10 characters")
    .matches(/^[A-Za-z ]*$/, "No special characters or numbers allowed")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .max(20, "Maximum 20 characters")
    .required("Email is required"),
  birthDate: Yup.date()
    .max(new Date(), "Birth date cannot be in the future")
    .required("Birth date is required"),
});

const CreateUser = () => {
  const history = useHistory();

  const handleSubmit = (values) => {
    // Perform form validation and create user logic here
    // Display success message in a modal or popup
    // Redirect to the view user page
    console.log(values);
    // Display success message in a modal or popup
    // Redirect to the view user page
    history.push("/dashboard/view-user"); // Redirectto the view user page
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Create User</h1>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              birthDate: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <BootstrapForm.Group>
                  <BootstrapForm.Label htmlFor="firstName">First Name:</BootstrapForm.Label>
                  <Field
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="form-control"
                    required
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>
                <BootstrapForm.Group>
                  <BootstrapForm.Label htmlFor="lastName">Last Name:</BootstrapForm.Label>
                  <Field
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form-control"
                    required
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>
                <BootstrapForm.Group>
                  <BootstrapForm.Label htmlFor="email">Email:</BootstrapForm.Label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    required
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>
                <BootstrapForm.Group>
                  <BootstrapForm.Label htmlFor="birthDate">Birth Date:</BootstrapForm.Label>
                  <Field
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    className="form-control"
                    required
                  />
                  <ErrorMessage
                    name="birthDate"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  Create
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateUser;
