import api from '../../../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import {
  addThreadActionCreator,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  neutralizeVoteThreadActionCreator,
} from '../../../states/threads/action';
import {
  asyncAddThread,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralizeVoteThread,
} from '../../../states/threads/action';

const fakeThreads = [
  {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalThreads: 0,
  },
  {
    id: 'thread-2',
    title: 'Thread Kedua',
    body: 'Ini adalah thread kedua',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-2',
    upVotesBy: [],
    downVotesBy: [],
    totalThreads: 0,
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('receiveThreadsActionCreator thunk', () => {
  beforeEach(() => {
    api.__createThread = api.createThread;
    api.__upVoteThread = api.upVoteThread;
    api.__downVoteThread = api.downVoteThread;
    api.__neutralizeVoteThread = api.neutralizeVoteThread;
  });

  afterEach(() => {
    api.createThread = api.__createThread;
    api.upVoteThread = api.__upVoteThread;
    api.downVoteThread = api.__downVoteThread;
    api.neutralizeVoteThread = api.__neutralizeVoteThread;

    delete api.createThread;
    delete api.upVoteThread;
    delete api.downVoteThread;
    delete api.neutralizeVoteThread;
  });

  it('should dispatch correct add thread action on success', async () => {
    const fakeThread = {
      title: 'Pengenalan Redux',
      content:
        'Redux adalah salah satu library React yang berfungsi sebagai state management',
      category: 'programming',
    };

    api.createThread = () => Promise.resolve(fakeThreads);

    const dispatch = jest.fn();

    await asyncAddThread(fakeThread)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeThreads));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
  it('should dispatch error alert add thread action on failure', async () => {
    const fakeThread = {
      title: 'Pengenalan Redux',
      content:
        'Redux adalah salah satu library React yang berfungsi sebagai state management',
      category: 'programming',
    };

    api.createThread = () => Promise.reject(fakeErrorResponse);

    const dispatch = jest.fn();
    window.alert = jest.fn();
    await asyncAddThread(fakeThread)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch upVoteThread action on success', async () => {
    const fakeThreadId = 'thread-1';
    const fakeAuthUser = { id: 'user-1' };
    api.upVoteThread = () => Promise.resolve();

    const dispatch = jest.fn();
    const getState = () => ({
      authUser: fakeAuthUser,
    });

    await asyncUpVoteThread(fakeThreadId)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      upVoteThreadActionCreator({
        threadId: fakeThreadId,
        userId: fakeAuthUser.id,
      })
    );
  });

  it('should call alert and dispatch rollback action when upVoteThread fails', async () => {
    const fakeThreadId = 'thread-1';
    const fakeAuthUser = { id: 'user-1' };
    const fakeError = new Error('Vote gagal');

    api.upVoteThread = jest.fn(() => Promise.reject(fakeError));
    window.alert = jest.fn();

    const dispatch = jest.fn();
    const getState = () => ({
      authUser: fakeAuthUser,
    });

    await asyncUpVoteThread(fakeThreadId)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      upVoteThreadActionCreator({
        threadId: fakeThreadId,
        userId: fakeAuthUser.id,
      })
    );

    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
  });
  it('should dispatch downVoteThread action on success', async () => {
    const fakeThreadId = 'thread-1';
    const fakeAuthUser = { id: 'user-1' };
    api.downVoteThread = () => Promise.resolve();

    const dispatch = jest.fn();
    const getState = () => ({
      authUser: fakeAuthUser,
    });

    await asyncDownVoteThread(fakeThreadId)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      downVoteThreadActionCreator({
        threadId: fakeThreadId,
        userId: fakeAuthUser.id,
      })
    );
  });

  it('should call alert and dispatch rollback action when downVoteThread fails', async () => {
    const fakeThreadId = 'thread-1';
    const fakeAuthUser = { id: 'user-1' };
    const fakeError = new Error('Vote gagal');

    api.downVoteThread = jest.fn(() => Promise.reject(fakeError));
    window.alert = jest.fn();

    const dispatch = jest.fn();
    const getState = () => ({
      authUser: fakeAuthUser,
    });

    await asyncDownVoteThread(fakeThreadId)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      downVoteThreadActionCreator({
        threadId: fakeThreadId,
        userId: fakeAuthUser.id,
      })
    );

    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
  });
  it('should dispatch neutralizeVoteThread action on success', async () => {
    const fakeThreadId = 'thread-1';
    const fakeAuthUser = { id: 'user-1' };
    api.neutralizeVoteThread = () => Promise.resolve();

    const dispatch = jest.fn();
    const getState = () => ({
      authUser: fakeAuthUser,
    });

    await asyncNeutralizeVoteThread(fakeThreadId)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      neutralizeVoteThreadActionCreator({
        threadId: fakeThreadId,
        userId: fakeAuthUser.id,
      })
    );
  });

  it('should call alert and dispatch rollback action when neutralizeVoteThread fails', async () => {
    const fakeThreadId = 'thread-1';
    const fakeAuthUser = { id: 'user-1' };
    const fakeError = new Error('Vote gagal');

    api.neutralizeVoteThread = jest.fn(() => Promise.reject(fakeError));
    window.alert = jest.fn();

    const dispatch = jest.fn();
    const getState = () => ({
      authUser: fakeAuthUser,
    });

    await asyncNeutralizeVoteThread(fakeThreadId)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      neutralizeVoteThreadActionCreator({
        threadId: fakeThreadId,
        userId: fakeAuthUser.id,
      })
    );

    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
  });
});
