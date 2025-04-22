import React from 'react';
import PropTypes from 'prop-types';
import { Container, Card, Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import useInput from '../hooks/useInput';
function ThreadInput({ addThread }) {
  const [title, handleTitleChange] = useInput('');
  const [category, handleCategoryChange] = useInput('');
  const [body, handleBodyChange] = useInput('');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    addThread({ title, body, category });
  };

  return (
    <Container
      fluid
      className='pt-5 pb-4 px-5 d-flex flex-column gap-3 justify-content-center align-items-center'
    >
      <div className='w-50'>
        <p className='text-start fs-4 fw-semibold'>Buat Diskusi Baru</p>

        <Card>
          <Card.Body>
            <InputGroup>
              <FloatingLabel controlId='floatingInputJudul' label='Judul'>
                <Form.Control
                  placeholder='Judul'
                  value={title}
                  onChange={handleTitleChange}
                />
              </FloatingLabel>
            </InputGroup>
            <InputGroup className='mt-3'>
              <FloatingLabel
                controlId='floatingInputKategori'
                label='Kategori'
              >
                <Form.Control
                  placeholder='Kategori'
                  value={category}
                  onChange={handleCategoryChange}
                />
              </FloatingLabel>
            </InputGroup>
            <FloatingLabel
              className='mt-3'
              controlId='floatingTextarea'
              label='Apa yang mau kamu bahas?'
            >
              <Form.Control
                as='textarea'
                placeholder='Apa yang mau kamu bahas?'
                value={body}
                style={{ height: '100px' }}
                onChange={handleBodyChange}
              />
            </FloatingLabel>

            <Button
              variant='secondary'
              className='w-100 mt-3'
              type='submit'
              onClick={onSubmitHandler}
            >
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
