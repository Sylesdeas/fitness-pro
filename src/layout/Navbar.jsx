import { NavLink } from "react-router";

/** Navbar with site navigation links */
export default function Navbar() {
  return (
    <header>
      <p>Fitness Trackr</p>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/activities"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Activities
        </NavLink>
        <NavLink
          to="/register"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Register
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Login
        </NavLink>
      </nav>
    </header>
  );
}
