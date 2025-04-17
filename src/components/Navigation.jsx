import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Navigation({ authUser, onLogout }) {
  const { id, photo, name } = authUser;
  return (
    <Nav className="justify-content-center" bg="light" expand="lg">
      <Nav.Item>
        <Nav.Link as={Link} to="/">
          Home
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/leaderboard">
          Leaderboard
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

Navigation.propTypes = {
  id: PropTypes.string,
  photo: PropTypes.string,
  name: PropTypes.string,
  onLogout: PropTypes.func.isRequired,
};

export default Navigation;
