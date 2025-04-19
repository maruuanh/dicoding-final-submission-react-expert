import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { useSelector, useDispatch } from "react-redux";
import { asyncPopulateLeaderboards } from "../states/leaderboards/action";

const LeaderboardsPage = () => {
  const dispatch = useDispatch();
  const { leaderboards = [] } = useSelector((states) => states);

  useEffect(() => {
    dispatch(asyncPopulateLeaderboards());
  }, [dispatch]);

  console.log(leaderboards);
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center py-5"
    >
      <Card className="w-50">
        <Card.Body>
          <Card.Title className="text-center fs-3">Leaderboards</Card.Title>
          <div className="d-flex justify-content-between align-items-center">
            <Card.Text className="fs-5">Pengguna</Card.Text>
            <Card.Text className="fs-5">Skor</Card.Text>
          </div>
          {leaderboards.map((leaderboard) => (
            <Card.Text
              key={leaderboard.id}
              className="d-flex justify-content-between align-items-center"
            >
              <div className="profile-leaderboard">
                <img
                  src={leaderboard.user.avatar}
                  alt="avatar"
                  className="rounded-circle"
                  width={40}
                  height={40}
                />
                <span className="mx-2 fs-6">{leaderboard.user.name}</span>
              </div>
              <span className="mx-2 fs-4">{leaderboard.score}</span>
            </Card.Text>
          ))}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LeaderboardsPage;
