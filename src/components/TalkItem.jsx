import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { postedAt } from "../utils";

function TalkItem({ id, text, createdAt, likes, user, authUser, like }) {
  const navigate = useNavigate();
  const isTalkLiked = likes.includes(authUser);

  const onLikeClick = (event) => {
    event.stopPropagation();
    like(id);
  };

  const onTalkClick = () => {
    navigate(`/talks/${id}`);
  };

  const onTalkPress = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      navigate(`/talks/${id}`);
    }
  };

  return (
    <Card
      tabIndex={0}
      className="talk-item"
      onClick={onTalkClick}
      onKeyDown={onTalkPress}
    >
      <Card.Img variant="top" src={user.photo} alt={user} />
      <Card.Body>
        <Card.Title>
          {user.name}
          {postedAt(createdAt)}
        </Card.Title>
        <Card.Text>
          {user.id} {text}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        {like && (
          <div>
            <button type="button" onClick={onLikeClick}>
              {isTalkLiked ? (
                <FaHeart style={{ color: "red" }} />
              ) : (
                <FaRegHeart />
              )}
            </button>
            {likes.length}
          </div>
        )}
      </Card.Footer>
    </Card>
  );
}

TalkItem.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
};

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
};

const talkItemShape = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  likes: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string.isRequired,
  user: PropTypes.shape(userShape).isRequired,
};

TalkItem.propTypes = {
  ...talkItemShape,
  like: PropTypes.func,
};

TalkItem.defaultProps = {
  like: null,
};

export { talkItemShape };

export default TalkItem;
