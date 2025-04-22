import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPopulateLeaderboards } from '../states/leaderboards/action';

const LeaderboardsPage = () => {
  const dispatch = useDispatch();
  const leaderboards = useSelector((state) => state.leaderboards);

  useEffect(() => {
    dispatch(asyncPopulateLeaderboards());
  }, [dispatch]);

  return (
    <Container
      fluid
      className='d-flex justify-content-center align-items-center py-5'
    >
      <Card className='w-50'>
        <Card.Body>
          <Card.Title className='text-center fs-3'>Leaderboards</Card.Title>
          <div className='d-flex justify-content-between align-items-center mb-3'>
            <span className='fs-5'>Pengguna</span>
            <span className='fs-5'>Skor</span>
          </div>
          {leaderboards.map((leaderboard) => (
            <div
              key={leaderboard.user.id}
              className='d-flex justify-content-between align-items-center mb-2'
            >
              <div className='profile-leaderboard d-flex align-items-center'>
                <img
                  src={leaderboard.user.avatar}
                  alt='avatar'
                  className='rounded-circle'
                  width={40}
                  height={40}
                />
                <span className='mx-2 fs-6'>{leaderboard.user.name}</span>
              </div>
              <span className='mx-2 fs-4'>{leaderboard.score}</span>
            </div>
          ))}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LeaderboardsPage;
