import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CompleteProfile = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [department, setDepartment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Päivitä Clerk metadata
    await user.update({
      publicMetadata: {
        firstName,
        lastName,
        department,
      },
    });

    // Tallenna tiedot backendille (esim. MongoDB) käyttäen Axiosia
    try {
      const response = await axios.post("/update-profile", {
        userId: user.id, // Clerk user ID
        firstName,
        lastName,
        department,
      });

      if (response.status === 200) {
        navigate("/"); // Takaisin etusivulle
      } else {
        console.error("Error saving profile:", response.data);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md border border-gray-300 w-80"
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Täydennä profiili
        </h2>

        <label className="block text-sm font-medium text-gray-600">
          Etunimi:
        </label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label className="block text-sm font-medium text-gray-600 mt-4">
          Sukunimi:
        </label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label className="block text-sm font-medium text-gray-600 mt-4">
          Osasto:
        </label>
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
          className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full mt-4 p-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-200"
        >
          Tallenna
        </button>
      </form>
    </div>
  );
};

export default CompleteProfile;
