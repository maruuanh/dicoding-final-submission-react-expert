import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  asyncReceiveThreadDetail,
  asyncToogleLikeThreadDetail,
} from "../states/threadDetail/action";
import { asyncAddThread } from "../states/threads/action";
import ThreadDetail from "../components/ThreadDetail";
import ThreadItem from "../components/ThreadItem";
import ThreadReplyInput from "../components/ThreadReplyInput";

function DetailPage() {
  const { id } = useParams();
  const { threadDetail = null, authUser } = useSelector((states) => states); // @TODO: get talkDetail and authUser state from store
  const dispatch = useDispatch(); // @TODO: get dispatch function from store

  useEffect(() => {
    // @TODO: dispatch async action to get thread detail by id
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onLikeThread = () => {
    // @TODO: dispatch async action to toggle like thread detail
    dispatch(asyncToogleLikeThreadDetail(id));
  };

  const onReplyThread = (text) => {
    // @TODO: dispatch async action to add reply thread
    dispatch(asyncAddThread({ title: text, body: text }));
  };

  if (!threadDetail) {
    return null;
  }

  return (
    <section className="detail-page">
      {threadDetail.parent && (
        <div className="detail-page__parent">
          <h3>Replying To</h3>
          <ThreadItem {...threadDetail.parent} authUser={authUser.id} />
        </div>
      )}
      <ThreadDetail
        {...threadDetail}
        authUser={authUser.id}
        likeThread={onLikeThread}
      />
      <ThreadReplyInput replyThread={onReplyThread} />
    </section>
  );
}

export default DetailPage;
