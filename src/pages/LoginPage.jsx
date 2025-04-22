import React from 'react';
import { IoEarthOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { Container, Row, Col, Card } from 'react-bootstrap';
import LoginInput from '../components/LoginInput';
import { Link } from 'react-router-dom';
import { asyncSetAuthUser } from '../states/authUser/action';
function LoginPage() {
  const dispatch = useDispatch();
  const onLogin = ({ email, password }) => {
    try {
      dispatch(asyncSetAuthUser({ email, password }));
    } catch (error) {
      console.log(error);
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
                <IoEarthOutline size={50} className='text-primary' />
                <h2 className="mt-3">
                  Dicoding <strong>Threads</strong>, <br />
                </h2>
                <h5>Open your thoughts</h5>
              </div>

              <LoginInput login={onLogin} />

              <div className='text-center mt-3'>
                <p className='mb-0'>
                  Don&apos;t have an account?{' '}
                  <Link to='/register'>Register</Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
