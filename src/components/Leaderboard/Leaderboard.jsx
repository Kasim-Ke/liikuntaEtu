import { useEffect, useState } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [topUsers, setTopUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get("/api/leaderboard");
        setTopUsers(response.data);
      } catch (err) {
        setError("Virhe leaderboardin hakemisessa");
        console.error(err);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Leaderboard</h2>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <table className="min-w-full table-auto bg-white border border-gray-300 shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              #
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              Nimi
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              Osasto
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              Kilometrit
            </th>
          </tr>
        </thead>
        <tbody>
          {topUsers.map((user, index) => (
            <tr key={user.id} className="border-t">
              <td className="px-4 py-2 text-sm text-gray-600">{index + 1}</td>
              <td className="px-4 py-2 text-sm text-gray-600">
                {user.firstName} {user.lastName}
              </td>
              <td className="px-4 py-2 text-sm text-gray-600">
                {user.department}
              </td>
              <td className="px-4 py-2 text-sm text-gray-600">
                {user.dailyKilometers}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
