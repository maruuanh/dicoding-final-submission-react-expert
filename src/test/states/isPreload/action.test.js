import api from '../../../utils/api';
import { setIsPreloadActionCreator } from '../../../states/isPreload/action';
import { asyncPreloadProcess } from '../../../states/isPreload/action';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { setAuthUserActionCreator } from '../../../states/authUser/action';

const fakeResponseOwnProfile = {
  id: 'john_doe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

const fakeErrorResponse = new Error('Ups, something went wrong');
describe('asyncPreloadProcess thunk', () => {
  beforeEach(() => {
    api.__getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.getOwnProfile = api.__getOwnProfile;
    delete api.getOwnProfile;
  });

  it('should dispatch correct actions on success', async () => {
    api.getOwnProfile = () => Promise.resolve(fakeResponseOwnProfile);

    const dispatch = jest.fn();

    await asyncPreloadProcess()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      setAuthUserActionCreator(fakeResponseOwnProfile)
    );
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
  it('should dispatch null on failure', async () => {
    api.getOwnProfile = () => Promise.reject(fakeErrorResponse);

    const dispatch = jest.fn();
    window.alert = jest.fn();

    await asyncPreloadProcess()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(null));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
