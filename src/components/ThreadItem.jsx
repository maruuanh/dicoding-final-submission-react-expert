import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import parser from "html-react-parser";
import CategoryBadge from "./CategoryBadge";
import UpDownVoteComment from "./UpDownVoteComment";

function ThreadItem({
  id,
  title,
  createdAt,
  category,
  body,
  upVotesBy,
  downVotesBy,
  totalComments,
  owner,
  authUser,
  upVote,
  downVote,
  neutralizeVote,
}) {
  const navigate = useNavigate();
  const onThreadClick = () => {
    navigate(`/threads/${id}`);
  };

  const onThreadPress = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      navigate(`/threads/${id}`);
    }
  };

  const handleUpVote = () => {
    if (upVote) {
      upVote(id);
    }
  };

  const handleDownVote = () => {
    if (downVote) {
      downVote(id);
    }
  };

  const handleNeutralizeVote = () => {
    if (neutralizeVote) {
      neutralizeVote(id);
    }
  };

  return (
    <Card className="my-3" key={id}>
      <Card.Body>
        <Card.Title>
          <div className="category">
            <CategoryBadge category={category} />
          </div>
          <div
            className="title fw-semibold text-primary mt-3"
            onClick={onThreadClick}
            onKeyDown={onThreadPress}
            role="button"
            tabIndex={0}
          >
            {title}
          </div>
        </Card.Title>
        <div className="card-text">
          <div className="content">{parser(body)}</div>
          <div className="upvotes_downvotes_comments_created-at mt-2">
            <UpDownVoteComment
              upVotesBy={upVotesBy}
              downVotesBy={downVotesBy}
              totalComments={totalComments}
              createdAt={createdAt}
              owner={owner}
              authUser={authUser}
              upVote={handleUpVote}
              downVote={handleDownVote}
              neutralizeVote={handleNeutralizeVote}
              isInteractive={true}
            />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

ThreadItem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  createdAt: PropTypes.string,
  category: PropTypes.string,
  upVotesBy: PropTypes.arrayOf(PropTypes.string),
  downVotesBy: PropTypes.arrayOf(PropTypes.string),
  totalComments: PropTypes.number,
  authUser: PropTypes.string,
  upVote: PropTypes.func,
  downVote: PropTypes.func,
  neutralizeVote: PropTypes.func,
};

export const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
};

export default ThreadItem;
