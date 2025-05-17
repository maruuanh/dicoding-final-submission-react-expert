import leaderboardsReducer from '../../../states/leaderboards/reducer';

describe('leaderboardsReducer function', () => {
  it('Should return the initial state when given by unknown action', () => {
    const initialState = [];

    const action = {
      type: 'UNKNOWN',
    };

    const nextState = leaderboardsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('Should return the leaderboards when given by RECEIVE_LEADERBOARDS action', () => {
    const initialState = [];

    const action = {
      type: 'RECEIVE_LEADERBOARDS',
      payload: {
        leaderboards: [
          {
            user: {
              id: 'users-1',
              name: 'John Doe',
              email: 'john@example.com',
              avatar: 'https://generated-image-url.jpg',
            },
            score: 10,
          },
          {
            user: {
              id: 'users-2',
              name: 'Jane Doe',
              email: 'jane@example.com',
              avatar: 'https://generated-image-url.jpg',
            },
            score: 5,
          },
        ],
      },
    };

    const nextState = leaderboardsReducer(initialState, action);
    expect(nextState).toEqual(action.payload.leaderboards);
  });
});
