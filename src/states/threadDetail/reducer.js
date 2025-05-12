/**
 * @TODO: Define reducer for the threadDetail state
 */
import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  let newComment;
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;
    case ActionType.CLEAR_THREAD_DETAIL:
      return null;

    case ActionType.ADD_COMMENT_THREAD_DETAIL:
      newComment = action.payload.comment.comment || action.payload.comment;
      return {
        ...threadDetail,
        comments: [newComment, ...threadDetail.comments],
      };
    case ActionType.UP_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) =>
          comment.id === action.payload.commentId
            ? {
                ...comment,
                upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                  ? comment.upVotesBy.filter(
                      (id) => id !== action.payload.userId
                    )
                  : comment.upVotesBy.concat(action.payload.userId),
              }
            : comment
        ),
      };
    case ActionType.DOWN_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) =>
          comment.id === action.payload.commentId
            ? {
                ...comment,
                downVotesBy: comment.downVotesBy.includes(action.payload.userId)
                  ? comment.downVotesBy.filter(
                      (id) => id !== action.payload.userId
                    )
                  : comment.downVotesBy.concat(action.payload.userId),
              }
            : comment
        ),
      };
    case ActionType.NEUTRALIZE_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) =>
          comment.id === action.payload.commentId
            ? {
                ...comment,
                upVotesBy: comment.upVotesBy.filter(
                  (id) => id !== action.payload.userId
                ),
                downVotesBy: comment.downVotesBy.filter(
                  (id) => id !== action.payload.userId
                ),
              }
            : comment
        ),
      };
    default:
      return threadDetail;
  }
}

export default threadDetailReducer;
