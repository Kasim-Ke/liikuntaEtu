import { Link } from "react-router-dom";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

const Auth = () => {
  return (
    <div className="flex items-center justify-cenyter flex-col gap-4 ">
      <SignedOut>
        <div className="flex gap-2 flex-col-reverse">
          <SignUpButton mode="modal">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
              Rekisteröidy
            </button>
          </SignUpButton>
          <SignInButton mode="modal">
            <button className="px-4 py-2 bg-black text-white rounded-lg shadow-md hover:bg-gray-700 transition">
              Kirjaudu sisään
            </button>
          </SignInButton>
        </div>
      </SignedOut>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </div>
  );
};

export default Auth;
