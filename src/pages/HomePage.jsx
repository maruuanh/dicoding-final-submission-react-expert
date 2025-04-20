import React, { useEffect } from "react";
import ThreadInput from "../components/ThreadInput";
import ThreadsList from "../components/ThreadsList";
import { useSelector, useDispatch } from "react-redux";
import { asyncPopulateUsersAndThreads } from "../states/shared/action";
import {
  asyncAddThread,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralizeVoteThread,
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

  const onUpVoteThread = (id) => {
    // @TODO: dispatch async action to toggle like thread
    dispatch(asyncUpVoteThread(id));
  };

  const onDownVoteThread = (id) => {
    // @TODO: dispatch async action to toggle like thread
    dispatch(asyncDownVoteThread(id));
  };

  const onNeutralizeVoteThread = (id) => {
    // @TODO: dispatch async action to toggle like thread
    dispatch(asyncNeutralizeVoteThread(id));
  };

  const onAddThread = ({ title, body, category }) => {
    dispatch(asyncAddThread({ title, body, category }));
  };

  const threadList = threads.map((thread) => ({
    ...thread,
    owner: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  console.log(threadList);

  return (
    <div className="home-page">
      <ThreadInput addThread={onAddThread} />
      <ThreadsList
        threads={threadList}
        upVoteThread={onUpVoteThread}
        downVoteThread={onDownVoteThread}
        neutralizeVoteThread={onNeutralizeVoteThread}
      />
    </div>
  );
}

export default HomePage;
