/**
 test scenario for threadDetailReducer
 - threadDetailReducer reducer
  - should return the initial state when given by unknown action
  - should return the detail thread when given by RECEIVE_THREAD_DETAIL
  - should return the detail thread with the new added comment when given by ADD_COMMENT_THREAD_DETAIL
  - should return the detail thread with an upvoted comment when given by UP_VOTE_COMMENT
  - should return the detail thread with aa downvoted comment when given by DOWN_VOTE_COMMENT
  - should return the detail thread with neither upvoted nor downvoted comment when given by NEUTRALIZE_VOTE_COMMENT
*/

import threadDetailReducer from '../../../states/threadDetail/reducer';

describe('threadDetailReducer function', () => {
  it('Should return the initial state when given by unknown action', () => {
    const initialState = [];

    const action = {
      type: 'UNKNOWN',
    };

    const nextState = threadDetailReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it('Should return the detail thread when given by RECEIVE_THREAD_DETAIL', () => {
    const initialState = [];
    const action = {
      type: 'RECEIVE_THREAD_DETAIL',
      payload: {
        threadDetail: {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
          comments: [
            {
              id: 'comment-1',
              content: 'Ini adalah komentar pertama',
              createdAt: '2021-06-21T07:00:00.000Z',
              owner: {
                id: 'users-1',
                name: 'John Doe',
                avatar: 'https://generated-image-url.jpg',
              },
              upVotesBy: [],
              downVotesBy: [],
            },
          ],
        },
      },
    };

    const nextState = threadDetailReducer(initialState, action);
    expect(nextState).toEqual(action.payload.threadDetail);
  });

  it('Should return the detail thread with the new added comment when given by ADD_COMMENT_THREAD_DETAIL', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: 'ADD_COMMENT_THREAD_DETAIL',
      payload: {
        comment: {
          id: 'comment-2',
          content: 'Ini adalah komentar kedua',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            email: 'john@example.com',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      },
    };

    const nextState = threadDetailReducer(initialState, action);
    expect(nextState).toEqual({
      ...initialState,
      comments: [action.payload.comment, ...initialState.comments],
    });
  });

  it('Should return the detail thread with an upvoted comment when given by UP_VOTE_COMMENT', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: 'UP_VOTE_COMMENT',
      payload: {
        commentId: 'comment-1',
        userId: 'users-1',
      },
    };

    const nextState = threadDetailReducer(initialState, action);
    expect(nextState).toEqual({
      ...initialState,
      comments: initialState.comments.map((comment) =>
        comment.id === action.payload.commentId
          ? {
            ...comment,
            upVotesBy: comment.upVotesBy.includes(action.payload.userId)
              ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
              : comment.upVotesBy.concat(action.payload.userId),
          }
          : comment
      ),
    });
  });

  it('Should return the detail thread with aa downvoted comment when given by DOWN_VOTE_COMMENT', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: ['users-1'],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: 'DOWN_VOTE_COMMENT',
      payload: {
        userId: 'users-1',
        commentId: 'comment-1',
      },
    };

    const nextState = threadDetailReducer(initialState, action);
    expect(nextState).toEqual({
      ...initialState,
      comments: initialState.comments.map((comment) =>
        comment.id === action.payload.commentId
          ? {
            ...comment,
            downVotesBy: comment.downVotesBy.includes(action.payload.userId)
              ? comment.downVotesBy.filter(
                (id) => id !== action.payload.userId
              )
              : comment.downVotesBy.concat(action.payload.userId),
          }
          : comment
      ),
    });
  });

  it('Should return the detail thread with neither upvoted nor downvoted comment when given by NEUTRALIZE_VOTE_COMMENT', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: ['users-1'],
          downVotesBy: [],
        },
      ],
    };

    const action = {
      type: 'NEUTRALIZE_VOTE_COMMENT',
      payload: {
        userId: 'users-1',
        commentId: 'comment-1',
      },
    };

    const nextState = threadDetailReducer(initialState, action);
    expect(nextState).toEqual({
      ...initialState,
      comments: initialState.comments.map((comment) =>
        comment.id === action.payload.commentId
          ? {
            ...comment,
            upVotesBy: comment.upVotesBy.filter(
              (id) => id !== action.payload.userId
            ),
            downVotesBy: comment.downVotesBy.filter(
              (id) => id !== action.payload.userId
            ),
          }
          : comment
      ),
    });
  });
});
