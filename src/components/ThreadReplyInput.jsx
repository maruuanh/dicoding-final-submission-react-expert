import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function ThreadReplyInput({ replyThread }) {
  const [text, setText] = useState("");
  const navigate = useNavigate("/");

  function replyThreadHandler() {
    if (text.trim()) {
      replyThread(text);
      setText("");
      navigate("/");
    }
  }

  function handleTextChange({ target }) {
    if (target.value.length <= 320) {
      setText(target.value);
    }
  }

  return (
    <div className="talk-reply-input">
      <textarea
        type="text"
        placeholder="Talk your reply"
        value={text}
        onChange={handleTextChange}
      />
      <p className="talk-reply-input__char-left">
        <strong>{text.length}</strong>
        /320
      </p>
      <button type="submit" onClick={replyThreadHandler}>
        Reply
      </button>
    </div>
  );
}

ThreadReplyInput.propTypes = {
  replyThread: PropTypes.func.isRequired,
};

export default ThreadReplyInput;
