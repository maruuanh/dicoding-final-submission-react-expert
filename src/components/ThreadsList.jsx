import React from "react";
import PropTypes from "prop-types";
import ThreadItem, { threadItemShape } from "./ThreadItem";
import { Container } from "react-bootstrap";

function ThreadsList({ threads, like }) {
  return (
    <Container
      fluid
      className="pb-5 px-5 d-flex flex-column gap-3 justify-content-center align-items-center"
    >
      <div className="w-50">
        <p className="text-start fs-4 fw-bold">Diskusi Tersedia</p>
        {threads.map((thread) => (
          <ThreadItem key={thread.id} {...thread} like={like} />
        ))}
      </div>
    </Container>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  like: PropTypes.func.isRequired,
};

export default ThreadsList;
