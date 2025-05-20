/**
 test scenario for authUserReducer
 - authUserReducer reducer
  - should return the initial state when given by unknown action
  - should return set user when given by SET_AUTH_USER action
  - should return unset user when given by UNSET_AUTH_USER action
*/

import authUserReducer from '../../../states/authUser/reducer';

describe('authUserReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = [];

    const action = {
      type: 'UNKNOWN',
    };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return set user when given by SET_AUTH_USER action', () => {
    const initialState = [];

    const action = {
      type: 'SET_AUTH_USER',
      payload: {
        authUser: {
          id: 'john_doe',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      },
    };

    const nextState = authUserReducer(initialState, action);
    expect(nextState).toEqual(action.payload.authUser);
  });

  it('should return unset user when given by UNSET_AUTH_USER action', () => {
    const initialState = {
      id: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    };

    const action = {
      type: 'UNSET_AUTH_USER',
      payload: {
        authUser: null,
      },
    };

    const nextState = authUserReducer(initialState, action);
    expect(nextState).toEqual(action.payload.authUser);
  });
});
