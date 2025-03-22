import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Leaderboard from "./components/Leaderboard/Leaderboard";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </>
  );
}

export default App;
