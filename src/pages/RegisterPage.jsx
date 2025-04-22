import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onRegister = async ({ name, email, password }) => {
    try {
      await dispatch(asyncRegisterUser({ name, email, password }));
      navigate('/');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Container
      fluid
      className='min-vh-100 d-flex align-items-center justify-content-center bg-light'
    >
      <Row className='w-100 justify-content-center'>
        <Col md={6} lg={4}>
          <Card className='shadow-sm'>
            <Card.Body className='p-4'>
              <div className='text-center mb-4'>
                <h2>Create your account</h2>
              </div>
              <RegisterInput register={onRegister} />
              <div className='text-center mt-3'>
                <Card.Text className='mb-0'>
                  Already have an account? <Link to='/'>Login</Link>
                </Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterPage;
