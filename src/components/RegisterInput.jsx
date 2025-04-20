import React from "react";
import useInput from "../hooks/useInput";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";

function RegisterInput({ register }) {
  const [name, handleNameChange] = useInput("");
  const [email, handleEmailChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    register({ name, email, password });
  };

  return (
    <Form onSubmit={onSubmitHandler}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" value={name} onChange={handleNameChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" value={email} onChange={handleEmailChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </Form.Group>
      <Button variant="secondary" className="w-100" type="submit">
        Register
      </Button>
    </Form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
