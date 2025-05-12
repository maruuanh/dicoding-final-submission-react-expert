import React from 'react';
import { screen, render, fireEvent, cleanup } from '@testing-library/react';
import ThreadComments from '../../components/ThreadComments';

const mockComments = [
  {
    id: 'comment-1',
    content: 'Keren banget',
    createdAt: '2025-05-11T12:48:16.631Z',
    owner: {
      id: 'user-1',
      name: 'Jane Doe',
      avatar: 'https://avatar.url/image.jpg',
    },
    upVotesBy: [],
    downVotesBy: ['user-1'],
  },
  {
    id: 'comment-2',
    content: 'Bagus banget',
    createdAt: '2025-05-11T12:47:45.406Z',
    owner: {
      id: 'user-2',
      name: 'John Doe',
      avatar: 'https://avatar.url/image.jpg',
    },
    upVotesBy: [],
    downVotesBy: ['user-1'],
  },
];

describe('ThreadComments component', () => {
  afterEach(() => {
    cleanup();
  });
  const authUser = 'user-1';
  const mockUpVote = jest.fn();
  const mockDownVote = jest.fn();
  const mockNeutralizeVote = jest.fn();
  it('should render all comments initially', () => {
    render(<ThreadComments comments={mockComments} authUser={authUser} />);

    expect(screen.getByText(/Keren banget/i)).toBeInTheDocument();
    expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Bagus banget/i)).toBeInTheDocument();
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  });
  it('should call upVote when upvote button is clicked and user has not vote', () => {
    render(
      <ThreadComments
        comments={mockComments}
        upVoteComment={mockUpVote}
        authUser={authUser}
      />
    );
    mockComments.forEach((comment) => {
      const upvoteButtons = screen
        .getByTestId(`upvote-${comment.id}`)
        .querySelector('button');
      fireEvent.click(upvoteButtons);
    });
    expect(mockUpVote).toHaveBeenCalledTimes(mockComments.length);
  });
  it('should call downVote when downvote button is clicked and user has not vote', () => {
    render(
      <ThreadComments
        comments={mockComments}
        downVoteComment={mockDownVote}
        authUser={authUser}
      />
    );
    mockComments.forEach((comment) => {
      const downvoteButtons = screen
        .getByTestId(`downvote-${comment.id}`)
        .querySelector('button');
      fireEvent.click(downvoteButtons);
    });
    expect(mockDownVote).toHaveBeenCalledTimes(mockComments.length);
  });
  it('should call neutralizeVote then upVote when user switches from downvote to upvote', () => {
    render(
      <ThreadComments
        comments={mockComments}
        upVoteComment={mockUpVote}
        neutralizeVoteComment={mockNeutralizeVote}
        authUser={authUser}
      />
    );
    mockComments.forEach((comment) => {
      const downvoteButtons = screen
        .getByTestId(`upvote-${comment.id}`)
        .querySelector('button');
      fireEvent.click(downvoteButtons);
    });
    expect(mockNeutralizeVote).toHaveBeenCalledTimes(mockComments.length);
    setTimeout(() => {
      expect(mockUpVote).toHaveBeenCalledTimes(mockComments.length);
    }, 0);
  });
});
