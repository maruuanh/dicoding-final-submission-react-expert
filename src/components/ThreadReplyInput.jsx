import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import useInput from '../hooks/useInput';
function ThreadReplyInput({ replyThread }) {
  const [content, handleContentChange, setContent] = useInput('');

  function replyThreadHandler(event) {
    event.preventDefault();
    setContent('');
    replyThread(content);
  }

  return (
    <div>
      <Form>
        <FloatingLabel
          className="mb-3"
          controlId="floatingTextarea"
          label="Your reply"
        >
          <Form.Control
            as="textarea"
            placeholder="Your reply"
            value={content}
            onChange={handleContentChange}
            style={{ height: '120px' }}
          />
        </FloatingLabel>
        <Button
          type="submit"
          variant="secondary"
          className="w-100"
          onClick={replyThreadHandler}
        >
          Kirim
        </Button>
      </Form>
    </div>
  );
}

ThreadReplyInput.propTypes = {
  replyThread: PropTypes.func.isRequired,
};

export default ThreadReplyInput;
