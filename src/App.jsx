import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Loading from "./components/Loading";
import Navigation from "./components/Navigation";
import RegisterPage from "./pages/RegisterPage";
import { useNavigate } from "react-router-dom";
import { asyncPreloadProcess } from "./states/isPreload/action";
import { asyncUnsetAuthUser } from "./states/authUser/action";
import ProfilePage from "./pages/ProfilePage";
import LeaderboardsPage from "./pages/LeaderboardsPage";
import DetailPage from "./pages/DetailPage";
function App() {
  const { authUser = null, isPreload = false } = useSelector(
    (states) => states
  ); // @TODO: get authUser and isPreLoad state from store
  const dispatch = useDispatch(); // @TODO: get dispatch function from store
  const navigate = useNavigate();

  useEffect(() => {
    // @TODO: dispatch async action to preload app
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    // @TODO: dispatch async action to sign out
    dispatch(asyncUnsetAuthUser());
    navigate("/");
  };

  if (isPreload) {
    return null;
  }
  if (authUser === null) {
    return (
      <>
        <Loading />
        <main>
          <Routes>
            <Route path="/*" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </>
    );
  }

  return (
    <>
      <Loading />
      <div className="app-container">
        <main className="pb-5">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/leaderboards" element={<LeaderboardsPage />} />
            <Route
              path="/profile"
              element={<ProfilePage profile={authUser} onSignOut={onSignOut} />}
            />
            <Route path="/threads/:id" element={<DetailPage />} />
          </Routes>
        </main>
        <Navigation authUser={authUser} />
      </div>
    </>
  );
}

export default App;
