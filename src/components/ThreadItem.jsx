import React from "react";
import PropTypes from "prop-types";
import { Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { postedAt } from "../utils";
import parser from "html-react-parser";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { MdOutlineThumbUp, MdOutlineThumbDown } from "react-icons/md";

function ThreadItem({
  id,
  title,
  createdAt,
  category,
  body,
  upVotesBy,
  downVotesBy,
  totalComments,
}) {
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
    <Card className="my-3" key={id}>
      <Card.Body>
        <Card.Title>
          <div className="category">
            <span
              className="category-name text-secondary border-dark border rounded px-2 py-1"
              style={{ fontSize: "13px" }}
            >{`#${category}`}</span>
          </div>
          <div
            className="title fw-bold text-primary mt-3"
            onClick={onThreadClick}
            onKeyDown={onThreadPress}
            role="button"
            tabIndex={0}
          >
            {title}
          </div>
        </Card.Title>
        <Card.Text>
          <div className="content">{parser(body)}</div>
          <div className="upvotes_downvotes_comments_created-at mt-2 d-flex gap-2">
            <div className="upvotes d-flex align-items-center gap-1">
              <MdOutlineThumbUp />
              <span>{upVotesBy.length}</span>
            </div>
            <div className="downvotes d-flex align-items-center gap-1">
              <MdOutlineThumbDown />
              <span>{downVotesBy.length}</span>
            </div>
            <div className="comments d-flex align-items-center gap-1">
              <IoChatboxEllipsesOutline />
              <span>{totalComments}</span>
            </div>
            <div className="created-at">
              <span>{postedAt(createdAt)}</span>
            </div>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
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
  category: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
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
