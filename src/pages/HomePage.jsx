import React, { useEffect } from "react";
import ThreadInput from "../components/ThreadInput";
import ThreadsList from "../components/ThreadsList";
import { useSelector, useDispatch } from "react-redux";
import { asyncPopulateUsersAndThreads } from "../states/shared/action";
import {
  asyncAddThread,
  asyncToogleLikeThread,
} from "../states/threads/action";
function HomePage() {
  const {
    threads = [],
    users = [],
    authUser,
  } = useSelector((states) => states); // @TODO: get talks, users, and authUser state from store

  const dispatch = useDispatch(); // @TODO: get dispatch function from store

  useEffect(() => {
    // @TODO: dispatch async action to populate talks and users data
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onAddThread = (title, body) => {
    // @TODO: dispatch async action to add thread
    dispatch(asyncAddThread({ title, body }));
  };

  const onLike = (id) => {
    // @TODO: dispatch async action to toggle like thread
    dispatch(asyncToogleLikeThread(id));
  };
  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.user),
    authUser: authUser.id,
  }));

  return (
    <div className="home-page">
      <ThreadInput addThread={onAddThread} />
      <ThreadsList threads={threadList} like={onLike} />
    </div>
  );
}

export default HomePage;
