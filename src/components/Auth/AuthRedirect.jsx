import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthRedirect = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const fullName = user.publicMetadata?.fullName;
      const department = user.publicMetadata?.department;

      if (!fullName || !department) {
        navigate("/complete-profile");
      }
    }
  }, [user, navigate]);

  return null; // Ei renderöi mitään, vain ohjaa tarvittaessa
};

export default AuthRedirect;
