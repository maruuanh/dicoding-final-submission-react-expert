import api from '../../utils/api';
<<<<<<< HEAD
import { showLoading, hideLoading } from 'react-redux-loading-bar';
=======

>>>>>>> 3c7d4bde5e98d517a75ae9a1b7764a64d43e72eb
const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};
function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

function asyncRegisterUser({ name, email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.register({ name, email, password });
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export { ActionType, receiveUsersActionCreator, asyncRegisterUser };
