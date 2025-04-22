import api from '../../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
const ActionType = {
  RECEIVE_LEADERBOARDS: 'RECEIVE_LEADERBOARDS',
};

function receiveLeaderboardsActionCreator(leaderboards) {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: {
      leaderboards,
    },
  };
}

const asyncPopulateLeaderboards = () => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const leaderboards = await api.getLeaderboards();
      dispatch(receiveLeaderboardsActionCreator(leaderboards));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideLoading());
    }
  };
};

export { ActionType, asyncPopulateLeaderboards };
