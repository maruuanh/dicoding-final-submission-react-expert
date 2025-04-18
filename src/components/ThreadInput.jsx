import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container, Card, Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
function ThreadInput({ addThread }) {
  const [text, setText] = useState("");

  function addThreadHandler() {
    if (text.trim()) {
      addThread(text);
      setText("");
    }
  }

  function handleTextChange({ target }) {
    if (target.value.length <= 320) {
      setText(target.value);
    }
  }

  return (
    <Container
      fluid
      className="pt-5 pb-4 px-5 d-flex flex-column gap-3 justify-content-center align-items-center"
    >
      <div className="w-50">
        <p className="text-start fs-4 fw-bold">Buat Diskusi Baru</p>

        <Card>
          <Card.Body>
            <FloatingLabel
              controlId="floatingTextarea"
              label="What are you thinking?"
            >
              <Form.Control
                as="textarea"
                placeholder="What are you thinking?"
                value={text}
                onChange={handleTextChange}
              />
            </FloatingLabel>
            <p className="talk-input__char-left">
              <strong>{text.length}</strong>
              /320
            </p>
            <Button type="submit" onClick={addThreadHandler}>
              Thread
            </Button>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default ThreadInput;
