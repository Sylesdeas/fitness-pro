import { Outlet } from "react-router";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <>
      <header>
        <h1>Fitness Trackr</h1>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
