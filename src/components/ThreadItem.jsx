import React from "react";
import PropTypes from "prop-types";
import { Card, Container } from "react-bootstrap";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { postedAt } from "../utils";

function ThreadItem({ id, title, createdAt, likes, user, authUser, like }) {
  const navigate = useNavigate();
  // const isThreadLiked = likes.includes(authUser);

  const onLikeClick = (event) => {
    event.stopPropagation();
    like(id);
  };

  const onThreadClick = () => {
    navigate(`/threads/${id}`);
  };

  const onThreadPress = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      navigate(`/threads/${id}`);
    }
  };

  return (
    <Container>
      <Card
        tabIndex={0}
        className="thread-item"
        onClick={onThreadClick}
        onKeyDown={onThreadPress}
      >
        <Card.Img variant="top" src={user.photo} alt={user} />
        <Card.Body>
          <Card.Title>
            {user.name}
            {postedAt(createdAt)}
          </Card.Title>
          <Card.Text>{title}</Card.Text>
        </Card.Body>
        <Card.Footer>
          {like && (
            <div>
              <button type="button" onClick={onLikeClick}>
                {/* {isThreadLiked ? (
                <FaHeart style={{ color: "red" }} />
              ) : (
                <FaRegHeart />
              )} */}
              </button>
              {likes.length}
            </div>
          )}
        </Card.Footer>
      </Card>
    </Container>
  );
}

ThreadItem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
};

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  likes: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string.isRequired,
  user: PropTypes.shape(userShape).isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
  like: PropTypes.func,
};

ThreadItem.defaultProps = {
  like: null,
};

export { threadItemShape };

export default ThreadItem;
