import React from 'react';
import { MdOutlineThumbUp, MdOutlineThumbDown } from 'react-icons/md';
import { IoChatboxEllipsesOutline } from 'react-icons/io5';
import { postedAt } from '../utils';
import PropTypes from 'prop-types';

function UpDownVoteComment({
  upVotesBy,
  downVotesBy,
  totalComments,
  createdAt,
  owner,
  comments,
  upVote,
  downVote,
  neutralizeVote,
  authUser,
  isInteractive = true,
}) {
  const commentCount =
    totalComments !== undefined
      ? totalComments
      : comments
        ? comments.length
        : 0;

  const hasUpVoted = authUser && upVotesBy.includes(authUser);
  const hasDownVoted = authUser && downVotesBy.includes(authUser);

  const onUpVote = () => {
    if (!isInteractive) return;

    if (hasDownVoted && neutralizeVote) {
      neutralizeVote();
      setTimeout(() => {
        if (upVote) upVote();
      }, 0);
    } else if (upVote) {
      upVote();
    }
  };

  const onDownVote = () => {
    if (!isInteractive) return;

    if (hasUpVoted && neutralizeVote) {
      neutralizeVote();
      setTimeout(() => {
        if (downVote) downVote();
      }, 0);
    } else if (downVote) {
      downVote();
    }
  };

  return (
    <div className="d-flex align-items-center gap-2">
      <div
        data-testid="upvote"
        className="upvotes d-flex align-items-center gap-1"
      >
        {isInteractive ? (
          <button
            className="border-0 bg-transparent"
            style={{
              padding: 0,
              margin: 0,
              color: hasUpVoted ? 'blue' : 'inherit',
            }}
            onClick={onUpVote}
          >
            <MdOutlineThumbUp />
          </button>
        ) : (
          <span style={{ color: hasUpVoted ? 'blue' : 'inherit' }}>
            <MdOutlineThumbUp />
          </span>
        )}
        <span>{upVotesBy.length}</span>
      </div>
      <div
        data-testid="downvote"
        className="downvotes d-flex align-items-center gap-1"
      >
        {isInteractive ? (
          <button
            className="border-0 bg-transparent"
            style={{
              padding: 0,
              margin: 0,
              color: hasDownVoted ? 'red' : 'inherit',
            }}
            onClick={onDownVote}
          >
            <MdOutlineThumbDown />
          </button>
        ) : (
          <span style={{ color: hasDownVoted ? 'red' : 'inherit' }}>
            <MdOutlineThumbDown />
          </span>
        )}
        <span>{downVotesBy.length}</span>
      </div>
      {commentCount > 0 && (
        <div className="comments d-flex align-items-center gap-1">
          <IoChatboxEllipsesOutline />
          <span>{commentCount}</span>
        </div>
      )}
      <div className="owner d-flex align-items-center gap-1">
        <span>Dibuat oleh </span>
        <img
          src={owner.avatar}
          alt={owner.name}
          className="rounded-circle"
          style={{ width: '20px', height: '20px' }}
        />
        <span> {owner.name}</span>
      </div>
      <div className="created-at">
        <span>{postedAt(createdAt)}</span>
      </div>
    </div>
  );
}

export default UpDownVoteComment;

UpDownVoteComment.propTypes = {
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
  totalComments: PropTypes.number,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.object.isRequired,
  comments: PropTypes.array,
  upVote: PropTypes.func,
  downVote: PropTypes.func,
  neutralizeVote: PropTypes.func,
  authUser: PropTypes.string.isRequired,
  isInteractive: PropTypes.bool,
};
