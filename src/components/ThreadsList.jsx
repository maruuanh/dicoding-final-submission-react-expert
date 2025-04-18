import React from "react";
import PropTypes from "prop-types";
import ThreadItem, { threadItemShape } from "./ThreadItem";
import parser from "html-react-parser";
import { Card, Container } from "react-bootstrap";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { MdOutlineThumbUp, MdOutlineThumbDown } from "react-icons/md";
import { postedAt } from "../utils";
function ThreadsList({ threads, like }) {
  return (
    <Container
      fluid
      className="pb-5 px-5 d-flex flex-column gap-3 justify-content-center align-items-center"
    >
      <div className="w-50">
        <p className="text-start fs-4 fw-bold">Diskusi Tersedia</p>
        {threads.map((thread) => (
          <Card className="my-3" key={thread.id}>
            <Card.Body>
              <Card.Title>
                <div className="category">
                  <span
                    className="category-name text-secondary border-dark border rounded px-2 py-1"
                    style={{ fontSize: "13px" }}
                  >{`#${thread.category}`}</span>
                </div>
                <div className="title fw-bold text-primary mt-3">
                  {thread.title}
                </div>
              </Card.Title>
              <Card.Text>
                <div className="content">{parser(thread.body)}</div>
                <div className="upvotes_downvotes_comments_created-at mt-2 d-flex gap-2">
                  <div className="upvotes d-flex align-items-center gap-1">
                    <MdOutlineThumbUp />
                    <span>{thread.upVotesBy.length}</span>
                  </div>
                  <div className="downvotes d-flex align-items-center gap-1">
                    <MdOutlineThumbDown />
                    <span>{thread.downVotesBy.length}</span>
                  </div>
                  <div className="comments d-flex align-items-center gap-1">
                    <IoChatboxEllipsesOutline />
                    <span>{thread.totalComments}</span>
                  </div>
                  <div className="created-at">
                    <span>{postedAt(thread.createdAt)}</span>
                  </div>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
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
