import React from "react";
import PropTypes from "prop-types";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { postedAt } from "../utils";

function ThreadDetail({
  id,
  body,
  createdAt,
  likes,
  user,
  authUser,
  likeThread,
}) {
  const isTalkLiked = likes.includes(authUser);

  return (
    <section className="talk-detail">
      <header>
        <img src={user.photo} alt={user} />
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
          <span>{likes.length} Likes</span>
        </div>
        <p className="talk-detail__created-at">{postedAt(createdAt)}</p>
      </footer>
    </section>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
};

ThreadDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  likes: PropTypes.arrayOf(PropTypes.string).isRequired,
  user: PropTypes.shape(userShape).isRequired,
  authUser: PropTypes.string.isRequired,
  likeThread: PropTypes.func.isRequired,
};

export default ThreadDetail;
