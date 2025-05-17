import isPreloadReducer from '../../../states/isPreload/reducer';

describe('isPreloadReducer function', () => {
  it('Should return the initial state when given by unknown action', () => {
    const initialState = [];

    const action = {
      type: 'UNKNOWN',
    };
    const nextState = isPreloadReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('Should return is application in preload or not when given by SET_IS_PRELOAD', () => {
    const initialState = [];
    const action = {
      type: 'SET_IS_PRELOAD',
      payload: {
        isPreload: true,
      },
    };

    const nextState = isPreloadReducer(initialState, action);
    expect(nextState).toEqual(action.payload.isPreload);
  });
});
