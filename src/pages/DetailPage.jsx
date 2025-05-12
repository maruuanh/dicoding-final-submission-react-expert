import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  asyncReceiveThreadDetail,
  asyncAddCommentThreadDetail,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralizeVoteComment,
} from '../states/threadDetail/action';
import ThreadDetail from '../components/ThreadDetail';
import ThreadReplyInput from '../components/ThreadReplyInput';
import { Container, Card } from 'react-bootstrap';
import ThreadComments from '../components/ThreadComments';

function DetailPage() {
  const { id } = useParams();
  const { threadDetail = null, authUser } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onUpVoteComment = (commentId) => {
    dispatch(asyncUpVoteComment(commentId));
  };

  const onDownVoteComment = (commentId) => {
    dispatch(asyncDownVoteComment(commentId));
  };

  const onNeutralizeVoteComment = (commentId) => {
    dispatch(asyncNeutralizeVoteComment(commentId));
  };

  const onReplyThread = (content) => {
    dispatch(asyncAddCommentThreadDetail({ threadId: id, content }));
  };

  if (!threadDetail) {
    return null;
  }

  return (
    <section className="detail-page">
      <Container
        fluid
        className="py-5 d-flex justify-content-center flex-column align-items-center h-100"
      >
        <Card className="shadow-sm w-50">
          <Card.Body>
            <ThreadDetail
              {...threadDetail}
              authUser={authUser.id}
              comments={threadDetail.comments}
            />
            <p className="fw-semibold fs-5 mt-2">Beri komentar</p>
            <ThreadReplyInput replyThread={onReplyThread} />
            <div className="mt-3">
              <ThreadComments
                comments={threadDetail.comments}
                upVoteComment={onUpVoteComment}
                downVoteComment={onDownVoteComment}
                neutralizeVoteComment={onNeutralizeVoteComment}
                authUser={authUser.id}
              />
            </div>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
}

export default DetailPage;
