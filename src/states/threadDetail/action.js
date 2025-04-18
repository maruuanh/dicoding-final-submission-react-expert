/**
 * @TODO: Define all the actions (creator) for the talkDetail state
 */
import api from "../../utils/api";
const ActionType = {
  RECEIVE_THREAD_DETAIL: "RECEIVE_THREAD_DETAIL",
  CLEAR_THREAD_DETAIL: "CLEAR_THREAD_DETAIL",
  TOGGLE_LIKE_THREAD_DETAIL: "TOGGLE_LIKE_THREAD_DETAIL",
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function toggleLikeThreadDetailActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_LIKE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncToogleLikeThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleLikeThreadDetailActionCreator(authUser.id));

    try {
      await api.toggleLikeThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
    }
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  toggleLikeThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  asyncToogleLikeThreadDetail,
};
