import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import parser from 'html-react-parser';
import CategoryBadge from './CategoryBadge';
import UpDownVoteComment from './UpDownVoteComment';

function ThreadDetail({
  title,
  body,
  category,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  totalComments,
  authUser,
}) {
  return (
    <div>
      <Card.Title>
        <div className='category'>
          <CategoryBadge category={category} />
        </div>
        <div className='title fw-bold text-primary mt-3'>{title}</div>
      </Card.Title>
      <Card.Text>
        <div className='content'>{parser(body)}</div>
        <div className='upvotes_downvotes_comments_created-at mt-2'>
          <UpDownVoteComment
            upVotesBy={upVotesBy}
            downVotesBy={downVotesBy}
            totalComments={totalComments}
            createdAt={createdAt}
            owner={owner}
            authUser={authUser}
            isInteractive={false}
          />
        </div>
      </Card.Text>
    </div>
  );
}

ThreadDetail.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  authUser: PropTypes.string.isRequired,
};

export default ThreadDetail;
