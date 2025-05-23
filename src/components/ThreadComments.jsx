import React from 'react';
import { postedAt } from '../utils';
import { MdOutlineThumbUp, MdOutlineThumbDown } from 'react-icons/md';
import PropTypes from 'prop-types';
function ThreadComments({
  comments,
  upVoteComment,
  downVoteComment,
  neutralizeVoteComment,
  authUser,
}) {
  return (
    <div>
      <p className="fw-semibold fs-5">Komentar ({comments.length})</p>
      {comments.map((comment) => {
        const hasUpVoted = authUser && comment.upVotesBy.includes(authUser);
        const hasDownVoted = authUser && comment.downVotesBy.includes(authUser);

        const onUpVote = () => {
          if (hasDownVoted && neutralizeVoteComment) {
            neutralizeVoteComment(comment.id);
            setTimeout(() => {
              if (upVoteComment) upVoteComment(comment.id);
            }, 0);
          } else if (upVoteComment) {
            upVoteComment(comment.id);
          }
        };

        const onDownVote = () => {
          if (hasUpVoted && neutralizeVoteComment) {
            neutralizeVoteComment(comment.id);
            setTimeout(() => {
              if (downVoteComment) downVoteComment(comment.id);
            }, 0);
          } else if (downVoteComment) {
            downVoteComment(comment.id);
          }
        };

        return (
          <div className="border-bottom mb-2" key={comment.id}>
            <div className="d-flex align-items-center justify-content-between">
              <div className="profile d-flex align-items-center gap-2">
                <img
                  src={comment.owner.avatar}
                  alt={comment.owner.id}
                  className="rounded-circle"
                  style={{ width: '20px', height: '20px' }}
                />
                <span className="fw-semibold">{comment.owner.name}</span>
              </div>
              <p>{postedAt(comment.createdAt)}</p>
            </div>
            <div className="content mt-2">
              <p className="fs-6">{comment.content}</p>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div
                data-testid={`upvote-${comment.id}`}
                className="d-flex align-items-center gap-1"
              >
                <button
                  className="btn p-0"
                  onClick={onUpVote}
                  style={{ color: hasUpVoted ? 'blue' : 'inherit' }}
                >
                  <MdOutlineThumbUp />
                </button>
                {comment.upVotesBy.length}
              </div>
              <div
                data-testid={`downvote-${comment.id}`}
                className="d-flex align-items-center gap-1"
              >
                <button
                  className="btn p-0"
                  onClick={onDownVote}
                  style={{ color: hasDownVoted ? 'red' : 'inherit' }}
                >
                  <MdOutlineThumbDown />
                </button>
                {comment.downVotesBy.length}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ThreadComments;

ThreadComments.propTypes = {
  comments: PropTypes.array.isRequired,
  upVoteComment: PropTypes.func,
  downVoteComment: PropTypes.func,
  neutralizeVoteComment: PropTypes.func,
  authUser: PropTypes.string.isRequired,
};
