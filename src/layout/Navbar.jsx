import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/activities");
  };

  return (
    <nav>
      <NavLink to="/activities">Activities</NavLink>
      {token ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </>
      )}
    </nav>
  );
}
