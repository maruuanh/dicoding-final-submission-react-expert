import { configureStore } from "@reduxjs/toolkit";
import { loadingBarReducer } from "react-redux-loading-bar";
import authUserReducer from "./authUser/reducer";
import usersReducer from "./users/reducer";
import isPreloadReducer from "./isPreload/reducer";
import threadDetailReducer from "./threadDetail/reducer";
import threadsReducer from "./threads/reducer";
const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    users: usersReducer,
    isPreload: isPreloadReducer,
    loadingBar: loadingBarReducer,
    threadDetail: threadDetailReducer,
    threads: threadsReducer,
  },
});

export default store;
