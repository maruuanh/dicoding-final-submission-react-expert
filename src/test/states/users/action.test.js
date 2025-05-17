/* eslint-disable no-undef */
import api from '../../../utils/api';
import { asyncRegisterUser } from '../../../states/users/action';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

describe('asyncRegisterUser thunk', () => {
  beforeEach(() => {
    api.__register = api.register;
  });

  afterEach(() => {
    api.register = api.__register;
    delete api.register;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    api.register = jest.fn(() => Promise.resolve());

    const dispatch = jest.fn();
    const credentials = {
      name: 'Jane Doe',
      email: 'janedoe@email.com',
      password: 'janedoe',
    };

    await asyncRegisterUser(credentials)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.register).toHaveBeenCalledWith(credentials);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
