import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  IoChatboxEllipsesOutline,
  IoChatboxEllipses,
  IoBarChart,
  IoPerson,
} from "react-icons/io5";
function Navigation({ authUser }) {
  const { id, photo, name } = authUser;
  return (
    <Navbar fixed="bottom" bg="light" className="border-top">
      <Container>
        <Nav className="w-100 gap-5 justify-content-center" variant="tabs">
          <Nav.Item>
            <Nav.Link as={Link} to="/">
              <div className="d-flex align-items-center flex-column gap-2">
                <IoChatboxEllipses />
                <span>Threads</span>
              </div>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/leaderboard">
              <div className="d-flex align-items-center flex-column gap-2">
                <IoBarChart />
                <span>Leaderboards</span>
              </div>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/profile">
              <div className="d-flex align-items-center flex-column gap-2">
                <IoPerson />
                <span>Profile</span>
              </div>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
}

Navigation.propTypes = {
  authUser: PropTypes.shape({
    id: PropTypes.string,
    photo: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default Navigation;
