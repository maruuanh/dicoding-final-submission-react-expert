/**
 * @TODO: Define the reducer for the talks state
 */
import { ActionType } from "./action";

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;
    case ActionType.ADD_THREAD:
      return [action.payload.thread, ...threads];
    case ActionType.UP_VOTE_THREAD:
      return threads.map((thread) =>
        thread.id === action.payload.threadId
          ? {
              ...thread,
              upVotesBy: thread.upVotesBy.includes(action.payload.userId)
                ? thread.upVotesBy.filter((id) => id !== action.payload.userId)
                : thread.upVotesBy.concat(action.payload.userId),
              downVotesBy: thread.downVotesBy.filter(
                (id) => id !== action.payload.userId
              ),
            }
          : thread
      );
    case ActionType.DOWN_VOTE_THREAD:
      return threads.map((thread) =>
        thread.id === action.payload.threadId
          ? {
              ...thread,
              downVotesBy: thread.downVotesBy.includes(action.payload.userId)
                ? thread.downVotesBy.filter(
                    (id) => id !== action.payload.userId
                  )
                : thread.downVotesBy.concat(action.payload.userId),
              upVotesBy: thread.upVotesBy.filter(
                (id) => id !== action.payload.userId
              ),
            }
          : thread
      );
    case ActionType.NEUTRALIZE_VOTE_THREAD:
      return threads.map((thread) =>
        thread.id === action.payload.threadId
          ? {
              ...thread,
              upVotesBy: thread.upVotesBy.filter(
                (id) => id !== action.payload.userId
              ),
              downVotesBy: thread.downVotesBy.filter(
                (id) => id !== action.payload.userId
              ),
            }
          : thread
      );
    case ActionType.FILTER_THREADS_BY_CATEGORY:
      if (!action.payload.category) {
        return threads;
      }
      return threads.filter(
        (thread) => thread.category === action.payload.category
      );
    default:
      return threads;
  }
}

export default threadsReducer;
