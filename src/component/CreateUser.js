import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Modal from "./Modal";
import * as Yup from "yup";
import {
  Container,
  Row,
  Col,
  Form as BootstrapForm,
  Button,
} from "react-bootstrap";

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

const CreateUser = ({ onCreateUser }) => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false); // setting modal visibility as false
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const handleSubmit = (values) => {
    // form validation 
    // Display success message in a modal popup
    onCreateUser(values);
    setModalMessage(
      `Hi ${values.firstName} ${values.lastName}  you have sucessfully registered with following Email: ${values.email} and DOB: ${values.birthDate}  `
    );
    setModalTitle("User Created Successfully");
    setShowModal(true); // open the modal after creating the user
  };

  const handleCloseModal = () => {
    setShowModal(false);
    history.push("/dashboard/view-user"); // Redirect to the view user page after closing the modal
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
                  <BootstrapForm.Label htmlFor="firstName">
                    First Name:
                  </BootstrapForm.Label>
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
                  <BootstrapForm.Label htmlFor="lastName">
                    Last Name:
                  </BootstrapForm.Label>
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
                  <BootstrapForm.Label htmlFor="email">
                    Email:
                  </BootstrapForm.Label>
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
                  <BootstrapForm.Label htmlFor="birthDate">
                    Birth Date:
                  </BootstrapForm.Label>
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
                
                <Button  className="user-register-button" type="submit" variant="primary" disabled={isSubmitting}>
                  Create
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
      {showModal && (
        <Modal
          onClose={handleCloseModal}
          title={modalTitle}
          message={modalMessage}
        />
      )}
    </Container>
  );
};

export default CreateUser;
