/* eslint-disable no-undef */
import {
  asyncSetAuthUser,
  asyncUnsetAuthUser,
} from '../../../states/authUser/action';
import api from '../../../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import {
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
} from '../../../states/authUser/action';

const fakeToken = 'fake-token';
const fakeUser = {
  id: 'janedoe',
  name: 'Jane Doe',
  avatar: 'https://generated-image-url.jpg',
};

describe('asyncSetAuthUser', () => {
  beforeEach(() => {
    api.__login = api.login;
    api.__getOwnProfile = api.getOwnProfile;
    api.__putAccessToken = api.putAccessToken;
  });

  afterEach(() => {
    api.login = api._login;
    api.getOwnProfile = api._getOwnProfile;
    api.putAccessToken = api._putAccessToken;

    delete api.login;
    delete api.getOwnProfile;
    delete api.putAccessToken;
  });

  it('should dispatch correct actions on success', async () => {
    api.login = () => Promise.resolve(fakeToken);
    api.getOwnProfile = () => Promise.resolve(fakeUser);
    api.putAccessToken = jest.fn();

    const dispatch = jest.fn();
    const credentials = { email: 'janedoe@email.com', password: 'janedoe' };

    await asyncSetAuthUser(credentials)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeUser));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
  it('should dispatch null authUser on failure', async () => {
    const fakeError = new Error('Invalid Credentials');
    api.login = () => Promise.reject(fakeError);
    const dispatch = jest.fn();
    const credentials = { email: 'wrong@email.com', password: 'wrong' };

    jest.spyOn(window, 'alert').mockImplementation(() => {});

    await asyncSetAuthUser(credentials)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(null));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe('asyncUnsetAuthUser', () => {
  beforeEach(() => {
    api.__putAccessToken = api.putAccessToken;
  });

  afterEach(() => {
    api.putAccessToken = api.__putAccessToken;
    delete api.putAccessToken;
  });

  it('should clear auth user and token', () => {
    const dispatch = jest.fn();
    api.putAccessToken = jest.fn();

    asyncUnsetAuthUser()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
    expect(api.putAccessToken).toHaveBeenCalledWith('');
  });
});
