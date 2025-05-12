import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UpDownVoteComment from '../../components/UpDownVoteComment';

const defaultOwner = {
  name: 'John Doe',
  avatar: 'https://avatar.url/image.jpg',
};

const defaultProps = {
  createdAt: '2021-06-21T07:00:00.000Z',
  owner: defaultOwner,
  upVotesBy: ['user-1', 'user-3'],
  downVotesBy: ['user-2'],
  authUser: 'user-1',
  isInteractive: true,
};

describe('UpDownVoteComment component', () => {
  it('should display thread title, body, category, and owner name', () => {
    render(<UpDownVoteComment {...defaultProps} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText(2)).toBeInTheDocument();
    expect(screen.getByText(1)).toBeInTheDocument();
  });
  it('should call upVote when upvote button is clicked and user has not vote', () => {
    const upVote = jest.fn();
    render(<UpDownVoteComment {...defaultProps} upVote={upVote} />);

    fireEvent.click(screen.getByTestId('upvote').querySelector('button'));
    expect(upVote).toHaveBeenCalledTimes(1);
  });
  it('should call downVote when downvote button is clicked and user has not vote', () => {
    const downVote = jest.fn();
    render(<UpDownVoteComment {...defaultProps} downVote={downVote} />);

    fireEvent.click(screen.getByTestId('downvote').querySelector('button'));
    expect(downVote).toHaveBeenCalledTimes(1);
  });
  it('should call neutralizeVote then upVote when user switches from downvote to upvote', () => {
    const neutralizeVote = jest.fn();
    const upVote = jest.fn();
    render(
      <UpDownVoteComment
        {...defaultProps}
        downVotesBy={['user-1']}
        upVote={upVote}
        neutralizeVote={neutralizeVote}
      />
    );

    fireEvent.click(screen.getByTestId('upvote').querySelector('button'));
    expect(neutralizeVote).toHaveBeenCalledTimes(1);
    setTimeout(() => {
      expect(upVote).toHaveBeenCalledTimes(1);
    }, 0);
  });
});
