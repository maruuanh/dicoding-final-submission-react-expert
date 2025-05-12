import api from '../../../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import {
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  addCommentThreadDetailActionCreator,
  upVoteCommentActionCreator,
  downVoteCommentActionCreator,
  neutralizeVoteCommentActionCreator,
} from '../../../states/threadDetail/action';
import {
  asyncReceiveThreadDetail,
  asyncAddCommentThreadDetail,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralizeVoteComment,
} from '../../../states/threadDetail/action';

const fakeThreadDetail = {
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

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('receiveThreadDetailActionCreator thunk', () => {
  beforeEach(() => {
    api.__getThreadDetail = api.getThreadDetail;
    api.__createComment = api.createComment;
    api.__upVoteComment = api.upVoteComment;
    api.__downVoteComment = api.downVoteComment;
    api.__neutralizeVoteComment = api.neutralizeVoteComment;
  });

  afterEach(() => {
    api.getThreadDetail = api.__getThreadDetail;
    api.createComment = api.__createComment;
    api.upVoteComment = api.__upVoteComment;
    api.downVoteComment = api.__downVoteComment;
    api.neutralizeVoteComment = api.__neutralizeVoteComment;

    delete api.getThreadDetail;
    delete api.createComment;
    delete api.upVoteComment;
    delete api.downVoteComment;
    delete api.neutralizeVoteComment;
  });

  it('should dispatch correct actions on success', async () => {
    api.getThreadDetail = () => Promise.resolve(fakeThreadDetail);

    const dispatch = jest.fn();

    await asyncReceiveThreadDetail()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(clearThreadDetailActionCreator());
    expect(dispatch).toHaveBeenCalledWith(
      receiveThreadDetailActionCreator(fakeThreadDetail)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    api.getThreadDetail = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = jest.fn();
    // mock alert
    window.alert = jest.fn();
    // action
    await asyncReceiveThreadDetail()(dispatch);
    // assert

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });

  it('should dispatch correct add comment action on success', async () => {
    const fakeComment = {
      id: 'comment-2',
      content: 'Ini adalah komentar kedua',
    };

    api.createComment = () => Promise.resolve(fakeThreadDetail);

    const dispatch = jest.fn();

    await asyncAddCommentThreadDetail(fakeComment)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      addCommentThreadDetailActionCreator(fakeThreadDetail)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
  it('should dispatch error alert add comment action on failure', async () => {
    const fakeComment = {
      id: 'comment-2',
      content: '',
    };

    api.createComment = () => Promise.reject(fakeErrorResponse);

    const dispatch = jest.fn();

    await asyncAddCommentThreadDetail(fakeComment)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch upVoteComment action on success', async () => {
    const fakeCommentId = 'comment-1';
    const fakeAuthUser = { id: 'user-1' };
    const fakeThreadDetailId = { id: 'thread-1' };
    api.upVoteComment = () => Promise.resolve();

    const dispatch = jest.fn();
    const getState = () => ({
      authUser: fakeAuthUser,
      threadDetail: fakeThreadDetailId,
    });

    await asyncUpVoteComment(fakeCommentId)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      upVoteCommentActionCreator(fakeAuthUser.id, fakeCommentId)
    );
  });

  it('should call alert and dispatch rollback action when upVoteComment fails', async () => {
    const fakeCommentId = 'comment-1';
    const fakeAuthUser = { id: 'user-1' };
    const fakeThreadDetail = { id: 'thread-1' };
    const fakeError = new Error('Vote gagal');

    api.upVoteComment = jest.fn(() => Promise.reject(fakeError));
    window.alert = jest.fn();

    const dispatch = jest.fn();
    const getState = () => ({
      authUser: fakeAuthUser,
      threadDetail: fakeThreadDetail,
    });

    await asyncUpVoteComment(fakeCommentId)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      upVoteCommentActionCreator(fakeAuthUser.id, fakeCommentId)
    );

    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
  });
  it('should dispatch downVoteComment action on success', async () => {
    const fakeCommentId = 'comment-1';
    const fakeAuthUser = { id: 'user-1' };
    const fakeThreadDetailId = { id: 'thread-1' };
    api.downVoteComment = () => Promise.resolve();

    const dispatch = jest.fn();
    const getState = () => ({
      authUser: fakeAuthUser,
      threadDetail: fakeThreadDetailId,
    });

    await asyncDownVoteComment(fakeCommentId)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      downVoteCommentActionCreator(fakeAuthUser.id, fakeCommentId)
    );
  });

  it('should call alert and dispatch rollback action when downVoteComment fails', async () => {
    const fakeCommentId = 'comment-1';
    const fakeAuthUser = { id: 'user-1' };
    const fakeThreadDetail = { id: 'thread-1' };
    const fakeError = new Error('Vote gagal');

    api.downVoteComment = jest.fn(() => Promise.reject(fakeError));
    window.alert = jest.fn();

    const dispatch = jest.fn();
    const getState = () => ({
      authUser: fakeAuthUser,
      threadDetail: fakeThreadDetail,
    });

    await asyncDownVoteComment(fakeCommentId)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      downVoteCommentActionCreator(fakeAuthUser.id, fakeCommentId)
    );

    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
  });
  it('should dispatch neutralizeVoteComment action on success', async () => {
    const fakeCommentId = 'comment-1';
    const fakeAuthUser = { id: 'user-1' };
    const fakeThreadDetailId = { id: 'thread-1' };
    api.neutralizeVoteComment = () => Promise.resolve();

    const dispatch = jest.fn();
    const getState = () => ({
      authUser: fakeAuthUser,
      threadDetail: fakeThreadDetailId,
    });

    await asyncNeutralizeVoteComment(fakeCommentId)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      neutralizeVoteCommentActionCreator(fakeAuthUser.id, fakeCommentId)
    );
  });

  it('should call alert and dispatch rollback action when neutralizeVoteComment fails', async () => {
    const fakeCommentId = 'comment-1';
    const fakeAuthUser = { id: 'user-1' };
    const fakeThreadDetail = { id: 'thread-1' };
    const fakeError = new Error('Vote gagal');

    api.neutralizeVoteComment = jest.fn(() => Promise.reject(fakeError));
    window.alert = jest.fn();

    const dispatch = jest.fn();
    const getState = () => ({
      authUser: fakeAuthUser,
      threadDetail: fakeThreadDetail,
    });

    await asyncNeutralizeVoteComment(fakeCommentId)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      neutralizeVoteCommentActionCreator(fakeAuthUser.id, fakeCommentId)
    );

    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
  });
});
