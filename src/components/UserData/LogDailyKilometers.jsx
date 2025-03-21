import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const LogDailyKilometers = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [kilometers, setKilometers] = useState("");
  const [error, setError] = useState("");
  const [hasLogged, setHasLogged] = useState(false);

  useEffect(() => {
    const checkIfAlreadyLogged = async () => {
      const metadata = user.publicMetadata;
      if (
        metadata &&
        metadata.lastLoggedDate === new Date().toISOString().slice(0, 10)
      ) {
        setHasLogged(true);
      }
    };
    checkIfAlreadyLogged();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Varmista, ettei käyttäjä ole jo kirjannut tänään
    if (hasLogged) {
      setError("Olet jo kirjannut kilometrit tänään.");
      return;
    }

    // Varmista, että kilometrimäärä on alle 60 km ja on positiivinen
    const km = parseFloat(kilometers);
    if (isNaN(km) || km <= 0 || km > 60) {
      setError("Kilometrimäärän täytyy olla positiivinen ja enintään 60 km.");
      return;
    }

    // Lisää nykyiset kilometrit edellisiin
    const previousKilometers = user.publicMetadata.dailyKilometers || 0;
    const totalKilometers = previousKilometers + km;

    // Päivitä Clerk metadata
    await user.update({
      publicMetadata: {
        ...user.publicMetadata,
        dailyKilometers: totalKilometers,
        lastLoggedDate: new Date().toISOString().slice(0, 10),
      },
    });

    setHasLogged(true); // Estetään uusi kirjautuminen tänään
    setError(""); // Nollaa virheilmoitus
    navigate("/"); // Takaisin etusivulle
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md border border-gray-300 w-80"
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Päivittäiset kilometrit
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <label className="block text-sm font-medium text-gray-600">
          Kilometrit (meno-paluu):
        </label>
        <input
          type="number"
          value={kilometers}
          onChange={(e) => setKilometers(e.target.value)}
          required
          disabled={hasLogged}
          className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full mt-4 p-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-200"
          disabled={hasLogged}
        >
          {hasLogged ? "Olet jo kirjannut tänään" : "Tallenna"}
        </button>
      </form>
    </div>
  );
};

export default LogDailyKilometers;
