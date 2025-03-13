import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-black text-white  w-full h-[100px] flex flex-col justify-center items-center mx-auto">
      <Link to="/" className="text-[#7D828F] hover:text-[#1B1D23] duration-300">
        Home
      </Link>
      <Link
        to="/leaderboard"
        className="text-[#7D828F] hover:text-[#1B1D23] duration-300"
      >
        leaderboard
      </Link>
    </div>
  );
};

export default Navbar;
