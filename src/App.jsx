import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import AuthRedirect from "./components/Auth/AuthRedirect";
import CompleteProfile from "./components/Profile/CompleteProfile";

import Auth from "./components/Auth/Auth";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import Home from "./components/Home/Home";
import LogDailyKilometers from "./components/UserData/LogDailyKilometers";

function App() {
  return (
    <>
      <Navbar />
      <AuthRedirect />
      {/* Tämä suoritetaan aina, kun käyttäjä on kirjautunut sisään */}
      <Routes>
        {/* Auth */}
        <Route path="/auth" element={<Auth />} />

        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Profile Completion Page */}
        <Route path="/complete-profile" element={<CompleteProfile />} />

        {/* Leaderboard Page */}
        <Route path="/leaderboard" element={<Leaderboard />} />
        {/* userdata Page */}
        <Route path="/logdaykilomeneters" element={<LogDailyKilometers />} />
      </Routes>
    </>
  );
}

export default App;
