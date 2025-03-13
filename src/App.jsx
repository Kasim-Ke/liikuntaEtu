import Home from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";
import LeaderboardHome from "./components/Leaderboard/LeaderboardHome";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <>
              <LeaderboardHome />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
