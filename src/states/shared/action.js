import api from "../../utils/api";
import { receiveUsersActionCreator } from "../users/action";
import { receiveThreadsActionCreator } from "../threads/action";
const asyncPopulateUsersAndThreads = () => {
  return async (dispatch) => {
    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();
      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      alert(error.message);
    }
  };
};

export { asyncPopulateUsersAndThreads };
