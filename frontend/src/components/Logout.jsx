import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Logout = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    // remove token
    localStorage.removeItem("pos-token");

    // clear user
    setUser(null);

    // redirect
    navigate("/login", { replace: true });
  }, [navigate, setUser]);

  return null;
};

export default Logout;
