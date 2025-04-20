import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
const ProfilePage = ({ profile, onSignOut }) => {
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center py-5"
    >
      <Card className="w-50">
        <Card.Body>
          <Card.Title>
            <h5>Profile</h5>
          </Card.Title>
          <Card.Text className="d-flex gap-3 align-items-center">
            <img src={profile.avatar} alt="profile" />
            <div>
              <h4>@{profile.name}</h4>
              <p className="text-muted">{profile.email}</p>
            </div>
          </Card.Text>
          <Button
            onClick={() => {
              onSignOut();
            }}
            className="w-100"
            variant="outline-secondary"
          >
            Logout
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfilePage;

ProfilePage.propTypes = {
  profile: PropTypes.object.isRequired,
  onSignOut: PropTypes.func.isRequired,
};

