import { asyncPopulateLeaderboards } from '../../../states/leaderboards/action';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { receiveLeaderboardsActionCreator } from '../../../states/leaderboards/action';
import api from '../../../utils/api';
import '@testing-library/jest-dom';
/**
 * @jest-environment jsdom
 */
const fakeResponseLeaderboards = [
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
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncPopulateLeaderboards thunk', () => {
  beforeEach(() => {
    api.__getLeaderBoards = api.getLeaderboards;
  });

  afterEach(() => {
    api.getLeaderboards = api.__getLeaderBoards;
    delete api.getLeaderboards;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    api.getLeaderboards = () => Promise.resolve(fakeResponseLeaderboards);

    const dispatch = jest.fn();

    await asyncPopulateLeaderboards()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveLeaderboardsActionCreator(fakeResponseLeaderboards)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    api.getLeaderboards = () => Promise.reject(fakeErrorResponse);

    const dispatch = jest.fn();
    window.alert = jest.fn();

    await asyncPopulateLeaderboards()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
