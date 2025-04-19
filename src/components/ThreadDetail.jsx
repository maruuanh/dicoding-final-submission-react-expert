import React from "react";
import PropTypes from "prop-types";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { postedAt } from "../utils";

function ThreadDetail({
  id,
  title,
  body,
  createdAt,
  category,
  upVotesBy,
  downVotesBy,
  totalComments,
  user,
  authUser,
  likeThread = () => {},
}) {
  // const isTalkLiked = upVotesBy.includes(authUser);

  return (
    <section className="talk-detail">
      {/* <header>
        <img src={user.avatar} alt={user} />
        <div className="talk-detail__user-info">
          <p className="talk-detail__user-name">{user.name}</p>
          <p className="talk-detail__user-id">@{user.id}</p>
        </div>
      </header>
      <article>
        <p className="talk-detail__text">{body}</p>
      </article>
      <footer>
        <div className="talk-detail__like">
          <button
            type="button"
            aria-label="like"
            onClick={() => likeThread(id)}
          >
            {isTalkLiked ? (
              <FaHeart style={{ color: "red" }} />
            ) : (
              <FaRegHeart />
            )}
          </button>
          <span>{upVotesBy.length} Likes</span>
        </div>
        <p className="talk-detail__created-at">{postedAt(createdAt)}</p>
      </footer> */}
    </section>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

ThreadDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  user: PropTypes.shape(userShape).isRequired,
  authUser: PropTypes.string.isRequired,
  likeThread: PropTypes.func,
};

export default ThreadDetail;
